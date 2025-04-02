import { IdleTimeoutPopup} from './IdleTimeoutPopup';
import { IdleTimeout } from './IdleTimeout';
import { encryptData, decryptData } from "./encryption";
export class LivezyIdleTimeout {
    private idleLivezyTime: number = 0;
    private idleLivezyLimit!: number; 
    private idleLivezyInterval: any;
    private isIdleLivezyPopupShown: boolean = false;
    private applicationType: any;
    private decryptedToken: string | undefined;
    private timeLimit!: number;
    private currentObdxIdleTime!: number;
   constructor() {
      
    }
    
    backgroundTimer()
    {
      const idleTimeout=new IdleTimeout();
      idleTimeout.setPauseState(true); 
      idleTimeout.startIdleTimer(this.timeLimit);
      // this.currentObdxIdleTime = idleTimeout.startIdleTimer(this.timeLimit);
      // console.log("Timer: "+ this.currentObdxIdleTime);
      // const interval = setInterval(() => {
        // console.log("inside Timer: " + this.currentObdxIdleTime);
        // this.currentObdxIdleTime = idleTimeout.getIdleTime();
        // console.log("currentObdxIdleTime Timer: "+ this.currentObdxIdleTime);
        // if (this.currentObdxIdleTime >= this.timeLimit) {
          // console.log("Restart timer...");
          // idleTimeout.stopIdleTimer();
          // idleTimeout.resetIdleTime();
          // idleTimeout.addEventListeners();
          // idleTimeout.restart(this.timeLimit);
          // this.currentObdxIdleTime=0;
          // this.someMethod(); // Replace with the actual method you want to call
          // clearInterval(interval); // Stop the interval once condition is met
        // }
      // }, 1000); 
    //     if (this.currentObdxIdleTime>=this.timeLimit) {
    //         clearInterval(this.idleLivezyInterval); // Stop the timer
    //         console.log("Restart Timer");
    //         this.currentObdxIdleTime=0;
    //         idleTimeout.resetIdleTime();
    //         idleTimeout.addEventListeners();
    //         idleTimeout.restart(this.timeLimit);
    //     }
    // });
    }
    
    startLivezyIdleTimer(timeLimit:number) {
        this.timeLimit=timeLimit;
        this.idleLivezyInterval = setInterval(() => {
            this.idleLivezyTime++;
            if (this.idleLivezyTime >=timeLimit) {
                this.showIdlePopup();
                clearInterval(this.idleLivezyInterval);
            }
        }, 1000); 
    }

   private resetLivezyIdleTime() {
    if (this.isIdleLivezyPopupShown) return; ;
    this.idleLivezyTime = 0;
}

showIdlePopup() {
    this.isIdleLivezyPopupShown = true; 
    this.applicationType="livezy";
    IdleTimeoutPopup.showIdleTimeoutPopup(this.applicationType);
}
clearAllCookies() {
    document.cookie.split(";").forEach((cookie) => {
      let cookieName = cookie.split("=")[0].trim();
      document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname;
    });
  }

    addLivezyEventListeners() {
        document.addEventListener('mousemove', () => this.resetLivezyIdleTime());
        document.addEventListener('keydown', () => this.resetLivezyIdleTime());
        document.addEventListener('touchstart', () => this.resetLivezyIdleTime());
        document.addEventListener('click', () => this.resetLivezyIdleTime());
    }
   
    callIdleTimepoutApi()
    {
      const idleTimeLimitStr = document.cookie
      .split('; ')
      .find(row => row.startsWith('IdleTimeLimit='))
      ?.split('=')[1];
        const idleTimeLimit = idleTimeLimitStr ? parseInt(idleTimeLimitStr, 10) || 0 : 0;
         this.timeLimit = idleTimeLimit/1000-60;
         console.log(this.timeLimit);
        if (this.timeLimit > 0) {
          this.backgroundTimer();
          this.startLivezyIdleTimer(this.timeLimit);
          this.addLivezyEventListeners();
        }
      }
}

