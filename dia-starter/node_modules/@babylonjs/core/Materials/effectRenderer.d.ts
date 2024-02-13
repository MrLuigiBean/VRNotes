import type { Nullable } from "../types";
import type { ThinEngine } from "../Engines/thinEngine";
import { Viewport } from "../Maths/math.viewport";
import { Observable } from "../Misc/observable";
import { Effect } from "./effect";
import { DrawWrapper } from "./drawWrapper";
import type { IRenderTargetTexture, RenderTargetWrapper } from "../Engines/renderTargetWrapper";
import type { ShaderLanguage } from "./shaderLanguage";
import "../Shaders/postprocess.vertex";
/**
 * Effect Render Options
 */
export interface IEffectRendererOptions {
    /**
     * Defines the vertices positions.
     */
    positions?: number[];
    /**
     * Defines the indices.
     */
    indices?: number[];
}
/**
 * Helper class to render one or more effects.
 * You can access the previous rendering in your shader by declaring a sampler named textureSampler
 */
export declare class EffectRenderer {
    /**
     * The engine the effect renderer has been created for.
     */
    readonly engine: ThinEngine;
    private _vertexBuffers;
    private _indexBuffer;
    private _fullscreenViewport;
    private _onContextRestoredObserver;
    private _savedStateDepthTest;
    private _savedStateStencilTest;
    /**
     * Creates an effect renderer
     * @param engine the engine to use for rendering
     * @param options defines the options of the effect renderer
     */
    constructor(engine: ThinEngine, options?: IEffectRendererOptions);
    /**
     * Sets the current viewport in normalized coordinates 0-1
     * @param viewport Defines the viewport to set (defaults to 0 0 1 1)
     */
    setViewport(viewport?: Viewport): void;
    /**
     * Binds the embedded attributes buffer to the effect.
     * @param effect Defines the effect to bind the attributes for
     */
    bindBuffers(effect: Effect): void;
    /**
     * Sets the current effect wrapper to use during draw.
     * The effect needs to be ready before calling this api.
     * This also sets the default full screen position attribute.
     * @param effectWrapper Defines the effect to draw with
     */
    applyEffectWrapper(effectWrapper: EffectWrapper): void;
    /**
     * Saves engine states
     */
    saveStates(): void;
    /**
     * Restores engine states
     */
    restoreStates(): void;
    /**
     * Draws a full screen quad.
     */
    draw(): void;
    private _isRenderTargetTexture;
    /**
     * renders one or more effects to a specified texture
     * @param effectWrapper the effect to renderer
     * @param outputTexture texture to draw to, if null it will render to the screen.
     */
    render(effectWrapper: EffectWrapper, outputTexture?: Nullable<RenderTargetWrapper | IRenderTargetTexture>): void;
    /**
     * Disposes of the effect renderer
     */
    dispose(): void;
}
/**
 * Options to create an EffectWrapper
 */
interface EffectWrapperCreationOptions {
    /**
     * Engine to use to create the effect
     */
    engine: ThinEngine;
    /**
     * Fragment shader for the effect
     */
    fragmentShader: string;
    /**
     * Use the shader store instead of direct source code
     */
    useShaderStore?: boolean;
    /**
     * Vertex shader for the effect
     */
    vertexShader?: string;
    /**
     * Attributes to use in the shader
     */
    attributeNames?: Array<string>;
    /**
     * Uniforms to use in the shader
     */
    uniformNames?: Array<string>;
    /**
     * Texture sampler names to use in the shader
     */
    samplerNames?: Array<string>;
    /**
     * Defines to use in the shader
     */
    defines?: Array<string>;
    /**
     * Callback when effect is compiled
     */
    onCompiled?: Nullable<(effect: Effect) => void>;
    /**
     * The friendly name of the effect displayed in Spector.
     */
    name?: string;
    /**
     * The language the shader is written in (default: GLSL)
     */
    shaderLanguage?: ShaderLanguage;
}
/**
 * Wraps an effect to be used for rendering
 */
export declare class EffectWrapper {
    /**
     * Event that is fired right before the effect is drawn (should be used to update uniforms)
     */
    onApplyObservable: Observable<{}>;
    /**
     * The underlying effect
     */
    get effect(): Effect;
    set effect(effect: Effect);
    /** @internal */
    _drawWrapper: DrawWrapper;
    private _onContextRestoredObserver;
    /**
     * Creates an effect to be renderer
     * @param creationOptions options to create the effect
     */
    constructor(creationOptions: EffectWrapperCreationOptions);
    /**
     * Disposes of the effect wrapper
     */
    dispose(): void;
}
export {};
