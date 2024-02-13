import { ArcRotateCamera } from "../../Cameras/arcRotateCamera";
import type { Scene } from "../../scene";
import { Vector3 } from "../../Maths/math.vector";
/**
 * Camera used to simulate stereoscopic rendering (based on ArcRotateCamera)
 * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras
 */
export declare class StereoscopicArcRotateCamera extends ArcRotateCamera {
    /**
     * Creates a new StereoscopicArcRotateCamera
     * @param name defines camera name
     * @param alpha defines alpha angle (in radians)
     * @param beta defines beta angle (in radians)
     * @param radius defines radius
     * @param target defines camera target
     * @param interaxialDistance defines distance between each color axis
     * @param isStereoscopicSideBySide defines is stereoscopic is done side by side or over under
     * @param scene defines the hosting scene
     */
    constructor(name: string, alpha: number, beta: number, radius: number, target: Vector3, interaxialDistance: number, isStereoscopicSideBySide: boolean, scene?: Scene);
    /**
     * Gets camera class name
     * @returns StereoscopicArcRotateCamera
     */
    getClassName(): string;
    protected _setRigMode: () => void;
}
