import { NodeMaterialBlock } from "../../nodeMaterialBlock";
import type { NodeMaterialBuildState } from "../../nodeMaterialBuildState";
import type { AbstractMesh } from "../../../../Meshes/abstractMesh";
import type { Mesh } from "../../../../Meshes/mesh";
import type { Effect } from "../../../effect";
import type { NodeMaterialConnectionPoint } from "../../nodeMaterialBlockConnectionPoint";
import type { NodeMaterial, NodeMaterialDefines } from "../../nodeMaterial";
import "../../../../Shaders/ShadersInclude/bonesDeclaration";
import "../../../../Shaders/ShadersInclude/bonesVertex";
import type { EffectFallbacks } from "../../../effectFallbacks";
/**
 * Block used to add support for vertex skinning (bones)
 */
export declare class BonesBlock extends NodeMaterialBlock {
    /**
     * Creates a new BonesBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Initialize the block and prepare the context for build
     * @param state defines the state that will be used for the build
     */
    initialize(state: NodeMaterialBuildState): void;
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the matrix indices input component
     */
    get matricesIndices(): NodeMaterialConnectionPoint;
    /**
     * Gets the matrix weights input component
     */
    get matricesWeights(): NodeMaterialConnectionPoint;
    /**
     * Gets the extra matrix indices input component
     */
    get matricesIndicesExtra(): NodeMaterialConnectionPoint;
    /**
     * Gets the extra matrix weights input component
     */
    get matricesWeightsExtra(): NodeMaterialConnectionPoint;
    /**
     * Gets the world input component
     */
    get world(): NodeMaterialConnectionPoint;
    /**
     * Gets the output component
     */
    get output(): NodeMaterialConnectionPoint;
    autoConfigure(material: NodeMaterial, additionalFilteringInfo?: (node: NodeMaterialBlock) => boolean): void;
    provideFallbacks(mesh: AbstractMesh, fallbacks: EffectFallbacks): void;
    bind(effect: Effect, nodeMaterial: NodeMaterial, mesh?: Mesh): void;
    prepareDefines(mesh: AbstractMesh, nodeMaterial: NodeMaterial, defines: NodeMaterialDefines): void;
    protected _buildBlock(state: NodeMaterialBuildState): this;
}
