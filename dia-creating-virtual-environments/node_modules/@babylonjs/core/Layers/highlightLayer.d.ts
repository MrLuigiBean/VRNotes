import { Observable } from "../Misc/observable";
import type { Nullable } from "../types";
import type { Camera } from "../Cameras/camera";
import type { Scene } from "../scene";
import type { SubMesh } from "../Meshes/subMesh";
import type { AbstractMesh } from "../Meshes/abstractMesh";
import type { Mesh } from "../Meshes/mesh";
import type { Effect } from "../Materials/effect";
import { Material } from "../Materials/material";
import { EffectLayer } from "./effectLayer";
import { Color4, Color3 } from "../Maths/math.color";
import "../Shaders/glowMapMerge.fragment";
import "../Shaders/glowMapMerge.vertex";
import "../Shaders/glowBlurPostProcess.fragment";
import "../Layers/effectLayerSceneComponent";
declare module "../abstractScene" {
    interface AbstractScene {
        /**
         * Return a the first highlight layer of the scene with a given name.
         * @param name The name of the highlight layer to look for.
         * @returns The highlight layer if found otherwise null.
         */
        getHighlightLayerByName(name: string): Nullable<HighlightLayer>;
    }
}
/**
 * Highlight layer options. This helps customizing the behaviour
 * of the highlight layer.
 */
export interface IHighlightLayerOptions {
    /**
     * Multiplication factor apply to the canvas size to compute the render target size
     * used to generated the glowing objects (the smaller the faster). Default: 0.5
     */
    mainTextureRatio: number;
    /**
     * Enforces a fixed size texture to ensure resize independent blur. Default: undefined
     */
    mainTextureFixedSize?: number;
    /**
     * Multiplication factor apply to the main texture size in the first step of the blur to reduce the size
     * of the picture to blur (the smaller the faster). Default: 0.5
     */
    blurTextureSizeRatio: number;
    /**
     * How big in texel of the blur texture is the vertical blur. Default: 1
     */
    blurVerticalSize: number;
    /**
     * How big in texel of the blur texture is the horizontal blur. Default: 1
     */
    blurHorizontalSize: number;
    /**
     * Alpha blending mode used to apply the blur.  Default: ALPHA_COMBINE
     */
    alphaBlendingMode: number;
    /**
     * The camera attached to the layer. Default: null
     */
    camera: Nullable<Camera>;
    /**
     * Should we display highlight as a solid stroke? Default: false
     */
    isStroke?: boolean;
    /**
     * The rendering group to draw the layer in. Default: -1
     */
    renderingGroupId: number;
    /**
     * The type of the main texture. Default: TEXTURETYPE_UNSIGNED_INT
     */
    mainTextureType: number;
}
/**
 * The highlight layer Helps adding a glow effect around a mesh.
 *
 * Once instantiated in a scene, simply use the addMesh or removeMesh method to add or remove
 * glowy meshes to your scene.
 *
 * !!! THIS REQUIRES AN ACTIVE STENCIL BUFFER ON THE CANVAS !!!
 */
