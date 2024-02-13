import type { AsyncCoroutine, CoroutineScheduler } from "./coroutine";
declare module "./observable" {
    interface Observable<T> {
        /**
         * Internal observable-based coroutine scheduler instance.
         */
        _coroutineScheduler?: CoroutineScheduler<void>;
        /**
         * Internal disposal method for observable-based coroutine scheduler instance.
         */
        _coroutineSchedulerDispose?: () => void;
        /**
         * Runs a coroutine asynchronously on this observable
         * @param coroutine the iterator resulting from having started the coroutine
         * @returns a promise which will be resolved when the coroutine finishes or rejected if the coroutine is cancelled
         */
        runCoroutineAsync(coroutine: AsyncCoroutine<void>): Promise<void>;
        /**
         * Cancels all coroutines currently running on this observable
         */
        cancelAllCoroutines(): void;
    }
}
