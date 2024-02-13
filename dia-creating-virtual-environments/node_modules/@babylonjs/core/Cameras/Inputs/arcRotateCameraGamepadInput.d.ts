import type { Nullable } from "../../types";
import type { ArcRotateCamera } from "../../Cameras/arcRotateCamera";
import type { ICameraInput } from "../../Cameras/cameraInputsManager";
import { Gamepad } from "../../Gamepads/gamepad";
/**
 * Manage the gamepad inputs to control an arc rotate camera.
 * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/customizingCameraInputs
 */
export declare class ArcRotateCameraGamepadInput implements ICameraInput<ArcRotateCamera> {
    /**
     * Defines the camera the input is attached to.
     */
    camera: ArcRotateCamera;
    /**
     * Defines the gamepad the input is gathering event from.
     */
    gamepad: Nullable<Gamepad>;
    /**
     * Defines the gamepad rotation sensibility.
     * This is the threshold from when rotation starts to be accounted for to prevent jittering.
     */
    gamepadRotationSensibility: number;
    /**
     * Defines the gamepad move sensibility.
     * This is the threshold from when moving starts to be accounted for for to prevent jittering.
     */
    gamepadMoveSensibility: number;
    private _yAxisScale;
    /**
     * Gets or sets a boolean indicating that Yaxis (for right stick) should be inverted
     */
    get invertYAxis(): boolean;
    set invertYAxis(value: boolean);
    private _onGamepadConnectedObserver;
    private _onGamepadDisconnectedObserver;
    /**
     * Attach the input controls to a specific dom element to get the input from.
     */
    attachControl(): void;
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
     * Gets the class name of the current intput.
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Get the friendly name associated with the input class.
     * @returns the input friendly name
     */
    getSimpleName(): string;
}
