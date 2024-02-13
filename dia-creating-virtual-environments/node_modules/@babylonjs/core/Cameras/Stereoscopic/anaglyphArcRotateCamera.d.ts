import { ArcRotateCamera } from "../../Cameras/arcRotateCamera";
import type { Scene } from "../../scene";
import { Vector3 } from "../../Maths/math.vector";
/**
 * Camera used to simulate anaglyphic rendering (based on ArcRotateCamera)
 * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/camera_introduction#anaglyph-cameras
 */
export declare class AnaglyphArcRotateCamera extends ArcRotateCamera {
    /**
     * Creates a new AnaglyphArcRotateCamera
     * @param name defines camera name
     * @param alpha defines alpha angle (in radians)
     * @param beta defines beta angle (in radians)
     * @param radius defines radius
     * @param target defines camera target
     * @param interaxialDistance defines distance between each color axis
     * @param scene defines the hosting scene
     */
    constructor(name: string, alpha: number, beta: number, radius: number, target: Vector3, interaxialDistance: number, scene?: Scene);
    /**
     * Gets camera class name
     * @returns AnaglyphArcRotateCamera
     */
    getClassName(): string;
    protected _setRigMode: () => void;
}
