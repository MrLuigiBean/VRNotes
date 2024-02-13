import type { Nullable } from "../../types";
import type { WebXRSessionManager } from "../webXRSessionManager";
import { WebXRAbstractFeature } from "./WebXRAbstractFeature";
/**
 * Options for DOM Overlay feature
 */
export interface IWebXRDomOverlayOptions {
    /**
     * DOM Element or document query selector string for overlay.
     *
     * NOTE: UA may make this element background transparent in XR.
     */
    element: Element | string;
    /**
     * Supress XR Select events on container element (DOM blocks interaction to scene).
     */
    supressXRSelectEvents?: boolean;
}
/**
 * Type of DOM overlay provided by UA.
 */
type WebXRDomOverlayType = 
/**
 * Covers the entire physical screen for a screen-based device, for example handheld AR
 */
"screen"
/**
 * Appears as a floating rectangle in space
 */
 | "floating"
/**
 * Follows the user’s head movement consistently, appearing similar to a HUD
 */
 | "head-locked";
/**
 * DOM Overlay Feature
 *
 * @since 5.0.0
 */
export declare class WebXRDomOverlay extends WebXRAbstractFeature {
    /**
     * options to use when constructing this feature
     */
    readonly options: IWebXRDomOverlayOptions;
    /**
     * Type of overlay - non-null when available
     */
    private _domOverlayType;
    /**
     * Event Listener to supress "beforexrselect" events.
     */
    private _beforeXRSelectListener;
    /**
     * Element used for overlay
     */
    private _element;
    /**
     * The module's name
     */
    static readonly Name = "xr-dom-overlay";
    /**
     * The (Babylon) version of this module.
     * This is an integer representing the implementation version.
     * This number does not correspond to the WebXR specs version
     */
    static readonly Version = 1;
    /**
     * Creates a new instance of the dom-overlay feature
     * @param _xrSessionManager an instance of WebXRSessionManager
     * @param options options to use when constructing this feature
     */
    constructor(_xrSessionManager: WebXRSessionManager, 
    /**
     * options to use when constructing this feature
     */
    options: IWebXRDomOverlayOptions);
    /**
     * attach this feature
     * Will usually be called by the features manager
     *
     * @returns true if successful.
     */
    attach(): boolean;
    /**
     * The type of DOM overlay (null when not supported).  Provided by UA and remains unchanged for duration of session.
     */
    get domOverlayType(): Nullable<WebXRDomOverlayType>;
    /**
     * Dispose this feature and all of the resources attached
     */
    dispose(): void;
    protected _onXRFrame(_xrFrame: XRFrame): void;
    /**
     * Extends the session init object if needed
     * @returns augmentation object for the xr session init object.
     */
    getXRSessionInitExtension(): Promise<Partial<XRSessionInit>>;
}
export {};
