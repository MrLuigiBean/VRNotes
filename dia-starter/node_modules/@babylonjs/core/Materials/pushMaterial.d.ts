import type { Nullable } from "../types";
import type { Scene } from "../scene";
import { Matrix } from "../Maths/math.vector";
import type { AbstractMesh } from "../Meshes/abstractMesh";
import type { Mesh } from "../Meshes/mesh";
import { Material } from "../Materials/material";
import type { Effect } from "../Materials/effect";
import type { SubMesh } from "../Meshes/subMesh";
/**
 * Base class of materials working in push mode in babylon JS
 * @internal
 */
export declare class PushMaterial extends Material {
    protected _activeEffect?: Effect;
    protected _normalMatrix: Matrix;
    constructor(name: string, scene?: Scene, storeEffectOnSubMeshes?: boolean);
    getEffect(): Effect;
    isReady(mesh?: AbstractMesh, useInstances?: boolean): boolean;
    protected _isReadyForSubMesh(subMesh: SubMesh): boolean;
    /**
     * Binds the given world matrix to the active effect
     *
     * @param world the matrix to bind
     */
    bindOnlyWorldMatrix(world: Matrix): void;
    /**
     * Binds the given normal matrix to the active effect
     *
     * @param normalMatrix the matrix to bind
     */
    bindOnlyNormalMatrix(normalMatrix: Matrix): void;
    bind(world: Matrix, mesh?: Mesh): void;
    protected _afterBind(mesh?: Mesh, effect?: Nullable<Effect>): void;
    protected _mustRebind(scene: Scene, effect: Effect, visibility?: number): boolean;
    dispose(forceDisposeEffect?: boolean, forceDisposeTextures?: boolean, notBoundToMesh?: boolean): void;
}
