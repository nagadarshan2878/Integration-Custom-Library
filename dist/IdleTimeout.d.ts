export declare class IdleTimeout {
    private idleTime;
    private idleLimit;
    private idleInterval;
    private isIdlePopupShown;
    private applicationType;
    private decryptedToken;
    private globalTime;
    private IdleTimeLim;
    private isPaused;
    constructor();
    setPauseState(state: boolean): void;
    startIdleTimer(time: number): number;
    resetIdleTime(): void;
    stopIdleTimer(): void;
    showIdlePopup(): void;
    clearAllCookies(): void;
    addEventListeners(): void;
    callIdleApi(): void;
    getIdleTime(): number;
    getIdleTimelimit(): number;
    restart(timeLim: number): void;
}
