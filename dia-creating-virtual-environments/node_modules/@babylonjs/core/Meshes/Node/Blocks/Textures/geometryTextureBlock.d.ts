import type { Nullable } from "../../../../types.js";
import { NodeGeometryBlock } from "../../nodeGeometryBlock";
import type { NodeGeometryConnectionPoint } from "../../nodeGeometryBlockConnectionPoint";
import type { Texture } from "../../../../Materials/Textures/texture.js";
/**
 * Block used to load texture data
 */
export declare class GeometryTextureBlock extends NodeGeometryBlock {
    private _data;
    private _width;
    private _height;
    /**
     * Gets or sets a boolean indicating that this block should serialize its cached data
     */
    serializedCachedData: boolean;
    /**
     * Gets the texture data
     */
    get textureData(): Nullable<Float32Array>;
    /**
     * Gets the texture width
     */
    get textureWidth(): number;
    /**
     * Gets the texture height
     */
    get textureHeight(): number;
    /**
     * Creates a new GeometryTextureBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the texture component
     */
    get texture(): NodeGeometryConnectionPoint;
    private _prepareImgToLoadAsync;
    /**
     * Remove stored data
     */
    cleanData(): void;
    /**
     * Load the texture data
     * @param imageFile defines the file to load data from
     * @returns a promise fulfilled when image data is loaded
     */
    loadTextureFromFileAsync(imageFile: File): Promise<void>;
    /**
     * Load the texture data
     * @param url defines the url to load data from
     * @returns a promise fulfilled when image data is loaded
     */
    loadTextureFromUrlAsync(url: string): Promise<void>;
    /**
     * Load the texture data
     * @param texture defines the source texture
     * @returns a promise fulfilled when image data is loaded
     */
    extractFromTextureAsync(texture: Texture): Promise<void>;
    protected _buildBlock(): void;
    /**
     * Serializes this block in a JSON representation
     * @returns the serialized block object
     */
    serialize(): any;
    _deserialize(serializationObject: any): void;
}
