"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const index_1 = require("../index");
class UserRepository {
    /**
     * Find user by unique work email
     */
    static async findByEmail(email) {
        return index_1.prisma.user.findUnique({
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
    static async findById(id, tenantId) {
        return index_1.prisma.user.findFirst({
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
    static async listByTenant(tenantId) {
        return index_1.prisma.user.findMany({
            where: { tenantId },
            include: { role: true },
            orderBy: { createdAt: "desc" },
        });
    }
}
exports.UserRepository = UserRepository;
