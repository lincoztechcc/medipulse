"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabRepository = void 0;
const index_1 = require("../index");
class LabRepository {
    /**
     * Create laboratory test order for patient
     */
    static async createOrder(tenantId, patientId, testNames) {
        const year = new Date().getFullYear();
        const count = await index_1.prisma.labOrder.count({ where: { tenantId } });
        const orderNumber = `LAB-${year}-${String(count + 1).padStart(6, "0")}`;
        return index_1.prisma.labOrder.create({
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
    static async submitResultsAndVerify(tenantId, labOrderId, results) {
        for (const res of results) {
            await index_1.prisma.labOrderItem.update({
                where: { id: res.itemId },
                data: {
                    resultValue: res.resultValue,
                    status: "COMPLETED",
                },
            });
        }
        return index_1.prisma.labOrder.update({
            where: { id: labOrderId },
            data: { status: "COMPLETED" },
            include: { items: true, patient: true },
        });
    }
}
exports.LabRepository = LabRepository;
