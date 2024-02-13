import { Observable } from "../../Misc/observable";
import type { Nullable } from "../../types";
import type { Scene } from "../../scene";
import { Matrix } from "../../Maths/math.vector";
import type { InternalTexture } from "../../Materials/Textures/internalTexture";
import type { IAnimatable } from "../../Animations/animatable.interface";
import "../../Misc/fileTools";
import type { ThinEngine } from "../../Engines/thinEngine";
import { ThinTexture } from "./thinTexture";
import type { AbstractScene } from "../../abstractScene";
import type { Animation } from "../../Animations/animation";
/**
 * Base class of all the textures in babylon.
 * It groups all the common properties the materials, post process, lights... might need
 * in order to make a correct use of the texture.
 */
export declare class BaseTexture extends ThinTexture implements IAnimatable {
    /**
     * Default anisotropic filtering level for the application.
     * It is set to 4 as a good tradeoff between perf and quality.
     */
    static DEFAULT_ANISOTROPIC_FILTERING_LEVEL: number;
    /**
     * Gets or sets the unique id of the texture
     */
    uniqueId: number;
    /**
     * Define the name of the texture.
     */
    name: string;
    /**
     * Gets or sets an object used to store user defined information.
     */
    metadata: any;
    /** @internal */
    _internalMetadata: any;
    /**
     * For internal use only. Please do not use.
     */
    reservedDataStore: any;
    private _hasAlpha;
    /**
     * Define if the texture is having a usable alpha value (can be use for transparency or glossiness for instance).
     */
    set hasAlpha(value: boolean);
    get hasAlpha(): boolean;
    private _getAlphaFromRGB;
    /**
     * Defines if the alpha value should be determined via the rgb values.
     * If true the luminance of the pixel might be used to find the corresponding alpha value.
     */
    set getAlphaFromRGB(value: boolean);
    get getAlphaFromRGB(): boolean;
    /**
     * Intensity or strength of the texture.
     * It is commonly used by materials to fine tune the intensity of the texture
     */
    level: number;
    protected _coordinatesIndex: number;
    /**
     * Gets or sets a boolean indicating that the texture should try to reduce shader code if there is no UV manipulation.
     * (ie. when texture.getTextureMatrix().isIdentityAs3x2() returns true)
     */
    optimizeUVAllocation: boolean;
    /**
     * Define the UV channel to use starting from 0 and defaulting to 0.
     * This is part of the texture as textures usually maps to one uv set.
     */
    set coordinatesIndex(value: number);
    get coordinatesIndex(): number;
    protected _coordinatesMode: number;
    /**
     * How a texture is mapped.
     *
     * | Value | Type                                | Description |
     * | ----- | ----------------------------------- | ----------- |
     * | 0     | EXPLICIT_MODE                       |             |
     * | 1     | SPHERICAL_MODE                      |             |
     * | 2     | PLANAR_MODE                         |             |
     * | 3     | CUBIC_MODE                          |             |
     * | 4     | PROJECTION_MODE                     |             |
     * | 5     | SKYBOX_MODE                         |             |
     * | 6     | INVCUBIC_MODE                       |             |
     * | 7     | EQUIRECTANGULAR_MODE                |             |
     * | 8     | FIXED_EQUIRECTANGULAR_MODE          |             |
     * | 9     | FIXED_EQUIRECTANGULAR_MIRRORED_MODE |             |
     */
    set coordinatesMode(value: number);
    get coordinatesMode(): number;
    /**
     * | Value | Type               | Description |
     * | ----- | ------------------ | ----------- |
     * | 0     | CLAMP_ADDRESSMODE  |             |
     * | 1     | WRAP_ADDRESSMODE   |             |
     * | 2     | MIRROR_ADDRESSMODE |             |
     */
    get wrapU(): number;
    set wrapU(value: number);
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
    /** @internal */
    _isCube: boolean;
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
    /** @internal */
    protected _gammaSpace: boolean;
    /**
     * Define if the texture contains data in gamma space (most of the png/jpg aside bump).
     * HDR texture are usually stored in linear space.
     * This only impacts the PBR and Background materials
     */
    get gammaSpace(): boolean;
    set gammaSpace(gamma: boolean);
    /**
     * Gets or sets whether or not the texture contains RGBD data.
     */
    get isRGBD(): boolean;
    set isRGBD(value: boolean);
    /**
     * Is Z inverted in the texture (useful in a cube texture).
     */
    invertZ: boolean;
    /**
     * Are mip maps generated for this texture or not.
     */
    get noMipmap(): boolean;
    /**
     * @internal
     */
    lodLevelInAlpha: boolean;
    /**
     * With prefiltered texture, defined the offset used during the prefiltering steps.
     */
    get lodGenerationOffset(): number;
    set lodGenerationOffset(value: number);
    /**
     * With prefiltered texture, defined the scale used during the prefiltering steps.
     */
    get lodGenerationScale(): number;
    set lodGenerationScale(value: number);
    /**
     * With prefiltered texture, defined if the specular generation is based on a linear ramp.
     * By default we are using a log2 of the linear roughness helping to keep a better resolution for
     * average roughness values.
     */
    get linearSpecularLOD(): boolean;
    set linearSpecularLOD(value: boolean);
    /**
     * In case a better definition than spherical harmonics is required for the diffuse part of the environment.
     * You can set the irradiance texture to rely on a texture instead of the spherical approach.
     * This texture need to have the same characteristics than its parent (Cube vs 2d, coordinates mode, Gamma/Linear, RGBD).
     */
    get irradianceTexture(): Nullable<BaseTexture>;
    set irradianceTexture(value: Nullable<BaseTexture>);
    /**
     * Define if the texture is a render target.
     */
    isRenderTarget: boolean;
    /**
     * Define the unique id of the texture in the scene.
     */
    get uid(): string;
    /** @internal */
    _prefiltered: boolean;
    /** @internal */
    _forceSerialize: boolean;
    /**
     * Return a string representation of the texture.
     * @returns the texture as a string
     */
    toString(): string;
    /**
     * Get the class name of the texture.
     * @returns "BaseTexture"
     */
    getClassName(): string;
    /**
     * Define the list of animation attached to the texture.
     */
    animations: Animation[];
    /**
     * An event triggered when the texture is disposed.
     */
    onDisposeObservable: Observable<BaseTexture>;
    private _onDisposeObserver;
    /**
     * Callback triggered when the texture has been disposed.
     * Kept for back compatibility, you can use the onDisposeObservable instead.
     */
    set onDispose(callback: () => void);
    protected _scene: Nullable<Scene>;
    /** @internal */
    private _uid;
    /**
     * Define if the texture is preventing a material to render or not.
     * If not and the texture is not ready, the engine will use a default black texture instead.
     */
    get isBlocking(): boolean;
    /** @internal */
    _parentContainer: Nullable<AbstractScene>;
    protected _loadingError: boolean;
    protected _errorObject?: {
        message?: string;
        exception?: any;
    };
    /**
     * Was there any loading error?
     */
    get loadingError(): boolean;
    /**
     * If a loading error occurred this object will be populated with information about the error.
     */
    get errorObject(): {
        message?: string;
        exception?: any;
    } | undefined;
    /**
     * Instantiates a new BaseTexture.
     * Base class of all the textures in babylon.
     * It groups all the common properties the materials, post process, lights... might need
     * in order to make a correct use of the texture.
     * @param sceneOrEngine Define the scene or engine the texture belongs to
     * @param internalTexture Define the internal texture associated with the texture
     */
    constructor(sceneOrEngine?: Nullable<Scene | ThinEngine>, internalTexture?: Nullable<InternalTexture>);
    /**
     * Get the scene the texture belongs to.
     * @returns the scene or null if undefined
     */
    getScene(): Nullable<Scene>;
    /** @internal */
    protected _getEngine(): Nullable<ThinEngine>;
    /**
     * Checks if the texture has the same transform matrix than another texture
     * @param texture texture to check against
     * @returns true if the transforms are the same, else false
     */
    checkTransformsAreIdentical(texture: Nullable<BaseTexture>): boolean;
    /**
     * Get the texture transform matrix used to offset tile the texture for instance.
     * @returns the transformation matrix
     */
    getTextureMatrix(): Matrix;
    /**
     * Get the texture reflection matrix used to rotate/transform the reflection.
     * @returns the reflection matrix
     */
    getReflectionTextureMatrix(): Matrix;
    /**
     * Gets a suitable rotate/transform matrix when the texture is used for refraction.
     * There's a separate function from getReflectionTextureMatrix because refraction requires a special configuration of the matrix in right-handed mode.
     * @returns The refraction matrix
     */
    getRefractionTextureMatrix(): Matrix;
    /**
     * Get if the texture is ready to be consumed (either it is ready or it is not blocking)
     * @returns true if ready, not blocking or if there was an error loading the texture
     */
    isReadyOrNotBlocking(): boolean;
    /**
     * Scales the texture if is `canRescale()`
     * @param ratio the resize factor we want to use to rescale
     */
    scale(ratio: number): void;
    /**
     * Get if the texture can rescale.
     */
    get canRescale(): boolean;
    /**
     * @internal
     */
    _getFromCache(url: Nullable<string>, noMipmap: boolean, sampling?: number, invertY?: boolean, useSRGBBuffer?: boolean, isCube?: boolean): Nullable<InternalTexture>;
    /** @internal */
    _rebuild(_fromContextLost?: boolean): void;
    /**
     * Clones the texture.
     * @returns the cloned texture
     */
    clone(): Nullable<BaseTexture>;
    /**
     * Get the texture underlying type (INT, FLOAT...)
     */
    get textureType(): number;
    /**
     * Get the texture underlying format (RGB, RGBA...)
     */
    get textureFormat(): number;
    /**
     * Indicates that textures need to be re-calculated for all materials
     */
    protected _markAllSubMeshesAsTexturesDirty(): void;
    /**
     * Reads the pixels stored in the webgl texture and returns them as an ArrayBuffer.
     * This will returns an RGBA array buffer containing either in values (0-255) or
     * float values (0-1) depending of the underlying buffer type.
     * @param faceIndex defines the face of the texture to read (in case of cube texture)
     * @param level defines the LOD level of the texture to read (in case of Mip Maps)
     * @param buffer defines a user defined buffer to fill with data (can be null)
     * @param flushRenderer true to flush the renderer from the pending commands before reading the pixels
     * @param noDataConversion false to convert the data to Uint8Array (if texture type is UNSIGNED_BYTE) or to Float32Array (if texture type is anything but UNSIGNED_BYTE). If true, the type of the generated buffer (if buffer==null) will depend on the type of the texture
     * @param x defines the region x coordinates to start reading from (default to 0)
     * @param y defines the region y coordinates to start reading from (default to 0)
     * @param width defines the region width to read from (default to the texture size at level)
     * @param height defines the region width to read from (default to the texture size at level)
     * @returns The Array buffer promise containing the pixels data.
     */
    readPixels(faceIndex?: number, level?: number, buffer?: Nullable<ArrayBufferView>, flushRenderer?: boolean, noDataConversion?: boolean, x?: number, y?: number, width?: number, height?: number): Nullable<Promise<ArrayBufferView>>;
    /**
     * @internal
     */
    _readPixelsSync(faceIndex?: number, level?: number, buffer?: Nullable<ArrayBufferView>, flushRenderer?: boolean, noDataConversion?: boolean): Nullable<ArrayBufferView>;
    /** @internal */
    get _lodTextureHigh(): Nullable<BaseTexture>;
    /** @internal */
    get _lodTextureMid(): Nullable<BaseTexture>;
    /** @internal */
    get _lodTextureLow(): Nullable<BaseTexture>;
    /**
     * Dispose the texture and release its associated resources.
     */
    dispose(): void;
    /**
     * Serialize the texture into a JSON representation that can be parsed later on.
     * @param allowEmptyName True to force serialization even if name is empty. Default: false
     * @returns the JSON representation of the texture
     */
    serialize(allowEmptyName?: boolean): any;
    /**
     * Helper function to be called back once a list of texture contains only ready textures.
     * @param textures Define the list of textures to wait for
     * @param callback Define the callback triggered once the entire list will be ready
     */
    static WhenAllReady(textures: BaseTexture[], callback: () => void): void;
    private static _IsScene;
}
