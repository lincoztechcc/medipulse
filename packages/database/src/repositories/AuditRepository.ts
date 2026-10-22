import { prisma, AuditLog } from "../index";

export class AuditRepository {
  /**
   * Log sensitive system/action modification
   */
  static async log(data: {
    tenantId: string;
    userId?: string;
    action: string;
    module: string;
    recordId?: string;
    before?: string;
    after?: string;
    ipAddress?: string;
  }): Promise<AuditLog> {
    return prisma.auditLog.create({
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
  static async listByTenant(tenantId: string, take: number = 50) {
    return prisma.auditLog.findMany({
      where: { tenantId },
      orderBy: { createdAt: "desc" },
      take,
    });
  }
}
