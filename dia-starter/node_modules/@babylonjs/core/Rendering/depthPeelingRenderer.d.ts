import type { Effect } from "../Materials/effect";
import type { SubMesh } from "../Meshes/subMesh";
import type { AbstractMesh } from "../Meshes/abstractMesh";
import { SmartArray } from "../Misc/smartArray";
import type { Scene } from "../scene";
import type { PrePassRenderer } from "./prePassRenderer";
import "../Shaders/postprocess.vertex";
import "../Shaders/oitFinal.fragment";
import "../Shaders/oitBackBlend.fragment";
/**
 * The depth peeling renderer that performs
 * Order independant transparency (OIT).
 * This should not be instanciated directly, as it is part of a scene component
 */
export declare class DepthPeelingRenderer {
    private _scene;
    private _engine;
    private _depthMrts;
    private _thinTextures;
    private _colorMrts;
    private _blendBackMrt;
    private _outputRT;
    private _blendBackEffectWrapper;
    private _blendBackEffectWrapperPingPong;
    private _finalEffectWrapper;
    private _effectRenderer;
    private _currentPingPongState;
    private _prePassEffectConfiguration;
    private _blendBackTexture;
    private _layoutCacheFormat;
    private _layoutCache;
    private _renderPassIds;
    private _candidateSubMeshes;
    private _excludedSubMeshes;
    private _excludedMeshes;
    private static _DEPTH_CLEAR_VALUE;
    private static _MIN_DEPTH;
    private static _MAX_DEPTH;
    private _colorCache;
    private _passCount;
    /**
     * Number of depth peeling passes. As we are using dual depth peeling, each pass two levels of transparency are processed.
     */
    get passCount(): number;
    set passCount(count: number);
    private _useRenderPasses;
    /**
     * Instructs the renderer to use render passes. It is an optimization that makes the rendering faster for some engines (like WebGPU) but that consumes more memory, so it is disabled by default.
     */
    get useRenderPasses(): boolean;
    set useRenderPasses(usePasses: boolean);
    /**
     * Add a mesh in the exclusion list to prevent it to be handled by the depth peeling renderer
     * @param mesh The mesh to exclude from the depth peeling renderer
     */
    addExcludedMesh(mesh: AbstractMesh): void;
    /**
     * Remove a mesh from the exclusion list of the depth peeling renderer
     * @param mesh The mesh to remove
     */
    removeExcludedMesh(mesh: AbstractMesh): void;
    /**
     * Instanciates the depth peeling renderer
     * @param scene Scene to attach to
     * @param passCount Number of depth layers to peel
     * @returns The depth peeling renderer
     */
    constructor(scene: Scene, passCount?: number);
    private _createRenderPassIds;
    private _releaseRenderPassIds;
    private _createTextures;
    private _disposeTextures;
    private _updateTextures;
    private _updateTextureReferences;
    private _createEffects;
    /**
     * Links to the prepass renderer
     * @param prePassRenderer The scene PrePassRenderer
     */
    setPrePassRenderer(prePassRenderer: PrePassRenderer): void;
    /**
     * Binds depth peeling textures on an effect
     * @param effect The effect to bind textures on
     */
    bind(effect: Effect): void;
    private _renderSubMeshes;
    private _finalCompose;
    /**
     * Checks if the depth peeling renderer is ready to render transparent meshes
     * @returns true if the depth peeling renderer is ready to render the transparent meshes
     */
    isReady(): boolean;
    /**
     * Renders transparent submeshes with depth peeling
     * @param transparentSubMeshes List of transparent meshes to render
     * @returns The array of submeshes that could not be handled by this renderer
     */
    render(transparentSubMeshes: SmartArray<SubMesh>): SmartArray<SubMesh>;
    /**
     * Disposes the depth peeling renderer and associated ressources
     */
    dispose(): void;
}
