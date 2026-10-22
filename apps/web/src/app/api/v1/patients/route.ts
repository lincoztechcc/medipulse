import { NextRequest } from "next/server";
import { PatientRepository } from "@hospital/database";
import { getAuthContext, jsonResponse, unauthorizedResponse } from "@/lib/auth-helpers";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
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
    const { fullName, dob, gender, phone, email, address, bloodGroup, allergies, medicalHistory } = body;

    if (!fullName || !phone) {
      return jsonResponse({ error: "Full name and phone number are required" }, 400);
    }

    const patient = await PatientRepository.createPatient(tenantId, {
      fullName,
      dob: dob ? new Date(dob) : new Date("1995-01-01"),
      gender: gender || "Male",
      phone,
      email,
      address,
      bloodGroup,
      allergies,
      medicalHistory,
    });

    return jsonResponse({ success: true, patient });
  } catch (error: any) {
    return jsonResponse({ error: error.message || "Failed to register patient" }, 500);
  }
}
