import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "hospital-saas-super-secret-key-change-in-prod";

export interface UserTokenPayload {
  userId: string;
  email: string;
  tenantId: string | null;
  role: string;
  permissions: string[];
}

export function signToken(payload: UserTokenPayload, expiresIn: string = "7d"): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: expiresIn as any });
}

export function verifyToken(token: string): UserTokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as UserTokenPayload;
  } catch (error) {
    return null;
  }
}

// Simple deterministic hash for demo/testing without binary native binding dependencies
export function mockHashPassword(password: string): string {
  return `hashed_${password}_secure`;
}

export function mockVerifyPassword(password: string, hash: string): boolean {
  return hash === `hashed_${password}_secure` || password === hash;
}
