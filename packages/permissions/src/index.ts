export enum SystemRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  HOSPITAL_ADMIN = "HOSPITAL_ADMIN",
  DOCTOR = "DOCTOR",
  SENIOR_DOCTOR = "SENIOR_DOCTOR",
  RECEPTIONIST = "RECEPTIONIST",
  NURSE = "NURSE",
  LAB_MANAGER = "LAB_MANAGER",
  LAB_TECHNICIAN = "LAB_TECHNICIAN",
  PHARMACIST = "PHARMACIST",
  PHARMACY_MANAGER = "PHARMACY_MANAGER",
  ACCOUNTANT = "ACCOUNTANT",
  HR_MANAGER = "HR_MANAGER",
  STORE_MANAGER = "STORE_MANAGER",
  RADIOLOGIST = "RADIOLOGIST",
  RADIOLOGY_TECHNICIAN = "RADIOLOGY_TECHNICIAN",
  BILLING_OFFICER = "BILLING_OFFICER",
  FRONT_DESK = "FRONT_DESK",
  PATIENT = "PATIENT"
}

export enum PermissionCode {
  // Patient Permissions
  PATIENT_VIEW = "PATIENT_VIEW",
  PATIENT_CREATE = "PATIENT_CREATE",
  PATIENT_EDIT = "PATIENT_EDIT",
  PATIENT_DELETE = "PATIENT_DELETE",
  PATIENT_TIMELINE_VIEW = "PATIENT_TIMELINE_VIEW",

  // Appointment Permissions
  APPOINTMENT_VIEW = "APPOINTMENT_VIEW",
  APPOINTMENT_BOOK = "APPOINTMENT_BOOK",
  APPOINTMENT_CANCEL = "APPOINTMENT_CANCEL",
  APPOINTMENT_RESCHEDULE = "APPOINTMENT_RESCHEDULE",

  // Clinical & EMR
  EMR_VIEW = "EMR_VIEW",
  EMR_EDIT = "EMR_EDIT",
  CONSULTATION_START = "CONSULTATION_START",
  PRESCRIPTION_CREATE = "PRESCRIPTION_CREATE",

  // Pharmacy & POS
  PHARMACY_VIEW = "PHARMACY_VIEW",
  PHARMACY_POS = "PHARMACY_POS",
  PHARMACY_DISPENSE = "PHARMACY_DISPENSE",
  PHARMACY_STOCK_MANAGE = "PHARMACY_STOCK_MANAGE",

  // Laboratory & LIS
  LAB_ORDER_VIEW = "LAB_ORDER_VIEW",
  LAB_SAMPLE_COLLECT = "LAB_SAMPLE_COLLECT",
  LAB_RESULT_ENTER = "LAB_RESULT_ENTER",
  LAB_REPORT_VERIFY = "LAB_REPORT_VERIFY",

  // Radiology
  RADIOLOGY_VIEW = "RADIOLOGY_VIEW",
  RADIOLOGY_REPORT_CREATE = "RADIOLOGY_REPORT_CREATE",

  // Billing & Accounting
  BILLING_VIEW = "BILLING_VIEW",
  BILLING_INVOICE_CREATE = "BILLING_INVOICE_CREATE",
  BILLING_PAYMENT_COLLECT = "BILLING_PAYMENT_COLLECT",
  BILLING_REFUND = "BILLING_REFUND",

  // HR & Payroll
  HR_VIEW = "HR_VIEW",
  HR_EMPLOYEE_MANAGE = "HR_EMPLOYEE_MANAGE",
  HR_PAYROLL_MANAGE = "HR_PAYROLL_MANAGE",
  HR_ATTENDANCE_MANAGE = "HR_ATTENDANCE_MANAGE",

  // Website & CMS
  WEBSITE_MANAGE = "WEBSITE_MANAGE",
  DOMAIN_MANAGE = "DOMAIN_MANAGE",

  // Admin & Settings
  ADMIN_SETTINGS_MANAGE = "ADMIN_SETTINGS_MANAGE",
  AUDIT_LOGS_VIEW = "AUDIT_LOGS_VIEW",

  // SaaS Super Admin
  SUPER_ADMIN_MANAGE_TENANTS = "SUPER_ADMIN_MANAGE_TENANTS",
  SUPER_ADMIN_MANAGE_PLANS = "SUPER_ADMIN_MANAGE_PLANS"
}

