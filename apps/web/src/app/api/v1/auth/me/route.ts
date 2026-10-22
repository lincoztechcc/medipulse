import { NextRequest } from "next/server";
import { getAuthContext, jsonResponse, unauthorizedResponse } from "@/lib/auth-helpers";

export async function GET(req: NextRequest) {
  const auth = await getAuthContext(req);
  if (!auth) {
    return unauthorizedResponse();
  }

  return jsonResponse({
    success: true,
    user: auth,
  });
}
