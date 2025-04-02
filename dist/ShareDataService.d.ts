export declare class ShareDataService {
    private storageKey;
    private sessionTimeout;
    private sessionTimeoutKey;
    private sessionDuration;
    private decryptedToken;
    constructor();
    setToken(token: string): void;
    getToken(): string | null;
    setCookieToken(token: string): void;
    getCookieToken(): string | null;
    getCookie(name: string): string | null;
    startSessionTimeout(duration: number): void;
    checkAndStartTimeout(): void;
    closeSessionTimeoutPopup(): void;
    removeToken(token: string, expiresSeconds?: number): void;
    clearAllCookies(): void;
}
