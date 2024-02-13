import { InternalTexture } from "./internalTexture";
/**
 * Class used to store an external texture (like GPUExternalTexture in WebGPU)
 */
export declare class ExternalTexture {
    /**
     * Checks if a texture is an external or internal texture
     * @param texture the external or internal texture
     * @returns true if the texture is an external texture, else false
     */
    static IsExternalTexture(texture: ExternalTexture | InternalTexture): texture is ExternalTexture;
    private _video;
    /**
     * Get the class name of the texture.
     * @returns "ExternalTexture"
     */
    getClassName(): string;
    /**
     * Gets the underlying texture object
     */
    get underlyingResource(): any;
    /**
     * Gets a boolean indicating if the texture uses mipmaps
     */
    useMipMaps: boolean;
    /**
     * The type of the underlying texture is implementation dependent, so return "UNDEFINED" for the type
     */
    readonly type = 16;
    /**
     * The format of the underlying texture is implementation dependent, so return "UNDEFINED" for the format
     */
    readonly format = 4294967295;
    /**
     * Gets the unique id of this texture
     */
    readonly uniqueId: number;
    /**
     * Constructs the texture
     * @param video The video the texture should be wrapped around
     */
    constructor(video: HTMLVideoElement);
    /**
     * Get if the texture is ready to be used (downloaded, converted, mip mapped...).
     * @returns true if fully ready
     */
    isReady(): boolean;
    /**
     * Dispose the texture and release its associated resources.
     */
    dispose(): void;
}
