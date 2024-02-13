import { FlowGraphBinaryOperationBlock } from "../flowGraphBinaryOperationBlock";
import { FlowGraphUnaryOperationBlock } from "../flowGraphUnaryOperationBlock";
import type { IFlowGraphBlockConfiguration } from "../../../flowGraphBlock";
/**
 * Performs an AND operation on two boolean values.
 * @experimental
 */
export declare class FlowGraphLogicAndBlock extends FlowGraphBinaryOperationBlock<boolean, boolean, boolean> {
    constructor(config: IFlowGraphBlockConfiguration);
}
/**
 * Performs an OR operation on two boolean values.
 * @experimental
 */
export declare class FlowGraphLogicOrBlock extends FlowGraphBinaryOperationBlock<boolean, boolean, boolean> {
    constructor(config: IFlowGraphBlockConfiguration);
}
/**
 * Performs a NOT operation on a boolean value
 * @experimental
 */
export declare class FlowGraphLogicNotBlock extends FlowGraphUnaryOperationBlock<boolean, boolean> {
    constructor(config: IFlowGraphBlockConfiguration);
}
