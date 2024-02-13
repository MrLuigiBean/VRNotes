import { TouchCamera } from "./touchCamera";
import type { Scene } from "../scene";
import { Vector3 } from "../Maths/math.vector";
import "../Gamepads/gamepadSceneComponent";
/**
 * The Universal Camera is the one to choose for first person shooter type games, and works with all the keyboard, mouse, touch and gamepads. This replaces the earlier Free Camera,
 * which still works and will still be found in many Playgrounds.
 * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/camera_introduction#universal-camera
 */
export declare class UniversalCamera extends TouchCamera {
    /**
     * Defines the gamepad rotation sensibility.
     * This is the threshold from when rotation starts to be accounted for to prevent jittering.
     */
    get gamepadAngularSensibility(): number;
    set gamepadAngularSensibility(value: number);
    /**
     * Defines the gamepad move sensibility.
     * This is the threshold from when moving starts to be accounted for to prevent jittering.
     */
    get gamepadMoveSensibility(): number;
    set gamepadMoveSensibility(value: number);
    /**
     * The Universal Camera is the one to choose for first person shooter type games, and works with all the keyboard, mouse, touch and gamepads. This replaces the earlier Free Camera,
     * which still works and will still be found in many Playgrounds.
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
}
