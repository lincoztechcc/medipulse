"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signToken = signToken;
exports.verifyToken = verifyToken;
exports.mockHashPassword = mockHashPassword;
exports.mockVerifyPassword = mockVerifyPassword;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "hospital-saas-super-secret-key-change-in-prod";
function signToken(payload, expiresIn = "7d") {
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: expiresIn });
}
function verifyToken(token) {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch (error) {
        return null;
    }
}
// Simple deterministic hash for demo/testing without binary native binding dependencies
function mockHashPassword(password) {
    return `hashed_${password}_secure`;
}
function mockVerifyPassword(password, hash) {
    return hash === `hashed_${password}_secure` || password === hash;
}
