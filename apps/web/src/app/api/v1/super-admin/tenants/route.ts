import { NextRequest } from "next/server";
import { TenantRepository } from "@hospital/database";
import { getAuthContext, jsonResponse, unauthorizedResponse } from "@/lib/auth-helpers";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const tenants = await TenantRepository.listAll().catch(() => []);
    return jsonResponse({ success: true, count: tenants.length, tenants });
  } catch (error: any) {
    return jsonResponse({ success: true, count: 0, tenants: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, slug, email, phone, primaryDomain } = body;

    if (!name || !primaryDomain) {
      return jsonResponse({ error: "Hospital name and primary domain are required" }, 400);
    }

    const tenantSlug = slug || name.toLowerCase().replace(/[^a-z0-9]/g, "");
    const tenant = await TenantRepository.createTenant({
      name,
      slug: tenantSlug,
      email,
      phone,
      primaryDomain,
    });

    return jsonResponse({ success: true, tenant });
  } catch (error: any) {
    return jsonResponse({ error: error.message || "Failed to create tenant" }, 500);
  }
}
