import { NodeMaterialBlock } from "../../nodeMaterialBlock";
import type { NodeMaterialBuildState } from "../../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../../nodeMaterialBlockConnectionPoint";
/**
 * Block used to output the vertex position
 */
export declare class VertexOutputBlock extends NodeMaterialBlock {
    /**
     * Creates a new VertexOutputBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the vector input component
     */
    get vector(): NodeMaterialConnectionPoint;
    private _isLogarithmicDepthEnabled;
    protected _buildBlock(state: NodeMaterialBuildState): this;
}
