import { Observable } from "../../Misc/observable";
import type { Camera } from "../../Cameras/camera";
import type { ICameraInput } from "../../Cameras/cameraInputsManager";
/**
 * Base class for mouse wheel input..
 * See FollowCameraMouseWheelInput in src/Cameras/Inputs/freeCameraMouseWheelInput.ts
 * for example usage.
 */
export declare abstract class BaseCameraMouseWheelInput implements ICameraInput<Camera> {
    /**
     * Defines the camera the input is attached to.
     */
    abstract camera: Camera;
    /**
     * How fast is the camera moves in relation to X axis mouseWheel events.
     * Use negative value to reverse direction.
     */
    wheelPrecisionX: number;
    /**
     * How fast is the camera moves in relation to Y axis mouseWheel events.
     * Use negative value to reverse direction.
     */
    wheelPrecisionY: number;
    /**
     * How fast is the camera moves in relation to Z axis mouseWheel events.
     * Use negative value to reverse direction.
     */
    wheelPrecisionZ: number;
    /**
     * Observable for when a mouse wheel move event occurs.
     */
    onChangedObservable: Observable<{
        wheelDeltaX: number;
        wheelDeltaY: number;
        wheelDeltaZ: number;
    }>;
    private _wheel;
    private _observer;
    /**
     * Attach the input controls to a specific dom element to get the input from.
     * @param noPreventDefault Defines whether event caught by the controls
     *   should call preventdefault().
     *   (https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
     */
    attachControl(noPreventDefault?: boolean): void;
    /**
     * Detach the current controls from the specified dom element.
     */
    detachControl(): void;
    /**
     * Called for each rendered frame.
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
    /**
     * Incremental value of multiple mouse wheel movements of the X axis.
     * Should be zero-ed when read.
     */
    protected _wheelDeltaX: number;
    /**
     * Incremental value of multiple mouse wheel movements of the Y axis.
     * Should be zero-ed when read.
     */
    protected _wheelDeltaY: number;
    /**
     * Incremental value of multiple mouse wheel movements of the Z axis.
     * Should be zero-ed when read.
     */
    protected _wheelDeltaZ: number;
    /**
     * Firefox uses a different scheme to report scroll distances to other
     * browsers. Rather than use complicated methods to calculate the exact
     * multiple we need to apply, let's just cheat and use a constant.
     * https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent/deltaMode
     * https://stackoverflow.com/questions/20110224/what-is-the-height-of-a-line-in-a-wheel-event-deltamode-dom-delta-line
     */
    private readonly _ffMultiplier;
    /**
     * Different event attributes for wheel data fall into a few set ranges.
     * Some relevant but dated date here:
     * https://stackoverflow.com/questions/5527601/normalizing-mousewheel-speed-across-browsers
     */
    private readonly _normalize;
}
