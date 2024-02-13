import type { Nullable } from "../types";
import type { Camera } from "../Cameras/camera";
import type { Scene } from "../scene";
import type { SubMesh } from "../Meshes/subMesh";
import type { AbstractMesh } from "../Meshes/abstractMesh";
import type { Mesh } from "../Meshes/mesh";
import { Texture } from "../Materials/Textures/texture";
import type { Effect } from "../Materials/effect";
import { Material } from "../Materials/material";
import { EffectLayer } from "./effectLayer";
import { Color4 } from "../Maths/math.color";
import "../Shaders/glowMapMerge.fragment";
import "../Shaders/glowMapMerge.vertex";
import "../Layers/effectLayerSceneComponent";
declare module "../abstractScene" {
    interface AbstractScene {
        /**
         * Return the first glow layer of the scene with a given name.
         * @param name The name of the glow layer to look for.
         * @returns The glow layer if found otherwise null.
         */
        getGlowLayerByName(name: string): Nullable<GlowLayer>;
    }
}
/**
 * Glow layer options. This helps customizing the behaviour
 * of the glow layer.
 */
export interface IGlowLayerOptions {
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
     * How big is the kernel of the blur texture. Default: 32
     */
    blurKernelSize: number;
    /**
     * The camera attached to the layer. Default: null
     */
    camera: Nullable<Camera>;
    /**
     * Enable MSAA by choosing the number of samples. Default: 1
     */
    mainTextureSamples?: number;
    /**
     * The rendering group to draw the layer in. Default: -1
     */
    renderingGroupId: number;
    /**
     * Forces the merge step to be done in ldr (clamp values > 1). Default: false
     */
    ldrMerge?: boolean;
    /**
     * Defines the blend mode used by the merge. Default: ALPHA_ADD
     */
    alphaBlendingMode?: number;
    /**
     * The type of the main texture. Default: TEXTURETYPE_UNSIGNED_INT
     */
    mainTextureType: number;
    /**
     * Whether or not to generate a stencil buffer. Default: false
     */
    generateStencilBuffer: boolean;
}
/**
 * The glow layer Helps adding a glow effect around the emissive parts of a mesh.
 *
 * Once instantiated in a scene, by default, all the emissive meshes will glow.
 *
 * Documentation: https://doc.babylonjs.com/features/featuresDeepDive/mesh/glowLayer
 */
