import { NextRequest } from "next/server";
import { PatientRepository } from "@hospital/database";
import { getAuthContext, jsonResponse, unauthorizedResponse } from "@/lib/auth-helpers";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const auth = await getAuthContext(req);
  if (!auth) {
    return unauthorizedResponse("Authentication required to search patients");
  }

  const tenantId = auth.tenantId;
  if (!tenantId) {
    return unauthorizedResponse("Hospital tenant session required");
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";

  try {
    const patients = await PatientRepository.searchPatients(tenantId, query);
    return jsonResponse({ success: true, count: patients.length, patients });
  } catch (error: any) {
    return jsonResponse({ error: error.message || "Failed to search patients" }, 500);
  }
}
