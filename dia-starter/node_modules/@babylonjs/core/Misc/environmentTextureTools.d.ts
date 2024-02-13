import type { Nullable } from "../types";
import { SphericalPolynomial } from "../Maths/sphericalPolynomial";
import { InternalTexture } from "../Materials/Textures/internalTexture";
import { BaseTexture } from "../Materials/Textures/baseTexture";
import "../Engines/Extensions/engine.renderTargetCube";
import "../Engines/Extensions/engine.readTexture";
import "../Materials/Textures/baseTexture.polynomial";
import "../Shaders/rgbdEncode.fragment";
import "../Shaders/rgbdDecode.fragment";
/**
 * Raw texture data and descriptor sufficient for WebGL texture upload
 */
export type EnvironmentTextureInfo = EnvironmentTextureInfoV1 | EnvironmentTextureInfoV2;
/**
 * v1 of EnvironmentTextureInfo
 */
interface EnvironmentTextureInfoV1 {
    /**
     * Version of the environment map
     */
    version: 1;
    /**
     * Width of image
     */
    width: number;
    /**
     * Irradiance information stored in the file.
     */
    irradiance: any;
    /**
     * Specular information stored in the file.
     */
    specular: any;
}
/**
 * v2 of EnvironmentTextureInfo
 */
interface EnvironmentTextureInfoV2 {
    /**
     * Version of the environment map
     */
    version: 2;
    /**
     * Width of image
     */
    width: number;
    /**
     * Irradiance information stored in the file.
     */
    irradiance: any;
    /**
     * Specular information stored in the file.
     */
    specular: any;
    /**
     * The mime type used to encode the image data.
     */
    imageType: string;
}
/**
 * Defines One Image in the file. It requires only the position in the file
 * as well as the length.
 */
interface BufferImageData {
    /**
     * Length of the image data.
     */
    length: number;
    /**
     * Position of the data from the null terminator delimiting the end of the JSON.
     */
    position: number;
}
/**
 * Defines the specular data enclosed in the file.
 * This corresponds to the version 1 of the data.
 */
export interface EnvironmentTextureSpecularInfoV1 {
    /**
     * Defines where the specular Payload is located. It is a runtime value only not stored in the file.
     */
    specularDataPosition?: number;
    /**
     * This contains all the images data needed to reconstruct the cubemap.
     */
    mipmaps: Array<BufferImageData>;
    /**
     * Defines the scale applied to environment texture. This manages the range of LOD level used for IBL according to the roughness.
     */
    lodGenerationScale: number;
}
/**
 * Options for creating environment textures
 */
export interface CreateEnvTextureOptions {
    /**
     * The mime type of encoded images.
     */
    imageType?: string;
    /**
     * the image quality of encoded WebP images.
     */
    imageQuality?: number;
}
/**
 * Gets the environment info from an env file.
 * @param data The array buffer containing the .env bytes.
 * @returns the environment file info (the json header) if successfully parsed, normalized to the latest supported version.
 */
export declare function GetEnvInfo(data: ArrayBufferView): Nullable<EnvironmentTextureInfoV2>;
/**
 * Normalizes any supported version of the environment file info to the latest version
 * @param info environment file info on any supported version
 * @returns environment file info in the latest supported version
 * @private
 */
export declare function normalizeEnvInfo(info: EnvironmentTextureInfo): EnvironmentTextureInfoV2;
/**
 * Creates an environment texture from a loaded cube texture.
 * @param texture defines the cube texture to convert in env file
 * @param options options for the conversion process
 * @param options.imageType the mime type for the encoded images, with support for "image/png" (default) and "image/webp"
 * @param options.imageQuality the image quality of encoded WebP images.
 * @returns a promise containing the environment data if successful.
 */
