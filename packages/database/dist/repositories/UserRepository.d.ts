export declare class UserRepository {
    /**
     * Find user by unique work email
     */
    static findByEmail(email: string): Promise<({
        tenant: {
            name: string;
            id: string;
            slug: string;
            logoUrl: string | null;
            faviconUrl: string | null;
            phone: string | null;
            whatsappNumber: string | null;
            email: string | null;
            address: string | null;
            googleMapsUrl: string | null;
            status: import(".prisma/client").$Enums.HospitalStatus;
            planId: string | null;
            createdAt: Date;
            updatedAt: Date;
        } | null;
        role: {
            permissions: ({
                permission: {
                    id: string;
                    action: string;
                    module: string;
                    code: string;
                };
            } & {
                roleId: string;
                permissionId: string;
            })[];
        } & {
            name: string;
            id: string;
            createdAt: Date;
            tenantId: string | null;
            description: string | null;
            isSystem: boolean;
        };
        doctor: {
            id: string;
            status: boolean;
            tenantId: string;
            userId: string;
            departmentId: string;
            specialization: string;
            qualification: string;
            registrationNumber: string;
            consultationFee: import("@prisma/client/runtime/library").Decimal;
            followupFee: import("@prisma/client/runtime/library").Decimal;
            emergencyFee: import("@prisma/client/runtime/library").Decimal;
        } | null;
        patient: {
            id: string;
            phone: string;
            email: string | null;
            address: string | null;
            createdAt: Date;
            tenantId: string;
            fullName: string;
            userId: string | null;
            mrn: string;
            dob: Date;
            gender: string;
            bloodGroup: string | null;
            whatsapp: string | null;
            cnicPassport: string | null;
            emergencyContact: string | null;
            allergies: string | null;
            medicalHistory: string | null;
        } | null;
    } & {
        id: string;
        phone: string | null;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string | null;
        passwordHash: string;
        fullName: string;
        roleId: string;
        isActive: boolean;
    }) | null>;
    /**
     * Find user by ID within tenant context
     */
    static findById(id: string, tenantId?: string): Promise<({
        tenant: {
            name: string;
            id: string;
            slug: string;
            logoUrl: string | null;
            faviconUrl: string | null;
            phone: string | null;
            whatsappNumber: string | null;
            email: string | null;
            address: string | null;
            googleMapsUrl: string | null;
            status: import(".prisma/client").$Enums.HospitalStatus;
            planId: string | null;
            createdAt: Date;
            updatedAt: Date;
        } | null;
        role: {
            permissions: ({
                permission: {
                    id: string;
                    action: string;
                    module: string;
                    code: string;
                };
            } & {
                roleId: string;
                permissionId: string;
            })[];
        } & {
            name: string;
            id: string;
            createdAt: Date;
            tenantId: string | null;
            description: string | null;
            isSystem: boolean;
        };
    } & {
        id: string;
        phone: string | null;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string | null;
        passwordHash: string;
        fullName: string;
        roleId: string;
        isActive: boolean;
    }) | null>;
    /**
     * List users belonging to a tenant
     */
    static listByTenant(tenantId: string): Promise<({
        role: {
            name: string;
            id: string;
            createdAt: Date;
            tenantId: string | null;
            description: string | null;
            isSystem: boolean;
        };
    } & {
        id: string;
        phone: string | null;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string | null;
        passwordHash: string;
        fullName: string;
        roleId: string;
        isActive: boolean;
    })[]>;
}
