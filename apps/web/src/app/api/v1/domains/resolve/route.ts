import { NextRequest } from "next/server";
import { TenantRepository } from "@hospital/database";
import { jsonResponse } from "@/lib/auth-helpers";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const domain = searchParams.get("domain") || req.headers.get("x-tenant-domain");

  if (!domain) {
    return jsonResponse({ error: "Domain parameter or x-tenant-domain header required" }, 400);
  }

  const cleanDomain = domain.split(":")[0].toLowerCase();

  try {
    const tenant = await TenantRepository.findByDomain(cleanDomain);
    if (!tenant) {
      return jsonResponse({ error: `No tenant registered for domain '${cleanDomain}'`, success: false }, 404);
    }

    return jsonResponse({
      success: true,
      resolvedDomain: cleanDomain,
      tenant: {
        id: tenant.id,
        name: tenant.name,
        slug: tenant.slug,
        status: tenant.status,
      },
    });
  } catch (error: any) {
    return jsonResponse({ error: error.message || "Failed to resolve domain" }, 500);
  }
}
