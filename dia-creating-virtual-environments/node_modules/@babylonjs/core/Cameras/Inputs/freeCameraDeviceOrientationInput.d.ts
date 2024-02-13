import type { Nullable } from "../../types";
import type { ICameraInput } from "../../Cameras/cameraInputsManager";
import type { FreeCamera } from "../../Cameras/freeCamera";
import { Observable } from "../../Misc/observable";
declare module "../../Cameras/freeCameraInputsManager" {
    interface FreeCameraInputsManager {
        /**
         * @internal
         */
        _deviceOrientationInput: Nullable<FreeCameraDeviceOrientationInput>;
        /**
         * Add orientation input support to the input manager.
         * @param smoothFactor deviceOrientation smoothing. 0: no smoothing, 1: new data ignored, 0.9 recommended for smoothing
         * @returns the current input manager
         */
        addDeviceOrientation(smoothFactor?: number): FreeCameraInputsManager;
    }
}
/**
 * Takes information about the orientation of the device as reported by the deviceorientation event to orient the camera.
 * Screen rotation is taken into account.
 * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/customizingCameraInputs
 */
export declare class FreeCameraDeviceOrientationInput implements ICameraInput<FreeCamera> {
    private _camera;
    private _screenOrientationAngle;
    private _constantTranform;
    private _screenQuaternion;
    private _alpha;
    private _beta;
    private _gamma;
    /** alpha+beta+gamma smoothing. 0: no smoothing, 1: new data ignored, 0.9 recommended for smoothing */
    smoothFactor: number;
    /**
     * Can be used to detect if a device orientation sensor is available on a device
     * @param timeout amount of time in milliseconds to wait for a response from the sensor (default: infinite)
     * @returns a promise that will resolve on orientation change
     */
    static WaitForOrientationChangeAsync(timeout?: number): Promise<void>;
    /**
     * @internal
     */
    _onDeviceOrientationChangedObservable: Observable<void>;
    /**
     * Instantiates a new input
     * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/customizingCameraInputs
     */
    constructor();
    /**
     * Define the camera controlled by the input.
     */
    get camera(): FreeCamera;
    set camera(camera: FreeCamera);
    /**
     * Attach the input controls to a specific dom element to get the input from.
     */
    attachControl(): void;
    private _orientationChanged;
    private _deviceOrientation;
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
