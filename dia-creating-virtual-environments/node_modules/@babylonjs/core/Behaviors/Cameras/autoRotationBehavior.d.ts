import type { Behavior } from "../../Behaviors/behavior";
import type { ArcRotateCamera } from "../../Cameras/arcRotateCamera";
import type { Nullable } from "../../types";
/**
 * The autoRotation behavior (AutoRotationBehavior) is designed to create a smooth rotation of an ArcRotateCamera when there is no user interaction.
 * @see https://doc.babylonjs.com/features/featuresDeepDive/behaviors/cameraBehaviors#autorotation-behavior
 */
export declare class AutoRotationBehavior implements Behavior<ArcRotateCamera> {
    /**
     * Gets the name of the behavior.
     */
    get name(): string;
    private _zoomStopsAnimation;
    private _idleRotationSpeed;
    private _idleRotationWaitTime;
    private _idleRotationSpinupTime;
    targetAlpha: Nullable<number>;
    /**
     * Sets the flag that indicates if user zooming should stop animation.
     */
    set zoomStopsAnimation(flag: boolean);
    /**
     * Gets the flag that indicates if user zooming should stop animation.
     */
    get zoomStopsAnimation(): boolean;
    /**
     * Sets the default speed at which the camera rotates around the model.
     */
    set idleRotationSpeed(speed: number);
    /**
     * Gets the default speed at which the camera rotates around the model.
     */
    get idleRotationSpeed(): number;
    /**
     * Sets the time (in milliseconds) to wait after user interaction before the camera starts rotating.
     */
    set idleRotationWaitTime(time: number);
    /**
     * Gets the time (milliseconds) to wait after user interaction before the camera starts rotating.
     */
    get idleRotationWaitTime(): number;
    /**
     * Sets the time (milliseconds) to take to spin up to the full idle rotation speed.
     */
    set idleRotationSpinupTime(time: number);
    /**
     * Gets the time (milliseconds) to take to spin up to the full idle rotation speed.
     */
    get idleRotationSpinupTime(): number;
    /**
     * Gets a value indicating if the camera is currently rotating because of this behavior
     */
    get rotationInProgress(): boolean;
    private _onPrePointerObservableObserver;
    private _onAfterCheckInputsObserver;
    private _attachedCamera;
    private _isPointerDown;
    private _lastFrameTime;
    private _lastInteractionTime;
    private _cameraRotationSpeed;
    /**
     * Initializes the behavior.
     */
    init(): void;
    /**
     * Attaches the behavior to its arc rotate camera.
     * @param camera Defines the camera to attach the behavior to
     */
    attach(camera: ArcRotateCamera): void;
    /**
     * Detaches the behavior from its current arc rotate camera.
     */
    detach(): void;
    /**
     * Force-reset the last interaction time
     * @param customTime an optional time that will be used instead of the current last interaction time. For example `Date.now()`
     */
    resetLastInteractionTime(customTime?: number): void;
    /**
     * Returns true if camera alpha reaches the target alpha
     * @returns true if camera alpha reaches the target alpha
     */
    private _reachTargetAlpha;
    /**
     * Returns true if user is scrolling.
     * @returns true if user is scrolling.
     */
    private _userIsZooming;
    private _lastFrameRadius;
    private _shouldAnimationStopForInteraction;
    /**
     *  Applies any current user interaction to the camera. Takes into account maximum alpha rotation.
     */
    private _applyUserInteraction;
    private _userIsMoving;
}
