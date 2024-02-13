import { NodeMaterialBlock } from "../nodeMaterialBlock";
import type { NodeMaterialBuildState } from "../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../nodeMaterialBlockConnectionPoint";
import type { AbstractMesh } from "../../../Meshes/abstractMesh";
import type { NodeMaterialDefines } from "../nodeMaterial";
import { NodeMaterial } from "../nodeMaterial";
import type { Effect } from "../../effect";
import type { Nullable } from "../../../types";
import { Texture } from "../../Textures/texture";
import type { Scene } from "../../../scene";
import "../../../Shaders/ShadersInclude/helperFunctions";
import { ImageSourceBlock } from "./Dual/imageSourceBlock";
/**
 * Block used to read a texture with triplanar mapping (see "boxmap" in https://iquilezles.org/articles/biplanar/)
 */
export declare class TriPlanarBlock extends NodeMaterialBlock {
    private _linearDefineName;
    private _gammaDefineName;
    protected _tempTextureRead: string;
    private _samplerName;
    private _textureInfoName;
    private _imageSource;
    /**
     * Project the texture(s) for a better fit to a cube
     */
    projectAsCube: boolean;
    protected _texture: Nullable<Texture>;
    /**
     * Gets or sets the texture associated with the node
     */
    get texture(): Nullable<Texture>;
    set texture(texture: Nullable<Texture>);
    /**
     * Gets the textureY associated with the node
     */
    get textureY(): Nullable<Texture>;
    /**
     * Gets the textureZ associated with the node
     */
    get textureZ(): Nullable<Texture>;
    protected _getImageSourceBlock(connectionPoint: Nullable<NodeMaterialConnectionPoint>): Nullable<ImageSourceBlock>;
    /**
     * Gets the sampler name associated with this texture
     */
    get samplerName(): string;
    /**
     * Gets the samplerY name associated with this texture
     */
    get samplerYName(): Nullable<string>;
    /**
     * Gets the samplerZ name associated with this texture
     */
    get samplerZName(): Nullable<string>;
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
     * Create a new TriPlanarBlock
     * @param name defines the block name
     */
    constructor(name: string, hideSourceZ?: boolean);
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
     * Gets the normal input component
     */
    get normal(): NodeMaterialConnectionPoint;
    /**
     * Gets the sharpness input component
     */
    get sharpness(): NodeMaterialConnectionPoint;
    /**
     * Gets the source input component
     */
    get source(): NodeMaterialConnectionPoint;
    /**
     * Gets the sourceY input component
     */
    get sourceY(): NodeMaterialConnectionPoint;
    /**
     * Gets the sourceZ input component
     */
    get sourceZ(): Nullable<NodeMaterialConnectionPoint>;
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
    prepareDefines(mesh: AbstractMesh, nodeMaterial: NodeMaterial, defines: NodeMaterialDefines): void;
    isReady(): boolean;
    bind(effect: Effect): void;
    protected _generateTextureLookup(state: NodeMaterialBuildState): void;
    private _generateConversionCode;
    private _writeOutput;
    protected _buildBlock(state: NodeMaterialBuildState): this;
    protected _dumpPropertiesCode(): string;
    serialize(): any;
    _deserialize(serializationObject: any, scene: Scene, rootUrl: string): void;
}
