import { Patient } from "../index";
export declare class PatientRepository {
    /**
     * Generate next unique MRN for a tenant: HSP-YYYY-XXXXXX
     */
    static generateMRN(tenantId: string): Promise<string>;
    /**
     * Register a new patient with automatic MRN generation
     */
    static createPatient(tenantId: string, data: {
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
    }): Promise<Patient>;
    /**
     * Find patient by MRN strictly within tenant boundary
     */
    static findByMRN(tenantId: string, mrn: string): Promise<Patient | null>;
    /**
     * Search patients by MRN, Name, Phone or CNIC
     */
    static searchPatients(tenantId: string, query: string): Promise<Patient[]>;
    /**
     * Get Unified Longitudinal Patient Record Timeline
     */
    static getLongitudinalTimeline(tenantId: string, patientId: string): Promise<{
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
        appointments: ({
            doctor: {
                user: {
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
                };
                department: {
                    name: string;
                    id: string;
                    tenantId: string;
                    description: string | null;
                };
            } & {
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
            };
        } & {
            id: string;
            status: import(".prisma/client").$Enums.AppointmentStatus;
            createdAt: Date;
            tenantId: string;
            patientId: string;
            doctorId: string;
            appointmentNumber: string;
            appointmentDate: Date;
            timeSlot: string;
            fee: import("@prisma/client/runtime/library").Decimal;
            notes: string | null;
        })[];
        consultations: ({
            doctor: {
                user: {
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
                };
            } & {
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
            };
            prescriptions: ({
                items: {
                    id: string;
                    prescriptionId: string;
                    medicineName: string;
                    dosage: string;
                    frequency: string;
                    duration: string;
                    instructions: string | null;
                }[];
            } & {
                id: string;
                createdAt: Date;
                consultationId: string;
            })[];
        } & {
            id: string;
            createdAt: Date;
            patientId: string;
            doctorId: string;
            appointmentId: string;
            symptoms: string | null;
            diagnosis: string | null;
            clinicalNotes: string | null;
        })[];
        labOrders: ({
            items: {
                id: string;
                status: string;
                labOrderId: string;
                labTestName: string;
                resultValue: string | null;
            }[];
        } & {
            id: string;
            status: string;
            createdAt: Date;
            tenantId: string;
            patientId: string;
            orderNumber: string;
        })[];
        invoices: {
            id: string;
            status: string;
            createdAt: Date;
            tenantId: string;
            patientId: string;
            invoiceNumber: string;
            totalAmount: import("@prisma/client/runtime/library").Decimal;
            discount: import("@prisma/client/runtime/library").Decimal;
            paidAmount: import("@prisma/client/runtime/library").Decimal;
        }[];
    }>;
}
