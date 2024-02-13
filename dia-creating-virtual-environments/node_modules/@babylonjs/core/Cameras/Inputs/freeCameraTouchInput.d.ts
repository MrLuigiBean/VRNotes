import type { ICameraInput } from "../../Cameras/cameraInputsManager";
import type { FreeCamera } from "../../Cameras/freeCamera";
/**
 * Manage the touch inputs to control the movement of a free camera.
 * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/customizingCameraInputs
 */
export declare class FreeCameraTouchInput implements ICameraInput<FreeCamera> {
    /**
     * Define if mouse events can be treated as touch events
     */
    allowMouse: boolean;
    /**
     * Defines the camera the input is attached to.
     */
    camera: FreeCamera;
    /**
     * Defines the touch sensibility for rotation.
     * The lower the faster.
     */
    touchAngularSensibility: number;
    /**
     * Defines the touch sensibility for move.
     * The lower the faster.
     */
    touchMoveSensibility: number;
    /**
     * Swap touch actions so that one touch is used for rotation and multiple for movement
     */
    singleFingerRotate: boolean;
    private _offsetX;
    private _offsetY;
    private _pointerPressed;
    private _pointerInput?;
    private _observer;
    private _onLostFocus;
    private _isSafari;
    /**
     * Manage the touch inputs to control the movement of a free camera.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/customizingCameraInputs
     * @param allowMouse Defines if mouse events can be treated as touch events
     */
    constructor(
    /**
     * Define if mouse events can be treated as touch events
     */
    allowMouse?: boolean);
    /**
     * Attach the input controls to a specific dom element to get the input from.
     * @param noPreventDefault Defines whether event caught by the controls should call preventdefault() (https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
     */
    attachControl(noPreventDefault?: boolean): void;
    /**
     * Detach the current controls from the specified dom element.
     */
    detachControl(): void;
    /**
     * Update the current camera state depending on the inputs that have been used this frame.
     * This is a dynamically created lambda to avoid the performance penalty of looping for inputs in the render loop.
     */
    checkInputs(): void;
    /**
     * Gets the class name of the current input.
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Get the friendly name associated with the input class.
     * @returns the input friendly name
     */
    getSimpleName(): string;
}