export declare class HighlightLayer extends EffectLayer {
    name: string;
    /**
     * Effect Name of the highlight layer.
     */
    static readonly EffectName = "HighlightLayer";
    /**
     * The neutral color used during the preparation of the glow effect.
     * This is black by default as the blend operation is a blend operation.
     */
    static NeutralColor: Color4;
    /**
     * Stencil value used for glowing meshes.
     */
    static GlowingMeshStencilReference: number;
    /**
     * Stencil value used for the other meshes in the scene.
     */
    static NormalMeshStencilReference: number;
    /**
     * Specifies whether or not the inner glow is ACTIVE in the layer.
     */
    innerGlow: boolean;
    /**
     * Specifies whether or not the outer glow is ACTIVE in the layer.
     */
    outerGlow: boolean;
    /**
     * Specifies the horizontal size of the blur.
     */
    set blurHorizontalSize(value: number);
    /**
     * Specifies the vertical size of the blur.
     */
    set blurVerticalSize(value: number);
    /**
     * Gets the horizontal size of the blur.
     */
    get blurHorizontalSize(): number;
    /**
     * Gets the vertical size of the blur.
     */
    get blurVerticalSize(): number;
    /**
     * An event triggered when the highlight layer is being blurred.
     */
    onBeforeBlurObservable: Observable<HighlightLayer>;
    /**
     * An event triggered when the highlight layer has been blurred.
     */
    onAfterBlurObservable: Observable<HighlightLayer>;
    private _instanceGlowingMeshStencilReference;
    private _options;
    private _downSamplePostprocess;
    private _horizontalBlurPostprocess;
    private _verticalBlurPostprocess;
    private _blurTexture;
    private _meshes;
    private _excludedMeshes;
    /**
     * Instantiates a new highlight Layer and references it to the scene..
     * @param name The name of the layer
     * @param scene The scene to use the layer in
     * @param options Sets of none mandatory options to use with the layer (see IHighlightLayerOptions for more information)
     */
    constructor(name: string, scene?: Scene, options?: Partial<IHighlightLayerOptions>);
    /**
     * Get the effect name of the layer.
     * @returns The effect name
     */
    getEffectName(): string;
    protected _numInternalDraws(): number;
    /**
     * Create the merge effect. This is the shader use to blit the information back
     * to the main canvas at the end of the scene rendering.
     */
    protected _createMergeEffect(): Effect;
    /**
     * Creates the render target textures and post processes used in the highlight layer.
     */
    protected _createTextureAndPostProcesses(): void;
    /**
     * Returns whether or not the layer needs stencil enabled during the mesh rendering.
     */
    needStencil(): boolean;
    /**
     * Checks for the readiness of the element composing the layer.
     * @param subMesh the mesh to check for
     * @param useInstances specify whether or not to use instances to render the mesh
     * @returns true if ready otherwise, false
     */
    isReady(subMesh: SubMesh, useInstances: boolean): boolean;
    /**
     * Implementation specific of rendering the generating effect on the main canvas.
     * @param effect The effect used to render through
     * @param renderIndex
     */
    protected _internalRender(effect: Effect, renderIndex: number): void;
    /**
     * Returns true if the layer contains information to display, otherwise false.
     */
    shouldRender(): boolean;
    /**
     * Returns true if the mesh should render, otherwise false.
     * @param mesh The mesh to render
     * @returns true if it should render otherwise false
     */
    protected _shouldRenderMesh(mesh: Mesh): boolean;
    /**
     * Returns true if the mesh can be rendered, otherwise false.
     * @param mesh The mesh to render
     * @param material The material used on the mesh
     * @returns true if it can be rendered otherwise false
     */
    protected _canRenderMesh(mesh: AbstractMesh, material: Material): boolean;
    /**
     * Adds specific effects defines.
     * @param defines The defines to add specifics to.
     */
    protected _addCustomEffectDefines(defines: string[]): void;
    /**
     * Sets the required values for both the emissive texture and and the main color.
     * @param mesh
     * @param subMesh
     * @param material
     */
    protected _setEmissiveTextureAndColor(mesh: Mesh, subMesh: SubMesh, material: Material): void;
    /**
     * Add a mesh in the exclusion list to prevent it to impact or being impacted by the highlight layer.
     * @param mesh The mesh to exclude from the highlight layer
     */
    addExcludedMesh(mesh: Mesh): void;
    /**
     * Remove a mesh from the exclusion list to let it impact or being impacted by the highlight layer.
     * @param mesh The mesh to highlight
     */
    removeExcludedMesh(mesh: Mesh): void;
    /**
     * Determine if a given mesh will be highlighted by the current HighlightLayer
     * @param mesh mesh to test
     * @returns true if the mesh will be highlighted by the current HighlightLayer
     */
    hasMesh(mesh: AbstractMesh): boolean;
    /**
     * Add a mesh in the highlight layer in order to make it glow with the chosen color.
     * @param mesh The mesh to highlight
     * @param color The color of the highlight
     * @param glowEmissiveOnly Extract the glow from the emissive texture
     */
    addMesh(mesh: Mesh, color: Color3, glowEmissiveOnly?: boolean): void;
    /**
     * Remove a mesh from the highlight layer in order to make it stop glowing.
     * @param mesh The mesh to highlight
     */
    removeMesh(mesh: Mesh): void;
    /**
     * Remove all the meshes currently referenced in the highlight layer
     */
    removeAllMeshes(): void;
    /**
     * Force the stencil to the normal expected value for none glowing parts
     * @param mesh
     */
    private _defaultStencilReference;
    /**
     * Free any resources and references associated to a mesh.
     * Internal use
     * @param mesh The mesh to free.
     * @internal
     */
    _disposeMesh(mesh: Mesh): void;
    /**
     * Dispose the highlight layer and free resources.
     */
    dispose(): void;
    /**
     * Gets the class name of the effect layer
     * @returns the string with the class name of the effect layer
     */
    getClassName(): string;
    /**
     * Serializes this Highlight layer
     * @returns a serialized Highlight layer object
     */
    serialize(): any;
    /**
     * Creates a Highlight layer from parsed Highlight layer data
     * @param parsedHightlightLayer defines the Highlight layer data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing the Highlight layer information
     * @returns a parsed Highlight layer
     */
    static Parse(parsedHightlightLayer: any, scene: Scene, rootUrl: string): HighlightLayer;
}
