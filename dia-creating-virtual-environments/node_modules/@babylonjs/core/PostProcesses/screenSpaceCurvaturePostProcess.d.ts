import type { Nullable } from "../types";
import type { Camera } from "../Cameras/camera";
import type { PostProcessOptions } from "./postProcess";
import { PostProcess } from "./postProcess";
import "../Rendering/geometryBufferRendererSceneComponent";
import "../Shaders/screenSpaceCurvature.fragment";
import type { Engine } from "../Engines/engine";
import type { Scene } from "../scene";
/**
 * The Screen Space curvature effect can help highlighting ridge and valley of a model.
 */
export declare class ScreenSpaceCurvaturePostProcess extends PostProcess {
    /**
     * Defines how much ridge the curvature effect displays.
     */
    ridge: number;
    /**
     * Defines how much valley the curvature effect displays.
     */
    valley: number;
    private _geometryBufferRenderer;
    /**
     * Gets a string identifying the name of the class
     * @returns "ScreenSpaceCurvaturePostProcess" string
     */
    getClassName(): string;
    /**
     * Creates a new instance ScreenSpaceCurvaturePostProcess
     * @param name The name of the effect.
     * @param scene The scene containing the objects to blur according to their velocity.
     * @param options The required width/height ratio to downsize to before computing the render pass.
     * @param camera The camera to apply the render pass to.
     * @param samplingMode The sampling mode to be used when computing the pass. (default: 0)
     * @param engine The engine which the post process will be applied. (default: current engine)
     * @param reusable If the post process can be reused on the same frame. (default: false)
     * @param textureType Type of textures used when performing the post process. (default: 0)
     * @param blockCompilation If compilation of the shader should not be done in the constructor. The updateEffect method can be used to compile the shader at a later time. (default: false)
     */
    constructor(name: string, scene: Scene, options: number | PostProcessOptions, camera: Nullable<Camera>, samplingMode?: number, engine?: Engine, reusable?: boolean, textureType?: number, blockCompilation?: boolean);
    /**
     * Support test.
     */
    static get IsSupported(): boolean;
    /**
     * @internal
     */
    static _Parse(parsedPostProcess: any, targetCamera: Camera, scene: Scene, rootUrl: string): ScreenSpaceCurvaturePostProcess;
}
