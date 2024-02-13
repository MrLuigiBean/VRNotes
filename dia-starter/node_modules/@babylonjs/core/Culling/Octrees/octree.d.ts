import type { SmartArray } from "../../Misc/smartArray";
import type { Vector3 } from "../../Maths/math.vector";
import type { SubMesh } from "../../Meshes/subMesh";
import type { AbstractMesh } from "../../Meshes/abstractMesh";
import type { Ray } from "../../Culling/ray";
import { OctreeBlock } from "./octreeBlock";
import type { Plane } from "../../Maths/math.plane";
/**
 * Octrees are a really powerful data structure that can quickly select entities based on space coordinates.
 * @see https://doc.babylonjs.com/features/featuresDeepDive/scene/optimizeOctrees
 */
export declare class Octree<T> {
    /** Defines the maximum depth (sub-levels) for your octree. Default value is 2, which means 8 8 8 = 512 blocks :) (This parameter takes precedence over capacity.) */
    maxDepth: number;
    /**
     * Blocks within the octree containing objects
     */
    blocks: Array<OctreeBlock<T>>;
    /**
     * Content stored in the octree
     */
    dynamicContent: T[];
    private _maxBlockCapacity;
    private _selectionContent;
    private _creationFunc;
    /**
     * Creates a octree
     * @see https://doc.babylonjs.com/features/featuresDeepDive/scene/optimizeOctrees
     * @param creationFunc function to be used to instantiate the octree
     * @param maxBlockCapacity defines the maximum number of meshes you want on your octree's leaves (default: 64)
     * @param maxDepth defines the maximum depth (sub-levels) for your octree. Default value is 2, which means 8 8 8 = 512 blocks :) (This parameter takes precedence over capacity.)
     */
    constructor(creationFunc: (entry: T, block: OctreeBlock<T>) => void, maxBlockCapacity?: number, 
    /** Defines the maximum depth (sub-levels) for your octree. Default value is 2, which means 8 8 8 = 512 blocks :) (This parameter takes precedence over capacity.) */
    maxDepth?: number);
    /**
     * Updates the octree by adding blocks for the passed in meshes within the min and max world parameters
     * @param worldMin worldMin for the octree blocks var blockSize = new Vector3((worldMax.x - worldMin.x) / 2, (worldMax.y - worldMin.y) / 2, (worldMax.z - worldMin.z) / 2);
     * @param worldMax worldMax for the octree blocks var blockSize = new Vector3((worldMax.x - worldMin.x) / 2, (worldMax.y - worldMin.y) / 2, (worldMax.z - worldMin.z) / 2);
     * @param entries meshes to be added to the octree blocks
     */
    update(worldMin: Vector3, worldMax: Vector3, entries: T[]): void;
    /**
     * Adds a mesh to the octree
     * @param entry Mesh to add to the octree
     */
    addMesh(entry: T): void;
    /**
     * Remove an element from the octree
     * @param entry defines the element to remove
     */
    removeMesh(entry: T): void;
    /**
     * Selects an array of meshes within the frustum
     * @param frustumPlanes The frustum planes to use which will select all meshes within it
     * @param allowDuplicate If duplicate objects are allowed in the resulting object array
     * @returns array of meshes within the frustum
     */
    select(frustumPlanes: Plane[], allowDuplicate?: boolean): SmartArray<T>;
    /**
     * Test if the octree intersect with the given bounding sphere and if yes, then add its content to the selection array
     * @param sphereCenter defines the bounding sphere center
     * @param sphereRadius defines the bounding sphere radius
     * @param allowDuplicate defines if the selection array can contains duplicated entries
     * @returns an array of objects that intersect the sphere
     */
    intersects(sphereCenter: Vector3, sphereRadius: number, allowDuplicate?: boolean): SmartArray<T>;
    /**
     * Test if the octree intersect with the given ray and if yes, then add its content to resulting array
     * @param ray defines the ray to test with
     * @returns array of intersected objects
     */
    intersectsRay(ray: Ray): SmartArray<T>;
    /**
     * Adds a mesh into the octree block if it intersects the block
     * @param entry
     * @param block
     */
    static CreationFuncForMeshes: (entry: AbstractMesh, block: OctreeBlock<AbstractMesh>) => void;
    /**
     * Adds a submesh into the octree block if it intersects the block
     * @param entry
     * @param block
     */
    static CreationFuncForSubMeshes: (entry: SubMesh, block: OctreeBlock<SubMesh>) => void;
}
