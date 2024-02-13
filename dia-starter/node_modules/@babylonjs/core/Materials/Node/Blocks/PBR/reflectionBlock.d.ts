import type { NodeMaterialBuildState } from "../../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../../nodeMaterialBlockConnectionPoint";
import type { NodeMaterial, NodeMaterialDefines } from "../../nodeMaterial";
import { ReflectionTextureBaseBlock } from "../Dual/reflectionTextureBaseBlock";
import type { AbstractMesh } from "../../../../Meshes/abstractMesh";
import type { Nullable } from "../../../../types";
import type { BaseTexture } from "../../../Textures/baseTexture";
import type { Mesh } from "../../../../Meshes/mesh";
import type { SubMesh } from "../../../../Meshes/subMesh";
import type { Effect } from "../../../effect";
import type { Scene } from "../../../../scene";
/**
 * Block used to implement the reflection module of the PBR material
 */
export declare class ReflectionBlock extends ReflectionTextureBaseBlock {
    /** @internal */
    _defineLODReflectionAlpha: string;
    /** @internal */
    _defineLinearSpecularReflection: string;
    private _vEnvironmentIrradianceName;
    /** @internal */
    _vReflectionMicrosurfaceInfosName: string;
    /** @internal */
    _vReflectionInfosName: string;
    /** @internal */
    _vReflectionFilteringInfoName: string;
    private _scene;
    /**
     * The properties below are set by the main PBR block prior to calling methods of this class.
     * This is to avoid having to add them as inputs here whereas they are already inputs of the main block, so already known.
     * It's less burden on the user side in the editor part.
     */
    /** @internal */
    worldPositionConnectionPoint: NodeMaterialConnectionPoint;
    /** @internal */
    worldNormalConnectionPoint: NodeMaterialConnectionPoint;
    /** @internal */
    cameraPositionConnectionPoint: NodeMaterialConnectionPoint;
    /** @internal */
    viewConnectionPoint: NodeMaterialConnectionPoint;
    /**
     * Defines if the material uses spherical harmonics vs spherical polynomials for the
     * diffuse part of the IBL.
     */
    useSphericalHarmonics: boolean;
    /**
     * Force the shader to compute irradiance in the fragment shader in order to take bump in account.
     */
    forceIrradianceInFragment: boolean;
    protected _onGenerateOnlyFragmentCodeChanged(): boolean;
    protected _setTarget(): void;
    /**
     * Create a new ReflectionBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the position input component
     */
    get position(): NodeMaterialConnectionPoint;
    /**
     * Gets the world position input component
     */
    get worldPosition(): NodeMaterialConnectionPoint;
    /**
     * Gets the world normal input component
     */
    get worldNormal(): NodeMaterialConnectionPoint;
    /**
     * Gets the world input component
     */
    get world(): NodeMaterialConnectionPoint;
    /**
     * Gets the camera (or eye) position component
     */
    get cameraPosition(): NodeMaterialConnectionPoint;
    /**
     * Gets the view input component
     */
    get view(): NodeMaterialConnectionPoint;
    /**
     * Gets the color input component
     */
    get color(): NodeMaterialConnectionPoint;
    /**
     * Gets the reflection object output component
     */
    get reflection(): NodeMaterialConnectionPoint;
    /**
     * Returns true if the block has a texture (either its own texture or the environment texture from the scene, if set)
     */
    get hasTexture(): boolean;
    /**
     * Gets the reflection color (either the name of the variable if the color input is connected, else a default value)
     */
    get reflectionColor(): string;
    protected _getTexture(): Nullable<BaseTexture>;
    prepareDefines(mesh: AbstractMesh, nodeMaterial: NodeMaterial, defines: NodeMaterialDefines): void;
    bind(effect: Effect, nodeMaterial: NodeMaterial, mesh?: Mesh, subMesh?: SubMesh): void;
    /**
     * Gets the code to inject in the vertex shader
     * @param state current state of the node material building
     * @returns the shader code
     */
    handleVertexSide(state: NodeMaterialBuildState): string;
    /**
     * Gets the main code of the block (fragment side)
     * @param state current state of the node material building
     * @param normalVarName name of the existing variable corresponding to the normal
     * @returns the shader code
     */
    getCode(state: NodeMaterialBuildState, normalVarName: string): string;
    protected _buildBlock(state: NodeMaterialBuildState): this;
    protected _dumpPropertiesCode(): string;
    serialize(): any;
    _deserialize(serializationObject: any, scene: Scene, rootUrl: string): void;
}
