import { Observable } from "./observable";
/**
 * A wrapper for the experimental pressure api which allows a callback to be called whenever certain thresholds are met.
 */
export declare class PressureObserverWrapper {
    private _observer;
    private _currentState;
    /**
     * An event triggered when the cpu usage/speed meets certain thresholds.
     * Note: pressure is an experimental API.
     */
    onPressureChanged: Observable<PressureRecord[]>;
    /**
     * A pressure observer will call this callback, whenever these thresholds are met.
     * @param options An object containing the thresholds used to decide what value to to return for each update property (average of start and end of a threshold boundary).
     */
    constructor(options?: PressureObserverOptions);
    /**
     * Returns true if PressureObserver is available for use, false otherwise.
     */
    static get IsAvailable(): boolean;
    /**
     * Method that must be called to begin observing changes, and triggering callbacks.
     * @param source defines the source to observe
     */
    observe(source: PressureSource): void;
    /**
     * Method that must be called to stop observing changes and triggering callbacks (cleanup function).
     * @param source defines the source to unobserve
     */
    unobserve(source: PressureSource): void;
    /**
     * Release the associated resources.
     */
    dispose(): void;
}
