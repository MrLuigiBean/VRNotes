import { Texture } from "./texture";
import "../../Engines/Extensions/engine.rawTexture";
import type { Nullable } from "../../types";
import type { Scene } from "../../scene";
/**
 * Class used to store 2D array textures containing user data
 */
export declare class RawTexture2DArray extends Texture {
    /** Gets or sets the texture format to use */
    format: number;
    private _depth;
    /**
     * Gets the number of layers of the texture
     */
    get depth(): number;
    /**
     * Create a new RawTexture2DArray
     * @param data defines the data of the texture
     * @param width defines the width of the texture
     * @param height defines the height of the texture
     * @param depth defines the number of layers of the texture
     * @param format defines the texture format to use
     * @param scene defines the hosting scene
     * @param generateMipMaps defines a boolean indicating if mip levels should be generated (true by default)
     * @param invertY defines if texture must be stored with Y axis inverted
     * @param samplingMode defines the sampling mode to use (Texture.TRILINEAR_SAMPLINGMODE by default)
     * @param textureType defines the texture Type (Engine.TEXTURETYPE_UNSIGNED_INT, Engine.TEXTURETYPE_FLOAT...)
     * @param creationFlags specific flags to use when creating the texture (Constants.TEXTURE_CREATIONFLAG_STORAGE for storage textures, for eg)
     */
    constructor(data: Nullable<ArrayBufferView>, width: number, height: number, depth: number, 
    /** Gets or sets the texture format to use */
    format: number, scene: Scene, generateMipMaps?: boolean, invertY?: boolean, samplingMode?: number, textureType?: number, creationFlags?: number);
    /**
     * Update the texture with new data
     * @param data defines the data to store in the texture
     */
    update(data: ArrayBufferView): void;
    /**
     * Creates a RGBA texture from some data.
     * @param data Define the texture data
     * @param width Define the width of the texture
     * @param height Define the height of the texture
     * @param depth defines the number of layers of the texture
     * @param scene defines the scene the texture will belong to
     * @param generateMipMaps Define whether or not to create mip maps for the texture
     * @param invertY define if the data should be flipped on Y when uploaded to the GPU
     * @param samplingMode define the texture sampling mode (Texture.xxx_SAMPLINGMODE)
     * @param type define the format of the data (int, float... Engine.TEXTURETYPE_xxx)
     * @returns the RGBA texture
     */
    static CreateRGBATexture(data: ArrayBufferView, width: number, height: number, depth: number, scene: Scene, generateMipMaps?: boolean, invertY?: boolean, samplingMode?: number, type?: number): RawTexture2DArray;
}
