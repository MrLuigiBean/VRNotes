import { NodeMaterialBlock } from "../../nodeMaterialBlock";
import type { NodeMaterialBuildState } from "../../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../../nodeMaterialBlockConnectionPoint";
import type { NodeMaterial, NodeMaterialDefines } from "../../nodeMaterial";
import type { AbstractMesh } from "../../../../Meshes/abstractMesh";
import type { ReflectionBlock } from "./reflectionBlock";
import type { Scene } from "../../../../scene";
import type { Nullable } from "../../../../types";
/**
 * Block used to implement the sheen module of the PBR material
 */
export declare class SheenBlock extends NodeMaterialBlock {
    /**
     * Create a new SheenBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * If true, the sheen effect is layered above the base BRDF with the albedo-scaling technique.
     * It allows the strength of the sheen effect to not depend on the base color of the material,
     * making it easier to setup and tweak the effect
     */
    albedoScaling: boolean;
    /**
     * Defines if the sheen is linked to the sheen color.
     */
    linkSheenWithAlbedo: boolean;
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
     * Gets the intensity input component
     */
    get intensity(): NodeMaterialConnectionPoint;
    /**
     * Gets the color input component
     */
    get color(): NodeMaterialConnectionPoint;
    /**
     * Gets the roughness input component
     */
    get roughness(): NodeMaterialConnectionPoint;
    /**
     * Gets the sheen object output component
     */
    get sheen(): NodeMaterialConnectionPoint;
    prepareDefines(mesh: AbstractMesh, nodeMaterial: NodeMaterial, defines: NodeMaterialDefines): void;
    /**
     * Gets the main code of the block (fragment side)
     * @param reflectionBlock instance of a ReflectionBlock null if the code must be generated without an active reflection module
     * @returns the shader code
     */
    getCode(reflectionBlock: Nullable<ReflectionBlock>): string;
    protected _buildBlock(state: NodeMaterialBuildState): this;
    protected _dumpPropertiesCode(): string;
    serialize(): any;
    _deserialize(serializationObject: any, scene: Scene, rootUrl: string): void;
}
