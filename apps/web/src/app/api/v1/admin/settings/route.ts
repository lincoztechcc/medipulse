import { NextRequest } from "next/server";
import { prisma } from "@hospital/database";
import { getAuthContext, jsonResponse } from "@/lib/auth-helpers";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const auth = await getAuthContext(req);
  const tenantId = auth?.tenantId || "tenant-citycare-123";

  return jsonResponse({
    success: true,
    tenant: {
      id: tenantId,
      name: "City Care Hospital",
      phone: "+92-42-35890000",
      email: "contact@citycarehospital.com",
    },
  });
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    return jsonResponse({ success: true, updated: body });
  } catch (error: any) {
    return jsonResponse({ error: error.message || "Failed to update settings" }, 500);
  }
}
