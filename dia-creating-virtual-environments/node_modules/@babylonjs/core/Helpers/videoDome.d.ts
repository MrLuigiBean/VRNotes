import type { Scene } from "../scene";
import { VideoTexture } from "../Materials/Textures/videoTexture";
import { TextureDome } from "./textureDome";
/**
 * Display a 360/180 degree video on an approximately spherical surface, useful for VR applications or skyboxes.
 * As a subclass of TransformNode, this allow parenting to the camera or multiple videos with different locations in the scene.
 * This class achieves its effect with a VideoTexture and a correctly configured BackgroundMaterial on an inverted sphere.
 * Potential additions to this helper include zoom and and non-infinite distance rendering effects.
 */
export declare class VideoDome extends TextureDome<VideoTexture> {
    /**
     * Define the video source as a Monoscopic panoramic 360 video.
     */
    static readonly MODE_MONOSCOPIC = 0;
    /**
     * Define the video source as a Stereoscopic TopBottom/OverUnder panoramic 360 video.
     */
    static readonly MODE_TOPBOTTOM = 1;
    /**
     * Define the video source as a Stereoscopic Side by Side panoramic 360 video.
     */
    static readonly MODE_SIDEBYSIDE = 2;
    /**
     * Get the video texture associated with this video dome
     */
    get videoTexture(): VideoTexture;
    /**
     * Get the video mode of this dome
     */
    get videoMode(): number;
    /**
     * Set the video mode of this dome.
     * @see textureMode
     */
    set videoMode(value: number);
    private _pointerObserver;
    private _textureObserver;
    protected _initTexture(urlsOrElement: string | string[] | HTMLVideoElement, scene: Scene, options: any): VideoTexture;
    /**
     * Releases resources associated with this node.
     * @param doNotRecurse Set to true to not recurse into each children (recurse into each children by default)
     * @param disposeMaterialAndTextures Set to true to also dispose referenced materials and textures (false by default)
     */
    dispose(doNotRecurse?: boolean, disposeMaterialAndTextures?: boolean): void;
}
