import type { Scene } from "../scene";
import type { Quaternion } from "../Maths/math.vector";
import { Vector3 } from "../Maths/math.vector";
import type { AbstractMesh } from "../Meshes/abstractMesh";
import { TargetCamera } from "./targetCamera";
import { FlyCameraInputsManager } from "./flyCameraInputsManager";
/**
 * This is a flying camera, designed for 3D movement and rotation in all directions,
 * such as in a 3D Space Shooter or a Flight Simulator.
 */
export declare class FlyCamera extends TargetCamera {
    /**
     * Define the collision ellipsoid of the camera.
     * This is helpful for simulating a camera body, like a player's body.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/camera_collisions#arcrotatecamera
     */
    ellipsoid: Vector3;
    /**
     * Define an offset for the position of the ellipsoid around the camera.
     * This can be helpful if the camera is attached away from the player's body center,
     * such as at its head.
     */
    ellipsoidOffset: Vector3;
    /**
     * Enable or disable collisions of the camera with the rest of the scene objects.
     */
    checkCollisions: boolean;
    /**
     * Enable or disable gravity on the camera.
     */
    applyGravity: boolean;
    /**
     * Define the current direction the camera is moving to.
     */
    cameraDirection: Vector3;
    /**
     * Define the current local rotation of the camera as a quaternion to prevent Gimbal lock.
     * This overrides and empties cameraRotation.
     */
    rotationQuaternion: Quaternion;
    /**
     * Track Roll to maintain the wanted Rolling when looking around.
     */
    _trackRoll: number;
    /**
     * Slowly correct the Roll to its original value after a Pitch+Yaw rotation.
     */
    rollCorrect: number;
    /**
     * Mimic a banked turn, Rolling the camera when Yawing.
     * It's recommended to use rollCorrect = 10 for faster banking correction.
     */
    bankedTurn: boolean;
    /**
     * Limit in radians for how much Roll banking will add. (Default: 90°)
     */
    bankedTurnLimit: number;
    /**
     * Value of 0 disables the banked Roll.
     * Value of 1 is equal to the Yaw angle in radians.
     */
    bankedTurnMultiplier: number;
    /**
     * The inputs manager loads all the input sources, such as keyboard and mouse.
     */
    inputs: FlyCameraInputsManager;
    /**
     * Gets the input sensibility for mouse input.
     * Higher values reduce sensitivity.
     */
    get angularSensibility(): number;
    /**
     * Sets the input sensibility for a mouse input.
     * Higher values reduce sensitivity.
     */
    set angularSensibility(value: number);
    /**
     * Get the keys for camera movement forward.
     */
    get keysForward(): number[];
    /**
     * Set the keys for camera movement forward.
     */
    set keysForward(value: number[]);
    /**
     * Get the keys for camera movement backward.
     */
    get keysBackward(): number[];
    set keysBackward(value: number[]);
    /**
     * Get the keys for camera movement up.
     */
    get keysUp(): number[];
    /**
     * Set the keys for camera movement up.
     */
    set keysUp(value: number[]);
    /**
     * Get the keys for camera movement down.
     */
    get keysDown(): number[];
    /**
     * Set the keys for camera movement down.
     */
    set keysDown(value: number[]);
    /**
     * Get the keys for camera movement left.
     */
    get keysLeft(): number[];
    /**
     * Set the keys for camera movement left.
     */
    set keysLeft(value: number[]);
    /**
     * Set the keys for camera movement right.
     */
    get keysRight(): number[];
    /**
     * Set the keys for camera movement right.
     */
    set keysRight(value: number[]);
    /**
     * Event raised when the camera collides with a mesh in the scene.
     */
    onCollide: (collidedMesh: AbstractMesh) => void;
    private _collider;
    private _needMoveForGravity;
    private _oldPosition;
    private _diffPosition;
    private _newPosition;
    /** @internal */
    _localDirection: Vector3;
    /** @internal */
    _transformedDirection: Vector3;
    /**
     * Instantiates a FlyCamera.
     * This is a flying camera, designed for 3D movement and rotation in all directions,
     * such as in a 3D Space Shooter or a Flight Simulator.
     * @param name Define the name of the camera in the scene.
     * @param position Define the starting position of the camera in the scene.
     * @param scene Define the scene the camera belongs to.
     * @param setActiveOnSceneIfNoneActive Defines whether the camera should be marked as active, if no other camera has been defined as active.
     */
    constructor(name: string, position: Vector3, scene?: Scene, setActiveOnSceneIfNoneActive?: boolean);
    /**
     * Attach the input controls to a specific dom element to get the input from.
     * @param noPreventDefault Defines whether event caught by the controls should call preventdefault() (https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
     */
    attachControl(noPreventDefault?: boolean): void;
    /**
     * Detach a control from the HTML DOM element.
     * The camera will stop reacting to that input.
     */
    detachControl(): void;
    private _collisionMask;
    /**
     * Get the mask that the camera ignores in collision events.
     */
    get collisionMask(): number;
    /**
     * Set the mask that the camera ignores in collision events.
     */
    set collisionMask(mask: number);
    /**
     * @internal
     */
    _collideWithWorld(displacement: Vector3): void;
    /**
     * @internal
     */
    private _onCollisionPositionChange;
    /** @internal */
    _checkInputs(): void;
    /**
     * Enable movement without a user input. This allows gravity to always be applied.
     */
    set needMoveForGravity(value: boolean);
    /**
     * When true, gravity is applied whether there is user input or not.
     */
    get needMoveForGravity(): boolean;
    /** @internal */
    _decideIfNeedsToMove(): boolean;
    /** @internal */
    _updatePosition(): void;
    /**
     * Restore the Roll to its target value at the rate specified.
     * @param rate - Higher means slower restoring.
     * @internal
     */
    restoreRoll(rate: number): void;
    /**
     * Destroy the camera and release the current resources held by it.
     */
    dispose(): void;
    /**
     * Get the current object class name.
     * @returns the class name.
     */
    getClassName(): string;
}
