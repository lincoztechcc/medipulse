import { LabOrder } from "../index";
export declare class LabRepository {
    /**
     * Create laboratory test order for patient
     */
    static createOrder(tenantId: string, patientId: string, testNames: string[]): Promise<LabOrder>;
    /**
     * Update lab item result values & verify report
     */
    static submitResultsAndVerify(tenantId: string, labOrderId: string, results: {
        itemId: string;
        resultValue: string;
    }[]): Promise<{
        patient: {
            id: string;
            phone: string;
            email: string | null;
            address: string | null;
            createdAt: Date;
            tenantId: string;
            fullName: string;
            userId: string | null;
            mrn: string;
            dob: Date;
            gender: string;
            bloodGroup: string | null;
            whatsapp: string | null;
            cnicPassport: string | null;
            emergencyContact: string | null;
            allergies: string | null;
            medicalHistory: string | null;
        };
        items: {
            id: string;
            status: string;
            labOrderId: string;
            labTestName: string;
            resultValue: string | null;
        }[];
    } & {
        id: string;
        status: string;
        createdAt: Date;
        tenantId: string;
        patientId: string;
        orderNumber: string;
    }>;
}
