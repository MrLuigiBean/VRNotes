import type { IMultiRenderTargetOptions } from "./multiRenderTarget";
import { MultiRenderTarget } from "./multiRenderTarget";
import type { Engine } from "../../Engines/engine";
import type { RenderTargetTexture } from "./renderTargetTexture";
import type { Scene } from "../../scene";
import type { PostProcess } from "../../PostProcesses/postProcess";
import { ImageProcessingPostProcess } from "../../PostProcesses/imageProcessingPostProcess";
import type { Nullable } from "../../types";
/**
 * A multi render target designed to render the prepass.
 * Prepass is a scene component used to render information in multiple textures
 * alongside with the scene materials rendering.
 * Note : This is an internal class, and you should NOT need to instanciate this.
 * Only the `PrePassRenderer` should instanciate this class.
 * It is more likely that you need a regular `MultiRenderTarget`
 * @internal
 */
export declare class PrePassRenderTarget extends MultiRenderTarget {
    /**
     * @internal
     */
    _beforeCompositionPostProcesses: PostProcess[];
    /**
     * Image processing post process for composition
     */
    imageProcessingPostProcess: ImageProcessingPostProcess;
    /**
     * @internal
     */
    _engine: Engine;
    /**
     * @internal
     */
    _scene: Scene;
    /**
     * @internal
     */
    _outputPostProcess: Nullable<PostProcess>;
    /**
     * @internal
     */
    _internalTextureDirty: boolean;
    /**
     * Is this render target enabled for prepass rendering
     */
    enabled: boolean;
    /**
     * Render target associated with this prePassRenderTarget
     * If this is `null`, it means this prePassRenderTarget is associated with the scene
     */
    renderTargetTexture: Nullable<RenderTargetTexture>;
    constructor(name: string, renderTargetTexture: Nullable<RenderTargetTexture>, size: any, count: number, scene?: Scene, options?: IMultiRenderTargetOptions | undefined);
    /**
     * Creates a composition effect for this RT
     * @internal
     */
    _createCompositionEffect(): void;
    /**
     * Checks that the size of this RT is still adapted to the desired render size.
     * @internal
     */
    _checkSize(): void;
    /**
     * Changes the number of render targets in this MRT
     * Be careful as it will recreate all the data in the new texture.
     * @param count new texture count
     * @param options Specifies texture types and sampling modes for new textures
     * @param textureNames Specifies the names of the textures (optional)
     */
    updateCount(count: number, options?: IMultiRenderTargetOptions, textureNames?: string[]): void;
    /**
     * Resets the post processes chains applied to this RT.
     * @internal
     */
    _resetPostProcessChain(): void;
    /**
     * Diposes this render target
     */
    dispose(): void;
}
