import type { Nullable } from "../types";
import type { Matrix } from "../Maths/math.vector";
import { Vector3, Quaternion, Vector4, Vector2 } from "../Maths/math.vector";
import { Color4 } from "../Maths/math.color";
import type { Mesh } from "../Meshes/mesh";
import { BoundingInfo } from "../Culling/boundingInfo";
import type { SolidParticleSystem } from "./solidParticleSystem";
import type { Plane } from "../Maths/math.plane";
import type { Material } from "../Materials/material";
/**
 * Represents one particle of a solid particle system.
 */
export declare class SolidParticle {
    /**
     * particle global index
     */
    idx: number;
    /**
     * particle identifier
     */
    id: number;
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
     * The scaling of the particle.
     */
    scaling: Vector3;
    /**
     * The uvs of the particle.
     */
    uvs: Vector4;
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
     * Is the particle active or not ?
     */
    alive: boolean;
    /**
     * Is the particle visible or not ?
     */
    isVisible: boolean;
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
     * @internal ModelShape of this particle (Internal use)
     */
    _model: ModelShape;
    /**
     * ModelShape id of this particle
     */
    shapeId: number;
    /**
     * Index of the particle in its shape id
     */
    idxInShape: number;
    /**
     * @internal Reference to the shape model BoundingInfo object (Internal use)
     */
    _modelBoundingInfo: BoundingInfo;
    private _boundingInfo;
    /**
     * @internal Reference to the SPS what the particle belongs to (Internal use)
     */
    _sps: SolidParticleSystem;
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
     * The particle material identifier (integer) when MultiMaterials are enabled in the SPS.
     */
    materialIndex: Nullable<number>;
    /**
     * Custom object or properties.
     */
    props: Nullable<any>;
    /**
     * The culling strategy to use to check whether the solid particle must be culled or not when using isInFrustum().
     * The possible values are :
     * - AbstractMesh.CULLINGSTRATEGY_STANDARD
     * - AbstractMesh.CULLINGSTRATEGY_BOUNDINGSPHERE_ONLY
     * - AbstractMesh.CULLINGSTRATEGY_OPTIMISTIC_INCLUSION
     * - AbstractMesh.CULLINGSTRATEGY_OPTIMISTIC_INCLUSION_THEN_BSPHERE_ONLY
     * The default value for solid particles is AbstractMesh.CULLINGSTRATEGY_BOUNDINGSPHERE_ONLY
     * Please read each static variable documentation in the class AbstractMesh to get details about the culling process.
     * */
    cullingStrategy: number;
    /**
     * @internal Internal global position in the SPS.
     */
    _globalPosition: Vector3;
    /**
     * Particle BoundingInfo object
     * @returns a BoundingInfo
     */
    getBoundingInfo(): BoundingInfo;
    /**
     * Returns true if there is already a bounding info
     */
    get hasBoundingInfo(): boolean;
    /**
     * Creates a Solid Particle object.
     * Don't create particles manually, use instead the Solid Particle System internal tools like _addParticle()
     * @param particleIndex (integer) is the particle index in the Solid Particle System pool.
     * @param particleId (integer) is the particle identifier. Unless some particles are removed from the SPS, it's the same value than the particle idx.
     * @param positionIndex (integer) is the starting index of the particle vertices in the SPS "positions" array.
     * @param indiceIndex (integer) is the starting index of the particle indices in the SPS "indices" array.
     * @param model (ModelShape) is a reference to the model shape on what the particle is designed.
     * @param shapeId (integer) is the model shape identifier in the SPS.
     * @param idxInShape (integer) is the index of the particle in the current model (ex: the 10th box of addShape(box, 30))
     * @param sps defines the sps it is associated to
     * @param modelBoundingInfo is the reference to the model BoundingInfo used for intersection computations.
     * @param materialIndex is the particle material identifier (integer) when the MultiMaterials are enabled in the SPS.
     */
    constructor(particleIndex: number, particleId: number, positionIndex: number, indiceIndex: number, model: Nullable<ModelShape>, shapeId: number, idxInShape: number, sps: SolidParticleSystem, modelBoundingInfo?: Nullable<BoundingInfo>, materialIndex?: Nullable<number>);
    /**
     * Copies the particle property values into the existing target : position, rotation, scaling, uvs, colors, pivot, parent, visibility, alive
     * @param target the particle target
     * @returns the current particle
     */
    copyToRef(target: SolidParticle): SolidParticle;
    /**
     * Legacy support, changed scale to scaling
     */
    get scale(): Vector3;
    /**
     * Legacy support, changed scale to scaling
     */
    set scale(scale: Vector3);
    /**
     * Legacy support, changed quaternion to rotationQuaternion
     */
    get quaternion(): Nullable<Quaternion>;
    /**
     * Legacy support, changed quaternion to rotationQuaternion
     */
    set quaternion(q: Nullable<Quaternion>);
    /**
     * Returns a boolean. True if the particle intersects another particle or another mesh, else false.
     * The intersection is computed on the particle bounding sphere and Axis Aligned Bounding Box (AABB)
     * @param target is the object (solid particle or mesh) what the intersection is computed against.
     * @returns true if it intersects
     */
    intersectsMesh(target: Mesh | SolidParticle): boolean;
    /**
     * Returns `true` if the solid particle is within the frustum defined by the passed array of planes.
     * A particle is in the frustum if its bounding box intersects the frustum
     * @param frustumPlanes defines the frustum to test
     * @returns true if the particle is in the frustum planes
     */
    isInFrustum(frustumPlanes: Plane[]): boolean;
    /**
     * get the rotation matrix of the particle
     * @internal
     */
    getRotationMatrix(m: Matrix): void;
}
/**
 * Represents the shape of the model used by one particle of a solid particle system.
 * SPS internal tool, don't use it manually.
 */
