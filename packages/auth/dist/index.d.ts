export interface UserTokenPayload {
    userId: string;
    email: string;
    tenantId: string | null;
    role: string;
    permissions: string[];
}
export declare function signToken(payload: UserTokenPayload, expiresIn?: string): string;
export declare function verifyToken(token: string): UserTokenPayload | null;
export declare function hashPassword(password: string): string;
export declare function verifyPassword(password: string, storedHash: string): boolean;
export declare const mockHashPassword: typeof hashPassword;
export declare const mockVerifyPassword: typeof verifyPassword;
