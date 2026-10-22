import { NextRequest } from "next/server";
import { jsonResponse } from "@/lib/auth-helpers";
import { sendOtpEmail } from "@/lib/resend";
import { otpCache } from "@/lib/otp-store";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, roleName = "Hospital Portal" } = body;

    if (!email) {
      return jsonResponse({ error: "Email is required" }, 400);
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    otpCache[email.toLowerCase()] = otpCode;

    const emailResult = await sendOtpEmail(email, otpCode, roleName);

    return jsonResponse({
      success: true,
      message: `Verification code sent to ${email}`,
      demoCode: otpCode,
      emailDelivered: emailResult.success,
    });
  } catch (error: any) {
    return jsonResponse({ error: error.message || "Failed to send OTP code" }, 500);
  }
}
