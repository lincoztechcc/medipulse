"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantRepository = void 0;
const index_1 = require("../index");
class TenantRepository {
    /**
     * Find tenant by domain name (e.g. citycarehospital.com or citycare.localhost)
     */
    static async findByDomain(domainName) {
        const domainRecord = await index_1.prisma.domain.findUnique({
            where: { domain: domainName },
            include: { tenant: { include: { websiteSettings: true } } },
        });
        return domainRecord?.tenant || null;
    }
    /**
     * Find tenant by unique ID
     */
    static async findById(id) {
        return index_1.prisma.tenant.findUnique({
            where: { id },
            include: { domains: true, websiteSettings: true },
        });
    }
    /**
     * List all hospital tenants (Super Admin view)
     */
    static async listAll() {
        return index_1.prisma.tenant.findMany({
            include: {
                domains: true,
                _count: {
                    select: { doctors: true, patients: true, appointments: true },
                },
            },
            orderBy: { createdAt: "desc" },
        });
    }
    /**
     * Provision a new Hospital Tenant
     */
    static async createTenant(data) {
        return index_1.prisma.tenant.create({
            data: {
                name: data.name,
                slug: data.slug,
                email: data.email,
                phone: data.phone,
                whatsappNumber: data.whatsappNumber,
                address: data.address,
                status: index_1.HospitalStatus.ACTIVE,
                domains: {
                    create: [
                        { domain: data.primaryDomain, isPrimary: true, isVerified: true },
                        { domain: `${data.slug}.localhost`, isPrimary: false, isVerified: true },
                    ],
                },
                websiteSettings: {
                    create: {
                        heroTitle: `Welcome to ${data.name}`,
                        heroSubtitle: "Compassionate, World-Class Healthcare Services",
                        aboutText: `${data.name} is dedicated to providing high-quality clinical, diagnostic, and therapeutic services.`,
                        primaryColor: "#0284c7",
                    },
                },
            },
            include: { domains: true, websiteSettings: true },
        });
    }
    /**
     * Update tenant status (ACTIVE, SUSPENDED, BLOCKED)
     */
    static async updateStatus(tenantId, status) {
        return index_1.prisma.tenant.update({
            where: { id: tenantId },
            data: { status },
        });
    }
}
exports.TenantRepository = TenantRepository;
