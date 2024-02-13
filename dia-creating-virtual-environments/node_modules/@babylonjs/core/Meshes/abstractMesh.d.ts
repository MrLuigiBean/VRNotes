import { Observable } from "../Misc/observable";
import type { Nullable, FloatArray, IndicesArray, DeepImmutable } from "../types";
import type { Camera } from "../Cameras/camera";
import type { Scene, IDisposable } from "../scene";
import type { Vector2 } from "../Maths/math.vector";
import { Matrix, Vector3 } from "../Maths/math.vector";
import type { Node } from "../node";
import type { IGetSetVerticesData } from "../Meshes/mesh.vertexData";
import { TransformNode } from "../Meshes/transformNode";
import type { SubMesh } from "../Meshes/subMesh";
import { PickingInfo } from "../Collisions/pickingInfo";
import type { ICullable } from "../Culling/boundingInfo";
import { BoundingInfo } from "../Culling/boundingInfo";
import type { Material } from "../Materials/material";
import type { Light } from "../Lights/light";
import type { Skeleton } from "../Bones/skeleton";
import type { MorphTargetManager } from "../Morph/morphTargetManager";
import type { IBakedVertexAnimationManager } from "../BakedVertexAnimation/bakedVertexAnimationManager";
import type { IEdgesRenderer } from "../Rendering/edgesRenderer";
import type { SolidParticle } from "../Particles/solidParticle";
import type { AbstractActionManager } from "../Actions/abstractActionManager";
import { UniformBuffer } from "../Materials/uniformBuffer";
import { _MeshCollisionData } from "../Collisions/meshCollisionData";
import type { RawTexture } from "../Materials/Textures/rawTexture";
import { Color3, Color4 } from "../Maths/math.color";
import type { Plane } from "../Maths/math.plane";
import type { IParticleSystem } from "../Particles/IParticleSystem";
import type { Ray } from "../Culling/ray";
import type { Collider } from "../Collisions/collider";
import type { TrianglePickingPredicate } from "../Culling/ray";
import type { RenderingGroup } from "../Rendering/renderingGroup";
import type { IEdgesRendererOptions } from "../Rendering/edgesRenderer";
/** @internal */
declare class _FacetDataStorage {
    facetPositions: Vector3[];
    facetNormals: Vector3[];
    facetPartitioning: number[][];
    facetNb: number;
    partitioningSubdivisions: number;
    partitioningBBoxRatio: number;
    facetDataEnabled: boolean;
    facetParameters: any;
    bbSize: Vector3;
    subDiv: {
        max: number;
        X: number;
        Y: number;
        Z: number;
    };
    facetDepthSort: boolean;
    facetDepthSortEnabled: boolean;
    depthSortedIndices: IndicesArray;
    depthSortedFacets: {
        ind: number;
        sqDistance: number;
    }[];
    facetDepthSortFunction: (f1: {
        ind: number;
        sqDistance: number;
    }, f2: {
        ind: number;
        sqDistance: number;
    }) => number;
    facetDepthSortFrom: Vector3;
    facetDepthSortOrigin: Vector3;
    invertedMatrix: Matrix;
}
/**
 * @internal
 **/
declare class _InternalAbstractMeshDataInfo {
    _hasVertexAlpha: boolean;
    _useVertexColors: boolean;
    _numBoneInfluencers: number;
    _applyFog: boolean;
    _receiveShadows: boolean;
    _facetData: _FacetDataStorage;
    _visibility: number;
    _skeleton: Nullable<Skeleton>;
    _layerMask: number;
    _computeBonesUsingShaders: boolean;
    _isActive: boolean;
    _onlyForInstances: boolean;
    _isActiveIntermediate: boolean;
    _onlyForInstancesIntermediate: boolean;
    _actAsRegularMesh: boolean;
    _currentLOD: Nullable<AbstractMesh>;
    _currentLODIsUpToDate: boolean;
    _collisionRetryCount: number;
    _morphTargetManager: Nullable<MorphTargetManager>;
    _renderingGroupId: number;
    _bakedVertexAnimationManager: Nullable<IBakedVertexAnimationManager>;
    _material: Nullable<Material>;
    _materialForRenderPass: Array<Material | undefined>;
    _positions: Nullable<Vector3[]>;
    _pointerOverDisableMeshTesting: boolean;
    _meshCollisionData: _MeshCollisionData;
    _enableDistantPicking: boolean;
    /** @internal
     * Bounding info that is unnafected by the addition of thin instances
     */
    _rawBoundingInfo: Nullable<BoundingInfo>;
}
/**
 * Class used to store all common mesh properties
 */
