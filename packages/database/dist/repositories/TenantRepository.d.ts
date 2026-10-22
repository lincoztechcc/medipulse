import { Tenant, HospitalStatus } from "../index";
export declare class TenantRepository {
    /**
     * Find tenant by domain name (e.g. citycarehospital.com or citycare.localhost)
     */
    static findByDomain(domainName: string): Promise<Tenant | null>;
    /**
     * Find tenant by unique ID
     */
    static findById(id: string): Promise<Tenant | null>;
    /**
     * List all hospital tenants (Super Admin view)
     */
    static listAll(): Promise<Tenant[]>;
    /**
     * Provision a new Hospital Tenant
     */
    static createTenant(data: {
        name: string;
        slug: string;
        email?: string;
        phone?: string;
        whatsappNumber?: string;
        address?: string;
        primaryDomain: string;
    }): Promise<{
        websiteSettings: {
            id: string;
            tenantId: string;
            heroTitle: string | null;
            heroSubtitle: string | null;
            aboutText: string | null;
            primaryColor: string;
            metaTitle: string | null;
            metaDescription: string | null;
        } | null;
        domains: {
            id: string;
            createdAt: Date;
            domain: string;
            tenantId: string;
            isPrimary: boolean;
            isVerified: boolean;
        }[];
    } & {
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
    }>;
    /**
     * Update tenant status (ACTIVE, SUSPENDED, BLOCKED)
     */
    static updateStatus(tenantId: string, status: HospitalStatus): Promise<{
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
    }>;
}
