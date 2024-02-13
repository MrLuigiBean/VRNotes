import type { Nullable } from "../../types";
import type { InternalTexture } from "../../Materials/Textures/internalTexture";
import type { ISize } from "../../Maths/math.size";
import type { ThinEngine } from "../../Engines/thinEngine";
import type { RenderTargetWrapper } from "../../Engines/renderTargetWrapper.js";
/**
 * Base class of all the textures in babylon.
 * It groups all the common properties required to work with Thin Engine.
 */
export declare class ThinTexture {
    protected _wrapU: number;
    /**
     * | Value | Type               | Description |
     * | ----- | ------------------ | ----------- |
     * | 0     | CLAMP_ADDRESSMODE  |             |
     * | 1     | WRAP_ADDRESSMODE   |             |
     * | 2     | MIRROR_ADDRESSMODE |             |
     */
    get wrapU(): number;
    set wrapU(value: number);
    protected _wrapV: number;
    /**
     * | Value | Type               | Description |
     * | ----- | ------------------ | ----------- |
     * | 0     | CLAMP_ADDRESSMODE  |             |
     * | 1     | WRAP_ADDRESSMODE   |             |
     * | 2     | MIRROR_ADDRESSMODE |             |
     */
    get wrapV(): number;
    set wrapV(value: number);
    /**
     * | Value | Type               | Description |
     * | ----- | ------------------ | ----------- |
     * | 0     | CLAMP_ADDRESSMODE  |             |
     * | 1     | WRAP_ADDRESSMODE   |             |
     * | 2     | MIRROR_ADDRESSMODE |             |
     */
    wrapR: number;
    /**
     * With compliant hardware and browser (supporting anisotropic filtering)
     * this defines the level of anisotropic filtering in the texture.
     * The higher the better but the slower. This defaults to 4 as it seems to be the best tradeoff.
     */
    anisotropicFilteringLevel: number;
    /**
     * Define the current state of the loading sequence when in delayed load mode.
     */
    delayLoadState: number;
    /**
     * How a texture is mapped.
     * Unused in thin texture mode.
     */
    get coordinatesMode(): number;
    /**
     * Define if the texture is a cube texture or if false a 2d texture.
     */
    get isCube(): boolean;
    protected set isCube(value: boolean);
    /**
     * Define if the texture is a 3d texture (webgl 2) or if false a 2d texture.
     */
    get is3D(): boolean;
    protected set is3D(value: boolean);
    /**
     * Define if the texture is a 2d array texture (webgl 2) or if false a 2d texture.
     */
    get is2DArray(): boolean;
    protected set is2DArray(value: boolean);
    /**
     * Get the class name of the texture.
     * @returns "ThinTexture"
     */
    getClassName(): string;
    /** @internal */
    _texture: Nullable<InternalTexture>;
    protected _engine: Nullable<ThinEngine>;
    private _cachedSize;
    private _cachedBaseSize;
    private static _IsRenderTargetWrapper;
    /**
     * Instantiates a new ThinTexture.
     * Base class of all the textures in babylon.
     * This can be used as an internal texture wrapper in ThinEngine to benefit from the cache
     * @param internalTexture Define the internalTexture to wrap. You can also pass a RenderTargetWrapper, in which case the texture will be the render target's texture
     */
    constructor(internalTexture: Nullable<InternalTexture | RenderTargetWrapper>);
    /**
     * Get if the texture is ready to be used (downloaded, converted, mip mapped...).
     * @returns true if fully ready
     */
    isReady(): boolean;
    /**
     * Triggers the load sequence in delayed load mode.
     */
    delayLoad(): void;
    /**
     * Get the underlying lower level texture from Babylon.
     * @returns the internal texture
     */
    getInternalTexture(): Nullable<InternalTexture>;
    /**
     * Get the size of the texture.
     * @returns the texture size.
     */
    getSize(): ISize;
    /**
     * Get the base size of the texture.
     * It can be different from the size if the texture has been resized for POT for instance
     * @returns the base size
     */
    getBaseSize(): ISize;
    /** @internal */
    protected _initialSamplingMode: number;
    /**
     * Get the current sampling mode associated with the texture.
     */
    get samplingMode(): number;
    /**
     * Update the sampling mode of the texture.
     * Default is Trilinear mode.
     *
     * | Value | Type               | Description |
     * | ----- | ------------------ | ----------- |
     * | 1     | NEAREST_SAMPLINGMODE or NEAREST_NEAREST_MIPLINEAR  | Nearest is: mag = nearest, min = nearest, mip = linear |
     * | 2     | BILINEAR_SAMPLINGMODE or LINEAR_LINEAR_MIPNEAREST | Bilinear is: mag = linear, min = linear, mip = nearest |
     * | 3     | TRILINEAR_SAMPLINGMODE or LINEAR_LINEAR_MIPLINEAR | Trilinear is: mag = linear, min = linear, mip = linear |
     * | 4     | NEAREST_NEAREST_MIPNEAREST |             |
     * | 5    | NEAREST_LINEAR_MIPNEAREST |             |
     * | 6    | NEAREST_LINEAR_MIPLINEAR |             |
     * | 7    | NEAREST_LINEAR |             |
     * | 8    | NEAREST_NEAREST |             |
     * | 9   | LINEAR_NEAREST_MIPNEAREST |             |
     * | 10   | LINEAR_NEAREST_MIPLINEAR |             |
     * | 11   | LINEAR_LINEAR |             |
     * | 12   | LINEAR_NEAREST |             |
     *
     *    > _mag_: magnification filter (close to the viewer)
     *    > _min_: minification filter (far from the viewer)
     *    > _mip_: filter used between mip map levels
     *@param samplingMode Define the new sampling mode of the texture
     */
    updateSamplingMode(samplingMode: number): void;
    /**
     * Release and destroy the underlying lower level texture aka internalTexture.
     */
    releaseInternalTexture(): void;
    /**
     * Dispose the texture and release its associated resources.
     */
    dispose(): void;
}
