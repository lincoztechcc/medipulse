import { NextRequest } from "next/server";
import { UserRepository } from "@hospital/database";
import { mockVerifyPassword, signToken } from "@hospital/auth";
import { jsonResponse, unauthorizedResponse } from "@/lib/auth-helpers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return jsonResponse({ error: "Email and password are required" }, 400);
    }

    const user = await UserRepository.findByEmail(email);
    if (!user || !user.isActive) {
      return unauthorizedResponse("Invalid credentials or account disabled");
    }

    const isValid = mockVerifyPassword(password, user.passwordHash);
    if (!isValid) {
      return unauthorizedResponse("Invalid email or password");
    }

    // Extract permission codes
    const permissions = user.role.permissions.map((rp) => rp.permission.code);

    // Sign JWT token
    const token = signToken({
      userId: user.id,
      email: user.email,
      tenantId: user.tenantId,
      role: user.role.name,
      permissions,
    });

    const response = jsonResponse({
      success: true,
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role.name,
        tenantId: user.tenantId,
        tenantName: user.tenant?.name || "System Super Admin",
        permissions,
      },
    });

    // Set secure HttpOnly cookie
    response.cookies.set("medipulse_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 Days
      path: "/",
    });

    return response;
  } catch (error: any) {
    return jsonResponse({ error: error.message || "Internal server error" }, 500);
  }
}
