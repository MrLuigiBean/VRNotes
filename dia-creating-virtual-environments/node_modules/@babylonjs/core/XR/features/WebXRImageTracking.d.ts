import type { WebXRSessionManager } from "../webXRSessionManager";
import { Observable } from "../../Misc/observable";
import { WebXRAbstractFeature } from "./WebXRAbstractFeature";
import { Matrix } from "../../Maths/math.vector";
import type { Nullable } from "../../types";
/**
 * Options interface for the background remover plugin
 */
export interface IWebXRImageTrackingOptions {
    /**
     * A required array with images to track
     */
    images: {
        /**
         * The source of the image. can be a URL or an image bitmap
         */
        src: string | ImageBitmap;
        /**
         * The estimated width in the real world (in meters)
         */
        estimatedRealWorldWidth: number;
    }[];
}
/**
 * An object representing an image tracked by the system
 */
export interface IWebXRTrackedImage {
    /**
     * The ID of this image (which is the same as the position in the array that was used to initialize the feature)
     */
    id: number;
    /**
     * Is the transformation provided emulated. If it is, the system "guesses" its real position. Otherwise it can be considered as exact position.
     */
    emulated?: boolean;
    /**
     * Just in case it is needed - the image bitmap that is being tracked
     */
    originalBitmap: ImageBitmap;
    /**
     * The native XR result image tracking result, untouched
     */
    xrTrackingResult?: XRImageTrackingResult;
    /**
     * Width in real world (meters)
     */
    realWorldWidth?: number;
    /**
     * A transformation matrix of this current image in the current reference space.
     */
    transformationMatrix: Matrix;
    /**
     * The width/height ratio of this image. can be used to calculate the size of the detected object/image
     */
    ratio?: number;
}
/**
 * Image tracking for immersive AR sessions.
 * Providing a list of images and their estimated widths will enable tracking those images in the real world.
 */
export declare class WebXRImageTracking extends WebXRAbstractFeature {
    /**
     * read-only options to be used in this module
     */
    readonly options: IWebXRImageTrackingOptions;
    /**
     * The module's name
     */
    static readonly Name = "xr-image-tracking";
    /**
     * The (Babylon) version of this module.
     * This is an integer representing the implementation version.
     * This number does not correspond to the WebXR specs version
     */
    static readonly Version = 1;
    /**
     * This will be triggered if the underlying system deems an image untrackable.
     * The index is the index of the image from the array used to initialize the feature.
     */
    onUntrackableImageFoundObservable: Observable<number>;
    /**
     * An image was deemed trackable, and the system will start tracking it.
     */
    onTrackableImageFoundObservable: Observable<IWebXRTrackedImage>;
    /**
     * The image was found and its state was updated.
     */
    onTrackedImageUpdatedObservable: Observable<IWebXRTrackedImage>;
    private _trackableScoreStatus;
    private _trackedImages;
    private _originalTrackingRequest;
    /**
     * constructs the image tracking feature
     * @param _xrSessionManager the session manager for this module
     * @param options read-only options to be used in this module
     */
    constructor(_xrSessionManager: WebXRSessionManager, 
    /**
     * read-only options to be used in this module
     */
    options: IWebXRImageTrackingOptions);
    /**
     * attach this feature
     * Will usually be called by the features manager
     *
     * @returns true if successful.
     */
    attach(): boolean;
    /**
     * detach this feature.
     * Will usually be called by the features manager
     *
     * @returns true if successful.
     */
    detach(): boolean;
    /**
     * Get a tracked image by its ID.
     *
     * @param id the id of the image to load (position in the init array)
     * @returns a trackable image, if exists in this location
     */
    getTrackedImageById(id: number): Nullable<IWebXRTrackedImage>;
    /**
     * Dispose this feature and all of the resources attached
     */
    dispose(): void;
    /**
     * Extends the session init object if needed
     * @returns augmentation object fo the xr session init object.
     */
    getXRSessionInitExtension(): Promise<Partial<XRSessionInit>>;
    protected _onXRFrame(_xrFrame: XRFrame): void;
    private _checkScoresAsync;
}
