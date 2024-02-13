import { NodeGeometryBlock } from "../../nodeGeometryBlock";
import type { NodeGeometryConnectionPoint } from "../../nodeGeometryBlockConnectionPoint";
import type { NodeGeometryBuildState } from "../../nodeGeometryBuildState";
/**
 * Block used to get a translation matrix
 */
export declare class TranslationBlock extends NodeGeometryBlock {
    /**
     * Create a new TranslationBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the translation input component
     */
    get translation(): NodeGeometryConnectionPoint;
    /**
     * Gets the matrix output component
     */
    get matrix(): NodeGeometryConnectionPoint;
    autoConfigure(): void;
    protected _buildBlock(state: NodeGeometryBuildState): void;
}
