import type { Nullable } from "../../types";
import type { Scene } from "../../scene";
import { Matrix, Vector3 } from "../../Maths/math.vector";
import { BaseTexture } from "../../Materials/Textures/baseTexture";
import { Observable } from "../../Misc/observable";
import type { ThinEngine } from "../../Engines/thinEngine";
import "../../Engines/Extensions/engine.rawTexture";
import "../../Materials/Textures/baseTexture.polynomial";
/**
 * This represents a texture coming from an HDR input.
 *
 * The only supported format is currently panorama picture stored in RGBE format.
 * Example of such files can be found on Poly Haven: https://polyhaven.com/hdris
 */
export declare class HDRCubeTexture extends BaseTexture {
    private static _FacesMapping;
    private _generateHarmonics;
    private _noMipmap;
    private _prefilterOnLoad;
    private _textureMatrix;
    private _size;
    private _supersample;
    private _onLoad;
    private _onError;
    /**
     * The texture URL.
     */
    url: string;
    protected _isBlocking: boolean;
    /**
     * Sets whether or not the texture is blocking during loading.
     */
    set isBlocking(value: boolean);
    /**
     * Gets whether or not the texture is blocking during loading.
     */
    get isBlocking(): boolean;
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
     * Gets or sets the center of the bounding box associated with the cube texture
     * It must define where the camera used to render the texture was set
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
    get boundingBoxSize(): Vector3;
    /**
     * Observable triggered once the texture has been loaded.
     */
    onLoadObservable: Observable<HDRCubeTexture>;
    /**
     * Instantiates an HDRTexture from the following parameters.
     *
     * @param url The location of the HDR raw data (Panorama stored in RGBE format)
     * @param sceneOrEngine The scene or engine the texture will be used in
     * @param size The cubemap desired size (the more it increases the longer the generation will be)
     * @param noMipmap Forces to not generate the mipmap if true
     * @param generateHarmonics Specifies whether you want to extract the polynomial harmonics during the generation process
     * @param gammaSpace Specifies if the texture will be use in gamma or linear space (the PBR material requires those texture in linear space, but the standard material would require them in Gamma space)
     * @param prefilterOnLoad Prefilters HDR texture to allow use of this texture as a PBR reflection texture.
     * @param onLoad
     * @param onError
     */
    constructor(url: string, sceneOrEngine: Scene | ThinEngine, size: number, noMipmap?: boolean, generateHarmonics?: boolean, gammaSpace?: boolean, prefilterOnLoad?: boolean, onLoad?: Nullable<() => void>, onError?: Nullable<(message?: string, exception?: any) => void>, supersample?: boolean);
    /**
     * Get the current class name of the texture useful for serialization or dynamic coding.
     * @returns "HDRCubeTexture"
     */
    getClassName(): string;
    /**
     * Occurs when the file is raw .hdr file.
     */
    private _loadTexture;
    clone(): HDRCubeTexture;
    delayLoad(): void;
    /**
     * Get the texture reflection matrix used to rotate/transform the reflection.
     * @returns the reflection matrix
     */
    getReflectionTextureMatrix(): Matrix;
    /**
     * Set the texture reflection matrix used to rotate/transform the reflection.
     * @param value Define the reflection matrix to set
     */
    setReflectionTextureMatrix(value: Matrix): void;
    /**
     * Dispose the texture and release its associated resources.
     */
    dispose(): void;
    /**
     * Parses a JSON representation of an HDR Texture in order to create the texture
     * @param parsedTexture Define the JSON representation
     * @param scene Define the scene the texture should be created in
     * @param rootUrl Define the root url in case we need to load relative dependencies
     * @returns the newly created texture after parsing
     */
    static Parse(parsedTexture: any, scene: Scene, rootUrl: string): Nullable<HDRCubeTexture>;
    serialize(): any;
}
