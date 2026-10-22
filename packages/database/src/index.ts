import { PrismaClient } from "@prisma/client";

declare global {
  var globalPrisma: PrismaClient | undefined;
}

export const prisma =
  globalThis.globalPrisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.globalPrisma = prisma;
}

export * from "@prisma/client";
export * from "./repositories/TenantRepository";
export * from "./repositories/UserRepository";
export * from "./repositories/PatientRepository";
export * from "./repositories/AppointmentRepository";
export * from "./repositories/PharmacyRepository";
export * from "./repositories/LabRepository";
export * from "./repositories/AuditRepository";