export declare class ModelShape {
    /**
     * Get or set the shapeId
     * @deprecated Please use shapeId instead
     */
    get shapeID(): number;
    set shapeID(shapeID: number);
    /**
     * The shape id
     * @internal
     */
    shapeId: number;
    /**
     * flat array of model positions (internal use)
     * @internal
     */
    _shape: Vector3[];
    /**
     * flat array of model UVs (internal use)
     * @internal
     */
    _shapeUV: number[];
    /**
     * color array of the model
     * @internal
     */
    _shapeColors: number[];
    /**
     * indices array of the model
     * @internal
     */
    _indices: number[];
    /**
     * normals array of the model
     * @internal
     */
    _normals: number[];
    /**
     * length of the shape in the model indices array (internal use)
     * @internal
     */
    _indicesLength: number;
    /**
     * Custom position function (internal use)
     * @internal
     */
    _positionFunction: Nullable<(particle: SolidParticle, i: number, s: number) => void>;
    /**
     * Custom vertex function (internal use)
     * @internal
     */
    _vertexFunction: Nullable<(particle: SolidParticle, vertex: Vector3, i: number) => void>;
    /**
     * Model material (internal use)
     * @internal
     */
    _material: Nullable<Material>;
    /**
     * Creates a ModelShape object. This is an internal simplified reference to a mesh used as for a model to replicate particles from by the SPS.
     * SPS internal tool, don't use it manually.
     * @internal
     */
    constructor(id: number, shape: Vector3[], indices: number[], normals: number[], colors: number[], shapeUV: number[], posFunction: Nullable<(particle: SolidParticle, i: number, s: number) => void>, vtxFunction: Nullable<(particle: SolidParticle, vertex: Vector3, i: number) => void>, material: Nullable<Material>);
}
/**
 * Represents a Depth Sorted Particle in the solid particle system.
 * @internal
 */
export declare class DepthSortedParticle {
    /**
     * Particle index
     */
    idx: number;
    /**
     * Index of the particle in the "indices" array
     */
    ind: number;
    /**
     * Length of the particle shape in the "indices" array
     */
    indicesLength: number;
    /**
     * Squared distance from the particle to the camera
     */
    sqDistance: number;
    /**
     * Material index when used with MultiMaterials
     */
    materialIndex: number;
    /**
     * Creates a new sorted particle
     * @param idx
     * @param ind
     * @param indLength
     * @param materialIndex
     */
    constructor(idx: number, ind: number, indLength: number, materialIndex: number);
}
/**
 * Represents a solid particle vertex
 */
export declare class SolidParticleVertex {
    /**
     * Vertex position
     */
    position: Vector3;
    /**
     * Vertex color
     */
    color: Color4;
    /**
     * Vertex UV
     */
    uv: Vector2;
    /**
     * Creates a new solid particle vertex
     */
    constructor();
    /** Vertex x coordinate */
    get x(): number;
    set x(val: number);
    /** Vertex y coordinate */
    get y(): number;
    set y(val: number);
    /** Vertex z coordinate */
    get z(): number;
    set z(val: number);
}
