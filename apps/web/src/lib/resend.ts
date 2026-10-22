const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "MediPulse HMS <notifications@medipulse.app>";

export async function sendOtpEmail(toEmail: string, otpCode: string, roleName: string) {
  try {
    if (!RESEND_API_KEY) {
      if (process.env.NODE_ENV === "production") {
        console.error("[Email Error] RESEND_API_KEY is not configured in production environment.");
        return { success: false, error: "Email delivery service is currently unconfigured" };
      }
      console.warn(`[DEV EMAIL MOCK] To: ${toEmail} | Role: ${roleName} | Code: [${otpCode}]`);
      return { success: true, mocked: true };
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: RESEND_FROM_EMAIL,
        to: [toEmail],
        subject: `Your ${roleName} Login Verification Code: ${otpCode}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h2 style="color: #0284c7; margin: 0;">MediPulse HMS</h2>
              <p style="color: #64748b; font-size: 12px; margin-top: 4px;">Multi-Tenant Hospital Management SaaS</p>
            </div>
            <div style="background-color: #f0f9ff; border: 1px solid #bae6fd; padding: 15px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
              <p style="font-size: 14px; color: #0369a1; margin: 0 0 8px 0;">Verification OTP Code for <strong>${roleName}</strong> Portal</p>
              <h1 style="font-size: 36px; letter-spacing: 6px; color: #0284c7; margin: 0; font-family: monospace;">${otpCode}</h1>
            </div>
            <p style="font-size: 12px; color: #475569; line-height: 1.5;">
              This 6-digit verification code is valid for 10 minutes. Please enter this code on the ${roleName} login page to complete authentication.
            </p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="font-size: 10px; color: #94a3b8; text-align: center;">
              City Care Hospital Tenant Security Gateway &bull; MediPulse SaaS Engine
            </p>
          </div>
        `,
      }),
    });

    const data = await res.json();
    return { success: res.ok, data };
  } catch (error: any) {
    console.error("Resend Email OTP Error:", error);
    return { success: false, error: error.message };
  }
}

