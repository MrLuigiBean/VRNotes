import type { Nullable } from "../../types";
import type { Scene } from "../../scene";
import { Matrix, Vector3 } from "../../Maths/math.vector";
import { BaseTexture } from "../../Materials/Textures/baseTexture";
import type { ThinEngine } from "../../Engines/thinEngine";
import "../../Engines/Extensions/engine.cubeTexture";
import { Observable } from "../../Misc/observable";
/**
 * Class for creating a cube texture
 */
export declare class CubeTexture extends BaseTexture {
    private _delayedOnLoad;
    private _delayedOnError;
    private _lodScale;
    private _lodOffset;
    /**
     * Observable triggered once the texture has been loaded.
     */
    onLoadObservable: Observable<CubeTexture>;
    /**
     * The url of the texture
     */
    url: string;
    /**
     * Gets or sets the center of the bounding box associated with the cube texture.
     * It must define where the camera used to render the texture was set
     * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/using/reflectionTexture#using-local-cubemap-mode
     */
    boundingBoxPosition: Vector3;
    private _boundingBoxSize;
    /**
     * Gets or sets the size of the bounding box associated with the cube texture
     * When defined, the cubemap will switch to local mode
     * @see https://community.arm.com/graphics/b/blog/posts/reflections-based-on-local-cubemaps-in-unity
     * @example https://www.babylonjs-playground.com/#RNASML
     */
    set boundingBoxSize(value: Vector3);
    /**
     * Returns the bounding box size
     * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/using/reflectionTexture#using-local-cubemap-mode
     */
    get boundingBoxSize(): Vector3;
    protected _rotationY: number;
    /**
     * Sets texture matrix rotation angle around Y axis in radians.
     */
    set rotationY(value: number);
    /**
     * Gets texture matrix rotation angle around Y axis radians.
     */
    get rotationY(): number;
    /**
     * Are mip maps generated for this texture or not.
     */
    get noMipmap(): boolean;
    private _noMipmap;
    /** @internal */
    _files: Nullable<string[]>;
    protected _forcedExtension: Nullable<string>;
    /**
     * Gets the forced extension (if any)
     */
    get forcedExtension(): Nullable<string>;
    private _extensions;
    private _textureMatrix;
    private _textureMatrixRefraction;
    private _format;
    private _createPolynomials;
    private _loaderOptions;
    private _useSRGBBuffer?;
    /**
     * Creates a cube texture from an array of image urls
     * @param files defines an array of image urls
     * @param scene defines the hosting scene
     * @param noMipmap specifies if mip maps are not used
     * @returns a cube texture
     */
    static CreateFromImages(files: string[], scene: Scene, noMipmap?: boolean): CubeTexture;
    /**
     * Creates and return a texture created from prefilterd data by tools like IBL Baker or Lys.
     * @param url defines the url of the prefiltered texture
     * @param scene defines the scene the texture is attached to
     * @param forcedExtension defines the extension of the file if different from the url
     * @param createPolynomials defines whether or not to create polynomial harmonics from the texture data if necessary
     * @returns the prefiltered texture
     */
    static CreateFromPrefilteredData(url: string, scene: Scene, forcedExtension?: any, createPolynomials?: boolean): CubeTexture;
    /**
     * Creates a cube texture to use with reflection for instance. It can be based upon dds or six images as well
     * as prefiltered data.
     * @param rootUrl defines the url of the texture or the root name of the six images
     * @param sceneOrEngine defines the scene or engine the texture is attached to
     * @param extensions defines the suffixes add to the picture name in case six images are in use like _px.jpg...
     * @param noMipmap defines if mipmaps should be created or not
     * @param files defines the six files to load for the different faces in that order: px, py, pz, nx, ny, nz
     * @param onLoad defines a callback triggered at the end of the file load if no errors occurred
     * @param onError defines a callback triggered in case of error during load
     * @param format defines the internal format to use for the texture once loaded
     * @param prefiltered defines whether or not the texture is created from prefiltered data
     * @param forcedExtension defines the extensions to use (force a special type of file to load) in case it is different from the file name
     * @param createPolynomials defines whether or not to create polynomial harmonics from the texture data if necessary
     * @param lodScale defines the scale applied to environment texture. This manages the range of LOD level used for IBL according to the roughness
     * @param lodOffset defines the offset applied to environment texture. This manages first LOD level used for IBL according to the roughness
     * @param loaderOptions options to be passed to the loader
     * @param useSRGBBuffer Defines if the texture must be loaded in a sRGB GPU buffer (if supported by the GPU) (default: false)
     * @returns the cube texture
     */
    constructor(rootUrl: string, sceneOrEngine: Scene | ThinEngine, extensions?: Nullable<string[]>, noMipmap?: boolean, files?: Nullable<string[]>, onLoad?: Nullable<() => void>, onError?: Nullable<(message?: string, exception?: any) => void>, format?: number, prefiltered?: boolean, forcedExtension?: any, createPolynomials?: boolean, lodScale?: number, lodOffset?: number, loaderOptions?: any, useSRGBBuffer?: boolean);
    /**
     * Get the current class name of the texture useful for serialization or dynamic coding.
     * @returns "CubeTexture"
     */
    getClassName(): string;
    /**
     * Update the url (and optional buffer) of this texture if url was null during construction.
     * @param url the url of the texture
     * @param forcedExtension defines the extension to use
     * @param onLoad callback called when the texture is loaded  (defaults to null)
     * @param prefiltered Defines whether the updated texture is prefiltered or not
     * @param onError callback called if there was an error during the loading process (defaults to null)
     * @param extensions defines the suffixes add to the picture name in case six images are in use like _px.jpg...
     * @param delayLoad defines if the texture should be loaded now (false by default)
     * @param files defines the six files to load for the different faces in that order: px, py, pz, nx, ny, nz
     */
    updateURL(url: string, forcedExtension?: string, onLoad?: Nullable<() => void>, prefiltered?: boolean, onError?: Nullable<(message?: string, exception?: any) => void>, extensions?: Nullable<string[]>, delayLoad?: boolean, files?: Nullable<string[]>): void;
    /**
     * Delays loading of the cube texture
     * @param forcedExtension defines the extension to use
     */
    delayLoad(forcedExtension?: string): void;
    /**
     * Returns the reflection texture matrix
     * @returns the reflection texture matrix
     */
    getReflectionTextureMatrix(): Matrix;
    /**
     * Sets the reflection texture matrix
     * @param value Reflection texture matrix
     */
    setReflectionTextureMatrix(value: Matrix): void;
    /**
     * Gets a suitable rotate/transform matrix when the texture is used for refraction.
     * There's a separate function from getReflectionTextureMatrix because refraction requires a special configuration of the matrix in right-handed mode.
     * @returns The refraction matrix
     */
    getRefractionTextureMatrix(): Matrix;
    private _loadTexture;
    /**
     * Parses text to create a cube texture
     * @param parsedTexture define the serialized text to read from
     * @param scene defines the hosting scene
     * @param rootUrl defines the root url of the cube texture
     * @returns a cube texture
     */
    static Parse(parsedTexture: any, scene: Scene, rootUrl: string): CubeTexture;
    /**
     * Makes a clone, or deep copy, of the cube texture
     * @returns a new cube texture
     */
    clone(): CubeTexture;
}
