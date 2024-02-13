import type { FollowCamera } from "../../Cameras/followCamera";
import type { ICameraInput } from "../../Cameras/cameraInputsManager";
/**
 * Manage the mouse wheel inputs to control a follow camera.
 * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/customizingCameraInputs
 */
export declare class FollowCameraMouseWheelInput implements ICameraInput<FollowCamera> {
    /**
     * Defines the camera the input is attached to.
     */
    camera: FollowCamera;
    /**
     * Moue wheel controls zoom. (Mouse wheel modifies camera.radius value.)
     */
    axisControlRadius: boolean;
    /**
     * Moue wheel controls height. (Mouse wheel modifies camera.heightOffset value.)
     */
    axisControlHeight: boolean;
    /**
     * Moue wheel controls angle. (Mouse wheel modifies camera.rotationOffset value.)
     */
    axisControlRotation: boolean;
    /**
     * Gets or Set the mouse wheel precision or how fast is the camera moves in
     * relation to mouseWheel events.
     */
    wheelPrecision: number;
    /**
     * wheelDeltaPercentage will be used instead of wheelPrecision if different from 0.
     * It defines the percentage of current camera.radius to use as delta when wheel is used.
     */
    wheelDeltaPercentage: number;
    private _wheel;
    private _observer;
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
     * Get the friendly name associated with the input class.
     * @returns the input friendly name
     */
    getSimpleName(): string;
}
