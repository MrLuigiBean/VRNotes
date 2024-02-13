import { Observable } from "../../Misc/observable";
import type { Nullable } from "../../types";
import { Matrix } from "../../Maths/math.vector";
import { BaseTexture } from "../../Materials/Textures/baseTexture";
import type { IInspectable } from "../../Misc/iInspectable";
import type { ThinEngine } from "../../Engines/thinEngine";
import type { InternalTexture } from "./internalTexture";
import type { CubeTexture } from "../../Materials/Textures/cubeTexture";
import type { MirrorTexture } from "../../Materials/Textures/mirrorTexture";
import type { RenderTargetTexture } from "../../Materials/Textures/renderTargetTexture";
import type { Scene } from "../../scene";
import type { VideoTexture, VideoTextureSettings } from "./videoTexture";
/**
 * Defines the available options when creating a texture
 */
export interface ITextureCreationOptions {
    /** Defines if the texture will require mip maps or not (default: false) */
    noMipmap?: boolean;
    /** Defines if the texture needs to be inverted on the y axis during loading (default: true) */
    invertY?: boolean;
    /** Defines the sampling mode we want for the texture while fetching from it (Texture.NEAREST_SAMPLINGMODE...) (default: Texture.TRILINEAR_SAMPLINGMODE) */
    samplingMode?: number;
    /** Defines a callback triggered when the texture has been loaded (default: null) */
    onLoad?: Nullable<() => void>;
    /** Defines a callback triggered when an error occurred during the loading session (default: null) */
    onError?: Nullable<(message?: string, exception?: any) => void>;
    /** Defines the buffer to load the texture from in case the texture is loaded from a buffer representation (default: null) */
    buffer?: Nullable<string | ArrayBuffer | ArrayBufferView | HTMLImageElement | Blob | ImageBitmap>;
    /** Defines if the buffer we are loading the texture from should be deleted after load (default: false) */
    deleteBuffer?: boolean;
    /** Defines the format of the texture we are trying to load (Engine.TEXTUREFORMAT_RGBA...) (default: ) */
    format?: number;
    /** Defines an optional mime type information (default: undefined) */
    mimeType?: string;
    /** Options to be passed to the loader (default: undefined) */
    loaderOptions?: any;
    /** Specific flags to use when creating the texture (Constants.TEXTURE_CREATIONFLAG_STORAGE for storage textures, for eg) (default: undefined) */
    creationFlags?: number;
    /** Defines if the texture must be loaded in a sRGB GPU buffer (if supported by the GPU) (default: false) */
    useSRGBBuffer?: boolean;
    /** Defines the underlying texture from an already existing one */
    internalTexture?: InternalTexture;
    /** Defines the underlying texture texture space */
    gammaSpace?: boolean;
}
/**
 * This represents a texture in babylon. It can be easily loaded from a network, base64 or html input.
 * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/using/materials_introduction#texture
 */
