import type { Nullable } from "../../types";
import { BaseTexture } from "../../Materials/Textures/baseTexture";
import { Matrix } from "../../Maths/math.vector";
import { Observable } from "../../Misc/observable";
import "../../Engines/Extensions/engine.dynamicTexture";
import "../../Engines/Extensions/engine.videoTexture";
import "../../Engines/Extensions/engine.externalTexture";
import type { ThinEngine } from "../../Engines/thinEngine";
import type { Scene } from "../../scene";
/**
 * Defines the options related to the creation of an HtmlElementTexture
 */
export interface IHtmlElementTextureOptions {
    /**
     * Defines whether mip maps should be created or not.
     */
    generateMipMaps?: boolean;
    /**
     * Defines the sampling mode of the texture.
     */
    samplingMode?: number;
    /**
     * Defines the associated texture format.
     */
    format?: number;
    /**
     * Defines the engine instance to use the texture with. It is not mandatory if you define a scene.
     */
    engine: Nullable<ThinEngine>;
    /**
     * Defines the scene the texture belongs to. It is not mandatory if you define an engine.
     */
    scene: Nullable<Scene>;
}
/**
 * This represents the smallest workload to use an already existing element (Canvas or Video) as a texture.
 * To be as efficient as possible depending on your constraints nothing aside the first upload
 * is automatically managed.
 * It is a cheap VideoTexture or DynamicTexture if you prefer to keep full control of the elements
 * in your application.
 *
 * As the update is not automatic, you need to call them manually.
 */
export declare class HtmlElementTexture extends BaseTexture {
    /**
     * The texture URL.
     */
    element: HTMLVideoElement | HTMLCanvasElement;
    /**
     * Observable triggered once the texture has been loaded.
     */
    onLoadObservable: Observable<HtmlElementTexture>;
    private static readonly _DefaultOptions;
    private readonly _format;
    private _textureMatrix;
    private _isVideo;
    private _generateMipMaps;
    private _samplingMode;
    private _externalTexture;
    /**
     * Instantiates a HtmlElementTexture from the following parameters.
     *
     * @param name Defines the name of the texture
     * @param element Defines the video or canvas the texture is filled with
     * @param options Defines the other none mandatory texture creation options
     */
    constructor(name: string, element: HTMLVideoElement | HTMLCanvasElement, options: IHtmlElementTextureOptions);
    private _createInternalTexture;
    /**
     * Returns the texture matrix used in most of the material.
     */
    getTextureMatrix(): Matrix;
    /**
     * Updates the content of the texture.
     * @param invertY Defines whether the texture should be inverted on Y (false by default on video and true on canvas)
     */
    update(invertY?: Nullable<boolean>): void;
    /**
     * Dispose the texture and release its associated resources.
     */
    dispose(): void;
}
