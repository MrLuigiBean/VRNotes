import { NodeGeometryBlock } from "../nodeGeometryBlock";
import type { NodeGeometryConnectionPoint } from "../nodeGeometryBlockConnectionPoint";
/**
 * Defines a block used to move a value from a range to another
 */
export declare class MapRangeBlock extends NodeGeometryBlock {
    /**
     * Create a new MapRangeBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the value input component
     */
    get value(): NodeGeometryConnectionPoint;
    /**
     * Gets the fromMin input component
     */
    get fromMin(): NodeGeometryConnectionPoint;
    /**
     * Gets the fromMax input component
     */
    get fromMax(): NodeGeometryConnectionPoint;
    /**
     * Gets the toMin input component
     */
    get toMin(): NodeGeometryConnectionPoint;
    /**
     * Gets the toMax input component
     */
    get toMax(): NodeGeometryConnectionPoint;
    /**
     * Gets the output component
     */
    get output(): NodeGeometryConnectionPoint;
    protected _buildBlock(): void;
}
