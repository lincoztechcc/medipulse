import { prisma, Appointment, AppointmentStatus } from "../index";

export class AppointmentRepository {
  /**
   * Book appointment with concurrency double-booking guard
   */
  static async bookAppointment(
    tenantId: string,
    data: {
      patientId: string;
      doctorId: string;
      appointmentDate: Date;
      timeSlot: string;
      fee: number;
      notes?: string;
    }
  ): Promise<{ success: boolean; appointment?: Appointment; message?: string }> {
    // 1. Check double booking collision
    const existing = await prisma.appointment.findFirst({
      where: {
        tenantId,
        doctorId: data.doctorId,
        appointmentDate: data.appointmentDate,
        timeSlot: data.timeSlot,
        status: { notIn: [AppointmentStatus.CANCELLED, AppointmentStatus.NO_SHOW] },
      },
    });

    if (existing) {
      return {
        success: false,
        message: `The selected slot (${data.timeSlot}) is no longer available for this doctor.`,
      };
    }

    const count = await prisma.appointment.count({ where: { tenantId } });
    const appointmentNumber = `APT-${new Date().getFullYear()}-${String(count + 1).padStart(4, "0")}`;

    const appointment = await prisma.appointment.create({
      data: {
        tenantId,
        patientId: data.patientId,
        doctorId: data.doctorId,
        appointmentNumber,
        appointmentDate: data.appointmentDate,
        timeSlot: data.timeSlot,
        fee: data.fee,
        notes: data.notes,
        status: AppointmentStatus.PENDING,
      },
      include: {
        patient: true,
        doctor: { include: { user: true, department: true } },
      },
    });

    return { success: true, appointment };
  }

  /**
   * Update appointment status (CHECKED_IN, WAITING, COMPLETED, CANCELLED)
   */
  static async updateStatus(tenantId: string, appointmentId: string, status: AppointmentStatus) {
    return prisma.appointment.updateMany({
      where: { tenantId, id: appointmentId },
      data: { status },
    });
  }

  /**
   * List today's OPD appointments queue
   */
  static async listTodayQueue(tenantId: string, doctorId?: string) {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    return prisma.appointment.findMany({
      where: {
        tenantId,
        ...(doctorId ? { doctorId } : {}),
        appointmentDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: {
        patient: true,
        doctor: { include: { user: true, department: true } },
      },
      orderBy: { createdAt: "asc" },
    });
  }
}
