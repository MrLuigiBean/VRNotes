import type { Nullable, FloatArray, IndicesArray } from "../types";
import { Engine } from "../Engines/engine";
import type { RenderTargetCreationOptions } from "../Materials/Textures/textureCreationOptions";
import type { VertexBuffer } from "../Buffers/buffer";
import { InternalTexture } from "../Materials/Textures/internalTexture";
import type { Effect } from "../Materials/effect";
import type { IPipelineContext } from "./IPipelineContext";
import { DataBuffer } from "../Buffers/dataBuffer";
import type { IColor4Like, IViewportLike } from "../Maths/math.like";
import type { ISceneLike } from "./thinEngine";
import { DrawWrapper } from "../Materials/drawWrapper";
import { RenderTargetWrapper } from "./renderTargetWrapper";
import type { IStencilState } from "../States/IStencilState";
/**
 * Options to create the null engine
 */
export declare class NullEngineOptions {
    /**
     * Render width (Default: 512)
     */
    renderWidth: number;
    /**
     * Render height (Default: 256)
     */
    renderHeight: number;
    /**
     * Texture size (Default: 512)
     */
    textureSize: number;
    /**
     * If delta time between frames should be constant
     * @see https://doc.babylonjs.com/features/featuresDeepDive/animation/advanced_animations#deterministic-lockstep
     */
    deterministicLockstep: boolean;
    /**
     * Maximum about of steps between frames (Default: 4)
     * @see https://doc.babylonjs.com/features/featuresDeepDive/animation/advanced_animations#deterministic-lockstep
     */
    lockstepMaxSteps: number;
    /**
     * Make the matrix computations to be performed in 64 bits instead of 32 bits. False by default
     */
    useHighPrecisionMatrix?: boolean;
}
/**
 * The null engine class provides support for headless version of babylon.js.
 * This can be used in server side scenario or for testing purposes
 */
