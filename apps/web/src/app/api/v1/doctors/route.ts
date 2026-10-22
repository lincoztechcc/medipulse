import { NextRequest } from "next/server";
import { prisma, TenantRepository } from "@hospital/database";
import { getAuthContext, jsonResponse, unauthorizedResponse } from "@/lib/auth-helpers";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const auth = await getAuthContext(req);
  const { searchParams } = new URL(req.url);

  let tenantId = auth?.tenantId;

  // If not logged in, resolve tenant from header or domain query for public directory
  if (!tenantId) {
    const domainHeader = req.headers.get("x-tenant-domain");
    const domainParam = searchParams.get("domain");
    const domainToLookup = (domainParam || domainHeader || "").split(":")[0];

    if (domainToLookup) {
      const tenant = await TenantRepository.findByDomain(domainToLookup);
      tenantId = tenant?.id;
    }
  }

  if (!tenantId) {
    const explicitTenant = searchParams.get("tenantId");
    if (explicitTenant) {
      tenantId = explicitTenant;
    }
  }

  if (!tenantId) {
    return jsonResponse({ error: "Hospital tenant context required" }, 400);
  }

  try {
    const doctors = await prisma.doctor.findMany({
      where: { tenantId, status: true },
      include: {
        user: { select: { fullName: true, email: true, phone: true } },
        department: true,
        schedules: true,
      },
      orderBy: { id: "desc" },
    });

    return jsonResponse({ success: true, count: doctors.length, doctors });
  } catch (error: any) {
    return jsonResponse({ error: error.message || "Failed to fetch doctors list" }, 500);
  }
}

export async function POST(req: NextRequest) {
  const auth = await getAuthContext(req);
  if (!auth) {
    return unauthorizedResponse("Authentication required to create a doctor profile");
  }

  const tenantId = auth.tenantId;
  if (!tenantId) {
    return unauthorizedResponse("Hospital tenant session required");
  }

  try {
    const body = await req.json();
    const { userId, departmentId, specialization, qualification, registrationNumber, consultationFee } = body;

    if (!userId || !departmentId || !specialization) {
      return jsonResponse({ error: "userId, departmentId, and specialization are required" }, 400);
    }

    const doctor = await prisma.doctor.create({
      data: {
        tenantId,
        userId,
        departmentId,
        specialization,
        qualification: qualification || "MBBS",
        registrationNumber: registrationNumber || `PMC-${Math.floor(10000 + Math.random() * 90000)}`,
        consultationFee: consultationFee || 2000,
        followupFee: (consultationFee || 2000) * 0.6,
        emergencyFee: (consultationFee || 2000) * 1.5,
      },
      include: {
        user: { select: { fullName: true, email: true } },
        department: true,
      },
    });

    return jsonResponse({ success: true, doctor });
  } catch (error: any) {
    return jsonResponse({ error: error.message || "Failed to create doctor profile" }, 500);
  }
}
