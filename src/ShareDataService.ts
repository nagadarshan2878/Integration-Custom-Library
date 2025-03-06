export class ShareDataService {
    private storageKey: string = "appToken";
    setToken(token: string): void {
      if (typeof window !== "undefined" && window.sessionStorage) {
        window.sessionStorage.setItem(this.storageKey, token);
      }
    }
    getToken(): string | null {
      return window.sessionStorage.getItem(this.storageKey);
    }
    setCookieToken(token: string): void {
        document.cookie = `${this.storageKey}=${token}; path=/; secure; samesite=strict`;
      }
    getCookieToken(): string | null {
        const cookies = document.cookie.split("; ");
        for (const cookie of cookies) {
          const [key, value] = cookie.split("=");
          if (key === this.storageKey) {
            return value;
          }
        }
        return null;
      }
      
      removeToken(token: string, expiresMinutes: number = 10): void {
        const date = new Date();
        date.setTime(date.getTime() + expiresMinutes * 60 * 1000);
        document.cookie = `${this.storageKey}=${token}; expires=${date.toUTCString()}; path=/; secure; samesite=strict`;
      }
      
  }
  