import type { Nullable, IndicesArray, DeepImmutable, FloatArray } from "../types";
import type { Matrix, Vector3 } from "../Maths/math.vector";
import type { Engine } from "../Engines/engine";
import { IntersectionInfo } from "../Collisions/intersectionInfo";
import type { ICullable } from "../Culling/boundingInfo";
import { BoundingInfo } from "../Culling/boundingInfo";
import type { Effect } from "../Materials/effect";
import type { DataBuffer } from "../Buffers/dataBuffer";
import type { Plane } from "../Maths/math.plane";
import { DrawWrapper } from "../Materials/drawWrapper";
import type { IMaterialContext } from "../Engines/IMaterialContext";
import type { Collider } from "../Collisions/collider";
import type { Material } from "../Materials/material";
import type { MaterialDefines } from "../Materials/materialDefines";
import type { AbstractMesh } from "./abstractMesh";
import type { Mesh } from "./mesh";
import type { Ray } from "../Culling/ray";
import type { TrianglePickingPredicate } from "../Culling/ray";
/**
 * Defines a subdivision inside a mesh
 */
export declare class SubMesh implements ICullable {
    /** the material index to use */
    materialIndex: number;
    /** vertex index start */
    verticesStart: number;
    /** vertices count */
    verticesCount: number;
    /** index start */
    indexStart: number;
    /** indices count */
    indexCount: number;
    private _engine;
    /** @internal */
    _drawWrappers: Array<DrawWrapper>;
    private _mainDrawWrapperOverride;
    /**
     * Gets material defines used by the effect associated to the sub mesh
     */
    get materialDefines(): Nullable<MaterialDefines>;
    /**
     * Sets material defines used by the effect associated to the sub mesh
     */
    set materialDefines(defines: Nullable<MaterialDefines>);
    /**
     * @internal
     */
    _getDrawWrapper(passId?: number, createIfNotExisting?: boolean): DrawWrapper | undefined;
    /**
     * @internal
     */
    _removeDrawWrapper(passId: number, disposeWrapper?: boolean): void;
    /**
     * Gets associated (main) effect (possibly the effect override if defined)
     */
    get effect(): Nullable<Effect>;
    /** @internal */
    get _drawWrapper(): DrawWrapper;
    /** @internal */
    get _drawWrapperOverride(): Nullable<DrawWrapper>;
    /**
     * @internal
     */
    _setMainDrawWrapperOverride(wrapper: Nullable<DrawWrapper>): void;
    /**
     * Sets associated effect (effect used to render this submesh)
     * @param effect defines the effect to associate with
     * @param defines defines the set of defines used to compile this effect
     * @param materialContext material context associated to the effect
     * @param resetContext true to reset the draw context
     */
    setEffect(effect: Nullable<Effect>, defines?: Nullable<string | MaterialDefines>, materialContext?: IMaterialContext, resetContext?: boolean): void;
    /**
     * Resets the draw wrappers cache
     * @param passId If provided, releases only the draw wrapper corresponding to this render pass id
     */
    resetDrawCache(passId?: number): void;
    /** @internal */
    _linesIndexCount: number;
    private _mesh;
    private _renderingMesh;
    private _boundingInfo;
    private _linesIndexBuffer;
    /** @internal */
    _lastColliderWorldVertices: Nullable<Vector3[]>;
    /** @internal */
    _trianglePlanes: Plane[];
    /** @internal */
    _lastColliderTransformMatrix: Nullable<Matrix>;
    /** @internal */
    _wasDispatched: boolean;
    /** @internal */
    _renderId: number;
    /** @internal */
    _alphaIndex: number;
    /** @internal */
    _distanceToCamera: number;
    /** @internal */
    _id: number;
    private _currentMaterial;
    /**
     * Add a new submesh to a mesh
     * @param materialIndex defines the material index to use
     * @param verticesStart defines vertex index start
     * @param verticesCount defines vertices count
     * @param indexStart defines index start
     * @param indexCount defines indices count
     * @param mesh defines the parent mesh
     * @param renderingMesh defines an optional rendering mesh
     * @param createBoundingBox defines if bounding box should be created for this submesh
     * @returns the new submesh
     */
    static AddToMesh(materialIndex: number, verticesStart: number, verticesCount: number, indexStart: number, indexCount: number, mesh: AbstractMesh, renderingMesh?: Mesh, createBoundingBox?: boolean): SubMesh;
    /**
     * Creates a new submesh
     * @param materialIndex defines the material index to use
     * @param verticesStart defines vertex index start
     * @param verticesCount defines vertices count
     * @param indexStart defines index start
     * @param indexCount defines indices count
     * @param mesh defines the parent mesh
     * @param renderingMesh defines an optional rendering mesh
     * @param createBoundingBox defines if bounding box should be created for this submesh
     * @param addToMesh defines a boolean indicating that the submesh must be added to the mesh.subMeshes array (true by default)
     */
    constructor(
    /** the material index to use */
    materialIndex: number, 
    /** vertex index start */
    verticesStart: number, 
    /** vertices count */
    verticesCount: number, 
    /** index start */
    indexStart: number, 
    /** indices count */
    indexCount: number, mesh: AbstractMesh, renderingMesh?: Mesh, createBoundingBox?: boolean, addToMesh?: boolean);
    /**
     * Returns true if this submesh covers the entire parent mesh
     * @ignorenaming
     */
    get IsGlobal(): boolean;
    /**
     * Returns the submesh BoundingInfo object
     * @returns current bounding info (or mesh's one if the submesh is global)
     */
    getBoundingInfo(): BoundingInfo;
    /**
     * Sets the submesh BoundingInfo
     * @param boundingInfo defines the new bounding info to use
     * @returns the SubMesh
     */
    setBoundingInfo(boundingInfo: BoundingInfo): SubMesh;
    /**
     * Returns the mesh of the current submesh
     * @returns the parent mesh
     */
    getMesh(): AbstractMesh;
    /**
     * Returns the rendering mesh of the submesh
     * @returns the rendering mesh (could be different from parent mesh)
     */
    getRenderingMesh(): Mesh;
    /**
     * Returns the replacement mesh of the submesh
     * @returns the replacement mesh (could be different from parent mesh)
     */
    getReplacementMesh(): Nullable<AbstractMesh>;
    /**
     * Returns the effective mesh of the submesh
     * @returns the effective mesh (could be different from parent mesh)
     */
    getEffectiveMesh(): AbstractMesh;
    /**
     * Returns the submesh material
     * @param getDefaultMaterial Defines whether or not to get the default material if nothing has been defined.
     * @returns null or the current material
     */
    getMaterial(getDefaultMaterial?: boolean): Nullable<Material>;
    private _isMultiMaterial;
    /**
     * Sets a new updated BoundingInfo object to the submesh
     * @param data defines an optional position array to use to determine the bounding info
     * @returns the SubMesh
     */
    refreshBoundingInfo(data?: Nullable<FloatArray>): SubMesh;
    /**
     * @internal
     */
    _checkCollision(collider: Collider): boolean;
    /**
     * Updates the submesh BoundingInfo
     * @param world defines the world matrix to use to update the bounding info
     * @returns the submesh
     */
    updateBoundingInfo(world: DeepImmutable<Matrix>): SubMesh;
    /**
     * True is the submesh bounding box intersects the frustum defined by the passed array of planes.
     * @param frustumPlanes defines the frustum planes
     * @returns true if the submesh is intersecting with the frustum
     */
    isInFrustum(frustumPlanes: Plane[]): boolean;
    /**
     * True is the submesh bounding box is completely inside the frustum defined by the passed array of planes
     * @param frustumPlanes defines the frustum planes
     * @returns true if the submesh is inside the frustum
     */
    isCompletelyInFrustum(frustumPlanes: Plane[]): boolean;
    /**
     * Renders the submesh
     * @param enableAlphaMode defines if alpha needs to be used
     * @returns the submesh
     */
    render(enableAlphaMode: boolean): SubMesh;
    /**
     * @internal
     */
    _getLinesIndexBuffer(indices: IndicesArray, engine: Engine): DataBuffer;
    /**
     * Checks if the submesh intersects with a ray
     * @param ray defines the ray to test
     * @returns true is the passed ray intersects the submesh bounding box
     */
    canIntersects(ray: Ray): boolean;
    /**
     * Intersects current submesh with a ray
     * @param ray defines the ray to test
     * @param positions defines mesh's positions array
     * @param indices defines mesh's indices array
     * @param fastCheck defines if the first intersection will be used (and not the closest)
     * @param trianglePredicate defines an optional predicate used to select faces when a mesh intersection is detected
     * @returns intersection info or null if no intersection
     */
    intersects(ray: Ray, positions: Vector3[], indices: IndicesArray, fastCheck?: boolean, trianglePredicate?: TrianglePickingPredicate): Nullable<IntersectionInfo>;
    /**
     * @internal
     */
    private _intersectLines;
    /**
     * @internal
     */
    private _intersectUnIndexedLines;
    /**
     * @internal
     */
    private _intersectTriangles;
    /**
     * @internal
     */
    private _intersectUnIndexedTriangles;
    /** @internal */
    _rebuild(): void;
    /**
     * Creates a new submesh from the passed mesh
     * @param newMesh defines the new hosting mesh
     * @param newRenderingMesh defines an optional rendering mesh
     * @returns the new submesh
     */
    clone(newMesh: AbstractMesh, newRenderingMesh?: Mesh): SubMesh;
    /**
     * Release associated resources
     */
    dispose(): void;
    /**
     * Gets the class name
     * @returns the string "SubMesh".
     */
    getClassName(): string;
    /**
     * Creates a new submesh from indices data
     * @param materialIndex the index of the main mesh material
     * @param startIndex the index where to start the copy in the mesh indices array
     * @param indexCount the number of indices to copy then from the startIndex
     * @param mesh the main mesh to create the submesh from
     * @param renderingMesh the optional rendering mesh
     * @param createBoundingBox defines if bounding box should be created for this submesh
     * @returns a new submesh
     */
    static CreateFromIndices(materialIndex: number, startIndex: number, indexCount: number, mesh: AbstractMesh, renderingMesh?: Mesh, createBoundingBox?: boolean): SubMesh;
}
