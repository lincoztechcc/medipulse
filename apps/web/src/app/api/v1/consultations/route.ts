import { NextRequest } from "next/server";
import { prisma, LabRepository } from "@hospital/database";
import { getAuthContext, jsonResponse } from "@/lib/auth-helpers";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const auth = await getAuthContext(req);
  const tenantId = auth?.tenantId || "tenant-citycare-123";

  try {
    const body = await req.json();
    const { appointmentId, patientId, doctorId, symptoms, diagnosis, clinicalNotes, prescriptions, labTests } = body;

    if (!appointmentId || !patientId || !doctorId) {
      return jsonResponse({ error: "appointmentId, patientId, and doctorId are required" }, 400);
    }

    // 1. Create Consultation Record
    const consultation = await prisma.consultation.create({
      data: {
        appointmentId,
        patientId,
        doctorId,
        symptoms,
        diagnosis,
        clinicalNotes,
      },
    });

    // 2. Create Prescriptions if present
    if (prescriptions && prescriptions.length > 0) {
      const rx = await prisma.prescription.create({
        data: { consultationId: consultation.id },
      });

      await prisma.prescriptionItem.createMany({
        data: prescriptions.map((p: any) => ({
          prescriptionId: rx.id,
          medicineName: p.name || p.medicineName,
          dosage: p.dosage || "500mg",
          frequency: p.frequency || "1-0-1",
          duration: p.duration || "5 Days",
          instructions: p.instructions || "As directed",
        })),
      });
    }

    // 3. Create Lab Order if present
    if (labTests && labTests.length > 0) {
      await LabRepository.createOrder(tenantId, patientId, labTests);
    }

    // 4. Update appointment status to COMPLETED
    await prisma.appointment.updateMany({
      where: { tenantId, id: appointmentId },
      data: { status: "COMPLETED" },
    });

    return jsonResponse({ success: true, consultation });
  } catch (error: any) {
    return jsonResponse({ error: error.message || "Failed to record consultation" }, 500);
  }
}
