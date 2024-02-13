import type { Nullable, FloatArray, IndicesArray } from "../types";
import type { Vector3 } from "../Maths/math.vector";
import { Matrix } from "../Maths/math.vector";
import type { Camera } from "../Cameras/camera";
import type { Node } from "../node";
import { AbstractMesh } from "../Meshes/abstractMesh";
import { Mesh } from "../Meshes/mesh";
import type { Material } from "../Materials/material";
import type { Skeleton } from "../Bones/skeleton";
import { TransformNode } from "./transformNode";
import type { Light } from "../Lights/light";
import { VertexBuffer } from "../Buffers/buffer";
/**
 * Creates an instance based on a source mesh.
 */
export declare class InstancedMesh extends AbstractMesh {
    private _sourceMesh;
    private _currentLOD;
    private _billboardWorldMatrix;
    /** @internal */
    _indexInSourceMeshInstanceArray: number;
    /** @internal */
    _distanceToCamera: number;
    /** @internal */
    _previousWorldMatrix: Nullable<Matrix>;
    /**
     * Creates a new InstancedMesh object from the mesh source.
     * @param name defines the name of the instance
     * @param source the mesh to create the instance from
     */
    constructor(name: string, source: Mesh);
    /**
     * Returns the string "InstancedMesh".
     */
    getClassName(): string;
    /** Gets the list of lights affecting that mesh */
    get lightSources(): Light[];
    _resyncLightSources(): void;
    _resyncLightSource(): void;
    _removeLightSource(): void;
    /**
     * If the source mesh receives shadows
     */
    get receiveShadows(): boolean;
    set receiveShadows(_value: boolean);
    /**
     * The material of the source mesh
     */
    get material(): Nullable<Material>;
    set material(_value: Nullable<Material>);
    /**
     * Visibility of the source mesh
     */
    get visibility(): number;
    set visibility(_value: number);
    /**
     * Skeleton of the source mesh
     */
    get skeleton(): Nullable<Skeleton>;
    set skeleton(_value: Nullable<Skeleton>);
    /**
     * Rendering ground id of the source mesh
     */
    get renderingGroupId(): number;
    set renderingGroupId(value: number);
    /**
     * Returns the total number of vertices (integer).
     */
    getTotalVertices(): number;
    /**
     * Returns a positive integer : the total number of indices in this mesh geometry.
     * @returns the number of indices or zero if the mesh has no geometry.
     */
    getTotalIndices(): number;
    /**
     * The source mesh of the instance
     */
    get sourceMesh(): Mesh;
    /**
     * Creates a new InstancedMesh object from the mesh model.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/copies/instances
     * @param name defines the name of the new instance
     * @returns a new InstancedMesh
     */
    createInstance(name: string): InstancedMesh;
    /**
     * Is this node ready to be used/rendered
     * @param completeCheck defines if a complete check (including materials and lights) has to be done (false by default)
     * @returns {boolean} is it ready
     */
    isReady(completeCheck?: boolean): boolean;
    /**
     * Returns an array of integers or a typed array (Int32Array, Uint32Array, Uint16Array) populated with the mesh indices.
     * @param kind kind of verticies to retrieve (eg. positions, normals, uvs, etc.)
     * @param copyWhenShared If true (default false) and and if the mesh geometry is shared among some other meshes, the returned array is a copy of the internal one.
     * @param forceCopy defines a boolean forcing the copy of the buffer no matter what the value of copyWhenShared is
     * @returns a float array or a Float32Array of the requested kind of data : positions, normals, uvs, etc.
     */
    getVerticesData(kind: string, copyWhenShared?: boolean, forceCopy?: boolean): Nullable<FloatArray>;
    /**
     * Sets the vertex data of the mesh geometry for the requested `kind`.
     * If the mesh has no geometry, a new Geometry object is set to the mesh and then passed this vertex data.
     * The `data` are either a numeric array either a Float32Array.
     * The parameter `updatable` is passed as is to the underlying Geometry object constructor (if initially none) or updater.
     * The parameter `stride` is an optional positive integer, it is usually automatically deducted from the `kind` (3 for positions or normals, 2 for UV, etc).
     * Note that a new underlying VertexBuffer object is created each call.
     * If the `kind` is the `PositionKind`, the mesh BoundingInfo is renewed, so the bounding box and sphere, and the mesh World Matrix is recomputed.
     *
     * Possible `kind` values :
     * - VertexBuffer.PositionKind
     * - VertexBuffer.UVKind
     * - VertexBuffer.UV2Kind
     * - VertexBuffer.UV3Kind
     * - VertexBuffer.UV4Kind
     * - VertexBuffer.UV5Kind
     * - VertexBuffer.UV6Kind
     * - VertexBuffer.ColorKind
     * - VertexBuffer.MatricesIndicesKind
     * - VertexBuffer.MatricesIndicesExtraKind
     * - VertexBuffer.MatricesWeightsKind
     * - VertexBuffer.MatricesWeightsExtraKind
     *
     * Returns the Mesh.
     * @param kind
     * @param data
     * @param updatable
     * @param stride
     */
    setVerticesData(kind: string, data: FloatArray, updatable?: boolean, stride?: number): AbstractMesh;
    /**
     * Updates the existing vertex data of the mesh geometry for the requested `kind`.
     * If the mesh has no geometry, it is simply returned as it is.
     * The `data` are either a numeric array either a Float32Array.
     * No new underlying VertexBuffer object is created.
     * If the `kind` is the `PositionKind` and if `updateExtends` is true, the mesh BoundingInfo is renewed, so the bounding box and sphere, and the mesh World Matrix is recomputed.
     * If the parameter `makeItUnique` is true, a new global geometry is created from this positions and is set to the mesh.
     *
     * Possible `kind` values :
     * - VertexBuffer.PositionKind
     * - VertexBuffer.UVKind
     * - VertexBuffer.UV2Kind
     * - VertexBuffer.UV3Kind
     * - VertexBuffer.UV4Kind
     * - VertexBuffer.UV5Kind
     * - VertexBuffer.UV6Kind
     * - VertexBuffer.ColorKind
     * - VertexBuffer.MatricesIndicesKind
     * - VertexBuffer.MatricesIndicesExtraKind
     * - VertexBuffer.MatricesWeightsKind
     * - VertexBuffer.MatricesWeightsExtraKind
     *
     * Returns the Mesh.
     * @param kind
     * @param data
     * @param updateExtends
     * @param makeItUnique
     */
    updateVerticesData(kind: string, data: FloatArray, updateExtends?: boolean, makeItUnique?: boolean): Mesh;
    /**
     * Sets the mesh indices.
     * Expects an array populated with integers or a typed array (Int32Array, Uint32Array, Uint16Array).
     * If the mesh has no geometry, a new Geometry object is created and set to the mesh.
     * This method creates a new index buffer each call.
     * Returns the Mesh.
     * @param indices
     * @param totalVertices
     */
    setIndices(indices: IndicesArray, totalVertices?: Nullable<number>): Mesh;
    /**
     * Boolean : True if the mesh owns the requested kind of data.
     * @param kind
     */
    isVerticesDataPresent(kind: string): boolean;
    /**
     * Returns an array of indices (IndicesArray).
     */
    getIndices(): Nullable<IndicesArray>;
    get _positions(): Nullable<Vector3[]>;
    /**
     * This method recomputes and sets a new BoundingInfo to the mesh unless it is locked.
     * This means the mesh underlying bounding box and sphere are recomputed.
     * @param applySkeleton defines whether to apply the skeleton before computing the bounding info
     * @param applyMorph  defines whether to apply the morph target before computing the bounding info
     * @returns the current mesh
     */
    refreshBoundingInfo(applySkeleton?: boolean, applyMorph?: boolean): InstancedMesh;
    /** @internal */
    _preActivate(): InstancedMesh;
    /**
     * @internal
     */
    _activate(renderId: number, intermediateRendering: boolean): boolean;
    /** @internal */
    _postActivate(): void;
    getWorldMatrix(): Matrix;
    get isAnInstance(): boolean;
    /**
     * Returns the current associated LOD AbstractMesh.
     * @param camera
     */
    getLOD(camera: Camera): AbstractMesh;
    /**
     * @internal
     */
    _preActivateForIntermediateRendering(renderId: number): Mesh;
    /** @internal */
    _syncSubMeshes(): InstancedMesh;
    /** @internal */
    _generatePointsArray(): boolean;
    /** @internal */
    _updateBoundingInfo(): AbstractMesh;
    /**
     * Creates a new InstancedMesh from the current mesh.
     *
     * Returns the clone.
     * @param name the cloned mesh name
     * @param newParent the optional Node to parent the clone to.
     * @param doNotCloneChildren if `true` the model children aren't cloned.
     * @param newSourceMesh if set this mesh will be used as the source mesh instead of ths instance's one
     * @returns the clone
     */
    clone(name: string, newParent?: Nullable<Node>, doNotCloneChildren?: boolean, newSourceMesh?: Mesh): InstancedMesh;
    /**
     * Disposes the InstancedMesh.
     * Returns nothing.
     * @param doNotRecurse
     * @param disposeMaterialAndTextures
     */
    dispose(doNotRecurse?: boolean, disposeMaterialAndTextures?: boolean): void;
    /**
     * @internal
     */
    _serializeAsParent(serializationObject: any): void;
    /**
     * Instantiate (when possible) or clone that node with its hierarchy
     * @param newParent defines the new parent to use for the instance (or clone)
     * @param options defines options to configure how copy is done
     * @param options.doNotInstantiate defines if the model must be instantiated or just cloned
     * @param options.newSourcedMesh newSourcedMesh the new source mesh for the instance (or clone)
     * @param onNewNodeCreated defines an option callback to call when a clone or an instance is created
     * @returns an instance (or a clone) of the current node with its hierarchy
     */
    instantiateHierarchy(newParent?: Nullable<TransformNode>, options?: {
        doNotInstantiate: boolean | ((node: TransformNode) => boolean);
        newSourcedMesh?: Mesh;
    }, onNewNodeCreated?: (source: TransformNode, clone: TransformNode) => void): Nullable<TransformNode>;
}
declare module "./mesh" {
    interface Mesh {
        /**
         * Register a custom buffer that will be instanced
         * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/copies/instances#custom-buffers
         * @param kind defines the buffer kind
         * @param stride defines the stride in floats
         */
        registerInstancedBuffer(kind: string, stride: number): void;
        /**
         * Invalidate VertexArrayObjects belonging to the mesh (but not to the Geometry of the mesh).
         */
        _invalidateInstanceVertexArrayObject(): void;
        /**
         * true to use the edge renderer for all instances of this mesh
         */
        edgesShareWithInstances: boolean;
        /** @internal */
        _userInstancedBuffersStorage: {
            data: {
                [key: string]: Float32Array;
            };
            sizes: {
                [key: string]: number;
            };
            vertexBuffers: {
                [key: string]: Nullable<VertexBuffer>;
            };
            strides: {
                [key: string]: number;
            };
            vertexArrayObjects?: {
                [key: string]: WebGLVertexArrayObject;
            };
        };
    }
}
declare module "./abstractMesh" {
    interface AbstractMesh {
        /**
         * Object used to store instanced buffers defined by user
         * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/copies/instances#custom-buffers
         */
        instancedBuffers: {
            [key: string]: any;
        };
    }
}
