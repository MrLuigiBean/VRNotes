import { Observable } from "../Misc/observable";
import type { Nullable } from "../types";
import type { Camera } from "../Cameras/camera";
import type { Scene } from "../scene";
import type { ISize } from "../Maths/math.size";
import { Color4 } from "../Maths/math.color";
import { Engine } from "../Engines/engine";
import type { SubMesh } from "../Meshes/subMesh";
import type { AbstractMesh } from "../Meshes/abstractMesh";
import type { Mesh } from "../Meshes/mesh";
import type { PostProcess } from "../PostProcesses/postProcess";
import type { BaseTexture } from "../Materials/Textures/baseTexture";
import { RenderTargetTexture } from "../Materials/Textures/renderTargetTexture";
import type { Effect } from "../Materials/effect";
import { Material } from "../Materials/material";
import "../Shaders/glowMapGeneration.fragment";
import "../Shaders/glowMapGeneration.vertex";
/**
 * Effect layer options. This helps customizing the behaviour
 * of the effect layer.
 */
export interface IEffectLayerOptions {
    /**
     * Multiplication factor apply to the canvas size to compute the render target size
     * used to generated the objects (the smaller the faster). Default: 0.5
     */
    mainTextureRatio: number;
    /**
     * Enforces a fixed size texture to ensure effect stability across devices. Default: undefined
     */
    mainTextureFixedSize?: number;
    /**
     * Alpha blending mode used to apply the blur. Default depends of the implementation. Default: ALPHA_COMBINE
     */
    alphaBlendingMode: number;
    /**
     * The camera attached to the layer. Default: null
     */
    camera: Nullable<Camera>;
    /**
     * The rendering group to draw the layer in. Default: -1
     */
    renderingGroupId: number;
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
 * The effect layer Helps adding post process effect blended with the main pass.
 *
 * This can be for instance use to generate glow or highlight effects on the scene.
 *
 * The effect layer class can not be used directly and is intented to inherited from to be
 * customized per effects.
 */
export declare abstract class EffectLayer {
    private _vertexBuffers;
    private _indexBuffer;
    private _effectLayerOptions;
    private _mergeDrawWrapper;
    protected _scene: Scene;
    protected _engine: Engine;
    protected _maxSize: number;
    protected _mainTextureDesiredSize: ISize;
    protected _mainTexture: RenderTargetTexture;
    protected _shouldRender: boolean;
    protected _postProcesses: PostProcess[];
    protected _textures: BaseTexture[];
    protected _emissiveTextureAndColor: {
        texture: Nullable<BaseTexture>;
        color: Color4;
    };
    protected _effectIntensity: {
        [meshUniqueId: number]: number;
    };
    /**
     * The name of the layer
     */
    name: string;
    /**
     * The clear color of the texture used to generate the glow map.
     */
    neutralColor: Color4;
    /**
     * Specifies whether the highlight layer is enabled or not.
     */
    isEnabled: boolean;
    /**
     * Gets the camera attached to the layer.
     */
    get camera(): Nullable<Camera>;
    /**
     * Gets the rendering group id the layer should render in.
     */
    get renderingGroupId(): number;
    set renderingGroupId(renderingGroupId: number);
    /**
     * Specifies if the bounding boxes should be rendered normally or if they should undergo the effect of the layer
     */
    disableBoundingBoxesFromEffectLayer: boolean;
    /**
     * An event triggered when the effect layer has been disposed.
     */
    onDisposeObservable: Observable<EffectLayer>;
    /**
     * An event triggered when the effect layer is about rendering the main texture with the glowy parts.
     */
    onBeforeRenderMainTextureObservable: Observable<EffectLayer>;
    /**
     * An event triggered when the generated texture is being merged in the scene.
     */
    onBeforeComposeObservable: Observable<EffectLayer>;
    /**
     * An event triggered when the mesh is rendered into the effect render target.
     */
    onBeforeRenderMeshToEffect: Observable<AbstractMesh>;
    /**
     * An event triggered after the mesh has been rendered into the effect render target.
     */
    onAfterRenderMeshToEffect: Observable<AbstractMesh>;
    /**
     * An event triggered when the generated texture has been merged in the scene.
     */
    onAfterComposeObservable: Observable<EffectLayer>;
    /**
     * An event triggered when the effect layer changes its size.
     */
    onSizeChangedObservable: Observable<EffectLayer>;
    /**
     * Gets the main texture where the effect is rendered
     */
    get mainTexture(): RenderTargetTexture;
    /**
     * @internal
     */
    static _SceneComponentInitialization: (scene: Scene) => void;
    private _materialForRendering;
    /**
     * Sets a specific material to be used to render a mesh/a list of meshes in the layer
     * @param mesh mesh or array of meshes
     * @param material material to use by the layer when rendering the mesh(es). If undefined is passed, the specific material created by the layer will be used.
     */
    setMaterialForRendering(mesh: AbstractMesh | AbstractMesh[], material?: Material): void;
    /**
     * Gets the intensity of the effect for a specific mesh.
     * @param mesh The mesh to get the effect intensity for
     * @returns The intensity of the effect for the mesh
     */
    getEffectIntensity(mesh: AbstractMesh): number;
    /**
     * Sets the intensity of the effect for a specific mesh.
     * @param mesh The mesh to set the effect intensity for
     * @param intensity The intensity of the effect for the mesh
     */
    setEffectIntensity(mesh: AbstractMesh, intensity: number): void;
    /**
     * Instantiates a new effect Layer and references it in the scene.
     * @param name The name of the layer
     * @param scene The scene to use the layer in
     */
    constructor(
    /** The Friendly of the effect in the scene */
    name: string, scene?: Scene);
    /**
     * Get the effect name of the layer.
     * @returns The effect name
     */
    abstract getEffectName(): string;
    /**
     * Checks for the readiness of the element composing the layer.
     * @param subMesh the mesh to check for
     * @param useInstances specify whether or not to use instances to render the mesh
     * @returns true if ready otherwise, false
     */
    abstract isReady(subMesh: SubMesh, useInstances: boolean): boolean;
    /**
     * Returns whether or not the layer needs stencil enabled during the mesh rendering.
     * @returns true if the effect requires stencil during the main canvas render pass.
     */
    abstract needStencil(): boolean;
    /**
     * Create the merge effect. This is the shader use to blit the information back
     * to the main canvas at the end of the scene rendering.
     * @returns The effect containing the shader used to merge the effect on the  main canvas
     */
    protected abstract _createMergeEffect(): Effect;
    /**
     * Creates the render target textures and post processes used in the effect layer.
     */
    protected abstract _createTextureAndPostProcesses(): void;
    /**
     * Implementation specific of rendering the generating effect on the main canvas.
     * @param effect The effect used to render through
     * @param renderNum Index of the _internalRender call (0 for the first time _internalRender is called, 1 for the second time, etc. _internalRender is called the number of times returned by _numInternalDraws())
     */
    protected abstract _internalRender(effect: Effect, renderIndex: number): void;
    /**
     * Sets the required values for both the emissive texture and and the main color.
     */
    protected abstract _setEmissiveTextureAndColor(mesh: Mesh, subMesh: SubMesh, material: Material): void;
    /**
     * Free any resources and references associated to a mesh.
     * Internal use
     * @param mesh The mesh to free.
     */
    abstract _disposeMesh(mesh: Mesh): void;
    /**
     * Serializes this layer (Glow or Highlight for example)
     * @returns a serialized layer object
     */
    abstract serialize?(): any;
    /**
     * Number of times _internalRender will be called. Some effect layers need to render the mesh several times, so they should override this method with the number of times the mesh should be rendered
     * @returns Number of times a mesh must be rendered in the layer
     */
    protected _numInternalDraws(): number;
    /**
     * Initializes the effect layer with the required options.
     * @param options Sets of none mandatory options to use with the layer (see IEffectLayerOptions for more information)
     */
    protected _init(options: Partial<IEffectLayerOptions>): void;
    /**
     * Generates the index buffer of the full screen quad blending to the main canvas.
     */
    private _generateIndexBuffer;
    /**
     * Generates the vertex buffer of the full screen quad blending to the main canvas.
     */
    private _generateVertexBuffer;
    /**
     * Sets the main texture desired size which is the closest power of two
     * of the engine canvas size.
     */
    private _setMainTextureSize;
    /**
     * Creates the main texture for the effect layer.
     */
    protected _createMainTexture(): void;
    /**
     * Adds specific effects defines.
     * @param defines The defines to add specifics to.
     */
    protected _addCustomEffectDefines(defines: string[]): void;
    /**
     * Checks for the readiness of the element composing the layer.
     * @param subMesh the mesh to check for
     * @param useInstances specify whether or not to use instances to render the mesh
     * @param emissiveTexture the associated emissive texture used to generate the glow
     * @returns true if ready otherwise, false
     */
    protected _isReady(subMesh: SubMesh, useInstances: boolean, emissiveTexture: Nullable<BaseTexture>): boolean;
    /**
     * Renders the glowing part of the scene by blending the blurred glowing meshes on top of the rendered scene.
     */
    render(): void;
    /**
     * Determine if a given mesh will be used in the current effect.
     * @param mesh mesh to test
     * @returns true if the mesh will be used
     */
    hasMesh(mesh: AbstractMesh): boolean;
    /**
     * Returns true if the layer contains information to display, otherwise false.
     * @returns true if the glow layer should be rendered
     */
    shouldRender(): boolean;
    /**
     * Returns true if the mesh should render, otherwise false.
     * @param mesh The mesh to render
     * @returns true if it should render otherwise false
     */
    protected _shouldRenderMesh(mesh: AbstractMesh): boolean;
    /**
     * Returns true if the mesh can be rendered, otherwise false.
     * @param mesh The mesh to render
     * @param material The material used on the mesh
     * @returns true if it can be rendered otherwise false
     */
    protected _canRenderMesh(mesh: AbstractMesh, material: Material): boolean;
    /**
     * Returns true if the mesh should render, otherwise false.
     * @returns true if it should render otherwise false
     */
    protected _shouldRenderEmissiveTextureForMesh(): boolean;
    /**
     * Renders the submesh passed in parameter to the generation map.
     * @param subMesh
     * @param enableAlphaMode
     */
    protected _renderSubMesh(subMesh: SubMesh, enableAlphaMode?: boolean): void;
    /**
     * Defines whether the current material of the mesh should be use to render the effect.
     * @param mesh defines the current mesh to render
     */
    protected _useMeshMaterial(mesh: AbstractMesh): boolean;
    /**
     * Rebuild the required buffers.
     * @internal Internal use only.
     */
    _rebuild(): void;
    /**
     * Dispose only the render target textures and post process.
     */
    private _disposeTextureAndPostProcesses;
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
     * Creates an effect layer from parsed effect layer data
     * @param parsedEffectLayer defines effect layer data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing the effect layer information
     * @returns a parsed effect Layer
     */
    static Parse(parsedEffectLayer: any, scene: Scene, rootUrl: string): EffectLayer;
}
