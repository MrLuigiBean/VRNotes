import type { Scene } from "../../scene";
import { Texture } from "./texture";
import "../../Engines/Extensions/engine.rawTexture";
import type { Nullable } from "../../types";
/**
 * Class used to store 3D textures containing user data
 */
export declare class RawTexture3D extends Texture {
    /** Gets or sets the texture format to use */
    format: number;
    /**
     * Create a new RawTexture3D
     * @param data defines the data of the texture
     * @param width defines the width of the texture
     * @param height defines the height of the texture
     * @param depth defines the depth of the texture
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
}
