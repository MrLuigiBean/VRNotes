import type { ICameraInput } from "../../Cameras/cameraInputsManager";
import type { FreeCamera } from "../../Cameras/freeCamera";
/**
 * Manage the keyboard inputs to control the movement of a free camera.
 * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/customizingCameraInputs
 */
export declare class FreeCameraKeyboardMoveInput implements ICameraInput<FreeCamera> {
    /**
     * Defines the camera the input is attached to.
     */
    camera: FreeCamera;
    /**
     * Gets or Set the list of keyboard keys used to control the forward move of the camera.
     */
    keysUp: number[];
    /**
     * Gets or Set the list of keyboard keys used to control the upward move of the camera.
     */
    keysUpward: number[];
    /**
     * Gets or Set the list of keyboard keys used to control the backward move of the camera.
     */
    keysDown: number[];
    /**
     * Gets or Set the list of keyboard keys used to control the downward move of the camera.
     */
    keysDownward: number[];
    /**
     * Gets or Set the list of keyboard keys used to control the left strafe move of the camera.
     */
    keysLeft: number[];
    /**
     * Gets or Set the list of keyboard keys used to control the right strafe move of the camera.
     */
    keysRight: number[];
    /**
     * Defines the pointer angular sensibility  along the X and Y axis or how fast is the camera rotating.
     */
    rotationSpeed: number;
    /**
     * Gets or Set the list of keyboard keys used to control the left rotation move of the camera.
     */
    keysRotateLeft: number[];
    /**
     * Gets or Set the list of keyboard keys used to control the right rotation move of the camera.
     */
    keysRotateRight: number[];
    /**
     * Gets or Set the list of keyboard keys used to control the up rotation move of the camera.
     */
    keysRotateUp: number[];
    /**
     * Gets or Set the list of keyboard keys used to control the down rotation move of the camera.
     */
    keysRotateDown: number[];
    private _keys;
    private _onCanvasBlurObserver;
    private _onKeyboardObserver;
    private _engine;
    private _scene;
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
    /** @internal */
    _onLostFocus(): void;
    /**
     * Get the friendly name associated with the input class.
     * @returns the input friendly name
     */
    getSimpleName(): string;
    private _getLocalRotation;
}
