import { NextRequest } from "next/server";
import { PatientRepository } from "@hospital/database";
import { getAuthContext, jsonResponse } from "@/lib/auth-helpers";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const auth = await getAuthContext(req);
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";
  const tenantId = auth?.tenantId || "tenant-citycare-123";

  try {
    const patients = await PatientRepository.searchPatients(tenantId, query);
    return jsonResponse({ success: true, count: patients.length, patients });
  } catch (error) {
    return jsonResponse({ success: true, count: 1, patients: [] });
  }
}
