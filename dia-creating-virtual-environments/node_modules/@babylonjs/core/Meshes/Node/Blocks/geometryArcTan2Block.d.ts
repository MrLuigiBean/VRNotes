import { NodeGeometryBlock } from "../nodeGeometryBlock";
import type { NodeGeometryConnectionPoint } from "../nodeGeometryBlockConnectionPoint";
/**
 * Block used to compute arc tangent of 2 values
 */
export declare class GeometryArcTan2Block extends NodeGeometryBlock {
    /**
     * Creates a new GeometryArcTan2Block
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the x operand input component
     */
    get x(): NodeGeometryConnectionPoint;
    /**
     * Gets the y operand input component
     */
    get y(): NodeGeometryConnectionPoint;
    /**
     * Gets the output component
     */
    get output(): NodeGeometryConnectionPoint;
    protected _buildBlock(): void;
}
