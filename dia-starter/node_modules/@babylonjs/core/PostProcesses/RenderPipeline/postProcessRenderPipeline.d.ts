import type { Nullable } from "../../types";
import type { Camera } from "../../Cameras/camera";
import type { Engine } from "../../Engines/engine";
import type { PostProcessRenderEffect } from "./postProcessRenderEffect";
import type { IInspectable } from "../../Misc/iInspectable";
import type { PrePassRenderer } from "../../Rendering/prePassRenderer";
/**
 * PostProcessRenderPipeline
 * @see https://doc.babylonjs.com/features/featuresDeepDive/postProcesses/postProcessRenderPipeline
 */
export declare class PostProcessRenderPipeline {
    private _engine;
    protected _renderEffects: {
        [key: string]: PostProcessRenderEffect;
    };
    protected _renderEffectsForIsolatedPass: PostProcessRenderEffect[];
    /**
     * List of inspectable custom properties (used by the Inspector)
     * @see https://doc.babylonjs.com/toolsAndResources/inspector#extensibility
     */
    inspectableCustomProperties: IInspectable[];
    /**
     * @internal
     */
    protected _cameras: Camera[];
    /** @internal */
    _name: string;
    /**
     * Gets pipeline name
     */
    get name(): string;
    /** Gets the list of attached cameras */
    get cameras(): Camera[];
    /**
     * Initializes a PostProcessRenderPipeline
     * @param _engine engine to add the pipeline to
     * @param name name of the pipeline
     */
    constructor(_engine: Engine, name: string);
    /**
     * Gets the class name
     * @returns "PostProcessRenderPipeline"
     */
    getClassName(): string;
    /**
     * If all the render effects in the pipeline are supported
     */
    get isSupported(): boolean;
    /**
     * Adds an effect to the pipeline
     * @param renderEffect the effect to add
     */
    addEffect(renderEffect: PostProcessRenderEffect): void;
    /** @internal */
    _rebuild(): void;
    /** @internal */
    _enableEffect(renderEffectName: string, cameras: Camera): void;
    /** @internal */
    _enableEffect(renderEffectName: string, cameras: Camera[]): void;
    /** @internal */
    _disableEffect(renderEffectName: string, cameras: Nullable<Camera[]>): void;
    /** @internal */
    _disableEffect(renderEffectName: string, cameras: Nullable<Camera[]>): void;
    /** @internal */
    _attachCameras(cameras: Camera, unique: boolean): void;
    /** @internal */
    _attachCameras(cameras: Camera[], unique: boolean): void;
    /** @internal */
    _detachCameras(cameras: Camera): void;
    /** @internal */
    _detachCameras(cameras: Nullable<Camera[]>): void;
    /** @internal */
    _update(): void;
    /** @internal */
    _reset(): void;
    protected _enableMSAAOnFirstPostProcess(sampleCount: number): boolean;
    /**
     * Ensures that all post processes in the pipeline are the correct size according to the
     * the viewport's required size
     */
    protected _adaptPostProcessesToViewPort(): void;
    /**
     * Sets the required values to the prepass renderer.
     * @param prePassRenderer defines the prepass renderer to setup.
     * @returns true if the pre pass is needed.
     */
    setPrePassRenderer(prePassRenderer: PrePassRenderer): boolean;
    /**
     * Disposes of the pipeline
     */
    dispose(): void;
}
