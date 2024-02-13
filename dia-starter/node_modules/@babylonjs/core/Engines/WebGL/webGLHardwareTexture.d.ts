import type { HardwareTextureWrapper } from "../../Materials/Textures/hardwareTextureWrapper";
import type { Nullable } from "../../types";
/** @internal */
export declare class WebGLHardwareTexture implements HardwareTextureWrapper {
    private _webGLTexture;
    private _context;
    private _MSAARenderBuffers;
    get underlyingResource(): Nullable<WebGLTexture>;
    constructor(existingTexture: Nullable<WebGLTexture> | undefined, context: WebGLRenderingContext);
    setUsage(): void;
    set(hardwareTexture: WebGLTexture): void;
    reset(): void;
    addMSAARenderBuffer(buffer: WebGLRenderbuffer): void;
    releaseMSAARenderBuffers(): void;
    getMSAARenderBuffer(index?: number): WebGLRenderbuffer | null;
    release(): void;
}
