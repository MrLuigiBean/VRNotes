import type { Collider } from "./collider";
import { Vector3 } from "../Maths/math.vector";
import type { Nullable } from "../types";
import type { Observer } from "../Misc/observable";
import type { AbstractMesh } from "../Meshes/abstractMesh";
/**
 * @internal
 */
export declare class _MeshCollisionData {
    _checkCollisions: boolean;
    _collisionMask: number;
    _collisionGroup: number;
    _surroundingMeshes: Nullable<AbstractMesh[]>;
    _collider: Nullable<Collider>;
    _oldPositionForCollisions: Vector3;
    _diffPositionForCollisions: Vector3;
    _onCollideObserver: Nullable<Observer<AbstractMesh>>;
    _onCollisionPositionChangeObserver: Nullable<Observer<Vector3>>;
    _collisionResponse: boolean;
}
