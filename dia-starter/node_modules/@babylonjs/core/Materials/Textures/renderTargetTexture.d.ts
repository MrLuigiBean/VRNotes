import { Observable } from "../../Misc/observable";
import type { SmartArray } from "../../Misc/smartArray";
import type { Nullable, Immutable } from "../../types";
import type { Camera } from "../../Cameras/camera";
import type { Scene } from "../../scene";
import { Matrix, Vector3 } from "../../Maths/math.vector";
import type { Color4 } from "../../Maths/math.color";
import type { RenderTargetCreationOptions, TextureSize } from "../../Materials/Textures/textureCreationOptions";
import type { AbstractMesh } from "../../Meshes/abstractMesh";
import type { SubMesh } from "../../Meshes/subMesh";
import type { InternalTexture } from "../../Materials/Textures/internalTexture";
import { Texture } from "../../Materials/Textures/texture";
import type { PostProcess } from "../../PostProcesses/postProcess";
import { RenderingManager } from "../../Rendering/renderingManager";
import type { IRenderTargetTexture, RenderTargetWrapper } from "../../Engines/renderTargetWrapper";
import "../../Engines/Extensions/engine.renderTarget";
import "../../Engines/Extensions/engine.renderTargetCube";
import { Engine } from "../../Engines/engine";
import type { Material } from "../material";
/**
 * Options for the RenderTargetTexture constructor
 */
export interface RenderTargetTextureOptions {
    /** True (default: false) if mipmaps need to be generated after render */
    generateMipMaps?: boolean;
    /** True (default) to not change the aspect ratio of the scene in the RTT */
    doNotChangeAspectRatio?: boolean;
    /** The type of the buffer in the RTT (byte (default), half float, float...) */
    type?: number;
    /** True (default: false) if a cube texture needs to be created */
    isCube?: boolean;
    /** The sampling mode to be used with the render target (Trilinear (default), Linear, Nearest...) */
    samplingMode?: number;
    /** True (default) to generate a depth buffer */
    generateDepthBuffer?: boolean;
    /** True (default: false) to generate a stencil buffer */
    generateStencilBuffer?: boolean;
    /** True (default: false) if multiple textures need to be created (Draw Buffers) */
    isMulti?: boolean;
    /** The internal format of the buffer in the RTT (RED, RG, RGB, RGBA (default), ALPHA...) */
    format?: number;
    /** True (default: false) if the texture allocation should be delayed */
    delayAllocation?: boolean;
    /** Sample count to use when creating the RTT */
    samples?: number;
    /** specific flags to use when creating the texture (e.g., Constants.TEXTURE_CREATIONFLAG_STORAGE for storage textures) */
    creationFlags?: number;
    /** True (default: false) to indicate that no color target should be created. (e.g., if you only want to write to the depth buffer) */
    noColorAttachment?: boolean;
    /** Specifies the internal texture to use directly instead of creating one (ignores `noColorAttachment` flag when set) **/
    colorAttachment?: InternalTexture;
    /** True (default: false) to create a SRGB texture */
    useSRGBBuffer?: boolean;
    /** Defines the underlying texture texture space */
    gammaSpace?: boolean;
}
/**
 * This Helps creating a texture that will be created from a camera in your scene.
 * It is basically a dynamic texture that could be used to create special effects for instance.
 * Actually, It is the base of lot of effects in the framework like post process, shadows, effect layers and rendering pipelines...
 */
