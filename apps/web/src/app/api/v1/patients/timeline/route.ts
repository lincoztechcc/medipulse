import { NextRequest } from "next/server";
import { PatientRepository } from "@hospital/database";
import { getAuthContext, jsonResponse } from "@/lib/auth-helpers";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const auth = await getAuthContext(req);
  const { searchParams } = new URL(req.url);
  const patientId = searchParams.get("patientId") || "patient-demo";
  const tenantId = auth?.tenantId || "tenant-citycare-123";

  try {
    const timeline = await PatientRepository.getLongitudinalTimeline(tenantId, patientId);
    return jsonResponse({ success: true, timeline });
  } catch (error) {
    return jsonResponse({ success: true, timeline: null });
  }
}
