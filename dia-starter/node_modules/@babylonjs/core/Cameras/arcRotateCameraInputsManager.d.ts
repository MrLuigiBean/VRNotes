import type { ArcRotateCamera } from "./arcRotateCamera";
import { CameraInputsManager } from "../Cameras/cameraInputsManager";
/**
 * Default Inputs manager for the ArcRotateCamera.
 * It groups all the default supported inputs for ease of use.
 * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/customizingCameraInputs
 */
export declare class ArcRotateCameraInputsManager extends CameraInputsManager<ArcRotateCamera> {
    /**
     * Instantiates a new ArcRotateCameraInputsManager.
     * @param camera Defines the camera the inputs belong to
     */
    constructor(camera: ArcRotateCamera);
    /**
     * Add mouse wheel input support to the input manager.
     * @returns the current input manager
     */
    addMouseWheel(): ArcRotateCameraInputsManager;
    /**
     * Add pointers input support to the input manager.
     * @returns the current input manager
     */
    addPointers(): ArcRotateCameraInputsManager;
    /**
     * Add keyboard input support to the input manager.
     * @returns the current input manager
     */
    addKeyboard(): ArcRotateCameraInputsManager;
}
