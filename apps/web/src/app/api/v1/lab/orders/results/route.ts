import { NextRequest } from "next/server";
import { LabRepository } from "@hospital/database";
import { getAuthContext, jsonResponse, unauthorizedResponse } from "@/lib/auth-helpers";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const auth = await getAuthContext(req);
  if (!auth) {
    return unauthorizedResponse("Authentication required to submit laboratory results");
  }

  const tenantId = auth.tenantId;
  if (!tenantId) {
    return unauthorizedResponse("Hospital tenant session required");
  }

  try {
    const body = await req.json();
    const { labOrderId, results } = body;

    if (!labOrderId || !results || !Array.isArray(results)) {
      return jsonResponse({ error: "labOrderId and results array are required" }, 400);
    }

    const verifiedOrder = await LabRepository.submitResultsAndVerify(tenantId, labOrderId, results);
    return jsonResponse({ success: true, order: verifiedOrder });
  } catch (error: any) {
    return jsonResponse({ error: error.message || "Failed to verify lab report" }, 500);
  }
}
