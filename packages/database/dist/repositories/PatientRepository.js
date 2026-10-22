"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientRepository = void 0;
const index_1 = require("../index");
class PatientRepository {
    /**
     * Generate next unique MRN for a tenant: HSP-YYYY-XXXXXX
     */
    static async generateMRN(tenantId) {
        const year = new Date().getFullYear();
        const count = await index_1.prisma.patient.count({ where: { tenantId } });
        const sequence = String(count + 1).padStart(6, "0");
        return `HSP-${year}-${sequence}`;
    }
    /**
     * Register a new patient with automatic MRN generation
     */
    static async createPatient(tenantId, data) {
        const mrn = await PatientRepository.generateMRN(tenantId);
        return index_1.prisma.patient.create({
            data: {
                tenantId,
                mrn,
                fullName: data.fullName,
                dob: data.dob,
                gender: data.gender,
                phone: data.phone,
                email: data.email,
                address: data.address,
                bloodGroup: data.bloodGroup,
                cnicPassport: data.cnicPassport,
                emergencyContact: data.emergencyContact,
                allergies: data.allergies,
                medicalHistory: data.medicalHistory,
            },
        });
    }
    /**
     * Find patient by MRN strictly within tenant boundary
     */
    static async findByMRN(tenantId, mrn) {
        return index_1.prisma.patient.findFirst({
            where: { tenantId, mrn },
        });
    }
    /**
     * Search patients by MRN, Name, Phone or CNIC
     */
    static async searchPatients(tenantId, query) {
        return index_1.prisma.patient.findMany({
            where: {
                tenantId,
                OR: [
                    { mrn: { contains: query, mode: "insensitive" } },
                    { fullName: { contains: query, mode: "insensitive" } },
                    { phone: { contains: query, mode: "insensitive" } },
                    { cnicPassport: { contains: query, mode: "insensitive" } },
                ],
            },
            orderBy: { createdAt: "desc" },
            take: 20,
        });
    }
    /**
     * Get Unified Longitudinal Patient Record Timeline
     */
    static async getLongitudinalTimeline(tenantId, patientId) {
        const [patient, appointments, consultations, labOrders, invoices] = await Promise.all([
            index_1.prisma.patient.findFirst({ where: { tenantId, id: patientId } }),
            index_1.prisma.appointment.findMany({
                where: { tenantId, patientId },
                include: { doctor: { include: { user: true, department: true } } },
                orderBy: { appointmentDate: "desc" },
            }),
            index_1.prisma.consultation.findMany({
                where: { patientId },
                include: {
                    doctor: { include: { user: true } },
                    prescriptions: { include: { items: true } },
                },
                orderBy: { createdAt: "desc" },
            }),
            index_1.prisma.labOrder.findMany({
                where: { tenantId, patientId },
                include: { items: true },
                orderBy: { createdAt: "desc" },
            }),
            index_1.prisma.billingInvoice.findMany({
                where: { tenantId, patientId },
                orderBy: { createdAt: "desc" },
            }),
        ]);
        return {
            patient,
            appointments,
            consultations,
            labOrders,
            invoices,
        };
    }
}
exports.PatientRepository = PatientRepository;
