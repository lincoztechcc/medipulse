import { prisma, Patient } from "../index";

export class PatientRepository {
  /**
   * Generate next unique MRN for a tenant: HSP-YYYY-XXXXXX
   */
  static async generateMRN(tenantId: string): Promise<string> {
    const year = new Date().getFullYear();
    const count = await prisma.patient.count({ where: { tenantId } });
    const sequence = String(count + 1).padStart(6, "0");
    return `HSP-${year}-${sequence}`;
  }

  /**
   * Register a new patient with automatic MRN generation
   */
  static async createPatient(
    tenantId: string,
    data: {
      fullName: string;
      dob: Date;
      gender: string;
      phone: string;
      email?: string;
      address?: string;
      bloodGroup?: string;
      cnicPassport?: string;
      emergencyContact?: string;
      allergies?: string;
      medicalHistory?: string;
    }
  ): Promise<Patient> {
    const mrn = await PatientRepository.generateMRN(tenantId);
    return prisma.patient.create({
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
  static async findByMRN(tenantId: string, mrn: string): Promise<Patient | null> {
    return prisma.patient.findFirst({
      where: { tenantId, mrn },
    });
  }

  /**
   * Search patients by MRN, Name, Phone or CNIC
   */
  static async searchPatients(tenantId: string, query: string): Promise<Patient[]> {
    return prisma.patient.findMany({
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
  static async getLongitudinalTimeline(tenantId: string, patientId: string) {
    const [patient, appointments, consultations, labOrders, invoices] = await Promise.all([
      prisma.patient.findFirst({ where: { tenantId, id: patientId } }),
      prisma.appointment.findMany({
        where: { tenantId, patientId },
        include: { doctor: { include: { user: true, department: true } } },
        orderBy: { appointmentDate: "desc" },
      }),
      prisma.consultation.findMany({
        where: { patientId },
        include: {
          doctor: { include: { user: true } },
          prescriptions: { include: { items: true } },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.labOrder.findMany({
        where: { tenantId, patientId },
        include: { items: true },
        orderBy: { createdAt: "desc" },
      }),
      prisma.billingInvoice.findMany({
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
