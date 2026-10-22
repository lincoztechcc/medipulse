import { NextRequest } from "next/server";
import { AppointmentRepository } from "@hospital/database";
import { getAuthContext, jsonResponse } from "@/lib/auth-helpers";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const auth = await getAuthContext(req);
  const tenantId = auth?.tenantId || "tenant-citycare-123";

  try {
    const body = await req.json();
    const { patientId, doctorId, appointmentDate, timeSlot, fee, notes } = body;

    if (!patientId || !doctorId || !timeSlot) {
      return jsonResponse({ error: "patientId, doctorId, and timeSlot are required" }, 400);
    }

    const result = await AppointmentRepository.bookAppointment(tenantId, {
      patientId,
      doctorId,
      appointmentDate: appointmentDate ? new Date(appointmentDate) : new Date(),
      timeSlot,
      fee: fee || 2000,
      notes,
    });

    if (!result.success) {
      return jsonResponse({ error: result.message }, 409); // 409 Conflict for double booking
    }

    return jsonResponse({ success: true, appointment: result.appointment });
  } catch (error: any) {
    return jsonResponse({ error: error.message || "Failed to book appointment" }, 500);
  }
}
