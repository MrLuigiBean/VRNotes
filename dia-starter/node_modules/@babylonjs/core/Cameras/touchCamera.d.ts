import { FreeCamera } from "./freeCamera";
import type { Scene } from "../scene";
import { Vector3 } from "../Maths/math.vector";
/**
 * This represents a FPS type of camera controlled by touch.
 * This is like a universal camera minus the Gamepad controls.
 * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/camera_introduction#universal-camera
 */
export declare class TouchCamera extends FreeCamera {
    /**
     * Defines the touch sensibility for rotation.
     * The higher the faster.
     */
    get touchAngularSensibility(): number;
    set touchAngularSensibility(value: number);
    /**
     * Defines the touch sensibility for move.
     * The higher the faster.
     */
    get touchMoveSensibility(): number;
    set touchMoveSensibility(value: number);
    /**
     * Instantiates a new touch camera.
     * This represents a FPS type of camera controlled by touch.
     * This is like a universal camera minus the Gamepad controls.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/camera_introduction#universal-camera
     * @param name Define the name of the camera in the scene
     * @param position Define the start position of the camera in the scene
     * @param scene Define the scene the camera belongs to
     */
    constructor(name: string, position: Vector3, scene?: Scene);
    /**
     * Gets the current object class name.
     * @returns the class name
     */
    getClassName(): string;
    /** @internal */
    _setupInputs(): void;
}
