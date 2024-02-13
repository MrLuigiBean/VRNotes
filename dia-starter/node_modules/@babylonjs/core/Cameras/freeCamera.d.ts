import { Vector3 } from "../Maths/math.vector";
import type { AbstractMesh } from "../Meshes/abstractMesh";
import type { Scene } from "../scene";
import { TargetCamera } from "./targetCamera";
import { FreeCameraInputsManager } from "./freeCameraInputsManager";
/**
 * This represents a free type of camera. It can be useful in First Person Shooter game for instance.
 * Please consider using the new UniversalCamera instead as it adds more functionality like the gamepad.
 * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/camera_introduction#universal-camera
 */
export declare class FreeCamera extends TargetCamera {
    /**
     * Define the collision ellipsoid of the camera.
     * This is helpful to simulate a camera body like the player body around the camera
     * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/camera_collisions#arcrotatecamera
     */
    ellipsoid: Vector3;
    /**
     * Define an offset for the position of the ellipsoid around the camera.
     * This can be helpful to determine the center of the body near the gravity center of the body
     * instead of its head.
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
     * Define the input manager associated to the camera.
     */
    inputs: FreeCameraInputsManager;
    /**
     * Gets the input sensibility for a mouse input. (default is 2000.0)
     * Higher values reduce sensitivity.
     */
    get angularSensibility(): number;
    /**
     * Sets the input sensibility for a mouse input. (default is 2000.0)
     * Higher values reduce sensitivity.
     */
    set angularSensibility(value: number);
    /**
     * Gets or Set the list of keyboard keys used to control the forward move of the camera.
     */
    get keysUp(): number[];
    set keysUp(value: number[]);
    /**
     * Gets or Set the list of keyboard keys used to control the upward move of the camera.
     */
    get keysUpward(): number[];
    set keysUpward(value: number[]);
    /**
     * Gets or Set the list of keyboard keys used to control the backward move of the camera.
     */
    get keysDown(): number[];
    set keysDown(value: number[]);
    /**
     * Gets or Set the list of keyboard keys used to control the downward move of the camera.
     */
    get keysDownward(): number[];
    set keysDownward(value: number[]);
    /**
     * Gets or Set the list of keyboard keys used to control the left strafe move of the camera.
     */
    get keysLeft(): number[];
    set keysLeft(value: number[]);
    /**
     * Gets or Set the list of keyboard keys used to control the right strafe move of the camera.
     */
    get keysRight(): number[];
    set keysRight(value: number[]);
    /**
     * Gets or Set the list of keyboard keys used to control the left rotation move of the camera.
     */
    get keysRotateLeft(): number[];
    set keysRotateLeft(value: number[]);
    /**
     * Gets or Set the list of keyboard keys used to control the right rotation move of the camera.
     */
    get keysRotateRight(): number[];
    set keysRotateRight(value: number[]);
    /**
     * Gets or Set the list of keyboard keys used to control the up rotation move of the camera.
     */
    get keysRotateUp(): number[];
    set keysRotateUp(value: number[]);
    /**
     * Gets or Set the list of keyboard keys used to control the down rotation move of the camera.
     */
    get keysRotateDown(): number[];
    set keysRotateDown(value: number[]);
    /**
     * Event raised when the camera collide with a mesh in the scene.
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
     * Instantiates a Free Camera.
     * This represents a free type of camera. It can be useful in First Person Shooter game for instance.
     * Please consider using the new UniversalCamera instead as it adds more functionality like touch to this camera.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/camera_introduction#universal-camera
     * @param name Define the name of the camera in the scene
     * @param position Define the start position of the camera in the scene
     * @param scene Define the scene the camera belongs to
     * @param setActiveOnSceneIfNoneActive Defines whether the camera should be marked as active if not other active cameras have been defined
     */
    constructor(name: string, position: Vector3, scene?: Scene, setActiveOnSceneIfNoneActive?: boolean);
    /**
     * Attach the input controls to a specific dom element to get the input from.
     * @param noPreventDefault Defines whether event caught by the controls should call preventdefault() (https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
     */
    attachControl(noPreventDefault?: boolean): void;
    /**
     * Attach the input controls to a specific dom element to get the input from.
     * @param ignored defines an ignored parameter kept for backward compatibility.
     * @param noPreventDefault Defines whether event caught by the controls should call preventdefault() (https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
     * BACK COMPAT SIGNATURE ONLY.
     */
    attachControl(ignored: any, noPreventDefault?: boolean): void;
    /**
     * Detach the current controls from the specified dom element.
     */
    detachControl(): void;
    private _collisionMask;
    /**
     * Define a collision mask to limit the list of object the camera can collide with
     */
    get collisionMask(): number;
    set collisionMask(mask: number);
    /**
     * @internal
     */
    _collideWithWorld(displacement: Vector3): void;
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
     * Destroy the camera and release the current resources hold by it.
     */
    dispose(): void;
    /**
     * Gets the current object class name.
     * @returns the class name
     */
    getClassName(): string;
}
