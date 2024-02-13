import { NodeGeometryBlock } from "../nodeGeometryBlock";
import type { NodeGeometryConnectionPoint } from "../nodeGeometryBlockConnectionPoint";
/**
 * Block used to get the bounding info of a geometry
 */
export declare class BoundingBlock extends NodeGeometryBlock {
    /**
     * Create a new BoundingBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the geometry input component
     */
    get geometry(): NodeGeometryConnectionPoint;
    /**
     * Gets the min output component
     */
    get min(): NodeGeometryConnectionPoint;
    /**
     * Gets the max output component
     */
    get max(): NodeGeometryConnectionPoint;
    protected _buildBlock(): void;
}
