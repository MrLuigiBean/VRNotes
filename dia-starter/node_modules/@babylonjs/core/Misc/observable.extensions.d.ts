import type { EventState } from "./observable";
import { Observable } from "./observable";
/**
 * Represent a list of observers registered to multiple Observables object.
 */
export declare class MultiObserver<T> {
    private _observers;
    private _observables;
    /**
     * Release associated resources
     */
    dispose(): void;
    /**
     * Raise a callback when one of the observable will notify
     * @param observables defines a list of observables to watch
     * @param callback defines the callback to call on notification
     * @param mask defines the mask used to filter notifications
     * @param scope defines the current scope used to restore the JS context
     * @returns the new MultiObserver
     */
    static Watch<T>(observables: Observable<T>[], callback: (eventData: T, eventState: EventState) => void, mask?: number, scope?: any): MultiObserver<T>;
}
declare module "./observable" {
    interface Observable<T> {
        /**
         * Calling this will execute each callback, expecting it to be a promise or return a value.
         * If at any point in the chain one function fails, the promise will fail and the execution will not continue.
         * This is useful when a chain of events (sometimes async events) is needed to initialize a certain object
         * and it is crucial that all callbacks will be executed.
         * The order of the callbacks is kept, callbacks are not executed parallel.
         *
         * @param eventData The data to be sent to each callback
         * @param mask is used to filter observers defaults to -1
         * @param target defines the callback target (see EventState)
         * @param currentTarget defines he current object in the bubbling phase
         * @param userInfo defines any user info to send to observers
         * @returns {Promise<T>} will return a Promise than resolves when all callbacks executed successfully.
         */
        notifyObserversWithPromise(eventData: T, mask?: number, target?: any, currentTarget?: any, userInfo?: any): Promise<T>;
    }
}