export const ROLE_DEFAULT_PERMISSIONS: Record<SystemRole, PermissionCode[]> = {
  [SystemRole.SUPER_ADMIN]: Object.values(PermissionCode),
  
  [SystemRole.HOSPITAL_ADMIN]: Object.values(PermissionCode).filter(
    (p) => !p.startsWith("SUPER_ADMIN_")
  ),

  [SystemRole.DOCTOR]: [
    PermissionCode.PATIENT_VIEW,
    PermissionCode.PATIENT_TIMELINE_VIEW,
    PermissionCode.APPOINTMENT_VIEW,
    PermissionCode.EMR_VIEW,
    PermissionCode.EMR_EDIT,
    PermissionCode.CONSULTATION_START,
    PermissionCode.PRESCRIPTION_CREATE,
    PermissionCode.LAB_ORDER_VIEW,
    PermissionCode.RADIOLOGY_VIEW
  ],

  [SystemRole.SENIOR_DOCTOR]: [
    PermissionCode.PATIENT_VIEW,
    PermissionCode.PATIENT_TIMELINE_VIEW,
    PermissionCode.APPOINTMENT_VIEW,
    PermissionCode.EMR_VIEW,
    PermissionCode.EMR_EDIT,
    PermissionCode.CONSULTATION_START,
    PermissionCode.PRESCRIPTION_CREATE,
    PermissionCode.LAB_ORDER_VIEW,
    PermissionCode.LAB_REPORT_VERIFY,
    PermissionCode.RADIOLOGY_VIEW
  ],

  [SystemRole.RECEPTIONIST]: [
    PermissionCode.PATIENT_VIEW,
    PermissionCode.PATIENT_CREATE,
    PermissionCode.PATIENT_EDIT,
    PermissionCode.PATIENT_TIMELINE_VIEW,
    PermissionCode.APPOINTMENT_VIEW,
    PermissionCode.APPOINTMENT_BOOK,
    PermissionCode.APPOINTMENT_CANCEL,
    PermissionCode.APPOINTMENT_RESCHEDULE,
    PermissionCode.BILLING_VIEW,
    PermissionCode.BILLING_PAYMENT_COLLECT
  ],

  [SystemRole.FRONT_DESK]: [
    PermissionCode.PATIENT_VIEW,
    PermissionCode.PATIENT_CREATE,
    PermissionCode.APPOINTMENT_VIEW,
    PermissionCode.APPOINTMENT_BOOK
  ],

  [SystemRole.NURSE]: [
    PermissionCode.PATIENT_VIEW,
    PermissionCode.PATIENT_TIMELINE_VIEW,
    PermissionCode.EMR_VIEW,
    PermissionCode.APPOINTMENT_VIEW
  ],

  [SystemRole.PHARMACIST]: [
    PermissionCode.PHARMACY_VIEW,
    PermissionCode.PHARMACY_POS,
    PermissionCode.PHARMACY_DISPENSE,
    PermissionCode.PATIENT_VIEW,
    PermissionCode.PATIENT_TIMELINE_VIEW,
    PermissionCode.BILLING_VIEW,
    PermissionCode.BILLING_PAYMENT_COLLECT
  ],

  [SystemRole.PHARMACY_MANAGER]: [
    PermissionCode.PHARMACY_VIEW,
    PermissionCode.PHARMACY_POS,
    PermissionCode.PHARMACY_DISPENSE,
    PermissionCode.PHARMACY_STOCK_MANAGE,
    PermissionCode.BILLING_VIEW,
    PermissionCode.BILLING_PAYMENT_COLLECT,
    PermissionCode.BILLING_REFUND
  ],

  [SystemRole.LAB_TECHNICIAN]: [
    PermissionCode.LAB_ORDER_VIEW,
    PermissionCode.LAB_SAMPLE_COLLECT,
    PermissionCode.LAB_RESULT_ENTER,
    PermissionCode.PATIENT_VIEW,
    PermissionCode.PATIENT_TIMELINE_VIEW
  ],

  [SystemRole.LAB_MANAGER]: [
    PermissionCode.LAB_ORDER_VIEW,
    PermissionCode.LAB_SAMPLE_COLLECT,
    PermissionCode.LAB_RESULT_ENTER,
    PermissionCode.LAB_REPORT_VERIFY,
    PermissionCode.PATIENT_VIEW,
    PermissionCode.PATIENT_TIMELINE_VIEW
  ],

  [SystemRole.RADIOLOGIST]: [
    PermissionCode.RADIOLOGY_VIEW,
    PermissionCode.RADIOLOGY_REPORT_CREATE,
    PermissionCode.PATIENT_VIEW,
    PermissionCode.PATIENT_TIMELINE_VIEW
  ],

  [SystemRole.RADIOLOGY_TECHNICIAN]: [
    PermissionCode.RADIOLOGY_VIEW,
    PermissionCode.PATIENT_VIEW
  ],

  [SystemRole.ACCOUNTANT]: [
    PermissionCode.BILLING_VIEW,
    PermissionCode.BILLING_INVOICE_CREATE,
    PermissionCode.BILLING_PAYMENT_COLLECT,
    PermissionCode.BILLING_REFUND,
    PermissionCode.HR_VIEW,
    PermissionCode.HR_PAYROLL_MANAGE
  ],

  [SystemRole.BILLING_OFFICER]: [
    PermissionCode.BILLING_VIEW,
    PermissionCode.BILLING_INVOICE_CREATE,
    PermissionCode.BILLING_PAYMENT_COLLECT
  ],

  [SystemRole.HR_MANAGER]: [
    PermissionCode.HR_VIEW,
    PermissionCode.HR_EMPLOYEE_MANAGE,
    PermissionCode.HR_PAYROLL_MANAGE,
    PermissionCode.HR_ATTENDANCE_MANAGE
  ],

  [SystemRole.STORE_MANAGER]: [
    PermissionCode.PHARMACY_VIEW,
    PermissionCode.PHARMACY_STOCK_MANAGE
  ],

  [SystemRole.PATIENT]: [
    PermissionCode.APPOINTMENT_VIEW,
    PermissionCode.APPOINTMENT_BOOK,
    PermissionCode.PATIENT_TIMELINE_VIEW,
    PermissionCode.BILLING_VIEW
  ]
};

export function hasPermission(
  userPermissions: PermissionCode[],
  requiredPermission: PermissionCode
): boolean {
  return userPermissions.includes(requiredPermission);
}