export declare function CreateEnvTextureAsync(texture: BaseTexture, options?: CreateEnvTextureOptions): Promise<ArrayBuffer>;
/**
 * Creates the ArrayBufferViews used for initializing environment texture image data.
 * @param data the image data
 * @param info parameters that determine what views will be created for accessing the underlying buffer
 * @returns the views described by info providing access to the underlying buffer
 */
export declare function CreateImageDataArrayBufferViews(data: ArrayBufferView, info: EnvironmentTextureInfo): Array<Array<ArrayBufferView>>;
/**
 * Uploads the texture info contained in the env file to the GPU.
 * @param texture defines the internal texture to upload to
 * @param data defines the data to load
 * @param info defines the texture info retrieved through the GetEnvInfo method
 * @returns a promise
 */
export declare function UploadEnvLevelsAsync(texture: InternalTexture, data: ArrayBufferView, info: EnvironmentTextureInfo): Promise<void>;
/**
 * Uploads the levels of image data to the GPU.
 * @param texture defines the internal texture to upload to
 * @param imageData defines the array buffer views of image data [mipmap][face]
 * @param imageType the mime type of the image data
 * @returns a promise
 */
export declare function UploadLevelsAsync(texture: InternalTexture, imageData: ArrayBufferView[][], imageType?: string): Promise<void>;
/**
 * Uploads spherical polynomials information to the texture.
 * @param texture defines the texture we are trying to upload the information to
 * @param info defines the environment texture info retrieved through the GetEnvInfo method
 */
export declare function UploadEnvSpherical(texture: InternalTexture, info: EnvironmentTextureInfo): void;
/**
 * @internal
 */
export declare function _UpdateRGBDAsync(internalTexture: InternalTexture, data: ArrayBufferView[][], sphericalPolynomial: Nullable<SphericalPolynomial>, lodScale: number, lodOffset: number): Promise<InternalTexture>;
/**
 * Sets of helpers addressing the serialization and deserialization of environment texture
 * stored in a BabylonJS env file.
 * Those files are usually stored as .env files.
 */
export declare const EnvironmentTextureTools: {
    /**
     * Gets the environment info from an env file.
     * @param data The array buffer containing the .env bytes.
     * @returns the environment file info (the json header) if successfully parsed, normalized to the latest supported version.
     */
    GetEnvInfo: typeof GetEnvInfo;
    /**
     * Creates an environment texture from a loaded cube texture.
     * @param texture defines the cube texture to convert in env file
     * @param options options for the conversion process
     * @param options.imageType the mime type for the encoded images, with support for "image/png" (default) and "image/webp"
     * @param options.imageQuality the image quality of encoded WebP images.
     * @returns a promise containing the environment data if successful.
     */
    CreateEnvTextureAsync: typeof CreateEnvTextureAsync;
    /**
     * Creates the ArrayBufferViews used for initializing environment texture image data.
     * @param data the image data
     * @param info parameters that determine what views will be created for accessing the underlying buffer
     * @returns the views described by info providing access to the underlying buffer
     */
    CreateImageDataArrayBufferViews: typeof CreateImageDataArrayBufferViews;
    /**
     * Uploads the texture info contained in the env file to the GPU.
     * @param texture defines the internal texture to upload to
     * @param data defines the data to load
     * @param info defines the texture info retrieved through the GetEnvInfo method
     * @returns a promise
     */
    UploadEnvLevelsAsync: typeof UploadEnvLevelsAsync;
    /**
     * Uploads the levels of image data to the GPU.
     * @param texture defines the internal texture to upload to
     * @param imageData defines the array buffer views of image data [mipmap][face]
     * @param imageType the mime type of the image data
     * @returns a promise
     */
    UploadLevelsAsync: typeof UploadLevelsAsync;
    /**
     * Uploads spherical polynomials information to the texture.
     * @param texture defines the texture we are trying to upload the information to
     * @param info defines the environment texture info retrieved through the GetEnvInfo method
     */
    UploadEnvSpherical: typeof UploadEnvSpherical;
};
export {};
