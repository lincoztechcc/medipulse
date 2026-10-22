import { NextRequest } from "next/server";
import { AppointmentRepository } from "@hospital/database";
import { getAuthContext, jsonResponse, unauthorizedResponse } from "@/lib/auth-helpers";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const auth = await getAuthContext(req);
  if (!auth) {
    return unauthorizedResponse("Authentication required to view daily appointments queue");
  }

  const tenantId = auth.tenantId;
  if (!tenantId) {
    return unauthorizedResponse("Hospital tenant session required");
  }

  const { searchParams } = new URL(req.url);
  const doctorId = searchParams.get("doctorId") || undefined;

  try {
    const queue = await AppointmentRepository.listTodayQueue(tenantId, doctorId);
    return jsonResponse({ success: true, count: queue.length, queue });
  } catch (error: any) {
    return jsonResponse({ error: error.message || "Failed to load appointment queue" }, 500);
  }
}
