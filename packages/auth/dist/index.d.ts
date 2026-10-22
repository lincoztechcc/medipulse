export interface UserTokenPayload {
    userId: string;
    email: string;
    tenantId: string | null;
    role: string;
    permissions: string[];
}
export declare function signToken(payload: UserTokenPayload, expiresIn?: string): string;
export declare function verifyToken(token: string): UserTokenPayload | null;
export declare function mockHashPassword(password: string): string;
export declare function mockVerifyPassword(password: string, hash: string): boolean;
