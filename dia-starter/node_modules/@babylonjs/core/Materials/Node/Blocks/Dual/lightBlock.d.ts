import { NodeMaterialBlock } from "../../nodeMaterialBlock";
import type { NodeMaterialBuildState } from "../../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../../nodeMaterialBlockConnectionPoint";
import type { AbstractMesh } from "../../../../Meshes/abstractMesh";
import type { NodeMaterial, NodeMaterialDefines } from "../../nodeMaterial";
import type { Effect } from "../../../effect";
import type { Mesh } from "../../../../Meshes/mesh";
import type { Light } from "../../../../Lights/light";
import type { Nullable } from "../../../../types";
import type { Scene } from "../../../../scene";
import "../../../../Shaders/ShadersInclude/lightFragmentDeclaration";
import "../../../../Shaders/ShadersInclude/lightVxFragmentDeclaration";
import "../../../../Shaders/ShadersInclude/lightUboDeclaration";
import "../../../../Shaders/ShadersInclude/lightVxUboDeclaration";
import "../../../../Shaders/ShadersInclude/lightFragment";
import "../../../../Shaders/ShadersInclude/helperFunctions";
import "../../../../Shaders/ShadersInclude/lightsFragmentFunctions";
import "../../../../Shaders/ShadersInclude/shadowsFragmentFunctions";
import "../../../../Shaders/ShadersInclude/shadowsVertex";
/**
 * Block used to add light in the fragment shader
 */
export declare class LightBlock extends NodeMaterialBlock {
    private _lightId;
    /**
     * Gets or sets the light associated with this block
     */
    light: Nullable<Light>;
    /** Indicates that no code should be generated in the vertex shader. Can be useful in some specific circumstances (like when doing ray marching for eg) */
    generateOnlyFragmentCode: boolean;
    private static _OnGenerateOnlyFragmentCodeChanged;
    private _setTarget;
    /**
     * Create a new LightBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the world position input component
     */
    get worldPosition(): NodeMaterialConnectionPoint;
    /**
     * Gets the world normal input component
     */
    get worldNormal(): NodeMaterialConnectionPoint;
    /**
     * Gets the camera (or eye) position component
     */
    get cameraPosition(): NodeMaterialConnectionPoint;
    /**
     * Gets the glossiness component
     */
    get glossiness(): NodeMaterialConnectionPoint;
    /**
     * Gets the glossiness power component
     */
    get glossPower(): NodeMaterialConnectionPoint;
    /**
     * Gets the diffuse color component
     */
    get diffuseColor(): NodeMaterialConnectionPoint;
    /**
     * Gets the specular color component
     */
    get specularColor(): NodeMaterialConnectionPoint;
    /**
     * Gets the view matrix component
     */
    get view(): NodeMaterialConnectionPoint;
    /**
     * Gets the diffuse output component
     */
    get diffuseOutput(): NodeMaterialConnectionPoint;
    /**
     * Gets the specular output component
     */
    get specularOutput(): NodeMaterialConnectionPoint;
    /**
     * Gets the shadow output component
     */
    get shadow(): NodeMaterialConnectionPoint;
    autoConfigure(material: NodeMaterial, additionalFilteringInfo?: (node: NodeMaterialBlock) => boolean): void;
    prepareDefines(mesh: AbstractMesh, nodeMaterial: NodeMaterial, defines: NodeMaterialDefines): void;
    updateUniformsAndSamples(state: NodeMaterialBuildState, nodeMaterial: NodeMaterial, defines: NodeMaterialDefines, uniformBuffers: string[]): void;
    bind(effect: Effect, nodeMaterial: NodeMaterial, mesh?: Mesh): void;
    private _injectVertexCode;
    protected _buildBlock(state: NodeMaterialBuildState): this | undefined;
    serialize(): any;
    _deserialize(serializationObject: any, scene: Scene, rootUrl: string): void;
}
