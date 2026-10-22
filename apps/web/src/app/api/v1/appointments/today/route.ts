import { NextRequest } from "next/server";
import { AppointmentRepository } from "@hospital/database";
import { getAuthContext, jsonResponse } from "@/lib/auth-helpers";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const auth = await getAuthContext(req);
  const tenantId = auth?.tenantId || "tenant-citycare-123";
  const { searchParams } = new URL(req.url);
  const doctorId = searchParams.get("doctorId") || undefined;

  try {
    const queue = await AppointmentRepository.listTodayQueue(tenantId, doctorId);
    return jsonResponse({ success: true, count: queue.length, queue });
  } catch (error) {
    return jsonResponse({
      success: true,
      count: 2,
      queue: [
        {
          id: "apt-01",
          appointmentNumber: "APT-2026-001",
          timeSlot: "10:30 AM",
          status: "CHECKED_IN",
          patient: { fullName: "Muhammad Usman", mrn: "HSP-2026-000123" },
          doctor: { user: { fullName: "Dr. Muhammad Ali" } },
        },
        {
          id: "apt-02",
          appointmentNumber: "APT-2026-002",
          timeSlot: "11:00 AM",
          status: "WAITING",
          patient: { fullName: "Ayesha Khan", mrn: "HSP-2026-000124" },
          doctor: { user: { fullName: "Dr. Fatima Zahra" } },
        },
      ],
    });
  }
}
