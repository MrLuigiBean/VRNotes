import { CameraInputsManager } from "./cameraInputsManager";
import type { FollowCamera } from "./followCamera";
/**
 * Default Inputs manager for the FollowCamera.
 * It groups all the default supported inputs for ease of use.
 * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/customizingCameraInputs
 */
export declare class FollowCameraInputsManager extends CameraInputsManager<FollowCamera> {
    /**
     * Instantiates a new FollowCameraInputsManager.
     * @param camera Defines the camera the inputs belong to
     */
    constructor(camera: FollowCamera);
    /**
     * Add keyboard input support to the input manager.
     * @returns the current input manager
     */
    addKeyboard(): FollowCameraInputsManager;
    /**
     * Add mouse wheel input support to the input manager.
     * @returns the current input manager
     */
    addMouseWheel(): FollowCameraInputsManager;
    /**
     * Add pointers input support to the input manager.
     * @returns the current input manager
     */
    addPointers(): FollowCameraInputsManager;
    /**
     * Add orientation input support to the input manager.
     * @returns the current input manager
     */
    addVRDeviceOrientation(): FollowCameraInputsManager;
}
