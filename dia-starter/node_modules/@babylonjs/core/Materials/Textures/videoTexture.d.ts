import { Observable } from "../../Misc/observable";
import type { Nullable } from "../../types";
import type { Scene } from "../../scene";
import { Texture } from "../../Materials/Textures/texture";
import type { ExternalTexture } from "./externalTexture";
import "../../Engines/Extensions/engine.videoTexture";
import "../../Engines/Extensions/engine.dynamicTexture";
/**
 * Settings for finer control over video usage
 */
export interface VideoTextureSettings {
    /**
     * Applies `autoplay` to video, if specified
     */
    autoPlay?: boolean;
    /**
     * Applies `muted` to video, if specified
     */
    muted?: boolean;
    /**
     * Applies `loop` to video, if specified
     */
    loop?: boolean;
    /**
     * Automatically updates internal texture from video at every frame in the render loop
     */
    autoUpdateTexture: boolean;
    /**
     * Image src displayed during the video loading or until the user interacts with the video.
     */
    poster?: string;
    /**
     * Defines the associated texture format.
     */
    format?: number;
    /**
     * Notify babylon to not modify any video settings and not control the video's playback.
     * Set this to true if you are controlling the way the video is being played, stopped and paused.
     */
    independentVideoSource?: boolean;
}
/**
 * If you want to display a video in your scene, this is the special texture for that.
 * This special texture works similar to other textures, with the exception of a few parameters.
 * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/using/videoTexture
 */
export declare class VideoTexture extends Texture {
    /**
     * Tells whether textures will be updated automatically or user is required to call `updateTexture` manually
     */
    readonly autoUpdateTexture: boolean;
    /**
     * The video instance used by the texture internally
     */
    readonly video: HTMLVideoElement;
    private _externalTexture;
    private _onUserActionRequestedObservable;
    /**
     * Event triggered when a dom action is required by the user to play the video.
     * This happens due to recent changes in browser policies preventing video to auto start.
     */
    get onUserActionRequestedObservable(): Observable<Texture>;
    private _generateMipMaps;
    private _stillImageCaptured;
    private _displayingPosterTexture;
    private _settings;
    private _createInternalTextureOnEvent;
    private _frameId;
    private _currentSrc;
    private _onError?;
    private _errorFound;
    /**
     * Serialize the flag to define this texture as a video texture
     */
    readonly isVideo = true;
    private _processError;
    private _handlePlay;
    /**
     * Creates a video texture.
     * If you want to display a video in your scene, this is the special texture for that.
     * This special texture works similar to other textures, with the exception of a few parameters.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/using/videoTexture
     * @param name optional name, will detect from video source, if not defined
     * @param src can be used to provide an url, array of urls or an already setup HTML video element.
     * @param scene is obviously the current scene.
     * @param generateMipMaps can be used to turn on mipmaps (Can be expensive for videoTextures because they are often updated).
     * @param invertY is false by default but can be used to invert video on Y axis
     * @param samplingMode controls the sampling method and is set to TRILINEAR_SAMPLINGMODE by default
     * @param settings allows finer control over video usage
     * @param onError defines a callback triggered when an error occurred during the loading session
     * @param format defines the texture format to use (Engine.TEXTUREFORMAT_RGBA by default)
     */
    constructor(name: Nullable<string>, src: string | string[] | HTMLVideoElement, scene: Nullable<Scene>, generateMipMaps?: boolean, invertY?: boolean, samplingMode?: number, settings?: Partial<VideoTextureSettings>, onError?: Nullable<(message?: string, exception?: any) => void>, format?: number);
    /**
     * Get the current class name of the video texture useful for serialization or dynamic coding.
     * @returns "VideoTexture"
     */
    getClassName(): string;
    private _getName;
    private _getVideo;
    private _resizeInternalTexture;
    private _createInternalTexture;
    private _reset;
    /**
     * @internal Internal method to initiate `update`.
     */
    _rebuild(): void;
    /**
     * Update Texture in the `auto` mode. Does not do anything if `settings.autoUpdateTexture` is false.
     */
    update(): void;
    /**
     * Update Texture in `manual` mode. Does not do anything if not visible or paused.
     * @param isVisible Visibility state, detected by user using `scene.getActiveMeshes()` or otherwise.
     */
    updateTexture(isVisible: boolean): void;
    protected _updateInternalTexture: () => void;
    /**
     * Get the underlying external texture (if supported by the current engine, else null)
     */
    get externalTexture(): Nullable<ExternalTexture>;
    /**
     * Change video content. Changing video instance or setting multiple urls (as in constructor) is not supported.
     * @param url New url.
     */
    updateURL(url: string): void;
    /**
     * Clones the texture.
     * @returns the cloned texture
     */
    clone(): VideoTexture;
    /**
     * Dispose the texture and release its associated resources.
     */
    dispose(): void;
    /**
     * Creates a video texture straight from a stream.
     * @param scene Define the scene the texture should be created in
     * @param stream Define the stream the texture should be created from
     * @param constraints video constraints
     * @param invertY Defines if the video should be stored with invert Y set to true (true by default)
     * @returns The created video texture as a promise
     */
    static CreateFromStreamAsync(scene: Scene, stream: MediaStream, constraints: any, invertY?: boolean): Promise<VideoTexture>;
    /**
     * Creates a video texture straight from your WebCam video feed.
     * @param scene Define the scene the texture should be created in
     * @param constraints Define the constraints to use to create the web cam feed from WebRTC
     * @param audioConstaints Define the audio constraints to use to create the web cam feed from WebRTC
     * @param invertY Defines if the video should be stored with invert Y set to true (true by default)
     * @returns The created video texture as a promise
     */
    static CreateFromWebCamAsync(scene: Scene, constraints: {
        minWidth: number;
        maxWidth: number;
        minHeight: number;
        maxHeight: number;
        deviceId: string;
    } & MediaTrackConstraints, audioConstaints?: boolean | MediaTrackConstraints, invertY?: boolean): Promise<VideoTexture>;
    /**
     * Creates a video texture straight from your WebCam video feed.
     * @param scene Defines the scene the texture should be created in
     * @param onReady Defines a callback to triggered once the texture will be ready
     * @param constraints Defines the constraints to use to create the web cam feed from WebRTC
     * @param audioConstaints Defines the audio constraints to use to create the web cam feed from WebRTC
     * @param invertY Defines if the video should be stored with invert Y set to true (true by default)
     */
    static CreateFromWebCam(scene: Scene, onReady: (videoTexture: VideoTexture) => void, constraints: {
        minWidth: number;
        maxWidth: number;
        minHeight: number;
        maxHeight: number;
        deviceId: string;
    } & MediaTrackConstraints, audioConstaints?: boolean | MediaTrackConstraints, invertY?: boolean): void;
}
