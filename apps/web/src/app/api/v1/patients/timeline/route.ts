import { NextRequest } from "next/server";
import { PatientRepository } from "@hospital/database";
import { getAuthContext, jsonResponse, unauthorizedResponse } from "@/lib/auth-helpers";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const auth = await getAuthContext(req);
  if (!auth) {
    return unauthorizedResponse("Authentication required to view patient medical timeline");
  }

  const tenantId = auth.tenantId;
  if (!tenantId) {
    return unauthorizedResponse("Hospital tenant session required");
  }

  const { searchParams } = new URL(req.url);
  const patientId = searchParams.get("patientId");

  if (!patientId) {
    return jsonResponse({ error: "patientId parameter is required" }, 400);
  }

  try {
    const timeline = await PatientRepository.getLongitudinalTimeline(tenantId, patientId);
    return jsonResponse({ success: true, timeline });
  } catch (error: any) {
    return jsonResponse({ error: error.message || "Failed to load timeline" }, 500);
  }
}
