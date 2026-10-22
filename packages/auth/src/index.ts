import jwt from "jsonwebtoken";
import crypto from "crypto";

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("CRITICAL SECURITY ERROR: JWT_SECRET environment variable must be configured in production.");
    }
    return "hospital-saas-dev-only-secret-do-not-use-in-production";
  }
  return secret;
};

export interface UserTokenPayload {
  userId: string;
  email: string;
  tenantId: string | null;
  role: string;
  permissions: string[];
}

export function signToken(payload: UserTokenPayload, expiresIn: string = "7d"): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: expiresIn as any });
}

export function verifyToken(token: string): UserTokenPayload | null {
  try {
    return jwt.verify(token, getJwtSecret()) as UserTokenPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Cryptographically secure password hashing using scrypt with a unique random 16-byte salt.
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return `scrypt:${salt}:${derivedKey.toString("hex")}`;
}

/**
 * Constant-time password verification preventing timing side-channel attacks.
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  if (!storedHash || !password) return false;

  // 1. Scrypt format: scrypt:salt:hash
  if (storedHash.startsWith("scrypt:")) {
    const parts = storedHash.split(":");
    if (parts.length !== 3) return false;
    const [, salt, key] = parts;
    const keyBuffer = Buffer.from(key, "hex");
    const derivedKey = crypto.scryptSync(password, salt, 64);
    return keyBuffer.length === derivedKey.length && crypto.timingSafeEqual(keyBuffer, derivedKey);
  }

  // 2. Legacy seed format constant-time check (e.g. initial demo database seeds)
  const legacyPrefix = "hashed_";
  const legacySuffix = "_secure";
  if (storedHash.startsWith(legacyPrefix) && storedHash.endsWith(legacySuffix)) {
    const expectedLegacyHash = `${legacyPrefix}${password}${legacySuffix}`;
    const storedBuf = Buffer.from(storedHash);
    const expectedBuf = Buffer.from(expectedLegacyHash);
    return storedBuf.length === expectedBuf.length && crypto.timingSafeEqual(storedBuf, expectedBuf);
  }

  return false;
}

// Aliases for backward compatibility
export const mockHashPassword = hashPassword;
export const mockVerifyPassword = verifyPassword;

