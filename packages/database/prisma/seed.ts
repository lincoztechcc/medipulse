import { PrismaClient, HospitalStatus, AppointmentStatus } from "@prisma/client";
import { SystemRole, ROLE_DEFAULT_PERMISSIONS, PermissionCode } from "@hospital/permissions";
import { hashPassword } from "@hospital/auth";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Hospital Management SaaS Database Seeding...");

  // 1. Clean existing database
  await prisma.auditLog.deleteMany();
  await prisma.websiteSettings.deleteMany();
  await prisma.billingInvoice.deleteMany();
  await prisma.labOrderItem.deleteMany();
  await prisma.labOrder.deleteMany();
  await prisma.labTest.deleteMany();
  await prisma.medicineBatch.deleteMany();
  await prisma.medicine.deleteMany();
  await prisma.prescriptionItem.deleteMany();
  await prisma.prescription.deleteMany();
  await prisma.consultation.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.doctorSchedule.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.department.deleteMany();
  await prisma.rolePermission.deleteMany();
  await prisma.permission.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();
  await prisma.domain.deleteMany();
  await prisma.tenant.deleteMany();

  // 2. Create Permissions
  console.log("Creating permissions matrix...");
  const permissionMap: Record<string, string> = {};
  for (const code of Object.values(PermissionCode)) {
    const [module, action] = code.split("_");
    const perm = await prisma.permission.create({
      data: {
        code,
        module: module || "GENERAL",
        action: action || "ACCESS",
      },
    });
    permissionMap[code] = perm.id;
  }

  // 3. Create System Roles & Attach Permissions
  console.log("Creating system roles...");
  const roleMap: Record<string, string> = {};
  for (const roleKey of Object.keys(ROLE_DEFAULT_PERMISSIONS)) {
    const sysRole = roleKey as SystemRole;
    const role = await prisma.role.create({
      data: {
        name: sysRole,
        description: `System Role for ${sysRole}`,
        isSystem: true,
      },
    });
    roleMap[sysRole] = role.id;

    // Attach permissions
    const codes = ROLE_DEFAULT_PERMISSIONS[sysRole];
    for (const code of codes) {
      if (permissionMap[code]) {
        await prisma.rolePermission.create({
          data: {
            roleId: role.id,
            permissionId: permissionMap[code],
          },
        });
      }
    }
  }

  // 4. Create Tenant: City Care Hospital
  console.log("Creating Demo Hospital Tenant: City Care Hospital...");
  const tenant = await prisma.tenant.create({
    data: {
      id: "tenant-citycare-123",
      name: "City Care Hospital",
      slug: "citycare",
      phone: "+92-42-35890000",
      whatsappNumber: "+92-300-1234567",
      email: "contact@citycarehospital.com",
      address: "14-Main Boulevard, Gulberg III, Lahore, Pakistan",
      googleMapsUrl: "https://maps.google.com/?q=Lahore",
      status: HospitalStatus.ACTIVE,
    },
  });

  // Domains
  await prisma.domain.createMany({
    data: [
      { tenantId: tenant.id, domain: "citycarehospital.com", isPrimary: true },
      { tenantId: tenant.id, domain: "citycare.localhost", isPrimary: false },
      { tenantId: tenant.id, domain: "localhost", isPrimary: false },
    ],
  });

  // 5. Create Super Admin User
  await prisma.user.create({
    data: {
      email: "superadmin@platform.com",
      passwordHash: hashPassword("Admin123!"),
      fullName: "Platform Super Admin",
      phone: "+92-300-0000000",
      roleId: roleMap[SystemRole.SUPER_ADMIN],
    },
  });

  // 6. Create Hospital Admin User
  const hospitalAdminUser = await prisma.user.create({
    data: {
      tenantId: tenant.id,
      email: "admin@citycare.com",
      passwordHash: hashPassword("Admin123!"),
      fullName: "Dr. Tariq Mahmood (Hospital Admin)",
      phone: "+92-300-1111111",
      roleId: roleMap[SystemRole.HOSPITAL_ADMIN],
    },
  });

  // 7. Departments
  const deptCardio = await prisma.department.create({
    data: {
      tenantId: tenant.id,
      name: "Cardiology",
      description: "Heart and Cardiovascular Specialty Care",
    },
  });

  const deptGeneral = await prisma.department.create({
    data: {
      tenantId: tenant.id,
      name: "General Medicine",
      description: "Primary & Internal Healthcare Services",
    },
  });

  // 8. Doctors & Schedules
  const docUser1 = await prisma.user.create({
    data: {
      tenantId: tenant.id,
      email: "dr.ali@citycare.com",
      passwordHash: hashPassword("Doctor123!"),
      fullName: "Dr. Muhammad Ali",
      phone: "+92-300-2222222",
      roleId: roleMap[SystemRole.DOCTOR],
    },
  });

  const doctor1 = await prisma.doctor.create({
    data: {
      tenantId: tenant.id,
      userId: docUser1.id,
      departmentId: deptCardio.id,
      specialization: "Cardiologist",
      qualification: "MBBS, FCPS (Cardiology)",
      registrationNumber: "PMC-98765-C",
      consultationFee: 2500,
      followupFee: 1500,
      emergencyFee: 4000,
    },
  });

  // Schedule for Dr. Ali (Mon-Fri)
  for (let day = 1; day <= 5; day++) {
    await prisma.doctorSchedule.create({
      data: {
        doctorId: doctor1.id,
        dayOfWeek: day,
        startTime: "09:00",
        endTime: "14:00",
        slotDuration: 15,
        maxPatients: 20,
      },
    });
  }

  // Doctor 2
  const docUser2 = await prisma.user.create({
    data: {
      tenantId: tenant.id,
      email: "dr.fatima@citycare.com",
      passwordHash: hashPassword("Doctor123!"),
      fullName: "Dr. Fatima Zahra",
      phone: "+92-300-3333333",
      roleId: roleMap[SystemRole.DOCTOR],
    },
  });

  const doctor2 = await prisma.doctor.create({
    data: {
      tenantId: tenant.id,
      userId: docUser2.id,
      departmentId: deptGeneral.id,
      specialization: "General Physician",
      qualification: "MBBS, MRCP (UK)",
      registrationNumber: "PMC-12345-M",
      consultationFee: 1800,
      followupFee: 1000,
      emergencyFee: 3000,
    },
  });

  // 9. Receptionist, Pharmacist, Lab Tech Users
  await prisma.user.create({
    data: {
      tenantId: tenant.id,
      email: "reception@citycare.com",
      passwordHash: hashPassword("Reception123!"),
      fullName: "Sarah Khan (Reception Desk)",
      roleId: roleMap[SystemRole.RECEPTIONIST],
    },
  });

  await prisma.user.create({
    data: {
      tenantId: tenant.id,
      email: "pharmacy@citycare.com",
      passwordHash: hashPassword("Pharmacy123!"),
      fullName: "Usman Ahmed (Lead Pharmacist)",
      roleId: roleMap[SystemRole.PHARMACIST],
    },
  });

  await prisma.user.create({
    data: {
      tenantId: tenant.id,
      email: "lab@citycare.com",
      passwordHash: hashPassword("Lab123!"),
      fullName: "Zainab Bibi (Lab Senior Tech)",
      roleId: roleMap[SystemRole.LAB_TECHNICIAN],
    },
  });

  // 10. Demo Patient (MRN: HSP-2026-000123)
  const patientUser = await prisma.user.create({
    data: {
      tenantId: tenant.id,
      email: "patient@citycare.com",
      passwordHash: hashPassword("Patient123!"),
      fullName: "Muhammad Usman",
      phone: "+92-321-9876543",
      roleId: roleMap[SystemRole.PATIENT],
    },
  });

  const patient = await prisma.patient.create({
    data: {
      tenantId: tenant.id,
      userId: patientUser.id,
      mrn: "HSP-2026-000123",
      fullName: "Muhammad Usman",
      dob: new Date("1990-05-15"),
      gender: "Male",
      bloodGroup: "A+",
      phone: "+92-321-9876543",
      whatsapp: "+92-321-9876543",
      email: "patient@citycare.com",
      address: "House 42, Street 5, Model Town, Lahore",
      cnicPassport: "35202-1234567-1",
      emergencyContact: "+92-300-9998877 (Brother)",
      allergies: "Penicillin, Dust",
      medicalHistory: "Mild Hypertension diagnosed in 2024",
    },
  });

  // 11. Demo Appointments
  const today = new Date();
  const appointment = await prisma.appointment.create({
    data: {
      tenantId: tenant.id,
      patientId: patient.id,
      doctorId: doctor1.id,
      appointmentNumber: "APT-2026-001",
      appointmentDate: today,
      timeSlot: "10:30 AM",
      status: AppointmentStatus.CHECKED_IN,
      fee: doctor1.consultationFee,
      notes: "Routine cardiac checkup & ECG review",
    },
  });

  // 12. Consultation & Prescription Record
  const consultation = await prisma.consultation.create({
    data: {
      appointmentId: appointment.id,
      patientId: patient.id,
      doctorId: doctor1.id,
      symptoms: "Mild chest tightness upon exertion, fatigue",
      diagnosis: "Essential Hypertension, Mild Stress",
      clinicalNotes: "Patient blood pressure is 135/88 mmHg. Advised CBC blood test and low sodium diet.",
    },
  });

  const prescription = await prisma.prescription.create({
    data: {
      consultationId: consultation.id,
    },
  });

  await prisma.prescriptionItem.createMany({
    data: [
      {
        prescriptionId: prescription.id,
        medicineName: "Paracetamol 500mg",
        dosage: "500mg",
        frequency: "1-0-1",
        duration: "5 Days",
        instructions: "Take after meals",
      },
      {
        prescriptionId: prescription.id,
        medicineName: "Atorvastatin 20mg",
        dosage: "20mg",
        frequency: "0-0-1",
        duration: "30 Days",
        instructions: "Take before bedtime",
      },
    ],
  });

  // 13. Pharmacy Medicines & Stock Inventory
  const med1 = await prisma.medicine.create({
    data: {
      tenantId: tenant.id,
      brandName: "Panadol 500mg",
      genericName: "Paracetamol",
      manufacturer: "GSK",
      category: "Analgesic",
      unitPrice: 15,
      stockQuantity: 500,
      reorderLevel: 50,
    },
  });

  await prisma.medicineBatch.create({
    data: {
      medicineId: med1.id,
      batchNumber: "BAT-2026-01",
      expiryDate: new Date("2028-12-31"),
      costPrice: 8,
      salePrice: 15,
      quantity: 500,
    },
  });

  const med2 = await prisma.medicine.create({
    data: {
      tenantId: tenant.id,
      brandName: "Lipiget 20mg",
      genericName: "Atorvastatin",
      manufacturer: "Getz Pharma",
      category: "Cardiovascular",
      unitPrice: 45,
      stockQuantity: 150,
      reorderLevel: 20,
    },
  });

  await prisma.medicineBatch.create({
    data: {
      medicineId: med2.id,
      batchNumber: "BAT-2026-02",
      expiryDate: new Date("2027-10-31"),
      costPrice: 25,
      salePrice: 45,
      quantity: 150,
    },
  });

  // 14. Lab Tests & Orders
  const cbcTest = await prisma.labTest.create({
    data: {
      tenantId: tenant.id,
      name: "Complete Blood Count (CBC)",
      category: "Hematology",
      sampleType: "Whole Blood (EDTA)",
      price: 850,
      referenceRange: "Hb: 13.5-17.5 g/dL, WBC: 4,000-11,000 /mcL",
      unit: "Standard",
    },
  });

  await prisma.labTest.create({
    data: {
      tenantId: tenant.id,
      name: "Lipid Profile",
      category: "Biochemistry",
      sampleType: "Serum",
      price: 1800,
      referenceRange: "Cholesterol: <200 mg/dL, Triglycerides: <150 mg/dL",
      unit: "mg/dL",
    },
  });

  // Demo Lab Order for Usman
  const labOrder = await prisma.labOrder.create({
    data: {
      tenantId: tenant.id,
      patientId: patient.id,
      orderNumber: "LAB-2026-000123",
      status: "SAMPLE_COLLECTED",
    },
  });

  await prisma.labOrderItem.create({
    data: {
      labOrderId: labOrder.id,
      labTestName: cbcTest.name,
      status: "PROCESSING",
    },
  });

  // 15. Billing Invoice
  await prisma.billingInvoice.create({
    data: {
      tenantId: tenant.id,
      patientId: patient.id,
      invoiceNumber: "INV-2026-000123",
      totalAmount: 2500,
      paidAmount: 2500,
      status: "PAID",
    },
  });

  // 16. Website CMS Configuration
  await prisma.websiteSettings.create({
    data: {
      tenantId: tenant.id,
      heroTitle: "World-Class Healthcare Services at City Care Hospital",
      heroSubtitle: "Dedicated to your health, offering 24/7 emergency, expert consultations, laboratory, and pharmacy services.",
      aboutText: "City Care Hospital is a premier medical center delivering compassionate, patient-centered care equipped with state-of-the-art diagnostic and clinical technology.",
      primaryColor: "#0284c7",
      metaTitle: "City Care Hospital - Leading Healthcare & Specialist Clinic",
      metaDescription: "Book doctor appointments, view lab reports, and access 24/7 medical services at City Care Hospital.",
    },
  });

  console.log("✅ Database Seeding Completed Successfully!");
  console.log("--------------------------------------------------");
  console.log("🔑 Demo Credentials Created:");
  console.log("Super Admin:   superadmin@platform.com / Admin123!");
  console.log("Hospital Admin: admin@citycare.com      / Admin123!");
  console.log("Doctor Ali:     dr.ali@citycare.com     / Doctor123!");
  console.log("Doctor Fatima:  dr.fatima@citycare.com  / Doctor123!");
  console.log("Receptionist:   reception@citycare.com  / Reception123!");
  console.log("Pharmacist:     pharmacy@citycare.com   / Pharmacy123!");
  console.log("Lab Tech:       lab@citycare.com        / Lab123!");
  console.log("Patient:        patient@citycare.com     / Patient123!");
  console.log("--------------------------------------------------");
}

main()
  .catch((e) => {
    console.error("❌ Database Seeding Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
