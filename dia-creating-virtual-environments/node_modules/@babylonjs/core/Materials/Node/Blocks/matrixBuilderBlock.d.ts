import { NodeMaterialBlock } from "../nodeMaterialBlock";
import type { NodeMaterialBuildState } from "../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../nodeMaterialBlockConnectionPoint";
/**
 * Block used to build a matrix from 4 Vector4
 */
export declare class MatrixBuilderBlock extends NodeMaterialBlock {
    /**
     * Creates a new MatrixBuilder
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the row0 vector
     */
    get row0(): NodeMaterialConnectionPoint;
    /**
     * Gets the row1 vector
     */
    get row1(): NodeMaterialConnectionPoint;
    /**
     * Gets the row2 vector
     */
    get row2(): NodeMaterialConnectionPoint;
    /**
     * Gets the row3 vector
     */
    get row3(): NodeMaterialConnectionPoint;
    /**
     * Gets the output component
     */
    get output(): NodeMaterialConnectionPoint;
    autoConfigure(): void;
    protected _buildBlock(state: NodeMaterialBuildState): this;
}
