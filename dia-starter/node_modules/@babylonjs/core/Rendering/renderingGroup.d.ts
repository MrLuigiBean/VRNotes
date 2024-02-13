import { SmartArray, SmartArrayNoDuplicate } from "../Misc/smartArray";
import type { SubMesh } from "../Meshes/subMesh";
import type { AbstractMesh } from "../Meshes/abstractMesh";
import type { Nullable } from "../types";
import type { IParticleSystem } from "../Particles/IParticleSystem";
import type { IEdgesRenderer } from "./edgesRenderer";
import type { ISpriteManager } from "../Sprites/spriteManager";
import type { Material } from "../Materials/material";
import type { Scene } from "../scene";
/**
 * This represents the object necessary to create a rendering group.
 * This is exclusively used and created by the rendering manager.
 * To modify the behavior, you use the available helpers in your scene or meshes.
 * @internal
 */
export declare class RenderingGroup {
    index: number;
    private static _ZeroVector;
    private _scene;
    private _opaqueSubMeshes;
    private _transparentSubMeshes;
    private _alphaTestSubMeshes;
    private _depthOnlySubMeshes;
    private _particleSystems;
    private _spriteManagers;
    private _opaqueSortCompareFn;
    private _alphaTestSortCompareFn;
    private _transparentSortCompareFn;
    private _renderOpaque;
    private _renderAlphaTest;
    private _renderTransparent;
    /** @internal */
    _empty: boolean;
    /** @internal */
    _edgesRenderers: SmartArrayNoDuplicate<IEdgesRenderer>;
    onBeforeTransparentRendering: () => void;
    /**
     * Set the opaque sort comparison function.
     * If null the sub meshes will be render in the order they were created
     */
    set opaqueSortCompareFn(value: Nullable<(a: SubMesh, b: SubMesh) => number>);
    /**
     * Set the alpha test sort comparison function.
     * If null the sub meshes will be render in the order they were created
     */
    set alphaTestSortCompareFn(value: Nullable<(a: SubMesh, b: SubMesh) => number>);
    /**
     * Set the transparent sort comparison function.
     * If null the sub meshes will be render in the order they were created
     */
    set transparentSortCompareFn(value: Nullable<(a: SubMesh, b: SubMesh) => number>);
    /**
     * Creates a new rendering group.
     * @param index The rendering group index
     * @param scene
     * @param opaqueSortCompareFn The opaque sort comparison function. If null no order is applied
     * @param alphaTestSortCompareFn The alpha test sort comparison function. If null no order is applied
     * @param transparentSortCompareFn The transparent sort comparison function. If null back to front + alpha index sort is applied
     */
    constructor(index: number, scene: Scene, opaqueSortCompareFn?: Nullable<(a: SubMesh, b: SubMesh) => number>, alphaTestSortCompareFn?: Nullable<(a: SubMesh, b: SubMesh) => number>, transparentSortCompareFn?: Nullable<(a: SubMesh, b: SubMesh) => number>);
    /**
     * Render all the sub meshes contained in the group.
     * @param customRenderFunction Used to override the default render behaviour of the group.
     * @param renderSprites
     * @param renderParticles
     * @param activeMeshes
     * @returns true if rendered some submeshes.
     */
    render(customRenderFunction: Nullable<(opaqueSubMeshes: SmartArray<SubMesh>, transparentSubMeshes: SmartArray<SubMesh>, alphaTestSubMeshes: SmartArray<SubMesh>, depthOnlySubMeshes: SmartArray<SubMesh>) => void>, renderSprites: boolean, renderParticles: boolean, activeMeshes: Nullable<AbstractMesh[]>): void;
    /**
     * Renders the opaque submeshes in the order from the opaqueSortCompareFn.
     * @param subMeshes The submeshes to render
     */
    private _renderOpaqueSorted;
    /**
     * Renders the opaque submeshes in the order from the alphatestSortCompareFn.
     * @param subMeshes The submeshes to render
     */
    private _renderAlphaTestSorted;
    /**
     * Renders the opaque submeshes in the order from the transparentSortCompareFn.
     * @param subMeshes The submeshes to render
     */
    private _renderTransparentSorted;
    /**
     * Renders the submeshes in a specified order.
     * @param subMeshes The submeshes to sort before render
     * @param sortCompareFn The comparison function use to sort
     * @param camera The camera position use to preprocess the submeshes to help sorting
     * @param transparent Specifies to activate blending if true
     */
    private static _RenderSorted;
    /**
     * Build in function which can be applied to ensure meshes of a special queue (opaque, alpha test, transparent)
     * are rendered back to front if in the same alpha index.
     *
     * @param a The first submesh
     * @param b The second submesh
     * @returns The result of the comparison
     */
    static defaultTransparentSortCompare(a: SubMesh, b: SubMesh): number;
    /**
     * Build in function which can be applied to ensure meshes of a special queue (opaque, alpha test, transparent)
     * are rendered back to front.
     *
     * @param a The first submesh
     * @param b The second submesh
     * @returns The result of the comparison
     */
    static backToFrontSortCompare(a: SubMesh, b: SubMesh): number;
    /**
     * Build in function which can be applied to ensure meshes of a special queue (opaque, alpha test, transparent)
     * are rendered front to back (prevent overdraw).
     *
     * @param a The first submesh
     * @param b The second submesh
     * @returns The result of the comparison
     */
    static frontToBackSortCompare(a: SubMesh, b: SubMesh): number;
    /**
     * Build in function which can be applied to ensure meshes of a special queue (opaque, alpha test, transparent)
     * are grouped by material then geometry.
     *
     * @param a The first submesh
     * @param b The second submesh
     * @returns The result of the comparison
     */
    static PainterSortCompare(a: SubMesh, b: SubMesh): number;
    /**
     * Resets the different lists of submeshes to prepare a new frame.
     */
    prepare(): void;
    /**
     * Resets the different lists of sprites to prepare a new frame.
     */
    prepareSprites(): void;
    dispose(): void;
    /**
     * Inserts the submesh in its correct queue depending on its material.
     * @param subMesh The submesh to dispatch
     * @param [mesh] Optional reference to the submeshes's mesh. Provide if you have an exiting reference to improve performance.
     * @param [material] Optional reference to the submeshes's material. Provide if you have an exiting reference to improve performance.
     */
    dispatch(subMesh: SubMesh, mesh?: AbstractMesh, material?: Nullable<Material>): void;
    dispatchSprites(spriteManager: ISpriteManager): void;
    dispatchParticles(particleSystem: IParticleSystem): void;
    private _renderParticles;
    private _renderSprites;
}
