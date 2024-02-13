import { PhysicsBody } from "./physicsBody";
import type { PhysicsMaterial } from "./physicsMaterial";
import { PhysicsShape } from "./physicsShape";
import type { Scene } from "../../scene";
import type { TransformNode } from "../../Meshes/transformNode";
import { Quaternion, Vector3 } from "../../Maths/math.vector";
import { PhysicsShapeType } from "./IPhysicsEnginePlugin";
import type { Mesh } from "../../Meshes/mesh";
/**
 * The interface for the physics aggregate parameters
 */
export interface PhysicsAggregateParameters {
    /**
     * The mass of the physics aggregate
     */
    mass: number;
    /**
     * The friction of the physics aggregate
     */
    friction?: number;
    /**
     * The coefficient of restitution of the physics aggregate
     */
    restitution?: number;
    /**
     * Radius for sphere, cylinder and capsule
     */
    radius?: number;
    /**
     * Starting point for cylinder/capsule
     */
    pointA?: Vector3;
    /**
     * Ending point for cylinder/capsule
     */
    pointB?: Vector3;
    /**
     * Extents for box
     */
    extents?: Vector3;
    /**
     * Orientation for box
     */
    rotation?: Quaternion;
    /**
     * mesh local center
     */
    center?: Vector3;
    /**
     * mesh object. Used for mesh and convex hull aggregates.
     */
    mesh?: Mesh;
    /**
     * Physics engine will try to make this body sleeping and not active
     */
    startAsleep?: boolean;
    /**
     * If true, mark the created shape as a trigger shape
     */
    isTriggerShape?: boolean;
}
/**
 * Helper class to create and interact with a PhysicsAggregate.
 * This is a transition object that works like Physics Plugin V1 Impostors.
 * This helper instanciate all mandatory physics objects to get a body/shape and material.
 * It's less efficient that handling body and shapes independently but for prototyping or
 * a small numbers of physics objects, it's good enough.
 */
export declare class PhysicsAggregate {
    /**
     * The physics-enabled object used as the physics aggregate
     */
    transformNode: TransformNode;
    /**
     * The type of the physics aggregate
     */
    type: PhysicsShapeType | PhysicsShape;
    private _options;
    private _scene?;
    /**
     * The body that is associated with this aggregate
     */
    body: PhysicsBody;
    /**
     * The shape that is associated with this aggregate
     */
    shape: PhysicsShape;
    /**
     * The material that is associated with this aggregate
     */
    material: PhysicsMaterial;
    private _disposeShapeWhenDisposed;
    private _nodeDisposeObserver;
    constructor(
    /**
     * The physics-enabled object used as the physics aggregate
     */
    transformNode: TransformNode, 
    /**
     * The type of the physics aggregate
     */
    type: PhysicsShapeType | PhysicsShape, _options?: PhysicsAggregateParameters, _scene?: Scene | undefined);
    private _getObjectBoundingBox;
    private _hasVertices;
    private _addSizeOptions;
    /**
     * Releases the body, shape and material
     */
    dispose(): void;
}
