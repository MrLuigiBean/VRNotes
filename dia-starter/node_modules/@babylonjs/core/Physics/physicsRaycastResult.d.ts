import { Vector3 } from "../Maths/math.vector";
import type { PhysicsBody } from "./v2/physicsBody";
/**
 * Interface for query parameters in the raycast function.
 * @see the "Collision Filtering" section in https://github.com/eoineoineoin/glTF/tree/MSFT_RigidBodies/extensions/2.0/Vendor/MSFT_collision_primitives
 */
export interface IRaycastQuery {
    /** Membership mask */
    membership?: number;
    /** CollideWith mask */
    collideWith?: number;
}
/**
 * Holds the data for the raycast result
 * @see https://doc.babylonjs.com/features/featuresDeepDive/physics/usingPhysicsEngine
 */
export declare class PhysicsRaycastResult {
    private _hasHit;
    private _hitDistance;
    private _hitNormalWorld;
    private _hitPointWorld;
    private _rayFromWorld;
    private _rayToWorld;
    private _triangleIndex;
    /**
     * The Physics body that the ray hit
     */
    body?: PhysicsBody;
    /**
     * The body Index in case the Physics body is using instances
     */
    bodyIndex?: number;
    /**
     * Gets if there was a hit
     */
    get hasHit(): boolean;
    /**
     * Gets the distance from the hit
     */
    get hitDistance(): number;
    /**
     * Gets the hit normal/direction in the world
     */
    get hitNormalWorld(): Vector3;
    /**
     * Gets the hit point in the world
     */
    get hitPointWorld(): Vector3;
    /**
     * Gets the ray "start point" of the ray in the world
     */
    get rayFromWorld(): Vector3;
    /**
     * Gets the ray "end point" of the ray in the world
     */
    get rayToWorld(): Vector3;
    get triangleIndex(): number;
    /**
     * Sets the hit data (normal & point in world space)
     * @param hitNormalWorld defines the normal in world space
     * @param hitPointWorld defines the point in world space
     */
    setHitData(hitNormalWorld: IXYZ, hitPointWorld: IXYZ, triangleIndex?: number): void;
    /**
     * Sets the distance from the start point to the hit point
     * @param distance
     */
    setHitDistance(distance: number): void;
    /**
     * Calculates the distance manually
     */
    calculateHitDistance(): void;
    /**
     * Resets all the values to default
     * @param from The from point on world space
     * @param to The to point on world space
     */
    reset(from?: Vector3, to?: Vector3): void;
}
/**
 * Interface for the size containing width and height
 */
interface IXYZ {
    /**
     * X
     */
    x: number;
    /**
     * Y
     */
    y: number;
    /**
     * Z
     */
    z: number;
}
export {};
