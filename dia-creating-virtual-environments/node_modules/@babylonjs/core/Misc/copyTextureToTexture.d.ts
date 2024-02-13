import type { ThinEngine } from "../Engines/thinEngine.js";
import type { InternalTexture } from "../Materials/Textures/internalTexture";
import type { IRenderTargetTexture, RenderTargetWrapper } from "../Engines/renderTargetWrapper";
import type { ThinTexture } from "../Materials/Textures/thinTexture";
import "../Shaders/copyTextureToTexture.fragment";
/**
 * Conversion modes available when copying a texture into another one
 */
export declare enum ConversionMode {
    None = 0,
    ToLinearSpace = 1,
    ToGammaSpace = 2
}
/**
 * Class used for fast copy from one texture to another
 */
export declare class CopyTextureToTexture {
    private _engine;
    private _isDepthTexture;
    private _renderer;
    private _effectWrapper;
    private _source;
    private _conversion;
    private _textureIsInternal;
    /**
     * Constructs a new instance of the class
     * @param engine The engine to use for the copy
     * @param isDepthTexture True means that we should write (using gl_FragDepth) into the depth texture attached to the destination (default: false)
     */
    constructor(engine: ThinEngine, isDepthTexture?: boolean);
    /**
     * Indicates if the effect is ready to be used for the copy
     * @returns true if "copy" can be called without delay, else false
     */
    isReady(): boolean;
    /**
     * Copy one texture into another
     * @param source The source texture
     * @param destination The destination texture
     * @param conversion The conversion mode that should be applied when copying
     * @returns
     */
    copy(source: InternalTexture | ThinTexture, destination: RenderTargetWrapper | IRenderTargetTexture, conversion?: ConversionMode): boolean;
    /**
     * Releases all the resources used by the class
     */
    dispose(): void;
}
