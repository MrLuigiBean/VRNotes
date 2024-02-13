/**
 * A Coroutine<T> is the intersection of:
 * 1. An Iterator that yields void, returns a T, and is not passed values with calls to next.
 * 2. An IterableIterator of void (since it only yields void).
 */
type CoroutineBase<TStep, TReturn> = Iterator<TStep, TReturn, void> & IterableIterator<TStep>;
/** @internal */
export type Coroutine<T> = CoroutineBase<void, T>;
/** @internal */
export type AsyncCoroutine<T> = CoroutineBase<void | Promise<void>, T>;
/** @internal */
export type CoroutineStep<T> = IteratorResult<void, T>;
/** @internal */
export type CoroutineScheduler<T> = (coroutine: AsyncCoroutine<T>, onStep: (stepResult: CoroutineStep<T>) => void, onError: (stepError: any) => void) => void;
/**
 * @internal
 */
export declare function inlineScheduler<T>(coroutine: AsyncCoroutine<T>, onStep: (stepResult: CoroutineStep<T>) => void, onError: (stepError: any) => void): void;
/**
 * @internal
 */
export declare function createYieldingScheduler<T>(yieldAfterMS?: number): (coroutine: AsyncCoroutine<T>, onStep: (stepResult: CoroutineStep<T>) => void, onError: (stepError: any) => void) => void;
/**
 * @internal
 */
export declare function runCoroutine<T>(coroutine: AsyncCoroutine<T>, scheduler: CoroutineScheduler<T>, onSuccess: (result: T) => void, onError: (error: any) => void, abortSignal?: AbortSignal): void;
/**
 * @internal
 */
export declare function runCoroutineSync<T>(coroutine: Coroutine<T>, abortSignal?: AbortSignal): T;
/**
 * @internal
 */
export declare function runCoroutineAsync<T>(coroutine: AsyncCoroutine<T>, scheduler: CoroutineScheduler<T>, abortSignal?: AbortSignal): Promise<T>;
/**
 * Given a function that returns a Coroutine<T>, produce a function with the same parameters that returns a T.
 * The returned function runs the coroutine synchronously.
 * @param coroutineFactory A function that returns a Coroutine<T>.
 * @param abortSignal
 * @returns A function that runs the coroutine synchronously.
 * @internal
 */
export declare function makeSyncFunction<TParams extends unknown[], TReturn>(coroutineFactory: (...params: TParams) => Coroutine<TReturn>, abortSignal?: AbortSignal): (...params: TParams) => TReturn;
/**
 * Given a function that returns a Coroutine<T>, product a function with the same parameters that returns a Promise<T>.
 * The returned function runs the coroutine asynchronously, yield control of the execution context occasionally to enable a more responsive experience.
 * @param coroutineFactory A function that returns a Coroutine<T>.
 * @param scheduler
 * @param abortSignal
 * @returns A function that runs the coroutine asynchronously.
 * @internal
 */
export declare function makeAsyncFunction<TParams extends unknown[], TReturn>(coroutineFactory: (...params: TParams) => AsyncCoroutine<TReturn>, scheduler: CoroutineScheduler<TReturn>, abortSignal?: AbortSignal): (...params: TParams) => Promise<TReturn>;
export {};
