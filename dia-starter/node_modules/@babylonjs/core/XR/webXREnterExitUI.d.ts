import type { Nullable } from "../types";
import { Observable } from "../Misc/observable";
import type { IDisposable, Scene } from "../scene";
import type { WebXRExperienceHelper } from "./webXRExperienceHelper";
import type { WebXRRenderTarget } from "./webXRTypes";
/**
 * Button which can be used to enter a different mode of XR
 */
export declare class WebXREnterExitUIButton {
    /** button element */
    element: HTMLElement;
    /** XR initialization options for the button */
    sessionMode: XRSessionMode;
    /** Reference space type */
    referenceSpaceType: XRReferenceSpaceType;
    /**
     * Creates a WebXREnterExitUIButton
     * @param element button element
     * @param sessionMode XR initialization session mode
     * @param referenceSpaceType the type of reference space to be used
     */
    constructor(
    /** button element */
    element: HTMLElement, 
    /** XR initialization options for the button */
    sessionMode: XRSessionMode, 
    /** Reference space type */
    referenceSpaceType: XRReferenceSpaceType);
    /**
     * Extendable function which can be used to update the button's visuals when the state changes
     * @param activeButton the current active button in the UI
     */
    update(activeButton: Nullable<WebXREnterExitUIButton>): void;
}
/**
 * Options to create the webXR UI
 */
export declare class WebXREnterExitUIOptions {
    /**
     * User provided buttons to enable/disable WebXR. The system will provide default if not set
     */
    customButtons?: Array<WebXREnterExitUIButton>;
    /**
     * A reference space type to use when creating the default button.
     * Default is local-floor
     */
    referenceSpaceType?: XRReferenceSpaceType;
    /**
     * Context to enter xr with
     */
    renderTarget?: Nullable<WebXRRenderTarget>;
    /**
     * A session mode to use when creating the default button.
     * Default is immersive-vr
     */
    sessionMode?: XRSessionMode;
    /**
     * A list of optional features to init the session with
     */
    optionalFeatures?: string[];
    /**
     * A list of optional features to init the session with
     */
    requiredFeatures?: string[];
    /**
     * If set, the `sessiongranted` event will not be registered. `sessiongranted` is used to move seamlessly between WebXR experiences.
     * If set to true the user will be forced to press the "enter XR" button even if sessiongranted event was triggered.
     * If not set and a sessiongranted event was triggered, the XR session will start automatically.
     */
    ignoreSessionGrantedEvent?: boolean;
    /**
     * If defined, this function will be executed if the UI encounters an error when entering XR
     */
    onError?: (error: any) => void;
}
/**
 * UI to allow the user to enter/exit XR mode
 */
export declare class WebXREnterExitUI implements IDisposable {
    private _scene;
    /** version of the options passed to this UI */
    options: WebXREnterExitUIOptions;
    private _activeButton;
    private _buttons;
    private _helper;
    private _renderTarget?;
    /**
     * The HTML Div Element to which buttons are added.
     */
    readonly overlay: HTMLDivElement;
    /**
     * Fired every time the active button is changed.
     *
     * When xr is entered via a button that launches xr that button will be the callback parameter
     *
     * When exiting xr the callback parameter will be null)
     */
    activeButtonChangedObservable: Observable<Nullable<WebXREnterExitUIButton>>;
    /**
     * Construct a new EnterExit UI class
     *
     * @param _scene babylon scene object to use
     * @param options (read-only) version of the options passed to this UI
     */
    constructor(_scene: Scene, 
    /** version of the options passed to this UI */
    options: WebXREnterExitUIOptions);
    /**
     * Set the helper to be used with this UI component.
     * The UI is bound to an experience helper. If not provided the UI can still be used but the events should be registered by the developer.
     *
     * @param helper the experience helper to attach
     * @param renderTarget an optional render target (in case it is created outside of the helper scope)
     * @returns a promise that resolves when the ui is ready
     */
    setHelperAsync(helper: WebXRExperienceHelper, renderTarget?: WebXRRenderTarget): Promise<void>;
    /**
     * Creates UI to allow the user to enter/exit XR mode
     * @param scene the scene to add the ui to
     * @param helper the xr experience helper to enter/exit xr with
     * @param options options to configure the UI
     * @returns the created ui
     */
    static CreateAsync(scene: Scene, helper: WebXRExperienceHelper, options: WebXREnterExitUIOptions): Promise<WebXREnterExitUI>;
    private _enterXRWithButtonIndex;
    /**
     * Disposes of the XR UI component
     */
    dispose(): void;
    private _onSessionGranted;
    private _updateButtons;
}
