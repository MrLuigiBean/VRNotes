import type { WebXRSessionManager } from "../webXRSessionManager";
import type { AbstractMesh } from "../../Meshes/abstractMesh";
import type { WebXRInput } from "../webXRInput";
import type { WebXRInputSource } from "../webXRInputSource";
import type { Scene } from "../../scene";
import type { Nullable } from "../../types";
import { Color3 } from "../../Maths/math.color";
import { WebXRAbstractFeature } from "./WebXRAbstractFeature";
import type { WebXRCamera } from "../webXRCamera";
import type { Mesh } from "../../Meshes/mesh";
/**
 * Options interface for the pointer selection module
 */
export interface IWebXRControllerPointerSelectionOptions {
    /**
     * if provided, this scene will be used to render meshes.
     */
    customUtilityLayerScene?: Scene;
    /**
     * Disable the pointer up event when the xr controller in screen and gaze mode is disposed (meaning - when the user removed the finger from the screen)
     * If not disabled, the last picked point will be used to execute a pointer up event
     * If disabled, pointer up event will be triggered right after the pointer down event.
     * Used in screen and gaze target ray mode only
     */
    disablePointerUpOnTouchOut: boolean;
    /**
     * For gaze mode for tracked-pointer / controllers (time to select instead of button press)
     */
    forceGazeMode: boolean;
    /**
     * Factor to be applied to the pointer-moved function in the gaze mode. How sensitive should the gaze mode be when checking if the pointer moved
     * to start a new countdown to the pointer down event.
     * Defaults to 1.
     */
    gazeModePointerMovedFactor?: number;
    /**
     * Different button type to use instead of the main component
     */
    overrideButtonId?: string;
    /**
     *  use this rendering group id for the meshes (optional)
     */
    renderingGroupId?: number;
    /**
     * The amount of time in milliseconds it takes between pick found something to a pointer down event.
     * Used in gaze modes. Tracked pointer uses the trigger, screen uses touch events
     * 3000 means 3 seconds between pointing at something and selecting it
     */
    timeToSelect?: number;
    /**
     * Should meshes created here be added to a utility layer or the main scene
     */
    useUtilityLayer?: boolean;
    /**
     * Optional WebXR camera to be used for gaze selection
     */
    gazeCamera?: WebXRCamera;
    /**
     * the xr input to use with this pointer selection
     */
    xrInput: WebXRInput;
    /**
     * Should the scene pointerX and pointerY update be disabled
     * This is required for fullscreen AR GUI, but might slow down other experiences.
     * Disable in VR, if not needed.
     * The first rig camera (left eye) will be used to calculate the projection
     */
    disableScenePointerVectorUpdate: boolean;
    /**
     * Enable pointer selection on all controllers instead of switching between them
     */
    enablePointerSelectionOnAllControllers?: boolean;
    /**
     * The preferred hand to give the pointer selection to. This will be prioritized when the controller initialize.
     * If switch is enabled, it will still allow the user to switch between the different controllers
     */
    preferredHandedness?: XRHandedness;
    /**
     * Disable switching the pointer selection from one controller to the other.
     * If the preferred hand is set it will be fixed on this hand, and if not it will be fixed on the first controller added to the scene
     */
    disableSwitchOnClick?: boolean;
    /**
     * The maximum distance of the pointer selection feature. Defaults to 100.
     */
    maxPointerDistance?: number;
    /**
     * A function that will be called when a new selection mesh is generated.
     * This function should return a mesh that will be used as the selection mesh.
     * The default is a torus with a 0.01 diameter and 0.0075 thickness .
     */
    customSelectionMeshGenerator?: () => Mesh;
    /**
     * A function that will be called when a new laser pointer mesh is generated.
     * This function should return a mesh that will be used as the laser pointer mesh.
     * The height (y) of the mesh must be 1.
     */
    customLasterPointerMeshGenerator?: () => AbstractMesh;
}
/**
 * A module that will enable pointer selection for motion controllers of XR Input Sources
 */
export declare class WebXRControllerPointerSelection extends WebXRAbstractFeature {
    private readonly _options;
    private static _IdCounter;
    private _attachController;
    private _controllers;
    private _scene;
    private _tmpVectorForPickCompare;
    private _attachedController;
    /**
     * The module's name
     */
    static readonly Name = "xr-controller-pointer-selection";
    /**
     * The (Babylon) version of this module.
     * This is an integer representing the implementation version.
     * This number does not correspond to the WebXR specs version
     */
    static readonly Version = 1;
    /**
     * Disable lighting on the laser pointer (so it will always be visible)
     */
    disablePointerLighting: boolean;
    /**
     * Disable lighting on the selection mesh (so it will always be visible)
     */
    disableSelectionMeshLighting: boolean;
    /**
     * Should the laser pointer be displayed
     */
    displayLaserPointer: boolean;
    /**
     * Should the selection mesh be displayed (The ring at the end of the laser pointer)
     */
    displaySelectionMesh: boolean;
    /**
     * This color will be set to the laser pointer when selection is triggered
     */
    laserPointerPickedColor: Color3;
    /**
     * Default color of the laser pointer
     */
    laserPointerDefaultColor: Color3;
    /**
     * default color of the selection ring
     */
    selectionMeshDefaultColor: Color3;
    /**
     * This color will be applied to the selection ring when selection is triggered
     */
    selectionMeshPickedColor: Color3;
    /**
     * Optional filter to be used for ray selection.  This predicate shares behavior with
     * scene.pointerMovePredicate which takes priority if it is also assigned.
     */
    raySelectionPredicate: (mesh: AbstractMesh) => boolean;
    /**
     * constructs a new background remover module
     * @param _xrSessionManager the session manager for this module
     * @param _options read-only options to be used in this module
     */
    constructor(_xrSessionManager: WebXRSessionManager, _options: IWebXRControllerPointerSelectionOptions);
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
     * Will get the mesh under a specific pointer.
     * `scene.meshUnderPointer` will only return one mesh - either left or right.
     * @param controllerId the controllerId to check
     * @returns The mesh under pointer or null if no mesh is under the pointer
     */
    getMeshUnderPointer(controllerId: string): Nullable<AbstractMesh>;
    /**
     * Get the xr controller that correlates to the pointer id in the pointer event
     *
     * @param id the pointer id to search for
     * @returns the controller that correlates to this id or null if not found
     */
    getXRControllerByPointerId(id: number): Nullable<WebXRInputSource>;
    /**
     * @internal
     */
    _getPointerSelectionDisabledByPointerId(id: number): boolean;
    /**
     * @internal
     */
    _setPointerSelectionDisabledByPointerId(id: number, state: boolean): void;
    private _identityMatrix;
    private _screenCoordinatesRef;
    private _viewportRef;
    protected _onXRFrame(_xrFrame: XRFrame): void;
    private get _utilityLayerScene();
    private _attachGazeMode;
    private _attachScreenRayMode;
    private _attachTrackedPointerRayMode;
    private _convertNormalToDirectionOfRay;
    private _detachController;
    private _generateNewMeshPair;
    private _pickingMoved;
    private _updatePointerDistance;
    private _augmentPointerInit;
    /** @internal */
    get lasterPointerDefaultColor(): Color3;
}
