import { DeviceOrientationCamera } from "../../Cameras/deviceOrientationCamera";
import { VRCameraMetrics } from "./vrCameraMetrics";
import type { Scene } from "../../scene";
import { Vector3 } from "../../Maths/math.vector";
/**
 * Camera used to simulate VR rendering (based on FreeCamera)
 * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/camera_introduction#vr-device-orientation-cameras
 */
export declare class VRDeviceOrientationFreeCamera extends DeviceOrientationCamera {
    /**
     * Creates a new VRDeviceOrientationFreeCamera
     * @param name defines camera name
     * @param position defines the start position of the camera
     * @param scene defines the scene the camera belongs to
     * @param compensateDistortion defines if the camera needs to compensate the lens distortion
     * @param vrCameraMetrics defines the vr metrics associated to the camera
     */
    constructor(name: string, position: Vector3, scene?: Scene, compensateDistortion?: boolean, vrCameraMetrics?: VRCameraMetrics);
    /**
     * Gets camera class name
     * @returns VRDeviceOrientationFreeCamera
     */
    getClassName(): string;
    protected _setRigMode: (rigParams: any) => void;
}
