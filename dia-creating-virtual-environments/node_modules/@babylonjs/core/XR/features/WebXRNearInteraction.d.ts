import type { WebXRControllerPointerSelection } from "./WebXRControllerPointerSelection";
import type { WebXRSessionManager } from "../webXRSessionManager";
import type { AbstractMesh } from "../../Meshes/abstractMesh";
import type { WebXRInput } from "../webXRInput";
import type { WebXRInputSource } from "../webXRInputSource";
import type { Scene } from "../../scene";
import type { Nullable } from "../../types";
import { PickingInfo } from "../../Collisions/pickingInfo";
import { WebXRAbstractFeature } from "./WebXRAbstractFeature";
import { BoundingSphere } from "../../Culling/boundingSphere";
import { Color3 } from "../../Maths/math.color";
import type { Material } from "../../Materials/material";
import "../../Meshes/subMesh.project";
/**
 * Where should the near interaction mesh be attached to when using a motion controller for near interaction
 */
export declare enum WebXRNearControllerMode {
    /**
     * Motion controllers will not support near interaction
     */
    DISABLED = 0,
    /**
     * The interaction point for motion controllers will be inside of them
     */
    CENTERED_ON_CONTROLLER = 1,
    /**
     * The interaction point for motion controllers will be in front of the controller
     */
    CENTERED_IN_FRONT = 2
}
/**
 * Options interface for the near interaction module
 */
export interface IWebXRNearInteractionOptions {
    /**
     * If provided, this scene will be used to render meshes.
     */
    customUtilityLayerScene?: Scene;
    /**
     * Should meshes created here be added to a utility layer or the main scene
     */
    useUtilityLayer?: boolean;
    /**
     * The xr input to use with this near interaction
     */
    xrInput: WebXRInput;
    /**
     * Enable near interaction on all controllers instead of switching between them
     */
    enableNearInteractionOnAllControllers?: boolean;
    /**
     * The preferred hand to give the near interaction to. This will be prioritized when the controller initialize.
     * If switch is enabled, it will still allow the user to switch between the different controllers
     */
    preferredHandedness?: XRHandedness;
    /**
     * Disable switching the near interaction from one controller to the other.
     * If the preferred hand is set it will be fixed on this hand, and if not it will be fixed on the first controller added to the scene
     */
    disableSwitchOnClick?: boolean;
    /**
     * Far interaction feature to toggle when near interaction takes precedence
     */
    farInteractionFeature?: WebXRControllerPointerSelection;
    /**
     * Near interaction mode for motion controllers
     */
    nearInteractionControllerMode?: WebXRNearControllerMode;
    /**
     * Optional material for the motion controller orb, if enabled
     */
    motionControllerOrbMaterial?: Material;
}
/**
 * A module that will enable near interaction near interaction for hands and motion controllers of XR Input Sources
 */
export declare class WebXRNearInteraction extends WebXRAbstractFeature {
    private readonly _options;
    private static _IdCounter;
    private _tmpRay;
    private _attachController;
    private _controllers;
    private _scene;
    private _attachedController;
    private _farInteractionFeature;
    /**
     * The module's name
     */
    static readonly Name = "xr-near-interaction";
    /**
     * The (Babylon) version of this module.
     * This is an integer representing the implementation version.
     * This number does not correspond to the WebXR specs version
     */
    static readonly Version = 1;
    /**
     * default color of the selection ring
     */
    selectionMeshDefaultColor: Color3;
    /**
     * This color will be applied to the selection ring when selection is triggered
     */
    selectionMeshPickedColor: Color3;
    /**
     * constructs a new background remover module
     * @param _xrSessionManager the session manager for this module
     * @param _options read-only options to be used in this module
     */
    constructor(_xrSessionManager: WebXRSessionManager, _options: IWebXRNearInteractionOptions);
    /**
     * Attach this feature
     * Will usually be called by the features manager
     *
     * @returns true if successful.
     */
    attach(): boolean;
    /**
     * Detach this feature.
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
     * This function sets webXRControllerPointerSelection feature that will be disabled when
     * the hover range is reached for a mesh and will be reattached when not in hover range.
     * This is used to remove the selection rays when moving.
     * @param farInteractionFeature the feature to disable when finger is in hover range for a mesh
     */
    setFarInteractionFeature(farInteractionFeature: Nullable<WebXRControllerPointerSelection>): void;
    /**
     * Filter used for near interaction pick and hover
     * @param mesh
     */
    private _nearPickPredicate;
    /**
     * Filter used for near interaction grab
     * @param mesh
     */
    private _nearGrabPredicate;
    /**
     * Filter used for any near interaction
     * @param mesh
     */
    private _nearInteractionPredicate;
    private _controllerAvailablePredicate;
    private _handleTransitionAnimation;
    private readonly _hoverRadius;
    private readonly _pickRadius;
    private readonly _controllerPickRadius;
    private readonly _nearGrabLengthScale;
    private _processTouchPoint;
    protected _onXRFrame(_xrFrame: XRFrame): void;
    private get _utilityLayerScene();
    private _generateVisualCue;
    private _isControllerReadyForNearInteraction;
    private _attachNearInteractionMode;
    private _detachController;
    private _generateNewTouchPointMesh;
    private _pickWithSphere;
    /**
     * Picks a mesh with a sphere
     * @param mesh the mesh to pick
     * @param sphere picking sphere in world coordinates
     * @param skipBoundingInfo a boolean indicating if we should skip the bounding info check
     * @returns the picking info
     */
    static PickMeshWithSphere(mesh: AbstractMesh, sphere: BoundingSphere, skipBoundingInfo?: boolean): PickingInfo;
}