export declare class Texture extends BaseTexture {
    /**
     * Gets or sets a general boolean used to indicate that textures containing direct data (buffers) must be saved as part of the serialization process
     */
    static SerializeBuffers: boolean;
    /**
     * Gets or sets a general boolean used to indicate that texture buffers must be saved as part of the serialization process.
     * If no buffer exists, one will be created as base64 string from the internal webgl data.
     */
    static ForceSerializeBuffers: boolean;
    /**
     * This observable will notify when any texture had a loading error
     */
    static OnTextureLoadErrorObservable: Observable<BaseTexture>;
    /** @internal */
    static _SerializeInternalTextureUniqueId: boolean;
    /**
     * @internal
     */
    static _CubeTextureParser: (jsonTexture: any, scene: Scene, rootUrl: string) => CubeTexture;
    /**
     * @internal
     */
    static _CreateMirror: (name: string, renderTargetSize: number, scene: Scene, generateMipMaps: boolean) => MirrorTexture;
    /**
     * @internal
     */
    static _CreateRenderTargetTexture: (name: string, renderTargetSize: number, scene: Scene, generateMipMaps: boolean, creationFlags?: number) => RenderTargetTexture;
    /**
     * @internal
     */
    static _CreateVideoTexture(name: Nullable<string>, src: string | string[] | HTMLVideoElement, scene: Nullable<Scene>, generateMipMaps?: boolean, invertY?: boolean, samplingMode?: number, settings?: Partial<VideoTextureSettings>, onError?: Nullable<(message?: string, exception?: any) => void>, format?: number): VideoTexture;
    /** nearest is mag = nearest and min = nearest and no mip */
    static readonly NEAREST_SAMPLINGMODE = 1;
    /** nearest is mag = nearest and min = nearest and mip = linear */
    static readonly NEAREST_NEAREST_MIPLINEAR = 8;
    /** Bilinear is mag = linear and min = linear and no mip */
    static readonly BILINEAR_SAMPLINGMODE = 2;
    /** Bilinear is mag = linear and min = linear and mip = nearest */
    static readonly LINEAR_LINEAR_MIPNEAREST = 11;
    /** Trilinear is mag = linear and min = linear and mip = linear */
    static readonly TRILINEAR_SAMPLINGMODE = 3;
    /** Trilinear is mag = linear and min = linear and mip = linear */
    static readonly LINEAR_LINEAR_MIPLINEAR = 3;
    /** mag = nearest and min = nearest and mip = nearest */
    static readonly NEAREST_NEAREST_MIPNEAREST = 4;
    /** mag = nearest and min = linear and mip = nearest */
    static readonly NEAREST_LINEAR_MIPNEAREST = 5;
    /** mag = nearest and min = linear and mip = linear */
    static readonly NEAREST_LINEAR_MIPLINEAR = 6;
    /** mag = nearest and min = linear and mip = none */
    static readonly NEAREST_LINEAR = 7;
    /** mag = nearest and min = nearest and mip = none */
    static readonly NEAREST_NEAREST = 1;
    /** mag = linear and min = nearest and mip = nearest */
    static readonly LINEAR_NEAREST_MIPNEAREST = 9;
    /** mag = linear and min = nearest and mip = linear */
    static readonly LINEAR_NEAREST_MIPLINEAR = 10;
    /** mag = linear and min = linear and mip = none */
    static readonly LINEAR_LINEAR = 2;
    /** mag = linear and min = nearest and mip = none */
    static readonly LINEAR_NEAREST = 12;
    /** Explicit coordinates mode */
    static readonly EXPLICIT_MODE = 0;
    /** Spherical coordinates mode */
    static readonly SPHERICAL_MODE = 1;
    /** Planar coordinates mode */
    static readonly PLANAR_MODE = 2;
    /** Cubic coordinates mode */
    static readonly CUBIC_MODE = 3;
    /** Projection coordinates mode */
    static readonly PROJECTION_MODE = 4;
    /** Inverse Cubic coordinates mode */
    static readonly SKYBOX_MODE = 5;
    /** Inverse Cubic coordinates mode */
    static readonly INVCUBIC_MODE = 6;
    /** Equirectangular coordinates mode */
    static readonly EQUIRECTANGULAR_MODE = 7;
    /** Equirectangular Fixed coordinates mode */
    static readonly FIXED_EQUIRECTANGULAR_MODE = 8;
    /** Equirectangular Fixed Mirrored coordinates mode */
    static readonly FIXED_EQUIRECTANGULAR_MIRRORED_MODE = 9;
    /** Texture is not repeating outside of 0..1 UVs */
    static readonly CLAMP_ADDRESSMODE = 0;
    /** Texture is repeating outside of 0..1 UVs */
    static readonly WRAP_ADDRESSMODE = 1;
    /** Texture is repeating and mirrored */
    static readonly MIRROR_ADDRESSMODE = 2;
    /**
     * Gets or sets a boolean which defines if the texture url must be build from the serialized URL instead of just using the name and loading them side by side with the scene file
     */
    static UseSerializedUrlIfAny: boolean;
    /**
     * Define the url of the texture.
     */
    url: Nullable<string>;
    /**
     * Define an offset on the texture to offset the u coordinates of the UVs
     * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/using/moreMaterials#offsetting
     */
    uOffset: number;
    /**
     * Define an offset on the texture to offset the v coordinates of the UVs
     * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/using/moreMaterials#offsetting
     */
    vOffset: number;
    /**
     * Define an offset on the texture to scale the u coordinates of the UVs
     * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/using/moreMaterials#tiling
     */
    uScale: number;
    /**
     * Define an offset on the texture to scale the v coordinates of the UVs
     * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/using/moreMaterials#tiling
     */
    vScale: number;
    /**
     * Define an offset on the texture to rotate around the u coordinates of the UVs
     * The angle is defined in radians.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/using/moreMaterials
     */
    uAng: number;
    /**
     * Define an offset on the texture to rotate around the v coordinates of the UVs
     * The angle is defined in radians.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/using/moreMaterials
     */
    vAng: number;
    /**
     * Define an offset on the texture to rotate around the w coordinates of the UVs (in case of 3d texture)
     * The angle is defined in radians.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/using/moreMaterials
     */
    wAng: number;
    /**
     * Defines the center of rotation (U)
     */
    uRotationCenter: number;
    /**
     * Defines the center of rotation (V)
     */
    vRotationCenter: number;
    /**
     * Defines the center of rotation (W)
     */
    wRotationCenter: number;
    /**
     * Sets this property to true to avoid deformations when rotating the texture with non-uniform scaling
     */
    homogeneousRotationInUVTransform: boolean;
    /**
     * Are mip maps generated for this texture or not.
     */
    get noMipmap(): boolean;
    /**
     * List of inspectable custom properties (used by the Inspector)
     * @see https://doc.babylonjs.com/toolsAndResources/inspector#extensibility
     */
    inspectableCustomProperties: Nullable<IInspectable[]>;
    /** @internal */
    _noMipmap: boolean;
    /** @internal */
    _invertY: boolean;
    private _rowGenerationMatrix;
    private _cachedTextureMatrix;
    private _projectionModeMatrix;
    private _t0;
    private _t1;
    private _t2;
    private _cachedUOffset;
    private _cachedVOffset;
    private _cachedUScale;
    private _cachedVScale;
    private _cachedUAng;
    private _cachedVAng;
    private _cachedWAng;
    private _cachedReflectionProjectionMatrixId;
    private _cachedURotationCenter;
    private _cachedVRotationCenter;
    private _cachedWRotationCenter;
    private _cachedHomogeneousRotationInUVTransform;
    private _cachedReflectionTextureMatrix;
    private _cachedReflectionUOffset;
    private _cachedReflectionVOffset;
    private _cachedReflectionUScale;
    private _cachedReflectionVScale;
    private _cachedReflectionCoordinatesMode;
    /** @internal */
    _buffer: Nullable<string | ArrayBuffer | ArrayBufferView | HTMLImageElement | Blob | ImageBitmap>;
    private _deleteBuffer;
    protected _format: Nullable<number>;
    private _delayedOnLoad;
    private _delayedOnError;
    private _mimeType?;
    private _loaderOptions?;
    private _creationFlags?;
    /** @internal */
    _useSRGBBuffer?: boolean;
    private _forcedExtension?;
    /** Returns the texture mime type if it was defined by a loader (undefined else) */
    get mimeType(): string | undefined;
    /**
     * Observable triggered once the texture has been loaded.
     */
    onLoadObservable: Observable<Texture>;
    protected _isBlocking: boolean;
    /**
     * Is the texture preventing material to render while loading.
     * If false, a default texture will be used instead of the loading one during the preparation step.
     */
    set isBlocking(value: boolean);
    get isBlocking(): boolean;
    /**
     * Gets a boolean indicating if the texture needs to be inverted on the y axis during loading
     */
    get invertY(): boolean;
    /**
     * Instantiates a new texture.
     * This represents a texture in babylon. It can be easily loaded from a network, base64 or html input.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/using/materials_introduction#texture
     * @param url defines the url of the picture to load as a texture
     * @param sceneOrEngine defines the scene or engine the texture will belong to
     * @param noMipmapOrOptions defines if the texture will require mip maps or not or set of all options to create the texture
     * @param invertY defines if the texture needs to be inverted on the y axis during loading
     * @param samplingMode defines the sampling mode we want for the texture while fetching from it (Texture.NEAREST_SAMPLINGMODE...)
     * @param onLoad defines a callback triggered when the texture has been loaded
     * @param onError defines a callback triggered when an error occurred during the loading session
     * @param buffer defines the buffer to load the texture from in case the texture is loaded from a buffer representation
     * @param deleteBuffer defines if the buffer we are loading the texture from should be deleted after load
     * @param format defines the format of the texture we are trying to load (Engine.TEXTUREFORMAT_RGBA...)
     * @param mimeType defines an optional mime type information
     * @param loaderOptions options to be passed to the loader
     * @param creationFlags specific flags to use when creating the texture (Constants.TEXTURE_CREATIONFLAG_STORAGE for storage textures, for eg)
     * @param forcedExtension defines the extension to use to pick the right loader
     */
    constructor(url: Nullable<string>, sceneOrEngine?: Nullable<Scene | ThinEngine>, noMipmapOrOptions?: boolean | ITextureCreationOptions, invertY?: boolean, samplingMode?: number, onLoad?: Nullable<() => void>, onError?: Nullable<(message?: string, exception?: any) => void>, buffer?: Nullable<string | ArrayBuffer | ArrayBufferView | HTMLImageElement | Blob | ImageBitmap>, deleteBuffer?: boolean, format?: number, mimeType?: string, loaderOptions?: any, creationFlags?: number, forcedExtension?: string);
    /**
     * Update the url (and optional buffer) of this texture if url was null during construction.
     * @param url the url of the texture
     * @param buffer the buffer of the texture (defaults to null)
     * @param onLoad callback called when the texture is loaded  (defaults to null)
     * @param forcedExtension defines the extension to use to pick the right loader
     */
    updateURL(url: string, buffer?: Nullable<string | ArrayBuffer | ArrayBufferView | HTMLImageElement | Blob | ImageBitmap>, onLoad?: () => void, forcedExtension?: string): void;
    /**
     * Finish the loading sequence of a texture flagged as delayed load.
     * @internal
     */
    delayLoad(): void;
    private _prepareRowForTextureGeneration;
    /**
     * Checks if the texture has the same transform matrix than another texture
     * @param texture texture to check against
     * @returns true if the transforms are the same, else false
     */
    checkTransformsAreIdentical(texture: Nullable<Texture>): boolean;
    /**
     * Get the current texture matrix which includes the requested offsetting, tiling and rotation components.
     * @param uBase The horizontal base offset multiplier (1 by default)
     * @returns the transform matrix of the texture.
     */
    getTextureMatrix(uBase?: number): Matrix;
    /**
     * Get the current matrix used to apply reflection. This is useful to rotate an environment texture for instance.
     * @returns The reflection texture transform
     */
    getReflectionTextureMatrix(): Matrix;
    /**
     * Clones the texture.
     * @returns the cloned texture
     */
    clone(): Texture;
    /**
     * Serialize the texture to a JSON representation we can easily use in the respective Parse function.
     * @returns The JSON representation of the texture
     */
    serialize(): any;
    /**
     * Get the current class name of the texture useful for serialization or dynamic coding.
     * @returns "Texture"
     */
    getClassName(): string;
    /**
     * Dispose the texture and release its associated resources.
     */
    dispose(): void;
    /**
     * Parse the JSON representation of a texture in order to recreate the texture in the given scene.
     * @param parsedTexture Define the JSON representation of the texture
     * @param scene Define the scene the parsed texture should be instantiated in
     * @param rootUrl Define the root url of the parsing sequence in the case of relative dependencies
     * @returns The parsed texture if successful
     */
    static Parse(parsedTexture: any, scene: Scene, rootUrl: string): Nullable<BaseTexture>;
    /**
     * Creates a texture from its base 64 representation.
     * @param data Define the base64 payload without the data: prefix
     * @param name Define the name of the texture in the scene useful fo caching purpose for instance
     * @param scene Define the scene the texture should belong to
     * @param noMipmapOrOptions defines if the texture will require mip maps or not or set of all options to create the texture
     * @param invertY define if the texture needs to be inverted on the y axis during loading
     * @param samplingMode define the sampling mode we want for the texture while fetching from it (Texture.NEAREST_SAMPLINGMODE...)
     * @param onLoad define a callback triggered when the texture has been loaded
     * @param onError define a callback triggered when an error occurred during the loading session
     * @param format define the format of the texture we are trying to load (Engine.TEXTUREFORMAT_RGBA...)
     * @param creationFlags specific flags to use when creating the texture (Constants.TEXTURE_CREATIONFLAG_STORAGE for storage textures, for eg)
     * @returns the created texture
     */
    static CreateFromBase64String(data: string, name: string, scene: Scene, noMipmapOrOptions?: boolean | ITextureCreationOptions, invertY?: boolean, samplingMode?: number, onLoad?: Nullable<() => void>, onError?: Nullable<() => void>, format?: number, creationFlags?: number): Texture;
    /**
     * Creates a texture from its data: representation. (data: will be added in case only the payload has been passed in)
     * @param name Define the name of the texture in the scene useful fo caching purpose for instance
     * @param buffer define the buffer to load the texture from in case the texture is loaded from a buffer representation
     * @param scene Define the scene the texture should belong to
     * @param deleteBuffer define if the buffer we are loading the texture from should be deleted after load
     * @param noMipmapOrOptions defines if the texture will require mip maps or not or set of all options to create the texture
     * @param invertY define if the texture needs to be inverted on the y axis during loading
     * @param samplingMode define the sampling mode we want for the texture while fetching from it (Texture.NEAREST_SAMPLINGMODE...)
     * @param onLoad define a callback triggered when the texture has been loaded
     * @param onError define a callback triggered when an error occurred during the loading session
     * @param format define the format of the texture we are trying to load (Engine.TEXTUREFORMAT_RGBA...)
     * @param creationFlags specific flags to use when creating the texture (Constants.TEXTURE_CREATIONFLAG_STORAGE for storage textures, for eg)
     * @returns the created texture
     */
    static LoadFromDataString(name: string, buffer: any, scene: Scene, deleteBuffer?: boolean, noMipmapOrOptions?: boolean | ITextureCreationOptions, invertY?: boolean, samplingMode?: number, onLoad?: Nullable<() => void>, onError?: Nullable<(message?: string, exception?: any) => void>, format?: number, creationFlags?: number): Texture;
}
