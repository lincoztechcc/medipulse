import { NextRequest } from "next/server";
import { jsonResponse } from "@/lib/auth-helpers";
import { sendOtpEmail } from "@/lib/resend";
import { otpStore } from "@/lib/otp-store";
import { UserRepository } from "@hospital/database";
import crypto from "crypto";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, roleName = "Hospital Portal" } = body;

    if (!email || typeof email !== "string") {
      return jsonResponse({ error: "Valid email address is required" }, 400);
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Verify user exists and is active
    const user = await UserRepository.findByEmail(normalizedEmail);
    if (!user || !user.isActive) {
      return jsonResponse({ error: "No active user account found for this email address" }, 404);
    }

    // Cryptographically secure 6-digit OTP code
    const otpCode = crypto.randomInt(100000, 1000000).toString();
    otpStore.set(normalizedEmail, otpCode, 10 * 60 * 1000); // 10 minutes TTL

    const emailResult = await sendOtpEmail(normalizedEmail, otpCode, roleName);

    // SECURITY: Never expose or leak the OTP code in the response body!
    return jsonResponse({
      success: true,
      message: `Verification code sent to ${normalizedEmail}`,
      emailDelivered: emailResult.success,
    });
  } catch (error: any) {
    return jsonResponse({ error: error.message || "Failed to send OTP code" }, 500);
  }
}
