import type { Nullable } from "../../../../types.js";
import { NodeGeometryBlock } from "../../nodeGeometryBlock";
import type { NodeGeometryConnectionPoint } from "../../nodeGeometryBlockConnectionPoint";
import type { TeleportOutBlock } from "./teleportOutBlock";
/**
 * Defines a block used to teleport a value to an endpoint
 */
export declare class TeleportInBlock extends NodeGeometryBlock {
    private _endpoints;
    /** Gets the list of attached endpoints */
    get endpoints(): TeleportOutBlock[];
    /**
     * Create a new TeleportInBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the input component
     */
    get input(): NodeGeometryConnectionPoint;
    _dumpCode(uniqueNames: string[], alreadyDumped: NodeGeometryBlock[]): string;
    /**
     * Checks if the current block is an ancestor of a given type
     * @param type defines the potential type to check
     * @returns true if block is a descendant
     */
    isAnAncestorOfType(type: string): boolean;
    /**
     * Checks if the current block is an ancestor of a given block
     * @param block defines the potential descendant block to check
     * @returns true if block is a descendant
     */
    isAnAncestorOf(block: NodeGeometryBlock): boolean;
    /**
     * Get the first descendant using a predicate
     * @param predicate defines the predicate to check
     * @returns descendant or null if none found
     */
    getDescendantOfPredicate(predicate: (block: NodeGeometryBlock) => boolean): Nullable<NodeGeometryBlock>;
    /**
     * Add an enpoint to this block
     * @param endpoint define the endpoint to attach to
     */
    attachToEndpoint(endpoint: TeleportOutBlock): void;
    /**
     * Remove enpoint from this block
     * @param endpoint define the endpoint to remove
     */
    detachFromEndpoint(endpoint: TeleportOutBlock): void;
    protected _buildBlock(): void;
}