export declare class NullEngine extends Engine {
    private _options;
    /**
     * Gets a boolean indicating that the engine is running in deterministic lock step mode
     * @see https://doc.babylonjs.com/features/featuresDeepDive/animation/advanced_animations#deterministic-lockstep
     * @returns true if engine is in deterministic lock step mode
     */
    isDeterministicLockStep(): boolean;
    /**
     * Gets the max steps when engine is running in deterministic lock step
     * @see https://doc.babylonjs.com/features/featuresDeepDive/animation/advanced_animations#deterministic-lockstep
     * @returns the max steps
     */
    getLockstepMaxSteps(): number;
    /**
     * Gets the current hardware scaling level.
     * By default the hardware scaling level is computed from the window device ratio.
     * if level = 1 then the engine will render at the exact resolution of the canvas. If level = 0.5 then the engine will render at twice the size of the canvas.
     * @returns a number indicating the current hardware scaling level
     */
    getHardwareScalingLevel(): number;
    constructor(options?: NullEngineOptions);
    /**
     * Creates a vertex buffer
     * @param vertices the data for the vertex buffer
     * @returns the new WebGL static buffer
     */
    createVertexBuffer(vertices: FloatArray): DataBuffer;
    /**
     * Creates a new index buffer
     * @param indices defines the content of the index buffer
     * @returns a new webGL buffer
     */
    createIndexBuffer(indices: IndicesArray): DataBuffer;
    /**
     * Clear the current render buffer or the current render target (if any is set up)
     * @param color defines the color to use
     * @param backBuffer defines if the back buffer must be cleared
     * @param depth defines if the depth buffer must be cleared
     * @param stencil defines if the stencil buffer must be cleared
     */
    clear(color: IColor4Like, backBuffer: boolean, depth: boolean, stencil?: boolean): void;
    /**
     * Gets the current render width
     * @param useScreen defines if screen size must be used (or the current render target if any)
     * @returns a number defining the current render width
     */
    getRenderWidth(useScreen?: boolean): number;
    /**
     * Gets the current render height
     * @param useScreen defines if screen size must be used (or the current render target if any)
     * @returns a number defining the current render height
     */
    getRenderHeight(useScreen?: boolean): number;
    /**
     * Set the WebGL's viewport
     * @param viewport defines the viewport element to be used
     * @param requiredWidth defines the width required for rendering. If not provided the rendering canvas' width is used
     * @param requiredHeight defines the height required for rendering. If not provided the rendering canvas' height is used
     */
    setViewport(viewport: IViewportLike, requiredWidth?: number, requiredHeight?: number): void;
    createShaderProgram(pipelineContext: IPipelineContext, vertexCode: string, fragmentCode: string, defines: string, context?: WebGLRenderingContext): WebGLProgram;
    /**
     * Gets the list of webGL uniform locations associated with a specific program based on a list of uniform names
     * @param pipelineContext defines the pipeline context to use
     * @param uniformsNames defines the list of uniform names
     * @returns an array of webGL uniform locations
     */
    getUniforms(pipelineContext: IPipelineContext, uniformsNames: string[]): Nullable<WebGLUniformLocation>[];
    /**
     * Gets the lsit of active attributes for a given webGL program
     * @param pipelineContext defines the pipeline context to use
     * @param attributesNames defines the list of attribute names to get
     * @returns an array of indices indicating the offset of each attribute
     */
    getAttributes(pipelineContext: IPipelineContext, attributesNames: string[]): number[];
    /**
     * Binds an effect to the webGL context
     * @param effect defines the effect to bind
     */
    bindSamplers(effect: Effect): void;
    /**
     * Activates an effect, making it the current one (ie. the one used for rendering)
     * @param effect defines the effect to activate
     */
    enableEffect(effect: Nullable<Effect | DrawWrapper>): void;
    /**
     * Set various states to the webGL context
     * @param culling defines culling state: true to enable culling, false to disable it
     * @param zOffset defines the value to apply to zOffset (0 by default)
     * @param force defines if states must be applied even if cache is up to date
     * @param reverseSide defines if culling must be reversed (CCW if false, CW if true)
     * @param cullBackFaces true to cull back faces, false to cull front faces (if culling is enabled)
     * @param stencil stencil states to set
     * @param zOffsetUnits defines the value to apply to zOffsetUnits (0 by default)
     */
    setState(culling: boolean, zOffset?: number, force?: boolean, reverseSide?: boolean, cullBackFaces?: boolean, stencil?: IStencilState, zOffsetUnits?: number): void;
    /**
     * Set the value of an uniform to an array of int32
     * @param uniform defines the webGL uniform location where to store the value
     * @param array defines the array of int32 to store
     * @returns true if value was set
     */
    setIntArray(uniform: WebGLUniformLocation, array: Int32Array): boolean;
    /**
     * Set the value of an uniform to an array of int32 (stored as vec2)
     * @param uniform defines the webGL uniform location where to store the value
     * @param array defines the array of int32 to store
     * @returns true if value was set
     */
    setIntArray2(uniform: WebGLUniformLocation, array: Int32Array): boolean;
    /**
     * Set the value of an uniform to an array of int32 (stored as vec3)
     * @param uniform defines the webGL uniform location where to store the value
     * @param array defines the array of int32 to store
     * @returns true if value was set
     */
    setIntArray3(uniform: WebGLUniformLocation, array: Int32Array): boolean;
    /**
     * Set the value of an uniform to an array of int32 (stored as vec4)
     * @param uniform defines the webGL uniform location where to store the value
     * @param array defines the array of int32 to store
     * @returns true if value was set
     */
    setIntArray4(uniform: WebGLUniformLocation, array: Int32Array): boolean;
    /**
     * Set the value of an uniform to an array of float32
     * @param uniform defines the webGL uniform location where to store the value
     * @param array defines the array of float32 to store
     * @returns true if value was set
     */
    setFloatArray(uniform: WebGLUniformLocation, array: Float32Array): boolean;
    /**
     * Set the value of an uniform to an array of float32 (stored as vec2)
     * @param uniform defines the webGL uniform location where to store the value
     * @param array defines the array of float32 to store
     * @returns true if value was set
     */
    setFloatArray2(uniform: WebGLUniformLocation, array: Float32Array): boolean;
    /**
     * Set the value of an uniform to an array of float32 (stored as vec3)
     * @param uniform defines the webGL uniform location where to store the value
     * @param array defines the array of float32 to store
     * @returns true if value was set
     */
    setFloatArray3(uniform: WebGLUniformLocation, array: Float32Array): boolean;
    /**
     * Set the value of an uniform to an array of float32 (stored as vec4)
     * @param uniform defines the webGL uniform location where to store the value
     * @param array defines the array of float32 to store
     * @returns true if value was set
     */
    setFloatArray4(uniform: WebGLUniformLocation, array: Float32Array): boolean;
    /**
     * Set the value of an uniform to an array of number
     * @param uniform defines the webGL uniform location where to store the value
     * @param array defines the array of number to store
     * @returns true if value was set
     */
    setArray(uniform: WebGLUniformLocation, array: number[]): boolean;
    /**
     * Set the value of an uniform to an array of number (stored as vec2)
     * @param uniform defines the webGL uniform location where to store the value
     * @param array defines the array of number to store
     * @returns true if value was set
     */
    setArray2(uniform: WebGLUniformLocation, array: number[]): boolean;
    /**
     * Set the value of an uniform to an array of number (stored as vec3)
     * @param uniform defines the webGL uniform location where to store the value
     * @param array defines the array of number to store
     * @returns true if value was set
     */
    setArray3(uniform: WebGLUniformLocation, array: number[]): boolean;
    /**
     * Set the value of an uniform to an array of number (stored as vec4)
     * @param uniform defines the webGL uniform location where to store the value
     * @param array defines the array of number to store
     * @returns true if value was set
     */
    setArray4(uniform: WebGLUniformLocation, array: number[]): boolean;
    /**
     * Set the value of an uniform to an array of float32 (stored as matrices)
     * @param uniform defines the webGL uniform location where to store the value
     * @param matrices defines the array of float32 to store
     * @returns true if value was set
     */
    setMatrices(uniform: WebGLUniformLocation, matrices: Float32Array): boolean;
    /**
     * Set the value of an uniform to a matrix (3x3)
     * @param uniform defines the webGL uniform location where to store the value
     * @param matrix defines the Float32Array representing the 3x3 matrix to store
     * @returns true if value was set
     */
    setMatrix3x3(uniform: WebGLUniformLocation, matrix: Float32Array): boolean;
    /**
     * Set the value of an uniform to a matrix (2x2)
     * @param uniform defines the webGL uniform location where to store the value
     * @param matrix defines the Float32Array representing the 2x2 matrix to store
     * @returns true if value was set
     */
    setMatrix2x2(uniform: WebGLUniformLocation, matrix: Float32Array): boolean;
    /**
     * Set the value of an uniform to a number (float)
     * @param uniform defines the webGL uniform location where to store the value
     * @param value defines the float number to store
     * @returns true if value was set
     */
    setFloat(uniform: WebGLUniformLocation, value: number): boolean;
    /**
     * Set the value of an uniform to a vec2
     * @param uniform defines the webGL uniform location where to store the value
     * @param x defines the 1st component of the value
     * @param y defines the 2nd component of the value
     * @returns true if value was set
     */
    setFloat2(uniform: WebGLUniformLocation, x: number, y: number): boolean;
    /**
     * Set the value of an uniform to a vec3
     * @param uniform defines the webGL uniform location where to store the value
     * @param x defines the 1st component of the value
     * @param y defines the 2nd component of the value
     * @param z defines the 3rd component of the value
     * @returns true if value was set
     */
    setFloat3(uniform: WebGLUniformLocation, x: number, y: number, z: number): boolean;
    /**
     * Set the value of an uniform to a boolean
     * @param uniform defines the webGL uniform location where to store the value
     * @param bool defines the boolean to store
     * @returns true if value was set
     */
    setBool(uniform: WebGLUniformLocation, bool: number): boolean;
    /**
     * Set the value of an uniform to a vec4
     * @param uniform defines the webGL uniform location where to store the value
     * @param x defines the 1st component of the value
     * @param y defines the 2nd component of the value
     * @param z defines the 3rd component of the value
     * @param w defines the 4th component of the value
     * @returns true if value was set
     */
    setFloat4(uniform: WebGLUniformLocation, x: number, y: number, z: number, w: number): boolean;
    /**
     * Sets the current alpha mode
     * @param mode defines the mode to use (one of the Engine.ALPHA_XXX)
     * @param noDepthWriteChange defines if depth writing state should remains unchanged (false by default)
     * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/advanced/transparent_rendering
     */
    setAlphaMode(mode: number, noDepthWriteChange?: boolean): void;
    /**
     * Bind webGl buffers directly to the webGL context
     * @param vertexBuffers defines the vertex buffer to bind
     * @param indexBuffer defines the index buffer to bind
     * @param effect defines the effect associated with the vertex buffer
     */
    bindBuffers(vertexBuffers: {
        [key: string]: VertexBuffer;
    }, indexBuffer: DataBuffer, effect: Effect): void;
    /**
     * Force the entire cache to be cleared
     * You should not have to use this function unless your engine needs to share the webGL context with another engine
     * @param bruteForce defines a boolean to force clearing ALL caches (including stencil, detoh and alpha states)
     */
    wipeCaches(bruteForce?: boolean): void;
    /**
     * Send a draw order
     * @param useTriangles defines if triangles must be used to draw (else wireframe will be used)
     * @param indexStart defines the starting index
     * @param indexCount defines the number of index to draw
     * @param instancesCount defines the number of instances to draw (if instantiation is enabled)
     */
    draw(useTriangles: boolean, indexStart: number, indexCount: number, instancesCount?: number): void;
    /**
     * Draw a list of indexed primitives
     * @param fillMode defines the primitive to use
     * @param indexStart defines the starting index
     * @param indexCount defines the number of index to draw
     * @param instancesCount defines the number of instances to draw (if instantiation is enabled)
     */
    drawElementsType(fillMode: number, indexStart: number, indexCount: number, instancesCount?: number): void;
    /**
     * Draw a list of unindexed primitives
     * @param fillMode defines the primitive to use
     * @param verticesStart defines the index of first vertex to draw
     * @param verticesCount defines the count of vertices to draw
     * @param instancesCount defines the number of instances to draw (if instantiation is enabled)
     */
    drawArraysType(fillMode: number, verticesStart: number, verticesCount: number, instancesCount?: number): void;
    /** @internal */
    protected _createTexture(): WebGLTexture;
    /**
     * @internal
     */
    _releaseTexture(texture: InternalTexture): void;
    /**
     * Usually called from Texture.ts.
     * Passed information to create a WebGLTexture
     * @param urlArg defines a value which contains one of the following:
     * * A conventional http URL, e.g. 'http://...' or 'file://...'
     * * A base64 string of in-line texture data, e.g. 'data:image/jpg;base64,/...'
     * * An indicator that data being passed using the buffer parameter, e.g. 'data:mytexture.jpg'
     * @param noMipmap defines a boolean indicating that no mipmaps shall be generated.  Ignored for compressed textures.  They must be in the file
     * @param invertY when true, image is flipped when loaded.  You probably want true. Certain compressed textures may invert this if their default is inverted (eg. ktx)
     * @param scene needed for loading to the correct scene
     * @param samplingMode mode with should be used sample / access the texture (Default: Texture.TRILINEAR_SAMPLINGMODE)
     * @param onLoad optional callback to be called upon successful completion
     * @param onError optional callback to be called upon failure
     * @param buffer a source of a file previously fetched as either a base64 string, an ArrayBuffer (compressed or image format), HTMLImageElement (image format), or a Blob
     * @param fallback an internal argument in case the function must be called again, due to etc1 not having alpha capabilities
     * @param format internal format.  Default: RGB when extension is '.jpg' else RGBA.  Ignored for compressed textures
     * @param forcedExtension defines the extension to use to pick the right loader
     * @param mimeType defines an optional mime type
     * @returns a InternalTexture for assignment back into BABYLON.Texture
     */
    createTexture(urlArg: Nullable<string>, noMipmap: boolean, invertY: boolean, scene: Nullable<ISceneLike>, samplingMode?: number, onLoad?: Nullable<(texture: InternalTexture) => void>, onError?: Nullable<(message: string, exception: any) => void>, buffer?: Nullable<string | ArrayBuffer | ArrayBufferView | HTMLImageElement | Blob | ImageBitmap>, fallback?: Nullable<InternalTexture>, format?: Nullable<number>, forcedExtension?: Nullable<string>, mimeType?: string): InternalTexture;
    /**
     * @internal
     */
    _createHardwareRenderTargetWrapper(isMulti: boolean, isCube: boolean, size: number | {
        width: number;
        height: number;
        layers?: number;
    }): RenderTargetWrapper;
    /**
     * Creates a new render target wrapper
     * @param size defines the size of the texture
     * @param options defines the options used to create the texture
     * @returns a new render target wrapper
     */
    createRenderTargetTexture(size: any, options: boolean | RenderTargetCreationOptions): RenderTargetWrapper;
    /**
     * Creates a new render target wrapper
     * @param size defines the size of the texture
     * @param options defines the options used to create the texture
     * @returns a new render target wrapper
     */
    createRenderTargetCubeTexture(size: number, options?: RenderTargetCreationOptions): RenderTargetWrapper;
    /**
     * Update the sampling mode of a given texture
     * @param samplingMode defines the required sampling mode
     * @param texture defines the texture to update
     */
    updateTextureSamplingMode(samplingMode: number, texture: InternalTexture): void;
    /**
     * Creates a raw texture
     * @param data defines the data to store in the texture
     * @param width defines the width of the texture
     * @param height defines the height of the texture
     * @param format defines the format of the data
     * @param generateMipMaps defines if the engine should generate the mip levels
     * @param invertY defines if data must be stored with Y axis inverted
     * @param samplingMode defines the required sampling mode (Texture.NEAREST_SAMPLINGMODE by default)
     * @param compression defines the compression used (null by default)
     * @param type defines the type fo the data (Engine.TEXTURETYPE_UNSIGNED_INT by default)
     * @param creationFlags specific flags to use when creating the texture (Constants.TEXTURE_CREATIONFLAG_STORAGE for storage textures, for eg)
     * @param useSRGBBuffer defines if the texture must be loaded in a sRGB GPU buffer (if supported by the GPU).
     * @returns the raw texture inside an InternalTexture
     */
    createRawTexture(data: Nullable<ArrayBufferView>, width: number, height: number, format: number, generateMipMaps: boolean, invertY: boolean, samplingMode: number, compression?: Nullable<string>, type?: number, creationFlags?: number, useSRGBBuffer?: boolean): InternalTexture;
    /**
     * Update a raw texture
     * @param texture defines the texture to update
     * @param data defines the data to store in the texture
     * @param format defines the format of the data
     * @param invertY defines if data must be stored with Y axis inverted
     * @param compression defines the compression used (null by default)
     * @param type defines the type fo the data (Engine.TEXTURETYPE_UNSIGNED_INT by default)
     * @param useSRGBBuffer defines if the texture must be loaded in a sRGB GPU buffer (if supported by the GPU).
     */
    updateRawTexture(texture: Nullable<InternalTexture>, data: Nullable<ArrayBufferView>, format: number, invertY: boolean, compression?: Nullable<string>, type?: number, useSRGBBuffer?: boolean): void;
    /**
     * Binds the frame buffer to the specified texture.
     * @param rtWrapper The render target wrapper to render to
     * @param faceIndex The face of the texture to render to in case of cube texture
     * @param requiredWidth The width of the target to render to
     * @param requiredHeight The height of the target to render to
     * @param forceFullscreenViewport Forces the viewport to be the entire texture/screen if true
     */
    bindFramebuffer(rtWrapper: RenderTargetWrapper, faceIndex?: number, requiredWidth?: number, requiredHeight?: number, forceFullscreenViewport?: boolean): void;
    /**
     * Unbind the current render target texture from the webGL context
     * @param rtWrapper defines the render target wrapper to unbind
     * @param disableGenerateMipMaps defines a boolean indicating that mipmaps must not be generated
     * @param onBeforeUnbind defines a function which will be called before the effective unbind
     */
    unBindFramebuffer(rtWrapper: RenderTargetWrapper, disableGenerateMipMaps?: boolean, onBeforeUnbind?: () => void): void;
    /**
     * Creates a dynamic vertex buffer
     * @param vertices the data for the dynamic vertex buffer
     * @returns the new WebGL dynamic buffer
     */
    createDynamicVertexBuffer(vertices: FloatArray): DataBuffer;
    /**
     * Update the content of a dynamic texture
     * @param texture defines the texture to update
     * @param canvas defines the canvas containing the source
     * @param invertY defines if data must be stored with Y axis inverted
     * @param premulAlpha defines if alpha is stored as premultiplied
     * @param format defines the format of the data
     */
    updateDynamicTexture(texture: Nullable<InternalTexture>, canvas: HTMLCanvasElement, invertY: boolean, premulAlpha?: boolean, format?: number): void;
    /**
     * Gets a boolean indicating if all created effects are ready
     * @returns true if all effects are ready
     */
    areAllEffectsReady(): boolean;
    /**
     * @internal
     * Get the current error code of the webGL context
     * @returns the error code
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getError
     */
    getError(): number;
    /** @internal */
    _getUnpackAlignement(): number;
    /**
     * @internal
     */
    _unpackFlipY(value: boolean): void;
    /**
     * Update a dynamic index buffer
     * @param indexBuffer defines the target index buffer
     * @param indices defines the data to update
     * @param offset defines the offset in the target index buffer where update should start
     */
    updateDynamicIndexBuffer(indexBuffer: WebGLBuffer, indices: IndicesArray, offset?: number): void;
    /**
     * Updates a dynamic vertex buffer.
     * @param vertexBuffer the vertex buffer to update
     * @param vertices the data used to update the vertex buffer
     * @param byteOffset the byte offset of the data (optional)
     * @param byteLength the byte length of the data (optional)
     */
    updateDynamicVertexBuffer(vertexBuffer: WebGLBuffer, vertices: FloatArray, byteOffset?: number, byteLength?: number): void;
    /**
     * @internal
     */
    _bindTextureDirectly(target: number, texture: InternalTexture): boolean;
    /**
     * @internal
     */
    _bindTexture(channel: number, texture: InternalTexture): void;
    protected _deleteBuffer(buffer: WebGLBuffer): void;
    /**
     * Force the engine to release all cached effects. This means that next effect compilation will have to be done completely even if a similar effect was already compiled
     */
    releaseEffects(): void;
    displayLoadingUI(): void;
    hideLoadingUI(): void;
    set loadingUIText(_: string);
    /**
     * @internal
     */
    _uploadCompressedDataToTextureDirectly(texture: InternalTexture, internalFormat: number, width: number, height: number, data: ArrayBufferView, faceIndex?: number, lod?: number): void;
    /**
     * @internal
     */
    _uploadDataToTextureDirectly(texture: InternalTexture, imageData: ArrayBufferView, faceIndex?: number, lod?: number): void;
    /**
     * @internal
     */
    _uploadArrayBufferViewToTexture(texture: InternalTexture, imageData: ArrayBufferView, faceIndex?: number, lod?: number): void;
    /**
     * @internal
     */
    _uploadImageToTexture(texture: InternalTexture, image: HTMLImageElement, faceIndex?: number, lod?: number): void;
}
