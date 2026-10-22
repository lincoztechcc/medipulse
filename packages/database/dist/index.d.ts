import { PrismaClient } from "@prisma/client";
declare global {
    var globalPrisma: PrismaClient | undefined;
}
export declare const prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
export * from "@prisma/client";
export * from "./repositories/TenantRepository";
export * from "./repositories/UserRepository";
export * from "./repositories/PatientRepository";
export * from "./repositories/AppointmentRepository";
export * from "./repositories/PharmacyRepository";
export * from "./repositories/LabRepository";
export * from "./repositories/AuditRepository";
