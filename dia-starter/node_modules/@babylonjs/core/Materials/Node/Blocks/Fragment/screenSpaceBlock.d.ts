import { NodeMaterialBlock } from "../../nodeMaterialBlock";
import type { NodeMaterialBuildState } from "../../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../../nodeMaterialBlockConnectionPoint";
import type { NodeMaterial } from "../../nodeMaterial";
/**
 * Block used to transform a vector3 or a vector4 into screen space
 */
export declare class ScreenSpaceBlock extends NodeMaterialBlock {
    /**
     * Creates a new ScreenSpaceBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the vector input
     */
    get vector(): NodeMaterialConnectionPoint;
    /**
     * Gets the worldViewProjection transform input
     */
    get worldViewProjection(): NodeMaterialConnectionPoint;
    /**
     * Gets the output component
     */
    get output(): NodeMaterialConnectionPoint;
    /**
     * Gets the x output component
     */
    get x(): NodeMaterialConnectionPoint;
    /**
     * Gets the y output component
     */
    get y(): NodeMaterialConnectionPoint;
    autoConfigure(material: NodeMaterial, additionalFilteringInfo?: (node: NodeMaterialBlock) => boolean): void;
    protected _buildBlock(state: NodeMaterialBuildState): this | undefined;
}