export declare class AbstractMesh extends TransformNode implements IDisposable, ICullable, IGetSetVerticesData {
    /** No occlusion */
    static OCCLUSION_TYPE_NONE: number;
    /** Occlusion set to optimistic */
    static OCCLUSION_TYPE_OPTIMISTIC: number;
    /** Occlusion set to strict */
    static OCCLUSION_TYPE_STRICT: number;
    /** Use an accurate occlusion algorithm */
    static OCCLUSION_ALGORITHM_TYPE_ACCURATE: number;
    /** Use a conservative occlusion algorithm */
    static OCCLUSION_ALGORITHM_TYPE_CONSERVATIVE: number;
    /** Default culling strategy : this is an exclusion test and it's the more accurate.
     *  Test order :
     *  Is the bounding sphere outside the frustum ?
     *  If not, are the bounding box vertices outside the frustum ?
     *  It not, then the cullable object is in the frustum.
     */
    static readonly CULLINGSTRATEGY_STANDARD = 0;
    /** Culling strategy : Bounding Sphere Only.
     *  This is an exclusion test. It's faster than the standard strategy because the bounding box is not tested.
     *  It's also less accurate than the standard because some not visible objects can still be selected.
     *  Test : is the bounding sphere outside the frustum ?
     *  If not, then the cullable object is in the frustum.
     */
    static readonly CULLINGSTRATEGY_BOUNDINGSPHERE_ONLY = 1;
    /** Culling strategy : Optimistic Inclusion.
     *  This in an inclusion test first, then the standard exclusion test.
     *  This can be faster when a cullable object is expected to be almost always in the camera frustum.
     *  This could also be a little slower than the standard test when the tested object center is not the frustum but one of its bounding box vertex is still inside.
     *  Anyway, it's as accurate as the standard strategy.
     *  Test :
     *  Is the cullable object bounding sphere center in the frustum ?
     *  If not, apply the default culling strategy.
     */
    static readonly CULLINGSTRATEGY_OPTIMISTIC_INCLUSION = 2;
    /** Culling strategy : Optimistic Inclusion then Bounding Sphere Only.
     *  This in an inclusion test first, then the bounding sphere only exclusion test.
     *  This can be the fastest test when a cullable object is expected to be almost always in the camera frustum.
     *  This could also be a little slower than the BoundingSphereOnly strategy when the tested object center is not in the frustum but its bounding sphere still intersects it.
     *  It's less accurate than the standard strategy and as accurate as the BoundingSphereOnly strategy.
     *  Test :
     *  Is the cullable object bounding sphere center in the frustum ?
     *  If not, apply the Bounding Sphere Only strategy. No Bounding Box is tested here.
     */
    static readonly CULLINGSTRATEGY_OPTIMISTIC_INCLUSION_THEN_BSPHERE_ONLY = 3;
    /**
     * No billboard
     */
    static get BILLBOARDMODE_NONE(): number;
    /** Billboard on X axis */
    static get BILLBOARDMODE_X(): number;
    /** Billboard on Y axis */
    static get BILLBOARDMODE_Y(): number;
    /** Billboard on Z axis */
    static get BILLBOARDMODE_Z(): number;
    /** Billboard on all axes */
    static get BILLBOARDMODE_ALL(): number;
    /** Billboard on using position instead of orientation */
    static get BILLBOARDMODE_USE_POSITION(): number;
    /** @internal */
    _internalAbstractMeshDataInfo: _InternalAbstractMeshDataInfo;
    /** @internal */
    _waitingMaterialId: Nullable<string>;
    /**
     * The culling strategy to use to check whether the mesh must be rendered or not.
     * This value can be changed at any time and will be used on the next render mesh selection.
     * The possible values are :
     * - AbstractMesh.CULLINGSTRATEGY_STANDARD
     * - AbstractMesh.CULLINGSTRATEGY_BOUNDINGSPHERE_ONLY
     * - AbstractMesh.CULLINGSTRATEGY_OPTIMISTIC_INCLUSION
     * - AbstractMesh.CULLINGSTRATEGY_OPTIMISTIC_INCLUSION_THEN_BSPHERE_ONLY
     * Please read each static variable documentation to get details about the culling process.
     * */
    cullingStrategy: number;
    /**
     * Gets the number of facets in the mesh
     * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/facetData#what-is-a-mesh-facet
     */
    get facetNb(): number;
    /**
     * Gets or set the number (integer) of subdivisions per axis in the partitioning space
     * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/facetData#tweaking-the-partitioning
     */
    get partitioningSubdivisions(): number;
    set partitioningSubdivisions(nb: number);
    /**
     * The ratio (float) to apply to the bounding box size to set to the partitioning space.
     * Ex : 1.01 (default) the partitioning space is 1% bigger than the bounding box
     * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/facetData#tweaking-the-partitioning
     */
    get partitioningBBoxRatio(): number;
    set partitioningBBoxRatio(ratio: number);
    /**
     * Gets or sets a boolean indicating that the facets must be depth sorted on next call to `updateFacetData()`.
     * Works only for updatable meshes.
     * Doesn't work with multi-materials
     * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/facetData#facet-depth-sort
     */
    get mustDepthSortFacets(): boolean;
    set mustDepthSortFacets(sort: boolean);
    /**
     * The location (Vector3) where the facet depth sort must be computed from.
     * By default, the active camera position.
     * Used only when facet depth sort is enabled
     * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/facetData#facet-depth-sort
     */
    get facetDepthSortFrom(): Vector3;
    set facetDepthSortFrom(location: Vector3);
    /** number of collision detection tries. Change this value if not all collisions are detected and handled properly */
    get collisionRetryCount(): number;
    set collisionRetryCount(retryCount: number);
    /**
     * gets a boolean indicating if facetData is enabled
     * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/facetData#what-is-a-mesh-facet
     */
    get isFacetDataEnabled(): boolean;
    /**
     * Gets or sets the morph target manager
     * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/morphTargets
     */
    get morphTargetManager(): Nullable<MorphTargetManager>;
    set morphTargetManager(value: Nullable<MorphTargetManager>);
    /**
     * Gets or sets the baked vertex animation manager
     * @see https://doc.babylonjs.com/features/featuresDeepDive/animation/baked_texture_animations
     */
    get bakedVertexAnimationManager(): Nullable<IBakedVertexAnimationManager>;
    set bakedVertexAnimationManager(value: Nullable<IBakedVertexAnimationManager>);
    /** @internal */
    _syncGeometryWithMorphTargetManager(): void;
    /**
     * @internal
     */
    _updateNonUniformScalingState(value: boolean): boolean;
    /** @internal */
    get rawBoundingInfo(): Nullable<BoundingInfo>;
    set rawBoundingInfo(boundingInfo: Nullable<BoundingInfo>);
    /**
     * An event triggered when this mesh collides with another one
     */
    onCollideObservable: Observable<AbstractMesh>;
    /** Set a function to call when this mesh collides with another one */
    set onCollide(callback: (collidedMesh?: AbstractMesh) => void);
    /**
     * An event triggered when the collision's position changes
     */
    onCollisionPositionChangeObservable: Observable<Vector3>;
    /** Set a function to call when the collision's position changes */
    set onCollisionPositionChange(callback: () => void);
    /**
     * An event triggered when material is changed
     */
    onMaterialChangedObservable: Observable<AbstractMesh>;
    /**
     * Gets or sets the orientation for POV movement & rotation
     */
    definedFacingForward: boolean;
    /** @internal */
    _occlusionQuery: Nullable<WebGLQuery | number>;
    /** @internal */
    _renderingGroup: Nullable<RenderingGroup>;
    /**
     * Gets or sets mesh visibility between 0 and 1 (default is 1)
     */
    get visibility(): number;
    /**
     * Gets or sets mesh visibility between 0 and 1 (default is 1)
     */
    set visibility(value: number);
    /** Gets or sets the alpha index used to sort transparent meshes
     * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/advanced/transparent_rendering#alpha-index
     */
    alphaIndex: number;
    /**
     * Gets or sets a boolean indicating if the mesh is visible (renderable). Default is true
     */
    isVisible: boolean;
    /**
     * Gets or sets a boolean indicating if the mesh can be picked (by scene.pick for instance or through actions). Default is true
     */
    isPickable: boolean;
    /**
     * Gets or sets a boolean indicating if the mesh can be near picked. Default is false
     */
    isNearPickable: boolean;
    /**
     * Gets or sets a boolean indicating if the mesh can be near grabbed. Default is false
     */
    isNearGrabbable: boolean;
    /** Gets or sets a boolean indicating that bounding boxes of subMeshes must be rendered as well (false by default) */
    showSubMeshesBoundingBox: boolean;
    /** Gets or sets a boolean indicating if the mesh must be considered as a ray blocker for lens flares (false by default)
     * @see https://doc.babylonjs.com/features/featuresDeepDive/environment/lenseFlare
     */
    isBlocker: boolean;
    /**
     * Gets or sets a boolean indicating that pointer move events must be supported on this mesh (false by default)
     */
    enablePointerMoveEvents: boolean;
    /**
     * Gets or sets the property which disables the test that is checking that the mesh under the pointer is the same than the previous time we tested for it (default: false).
     * Set this property to true if you want thin instances picking to be reported accurately when moving over the mesh.
     * Note that setting this property to true will incur some performance penalties when dealing with pointer events for this mesh so use it sparingly.
     */
    get pointerOverDisableMeshTesting(): boolean;
    set pointerOverDisableMeshTesting(disable: boolean);
    /**
     * Specifies the rendering group id for this mesh (0 by default)
     * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/advanced/transparent_rendering#rendering-groups
     */
    get renderingGroupId(): number;
    set renderingGroupId(value: number);
    /** Gets or sets current material */
    get material(): Nullable<Material>;
    set material(value: Nullable<Material>);
    /**
     * Gets the material used to render the mesh in a specific render pass
     * @param renderPassId render pass id
     * @returns material used for the render pass. If no specific material is used for this render pass, undefined is returned (meaning mesh.material is used for this pass)
     */
    getMaterialForRenderPass(renderPassId: number): Material | undefined;
    /**
     * Sets the material to be used to render the mesh in a specific render pass
     * @param renderPassId render pass id
     * @param material material to use for this render pass. If undefined is passed, no specific material will be used for this render pass but the regular material will be used instead (mesh.material)
     */
    setMaterialForRenderPass(renderPassId: number, material?: Material): void;
    /**
     * Gets or sets a boolean indicating that this mesh can receive realtime shadows
     * @see https://doc.babylonjs.com/features/featuresDeepDive/lights/shadows
     */
    get receiveShadows(): boolean;
    set receiveShadows(value: boolean);
    /** Defines color to use when rendering outline */
    outlineColor: Color3;
    /** Define width to use when rendering outline */
    outlineWidth: number;
    /** Defines color to use when rendering overlay */
    overlayColor: Color3;
    /** Defines alpha to use when rendering overlay */
    overlayAlpha: number;
    /** Gets or sets a boolean indicating that this mesh contains vertex color data with alpha values */
    get hasVertexAlpha(): boolean;
    set hasVertexAlpha(value: boolean);
    /** Gets or sets a boolean indicating that this mesh needs to use vertex color data to render (if this kind of vertex data is available in the geometry) */
    get useVertexColors(): boolean;
    set useVertexColors(value: boolean);
    /**
     * Gets or sets a boolean indicating that bone animations must be computed by the GPU (true by default)
     */
    get computeBonesUsingShaders(): boolean;
    set computeBonesUsingShaders(value: boolean);
    /** Gets or sets the number of allowed bone influences per vertex (4 by default) */
    get numBoneInfluencers(): number;
    set numBoneInfluencers(value: number);
    /** Gets or sets a boolean indicating that this mesh will allow fog to be rendered on it (true by default) */
    get applyFog(): boolean;
    set applyFog(value: boolean);
    /** When enabled, decompose picking matrices for better precision with large values for mesh position and scling */
    get enableDistantPicking(): boolean;
    set enableDistantPicking(value: boolean);
    /** Gets or sets a boolean indicating that internal octree (if available) can be used to boost submeshes selection (true by default) */
    useOctreeForRenderingSelection: boolean;
    /** Gets or sets a boolean indicating that internal octree (if available) can be used to boost submeshes picking (true by default) */
    useOctreeForPicking: boolean;
    /** Gets or sets a boolean indicating that internal octree (if available) can be used to boost submeshes collision (true by default) */
    useOctreeForCollisions: boolean;
    /**
     * Gets or sets the current layer mask (default is 0x0FFFFFFF)
     * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/layerMasksAndMultiCam
     */
    get layerMask(): number;
    set layerMask(value: number);
    /**
     * True if the mesh must be rendered in any case (this will shortcut the frustum clipping phase)
     */
    alwaysSelectAsActiveMesh: boolean;
    /**
     * Gets or sets a boolean indicating that the bounding info does not need to be kept in sync (for performance reason)
     */
    doNotSyncBoundingInfo: boolean;
    /**
     * Gets or sets the current action manager
     * @see https://doc.babylonjs.com/features/featuresDeepDive/events/actions
     */
    actionManager: Nullable<AbstractActionManager>;
    /**
     * Gets or sets the ellipsoid used to impersonate this mesh when using collision engine (default is (0.5, 1, 0.5))
     * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/camera_collisions
     */
    ellipsoid: Vector3;
    /**
     * Gets or sets the ellipsoid offset used to impersonate this mesh when using collision engine (default is (0, 0, 0))
     * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/camera_collisions
     */
    ellipsoidOffset: Vector3;
    /**
     * Gets or sets a collision mask used to mask collisions (default is -1).
     * A collision between A and B will happen if A.collisionGroup & b.collisionMask !== 0
     */
    get collisionMask(): number;
    set collisionMask(mask: number);
    /**
     * Gets or sets a collision response flag (default is true).
     * when collisionResponse is false, events are still triggered but colliding entity has no response
     * This helps creating trigger volume when user wants collision feedback events but not position/velocity
     * to respond to the collision.
     */
    get collisionResponse(): boolean;
    set collisionResponse(response: boolean);
    /**
     * Gets or sets the current collision group mask (-1 by default).
     * A collision between A and B will happen if A.collisionGroup & b.collisionMask !== 0
     */
    get collisionGroup(): number;
    set collisionGroup(mask: number);
    /**
     * Gets or sets current surrounding meshes (null by default).
     *
     * By default collision detection is tested against every mesh in the scene.
     * It is possible to set surroundingMeshes to a defined list of meshes and then only these specified
     * meshes will be tested for the collision.
     *
     * Note: if set to an empty array no collision will happen when this mesh is moved.
     */
    get surroundingMeshes(): Nullable<AbstractMesh[]>;
    set surroundingMeshes(meshes: Nullable<AbstractMesh[]>);
    /**
     * Defines edge width used when edgesRenderer is enabled
     * @see https://www.babylonjs-playground.com/#10OJSG#13
     */
    edgesWidth: number;
    /**
     * Defines edge color used when edgesRenderer is enabled
     * @see https://www.babylonjs-playground.com/#10OJSG#13
     */
    edgesColor: Color4;
    /** @internal */
    _edgesRenderer: Nullable<IEdgesRenderer>;
    /** @internal */
    _masterMesh: Nullable<AbstractMesh>;
    protected _boundingInfo: Nullable<BoundingInfo>;
    protected _boundingInfoIsDirty: boolean;
    /** @internal */
    _renderId: number;
    /**
     * Gets or sets the list of subMeshes
     * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/using/multiMaterials
     */
    subMeshes: SubMesh[];
    /** @internal */
    _intersectionsInProgress: AbstractMesh[];
    /** @internal */
    _unIndexed: boolean;
    /** @internal */
    _lightSources: Light[];
    /** Gets the list of lights affecting that mesh */
    get lightSources(): Light[];
    /** @internal */
    get _positions(): Nullable<Vector3[]>;
    /** @internal */
    _waitingData: {
        lods: Nullable<any>;
        actions: Nullable<any>;
        freezeWorldMatrix: Nullable<boolean>;
    };
    /** @internal */
    _bonesTransformMatrices: Nullable<Float32Array>;
    /** @internal */
    _transformMatrixTexture: Nullable<RawTexture>;
    /**
     * Gets or sets a skeleton to apply skinning transformations
     * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/bonesSkeletons
     */
    set skeleton(value: Nullable<Skeleton>);
    get skeleton(): Nullable<Skeleton>;
    /**
     * An event triggered when the mesh is rebuilt.
     */
    onRebuildObservable: Observable<AbstractMesh>;
    /**
     * The current mesh uniform buffer.
     * @internal Internal use only.
     */
    _uniformBuffer: UniformBuffer;
    /**
     * Creates a new AbstractMesh
     * @param name defines the name of the mesh
     * @param scene defines the hosting scene
     */
    constructor(name: string, scene?: Nullable<Scene>);
    protected _buildUniformLayout(): void;
    /**
     * Transfer the mesh values to its UBO.
     * @param world The world matrix associated with the mesh
     */
    transferToEffect(world: Matrix): void;
    /**
     * Gets the mesh uniform buffer.
     * @returns the uniform buffer of the mesh.
     */
    getMeshUniformBuffer(): UniformBuffer;
    /**
     * Returns the string "AbstractMesh"
     * @returns "AbstractMesh"
     */
    getClassName(): string;
    /**
     * Gets a string representation of the current mesh
     * @param fullDetails defines a boolean indicating if full details must be included
     * @returns a string representation of the current mesh
     */
    toString(fullDetails?: boolean): string;
    /**
     * @internal
     */
    protected _getEffectiveParent(): Nullable<Node>;
    /**
     * @internal
     */
    _getActionManagerForTrigger(trigger?: number, initialCall?: boolean): Nullable<AbstractActionManager>;
    /**
     * @internal
     */
    _rebuild(dispose?: boolean): void;
    /** @internal */
    _resyncLightSources(): void;
    /**
     * @internal
     */
    _resyncLightSource(light: Light): void;
    /** @internal */
    _unBindEffect(): void;
    /**
     * @internal
     */
    _removeLightSource(light: Light, dispose: boolean): void;
    private _markSubMeshesAsDirty;
    /**
     * @internal
     */
    _markSubMeshesAsLightDirty(dispose?: boolean): void;
    /** @internal */
    _markSubMeshesAsAttributesDirty(): void;
    /** @internal */
    _markSubMeshesAsMiscDirty(): void;
    /**
     * Flag the AbstractMesh as dirty (Forcing it to update everything)
     * @param property if set to "rotation" the objects rotationQuaternion will be set to null
     * @returns this AbstractMesh
     */
    markAsDirty(property?: string): AbstractMesh;
    /**
     * Resets the draw wrappers cache for all submeshes of this abstract mesh
     * @param passId If provided, releases only the draw wrapper corresponding to this render pass id
     */
    resetDrawCache(passId?: number): void;
    /**
     * Returns true if the mesh is blocked. Implemented by child classes
     */
    get isBlocked(): boolean;
    /**
     * Returns the mesh itself by default. Implemented by child classes
     * @param camera defines the camera to use to pick the right LOD level
     * @returns the currentAbstractMesh
     */
    getLOD(camera: Camera): Nullable<AbstractMesh>;
    /**
     * Returns 0 by default. Implemented by child classes
     * @returns an integer
     */
    getTotalVertices(): number;
    /**
     * Returns a positive integer : the total number of indices in this mesh geometry.
     * @returns the number of indices or zero if the mesh has no geometry.
     */
    getTotalIndices(): number;
    /**
     * Returns null by default. Implemented by child classes
     * @returns null
     */
    getIndices(): Nullable<IndicesArray>;
    /**
     * Returns the array of the requested vertex data kind. Implemented by child classes
     * @param kind defines the vertex data kind to use
     * @returns null
     */
    getVerticesData(kind: string): Nullable<FloatArray>;
    /**
     * Sets the vertex data of the mesh geometry for the requested `kind`.
     * If the mesh has no geometry, a new Geometry object is set to the mesh and then passed this vertex data.
     * Note that a new underlying VertexBuffer object is created each call.
     * If the `kind` is the `PositionKind`, the mesh BoundingInfo is renewed, so the bounding box and sphere, and the mesh World Matrix is recomputed.
     * @param kind defines vertex data kind:
     * * VertexBuffer.PositionKind
     * * VertexBuffer.UVKind
     * * VertexBuffer.UV2Kind
     * * VertexBuffer.UV3Kind
     * * VertexBuffer.UV4Kind
     * * VertexBuffer.UV5Kind
     * * VertexBuffer.UV6Kind
     * * VertexBuffer.ColorKind
     * * VertexBuffer.MatricesIndicesKind
     * * VertexBuffer.MatricesIndicesExtraKind
     * * VertexBuffer.MatricesWeightsKind
     * * VertexBuffer.MatricesWeightsExtraKind
     * @param data defines the data source
     * @param updatable defines if the data must be flagged as updatable (or static)
     * @param stride defines the vertex stride (size of an entire vertex). Can be null and in this case will be deduced from vertex data kind
     * @returns the current mesh
     */
    setVerticesData(kind: string, data: FloatArray, updatable?: boolean, stride?: number): AbstractMesh;
    /**
     * Updates the existing vertex data of the mesh geometry for the requested `kind`.
     * If the mesh has no geometry, it is simply returned as it is.
     * @param kind defines vertex data kind:
     * * VertexBuffer.PositionKind
     * * VertexBuffer.UVKind
     * * VertexBuffer.UV2Kind
     * * VertexBuffer.UV3Kind
     * * VertexBuffer.UV4Kind
     * * VertexBuffer.UV5Kind
     * * VertexBuffer.UV6Kind
     * * VertexBuffer.ColorKind
     * * VertexBuffer.MatricesIndicesKind
     * * VertexBuffer.MatricesIndicesExtraKind
     * * VertexBuffer.MatricesWeightsKind
     * * VertexBuffer.MatricesWeightsExtraKind
     * @param data defines the data source
     * @param updateExtends If `kind` is `PositionKind` and if `updateExtends` is true, the mesh BoundingInfo is renewed, so the bounding box and sphere, and the mesh World Matrix is recomputed
     * @param makeItUnique If true, a new global geometry is created from this data and is set to the mesh
     * @returns the current mesh
     */
    updateVerticesData(kind: string, data: FloatArray, updateExtends?: boolean, makeItUnique?: boolean): AbstractMesh;
    /**
     * Sets the mesh indices,
     * If the mesh has no geometry, a new Geometry object is created and set to the mesh.
     * @param indices Expects an array populated with integers or a typed array (Int32Array, Uint32Array, Uint16Array)
     * @param totalVertices Defines the total number of vertices
     * @returns the current mesh
     */
    setIndices(indices: IndicesArray, totalVertices: Nullable<number>): AbstractMesh;
    /**
     * Gets a boolean indicating if specific vertex data is present
     * @param kind defines the vertex data kind to use
     * @returns true is data kind is present
     */
    isVerticesDataPresent(kind: string): boolean;
    /**
     * Returns the mesh BoundingInfo object or creates a new one and returns if it was undefined.
     * Note that it returns a shallow bounding of the mesh (i.e. it does not include children).
     * However, if the mesh contains thin instances, it will be expanded to include them. If you want the "raw" bounding data instead, then use `getRawBoundingInfo()`.
     * To get the full bounding of all children, call `getHierarchyBoundingVectors` instead.
     * @returns a BoundingInfo
     */
    getBoundingInfo(): BoundingInfo;
    /**
     * Returns the bounding info unnafected by instance data.
     * @returns the bounding info of the mesh unaffected by instance data.
     */
    getRawBoundingInfo(): BoundingInfo;
    /**
     * Overwrite the current bounding info
     * @param boundingInfo defines the new bounding info
     * @returns the current mesh
     */
    setBoundingInfo(boundingInfo: BoundingInfo): AbstractMesh;
    /**
     * Returns true if there is already a bounding info
     */
    get hasBoundingInfo(): boolean;
    /**
     * Creates a new bounding info for the mesh
     * @param minimum min vector of the bounding box/sphere
     * @param maximum max vector of the bounding box/sphere
     * @param worldMatrix defines the new world matrix
     * @returns the new bounding info
     */
    buildBoundingInfo(minimum: DeepImmutable<Vector3>, maximum: DeepImmutable<Vector3>, worldMatrix?: DeepImmutable<Matrix>): BoundingInfo;
    /**
     * Uniformly scales the mesh to fit inside of a unit cube (1 X 1 X 1 units)
     * @param includeDescendants Use the hierarchy's bounding box instead of the mesh's bounding box. Default is false
     * @param ignoreRotation ignore rotation when computing the scale (ie. object will be axis aligned). Default is false
     * @param predicate predicate that is passed in to getHierarchyBoundingVectors when selecting which object should be included when scaling
     * @returns the current mesh
     */
    normalizeToUnitCube(includeDescendants?: boolean, ignoreRotation?: boolean, predicate?: Nullable<(node: AbstractMesh) => boolean>): AbstractMesh;
    /** Gets a boolean indicating if this mesh has skinning data and an attached skeleton */
    get useBones(): boolean;
    /** @internal */
    _preActivate(): void;
    /**
     * @internal
     */
    _preActivateForIntermediateRendering(renderId: number): void;
    /**
     * @internal
     */
    _activate(renderId: number, intermediateRendering: boolean): boolean;
    /** @internal */
    _postActivate(): void;
    /** @internal */
    _freeze(): void;
    /** @internal */
    _unFreeze(): void;
    /**
     * Gets the current world matrix
     * @returns a Matrix
     */
    getWorldMatrix(): Matrix;
    /** @internal */
    _getWorldMatrixDeterminant(): number;
    /**
     * Gets a boolean indicating if this mesh is an instance or a regular mesh
     */
    get isAnInstance(): boolean;
    /**
     * Gets a boolean indicating if this mesh has instances
     */
    get hasInstances(): boolean;
    /**
     * Gets a boolean indicating if this mesh has thin instances
     */
    get hasThinInstances(): boolean;
    /**
     * Perform relative position change from the point of view of behind the front of the mesh.
     * This is performed taking into account the meshes current rotation, so you do not have to care.
     * Supports definition of mesh facing forward or backward {@link definedFacingForwardSearch | See definedFacingForwardSearch }.
     * @param amountRight defines the distance on the right axis
     * @param amountUp defines the distance on the up axis
     * @param amountForward defines the distance on the forward axis
     * @returns the current mesh
     */
    movePOV(amountRight: number, amountUp: number, amountForward: number): AbstractMesh;
    /**
     * Calculate relative position change from the point of view of behind the front of the mesh.
     * This is performed taking into account the meshes current rotation, so you do not have to care.
     * Supports definition of mesh facing forward or backward {@link definedFacingForwardSearch | See definedFacingForwardSearch }.
     * @param amountRight defines the distance on the right axis
     * @param amountUp defines the distance on the up axis
     * @param amountForward defines the distance on the forward axis
     * @returns the new displacement vector
     */
    calcMovePOV(amountRight: number, amountUp: number, amountForward: number): Vector3;
    /**
     * Perform relative rotation change from the point of view of behind the front of the mesh.
     * Supports definition of mesh facing forward or backward {@link definedFacingForwardSearch | See definedFacingForwardSearch }.
     * @param flipBack defines the flip
     * @param twirlClockwise defines the twirl
     * @param tiltRight defines the tilt
     * @returns the current mesh
     */
    rotatePOV(flipBack: number, twirlClockwise: number, tiltRight: number): AbstractMesh;
    /**
     * Calculate relative rotation change from the point of view of behind the front of the mesh.
     * Supports definition of mesh facing forward or backward {@link definedFacingForwardSearch | See definedFacingForwardSearch }.
     * @param flipBack defines the flip
     * @param twirlClockwise defines the twirl
     * @param tiltRight defines the tilt
     * @returns the new rotation vector
     */
    calcRotatePOV(flipBack: number, twirlClockwise: number, tiltRight: number): Vector3;
    /**
     * This method recomputes and sets a new BoundingInfo to the mesh unless it is locked.
     * This means the mesh underlying bounding box and sphere are recomputed.
     * @param applySkeleton defines whether to apply the skeleton before computing the bounding info
     * @param applyMorph  defines whether to apply the morph target before computing the bounding info
     * @returns the current mesh
     */
    refreshBoundingInfo(applySkeleton?: boolean, applyMorph?: boolean): AbstractMesh;
    /**
     * @internal
     */
    _refreshBoundingInfo(data: Nullable<FloatArray>, bias: Nullable<Vector2>): void;
    /**
     * Internal function to get buffer data and possibly apply morphs and normals
     * @param applySkeleton
     * @param applyMorph
     * @param data
     * @param kind the kind of data you want. Can be Normal or Position
     */
    private _getData;
    /**
     * Get the normals vertex data and optionally apply skeleton and morphing.
     * @param applySkeleton defines whether to apply the skeleton
     * @param applyMorph  defines whether to apply the morph target
     * @returns the normals data
     */
    getNormalsData(applySkeleton?: boolean, applyMorph?: boolean): Nullable<FloatArray>;
    /**
     * Get the position vertex data and optionally apply skeleton and morphing.
     * @param applySkeleton defines whether to apply the skeleton
     * @param applyMorph  defines whether to apply the morph target
     * @param data defines the position data to apply the skeleton and morph to
     * @returns the position data
     */
    getPositionData(applySkeleton?: boolean, applyMorph?: boolean, data?: Nullable<FloatArray>): Nullable<FloatArray>;
    /**
     * @internal
     */
    _getPositionData(applySkeleton: boolean, applyMorph: boolean): Nullable<FloatArray>;
    /** @internal */
    _updateBoundingInfo(): AbstractMesh;
    /**
     * @internal
     */
    _updateSubMeshesBoundingInfo(matrix: DeepImmutable<Matrix>): AbstractMesh;
    /** @internal */
    protected _afterComputeWorldMatrix(): void;
    /**
     * Returns `true` if the mesh is within the frustum defined by the passed array of planes.
     * A mesh is in the frustum if its bounding box intersects the frustum
     * @param frustumPlanes defines the frustum to test
     * @returns true if the mesh is in the frustum planes
     */
    isInFrustum(frustumPlanes: Plane[]): boolean;
    /**
     * Returns `true` if the mesh is completely in the frustum defined be the passed array of planes.
     * A mesh is completely in the frustum if its bounding box it completely inside the frustum.
     * @param frustumPlanes defines the frustum to test
     * @returns true if the mesh is completely in the frustum planes
     */
    isCompletelyInFrustum(frustumPlanes: Plane[]): boolean;
    /**
     * True if the mesh intersects another mesh or a SolidParticle object
     * @param mesh defines a target mesh or SolidParticle to test
     * @param precise Unless the parameter `precise` is set to `true` the intersection is computed according to Axis Aligned Bounding Boxes (AABB), else according to OBB (Oriented BBoxes)
     * @param includeDescendants Can be set to true to test if the mesh defined in parameters intersects with the current mesh or any child meshes
     * @returns true if there is an intersection
     */
    intersectsMesh(mesh: AbstractMesh | SolidParticle, precise?: boolean, includeDescendants?: boolean): boolean;
    /**
     * Returns true if the passed point (Vector3) is inside the mesh bounding box
     * @param point defines the point to test
     * @returns true if there is an intersection
     */
    intersectsPoint(point: Vector3): boolean;
    /**
     * Gets or sets a boolean indicating that this mesh can be used in the collision engine
     * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/camera_collisions
     */
    get checkCollisions(): boolean;
    set checkCollisions(collisionEnabled: boolean);
    /**
     * Gets Collider object used to compute collisions (not physics)
     * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/camera_collisions
     */
    get collider(): Nullable<Collider>;
    /**
     * Move the mesh using collision engine
     * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/camera_collisions
     * @param displacement defines the requested displacement vector
     * @returns the current mesh
     */
    moveWithCollisions(displacement: Vector3): AbstractMesh;
    private _onCollisionPositionChange;
    /**
     * @internal
     */
    _collideForSubMesh(subMesh: SubMesh, transformMatrix: Matrix, collider: Collider): AbstractMesh;
    /**
     * @internal
     */
    _processCollisionsForSubMeshes(collider: Collider, transformMatrix: Matrix): AbstractMesh;
    /** @internal */
    _shouldConvertRHS(): boolean;
    /**
     * @internal
     */
    _checkCollision(collider: Collider): AbstractMesh;
    /** @internal */
    _generatePointsArray(): boolean;
    /**
     * Checks if the passed Ray intersects with the mesh. A mesh triangle can be picked both from its front and back sides,
     * irrespective of orientation.
     * @param ray defines the ray to use. It should be in the mesh's LOCAL coordinate space.
     * @param fastCheck defines if fast mode (but less precise) must be used (false by default)
     * @param trianglePredicate defines an optional predicate used to select faces when a mesh intersection is detected
     * @param onlyBoundingInfo defines a boolean indicating if picking should only happen using bounding info (false by default)
     * @param worldToUse defines the world matrix to use to get the world coordinate of the intersection point
     * @param skipBoundingInfo a boolean indicating if we should skip the bounding info check
     * @returns the picking info
     * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/interactions/mesh_intersect
     */
    intersects(ray: Ray, fastCheck?: boolean, trianglePredicate?: TrianglePickingPredicate, onlyBoundingInfo?: boolean, worldToUse?: Matrix, skipBoundingInfo?: boolean): PickingInfo;
    /**
     * Clones the current mesh
     * @param name defines the mesh name
     * @param newParent defines the new mesh parent
     * @param doNotCloneChildren defines a boolean indicating that children must not be cloned (false by default)
     * @returns the new mesh
     */
    clone(name: string, newParent: Nullable<Node>, doNotCloneChildren?: boolean): Nullable<AbstractMesh>;
    /**
     * Disposes all the submeshes of the current meshnp
     * @returns the current mesh
     */
    releaseSubMeshes(): AbstractMesh;
    /**
     * Releases resources associated with this abstract mesh.
     * @param doNotRecurse Set to true to not recurse into each children (recurse into each children by default)
     * @param disposeMaterialAndTextures Set to true to also dispose referenced materials and textures (false by default)
     */
    dispose(doNotRecurse?: boolean, disposeMaterialAndTextures?: boolean): void;
    /**
     * Adds the passed mesh as a child to the current mesh
     * @param mesh defines the child mesh
     * @param preserveScalingSign if true, keep scaling sign of child. Otherwise, scaling sign might change.
     * @returns the current mesh
     */
    addChild(mesh: AbstractMesh, preserveScalingSign?: boolean): AbstractMesh;
    /**
     * Removes the passed mesh from the current mesh children list
     * @param mesh defines the child mesh
     * @param preserveScalingSign if true, keep scaling sign of child. Otherwise, scaling sign might change.
     * @returns the current mesh
     */
    removeChild(mesh: AbstractMesh, preserveScalingSign?: boolean): AbstractMesh;
    /** @internal */
    private _initFacetData;
    /**
     * Updates the mesh facetData arrays and the internal partitioning when the mesh is morphed or updated.
     * This method can be called within the render loop.
     * You don't need to call this method by yourself in the render loop when you update/morph a mesh with the methods CreateXXX() as they automatically manage this computation
     * @returns the current mesh
     * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/facetData
     */
    updateFacetData(): AbstractMesh;
    /**
     * Returns the facetLocalNormals array.
     * The normals are expressed in the mesh local spac
     * @returns an array of Vector3
     * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/facetData
     */
    getFacetLocalNormals(): Vector3[];
    /**
     * Returns the facetLocalPositions array.
     * The facet positions are expressed in the mesh local space
     * @returns an array of Vector3
     * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/facetData
     */
    getFacetLocalPositions(): Vector3[];
    /**
     * Returns the facetLocalPartitioning array
     * @returns an array of array of numbers
     * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/facetData
     */
    getFacetLocalPartitioning(): number[][];
    /**
     * Returns the i-th facet position in the world system.
     * This method allocates a new Vector3 per call
     * @param i defines the facet index
     * @returns a new Vector3
     * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/facetData
     */
    getFacetPosition(i: number): Vector3;
    /**
     * Sets the reference Vector3 with the i-th facet position in the world system
     * @param i defines the facet index
     * @param ref defines the target vector
     * @returns the current mesh
     * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/facetData
     */
    getFacetPositionToRef(i: number, ref: Vector3): AbstractMesh;
    /**
     * Returns the i-th facet normal in the world system.
     * This method allocates a new Vector3 per call
     * @param i defines the facet index
     * @returns a new Vector3
     * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/facetData
     */
    getFacetNormal(i: number): Vector3;
    /**
     * Sets the reference Vector3 with the i-th facet normal in the world system
     * @param i defines the facet index
     * @param ref defines the target vector
     * @returns the current mesh
     * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/facetData
     */
    getFacetNormalToRef(i: number, ref: Vector3): this;
    /**
     * Returns the facets (in an array) in the same partitioning block than the one the passed coordinates are located (expressed in the mesh local system)
     * @param x defines x coordinate
     * @param y defines y coordinate
     * @param z defines z coordinate
     * @returns the array of facet indexes
     * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/facetData
     */
    getFacetsAtLocalCoordinates(x: number, y: number, z: number): Nullable<number[]>;
    /**
     * Returns the closest mesh facet index at (x,y,z) World coordinates, null if not found
     * @param x defines x coordinate
     * @param y defines y coordinate
     * @param z defines z coordinate
     * @param projected sets as the (x,y,z) world projection on the facet
     * @param checkFace if true (default false), only the facet "facing" to (x,y,z) or only the ones "turning their backs", according to the parameter "facing" are returned
     * @param facing if facing and checkFace are true, only the facet "facing" to (x, y, z) are returned : positive dot (x, y, z) * facet position. If facing si false and checkFace is true, only the facet "turning their backs" to (x, y, z) are returned : negative dot (x, y, z) * facet position
     * @returns the face index if found (or null instead)
     * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/facetData
     */
    getClosestFacetAtCoordinates(x: number, y: number, z: number, projected?: Vector3, checkFace?: boolean, facing?: boolean): Nullable<number>;
    /**
     * Returns the closest mesh facet index at (x,y,z) local coordinates, null if not found
     * @param x defines x coordinate
     * @param y defines y coordinate
     * @param z defines z coordinate
     * @param projected sets as the (x,y,z) local projection on the facet
     * @param checkFace if true (default false), only the facet "facing" to (x,y,z) or only the ones "turning their backs", according to the parameter "facing" are returned
     * @param facing if facing and checkFace are true, only the facet "facing" to (x, y, z) are returned : positive dot (x, y, z) * facet position. If facing si false and checkFace is true, only the facet "turning their backs" to (x, y, z) are returned : negative dot (x, y, z) * facet position
     * @returns the face index if found (or null instead)
     * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/facetData
     */
    getClosestFacetAtLocalCoordinates(x: number, y: number, z: number, projected?: Vector3, checkFace?: boolean, facing?: boolean): Nullable<number>;
    /**
     * Returns the object "parameter" set with all the expected parameters for facetData computation by ComputeNormals()
     * @returns the parameters
     * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/facetData
     */
    getFacetDataParameters(): any;
    /**
     * Disables the feature FacetData and frees the related memory
     * @returns the current mesh
     * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/facetData
     */
    disableFacetData(): AbstractMesh;
    /**
     * Updates the AbstractMesh indices array
     * @param indices defines the data source
     * @param offset defines the offset in the index buffer where to store the new data (can be null)
     * @param gpuMemoryOnly defines a boolean indicating that only the GPU memory must be updated leaving the CPU version of the indices unchanged (false by default)
     * @returns the current mesh
     */
    updateIndices(indices: IndicesArray, offset?: number, gpuMemoryOnly?: boolean): AbstractMesh;
    /**
     * Creates new normals data for the mesh
     * @param updatable defines if the normal vertex buffer must be flagged as updatable
     * @returns the current mesh
     */
    createNormals(updatable: boolean): AbstractMesh;
    /**
     * Align the mesh with a normal
     * @param normal defines the normal to use
     * @param upDirection can be used to redefined the up vector to use (will use the (0, 1, 0) by default)
     * @returns the current mesh
     */
    alignWithNormal(normal: Vector3, upDirection?: Vector3): AbstractMesh;
    /** @internal */
    _checkOcclusionQuery(): boolean;
    /**
     * Disables the mesh edge rendering mode
     * @returns the currentAbstractMesh
     */
    disableEdgesRendering(): AbstractMesh;
    /**
     * Enables the edge rendering mode on the mesh.
     * This mode makes the mesh edges visible
     * @param epsilon defines the maximal distance between two angles to detect a face
     * @param checkVerticesInsteadOfIndices indicates that we should check vertex list directly instead of faces
     * @param options options to the edge renderer
     * @returns the currentAbstractMesh
     * @see https://www.babylonjs-playground.com/#19O9TU#0
     */
    enableEdgesRendering(epsilon?: number, checkVerticesInsteadOfIndices?: boolean, options?: IEdgesRendererOptions): AbstractMesh;
    /**
     * This function returns all of the particle systems in the scene that use the mesh as an emitter.
     * @returns an array of particle systems in the scene that use the mesh as an emitter
     */
    getConnectedParticleSystems(): IParticleSystem[];
}
export {};
