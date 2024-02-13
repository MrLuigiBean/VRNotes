import type { Matrix } from "../Maths/math.vector";
import type { Mesh } from "../Meshes/mesh";
import type { Scene } from "../scene";
import type { Effect } from "../Materials/effect";
/**
 * Configuration needed for prepass-capable materials
 */
export declare class PrePassConfiguration {
    /**
     * Previous world matrices of meshes carrying this material
     * Used for computing velocity
     */
    previousWorldMatrices: {
        [index: number]: Matrix;
    };
    /**
     * Previous view project matrix
     * Used for computing velocity
     */
    previousViewProjection: Matrix;
    /**
     * Current view projection matrix
     * Used for computing velocity
     */
    currentViewProjection: Matrix;
    /**
     * Previous bones of meshes carrying this material
     * Used for computing velocity
     */
    previousBones: {
        [index: number]: Float32Array;
    };
    private _lastUpdateFrameId;
    /**
     * Add the required uniforms to the current list.
     * @param uniforms defines the current uniform list.
     */
    static AddUniforms(uniforms: string[]): void;
    /**
     * Add the required samplers to the current list.
     * @param samplers defines the current sampler list.
     */
    static AddSamplers(samplers: string[]): void;
    /**
     * Binds the material data.
     * @param effect defines the effect to update
     * @param scene defines the scene the material belongs to.
     * @param mesh The mesh
     * @param world World matrix of this mesh
     * @param isFrozen Is the material frozen
     */
    bindForSubMesh(effect: Effect, scene: Scene, mesh: Mesh, world: Matrix, isFrozen: boolean): void;
}
