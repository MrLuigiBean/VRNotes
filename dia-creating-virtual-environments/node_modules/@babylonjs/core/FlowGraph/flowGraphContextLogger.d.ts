import type { FlowGraphContext } from "./flowGraphContext";
/**
 * @experimental
 * This class is a decorator for the context which logs the nodes that were executed.
 */
export declare class FlowGraphContextLogger {
    private _context;
    constructor(_context: FlowGraphContext);
}
