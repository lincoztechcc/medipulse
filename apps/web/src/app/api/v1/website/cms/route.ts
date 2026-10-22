import { NextRequest } from "next/server";
import { prisma, TenantRepository } from "@hospital/database";
import { jsonResponse } from "@/lib/auth-helpers";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const domain = searchParams.get("domain") || req.headers.get("x-tenant-domain");

  if (!domain) {
    return jsonResponse({ error: "Domain parameter or header required" }, 400);
  }

  const cleanDomain = domain.split(":")[0].toLowerCase();

  try {
    const tenant = await TenantRepository.findByDomain(cleanDomain);
    if (!tenant) {
      return jsonResponse({ error: `No hospital website found for '${cleanDomain}'`, success: false }, 404);
    }

    const tenantId = tenant.id;

    const [settings, doctors, departments] = await Promise.all([
      prisma.websiteSettings.findUnique({ where: { tenantId } }),
      prisma.doctor.findMany({
        where: { tenantId, status: true },
        include: {
          user: { select: { fullName: true, email: true, phone: true } },
          department: true,
          schedules: true,
        },
      }),
      prisma.department.findMany({ where: { tenantId } }),
    ]);

    return jsonResponse({
      success: true,
      tenant: {
        id: tenant.id,
        name: tenant.name,
        slug: tenant.slug,
        phone: tenant.phone,
        whatsappNumber: tenant.whatsappNumber,
        email: tenant.email,
        address: tenant.address,
        googleMapsUrl: tenant.googleMapsUrl,
      },
      cms: settings || {
        heroTitle: `Welcome to ${tenant.name}`,
        heroSubtitle: "Dedicated to high-quality patient healthcare services.",
        aboutText: `${tenant.name} delivers modern and compassionate healthcare.`,
        primaryColor: "#0284c7",
      },
      doctors,
      departments,
    });
  } catch (error: any) {
    return jsonResponse({ error: error.message || "Failed to load website CMS data" }, 500);
  }
}
