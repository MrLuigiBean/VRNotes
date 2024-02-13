import { Vector3 } from "../Maths/math.vector.js";
/**
 * Holds the data for the raycast result
 * @see https://doc.babylonjs.com/features/featuresDeepDive/physics/usingPhysicsEngine
 */
export class PhysicsRaycastResult {
    constructor() {
        this._hasHit = false;
        this._hitDistance = 0;
        this._hitNormalWorld = Vector3.Zero();
        this._hitPointWorld = Vector3.Zero();
        this._rayFromWorld = Vector3.Zero();
        this._rayToWorld = Vector3.Zero();
        this._triangleIndex = -1;
    }
    /**
     * Gets if there was a hit
     */
    get hasHit() {
        return this._hasHit;
    }
    /**
     * Gets the distance from the hit
     */
    get hitDistance() {
        return this._hitDistance;
    }
    /**
     * Gets the hit normal/direction in the world
     */
    get hitNormalWorld() {
        return this._hitNormalWorld;
    }
    /**
     * Gets the hit point in the world
     */
    get hitPointWorld() {
        return this._hitPointWorld;
    }
    /**
     * Gets the ray "start point" of the ray in the world
     */
    get rayFromWorld() {
        return this._rayFromWorld;
    }
    /**
     * Gets the ray "end point" of the ray in the world
     */
    get rayToWorld() {
        return this._rayToWorld;
    }
    /*
     * The index of the original triangle which was hit. Will be -1 if contact point is not on a mesh shape
     */
    get triangleIndex() {
        return this._triangleIndex;
    }
    /**
     * Sets the hit data (normal & point in world space)
     * @param hitNormalWorld defines the normal in world space
     * @param hitPointWorld defines the point in world space
     */
    setHitData(hitNormalWorld, hitPointWorld, triangleIndex) {
        this._hasHit = true;
        this._hitNormalWorld.set(hitNormalWorld.x, hitNormalWorld.y, hitNormalWorld.z);
        this._hitPointWorld.set(hitPointWorld.x, hitPointWorld.y, hitPointWorld.z);
        this._triangleIndex = triangleIndex !== null && triangleIndex !== void 0 ? triangleIndex : -1;
    }
    /**
     * Sets the distance from the start point to the hit point
     * @param distance
     */
    setHitDistance(distance) {
        this._hitDistance = distance;
    }
    /**
     * Calculates the distance manually
     */
    calculateHitDistance() {
        this._hitDistance = Vector3.Distance(this._rayFromWorld, this._hitPointWorld);
    }
    /**
     * Resets all the values to default
     * @param from The from point on world space
     * @param to The to point on world space
     */
    reset(from = Vector3.Zero(), to = Vector3.Zero()) {
        this._rayFromWorld.copyFrom(from);
        this._rayToWorld.copyFrom(to);
        this._hasHit = false;
        this._hitDistance = 0;
        this._hitNormalWorld.setAll(0);
        this._hitPointWorld.setAll(0);
        this._triangleIndex = -1;
        this.body = undefined;
        this.bodyIndex = undefined;
    }
}
//# sourceMappingURL=physicsRaycastResult.js.map