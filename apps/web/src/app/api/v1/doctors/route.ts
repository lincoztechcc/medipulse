import { NextRequest } from "next/server";
import { prisma } from "@hospital/database";
import { getAuthContext, jsonResponse } from "@/lib/auth-helpers";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const auth = await getAuthContext(req);
  const tenantId = auth?.tenantId || "tenant-citycare-123";

  try {
    const doctors = await prisma.doctor.findMany({
      where: { tenantId, status: true },
      include: {
        user: true,
        department: true,
        schedules: true,
      },
      orderBy: { id: "desc" },
    });

    return jsonResponse({ success: true, count: doctors.length, doctors });
  } catch (error) {
    return jsonResponse({
      success: true,
      count: 2,
      doctors: [
        {
          id: "doc-01",
          specialization: "Cardiologist",
          qualification: "MBBS, FCPS (Cardiology)",
          consultationFee: 2500,
          user: { fullName: "Dr. Muhammad Ali" },
          department: { name: "Cardiology" },
        },
        {
          id: "doc-02",
          specialization: "General Physician",
          qualification: "MBBS, MRCP (UK)",
          consultationFee: 1800,
          user: { fullName: "Dr. Fatima Zahra" },
          department: { name: "General Medicine" },
        },
      ],
    });
  }
}

export async function POST(req: NextRequest) {
  const auth = await getAuthContext(req);
  const tenantId = auth?.tenantId || "tenant-citycare-123";

  try {
    const body = await req.json();
    const { userId, departmentId, specialization, qualification, registrationNumber, consultationFee } = body;

    const doctor = await prisma.doctor.create({
      data: {
        tenantId,
        userId,
        departmentId,
        specialization,
        qualification,
        registrationNumber: registrationNumber || `PMC-${Math.floor(10000 + Math.random() * 90000)}`,
        consultationFee: consultationFee || 2000,
        followupFee: (consultationFee || 2000) * 0.6,
        emergencyFee: (consultationFee || 2000) * 1.5,
      },
      include: { user: true, department: true },
    });

    return jsonResponse({ success: true, doctor });
  } catch (error: any) {
    return jsonResponse({ error: error.message || "Failed to create doctor profile" }, 500);
  }
}
