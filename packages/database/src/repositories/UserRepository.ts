import { prisma, User } from "../index";

export class UserRepository {
  /**
   * Find user by unique work email
   */
  static async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      include: {
        role: {
          include: {
            permissions: {
              include: { permission: true },
            },
          },
        },
        tenant: true,
        doctor: true,
        patient: true,
      },
    });
  }

  /**
   * Find user by ID within tenant context
   */
  static async findById(id: string, tenantId?: string) {
    return prisma.user.findFirst({
      where: {
        id,
        ...(tenantId ? { tenantId } : {}),
      },
      include: {
        role: {
          include: {
            permissions: {
              include: { permission: true },
            },
          },
        },
        tenant: true,
      },
    });
  }

  /**
   * List users belonging to a tenant
   */
  static async listByTenant(tenantId: string) {
    return prisma.user.findMany({
      where: { tenantId },
      include: { role: true },
      orderBy: { createdAt: "desc" },
    });
  }
}
