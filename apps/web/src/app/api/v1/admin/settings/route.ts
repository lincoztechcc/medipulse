import { NextRequest } from "next/server";
import { prisma } from "@hospital/database";
import { getAuthContext, jsonResponse, unauthorizedResponse } from "@/lib/auth-helpers";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const auth = await getAuthContext(req);
  if (!auth) {
    return unauthorizedResponse("Authentication required");
  }

  const tenantId = auth.tenantId;
  if (!tenantId) {
    return unauthorizedResponse("Hospital tenant session required");
  }

  try {
    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
      include: { websiteSettings: true },
    });

    if (!tenant) {
      return jsonResponse({ error: "Tenant not found" }, 404);
    }

    return jsonResponse({
      success: true,
      tenant: {
        id: tenant.id,
        name: tenant.name,
        phone: tenant.phone,
        email: tenant.email,
        address: tenant.address,
        websiteSettings: tenant.websiteSettings,
      },
    });
  } catch (error: any) {
    return jsonResponse({ error: error.message || "Failed to load settings" }, 500);
  }
}

export async function PUT(req: NextRequest) {
  const auth = await getAuthContext(req);
  if (!auth) {
    return unauthorizedResponse("Authentication required");
  }

  const tenantId = auth.tenantId;
  if (!tenantId) {
    return unauthorizedResponse("Hospital tenant session required");
  }

  try {
    const body = await req.json();
    const { name, phone, email, address } = body;

    const updated = await prisma.tenant.update({
      where: { id: tenantId },
      data: {
        ...(name && { name }),
        ...(phone && { phone }),
        ...(email && { email }),
        ...(address && { address }),
      },
    });

    return jsonResponse({ success: true, updated });
  } catch (error: any) {
    return jsonResponse({ error: error.message || "Failed to update settings" }, 500);
  }
}