export declare class GlowLayer extends EffectLayer {
    /**
     * Effect Name of the layer.
     */
    static readonly EffectName = "GlowLayer";
    /**
     * The default blur kernel size used for the glow.
     */
    static DefaultBlurKernelSize: number;
    /**
     * The default texture size ratio used for the glow.
     */
    static DefaultTextureRatio: number;
    /**
     * Sets the kernel size of the blur.
     */
    set blurKernelSize(value: number);
    /**
     * Gets the kernel size of the blur.
     */
    get blurKernelSize(): number;
    /**
     * Sets the glow intensity.
     */
    set intensity(value: number);
    /**
     * Gets the glow intensity.
     */
    get intensity(): number;
    private _options;
    private _intensity;
    private _horizontalBlurPostprocess1;
    private _verticalBlurPostprocess1;
    private _horizontalBlurPostprocess2;
    private _verticalBlurPostprocess2;
    private _blurTexture1;
    private _blurTexture2;
    private _postProcesses1;
    private _postProcesses2;
    private _includedOnlyMeshes;
    private _excludedMeshes;
    private _meshesUsingTheirOwnMaterials;
    /**
     * Callback used to let the user override the color selection on a per mesh basis
     */
    customEmissiveColorSelector: (mesh: Mesh, subMesh: SubMesh, material: Material, result: Color4) => void;
    /**
     * Callback used to let the user override the texture selection on a per mesh basis
     */
    customEmissiveTextureSelector: (mesh: Mesh, subMesh: SubMesh, material: Material) => Texture;
    /**
     * Instantiates a new glow Layer and references it to the scene.
     * @param name The name of the layer
     * @param scene The scene to use the layer in
     * @param options Sets of none mandatory options to use with the layer (see IGlowLayerOptions for more information)
     */
    constructor(name: string, scene?: Scene, options?: Partial<IGlowLayerOptions>);
    /**
     * Get the effect name of the layer.
     * @returns The effect name
     */
    getEffectName(): string;
    /**
     * Create the merge effect. This is the shader use to blit the information back
     * to the main canvas at the end of the scene rendering.
     */
    protected _createMergeEffect(): Effect;
    /**
     * Creates the render target textures and post processes used in the glow layer.
     */
    protected _createTextureAndPostProcesses(): void;
    /**
     * @returns The blur kernel size used by the glow.
     * Note: The value passed in the options is divided by 2 for back compatibility.
     */
    private _getEffectiveBlurKernelSize;
    /**
     * Checks for the readiness of the element composing the layer.
     * @param subMesh the mesh to check for
     * @param useInstances specify whether or not to use instances to render the mesh
     * @returns true if ready otherwise, false
     */
    isReady(subMesh: SubMesh, useInstances: boolean): boolean;
    /**
     * Returns whether or not the layer needs stencil enabled during the mesh rendering.
     */
    needStencil(): boolean;
    /**
     * Returns true if the mesh can be rendered, otherwise false.
     * @param mesh The mesh to render
     * @param material The material used on the mesh
     * @returns true if it can be rendered otherwise false
     */
    protected _canRenderMesh(mesh: AbstractMesh, material: Material): boolean;
    /**
     * Implementation specific of rendering the generating effect on the main canvas.
     * @param effect The effect used to render through
     */
    protected _internalRender(effect: Effect): void;
    /**
     * Sets the required values for both the emissive texture and and the main color.
     * @param mesh
     * @param subMesh
     * @param material
     */
    protected _setEmissiveTextureAndColor(mesh: Mesh, subMesh: SubMesh, material: Material): void;
    /**
     * Returns true if the mesh should render, otherwise false.
     * @param mesh The mesh to render
     * @returns true if it should render otherwise false
     */
    protected _shouldRenderMesh(mesh: Mesh): boolean;
    /**
     * Adds specific effects defines.
     * @param defines The defines to add specifics to.
     */
    protected _addCustomEffectDefines(defines: string[]): void;
    /**
     * Add a mesh in the exclusion list to prevent it to impact or being impacted by the glow layer.
     * @param mesh The mesh to exclude from the glow layer
     */
    addExcludedMesh(mesh: Mesh): void;
    /**
     * Remove a mesh from the exclusion list to let it impact or being impacted by the glow layer.
     * @param mesh The mesh to remove
     */
    removeExcludedMesh(mesh: Mesh): void;
    /**
     * Add a mesh in the inclusion list to impact or being impacted by the glow layer.
     * @param mesh The mesh to include in the glow layer
     */
    addIncludedOnlyMesh(mesh: Mesh): void;
    /**
     * Remove a mesh from the Inclusion list to prevent it to impact or being impacted by the glow layer.
     * @param mesh The mesh to remove
     */
    removeIncludedOnlyMesh(mesh: Mesh): void;
    /**
     * Determine if a given mesh will be used in the glow layer
     * @param mesh The mesh to test
     * @returns true if the mesh will be highlighted by the current glow layer
     */
    hasMesh(mesh: AbstractMesh): boolean;
    /**
     * Defines whether the current material of the mesh should be use to render the effect.
     * @param mesh defines the current mesh to render
     */
    protected _useMeshMaterial(mesh: AbstractMesh): boolean;
    /**
     * Add a mesh to be rendered through its own material and not with emissive only.
     * @param mesh The mesh for which we need to use its material
     */
    referenceMeshToUseItsOwnMaterial(mesh: AbstractMesh): void;
    /**
     * Remove a mesh from being rendered through its own material and not with emissive only.
     * @param mesh The mesh for which we need to not use its material
     */
    unReferenceMeshFromUsingItsOwnMaterial(mesh: AbstractMesh): void;
    /**
     * Free any resources and references associated to a mesh.
     * Internal use
     * @param mesh The mesh to free.
     * @internal
     */
    _disposeMesh(mesh: Mesh): void;
    /**
     * Gets the class name of the effect layer
     * @returns the string with the class name of the effect layer
     */
    getClassName(): string;
    /**
     * Serializes this glow layer
     * @returns a serialized glow layer object
     */
    serialize(): any;
    /**
     * Creates a Glow Layer from parsed glow layer data
     * @param parsedGlowLayer defines glow layer data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing the glow layer information
     * @returns a parsed Glow Layer
     */
    static Parse(parsedGlowLayer: any, scene: Scene, rootUrl: string): GlowLayer;
}
