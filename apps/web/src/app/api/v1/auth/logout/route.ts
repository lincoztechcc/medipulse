import { NextRequest } from "next/server";
import { jsonResponse } from "@/lib/auth-helpers";

export async function POST(req: NextRequest) {
  const response = jsonResponse({ success: true, message: "Logged out successfully" });
  response.cookies.delete("medipulse_session");
  return response;
}
