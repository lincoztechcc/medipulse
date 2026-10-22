"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditRepository = void 0;
const index_1 = require("../index");
class AuditRepository {
    /**
     * Log sensitive system/action modification
     */
    static async log(data) {
        return index_1.prisma.auditLog.create({
            data: {
                tenantId: data.tenantId,
                userId: data.userId,
                action: data.action,
                module: data.module,
                recordId: data.recordId,
                before: data.before,
                after: data.after,
                ipAddress: data.ipAddress,
            },
        });
    }
    /**
     * List audit trail records for tenant
     */
    static async listByTenant(tenantId, take = 50) {
        return index_1.prisma.auditLog.findMany({
            where: { tenantId },
            orderBy: { createdAt: "desc" },
            take,
        });
    }
}
exports.AuditRepository = AuditRepository;
