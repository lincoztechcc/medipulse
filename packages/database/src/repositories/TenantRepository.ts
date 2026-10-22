import { prisma, Tenant, Domain, WebsiteSettings, HospitalStatus } from "../index";

export class TenantRepository {
  /**
   * Find tenant by domain name (e.g. citycarehospital.com or citycare.localhost)
   */
  static async findByDomain(domainName: string): Promise<Tenant | null> {
    const domainRecord = await prisma.domain.findUnique({
      where: { domain: domainName },
      include: { tenant: { include: { websiteSettings: true } } },
    });
    return domainRecord?.tenant || null;
  }

  /**
   * Find tenant by unique ID
   */
  static async findById(id: string): Promise<Tenant | null> {
    return prisma.tenant.findUnique({
      where: { id },
      include: { domains: true, websiteSettings: true },
    });
  }

  /**
   * List all hospital tenants (Super Admin view)
   */
  static async listAll(): Promise<Tenant[]> {
    return prisma.tenant.findMany({
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
  static async createTenant(data: {
    name: string;
    slug: string;
    email?: string;
    phone?: string;
    whatsappNumber?: string;
    address?: string;
    primaryDomain: string;
  }) {
    return prisma.tenant.create({
      data: {
        name: data.name,
        slug: data.slug,
        email: data.email,
        phone: data.phone,
        whatsappNumber: data.whatsappNumber,
        address: data.address,
        status: HospitalStatus.ACTIVE,
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
  static async updateStatus(tenantId: string, status: HospitalStatus) {
    return prisma.tenant.update({
      where: { id: tenantId },
      data: { status },
    });
  }
}
