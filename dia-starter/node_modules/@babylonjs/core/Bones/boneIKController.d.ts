import type { Bone } from "./bone";
import { Vector3 } from "../Maths/math.vector";
import type { TransformNode } from "../Meshes/transformNode";
import type { Nullable } from "../types";
/**
 * Class used to apply inverse kinematics to bones
 * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/bonesSkeletons#boneikcontroller
 */
export declare class BoneIKController {
    private static _TmpVecs;
    private static _TmpQuat;
    private static _TmpMats;
    /**
     * Gets or sets the target TransformNode
     * Name kept as mesh for back compatibility
     */
    targetMesh: TransformNode;
    /** Gets or sets the mesh used as pole */
    poleTargetMesh: TransformNode;
    /**
     * Gets or sets the bone used as pole
     */
    poleTargetBone: Nullable<Bone>;
    /**
     * Gets or sets the target position
     */
    targetPosition: Vector3;
    /**
     * Gets or sets the pole target position
     */
    poleTargetPosition: Vector3;
    /**
     * Gets or sets the pole target local offset
     */
    poleTargetLocalOffset: Vector3;
    /**
     * Gets or sets the pole angle
     */
    poleAngle: number;
    /**
     * Gets or sets the TransformNode associated with the controller
     * Name kept as mesh for back compatibility
     */
    mesh: TransformNode;
    /**
     * The amount to slerp (spherical linear interpolation) to the target.  Set this to a value between 0 and 1 (a value of 1 disables slerp)
     */
    slerpAmount: number;
    private _bone1Quat;
    private _bone1Mat;
    private _bone2Ang;
    private _bone1;
    private _bone2;
    private _bone1Length;
    private _bone2Length;
    private _maxAngle;
    private _maxReach;
    private _rightHandedSystem;
    private _bendAxis;
    private _slerping;
    private _adjustRoll;
    private _notEnoughInformation;
    /**
     * Gets or sets maximum allowed angle
     */
    get maxAngle(): number;
    set maxAngle(value: number);
    /**
     * Creates a new BoneIKController
     * @param mesh defines the TransformNode to control
     * @param bone defines the bone to control. The bone needs to have a parent bone. It also needs to have a length greater than 0 or a children we can use to infer its length.
     * @param options defines options to set up the controller
     * @param options.targetMesh
     * @param options.poleTargetMesh
     * @param options.poleTargetBone
     * @param options.poleTargetLocalOffset
     * @param options.poleAngle
     * @param options.bendAxis
     * @param options.maxAngle
     * @param options.slerpAmount
     */
    constructor(mesh: TransformNode, bone: Bone, options?: {
        targetMesh?: TransformNode;
        poleTargetMesh?: TransformNode;
        poleTargetBone?: Bone;
        poleTargetLocalOffset?: Vector3;
        poleAngle?: number;
        bendAxis?: Vector3;
        maxAngle?: number;
        slerpAmount?: number;
    });
    private _setMaxAngle;
    /**
     * Force the controller to update the bones
     */
    update(): void;
    private _updateLinkedTransformRotation;
}
