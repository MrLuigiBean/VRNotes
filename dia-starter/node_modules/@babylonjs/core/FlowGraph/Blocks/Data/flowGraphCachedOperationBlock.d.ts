import type { IFlowGraphBlockConfiguration } from "../../flowGraphBlock";
import { FlowGraphBlock } from "../../flowGraphBlock";
import type { FlowGraphContext } from "../../flowGraphContext";
import type { FlowGraphDataConnection } from "../../flowGraphDataConnection";
import type { RichType } from "../../flowGraphRichTypes";
/**
 * @experimental
 */
export declare abstract class FlowGraphCachedOperationBlock<OutputT> extends FlowGraphBlock {
    /**
     * The output of the operation
     */
    readonly value: FlowGraphDataConnection<OutputT>;
    constructor(outputRichType: RichType<OutputT>, config?: IFlowGraphBlockConfiguration);
    /**
     * @internal
     * Operation to realize
     * @param context the graph context
     */
    abstract _doOperation(context: FlowGraphContext): OutputT;
    _updateOutputs(context: FlowGraphContext): void;
}
