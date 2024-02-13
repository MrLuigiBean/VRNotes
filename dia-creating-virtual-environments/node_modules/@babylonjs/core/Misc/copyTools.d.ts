import type { ISize } from "../Maths/math.size";
import type { Nullable } from "../types";
import type { BaseTexture } from "../Materials/Textures/baseTexture";
/**
 * Transform some pixel data to a base64 string
 * @param pixels defines the pixel data to transform to base64
 * @param size defines the width and height of the (texture) data
 * @param invertY true if the data must be inverted for the Y coordinate during the conversion
 * @returns The base64 encoded string or null
 */
export declare function GenerateBase64StringFromPixelData(pixels: ArrayBufferView, size: ISize, invertY?: boolean): Nullable<string>;
/**
 * Reads the pixels stored in the webgl texture and returns them as a base64 string
 * @param texture defines the texture to read pixels from
 * @param faceIndex defines the face of the texture to read (in case of cube texture)
 * @param level defines the LOD level of the texture to read (in case of Mip Maps)
 * @returns The base64 encoded string or null
 */
export declare function GenerateBase64StringFromTexture(texture: BaseTexture, faceIndex?: number, level?: number): Nullable<string>;
/**
 * Reads the pixels stored in the webgl texture and returns them as a base64 string
 * @param texture defines the texture to read pixels from
 * @param faceIndex defines the face of the texture to read (in case of cube texture)
 * @param level defines the LOD level of the texture to read (in case of Mip Maps)
 * @returns The base64 encoded string or null wrapped in a promise
 */
export declare function GenerateBase64StringFromTextureAsync(texture: BaseTexture, faceIndex?: number, level?: number): Promise<Nullable<string>>;
/**
 * Class used to host copy specific utilities
 * (Back-compat)
 */
export declare const CopyTools: {
    /**
     * Transform some pixel data to a base64 string
     * @param pixels defines the pixel data to transform to base64
     * @param size defines the width and height of the (texture) data
     * @param invertY true if the data must be inverted for the Y coordinate during the conversion
     * @returns The base64 encoded string or null
     */
    GenerateBase64StringFromPixelData: typeof GenerateBase64StringFromPixelData;
    /**
     * Reads the pixels stored in the webgl texture and returns them as a base64 string
     * @param texture defines the texture to read pixels from
     * @param faceIndex defines the face of the texture to read (in case of cube texture)
     * @param level defines the LOD level of the texture to read (in case of Mip Maps)
     * @returns The base64 encoded string or null
     */
    GenerateBase64StringFromTexture: typeof GenerateBase64StringFromTexture;
    /**
     * Reads the pixels stored in the webgl texture and returns them as a base64 string
     * @param texture defines the texture to read pixels from
     * @param faceIndex defines the face of the texture to read (in case of cube texture)
     * @param level defines the LOD level of the texture to read (in case of Mip Maps)
     * @returns The base64 encoded string or null wrapped in a promise
     */
    GenerateBase64StringFromTextureAsync: typeof GenerateBase64StringFromTextureAsync;
};
