import { NodeMaterialBlock } from "../../nodeMaterialBlock";
import type { NodeMaterialBuildState } from "../../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../../nodeMaterialBlockConnectionPoint";
/**
 * Block used to output values on the prepass textures
 */
export declare class PrePassOutputBlock extends NodeMaterialBlock {
    /**
     * Create a new PrePassOutputBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the view depth component
     */
    get viewDepth(): NodeMaterialConnectionPoint;
    /**
     * Gets the world position component
     */
    get worldPosition(): NodeMaterialConnectionPoint;
    /**
     * Gets the view normal component
     */
    get viewNormal(): NodeMaterialConnectionPoint;
    /**
     * Gets the reflectivity component
     */
    get reflectivity(): NodeMaterialConnectionPoint;
    protected _buildBlock(state: NodeMaterialBuildState): this;
}
