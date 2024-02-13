import type { IDisposable } from "../scene";
/** @ignore */
interface WorkerInfo {
    workerPromise: Promise<Worker>;
    idle: boolean;
    timeoutId?: ReturnType<typeof setTimeout>;
}
/**
 * Helper class to push actions to a pool of workers.
 */
export declare class WorkerPool implements IDisposable {
    protected _workerInfos: Array<WorkerInfo>;
    protected _pendingActions: ((worker: Worker, onComplete: () => void) => void)[];
    /**
     * Constructor
     * @param workers Array of workers to use for actions
     */
    constructor(workers: Array<Worker>);
    /**
     * Terminates all workers and clears any pending actions.
     */
    dispose(): void;
    /**
     * Pushes an action to the worker pool. If all the workers are active, the action will be
     * pended until a worker has completed its action.
     * @param action The action to perform. Call onComplete when the action is complete.
     */
    push(action: (worker: Worker, onComplete: () => void) => void): void;
    protected _executeOnIdleWorker(action: (worker: Worker, onComplete: () => void) => void): boolean;
    protected _execute(workerInfo: WorkerInfo, action: (worker: Worker, onComplete: () => void) => void): void;
}
/**
 * Options for AutoReleaseWorkerPool
 */
export interface AutoReleaseWorkerPoolOptions {
    /**
     * Idle time elapsed before workers are terminated.
     */
    idleTimeElapsedBeforeRelease: number;
}
/**
 * Similar to the WorkerPool class except it creates and destroys workers automatically with a maximum of `maxWorkers` workers.
 * Workers are terminated when it is idle for at least `idleTimeElapsedBeforeRelease` milliseconds.
 */
export declare class AutoReleaseWorkerPool extends WorkerPool {
    /**
     * Default options for the constructor.
     * Override to change the defaults.
     */
    static DefaultOptions: AutoReleaseWorkerPoolOptions;
    private readonly _maxWorkers;
    private readonly _createWorkerAsync;
    private readonly _options;
    constructor(maxWorkers: number, createWorkerAsync: () => Promise<Worker>, options?: AutoReleaseWorkerPoolOptions);
    push(action: (worker: Worker, onComplete: () => void) => void): void;
    protected _execute(workerInfo: WorkerInfo, action: (worker: Worker, onComplete: () => void) => void): void;
}
export {};
