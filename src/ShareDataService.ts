import { SessionTimeoutPopup } from "./SessionTimeoutPopup";
import CryptoJS from "crypto-js";
import { encryptData, decryptData } from "./encryption";

export class ShareDataService {
    private storageKey: string = "TokenData";
    private sessionTimeout: any;
    private sessionTimeoutKey = "SessionStartTime"; 
    private sessionDuration =3000000; // 50 minutes
    // private sessionDuration =60000; // 50 minutes
    private decryptedToken!: string;

    constructor() {
      // console.log("constru");
      this.checkAndStartTimeout();
    }
    setToken(token: string): void {
      if (typeof window !== "undefined" && window.sessionStorage) {
        window.sessionStorage.setItem(this.storageKey, token);
      }
    }
    getToken(): string | null {
      return window.sessionStorage.getItem(this.storageKey);
    }
   
    setCookieToken(token: string): void {
        // console.log(this.sessionDuration);
        document.cookie = `${this.storageKey}=${token}; path=/; secure; samesite=strict`;
        document.cookie = `${this.sessionTimeoutKey}=${Date.now()}; path=/; secure; samesite=strict`;
        this.startSessionTimeout(this.sessionDuration);
    }
   
      getCookieToken(): string | null {
        return this.getCookie(this.storageKey);
    }
    getCookie(name: string): string | null {
      const cookies = document.cookie.split("; ");
      for (const cookie of cookies) {
          const [key, value] = cookie.split("=");
          if (key === name) {
              return value;
          }
      }
      return null;
  }
   
startSessionTimeout(duration: number): void {
  console.log("Setting session timeout for:", duration);

  // Clear any existing timeout
  if (this.sessionTimeout) {
    clearTimeout(this.sessionTimeout);
  }

  // Set a new timeout
  this.sessionTimeout = setTimeout(() => {
    console.log('Session expired due to inactivity!');
    SessionTimeoutPopup.showSessionTimeoutPopup();
    setTimeout(()=>{
      this.closeSessionTimeoutPopup();
      sessionStorage.clear();
      this.clearAllCookies();
      window.location.href = "http://localhost:4200/login";
    },1000);
  }, duration);
}

checkAndStartTimeout() {
  const sessionStartTime = Number(this.getCookie(this.sessionTimeoutKey));
  console.log("checkAndStartTimeout"+sessionStartTime);
  if (sessionStartTime) {
      const elapsedTime = Date.now() - sessionStartTime;
      const remainingTime = this.sessionDuration - elapsedTime;

      if (remainingTime > 0) {
          console.log("Resuming session timeout with remaining time:", remainingTime);
          this.startSessionTimeout(remainingTime);
      } else {
          console.log("Session already expired!");
          // alert("Session expired due to inactivity!");
          // this.showSessionTimeoutPopup();
          SessionTimeoutPopup.showSessionTimeoutPopup();
          setTimeout(()=>{
                this.closeSessionTimeoutPopup();
                sessionStorage.clear();
                this.clearAllCookies();
                window.location.href = "http://localhost:4200/login";
          },1000);
          // sessionStorage.clear();
          // this.clearAllCookies();
          // return;
          // window.location.href = "/login";
          // window.location.href = "http://localhost:4200/login";
      }
  }
}

closeSessionTimeoutPopup() {
  const popup = document.getElementById("sessionTimeoutModal");
  // console.log("popup"+popup);
  if (popup) {
      popup.remove();
  }
}

    removeToken(token: string, expiresSeconds: number = 50): void {
        const date = new Date();
        date.setTime(date.getTime() + expiresSeconds * 1000); // Set expiration to 50 seconds from now
        document.cookie = `${this.storageKey}=${token}; expires=${date.toUTCString()}; path=/; secure; samesite=strict`;
    }
  
      clearAllCookies() {
        // console.log("Clear Cookies");
        document.cookie.split(";").forEach((cookie) => {
          let cookieName = cookie.split("=")[0].trim();
          document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname;
        });
      }
  }
  

  