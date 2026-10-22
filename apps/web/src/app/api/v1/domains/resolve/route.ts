import { NextRequest } from "next/server";
import { TenantRepository } from "@hospital/database";
import { jsonResponse } from "@/lib/auth-helpers";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const domain = searchParams.get("domain") || req.headers.get("x-tenant-domain") || "citycarehospital.com";
  const cleanDomain = domain.split(":")[0];

  try {
    const tenant = await TenantRepository.findByDomain(cleanDomain);
    return jsonResponse({
      success: true,
      resolvedDomain: cleanDomain,
      tenant: tenant || {
        id: "tenant-citycare-123",
        name: "City Care Hospital",
        slug: "citycare",
      },
    });
  } catch (e) {
    return jsonResponse({
      success: true,
      resolvedDomain: cleanDomain,
      tenant: {
        id: "tenant-citycare-123",
        name: "City Care Hospital",
        slug: "citycare",
      },
    });
  }
}
