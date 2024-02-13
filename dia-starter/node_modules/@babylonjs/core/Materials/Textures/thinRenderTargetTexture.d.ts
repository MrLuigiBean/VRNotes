import type { Nullable } from "../../types";
import type { InternalTexture } from "../../Materials/Textures/internalTexture";
import type { ThinEngine } from "../../Engines/thinEngine";
import type { IRenderTargetTexture, RenderTargetWrapper } from "../../Engines/renderTargetWrapper";
import { ThinTexture } from "./thinTexture";
import type { TextureSize, RenderTargetCreationOptions } from "./textureCreationOptions";
/**
 * This is a tiny helper class to wrap a RenderTargetWrapper in a texture
 * usable as the input of an effect.
 */
export declare class ThinRenderTargetTexture extends ThinTexture implements IRenderTargetTexture {
    private readonly _renderTargetOptions;
    private _renderTarget;
    private _size;
    /**
     * Gets the render target wrapper associated with this render target
     */
    get renderTarget(): Nullable<RenderTargetWrapper>;
    /**
     * Instantiates a new ThinRenderTargetTexture.
     * Tiny helper class to wrap a RenderTargetWrapper in a texture.
     * This can be used as an internal texture wrapper in ThinEngine to benefit from the cache and to hold on the associated RTT
     * @param engine Define the internalTexture to wrap
     * @param size Define the size of the RTT to create
     * @param options Define rendertarget options
     */
    constructor(engine: ThinEngine, size: TextureSize, options: RenderTargetCreationOptions);
    /**
     * Resize the texture to a new desired size.
     * Be careful as it will recreate all the data in the new texture.
     * @param size Define the new size. It can be:
     *   - a number for squared texture,
     *   - an object containing { width: number, height: number }
     */
    resize(size: TextureSize): void;
    /**
     * Get the underlying lower level texture from Babylon.
     * @returns the internal texture
     */
    getInternalTexture(): Nullable<InternalTexture>;
    /**
     * Get the class name of the texture.
     * @returns "ThinRenderTargetTexture"
     */
    getClassName(): string;
    /**
     * Dispose the texture and release its associated resources.
     * @param disposeOnlyFramebuffers
     */
    dispose(disposeOnlyFramebuffers?: boolean): void;
}