export declare class RenderTargetTexture extends Texture implements IRenderTargetTexture {
    /**
     * The texture will only be rendered once which can be useful to improve performance if everything in your render is static for instance.
     */
    static readonly REFRESHRATE_RENDER_ONCE: number;
    /**
     * The texture will only be rendered rendered every frame and is recommended for dynamic contents.
     */
    static readonly REFRESHRATE_RENDER_ONEVERYFRAME: number;
    /**
     * The texture will be rendered every 2 frames which could be enough if your dynamic objects are not
     * the central point of your effect and can save a lot of performances.
     */
    static readonly REFRESHRATE_RENDER_ONEVERYTWOFRAMES: number;
    /**
     * Use this predicate to dynamically define the list of mesh you want to render.
     * If set, the renderList property will be overwritten.
     */
    renderListPredicate: (AbstractMesh: AbstractMesh) => boolean;
    private _renderList;
    private _unObserveRenderList;
    /**
     * Use this list to define the list of mesh you want to render.
     */
    get renderList(): Nullable<Array<AbstractMesh>>;
    set renderList(value: Nullable<Array<AbstractMesh>>);
    private _renderListHasChanged;
    /**
     * Use this function to overload the renderList array at rendering time.
     * Return null to render with the current renderList, else return the list of meshes to use for rendering.
     * For 2DArray RTT, layerOrFace is the index of the layer that is going to be rendered, else it is the faceIndex of
     * the cube (if the RTT is a cube, else layerOrFace=0).
     * The renderList passed to the function is the current render list (the one that will be used if the function returns null).
     * The length of this list is passed through renderListLength: don't use renderList.length directly because the array can
     * hold dummy elements!
     */
    getCustomRenderList: (layerOrFace: number, renderList: Nullable<Immutable<Array<AbstractMesh>>>, renderListLength: number) => Nullable<Array<AbstractMesh>>;
    /**
     * Define if particles should be rendered in your texture.
     */
    renderParticles: boolean;
    /**
     * Define if sprites should be rendered in your texture.
     */
    renderSprites: boolean;
    /**
     * Force checking the layerMask property even if a custom list of meshes is provided (ie. if renderList is not undefined)
     */
    forceLayerMaskCheck: boolean;
    /**
     * Define the camera used to render the texture.
     */
    activeCamera: Nullable<Camera>;
    /**
     * Override the mesh isReady function with your own one.
     */
    customIsReadyFunction: (mesh: AbstractMesh, refreshRate: number, preWarm?: boolean) => boolean;
    /**
     * Override the render function of the texture with your own one.
     */
    customRenderFunction: (opaqueSubMeshes: SmartArray<SubMesh>, alphaTestSubMeshes: SmartArray<SubMesh>, transparentSubMeshes: SmartArray<SubMesh>, depthOnlySubMeshes: SmartArray<SubMesh>, beforeTransparents?: () => void) => void;
    /**
     * Define if camera post processes should be use while rendering the texture.
     */
    useCameraPostProcesses: boolean;
    /**
     * Define if the camera viewport should be respected while rendering the texture or if the render should be done to the entire texture.
     */
    ignoreCameraViewport: boolean;
    private _postProcessManager;
    /**
     * Post-processes for this render target
     */
    get postProcesses(): PostProcess[];
    private _postProcesses;
    private _resizeObserver;
    private get _prePassEnabled();
    /**
     * An event triggered when the texture is unbind.
     */
    onBeforeBindObservable: Observable<RenderTargetTexture>;
    /**
     * An event triggered when the texture is unbind.
     */
    onAfterUnbindObservable: Observable<RenderTargetTexture>;
    private _onAfterUnbindObserver;
    /**
     * Set a after unbind callback in the texture.
     * This has been kept for backward compatibility and use of onAfterUnbindObservable is recommended.
     */
    set onAfterUnbind(callback: () => void);
    /**
     * An event triggered before rendering the texture
     */
    onBeforeRenderObservable: Observable<number>;
    private _onBeforeRenderObserver;
    /**
     * Set a before render callback in the texture.
     * This has been kept for backward compatibility and use of onBeforeRenderObservable is recommended.
     */
    set onBeforeRender(callback: (faceIndex: number) => void);
    /**
     * An event triggered after rendering the texture
     */
    onAfterRenderObservable: Observable<number>;
    private _onAfterRenderObserver;
    /**
     * Set a after render callback in the texture.
     * This has been kept for backward compatibility and use of onAfterRenderObservable is recommended.
     */
    set onAfterRender(callback: (faceIndex: number) => void);
    /**
     * An event triggered after the texture clear
     */
    onClearObservable: Observable<Engine>;
    private _onClearObserver;
    /**
     * Set a clear callback in the texture.
     * This has been kept for backward compatibility and use of onClearObservable is recommended.
     */
    set onClear(callback: (Engine: Engine) => void);
    /**
     * An event triggered when the texture is resized.
     */
    onResizeObservable: Observable<RenderTargetTexture>;
    /**
     * Define the clear color of the Render Target if it should be different from the scene.
     */
    clearColor: Color4;
    protected _size: TextureSize;
    protected _initialSizeParameter: number | {
        width: number;
        height: number;
    } | {
        ratio: number;
    };
    protected _sizeRatio: Nullable<number>;
    /** @internal */
    _generateMipMaps: boolean;
    /** @internal */
    _cleared: boolean;
    /**
     * Skip the initial clear of the rtt at the beginning of the frame render loop
     */
    skipInitialClear: boolean;
    protected _renderingManager: RenderingManager;
    /** @internal */
    _waitingRenderList?: string[];
    protected _doNotChangeAspectRatio: boolean;
    protected _currentRefreshId: number;
    protected _refreshRate: number;
    protected _textureMatrix: Matrix;
    protected _samples: number;
    protected _renderTargetOptions: RenderTargetCreationOptions;
    private _canRescale;
    protected _renderTarget: Nullable<RenderTargetWrapper>;
    /**
     * Current render pass id of the render target texture. Note it can change over the rendering as there's a separate id for each face of a cube / each layer of an array layer!
     */
    renderPassId: number;
    private _renderPassIds;
    /**
     * Gets the render pass ids used by the render target texture. For a single render target the array length will be 1, for a cube texture it will be 6 and for
     * a 2D texture array it will return an array of ids the size of the 2D texture array
     */
    get renderPassIds(): readonly number[];
    /**
     * Gets the current value of the refreshId counter
     */
    get currentRefreshId(): number;
    /**
     * Sets a specific material to be used to render a mesh/a list of meshes in this render target texture
     * @param mesh mesh or array of meshes
     * @param material material or array of materials to use for this render pass. If undefined is passed, no specific material will be used but the regular material instead (mesh.material). It's possible to provide an array of materials to use a different material for each rendering in the case of a cube texture (6 rendering) and a 2D texture array (as many rendering as the length of the array)
     */
    setMaterialForRendering(mesh: AbstractMesh | AbstractMesh[], material?: Material | Material[]): void;
    private _isCubeData;
    /**
     * Define if the texture has multiple draw buffers or if false a single draw buffer.
     */
    get isMulti(): boolean;
    /**
     * Gets render target creation options that were used.
     */
    get renderTargetOptions(): RenderTargetCreationOptions;
    /**
     * Gets the render target wrapper associated with this render target
     */
    get renderTarget(): Nullable<RenderTargetWrapper>;
    protected _onRatioRescale(): void;
    /**
     * Gets or sets the center of the bounding box associated with the texture (when in cube mode)
     * It must define where the camera used to render the texture is set
     */
    boundingBoxPosition: Vector3;
    private _boundingBoxSize;
    /**
     * Gets or sets the size of the bounding box associated with the texture (when in cube mode)
     * When defined, the cubemap will switch to local mode
     * @see https://community.arm.com/graphics/b/blog/posts/reflections-based-on-local-cubemaps-in-unity
     * @example https://www.babylonjs-playground.com/#RNASML
     */
    set boundingBoxSize(value: Vector3);
    get boundingBoxSize(): Vector3;
    /**
     * In case the RTT has been created with a depth texture, get the associated
     * depth texture.
     * Otherwise, return null.
     */
    get depthStencilTexture(): Nullable<InternalTexture>;
    /**
     * Instantiate a render target texture. This is mainly used to render of screen the scene to for instance apply post process
     * or used a shadow, depth texture...
     * @param name The friendly name of the texture
     * @param size The size of the RTT (number if square, or {width: number, height:number} or {ratio:} to define a ratio from the main scene)
     * @param scene The scene the RTT belongs to. Default is the last created scene.
     * @param options The options for creating the render target texture.
     */
    constructor(name: string, size: number | {
        width: number;
        height: number;
        layers?: number;
    } | {
        ratio: number;
    }, scene?: Nullable<Scene>, options?: RenderTargetTextureOptions);
    /**
     * Instantiate a render target texture. This is mainly used to render of screen the scene to for instance apply post process
     * or used a shadow, depth texture...
     * @param name The friendly name of the texture
     * @param size The size of the RTT (number if square, or {width: number, height:number} or {ratio:} to define a ratio from the main scene)
     * @param scene The scene the RTT belongs to. Default is the last created scene
     * @param generateMipMaps True (default: false) if mipmaps need to be generated after render
     * @param doNotChangeAspectRatio True (default) to not change the aspect ratio of the scene in the RTT
     * @param type The type of the buffer in the RTT (byte (default), half float, float...)
     * @param isCube True (default: false) if a cube texture needs to be created
     * @param samplingMode The sampling mode to be used with the render target (Trilinear (default), Linear, Nearest...)
     * @param generateDepthBuffer True (default) to generate a depth buffer
     * @param generateStencilBuffer True (default: false) to generate a stencil buffer
     * @param isMulti True (default: false) if multiple textures need to be created (Draw Buffers)
     * @param format The internal format of the buffer in the RTT (RED, RG, RGB, RGBA (default), ALPHA...)
     * @param delayAllocation True (default: false) if the texture allocation should be delayed
     * @param samples Sample count to use when creating the RTT
     * @param creationFlags specific flags to use when creating the texture (e.g., Constants.TEXTURE_CREATIONFLAG_STORAGE for storage textures)
     * @param noColorAttachment True (default: false) to indicate that no color target should be created. (e.g., if you only want to write to the depth buffer)
     * @param useSRGBBuffer True (default: false) to create a SRGB texture
     */
    constructor(name: string, size: number | {
        width: number;
        height: number;
        layers?: number;
    } | {
        ratio: number;
    }, scene?: Nullable<Scene>, generateMipMaps?: boolean, doNotChangeAspectRatio?: boolean, type?: number, isCube?: boolean, samplingMode?: number, generateDepthBuffer?: boolean, generateStencilBuffer?: boolean, isMulti?: boolean, format?: number, delayAllocation?: boolean, samples?: number, creationFlags?: number, noColorAttachment?: boolean, useSRGBBuffer?: boolean);
    /**
     * Creates a depth stencil texture.
     * This is only available in WebGL 2 or with the depth texture extension available.
     * @param comparisonFunction Specifies the comparison function to set on the texture. If 0 or undefined, the texture is not in comparison mode (default: 0)
     * @param bilinearFiltering Specifies whether or not bilinear filtering is enable on the texture (default: true)
     * @param generateStencil Specifies whether or not a stencil should be allocated in the texture (default: false)
     * @param samples sample count of the depth/stencil texture (default: 1)
     * @param format format of the depth texture (default: Constants.TEXTUREFORMAT_DEPTH32_FLOAT)
     */
    createDepthStencilTexture(comparisonFunction?: number, bilinearFiltering?: boolean, generateStencil?: boolean, samples?: number, format?: number): void;
    private _releaseRenderPassId;
    private _createRenderPassId;
    protected _processSizeParameter(size: number | {
        width: number;
        height: number;
    } | {
        ratio: number;
    }, createRenderPassIds?: boolean): void;
    /**
     * Define the number of samples to use in case of MSAA.
     * It defaults to one meaning no MSAA has been enabled.
     */
    get samples(): number;
    set samples(value: number);
    /**
     * Resets the refresh counter of the texture and start bak from scratch.
     * Could be useful to regenerate the texture if it is setup to render only once.
     */
    resetRefreshCounter(): void;
    /**
     * Define the refresh rate of the texture or the rendering frequency.
     * Use 0 to render just once, 1 to render on every frame, 2 to render every two frames and so on...
     */
    get refreshRate(): number;
    set refreshRate(value: number);
    /**
     * Adds a post process to the render target rendering passes.
     * @param postProcess define the post process to add
     */
    addPostProcess(postProcess: PostProcess): void;
    /**
     * Clear all the post processes attached to the render target
     * @param dispose define if the cleared post processes should also be disposed (false by default)
     */
    clearPostProcesses(dispose?: boolean): void;
    /**
     * Remove one of the post process from the list of attached post processes to the texture
     * @param postProcess define the post process to remove from the list
     */
    removePostProcess(postProcess: PostProcess): void;
    /** @internal */
    _shouldRender(): boolean;
    /**
     * Gets the actual render size of the texture.
     * @returns the width of the render size
     */
    getRenderSize(): number;
    /**
     * Gets the actual render width of the texture.
     * @returns the width of the render size
     */
    getRenderWidth(): number;
    /**
     * Gets the actual render height of the texture.
     * @returns the height of the render size
     */
    getRenderHeight(): number;
    /**
     * Gets the actual number of layers of the texture.
     * @returns the number of layers
     */
    getRenderLayers(): number;
    /**
     * Don't allow this render target texture to rescale. Mainly used to prevent rescaling by the scene optimizer.
     */
    disableRescaling(): void;
    /**
     * Get if the texture can be rescaled or not.
     */
    get canRescale(): boolean;
    /**
     * Resize the texture using a ratio.
     * @param ratio the ratio to apply to the texture size in order to compute the new target size
     */
    scale(ratio: number): void;
    /**
     * Get the texture reflection matrix used to rotate/transform the reflection.
     * @returns the reflection matrix
     */
    getReflectionTextureMatrix(): Matrix;
    /**
     * Resize the texture to a new desired size.
     * Be careful as it will recreate all the data in the new texture.
     * @param size Define the new size. It can be:
     *   - a number for squared texture,
     *   - an object containing { width: number, height: number }
     *   - or an object containing a ratio { ratio: number }
     */
    resize(size: number | {
        width: number;
        height: number;
    } | {
        ratio: number;
    }): void;
    private _defaultRenderListPrepared;
    /**
     * Renders all the objects from the render list into the texture.
     * @param useCameraPostProcess Define if camera post processes should be used during the rendering
     * @param dumpForDebug Define if the rendering result should be dumped (copied) for debugging purpose
     */
    render(useCameraPostProcess?: boolean, dumpForDebug?: boolean): void;
    /**
     * This function will check if the render target texture can be rendered (textures are loaded, shaders are compiled)
     * @returns true if all required resources are ready
     */
    isReadyForRendering(): boolean;
    private _render;
    private _bestReflectionRenderTargetDimension;
    private _prepareRenderingManager;
    /**
     * @internal
     * @param faceIndex face index to bind to if this is a cubetexture
     * @param layer defines the index of the texture to bind in the array
     */
    _bindFrameBuffer(faceIndex?: number, layer?: number): void;
    protected _unbindFrameBuffer(engine: Engine, faceIndex: number): void;
    /**
     * @internal
     */
    _prepareFrame(scene: Scene, faceIndex?: number, layer?: number, useCameraPostProcess?: boolean): void;
    private _renderToTarget;
    /**
     * Overrides the default sort function applied in the rendering group to prepare the meshes.
     * This allowed control for front to back rendering or reversely depending of the special needs.
     *
     * @param renderingGroupId The rendering group id corresponding to its index
     * @param opaqueSortCompareFn The opaque queue comparison function use to sort.
     * @param alphaTestSortCompareFn The alpha test queue comparison function use to sort.
     * @param transparentSortCompareFn The transparent queue comparison function use to sort.
     */
    setRenderingOrder(renderingGroupId: number, opaqueSortCompareFn?: Nullable<(a: SubMesh, b: SubMesh) => number>, alphaTestSortCompareFn?: Nullable<(a: SubMesh, b: SubMesh) => number>, transparentSortCompareFn?: Nullable<(a: SubMesh, b: SubMesh) => number>): void;
    /**
     * Specifies whether or not the stencil and depth buffer are cleared between two rendering groups.
     *
     * @param renderingGroupId The rendering group id corresponding to its index
     * @param autoClearDepthStencil Automatically clears depth and stencil between groups if true.
     */
    setRenderingAutoClearDepthStencil(renderingGroupId: number, autoClearDepthStencil: boolean): void;
    /**
     * Clones the texture.
     * @returns the cloned texture
     */
    clone(): RenderTargetTexture;
    /**
     * Serialize the texture to a JSON representation we can easily use in the respective Parse function.
     * @returns The JSON representation of the texture
     */
    serialize(): any;
    /**
     *  This will remove the attached framebuffer objects. The texture will not be able to be used as render target anymore
     */
    disposeFramebufferObjects(): void;
    /**
     * Release and destroy the underlying lower level texture aka internalTexture.
     */
    releaseInternalTexture(): void;
    /**
     * Dispose the texture and release its associated resources.
     */
    dispose(): void;
    /** @internal */
    _rebuild(): void;
    /**
     * Clear the info related to rendering groups preventing retention point in material dispose.
     */
    freeRenderingGroups(): void;
    /**
     * Gets the number of views the corresponding to the texture (eg. a MultiviewRenderTarget will have > 1)
     * @returns the view count
     */
    getViewCount(): number;
}
