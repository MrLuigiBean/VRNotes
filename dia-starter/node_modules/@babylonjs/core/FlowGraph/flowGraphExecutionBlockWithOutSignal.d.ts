import type { IFlowGraphBlockConfiguration } from "./flowGraphBlock";
import { FlowGraphExecutionBlock } from "./flowGraphExecutionBlock";
import type { FlowGraphSignalConnection } from "./flowGraphSignalConnection";
/**
 * @experimental
 * An execution block that has an out signal. This signal is triggered when the synchronous execution of this block is done.
 * Most execution blocks will inherit from this, except for the ones that have multiple signals to be triggered.
 * (such as if blocks)
 */
export declare abstract class FlowGraphExecutionBlockWithOutSignal extends FlowGraphExecutionBlock {
    /**
     * Output connection: The signal that is triggered when the execution of this block is done.
     */
    readonly out: FlowGraphSignalConnection;
    protected constructor(config?: IFlowGraphBlockConfiguration);
}
