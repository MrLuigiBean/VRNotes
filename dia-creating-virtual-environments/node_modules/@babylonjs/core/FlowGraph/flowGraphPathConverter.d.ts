import type { FlowGraphContext } from "./flowGraphContext";
import type { IPathToObjectConverter, IObjectInfo } from "../ObjectModel/objectModelInterfaces";
import type { IObjectAccessor } from "./typeDefinitions";
/**
 * @experimental
 * A path converter that converts a path on the flow graph context variables to an object accessor.
 */
export declare class FlowGraphPathConverter implements IPathToObjectConverter<IObjectAccessor> {
    private _context;
    private _separator;
    constructor(_context: FlowGraphContext, _separator?: string);
    convert(path: string): IObjectInfo<IObjectAccessor>;
}
