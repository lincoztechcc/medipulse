export declare class PharmacyRepository {
    /**
     * List medicines near or below reorder level
     */
    static listLowStock(tenantId: string): Promise<({
        batches: {
            id: string;
            expiryDate: Date;
            medicineId: string;
            batchNumber: string;
            costPrice: import("@prisma/client/runtime/library").Decimal;
            salePrice: import("@prisma/client/runtime/library").Decimal;
            quantity: number;
        }[];
    } & {
        id: string;
        tenantId: string;
        brandName: string;
        genericName: string;
        manufacturer: string | null;
        category: string | null;
        unitPrice: import("@prisma/client/runtime/library").Decimal;
        stockQuantity: number;
        reorderLevel: number;
    })[]>;
    /**
     * Deduct inventory based on FEFO (First Expiry, First Out) rules
     */
    static dispenseMedicineFEFO(tenantId: string, medicineId: string, quantityToDeduct: number): Promise<{
        success: boolean;
        message?: string;
    }>;
}
