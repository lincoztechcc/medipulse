import { prisma, LabOrder } from "../index";

export class LabRepository {
  /**
   * Create laboratory test order for patient
   */
  static async createOrder(
    tenantId: string,
    patientId: string,
    testNames: string[]
  ): Promise<LabOrder> {
    const year = new Date().getFullYear();
    const count = await prisma.labOrder.count({ where: { tenantId } });
    const orderNumber = `LAB-${year}-${String(count + 1).padStart(6, "0")}`;

    return prisma.labOrder.create({
      data: {
        tenantId,
        patientId,
        orderNumber,
        status: "PENDING",
        items: {
          create: testNames.map((name) => ({
            labTestName: name,
            status: "PENDING",
          })),
        },
      },
      include: { items: true, patient: true },
    });
  }

  /**
   * Update lab item result values & verify report
   */
  static async submitResultsAndVerify(
    tenantId: string,
    labOrderId: string,
    results: { itemId: string; resultValue: string }[]
  ) {
    for (const res of results) {
      await prisma.labOrderItem.update({
        where: { id: res.itemId },
        data: {
          resultValue: res.resultValue,
          status: "COMPLETED",
        },
      });
    }

    return prisma.labOrder.update({
      where: { id: labOrderId },
      data: { status: "COMPLETED" },
      include: { items: true, patient: true },
    });
  }
}
