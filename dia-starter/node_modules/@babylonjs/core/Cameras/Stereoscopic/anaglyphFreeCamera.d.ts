import { FreeCamera } from "../../Cameras/freeCamera";
import type { Scene } from "../../scene";
import { Vector3 } from "../../Maths/math.vector";
/**
 * Camera used to simulate anaglyphic rendering (based on FreeCamera)
 * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/camera_introduction#anaglyph-cameras
 */
export declare class AnaglyphFreeCamera extends FreeCamera {
    /**
     * Creates a new AnaglyphFreeCamera
     * @param name defines camera name
     * @param position defines initial position
     * @param interaxialDistance defines distance between each color axis
     * @param scene defines the hosting scene
     */
    constructor(name: string, position: Vector3, interaxialDistance: number, scene?: Scene);
    /**
     * Gets camera class name
     * @returns AnaglyphFreeCamera
     */
    getClassName(): string;
    protected _setRigMode: () => void;
}
