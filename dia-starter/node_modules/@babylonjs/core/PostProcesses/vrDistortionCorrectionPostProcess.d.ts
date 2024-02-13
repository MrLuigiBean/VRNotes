import type { Camera } from "../Cameras/camera";
import type { VRCameraMetrics } from "../Cameras/VR/vrCameraMetrics";
import { PostProcess } from "./postProcess";
import "../Shaders/vrDistortionCorrection.fragment";
import type { Nullable } from "../types";
/**
 * VRDistortionCorrectionPostProcess used for mobile VR
 */
export declare class VRDistortionCorrectionPostProcess extends PostProcess {
    private _isRightEye;
    private _distortionFactors;
    private _postProcessScaleFactor;
    private _lensCenterOffset;
    private _scaleIn;
    private _scaleFactor;
    private _lensCenter;
    /**
     * Gets a string identifying the name of the class
     * @returns "VRDistortionCorrectionPostProcess" string
     */
    getClassName(): string;
    /**
     * Initializes the VRDistortionCorrectionPostProcess
     * @param name The name of the effect.
     * @param camera The camera to apply the render pass to.
     * @param isRightEye If this is for the right eye distortion
     * @param vrMetrics All the required metrics for the VR camera
     */
    constructor(name: string, camera: Nullable<Camera>, isRightEye: boolean, vrMetrics: VRCameraMetrics);
}
