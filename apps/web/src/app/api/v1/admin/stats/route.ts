import { NextRequest } from "next/server";
import { prisma } from "@hospital/database";
import { getAuthContext, jsonResponse } from "@/lib/auth-helpers";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const auth = await getAuthContext(req);
  const tenantId = auth?.tenantId || "tenant-citycare-123";

  return jsonResponse({
    success: true,
    stats: {
      todayAppointments: 28,
      todayPatients: 18,
      todayRevenue: "PKR 145,000",
      pendingPayments: "PKR 35,000",
      doctorsAvailable: 6,
      pendingLabReports: 5,
      pharmacySales: "PKR 82,400",
      lowStockCount: 2,
    },
  });
}
