import type { PostProcessOptions } from "./postProcess";
import { PostProcess } from "./postProcess";
import type { Camera } from "../Cameras/camera";
import type { Engine } from "../Engines/engine";
import "../Shaders/blackAndWhite.fragment";
import type { Nullable } from "../types";
import type { Scene } from "../scene";
/**
 * Post process used to render in black and white
 */
export declare class BlackAndWhitePostProcess extends PostProcess {
    /**
     * Linear about to convert he result to black and white (default: 1)
     */
    degree: number;
    /**
     * Gets a string identifying the name of the class
     * @returns "BlackAndWhitePostProcess" string
     */
    getClassName(): string;
    /**
     * Creates a black and white post process
     * @see https://doc.babylonjs.com/features/featuresDeepDive/postProcesses/usePostProcesses#black-and-white
     * @param name The name of the effect.
     * @param options The required width/height ratio to downsize to before computing the render pass.
     * @param camera The camera to apply the render pass to.
     * @param samplingMode The sampling mode to be used when computing the pass. (default: 0)
     * @param engine The engine which the post process will be applied. (default: current engine)
     * @param reusable If the post process can be reused on the same frame. (default: false)
     */
    constructor(name: string, options: number | PostProcessOptions, camera: Nullable<Camera>, samplingMode?: number, engine?: Engine, reusable?: boolean);
    /**
     * @internal
     */
    static _Parse(parsedPostProcess: any, targetCamera: Camera, scene: Scene, rootUrl: string): Nullable<BlackAndWhitePostProcess>;
}
