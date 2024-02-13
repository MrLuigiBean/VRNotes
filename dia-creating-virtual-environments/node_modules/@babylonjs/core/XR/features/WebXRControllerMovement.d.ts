import type { WebXRSessionManager } from "../webXRSessionManager";
import type { Nullable } from "../../types";
import type { WebXRInput } from "../webXRInput";
import type { WebXRInputSource } from "../webXRInputSource";
import type { IWebXRMotionControllerAxesValue, IWebXRMotionControllerComponentChangesValues } from "../motionController/webXRControllerComponent";
import { WebXRControllerComponent } from "../motionController/webXRControllerComponent";
import { Quaternion } from "../../Maths/math.vector";
import { WebXRAbstractFeature } from "./WebXRAbstractFeature";
import type { MotionControllerComponentType } from "../motionController/webXRAbstractMotionController";
/**
 * The options container for the controller movement module
 */
export interface IWebXRControllerMovementOptions {
    /**
     * Override default behaviour and provide your own movement controls
     */
    customRegistrationConfigurations?: WebXRControllerMovementRegistrationConfiguration[];
    /**
     * Is movement enabled
     */
    movementEnabled?: boolean;
    /**
     * Camera direction follows view pose and movement by default will move independently of the viewer's pose.
     */
    movementOrientationFollowsViewerPose: boolean;
    /**
     * Movement speed factor (default is 1.0)
     */
    movementSpeed?: number;
    /**
     * Minimum threshold the controller's thumbstick/touchpad must pass before being recognized for movement (avoids jitter/unintentional movement)
     */
    movementThreshold?: number;
    /**
     * Is rotation enabled
     */
    rotationEnabled?: boolean;
    /**
     * Minimum threshold the controller's thumstick/touchpad must pass before being recognized for rotation (avoids jitter/unintentional rotation)
     */
    rotationThreshold?: number;
    /**
     * Movement speed factor (default is 1.0)
     */
    rotationSpeed?: number;
    /**
     * Babylon XR Input class for controller
     */
    xrInput: WebXRInput;
}
/**
 * Feature context is used in handlers and on each XR frame to control the camera movement/direction.
 */
export type WebXRControllerMovementFeatureContext = {
    movementEnabled: boolean;
    movementOrientationFollowsViewerPose: boolean;
    movementSpeed: number;
    movementThreshold: number;
    rotationEnabled: boolean;
    rotationSpeed: number;
    rotationThreshold: number;
};
/**
 * Current state of Movements shared across components and handlers.
 */
export type WebXRControllerMovementState = {
    moveX: number;
    moveY: number;
    rotateX: number;
    rotateY: number;
};
/**
 * Button of Axis Handler must be specified.
 */
export type WebXRControllerMovementRegistrationConfiguration = {
    /**
     * handlers are filtered to these types only
     */
    allowedComponentTypes?: MotionControllerComponentType[];
    /**
     * For registering movement to specific hand only.  Useful if your app has a "main hand" and "off hand" for determining the functionality of a controller.
     */
    forceHandedness?: XRHandedness;
    /**
     * For main component only (useful for buttons and may not trigger axis changes).
     */
    mainComponentOnly?: boolean;
    /**
     * Additional predicate to apply to controllers to restrict a handler being added.
     */
    componentSelectionPredicate?: (xrController: WebXRInputSource) => Nullable<WebXRControllerComponent>;
} & ({
    /**
     * Called when axis changes occur.
     */
    axisChangedHandler: (axes: IWebXRMotionControllerAxesValue, movementState: WebXRControllerMovementState, featureContext: WebXRControllerMovementFeatureContext, xrInput: WebXRInput) => void;
} | {
    /**
     * Called when the button state changes.
     */
    buttonChangedhandler: (pressed: IWebXRMotionControllerComponentChangesValues<boolean>, movementState: WebXRControllerMovementState, featureContext: WebXRControllerMovementFeatureContext, xrInput: WebXRInput) => void;
});
/**
 * This is a movement feature to be used with WebXR-enabled motion controllers.
 * When enabled and attached, the feature will allow a user to move around and rotate in the scene using
 * the input of the attached controllers.
 */
export declare class WebXRControllerMovement extends WebXRAbstractFeature {
    private _controllers;
    private _currentRegistrationConfigurations;
    private _featureContext;
    private _movementDirection;
    private _movementState;
    private _xrInput;
    private _tmpRotationMatrix;
    private _tmpTranslationDirection;
    private _tmpMovementTranslation;
    private _tempCacheQuaternion;
    /**
     * The module's name
     */
    static readonly Name = "xr-controller-movement";
    /**
     * Standard controller configurations.
     */
    static readonly REGISTRATIONS: {
        [key: string]: WebXRControllerMovementRegistrationConfiguration[];
    };
    /**
     * The (Babylon) version of this module.
     * This is an integer representing the implementation version.
     * This number does not correspond to the webxr specs version
     */
    static readonly Version = 1;
    /**
     * Current movement direction.  Will be null before XR Frames have been processed.
     */
    get movementDirection(): Quaternion;
    /**
     * Is movement enabled
     */
    get movementEnabled(): boolean;
    /**
     * Sets whether movement is enabled or not
     * @param enabled is movement enabled
     */
    set movementEnabled(enabled: boolean);
    /**
     * If movement follows viewer pose
     */
    get movementOrientationFollowsViewerPose(): boolean;
    /**
     * Sets whether movement follows viewer pose
     * @param followsPose is movement should follow viewer pose
     */
    set movementOrientationFollowsViewerPose(followsPose: boolean);
    /**
     * Gets movement speed
     */
    get movementSpeed(): number;
    /**
     * Sets movement speed
     * @param movementSpeed movement speed
     */
    set movementSpeed(movementSpeed: number);
    /**
     * Gets minimum threshold the controller's thumbstick/touchpad must pass before being recognized for movement (avoids jitter/unintentional movement)
     */
    get movementThreshold(): number;
    /**
     * Sets minimum threshold the controller's thumbstick/touchpad must pass before being recognized for movement (avoids jitter/unintentional movement)
     * @param movementThreshold new threshold
     */
    set movementThreshold(movementThreshold: number);
    /**
     * Is rotation enabled
     */
    get rotationEnabled(): boolean;
    /**
     * Sets whether rotation is enabled or not
     * @param enabled is rotation enabled
     */
    set rotationEnabled(enabled: boolean);
    /**
     * Gets rotation speed factor
     */
    get rotationSpeed(): number;
    /**
     * Sets rotation speed factor (1.0 is default)
     * @param rotationSpeed new rotation speed factor
     */
    set rotationSpeed(rotationSpeed: number);
    /**
     * Gets minimum threshold the controller's thumbstick/touchpad must pass before being recognized for rotation (avoids jitter/unintentional rotation)
     */
    get rotationThreshold(): number;
    /**
     * Sets minimum threshold the controller's thumbstick/touchpad must pass before being recognized for rotation (avoids jitter/unintentional rotation)
     * @param threshold new threshold
     */
    set rotationThreshold(threshold: number);
    /**
     * constructs a new movement controller system
     * @param _xrSessionManager an instance of WebXRSessionManager
     * @param options configuration object for this feature
     */
    constructor(_xrSessionManager: WebXRSessionManager, options: IWebXRControllerMovementOptions);
    attach(): boolean;
    detach(): boolean;
    /**
     * Occurs on every XR frame.
     * @param _xrFrame
     */
    protected _onXRFrame(_xrFrame: XRFrame): void;
    private _attachController;
    private _detachController;
}
