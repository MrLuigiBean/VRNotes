import type { Nullable } from "../types";
import { Scene } from "../scene";
import { Vector3 } from "../Maths/math.vector";
import { Collider } from "./collider";
import type { AbstractMesh } from "../Meshes/abstractMesh";
/** @internal */
export interface ICollisionCoordinator {
    createCollider(): Collider;
    getNewPosition(position: Vector3, displacement: Vector3, collider: Collider, maximumRetry: number, excludedMesh: Nullable<AbstractMesh>, onNewPosition: (collisionIndex: number, newPosition: Vector3, collidedMesh: Nullable<AbstractMesh>) => void, collisionIndex: number): void;
    init(scene: Scene): void;
}
/** @internal */
export declare class DefaultCollisionCoordinator implements ICollisionCoordinator {
    private _scene;
    private _scaledPosition;
    private _scaledVelocity;
    private _finalPosition;
    getNewPosition(position: Vector3, displacement: Vector3, collider: Collider, maximumRetry: number, excludedMesh: AbstractMesh, onNewPosition: (collisionIndex: number, newPosition: Vector3, collidedMesh: Nullable<AbstractMesh>) => void, collisionIndex: number): void;
    createCollider(): Collider;
    init(scene: Scene): void;
    private _collideWithWorld;
}
