export declare class LivezyIdleTimeout {
    private idleLivezyTime;
    private idleLivezyLimit;
    private idleLivezyInterval;
    private isIdleLivezyPopupShown;
    private applicationType;
    private decryptedToken;
    private timeLimit;
    private currentObdxIdleTime;
    constructor();
    backgroundTimer(): void;
    startLivezyIdleTimer(timeLimit: number): void;
    private resetLivezyIdleTime;
    showIdlePopup(): void;
    clearAllCookies(): void;
    addLivezyEventListeners(): void;
    callIdleTimepoutApi(): void;
}
