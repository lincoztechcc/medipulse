import { NextRequest } from "next/server";
import { LabRepository } from "@hospital/database";
import { getAuthContext, jsonResponse } from "@/lib/auth-helpers";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const auth = await getAuthContext(req);
  const tenantId = auth?.tenantId || "tenant-citycare-123";

  try {
    const body = await req.json();
    const { labOrderId, results } = body;

    if (!labOrderId || !results) {
      return jsonResponse({ error: "labOrderId and results array are required" }, 400);
    }

    const verifiedOrder = await LabRepository.submitResultsAndVerify(tenantId, labOrderId, results);
    return jsonResponse({ success: true, order: verifiedOrder });
  } catch (error: any) {
    return jsonResponse({ error: error.message || "Failed to verify lab report" }, 500);
  }
}
