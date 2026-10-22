import crypto from "crypto";

interface StoredOtp {
  code: string;
  expiresAt: number;
  attempts: number;
}

// In-memory store with TTL, max attempt throttling, and timing-safe comparison
const store = new Map<string, StoredOtp>();

export const otpStore = {
  set(email: string, code: string, ttlMs: number = 10 * 60 * 1000): void {
    const key = email.toLowerCase().trim();
    store.set(key, {
      code,
      expiresAt: Date.now() + ttlMs,
      attempts: 0,
    });
  },

  verify(email: string, inputCode: string, maxAttempts: number = 5): { valid: boolean; reason?: string } {
    const key = email.toLowerCase().trim();
    const entry = store.get(key);

    if (!entry) {
      return { valid: false, reason: "No verification code requested or code has expired." };
    }

    if (Date.now() > entry.expiresAt) {
      store.delete(key);
      return { valid: false, reason: "Verification code has expired. Please request a new code." };
    }

    entry.attempts += 1;
    if (entry.attempts > maxAttempts) {
      store.delete(key);
      return { valid: false, reason: "Maximum verification attempts exceeded. Please request a new code." };
    }

    const expectedBuffer = Buffer.from(entry.code);
    const inputBuffer = Buffer.from(inputCode.trim());

    if (expectedBuffer.length === inputBuffer.length && crypto.timingSafeEqual(expectedBuffer, inputBuffer)) {
      store.delete(key);
      return { valid: true };
    }

    const remaining = maxAttempts - entry.attempts;
    return {
      valid: false,
      reason: `Invalid verification code. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining.`,
    };
  },

  delete(email: string): void {
    store.delete(email.toLowerCase().trim());
  },
};

// Legacy compatibility proxy
export const otpCache = new Proxy({} as Record<string, string>, {
  get(_, prop: string) {
    const entry = store.get(prop.toLowerCase().trim());
    if (entry && Date.now() <= entry.expiresAt) {
      return entry.code;
    }
    return undefined;
  },
  set(_, prop: string, value: string) {
    otpStore.set(prop, value);
    return true;
  },
  deleteProperty(_, prop: string) {
    otpStore.delete(prop);
    return true;
  },
});
