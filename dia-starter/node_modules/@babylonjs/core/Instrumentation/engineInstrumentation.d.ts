import { PerfCounter } from "../Misc/perfCounter";
import type { IDisposable } from "../scene";
import type { Engine } from "../Engines/engine";
/**
 * This class can be used to get instrumentation data from a Babylon engine
 * @see https://doc.babylonjs.com/features/featuresDeepDive/scene/optimize_your_scene#engineinstrumentation
 */
export declare class EngineInstrumentation implements IDisposable {
    /**
     * Define the instrumented engine.
     */
    engine: Engine;
    private _captureGPUFrameTime;
    private _captureShaderCompilationTime;
    private _shaderCompilationTime;
    private _onBeginFrameObserver;
    private _onEndFrameObserver;
    private _onBeforeShaderCompilationObserver;
    private _onAfterShaderCompilationObserver;
    /**
     * Gets the perf counter used for GPU frame time
     */
    get gpuFrameTimeCounter(): PerfCounter;
    /**
     * Gets the GPU frame time capture status
     */
    get captureGPUFrameTime(): boolean;
    /**
     * Enable or disable the GPU frame time capture
     */
    set captureGPUFrameTime(value: boolean);
    /**
     * Gets the perf counter used for shader compilation time
     */
    get shaderCompilationTimeCounter(): PerfCounter;
    /**
     * Gets the shader compilation time capture status
     */
    get captureShaderCompilationTime(): boolean;
    /**
     * Enable or disable the shader compilation time capture
     */
    set captureShaderCompilationTime(value: boolean);
    /**
     * Instantiates a new engine instrumentation.
     * This class can be used to get instrumentation data from a Babylon engine
     * @see https://doc.babylonjs.com/features/featuresDeepDive/scene/optimize_your_scene#engineinstrumentation
     * @param engine Defines the engine to instrument
     */
    constructor(
    /**
     * Define the instrumented engine.
     */
    engine: Engine);
    /**
     * Dispose and release associated resources.
     */
    dispose(): void;
}
