import type { IFlowGraphBlockConfiguration } from "./flowGraphBlock";
import type { FlowGraphContext } from "./flowGraphContext";
import { FlowGraphExecutionBlock } from "./flowGraphExecutionBlock";
import type { FlowGraphSignalConnection } from "./flowGraphSignalConnection";
/**
 * An async execution block can start tasks that will be executed asynchronously.
 * It should also be responsible for clearing it in _cancelPendingTasks.
 * @experimental
 */
export declare abstract class FlowGraphAsyncExecutionBlock extends FlowGraphExecutionBlock {
    /**
     * Output connection: The signal that is triggered when the synchronous execution of this block is done.
     */
    out: FlowGraphSignalConnection;
    /**
     * Output connection: The signal that is triggered when the asynchronous execution of this block is done.
     */
    done: FlowGraphSignalConnection;
    constructor(config?: IFlowGraphBlockConfiguration);
    /**
     * @internal
     * This function can be overridden to start any
     * pending tasks this node might have, such as
     * timeouts and playing animations.
     * @param context
     */
    abstract _preparePendingTasks(context: FlowGraphContext): void;
    /**
     * @internal
     * @param context
     */
    _startPendingTasks(context: FlowGraphContext): void;
    abstract _cancelPendingTasks(context: FlowGraphContext): void;
}
