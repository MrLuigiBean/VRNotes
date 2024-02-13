import { NodeMaterialBlock } from "../../nodeMaterialBlock";
import type { NodeMaterialBuildState } from "../../nodeMaterialBuildState";
import { NodeMaterialBlockTargets } from "../../Enums/nodeMaterialBlockTargets";
import type { NodeMaterialConnectionPoint } from "../../nodeMaterialBlockConnectionPoint";
import type { AbstractMesh } from "../../../../Meshes/abstractMesh";
import type { NodeMaterialDefines } from "../../nodeMaterial";
import { NodeMaterial } from "../../nodeMaterial";
import type { Effect } from "../../../effect";
import type { Nullable } from "../../../../types";
import { Texture } from "../../../Textures/texture";
import type { Scene } from "../../../../scene";
import "../../../../Shaders/ShadersInclude/helperFunctions";
/**
 * Block used to read a texture from a sampler
 */
export declare class TextureBlock extends NodeMaterialBlock {
    private _defineName;
    private _linearDefineName;
    private _gammaDefineName;
    private _tempTextureRead;
    private _samplerName;
    private _transformedUVName;
    private _textureTransformName;
    private _textureInfoName;
    private _mainUVName;
    private _mainUVDefineName;
    private _fragmentOnly;
    private _imageSource;
    protected _texture: Nullable<Texture>;
    /**
     * Gets or sets the texture associated with the node
     */
    get texture(): Nullable<Texture>;
    set texture(texture: Nullable<Texture>);
    private static _IsPrePassTextureBlock;
    private get _isSourcePrePass();
    /**
     * Gets the sampler name associated with this texture
     */
    get samplerName(): string;
    /**
     * Gets a boolean indicating that this block is linked to an ImageSourceBlock
     */
    get hasImageSource(): boolean;
    private _convertToGammaSpace;
    /**
     * Gets or sets a boolean indicating if content needs to be converted to gamma space
     */
    set convertToGammaSpace(value: boolean);
    get convertToGammaSpace(): boolean;
    private _convertToLinearSpace;
    /**
     * Gets or sets a boolean indicating if content needs to be converted to linear space
     */
    set convertToLinearSpace(value: boolean);
    get convertToLinearSpace(): boolean;
    /**
     * Gets or sets a boolean indicating if multiplication of texture with level should be disabled
     */
    disableLevelMultiplication: boolean;
    /**
     * Create a new TextureBlock
     * @param name defines the block name
     * @param fragmentOnly
     */
    constructor(name: string, fragmentOnly?: boolean);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the uv input component
     */
    get uv(): NodeMaterialConnectionPoint;
    /**
     * Gets the source input component
     */
    get source(): NodeMaterialConnectionPoint;
    /**
     * Gets the layer input component
     */
    get layer(): NodeMaterialConnectionPoint;
    /**
     * Gets the LOD input component
     */
    get lod(): NodeMaterialConnectionPoint;
    /**
     * Gets the rgba output component
     */
    get rgba(): NodeMaterialConnectionPoint;
    /**
     * Gets the rgb output component
     */
    get rgb(): NodeMaterialConnectionPoint;
    /**
     * Gets the r output component
     */
    get r(): NodeMaterialConnectionPoint;
    /**
     * Gets the g output component
     */
    get g(): NodeMaterialConnectionPoint;
    /**
     * Gets the b output component
     */
    get b(): NodeMaterialConnectionPoint;
    /**
     * Gets the a output component
     */
    get a(): NodeMaterialConnectionPoint;
    /**
     * Gets the level output component
     */
    get level(): NodeMaterialConnectionPoint;
    get target(): NodeMaterialBlockTargets;
    set target(value: NodeMaterialBlockTargets);
    autoConfigure(material: NodeMaterial, additionalFilteringInfo?: (node: NodeMaterialBlock) => boolean): void;
    initializeDefines(mesh: AbstractMesh, nodeMaterial: NodeMaterial, defines: NodeMaterialDefines): void;
    prepareDefines(mesh: AbstractMesh, nodeMaterial: NodeMaterial, defines: NodeMaterialDefines): void;
    isReady(): boolean;
    bind(effect: Effect): void;
    private get _isMixed();
    private _injectVertexCode;
    private _getUVW;
    private get _samplerFunc();
    private get _samplerLodSuffix();
    private _generateTextureLookup;
    private _writeTextureRead;
    private _generateConversionCode;
    private _writeOutput;
    protected _buildBlock(state: NodeMaterialBuildState): this | undefined;
    protected _dumpPropertiesCode(): string;
    serialize(): any;
    _deserialize(serializationObject: any, scene: Scene, rootUrl: string): void;
}
