import type { Nullable } from "../types";
import type { InternalTexture } from "../Materials/Textures/internalTexture";
import type { PostProcess } from "./postProcess";
import type { RenderTargetWrapper } from "../Engines/renderTargetWrapper";
import type { Scene } from "../scene";
/**
 * PostProcessManager is used to manage one or more post processes or post process pipelines
 * See https://doc.babylonjs.com/features/featuresDeepDive/postProcesses/usePostProcesses
 */
export declare class PostProcessManager {
    private _scene;
    private _indexBuffer;
    private _vertexBuffers;
    /**
     * Creates a new instance PostProcess
     * @param scene The scene that the post process is associated with.
     */
    constructor(scene: Scene);
    private _prepareBuffers;
    private _buildIndexBuffer;
    /**
     * Rebuilds the vertex buffers of the manager.
     * @internal
     */
    _rebuild(): void;
    /**
     * Prepares a frame to be run through a post process.
     * @param sourceTexture The input texture to the post processes. (default: null)
     * @param postProcesses An array of post processes to be run. (default: null)
     * @returns True if the post processes were able to be run.
     * @internal
     */
    _prepareFrame(sourceTexture?: Nullable<InternalTexture>, postProcesses?: Nullable<PostProcess[]>): boolean;
    /**
     * Manually render a set of post processes to a texture.
     * Please note, the frame buffer won't be unbound after the call in case you have more render to do.
     * @param postProcesses An array of post processes to be run.
     * @param targetTexture The render target wrapper to render to.
     * @param forceFullscreenViewport force gl.viewport to be full screen eg. 0,0,textureWidth,textureHeight
     * @param faceIndex defines the face to render to if a cubemap is defined as the target
     * @param lodLevel defines which lod of the texture to render to
     * @param doNotBindFrambuffer If set to true, assumes that the framebuffer has been bound previously
     */
    directRender(postProcesses: PostProcess[], targetTexture?: Nullable<RenderTargetWrapper>, forceFullscreenViewport?: boolean, faceIndex?: number, lodLevel?: number, doNotBindFrambuffer?: boolean): void;
    /**
     * Finalize the result of the output of the postprocesses.
     * @param doNotPresent If true the result will not be displayed to the screen.
     * @param targetTexture The render target wrapper to render to.
     * @param faceIndex The index of the face to bind the target texture to.
     * @param postProcesses The array of post processes to render.
     * @param forceFullscreenViewport force gl.viewport to be full screen eg. 0,0,textureWidth,textureHeight (default: false)
     * @internal
     */
    _finalizeFrame(doNotPresent?: boolean, targetTexture?: RenderTargetWrapper, faceIndex?: number, postProcesses?: Array<PostProcess>, forceFullscreenViewport?: boolean): void;
    /**
     * Disposes of the post process manager.
     */
    dispose(): void;
}
