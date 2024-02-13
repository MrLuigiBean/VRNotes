import type { Observer } from "../Misc/observable";
import { Observable } from "../Misc/observable";
import type { Nullable } from "../types";
import type { IDisposable } from "../scene";
/**
 * Construction options for a timer
 */
export interface ITimerOptions<T> {
    /**
     * Time-to-end
     */
    timeout: number;
    /**
     * The context observable is used to calculate time deltas and provides the context of the timer's callbacks. Will usually be OnBeforeRenderObservable.
     * Countdown calculation is done ONLY when the observable is notifying its observers, meaning that if
     * you choose an observable that doesn't trigger too often, the wait time might extend further than the requested max time
     */
    contextObservable: Observable<T>;
    /**
     * Optional parameters when adding an observer to the observable
     */
    observableParameters?: {
        mask?: number;
        insertFirst?: boolean;
        scope?: any;
    };
    /**
     * An optional break condition that will stop the times prematurely. In this case onEnded will not be triggered!
     */
    breakCondition?: (data?: ITimerData<T>) => boolean;
    /**
     * Will be triggered when the time condition has met
     */
    onEnded?: (data: ITimerData<any>) => void;
    /**
     * Will be triggered when the break condition has met (prematurely ended)
     */
    onAborted?: (data: ITimerData<any>) => void;
    /**
     * Optional function to execute on each tick (or count)
     */
    onTick?: (data: ITimerData<any>) => void;
}
/**
 * An interface defining the data sent by the timer
 */
export interface ITimerData<T> {
    /**
     * When did it start
     */
    startTime: number;
    /**
     * Time now
     */
    currentTime: number;
    /**
     * Time passed since started
     */
    deltaTime: number;
    /**
     * How much is completed, in [0.0...1.0].
     * Note that this CAN be higher than 1 due to the fact that we don't actually measure time but delta between observable calls
     */
    completeRate: number;
    /**
     * What the registered observable sent in the last count
     */
    payload: T;
}
/**
 * The current state of the timer
 */
export declare enum TimerState {
    /**
     * Timer initialized, not yet started
     */
    INIT = 0,
    /**
     * Timer started and counting
     */
    STARTED = 1,
    /**
     * Timer ended (whether aborted or time reached)
     */
    ENDED = 2
}
/**
 * A simple version of the timer. Will take options and start the timer immediately after calling it
 *
 * @param options options with which to initialize this timer
 */
export declare function setAndStartTimer(options: ITimerOptions<any>): Nullable<Observer<any>>;
/**
 * An advanced implementation of a timer class
 */
export declare class AdvancedTimer<T = any> implements IDisposable {
    /**
     * Will notify each time the timer calculates the remaining time
     */
    onEachCountObservable: Observable<ITimerData<T>>;
    /**
     * Will trigger when the timer was aborted due to the break condition
     */
    onTimerAbortedObservable: Observable<ITimerData<T>>;
    /**
     * Will trigger when the timer ended successfully
     */
    onTimerEndedObservable: Observable<ITimerData<T>>;
    /**
     * Will trigger when the timer state has changed
     */
    onStateChangedObservable: Observable<TimerState>;
    private _observer;
    private _contextObservable;
    private _observableParameters;
    private _startTime;
    private _timer;
    private _state;
    private _breakCondition;
    private _timeToEnd;
    private _breakOnNextTick;
    /**
     * Will construct a new advanced timer based on the options provided. Timer will not start until start() is called.
     * @param options construction options for this advanced timer
     */
    constructor(options: ITimerOptions<T>);
    /**
     * set a breaking condition for this timer. Default is to never break during count
     * @param predicate the new break condition. Returns true to break, false otherwise
     */
    set breakCondition(predicate: (data: ITimerData<T>) => boolean);
    /**
     * Reset ALL associated observables in this advanced timer
     */
    clearObservables(): void;
    /**
     * Will start a new iteration of this timer. Only one instance of this timer can run at a time.
     *
     * @param timeToEnd how much time to measure until timer ended
     */
    start(timeToEnd?: number): void;
    /**
     * Will force a stop on the next tick.
     */
    stop(): void;
    /**
     * Dispose this timer, clearing all resources
     */
    dispose(): void;
    private _setState;
    private _tick;
    private _stop;
}
