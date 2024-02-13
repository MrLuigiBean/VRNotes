import { NodeMaterialBlock } from "../../nodeMaterialBlock";
import type { NodeMaterialBuildState } from "../../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../../nodeMaterialBlockConnectionPoint";
/**
 * Block used for the particle blend multiply section
 */
export declare class ParticleBlendMultiplyBlock extends NodeMaterialBlock {
    /**
     * Create a new ParticleBlendMultiplyBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the color input component
     */
    get color(): NodeMaterialConnectionPoint;
    /**
     * Gets the alphaTexture input component
     */
    get alphaTexture(): NodeMaterialConnectionPoint;
    /**
     * Gets the alphaColor input component
     */
    get alphaColor(): NodeMaterialConnectionPoint;
    /**
     * Gets the blendColor output component
     */
    get blendColor(): NodeMaterialConnectionPoint;
    /**
     * Initialize the block and prepare the context for build
     * @param state defines the state that will be used for the build
     */
    initialize(state: NodeMaterialBuildState): void;
    protected _buildBlock(state: NodeMaterialBuildState): this | undefined;
}
