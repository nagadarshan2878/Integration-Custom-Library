import { IdleTimeoutPopup } from './IdleTimeoutPopup';
import { decryptData } from "./encryption";
import { LivezyIdleTimeout } from './LivezyIdleTimeout';
export class IdleTimeout {
    constructor() {
        this.idleTime = 0;
        this.isIdlePopupShown = false;
        this.IdleTimeLim = "IdleTimeLimit";
        this.isPaused = false;
    }
    setPauseState(state) {
        this.isPaused = state;
        // console.log("IdleTimeout pause state set to:", this.isPaused);
    }
    // Start tracking idle time
    startIdleTimer(time) {
        // console.log("startIdleTimer"+time);
        if (this.idleInterval) {
            clearInterval(this.idleInterval);
        }
        this.idleInterval = setInterval(() => {
            this.idleTime++;
            if (this.idleTime >= time) {
                if (this.isPaused) {
                    console.log("Timer paused, not showing popup." + this.idleLimit);
                    const livezyIdleTimeout = new LivezyIdleTimeout();
                    livezyIdleTimeout.callIdleTimepoutApi();
                    // const idleTimeLimitStr = document.cookie
                    // .split('; ')
                    // .find(row => row.startsWith('IdleTimeLimit='))
                    // ?.split('=')[1];
                    //   const idleTimeLimit = idleTimeLimitStr ? parseInt(idleTimeLimitStr, 10) || 0 : 0;
                    //   console.log(idleTimeLimit);
                    //   this.idleLimit = 120000/1000-60;
                    //   console.log(this.idleLimit);
                    // this.startIdleTimer(this.idleLimit);
                }
                else {
                    // console.log("Time limit reached, showing popup.");
                    this.showIdlePopup();
                }
                clearInterval(this.idleInterval);
            }
        }, 1000);
        // this.idleInterval = setInterval(() => {
        //     this.idleTime++;
        //     console.log("Obdex Timer"+this.idleTime);
        //     if (this.idleTime >= time) {
        //       if(this.isPaused)
        //         console.log("this.isPaused"+this.isPaused);
        //         // this.showIdlePopup();
        //         clearInterval(this.idleInterval); // Stop the timer
        //     }
        //     else{
        //       this.showIdlePopup();
        //       clearInterval(this.idleInterval);
        //     }
        // }, 1000); // Check every second
        return this.idleTime;
    }
    resetIdleTime() {
        if (this.isIdlePopupShown)
            return;
        // console.log("resetIdleTime"+this.idleTime);
        this.idleTime = 0;
    }
    stopIdleTimer() {
        // console.log("stopIdleTimer");
        if (this.idleInterval) {
            clearInterval(this.idleInterval);
        }
    }
    // Show popup message and disable resetIdleTime
    showIdlePopup() {
        this.isIdlePopupShown = true; // Stop resetIdleTime from working
        this.applicationType = "obdx";
        IdleTimeoutPopup.showIdleTimeoutPopup(this.applicationType);
    }
    clearAllCookies() {
        // console.log("Clear Cookies");
        document.cookie.split(";").forEach((cookie) => {
            let cookieName = cookie.split("=")[0].trim();
            document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname;
        });
    }
    // Listen to user activity (mouse, keyboard, touch)
    addEventListeners() {
        // console.log("addEventListeners");
        document.addEventListener('mousemove', () => this.resetIdleTime());
        document.addEventListener('keydown', () => this.resetIdleTime());
        document.addEventListener('touchstart', () => this.resetIdleTime());
        document.addEventListener('click', () => this.resetIdleTime());
    }
    callIdleApi() {
        var _a;
        // console.log("Obdx Api Call");
        // console.log(this.idleLimit);
        const url = "http://172.21.95.121:9994/digx-common/user/v1/me?locale=en"; // Replace with actual API URL
        //   const obdxtoken = sessionStorage.getItem('token');
        //   console.log(obdxtoken);
        //   if (obdxtoken !== null) {
        //     this.decryptedToken = decryptData(obdxtoken);
        //     console.log("Decrypted Token:", this.decryptedToken);
        // } else {
        //     console.log("No token found in sessionStorage.");
        // }
        const obdxtoken = sessionStorage.getItem('token');
        // console.log(obdxtoken);
        const tokenData = ((_a = document.cookie.split('; ').find(row => row.startsWith('TokenData='))) === null || _a === void 0 ? void 0 : _a.split('=')[1]) || null;
        // console.log(tokenData);
        if (obdxtoken !== null || tokenData !== null) {
            const decryptedObdxToken = obdxtoken ? decryptData(obdxtoken) : null;
            const decryptedTokenData = tokenData ? decryptData(tokenData) : null;
            this.decryptedToken = decryptedObdxToken || decryptedTokenData || undefined;
            // this.decryptedToken = decryptedObdxToken || decryptedTokenData; // Assign whichever is available
            console.log("Decrypted Token:", this.decryptedToken);
        }
        else {
            console.log("No token found in sessionStorage or cookies.");
        }
        const secretKey = 'Set-Cookie';
        console.log(secretKey);
        const options = {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${this.decryptedToken}`,
                'X-Token-Type': 'JWT',
                'x-target-unit': 'OBDX_BU',
                'Content-Type': 'application/json',
                'Cookie': `secretKey=${secretKey}`
            },
            credentials: "include"
        };
        console.log(options);
        fetch(url, options)
            .then((response) => response.json())
            .then((data) => {
            var _a;
            console.log("User API Response:", data);
            if (((_a = data.status) === null || _a === void 0 ? void 0 : _a.result) === 'SUCCESSFUL') {
                // this.idleLimit = data?.inactiveSessionTimeout;
                // this.idleLimit = 1000;
                // const sessionTimeout = data?.inactiveSessionTimeout-30000;
                // this.idleLimit = data?.inactiveSessionTimeout/1000-30;
                this.idleLimit = (data === null || data === void 0 ? void 0 : data.inactiveSessionTimeout) / 1000 - 60;
                console.log("Session Timeout:", this.idleLimit);
                document.cookie = `${this.IdleTimeLim}=${data === null || data === void 0 ? void 0 : data.inactiveSessionTimeout}; path=/; secure; samesite=strict`;
                this.startIdleTimer(this.idleLimit);
                this.addEventListeners();
                return this.idleLimit;
            }
            else {
                console.error('Error: API returned unsuccessful status');
            }
        })
            .catch((error) => {
            console.error('Error occurred while fetching user:', error);
        });
        // Simulating API call (Replace with actual API request)
        // setTimeout(() => {
        //     console.log("Idle API Call Success");
        //     // Reset idle time and restart the timer
        //     this.isIdlePopupShown = false; // Re-enable resetIdleTime
        //     this.resetIdleTime();
        //     // this.startIdleTimer();
        // }, 1000);
    }
    getIdleTime() {
        // console.log("getIdleTime"+this.idleTime);
        return this.idleTime;
    }
    getIdleTimelimit() {
        // console.log("getIdleTimelimit in api"+this.idleLimit);
        return this.idleLimit;
    }
    restart(timeLim) {
        // console.log("restart idle in obdx"+timeLim);
        this.startIdleTimer(timeLim);
    }
}
//# sourceMappingURL=IdleTimeout.js.map