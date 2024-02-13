import { NodeGeometryBlock } from "../../nodeGeometryBlock";
import type { NodeGeometryConnectionPoint } from "../../nodeGeometryBlockConnectionPoint";
import type { NodeGeometryBuildState } from "../../nodeGeometryBuildState";
/**
 * Block used to get a rotation matrix on Y Axis
 */
export declare class RotationYBlock extends NodeGeometryBlock {
    /**
     * Create a new RotationYBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the angle input component
     */
    get angle(): NodeGeometryConnectionPoint;
    /**
     * Gets the matrix output component
     */
    get matrix(): NodeGeometryConnectionPoint;
    autoConfigure(): void;
    protected _buildBlock(state: NodeGeometryBuildState): void;
}
