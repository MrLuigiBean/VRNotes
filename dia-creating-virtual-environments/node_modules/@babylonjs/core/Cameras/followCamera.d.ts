import type { Nullable } from "../types";
import { TargetCamera } from "./targetCamera";
import type { Scene } from "../scene";
import { Vector3 } from "../Maths/math.vector";
import type { AbstractMesh } from "../Meshes/abstractMesh";
import { FollowCameraInputsManager } from "./followCameraInputsManager";
/**
 * A follow camera takes a mesh as a target and follows it as it moves. Both a free camera version followCamera and
 * an arc rotate version arcFollowCamera are available.
 * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/camera_introduction#followcamera
 */
export declare class FollowCamera extends TargetCamera {
    /**
     * Distance the follow camera should follow an object at
     */
    radius: number;
    /**
     * Minimum allowed distance of the camera to the axis of rotation
     * (The camera can not get closer).
     * This can help limiting how the Camera is able to move in the scene.
     */
    lowerRadiusLimit: Nullable<number>;
    /**
     * Maximum allowed distance of the camera to the axis of rotation
     * (The camera can not get further).
     * This can help limiting how the Camera is able to move in the scene.
     */
    upperRadiusLimit: Nullable<number>;
    /**
     * Define a rotation offset between the camera and the object it follows
     */
    rotationOffset: number;
    /**
     * Minimum allowed angle to camera position relative to target object.
     * This can help limiting how the Camera is able to move in the scene.
     */
    lowerRotationOffsetLimit: Nullable<number>;
    /**
     * Maximum allowed angle to camera position relative to target object.
     * This can help limiting how the Camera is able to move in the scene.
     */
    upperRotationOffsetLimit: Nullable<number>;
    /**
     * Define a height offset between the camera and the object it follows.
     * It can help following an object from the top (like a car chasing a plane)
     */
    heightOffset: number;
    /**
     * Minimum allowed height of camera position relative to target object.
     * This can help limiting how the Camera is able to move in the scene.
     */
    lowerHeightOffsetLimit: Nullable<number>;
    /**
     * Maximum allowed height of camera position relative to target object.
     * This can help limiting how the Camera is able to move in the scene.
     */
    upperHeightOffsetLimit: Nullable<number>;
    /**
     * Define how fast the camera can accelerate to follow it s target.
     */
    cameraAcceleration: number;
    /**
     * Define the speed limit of the camera following an object.
     */
    maxCameraSpeed: number;
    /**
     * Define the target of the camera.
     */
    lockedTarget: Nullable<AbstractMesh>;
    /**
     * Defines the input associated with the camera.
     */
    inputs: FollowCameraInputsManager;
    /**
     * Instantiates the follow camera.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/camera_introduction#followcamera
     * @param name Define the name of the camera in the scene
     * @param position Define the position of the camera
     * @param scene Define the scene the camera belong to
     * @param lockedTarget Define the target of the camera
     */
    constructor(name: string, position: Vector3, scene?: Scene, lockedTarget?: Nullable<AbstractMesh>);
    private _follow;
    /**
     * Attach the input controls to a specific dom element to get the input from.
     * @param noPreventDefault Defines whether event caught by the controls should call preventdefault() (https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
     */
    attachControl(noPreventDefault?: boolean): void;
    /**
     * Detach the current controls from the specified dom element.
     */
    detachControl(): void;
    /** @internal */
    _checkInputs(): void;
    private _checkLimits;
    /**
     * Gets the camera class name.
     * @returns the class name
     */
    getClassName(): string;
}
/**
 * Arc Rotate version of the follow camera.
 * It still follows a Defined mesh but in an Arc Rotate Camera fashion.
 * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/camera_introduction#followcamera
 */
export declare class ArcFollowCamera extends TargetCamera {
    /** The longitudinal angle of the camera */
    alpha: number;
    /** The latitudinal angle of the camera */
    beta: number;
    /** The radius of the camera from its target */
    radius: number;
    private _cartesianCoordinates;
    /** Define the camera target (the mesh it should follow) */
    private _meshTarget;
    /**
     * Instantiates a new ArcFollowCamera
     * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/camera_introduction#followcamera
     * @param name Define the name of the camera
     * @param alpha Define the rotation angle of the camera around the longitudinal axis
     * @param beta Define the rotation angle of the camera around the elevation axis
     * @param radius Define the radius of the camera from its target point
     * @param target Define the target of the camera
     * @param scene Define the scene the camera belongs to
     */
    constructor(name: string, 
    /** The longitudinal angle of the camera */
    alpha: number, 
    /** The latitudinal angle of the camera */
    beta: number, 
    /** The radius of the camera from its target */
    radius: number, 
    /** Define the camera target (the mesh it should follow) */
    target: Nullable<AbstractMesh>, scene: Scene);
    /**
     * Sets the mesh to follow with this camera.
     * @param target the target to follow
     */
    setMeshTarget(target: Nullable<AbstractMesh>): void;
    private _follow;
    /** @internal */
    _checkInputs(): void;
    /**
     * Returns the class name of the object.
     * It is mostly used internally for serialization purposes.
     */
    getClassName(): string;
}
