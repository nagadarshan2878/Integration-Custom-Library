export class ShareDataService {
    constructor() {
        this.storageKey = "appToken";
    }
    setToken(token) {
        if (typeof window !== "undefined" && window.sessionStorage) {
            window.sessionStorage.setItem(this.storageKey, token);
        }
    }
    getToken() {
        return window.sessionStorage.getItem(this.storageKey);
    }
    setCookieToken(token) {
        document.cookie = `${this.storageKey}=${token}; path=/; secure; samesite=strict`;
    }
    getCookieToken() {
        const cookies = document.cookie.split("; ");
        for (const cookie of cookies) {
            const [key, value] = cookie.split("=");
            if (key === this.storageKey) {
                return value;
            }
        }
        return null;
    }
    removeToken(token, expiresMinutes = 10) {
        const date = new Date();
        date.setTime(date.getTime() + expiresMinutes * 60 * 1000);
        document.cookie = `${this.storageKey}=${token}; expires=${date.toUTCString()}; path=/; secure; samesite=strict`;
    }
}
//# sourceMappingURL=ShareDataService.js.map