import type { Nullable } from "../types";
import type { Matrix } from "../Maths/math";
import { Color4, Vector2, Vector3, Quaternion } from "../Maths/math";
import type { Mesh } from "../Meshes/mesh";
import type { BoundingInfo } from "../Culling/boundingInfo";
import type { PointsCloudSystem } from "./pointsCloudSystem";
/**
 * Represents one particle of a points cloud system.
 */
export declare class CloudPoint {
    /**
     * particle global index
     */
    idx: number;
    /**
     * The color of the particle
     */
    color: Nullable<Color4>;
    /**
     * The world space position of the particle.
     */
    position: Vector3;
    /**
     * The world space rotation of the particle. (Not use if rotationQuaternion is set)
     */
    rotation: Vector3;
    /**
     * The world space rotation quaternion of the particle.
     */
    rotationQuaternion: Nullable<Quaternion>;
    /**
     * The uv of the particle.
     */
    uv: Nullable<Vector2>;
    /**
     * The current speed of the particle.
     */
    velocity: Vector3;
    /**
     * The pivot point in the particle local space.
     */
    pivot: Vector3;
    /**
     * Must the particle be translated from its pivot point in its local space ?
     * In this case, the pivot point is set at the origin of the particle local space and the particle is translated.
     * Default : false
     */
    translateFromPivot: boolean;
    /**
     * Index of this particle in the global "positions" array (Internal use)
     * @internal
     */
    _pos: number;
    /**
     * @internal Index of this particle in the global "indices" array (Internal use)
     */
    _ind: number;
    /**
     * Group this particle belongs to
     */
    _group: PointsGroup;
    /**
     * Group id of this particle
     */
    groupId: number;
    /**
     * Index of the particle in its group id (Internal use)
     */
    idxInGroup: number;
    /**
     * @internal Particle BoundingInfo object (Internal use)
     */
    _boundingInfo: BoundingInfo;
    /**
     * @internal Reference to the PCS that the particle belongs to (Internal use)
     */
    _pcs: PointsCloudSystem;
    /**
     * @internal Still set as invisible in order to skip useless computations (Internal use)
     */
    _stillInvisible: boolean;
    /**
     * @internal Last computed particle rotation matrix
     */
    _rotationMatrix: number[];
    /**
     * Parent particle Id, if any.
     * Default null.
     */
    parentId: Nullable<number>;
    /**
     * @internal Internal global position in the PCS.
     */
    _globalPosition: Vector3;
    /**
     * Creates a Point Cloud object.
     * Don't create particles manually, use instead the PCS internal tools like _addParticle()
     * @param particleIndex (integer) is the particle index in the PCS pool. It's also the particle identifier.
     * @param group (PointsGroup) is the group the particle belongs to
     * @param groupId (integer) is the group identifier in the PCS.
     * @param idxInGroup (integer) is the index of the particle in the current point group (ex: the 10th point of addPoints(30))
     * @param pcs defines the PCS it is associated to
     */
    constructor(particleIndex: number, group: PointsGroup, groupId: number, idxInGroup: number, pcs: PointsCloudSystem);
    /**
     * get point size
     */
    get size(): Vector3;
    /**
     * Set point size
     */
    set size(scale: Vector3);
    /**
     * Legacy support, changed quaternion to rotationQuaternion
     */
    get quaternion(): Nullable<Quaternion>;
    /**
     * Legacy support, changed quaternion to rotationQuaternion
     */
    set quaternion(q: Nullable<Quaternion>);
    /**
     * Returns a boolean. True if the particle intersects a mesh, else false
     * The intersection is computed on the particle position and Axis Aligned Bounding Box (AABB) or Sphere
     * @param target is the object (point or mesh) what the intersection is computed against
     * @param isSphere is boolean flag when false (default) bounding box of mesh is used, when true the bounding sphere is used
     * @returns true if it intersects
     */
    intersectsMesh(target: Mesh, isSphere: boolean): boolean;
    /**
     * get the rotation matrix of the particle
     * @internal
     */
    getRotationMatrix(m: Matrix): void;
}
/**
 * Represents a group of points in a points cloud system
 *  * PCS internal tool, don't use it manually.
 */
export declare class PointsGroup {
    /**
     * Get or set the groupId
     * @deprecated Please use groupId instead
     */
    get groupID(): number;
    set groupID(groupID: number);
    /**
     * The group id
     * @internal
     */
    groupId: number;
    /**
     * image data for group (internal use)
     * @internal
     */
    _groupImageData: Nullable<ArrayBufferView>;
    /**
     * Image Width (internal use)
     * @internal
     */
    _groupImgWidth: number;
    /**
     * Image Height (internal use)
     * @internal
     */
    _groupImgHeight: number;
    /**
     * Custom position function (internal use)
     * @internal
     */
    _positionFunction: Nullable<(particle: CloudPoint, i?: number, s?: number) => void>;
    /**
     * density per facet for surface points
     * @internal
     */
    _groupDensity: number[];
    /**
     * Only when points are colored by texture carries pointer to texture list array
     * @internal
     */
    _textureNb: number;
    /**
     * Creates a points group object. This is an internal reference to produce particles for the PCS.
     * PCS internal tool, don't use it manually.
     * @internal
     */
    constructor(id: number, posFunction: Nullable<(particle: CloudPoint, i?: number, s?: number) => void>);
}
