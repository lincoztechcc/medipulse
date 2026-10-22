import { AuditLog } from "../index";
export declare class AuditRepository {
    /**
     * Log sensitive system/action modification
     */
    static log(data: {
        tenantId: string;
        userId?: string;
        action: string;
        module: string;
        recordId?: string;
        before?: string;
        after?: string;
        ipAddress?: string;
    }): Promise<AuditLog>;
    /**
     * List audit trail records for tenant
     */
    static listByTenant(tenantId: string, take?: number): Promise<{
        id: string;
        createdAt: Date;
        tenantId: string;
        userId: string | null;
        action: string;
        module: string;
        recordId: string | null;
        before: string | null;
        after: string | null;
        ipAddress: string | null;
    }[]>;
}
