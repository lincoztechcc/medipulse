import { prisma, Medicine, MedicineBatch } from "../index";

export class PharmacyRepository {
  /**
   * List medicines near or below reorder level
   */
  static async listLowStock(tenantId: string) {
    return prisma.medicine.findMany({
      where: {
        tenantId,
        stockQuantity: { lte: 50 },
      },
      include: { batches: true },
    });
  }

  /**
   * Deduct inventory based on FEFO (First Expiry, First Out) rules
   */
  static async dispenseMedicineFEFO(
    tenantId: string,
    medicineId: string,
    quantityToDeduct: number
  ): Promise<{ success: boolean; message?: string }> {
    const med = await prisma.medicine.findFirst({
      where: { tenantId, id: medicineId },
      include: {
        batches: {
          where: { quantity: { gt: 0 } },
          orderBy: { expiryDate: "asc" }, // FEFO: Earliest expiry first
        },
      },
    });

    if (!med) {
      return { success: false, message: "Medicine not found." };
    }

    if (med.stockQuantity < quantityToDeduct) {
      return {
        success: false,
        message: `Insufficient total stock for ${med.brandName}. Available: ${med.stockQuantity}, Requested: ${quantityToDeduct}`,
      };
    }

    let remainingToDeduct = quantityToDeduct;

    for (const batch of med.batches) {
      if (remainingToDeduct <= 0) break;

      const deductFromBatch = Math.min(batch.quantity, remainingToDeduct);

      await prisma.medicineBatch.update({
        where: { id: batch.id },
        data: { quantity: batch.quantity - deductFromBatch },
      });

      remainingToDeduct -= deductFromBatch;
    }

    // Update overall medicine stock quantity
    await prisma.medicine.update({
      where: { id: med.id },
      data: { stockQuantity: med.stockQuantity - quantityToDeduct },
    });

    return { success: true };
  }
}
