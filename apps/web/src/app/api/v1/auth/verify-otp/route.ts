import { NextRequest } from "next/server";
import { jsonResponse, unauthorizedResponse } from "@/lib/auth-helpers";
import { otpStore } from "@/lib/otp-store";
import { UserRepository } from "@hospital/database";
import { signToken } from "@hospital/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, otpCode } = body;

    if (!email || !otpCode || typeof email !== "string" || typeof otpCode !== "string") {
      return jsonResponse({ error: "Email and OTP code are required" }, 400);
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Verify OTP code (Backdoor "123456" completely removed)
    const verification = otpStore.verify(normalizedEmail, otpCode.trim());
    if (!verification.valid) {
      return jsonResponse({ error: verification.reason || "Invalid verification code" }, 400);
    }

    // Verify user exists and is active (Backdoor fallback to HOSPITAL_ADMIN completely removed)
    const user = await UserRepository.findByEmail(normalizedEmail);
    if (!user || !user.isActive) {
      return unauthorizedResponse("Account not found or has been disabled");
    }

    const permissions = user.role.permissions.map((p) => p.permission.code);
    const token = signToken({
      userId: user.id,
      email: user.email,
      tenantId: user.tenantId,
      role: user.role.name,
      permissions,
    });

    const response = jsonResponse({
      success: true,
      verified: true,
      token,
      message: "Authentication successful",
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role.name,
        tenantId: user.tenantId,
        tenantName: user.tenant?.name || "System Admin",
        permissions,
      },
    });

    response.cookies.set("medipulse_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error: any) {
    return jsonResponse({ error: error.message || "Verification failed" }, 500);
  }
}
