import type { Nullable, IndicesArray } from "../types";
import { Vector3 } from "../Maths/math.vector";
import type { AbstractMesh } from "../Meshes/abstractMesh";
import { Plane } from "../Maths/math.plane";
/** @internal */
export declare class Collider {
    /** Define if a collision was found */
    collisionFound: boolean;
    /**
     * Define last intersection point in local space
     */
    intersectionPoint: Vector3;
    /**
     * Define last collided mesh
     */
    collidedMesh: Nullable<AbstractMesh>;
    /**
     * If true, it check for double sided faces and only returns 1 collision instead of 2
     */
    static DoubleSidedCheck: boolean;
    private _collisionPoint;
    private _planeIntersectionPoint;
    private _tempVector;
    private _tempVector2;
    private _tempVector3;
    private _tempVector4;
    private _edge;
    private _baseToVertex;
    private _destinationPoint;
    private _slidePlaneNormal;
    private _displacementVector;
    /** @internal */
    _radius: Vector3;
    /** @internal */
    _retry: number;
    private _velocity;
    private _basePoint;
    private _epsilon;
    /** @internal */
    _velocityWorldLength: number;
    /** @internal */
    _basePointWorld: Vector3;
    private _velocityWorld;
    private _normalizedVelocity;
    /** @internal */
    _initialVelocity: Vector3;
    /** @internal */
    _initialPosition: Vector3;
    private _nearestDistance;
    private _collisionMask;
    private _velocitySquaredLength;
    private _nearestDistanceSquared;
    get collisionMask(): number;
    set collisionMask(mask: number);
    /**
     * Gets the plane normal used to compute the sliding response (in local space)
     */
    get slidePlaneNormal(): Vector3;
    /**
     * @internal
     */
    _initialize(source: Vector3, dir: Vector3, e: number): void;
    /**
     * @internal
     */
    _checkPointInTriangle(point: Vector3, pa: Vector3, pb: Vector3, pc: Vector3, n: Vector3): boolean;
    /**
     * @internal
     */
    _canDoCollision(sphereCenter: Vector3, sphereRadius: number, vecMin: Vector3, vecMax: Vector3): boolean;
    /**
     * @internal
     */
    _testTriangle(faceIndex: number, trianglePlaneArray: Array<Plane>, p1: Vector3, p2: Vector3, p3: Vector3, hasMaterial: boolean, hostMesh: AbstractMesh): void;
    /**
     * @internal
     */
    _collide(trianglePlaneArray: Array<Plane>, pts: Vector3[], indices: IndicesArray, indexStart: number, indexEnd: number, decal: number, hasMaterial: boolean, hostMesh: AbstractMesh, invertTriangles?: boolean, triangleStrip?: boolean): void;
    /**
     * @internal
     */
    _getResponse(pos: Vector3, vel: Vector3): void;
}
