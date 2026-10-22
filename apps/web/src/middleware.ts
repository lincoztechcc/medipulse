import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "localhost:3000";
  const url = request.nextUrl.clone();

  // Strip port if present
  const hostname = host.split(":")[0];

  // Request headers mutation for downstream tenant extraction
  const response = NextResponse.next();
  response.headers.set("x-tenant-domain", hostname);

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
