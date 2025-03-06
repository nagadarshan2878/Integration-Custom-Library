export declare class ShareDataService {
    private storageKey;
    setToken(token: string): void;
    getToken(): string | null;
    setCookieToken(token: string): void;
    getCookieToken(): string | null;
    removeToken(token: string, expiresMinutes?: number): void;
}
