import type { ICameraInput } from "../../Cameras/cameraInputsManager";
import type { FlyCamera } from "../../Cameras/flyCamera";
/**
 * Listen to mouse events to control the camera.
 * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/customizingCameraInputs
 */
export declare class FlyCameraMouseInput implements ICameraInput<FlyCamera> {
    /**
     * Defines the camera the input is attached to.
     */
    camera: FlyCamera;
    /**
     * Defines if touch is enabled. (Default is true.)
     */
    touchEnabled: boolean;
    /**
     * Defines the buttons associated with the input to handle camera rotation.
     */
    buttons: number[];
    /**
     * Assign buttons for Yaw control.
     */
    buttonsYaw: number[];
    /**
     * Assign buttons for Pitch control.
     */
    buttonsPitch: number[];
    /**
     * Assign buttons for Roll control.
     */
    buttonsRoll: number[];
    /**
     * Detect if any button is being pressed while mouse is moved.
     * -1 = Mouse locked.
     * 0 = Left button.
     * 1 = Middle Button.
     * 2 = Right Button.
     */
    activeButton: number;
    /**
     * Defines the pointer's angular sensibility, to control the camera rotation speed.
     * Higher values reduce its sensitivity.
     */
    angularSensibility: number;
    private _observer;
    private _rollObserver;
    private _previousPosition;
    private _noPreventDefault;
    private _element;
    /**
     * Listen to mouse events to control the camera.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/customizingCameraInputs
     */
    constructor();
    /**
     * Attach the mouse control to the HTML DOM element.
     * @param noPreventDefault Defines whether events caught by the controls should call preventdefault().
     */
    attachControl(noPreventDefault?: boolean): void;
    /**
     * Detach the current controls from the specified dom element.
     */
    detachControl(): void;
    /**
     * Gets the class name of the current input.
     * @returns the class name.
     */
    getClassName(): string;
    /**
     * Get the friendly name associated with the input class.
     * @returns the input's friendly name.
     */
    getSimpleName(): string;
    private _pointerInput;
    private _onMouseMove;
    /**
     * Rotate camera by mouse offset.
     * @param offsetX
     * @param offsetY
     */
    private _rotateCamera;
}
