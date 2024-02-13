import type { Nullable } from "../types";
import type { Camera } from "../Cameras/camera";
import type { PostProcessOptions } from "./postProcess";
import { PostProcess } from "./postProcess";
import "../Shaders/screenSpaceReflection.fragment";
import type { Engine } from "../Engines/engine";
import type { Scene } from "../scene";
/**
 * The ScreenSpaceReflectionPostProcess performs realtime reflections using only and only the available informations on the screen (positions and normals).
 * Basically, the screen space reflection post-process will compute reflections according the material's reflectivity.
 * @deprecated Use the new SSRRenderingPipeline instead.
 */
export declare class ScreenSpaceReflectionPostProcess extends PostProcess {
    /**
     * Gets or sets a reflection threshold mainly used to adjust the reflection's height.
     */
    threshold: number;
    /**
     * Gets or sets the current reflection strength. 1.0 is an ideal value but can be increased/decreased for particular results.
     */
    strength: number;
    /**
     * Gets or sets the falloff exponent used while computing fresnel. More the exponent is high, more the reflections will be discrete.
     */
    reflectionSpecularFalloffExponent: number;
    /**
     * Gets or sets the step size used to iterate until the effect finds the color of the reflection's pixel. Typically in interval [0.1, 1.0]
     */
    step: number;
    /**
     * Gets or sets the factor applied when computing roughness. Default value is 0.2.
     */
    roughnessFactor: number;
    private _forceGeometryBuffer;
    private get _geometryBufferRenderer();
    private get _prePassRenderer();
    private _enableSmoothReflections;
    private _reflectionSamples;
    private _smoothSteps;
    private _isSceneRightHanded;
    /**
     * Gets a string identifying the name of the class
     * @returns "ScreenSpaceReflectionPostProcess" string
     */
    getClassName(): string;
    /**
     * Creates a new instance of ScreenSpaceReflectionPostProcess.
     * @param name The name of the effect.
     * @param scene The scene containing the objects to calculate reflections.
     * @param options The required width/height ratio to downsize to before computing the render pass.
     * @param camera The camera to apply the render pass to.
     * @param samplingMode The sampling mode to be used when computing the pass. (default: 0)
     * @param engine The engine which the post process will be applied. (default: current engine)
     * @param reusable If the post process can be reused on the same frame. (default: false)
     * @param textureType Type of textures used when performing the post process. (default: 0)
     * @param blockCompilation If compilation of the shader should not be done in the constructor. The updateEffect method can be used to compile the shader at a later time. (default: true)
     * @param forceGeometryBuffer If this post process should use geometry buffer instead of prepass (default: false)
     */
    constructor(name: string, scene: Scene, options: number | PostProcessOptions, camera: Nullable<Camera>, samplingMode?: number, engine?: Engine, reusable?: boolean, textureType?: number, blockCompilation?: boolean, forceGeometryBuffer?: boolean);
    /**
     * Gets whether or not smoothing reflections is enabled.
     * Enabling smoothing will require more GPU power and can generate a drop in FPS.
     */
    get enableSmoothReflections(): boolean;
    /**
     * Sets whether or not smoothing reflections is enabled.
     * Enabling smoothing will require more GPU power and can generate a drop in FPS.
     */
    set enableSmoothReflections(enabled: boolean);
    /**
     * Gets the number of samples taken while computing reflections. More samples count is high,
     * more the post-process wil require GPU power and can generate a drop in FPS. Basically in interval [25, 100].
     */
    get reflectionSamples(): number;
    /**
     * Sets the number of samples taken while computing reflections. More samples count is high,
     * more the post-process wil require GPU power and can generate a drop in FPS. Basically in interval [25, 100].
     */
    set reflectionSamples(samples: number);
    /**
     * Gets the number of samples taken while smoothing reflections. More samples count is high,
     * more the post-process will require GPU power and can generate a drop in FPS.
     * Default value (5.0) work pretty well in all cases but can be adjusted.
     */
    get smoothSteps(): number;
    set smoothSteps(steps: number);
    private _updateEffectDefines;
    /**
     * @internal
     */
    static _Parse(parsedPostProcess: any, targetCamera: Camera, scene: Scene, rootUrl: string): ScreenSpaceReflectionPostProcess;
}
