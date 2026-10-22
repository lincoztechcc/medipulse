import { NextRequest, NextResponse } from "next/server";
import { verifyToken, UserTokenPayload } from "@hospital/auth";
import { PermissionCode, hasPermission } from "@hospital/permissions";

export async function getAuthContext(req: NextRequest): Promise<UserTokenPayload | null> {
  // 1. Try Authorization header
  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    const payload = verifyToken(token);
    if (payload) return payload;
  }

  // 2. Try session cookie
  const cookie = req.cookies.get("medipulse_session")?.value;
  if (cookie) {
    const payload = verifyToken(cookie);
    if (payload) return payload;
  }

  return null;
}

export function jsonResponse(data: any, status: number = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "X-XSS-Protection": "1; mode=block",
    },
  });
}

export function unauthorizedResponse(message: string = "Unauthorized access") {
  return jsonResponse({ error: message, success: false }, 401);
}

export function forbiddenResponse(message: string = "Insufficient permissions") {
  return jsonResponse({ error: message, success: false }, 403);
}
