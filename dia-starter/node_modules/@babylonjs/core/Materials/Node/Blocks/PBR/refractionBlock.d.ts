import type { NodeMaterialBuildState } from "../../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../../nodeMaterialBlockConnectionPoint";
import type { NodeMaterial, NodeMaterialDefines } from "../../nodeMaterial";
import type { AbstractMesh } from "../../../../Meshes/abstractMesh";
import type { Nullable } from "../../../../types";
import type { BaseTexture } from "../../../Textures/baseTexture";
import type { Mesh } from "../../../../Meshes/mesh";
import type { Effect } from "../../../effect";
import type { Scene } from "../../../../scene";
import { NodeMaterialBlock } from "../../nodeMaterialBlock";
/**
 * Block used to implement the refraction part of the sub surface module of the PBR material
 */
export declare class RefractionBlock extends NodeMaterialBlock {
    /** @internal */
    _define3DName: string;
    /** @internal */
    _refractionMatrixName: string;
    /** @internal */
    _defineLODRefractionAlpha: string;
    /** @internal */
    _defineLinearSpecularRefraction: string;
    /** @internal */
    _defineOppositeZ: string;
    /** @internal */
    _cubeSamplerName: string;
    /** @internal */
    _2DSamplerName: string;
    /** @internal */
    _vRefractionMicrosurfaceInfosName: string;
    /** @internal */
    _vRefractionInfosName: string;
    /** @internal */
    _vRefractionFilteringInfoName: string;
    private _scene;
    /**
     * The properties below are set by the main PBR block prior to calling methods of this class.
     * This is to avoid having to add them as inputs here whereas they are already inputs of the main block, so already known.
     * It's less burden on the user side in the editor part.
     */
    /** @internal */
    viewConnectionPoint: NodeMaterialConnectionPoint;
    /** @internal */
    indexOfRefractionConnectionPoint: NodeMaterialConnectionPoint;
    /**
     * This parameters will make the material used its opacity to control how much it is refracting against not.
     * Materials half opaque for instance using refraction could benefit from this control.
     */
    linkRefractionWithTransparency: boolean;
    /**
     * Controls if refraction needs to be inverted on Y. This could be useful for procedural texture.
     */
    invertRefractionY: boolean;
    /**
     * Controls if refraction needs to be inverted on Y. This could be useful for procedural texture.
     */
    useThicknessAsDepth: boolean;
    /**
     * Gets or sets the texture associated with the node
     */
    texture: Nullable<BaseTexture>;
    /**
     * Create a new RefractionBlock
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
     * Gets the intensity input component
     */
    get intensity(): NodeMaterialConnectionPoint;
    /**
     * Gets the tint at distance input component
     */
    get tintAtDistance(): NodeMaterialConnectionPoint;
    /**
     * Gets the volume index of refraction input component
     */
    get volumeIndexOfRefraction(): NodeMaterialConnectionPoint;
    /**
     * Gets the view input component
     */
    get view(): NodeMaterialConnectionPoint;
    /**
     * Gets the refraction object output component
     */
    get refraction(): NodeMaterialConnectionPoint;
    /**
     * Returns true if the block has a texture
     */
    get hasTexture(): boolean;
    protected _getTexture(): Nullable<BaseTexture>;
    autoConfigure(material: NodeMaterial, additionalFilteringInfo?: (node: NodeMaterialBlock) => boolean): void;
    prepareDefines(mesh: AbstractMesh, nodeMaterial: NodeMaterial, defines: NodeMaterialDefines): void;
    isReady(): boolean;
    bind(effect: Effect, nodeMaterial: NodeMaterial, mesh?: Mesh): void;
    /**
     * Gets the main code of the block (fragment side)
     * @param state current state of the node material building
     * @returns the shader code
     */
    getCode(state: NodeMaterialBuildState): string;
    protected _buildBlock(state: NodeMaterialBuildState): this;
    protected _dumpPropertiesCode(): string;
    serialize(): any;
    _deserialize(serializationObject: any, scene: Scene, rootUrl: string): void;
}
