import { NextRequest } from "next/server";
import { PharmacyRepository } from "@hospital/database";
import { getAuthContext, jsonResponse, unauthorizedResponse } from "@/lib/auth-helpers";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const auth = await getAuthContext(req);
  if (!auth) {
    return unauthorizedResponse("Authentication required to access Pharmacy POS checkout");
  }

  const tenantId = auth.tenantId;
  if (!tenantId) {
    return unauthorizedResponse("Hospital tenant session required");
  }

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

    const subtotal = items.reduce((acc: number, i: any) => acc + (Number(i.price) || 0) * (Number(i.qty) || 1), 0);
    const validDiscount = Math.max(0, Number(discount) || 0);
    const total = Math.max(0, subtotal - validDiscount);

    return jsonResponse({
      success: true,
      checkout: {
        invoiceNumber: `POS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        subtotal,
        discount: validDiscount,
        total,
        itemCount: items.length,
      },
    });
  } catch (error: any) {
    return jsonResponse({ error: error.message || "Failed to complete POS checkout" }, 500);
  }
}
