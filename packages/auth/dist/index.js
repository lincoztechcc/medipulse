"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockVerifyPassword = exports.mockHashPassword = exports.verifyPassword = exports.hashPassword = exports.verifyToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));

const getJwtSecret = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        if (process.env.NODE_ENV === "production") {
            throw new Error("CRITICAL SECURITY ERROR: JWT_SECRET environment variable must be configured in production.");
        }
        return "hospital-saas-dev-only-secret-do-not-use-in-production";
    }
    return secret;
};

function signToken(payload, expiresIn = "7d") {
    return jsonwebtoken_1.default.sign(payload, getJwtSecret(), { expiresIn: expiresIn });
}
exports.signToken = signToken;

function verifyToken(token) {
    try {
        return jsonwebtoken_1.default.verify(token, getJwtSecret());
    }
    catch (error) {
        return null;
    }
}
exports.verifyToken = verifyToken;

function hashPassword(password) {
    const salt = crypto_1.default.randomBytes(16).toString("hex");
    const derivedKey = crypto_1.default.scryptSync(password, salt, 64);
    return `scrypt:${salt}:${derivedKey.toString("hex")}`;
}
exports.hashPassword = hashPassword;

function verifyPassword(password, storedHash) {
    if (!storedHash || !password)
        return false;
    if (storedHash.startsWith("scrypt:")) {
        const parts = storedHash.split(":");
        if (parts.length !== 3)
            return false;
        const [, salt, key] = parts;
        const keyBuffer = Buffer.from(key, "hex");
        const derivedKey = crypto_1.default.scryptSync(password, salt, 64);
        return keyBuffer.length === derivedKey.length && crypto_1.default.timingSafeEqual(keyBuffer, derivedKey);
    }
    const legacyPrefix = "hashed_";
    const legacySuffix = "_secure";
    if (storedHash.startsWith(legacyPrefix) && storedHash.endsWith(legacySuffix)) {
        const expectedLegacyHash = `${legacyPrefix}${password}${legacySuffix}`;
        const storedBuf = Buffer.from(storedHash);
        const expectedBuf = Buffer.from(expectedLegacyHash);
        return storedBuf.length === expectedBuf.length && crypto_1.default.timingSafeEqual(storedBuf, expectedBuf);
    }
    return false;
}
exports.verifyPassword = verifyPassword;

exports.mockHashPassword = hashPassword;
exports.mockVerifyPassword = verifyPassword;
