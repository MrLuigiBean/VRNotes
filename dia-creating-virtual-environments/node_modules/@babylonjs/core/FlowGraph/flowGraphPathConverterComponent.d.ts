import type { IObjectInfo, IPathToObjectConverter } from "../ObjectModel/objectModelInterfaces";
import type { FlowGraphBlock } from "./flowGraphBlock";
import type { FlowGraphContext } from "./flowGraphContext";
import type { FlowGraphDataConnection } from "./flowGraphDataConnection";
import type { FlowGraphInteger } from "./flowGraphInteger";
import type { IObjectAccessor } from "./typeDefinitions";
/**
 * @experimental
 * A component that converts a path to an object accessor.
 */
export declare class FlowGraphPathConverterComponent {
    path: string;
    ownerBlock: FlowGraphBlock;
    /**
     * The templated inputs for the provided path.
     */
    readonly templatedInputs: FlowGraphDataConnection<FlowGraphInteger>[];
    constructor(path: string, ownerBlock: FlowGraphBlock);
    getAccessor(pathConverter: IPathToObjectConverter<IObjectAccessor>, context: FlowGraphContext): IObjectInfo<IObjectAccessor>;
}
