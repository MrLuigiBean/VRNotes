import { Camera } from "../../Cameras/camera";
import { UniversalCamera } from "../../Cameras/universalCamera";
import type { Scene } from "../../scene";
import { Vector3 } from "../../Maths/math.vector";
import type { Nullable } from "../../types";
/**
 * Camera used to simulate stereoscopic rendering on real screens (based on UniversalCamera)
 * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras
 */
export declare class StereoscopicScreenUniversalCamera extends UniversalCamera {
    private _distanceToProjectionPlane;
    private _distanceBetweenEyes;
    set distanceBetweenEyes(newValue: number);
    /**
     * distance between the eyes
     */
    get distanceBetweenEyes(): number;
    set distanceToProjectionPlane(newValue: number);
    /**
     * Distance to projection plane (should be the same units the like distance between the eyes)
     */
    get distanceToProjectionPlane(): number;
    /**
     * Creates a new StereoscopicScreenUniversalCamera
     * @param name defines camera name
     * @param position defines initial position
     * @param scene defines the hosting scene
     * @param distanceToProjectionPlane defines distance between each color axis. The rig cameras will receive this as their negative z position!
     * @param distanceBetweenEyes defines is stereoscopic is done side by side or over under
     */
    constructor(name: string, position: Vector3, scene?: Scene, distanceToProjectionPlane?: number, distanceBetweenEyes?: number);
    /**
     * Gets camera class name
     * @returns StereoscopicScreenUniversalCamera
     */
    getClassName(): string;
    /**
     * @internal
     */
    createRigCamera(name: string): Nullable<Camera>;
    /**
     * @internal
     */
    _updateRigCameras(): void;
    private _updateCamera;
    protected _setRigMode(): void;
}
