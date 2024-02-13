import type { Skeleton } from "./skeleton";
import { Vector3, Quaternion, Matrix } from "../Maths/math.vector";
import type { Nullable } from "../types";
import type { TransformNode } from "../Meshes/transformNode";
import { Node } from "../node";
import { Space } from "../Maths/math.axis";
import type { Animation } from "../Animations/animation";
import type { AnimationPropertiesOverride } from "../Animations/animationPropertiesOverride";
/**
 * Class used to store bone information
 * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/bonesSkeletons
 */
export declare class Bone extends Node {
    /**
     * defines the bone name
     */
    name: string;
    private static _TmpVecs;
    private static _TmpQuat;
    private static _TmpMats;
    /**
     * Gets the list of child bones
     */
    children: Bone[];
    /** Gets the animations associated with this bone */
    animations: Animation[];
    /**
     * Gets or sets bone length
     */
    length: number;
    /**
     * @internal Internal only
     * Set this value to map this bone to a different index in the transform matrices
     * Set this value to -1 to exclude the bone from the transform matrices
     */
    _index: Nullable<number>;
    private _skeleton;
    private _localMatrix;
    private _absoluteMatrix;
    private _bindMatrix;
    private _absoluteBindMatrix;
    private _absoluteInverseBindMatrix;
    private _finalMatrix;
    private _restMatrix;
    private _scalingDeterminant;
    private _localScaling;
    private _localRotation;
    private _localPosition;
    private _needToDecompose;
    private _needToCompose;
    /** @internal */
    _linkedTransformNode: Nullable<TransformNode>;
    /** @internal */
    _waitingTransformNodeId: Nullable<string>;
    /** @internal */
    get _matrix(): Matrix;
    /** @internal */
    set _matrix(value: Matrix);
    /**
     * Create a new bone
     * @param name defines the bone name
     * @param skeleton defines the parent skeleton
     * @param parentBone defines the parent (can be null if the bone is the root)
     * @param localMatrix defines the local matrix (default: identity)
     * @param restMatrix defines the rest matrix (default: localMatrix)
     * @param bindMatrix defines the bind matrix (default: localMatrix)
     * @param index defines index of the bone in the hierarchy (default: null)
     */
    constructor(
    /**
     * defines the bone name
     */
    name: string, skeleton: Skeleton, parentBone?: Nullable<Bone>, localMatrix?: Nullable<Matrix>, restMatrix?: Nullable<Matrix>, bindMatrix?: Nullable<Matrix>, index?: Nullable<number>);
    /**
     * Gets the current object class name.
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the parent skeleton
     * @returns a skeleton
     */
    getSkeleton(): Skeleton;
    get parent(): Bone;
    /**
     * Gets parent bone
     * @returns a bone or null if the bone is the root of the bone hierarchy
     */
    getParent(): Nullable<Bone>;
    /**
     * Returns an array containing the children of the bone
     * @returns an array containing the children of the bone (can be empty if the bone has no children)
     */
    getChildren(): Array<Bone>;
    /**
     * Gets the node index in matrix array generated for rendering
     * @returns the node index
     */
    getIndex(): number;
    set parent(newParent: Nullable<Bone>);
    /**
     * Sets the parent bone
     * @param parent defines the parent (can be null if the bone is the root)
     * @param updateAbsoluteBindMatrices defines if the absolute bind and absolute inverse bind matrices must be updated
     */
    setParent(parent: Nullable<Bone>, updateAbsoluteBindMatrices?: boolean): void;
    /**
     * Gets the local matrix
     * @returns the local matrix
     */
    getLocalMatrix(): Matrix;
    /**
     * Gets the bind matrix
     * @returns the bind matrix
     */
    getBindMatrix(): Matrix;
    /**
     * Gets the bind matrix.
     * @returns the bind matrix
     * @deprecated Please use getBindMatrix instead
     */
    getBaseMatrix(): Matrix;
    /**
     * Gets the rest matrix
     * @returns the rest matrix
     */
    getRestMatrix(): Matrix;
    /**
     * Gets the rest matrix
     * @returns the rest matrix
     * @deprecated Please use getRestMatrix instead
     */
    getRestPose(): Matrix;
    /**
     * Sets the rest matrix
     * @param matrix the local-space rest matrix to set for this bone
     */
    setRestMatrix(matrix: Matrix): void;
    /**
     * Sets the rest matrix
     * @param matrix the local-space rest to set for this bone
     * @deprecated Please use setRestMatrix instead
     */
    setRestPose(matrix: Matrix): void;
    /**
     * Gets the bind matrix
     * @returns the bind matrix
     * @deprecated Please use getBindMatrix instead
     */
    getBindPose(): Matrix;
    /**
     * Sets the bind matrix
     * This will trigger a recomputation of the absolute bind and absolute inverse bind matrices for this bone and its children
     * Note that the local matrix will also be set with the matrix passed in parameter!
     * @param matrix the local-space bind matrix to set for this bone
     */
    setBindMatrix(matrix: Matrix): void;
    /**
     * Sets the bind matrix
     * @param matrix the local-space bind to set for this bone
     * @deprecated Please use setBindMatrix instead
     */
    setBindPose(matrix: Matrix): void;
    /**
     * Gets the matrix used to store the final world transformation of the bone (ie. the matrix sent to shaders)
     */
    getFinalMatrix(): Matrix;
    /**
     * Gets the matrix used to store the final world transformation of the bone (ie. the matrix sent to shaders)
     * @deprecated Please use getFinalMatrix instead
     */
    getWorldMatrix(): Matrix;
    /**
     * Sets the local matrix to the rest matrix
     */
    returnToRest(): void;
    /**
     * Gets the inverse of the bind matrix, in world space (relative to the skeleton root)
     * @returns the inverse bind matrix, in world space
     */
    getAbsoluteInverseBindMatrix(): Matrix;
    /**
     * Gets the inverse of the bind matrix, in world space (relative to the skeleton root)
     * @returns the inverse bind matrix, in world space
     * @deprecated Please use getAbsoluteInverseBindMatrix instead
     */
    getInvertedAbsoluteTransform(): Matrix;
    /**
     * Gets the bone matrix, in world space (relative to the skeleton root)
     * @returns the bone matrix, in world space
     */
    getAbsoluteMatrix(): Matrix;
    /**
     * Gets the bone matrix, in world space (relative to the skeleton root)
     * @returns the bone matrix, in world space
     * @deprecated Please use getAbsoluteMatrix instead
     */
    getAbsoluteTransform(): Matrix;
    /**
     * Links with the given transform node.
     * The local matrix of this bone is overwritten by the transform of the node every frame.
     * @param transformNode defines the transform node to link to
     */
    linkTransformNode(transformNode: Nullable<TransformNode>): void;
    /**
     * Gets the node used to drive the bone's transformation
     * @returns a transform node or null
     */
    getTransformNode(): Nullable<TransformNode>;
    /** Gets or sets current position (in local space) */
    get position(): Vector3;
    set position(newPosition: Vector3);
    /** Gets or sets current rotation (in local space) */
    get rotation(): Vector3;
    set rotation(newRotation: Vector3);
    /** Gets or sets current rotation quaternion (in local space) */
    get rotationQuaternion(): Quaternion;
    set rotationQuaternion(newRotation: Quaternion);
    /** Gets or sets current scaling (in local space) */
    get scaling(): Vector3;
    set scaling(newScaling: Vector3);
    /**
     * Gets the animation properties override
     */
    get animationPropertiesOverride(): Nullable<AnimationPropertiesOverride>;
    private _decompose;
    private _compose;
    /**
     * Update the bind (and optionally the local) matrix
     * @param bindMatrix defines the new matrix to set to the bind/local matrix, in local space
     * @param updateAbsoluteBindMatrices defines if the absolute bind and absolute inverse bind matrices must be recomputed (default: true)
     * @param updateLocalMatrix defines if the local matrix should also be updated with the matrix passed in parameter (default: true)
     */
    updateMatrix(bindMatrix: Matrix, updateAbsoluteBindMatrices?: boolean, updateLocalMatrix?: boolean): void;
    /**
     * @internal
     */
    _updateAbsoluteBindMatrices(bindMatrix?: Matrix, updateChildren?: boolean): void;
    /**
     * Flag the bone as dirty (Forcing it to update everything)
     * @returns this bone
     */
    markAsDirty(): Bone;
    /** @internal */
    _markAsDirtyAndCompose(): void;
    private _markAsDirtyAndDecompose;
    private _updatePosition;
    /**
     * Translate the bone in local or world space
     * @param vec The amount to translate the bone
     * @param space The space that the translation is in (default: Space.LOCAL)
     * @param tNode A TransformNode whose world matrix is to be applied to the calculated absolute matrix. In most cases, you'll want to pass the mesh associated with the skeleton from which this bone comes. Used only when space=Space.WORLD
     */
    translate(vec: Vector3, space?: Space, tNode?: TransformNode): void;
    /**
     * Set the position of the bone in local or world space
     * @param position The position to set the bone
     * @param space The space that the position is in (default: Space.LOCAL)
     * @param tNode A TransformNode whose world matrix is to be applied to the calculated absolute matrix. In most cases, you'll want to pass the mesh associated with the skeleton from which this bone comes. Used only when space=Space.WORLD
     */
    setPosition(position: Vector3, space?: Space, tNode?: TransformNode): void;
    /**
     * Set the absolute position of the bone (world space)
     * @param position The position to set the bone
     * @param tNode A TransformNode whose world matrix is to be applied to the calculated absolute matrix. In most cases, you'll want to pass the mesh associated with the skeleton from which this bone comes. Used only when space=Space.WORLD
     */
    setAbsolutePosition(position: Vector3, tNode?: TransformNode): void;
    /**
     * Scale the bone on the x, y and z axes (in local space)
     * @param x The amount to scale the bone on the x axis
     * @param y The amount to scale the bone on the y axis
     * @param z The amount to scale the bone on the z axis
     * @param scaleChildren sets this to true if children of the bone should be scaled as well (false by default)
     */
    scale(x: number, y: number, z: number, scaleChildren?: boolean): void;
    /**
     * Set the bone scaling in local space
     * @param scale defines the scaling vector
     */
    setScale(scale: Vector3): void;
    /**
     * Gets the current scaling in local space
     * @returns the current scaling vector
     */
    getScale(): Vector3;
    /**
     * Gets the current scaling in local space and stores it in a target vector
     * @param result defines the target vector
     */
    getScaleToRef(result: Vector3): void;
    /**
     * Set the yaw, pitch, and roll of the bone in local or world space
     * @param yaw The rotation of the bone on the y axis
     * @param pitch The rotation of the bone on the x axis
     * @param roll The rotation of the bone on the z axis
     * @param space The space that the axes of rotation are in
     * @param tNode A TransformNode whose world matrix is to be applied to the calculated absolute matrix. In most cases, you'll want to pass the mesh associated with the skeleton from which this bone comes. Used only when space=Space.WORLD
     */
    setYawPitchRoll(yaw: number, pitch: number, roll: number, space?: Space, tNode?: TransformNode): void;
    /**
     * Add a rotation to the bone on an axis in local or world space
     * @param axis The axis to rotate the bone on
     * @param amount The amount to rotate the bone
     * @param space The space that the axis is in
     * @param tNode A TransformNode whose world matrix is to be applied to the calculated absolute matrix. In most cases, you'll want to pass the mesh associated with the skeleton from which this bone comes. Used only when space=Space.WORLD
     */
    rotate(axis: Vector3, amount: number, space?: Space, tNode?: TransformNode): void;
    /**
     * Set the rotation of the bone to a particular axis angle in local or world space
     * @param axis The axis to rotate the bone on
     * @param angle The angle that the bone should be rotated to
     * @param space The space that the axis is in
     * @param tNode A TransformNode whose world matrix is to be applied to the calculated absolute matrix. In most cases, you'll want to pass the mesh associated with the skeleton from which this bone comes. Used only when space=Space.WORLD
     */
    setAxisAngle(axis: Vector3, angle: number, space?: Space, tNode?: TransformNode): void;
    /**
     * Set the euler rotation of the bone in local or world space
     * @param rotation The euler rotation that the bone should be set to
     * @param space The space that the rotation is in
     * @param tNode A TransformNode whose world matrix is to be applied to the calculated absolute matrix. In most cases, you'll want to pass the mesh associated with the skeleton from which this bone comes. Used only when space=Space.WORLD
     */
    setRotation(rotation: Vector3, space?: Space, tNode?: TransformNode): void;
    /**
     * Set the quaternion rotation of the bone in local or world space
     * @param quat The quaternion rotation that the bone should be set to
     * @param space The space that the rotation is in
     * @param tNode A TransformNode whose world matrix is to be applied to the calculated absolute matrix. In most cases, you'll want to pass the mesh associated with the skeleton from which this bone comes. Used only when space=Space.WORLD
     */
    setRotationQuaternion(quat: Quaternion, space?: Space, tNode?: TransformNode): void;
    /**
     * Set the rotation matrix of the bone in local or world space
     * @param rotMat The rotation matrix that the bone should be set to
     * @param space The space that the rotation is in
     * @param tNode A TransformNode whose world matrix is to be applied to the calculated absolute matrix. In most cases, you'll want to pass the mesh associated with the skeleton from which this bone comes. Used only when space=Space.WORLD
     */
    setRotationMatrix(rotMat: Matrix, space?: Space, tNode?: TransformNode): void;
    private _rotateWithMatrix;
    private _getAbsoluteInverseMatrixUnscaledToRef;
    /**
     * Get the position of the bone in local or world space
     * @param space The space that the returned position is in
     * @param tNode A TransformNode whose world matrix is to be applied to the calculated absolute matrix. In most cases, you'll want to pass the mesh associated with the skeleton from which this bone comes. Used only when space=Space.WORLD
     * @returns The position of the bone
     */
    getPosition(space?: Space, tNode?: Nullable<TransformNode>): Vector3;
    /**
     * Copy the position of the bone to a vector3 in local or world space
     * @param space The space that the returned position is in
     * @param tNode A TransformNode whose world matrix is to be applied to the calculated absolute matrix. In most cases, you'll want to pass the mesh associated with the skeleton from which this bone comes. Used only when space=Space.WORLD
     * @param result The vector3 to copy the position to
     */
    getPositionToRef(space: Space | undefined, tNode: Nullable<TransformNode>, result: Vector3): void;
    /**
     * Get the absolute position of the bone (world space)
     * @param tNode A TransformNode whose world matrix is to be applied to the calculated absolute matrix. In most cases, you'll want to pass the mesh associated with the skeleton from which this bone comes. Used only when space=Space.WORLD
     * @returns The absolute position of the bone
     */
    getAbsolutePosition(tNode?: Nullable<TransformNode>): Vector3;
    /**
     * Copy the absolute position of the bone (world space) to the result param
     * @param tNode A TransformNode whose world matrix is to be applied to the calculated absolute matrix. In most cases, you'll want to pass the mesh associated with the skeleton from which this bone comes. Used only when space=Space.WORLD
     * @param result The vector3 to copy the absolute position to
     */
    getAbsolutePositionToRef(tNode: TransformNode, result: Vector3): void;
    /**
     * Compute the absolute matrices of this bone and its children
     */
    computeAbsoluteMatrices(): void;
    /**
     * Compute the absolute matrices of this bone and its children
     * @deprecated Please use computeAbsoluteMatrices instead
     */
    computeAbsoluteTransforms(): void;
    /**
     * Get the world direction from an axis that is in the local space of the bone
     * @param localAxis The local direction that is used to compute the world direction
     * @param tNode A TransformNode whose world matrix is to be applied to the calculated absolute matrix. In most cases, you'll want to pass the mesh associated with the skeleton from which this bone comes. Used only when space=Space.WORLD
     * @returns The world direction
     */
    getDirection(localAxis: Vector3, tNode?: Nullable<TransformNode>): Vector3;
    /**
     * Copy the world direction to a vector3 from an axis that is in the local space of the bone
     * @param localAxis The local direction that is used to compute the world direction
     * @param tNode A TransformNode whose world matrix is to be applied to the calculated absolute matrix. In most cases, you'll want to pass the mesh associated with the skeleton from which this bone comes. Used only when space=Space.WORLD
     * @param result The vector3 that the world direction will be copied to
     */
    getDirectionToRef(localAxis: Vector3, tNode: Nullable<TransformNode> | undefined, result: Vector3): void;
    /**
     * Get the euler rotation of the bone in local or world space
     * @param space The space that the rotation should be in
     * @param tNode A TransformNode whose world matrix is to be applied to the calculated absolute matrix. In most cases, you'll want to pass the mesh associated with the skeleton from which this bone comes. Used only when space=Space.WORLD
     * @returns The euler rotation
     */
    getRotation(space?: Space, tNode?: Nullable<TransformNode>): Vector3;
    /**
     * Copy the euler rotation of the bone to a vector3.  The rotation can be in either local or world space
     * @param space The space that the rotation should be in
     * @param tNode A TransformNode whose world matrix is to be applied to the calculated absolute matrix. In most cases, you'll want to pass the mesh associated with the skeleton from which this bone comes. Used only when space=Space.WORLD
     * @param result The vector3 that the rotation should be copied to
     */
    getRotationToRef(space: Space | undefined, tNode: Nullable<TransformNode> | undefined, result: Vector3): void;
    /**
     * Get the quaternion rotation of the bone in either local or world space
     * @param space The space that the rotation should be in
     * @param tNode A TransformNode whose world matrix is to be applied to the calculated absolute matrix. In most cases, you'll want to pass the mesh associated with the skeleton from which this bone comes. Used only when space=Space.WORLD
     * @returns The quaternion rotation
     */
    getRotationQuaternion(space?: Space, tNode?: Nullable<TransformNode>): Quaternion;
    /**
     * Copy the quaternion rotation of the bone to a quaternion.  The rotation can be in either local or world space
     * @param space The space that the rotation should be in
     * @param tNode A TransformNode whose world matrix is to be applied to the calculated absolute matrix. In most cases, you'll want to pass the mesh associated with the skeleton from which this bone comes. Used only when space=Space.WORLD
     * @param result The quaternion that the rotation should be copied to
     */
    getRotationQuaternionToRef(space: Space | undefined, tNode: Nullable<TransformNode> | undefined, result: Quaternion): void;
    /**
     * Get the rotation matrix of the bone in local or world space
     * @param space The space that the rotation should be in
     * @param tNode A TransformNode whose world matrix is to be applied to the calculated absolute matrix. In most cases, you'll want to pass the mesh associated with the skeleton from which this bone comes. Used only when space=Space.WORLD
     * @returns The rotation matrix
     */
    getRotationMatrix(space: Space | undefined, tNode: TransformNode): Matrix;
    /**
     * Copy the rotation matrix of the bone to a matrix.  The rotation can be in either local or world space
     * @param space The space that the rotation should be in
     * @param tNode A TransformNode whose world matrix is to be applied to the calculated absolute matrix. In most cases, you'll want to pass the mesh associated with the skeleton from which this bone comes. Used only when space=Space.WORLD
     * @param result The quaternion that the rotation should be copied to
     */
    getRotationMatrixToRef(space: Space | undefined, tNode: TransformNode, result: Matrix): void;
    /**
     * Get the world position of a point that is in the local space of the bone
     * @param position The local position
     * @param tNode A TransformNode whose world matrix is to be applied to the calculated absolute matrix. In most cases, you'll want to pass the mesh associated with the skeleton from which this bone comes. Used only when space=Space.WORLD
     * @returns The world position
     */
    getAbsolutePositionFromLocal(position: Vector3, tNode?: Nullable<TransformNode>): Vector3;
    /**
     * Get the world position of a point that is in the local space of the bone and copy it to the result param
     * @param position The local position
     * @param tNode A TransformNode whose world matrix is to be applied to the calculated absolute matrix. In most cases, you'll want to pass the mesh associated with the skeleton from which this bone comes. Used only when space=Space.WORLD
     * @param result The vector3 that the world position should be copied to
     */
    getAbsolutePositionFromLocalToRef(position: Vector3, tNode: Nullable<TransformNode> | undefined, result: Vector3): void;
    /**
     * Get the local position of a point that is in world space
     * @param position The world position
     * @param tNode A TransformNode whose world matrix is to be applied to the calculated absolute matrix. In most cases, you'll want to pass the mesh associated with the skeleton from which this bone comes. Used only when space=Space.WORLD
     * @returns The local position
     */
    getLocalPositionFromAbsolute(position: Vector3, tNode?: Nullable<TransformNode>): Vector3;
    /**
     * Get the local position of a point that is in world space and copy it to the result param
     * @param position The world position
     * @param tNode A TransformNode whose world matrix is to be applied to the calculated absolute matrix. In most cases, you'll want to pass the mesh associated with the skeleton from which this bone comes. Used only when space=Space.WORLD
     * @param result The vector3 that the local position should be copied to
     */
    getLocalPositionFromAbsoluteToRef(position: Vector3, tNode: Nullable<TransformNode> | undefined, result: Vector3): void;
    /**
     * Set the current local matrix as the restMatrix for this bone.
     */
    setCurrentPoseAsRest(): void;
}
