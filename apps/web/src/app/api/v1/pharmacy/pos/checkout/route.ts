import { NextRequest } from "next/server";
import { PharmacyRepository, prisma } from "@hospital/database";
import { getAuthContext, jsonResponse } from "@/lib/auth-helpers";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const auth = await getAuthContext(req);
  const tenantId = auth?.tenantId || "tenant-citycare-123";

  try {
    const body = await req.json();
    const { items, discount = 0 } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return jsonResponse({ error: "Cart items are required for POS checkout" }, 400);
    }

    // Deduct stock for each medicine under FEFO rules
    for (const item of items) {
      const result = await PharmacyRepository.dispenseMedicineFEFO(tenantId, item.id, item.qty || 1);
      if (!result.success) {
        return jsonResponse({ error: result.message }, 400);
      }
    }

    const subtotal = items.reduce((acc: number, i: any) => acc + i.price * i.qty, 0);
    const total = Math.max(0, subtotal - discount);

    return jsonResponse({
      success: true,
      checkout: {
        invoiceNumber: `POS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        subtotal,
        discount,
        total,
        itemCount: items.length,
      },
    });
  } catch (error: any) {
    return jsonResponse({ error: error.message || "Failed to complete POS checkout" }, 500);
  }
}
