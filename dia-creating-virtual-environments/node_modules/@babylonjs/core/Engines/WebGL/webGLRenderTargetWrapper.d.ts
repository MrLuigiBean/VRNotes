import type { InternalTexture } from "../../Materials/Textures/internalTexture";
import type { TextureSize } from "../../Materials/Textures/textureCreationOptions";
import type { Nullable } from "../../types";
import { RenderTargetWrapper } from "../renderTargetWrapper";
import type { ThinEngine } from "../thinEngine";
/** @internal */
export declare class WebGLRenderTargetWrapper extends RenderTargetWrapper {
    private _context;
    /**
     * @internal
     */
    _framebuffer: Nullable<WebGLFramebuffer>;
    /**
     * @internal
     */
    _depthStencilBuffer: Nullable<WebGLRenderbuffer>;
    /**
     * @internal
     */
    _MSAAFramebuffer: Nullable<WebGLFramebuffer>;
    /**
     * @internal
     */
    _colorTextureArray: Nullable<WebGLTexture>;
    /**
     * @internal
     */
    _depthStencilTextureArray: Nullable<WebGLTexture>;
    /**
     * @internal
     */
    _disposeOnlyFramebuffers: boolean;
    /**
     * @internal
     */
    _currentLOD: number;
    constructor(isMulti: boolean, isCube: boolean, size: TextureSize, engine: ThinEngine, context: WebGLRenderingContext);
    protected _cloneRenderTargetWrapper(): Nullable<RenderTargetWrapper>;
    protected _swapRenderTargetWrapper(target: WebGLRenderTargetWrapper): void;
    /**
     * Creates the depth/stencil texture
     * @param comparisonFunction Comparison function to use for the texture
     * @param bilinearFiltering true if bilinear filtering should be used when sampling the texture
     * @param generateStencil true if the stencil aspect should also be created
     * @param samples sample count to use when creating the texture
     * @param format format of the depth texture
     * @param label defines the label to use for the texture (for debugging purpose only)
     * @returns the depth/stencil created texture
     */
    createDepthStencilTexture(comparisonFunction?: number, bilinearFiltering?: boolean, generateStencil?: boolean, samples?: number, format?: number, label?: string): InternalTexture;
    /**
     * Shares the depth buffer of this render target with another render target.
     * @internal
     * @param renderTarget Destination renderTarget
     */
    _shareDepth(renderTarget: WebGLRenderTargetWrapper): void;
    /**
     * Binds a texture to this render target on a specific attachment
     * @param texture The texture to bind to the framebuffer
     * @param attachmentIndex Index of the attachment
     * @param faceIndexOrLayer The face or layer of the texture to render to in case of cube texture or array texture
     * @param lodLevel defines the lod level to bind to the frame buffer
     */
    private _bindTextureRenderTarget;
    /**
     * Set a texture in the textures array
     * @param texture the texture to set
     * @param index the index in the textures array to set
     * @param disposePrevious If this function should dispose the previous texture
     */
    setTexture(texture: InternalTexture, index?: number, disposePrevious?: boolean): void;
    /**
     * Sets the layer and face indices of every render target texture
     * @param layers The layer of the texture to be set (make negative to not modify)
     * @param faces The face of the texture to be set (make negative to not modify)
     */
    setLayerAndFaceIndices(layers: number[], faces: number[]): void;
    /**
     * Set the face and layer indices of a texture in the textures array
     * @param index The index of the texture in the textures array to modify
     * @param layer The layer of the texture to be set
     * @param face The face of the texture to be set
     */
    setLayerAndFaceIndex(index?: number, layer?: number, face?: number): void;
    dispose(disposeOnlyFramebuffers?: boolean): void;
}
