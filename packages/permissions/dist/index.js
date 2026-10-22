"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROLE_DEFAULT_PERMISSIONS = exports.PermissionCode = exports.SystemRole = void 0;
exports.hasPermission = hasPermission;
var SystemRole;
(function (SystemRole) {
    SystemRole["SUPER_ADMIN"] = "SUPER_ADMIN";
    SystemRole["HOSPITAL_ADMIN"] = "HOSPITAL_ADMIN";
    SystemRole["DOCTOR"] = "DOCTOR";
    SystemRole["SENIOR_DOCTOR"] = "SENIOR_DOCTOR";
    SystemRole["RECEPTIONIST"] = "RECEPTIONIST";
    SystemRole["NURSE"] = "NURSE";
    SystemRole["LAB_MANAGER"] = "LAB_MANAGER";
    SystemRole["LAB_TECHNICIAN"] = "LAB_TECHNICIAN";
    SystemRole["PHARMACIST"] = "PHARMACIST";
    SystemRole["PHARMACY_MANAGER"] = "PHARMACY_MANAGER";
    SystemRole["ACCOUNTANT"] = "ACCOUNTANT";
    SystemRole["HR_MANAGER"] = "HR_MANAGER";
    SystemRole["STORE_MANAGER"] = "STORE_MANAGER";
    SystemRole["RADIOLOGIST"] = "RADIOLOGIST";
    SystemRole["RADIOLOGY_TECHNICIAN"] = "RADIOLOGY_TECHNICIAN";
    SystemRole["BILLING_OFFICER"] = "BILLING_OFFICER";
    SystemRole["FRONT_DESK"] = "FRONT_DESK";
    SystemRole["PATIENT"] = "PATIENT";
})(SystemRole || (exports.SystemRole = SystemRole = {}));
var PermissionCode;
(function (PermissionCode) {
    // Patient Permissions
    PermissionCode["PATIENT_VIEW"] = "PATIENT_VIEW";
    PermissionCode["PATIENT_CREATE"] = "PATIENT_CREATE";
    PermissionCode["PATIENT_EDIT"] = "PATIENT_EDIT";
    PermissionCode["PATIENT_DELETE"] = "PATIENT_DELETE";
    PermissionCode["PATIENT_TIMELINE_VIEW"] = "PATIENT_TIMELINE_VIEW";
    // Appointment Permissions
    PermissionCode["APPOINTMENT_VIEW"] = "APPOINTMENT_VIEW";
    PermissionCode["APPOINTMENT_BOOK"] = "APPOINTMENT_BOOK";
    PermissionCode["APPOINTMENT_CANCEL"] = "APPOINTMENT_CANCEL";
    PermissionCode["APPOINTMENT_RESCHEDULE"] = "APPOINTMENT_RESCHEDULE";
    // Clinical & EMR
    PermissionCode["EMR_VIEW"] = "EMR_VIEW";
    PermissionCode["EMR_EDIT"] = "EMR_EDIT";
    PermissionCode["CONSULTATION_START"] = "CONSULTATION_START";
    PermissionCode["PRESCRIPTION_CREATE"] = "PRESCRIPTION_CREATE";
    // Pharmacy & POS
    PermissionCode["PHARMACY_VIEW"] = "PHARMACY_VIEW";
    PermissionCode["PHARMACY_POS"] = "PHARMACY_POS";
    PermissionCode["PHARMACY_DISPENSE"] = "PHARMACY_DISPENSE";
    PermissionCode["PHARMACY_STOCK_MANAGE"] = "PHARMACY_STOCK_MANAGE";
    // Laboratory & LIS
    PermissionCode["LAB_ORDER_VIEW"] = "LAB_ORDER_VIEW";
    PermissionCode["LAB_SAMPLE_COLLECT"] = "LAB_SAMPLE_COLLECT";
    PermissionCode["LAB_RESULT_ENTER"] = "LAB_RESULT_ENTER";
    PermissionCode["LAB_REPORT_VERIFY"] = "LAB_REPORT_VERIFY";
    // Radiology
    PermissionCode["RADIOLOGY_VIEW"] = "RADIOLOGY_VIEW";
    PermissionCode["RADIOLOGY_REPORT_CREATE"] = "RADIOLOGY_REPORT_CREATE";
    // Billing & Accounting
    PermissionCode["BILLING_VIEW"] = "BILLING_VIEW";
    PermissionCode["BILLING_INVOICE_CREATE"] = "BILLING_INVOICE_CREATE";
    PermissionCode["BILLING_PAYMENT_COLLECT"] = "BILLING_PAYMENT_COLLECT";
    PermissionCode["BILLING_REFUND"] = "BILLING_REFUND";
    // HR & Payroll
    PermissionCode["HR_VIEW"] = "HR_VIEW";
    PermissionCode["HR_EMPLOYEE_MANAGE"] = "HR_EMPLOYEE_MANAGE";
    PermissionCode["HR_PAYROLL_MANAGE"] = "HR_PAYROLL_MANAGE";
    PermissionCode["HR_ATTENDANCE_MANAGE"] = "HR_ATTENDANCE_MANAGE";
    // Website & CMS
    PermissionCode["WEBSITE_MANAGE"] = "WEBSITE_MANAGE";
    PermissionCode["DOMAIN_MANAGE"] = "DOMAIN_MANAGE";
    // Admin & Settings
    PermissionCode["ADMIN_SETTINGS_MANAGE"] = "ADMIN_SETTINGS_MANAGE";
    PermissionCode["AUDIT_LOGS_VIEW"] = "AUDIT_LOGS_VIEW";
    // SaaS Super Admin
    PermissionCode["SUPER_ADMIN_MANAGE_TENANTS"] = "SUPER_ADMIN_MANAGE_TENANTS";
    PermissionCode["SUPER_ADMIN_MANAGE_PLANS"] = "SUPER_ADMIN_MANAGE_PLANS";
})(PermissionCode || (exports.PermissionCode = PermissionCode = {}));
exports.ROLE_DEFAULT_PERMISSIONS = {
    [SystemRole.SUPER_ADMIN]: Object.values(PermissionCode),
    [SystemRole.HOSPITAL_ADMIN]: Object.values(PermissionCode).filter((p) => !p.startsWith("SUPER_ADMIN_")),
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
function hasPermission(userPermissions, requiredPermission) {
    return userPermissions.includes(requiredPermission);
}
