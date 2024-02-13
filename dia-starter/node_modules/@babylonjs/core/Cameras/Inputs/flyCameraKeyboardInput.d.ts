import type { ICameraInput } from "../../Cameras/cameraInputsManager";
import type { FlyCamera } from "../../Cameras/flyCamera";
/**
 * Listen to keyboard events to control the camera.
 * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/customizingCameraInputs
 */
export declare class FlyCameraKeyboardInput implements ICameraInput<FlyCamera> {
    /**
     * Defines the camera the input is attached to.
     */
    camera: FlyCamera;
    /**
     * The list of keyboard keys used to control the forward move of the camera.
     */
    keysForward: number[];
    /**
     * The list of keyboard keys used to control the backward move of the camera.
     */
    keysBackward: number[];
    /**
     * The list of keyboard keys used to control the forward move of the camera.
     */
    keysUp: number[];
    /**
     * The list of keyboard keys used to control the backward move of the camera.
     */
    keysDown: number[];
    /**
     * The list of keyboard keys used to control the right strafe move of the camera.
     */
    keysRight: number[];
    /**
     * The list of keyboard keys used to control the left strafe move of the camera.
     */
    keysLeft: number[];
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
     * Gets the class name of the current input.
     * @returns the class name
     */
    getClassName(): string;
    /**
     * @internal
     */
    _onLostFocus(): void;
    /**
     * Get the friendly name associated with the input class.
     * @returns the input friendly name
     */
    getSimpleName(): string;
    /**
     * Update the current camera state depending on the inputs that have been used this frame.
     * This is a dynamically created lambda to avoid the performance penalty of looping for inputs in the render loop.
     */
    checkInputs(): void;
}
