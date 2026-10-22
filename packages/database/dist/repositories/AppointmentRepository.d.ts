import { Appointment, AppointmentStatus } from "../index";
export declare class AppointmentRepository {
    /**
     * Book appointment with concurrency double-booking guard
     */
    static bookAppointment(tenantId: string, data: {
        patientId: string;
        doctorId: string;
        appointmentDate: Date;
        timeSlot: string;
        fee: number;
        notes?: string;
    }): Promise<{
        success: boolean;
        appointment?: Appointment;
        message?: string;
    }>;
    /**
     * Update appointment status (CHECKED_IN, WAITING, COMPLETED, CANCELLED)
     */
    static updateStatus(tenantId: string, appointmentId: string, status: AppointmentStatus): Promise<import(".prisma/client").Prisma.BatchPayload>;
    /**
     * List today's OPD appointments queue
     */
    static listTodayQueue(tenantId: string, doctorId?: string): Promise<({
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
    })[]>;
}
