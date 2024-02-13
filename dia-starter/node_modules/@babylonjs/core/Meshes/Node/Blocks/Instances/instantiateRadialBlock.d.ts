import type { NodeGeometryConnectionPoint } from "../../nodeGeometryBlockConnectionPoint";
import type { NodeGeometryBuildState } from "../../nodeGeometryBuildState";
import { InstantiateBaseBlock } from "./instantiateBaseBlock";
/**
 * Block used to clone geometry in a radial shape
 */
export declare class InstantiateRadialBlock extends InstantiateBaseBlock {
    /**
     * Create a new InstantiateRadialBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the direction input component
     */
    get radius(): NodeGeometryConnectionPoint;
    /**
     * Gets the direction input component
     */
    get angleStart(): NodeGeometryConnectionPoint;
    /**
     * Gets the direction input component
     */
    get angleEnd(): NodeGeometryConnectionPoint;
    /**
     * Gets the transform input component
     */
    get transform(): NodeGeometryConnectionPoint;
    /**
     * Gets the rotation input component
     */
    get rotation(): NodeGeometryConnectionPoint;
    /**
     * Gets the scaling input component
     */
    get scaling(): NodeGeometryConnectionPoint;
    protected _buildBlock(state: NodeGeometryBuildState): void;
}
