import { NextRequest } from "next/server";
import { TenantRepository } from "@hospital/database";
import { getAuthContext, jsonResponse, unauthorizedResponse, forbiddenResponse } from "@/lib/auth-helpers";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const auth = await getAuthContext(req);
  if (!auth) {
    return unauthorizedResponse("Authentication required");
  }
  if (auth.role !== "SUPER_ADMIN") {
    return forbiddenResponse("Super Admin privileges required");
  }

  try {
    const tenants = await TenantRepository.listAll().catch(() => []);
    return jsonResponse({ success: true, count: tenants.length, tenants });
  } catch (error: any) {
    return jsonResponse({ success: false, error: error.message || "Failed to fetch tenants" }, 500);
  }
}

export async function POST(req: NextRequest) {
  const auth = await getAuthContext(req);
  if (!auth) {
    return unauthorizedResponse("Authentication required");
  }
  if (auth.role !== "SUPER_ADMIN") {
    return forbiddenResponse("Super Admin privileges required");
  }

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
