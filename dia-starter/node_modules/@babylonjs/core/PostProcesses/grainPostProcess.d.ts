import type { Nullable } from "../types";
import type { Camera } from "../Cameras/camera";
import type { PostProcessOptions } from "./postProcess";
import { PostProcess } from "./postProcess";
import type { Engine } from "../Engines/engine";
import "../Shaders/grain.fragment";
import type { Scene } from "../scene";
/**
 * The GrainPostProcess adds noise to the image at mid luminance levels
 */
export declare class GrainPostProcess extends PostProcess {
    /**
     * The intensity of the grain added (default: 30)
     */
    intensity: number;
    /**
     * If the grain should be randomized on every frame
     */
    animated: boolean;
    /**
     * Gets a string identifying the name of the class
     * @returns "GrainPostProcess" string
     */
    getClassName(): string;
    /**
     * Creates a new instance of @see GrainPostProcess
     * @param name The name of the effect.
     * @param options The required width/height ratio to downsize to before computing the render pass.
     * @param camera The camera to apply the render pass to.
     * @param samplingMode The sampling mode to be used when computing the pass. (default: 0)
     * @param engine The engine which the post process will be applied. (default: current engine)
     * @param reusable If the post process can be reused on the same frame. (default: false)
     * @param textureType Type of textures used when performing the post process. (default: 0)
     * @param blockCompilation If compilation of the shader should not be done in the constructor. The updateEffect method can be used to compile the shader at a later time. (default: false)
     */
    constructor(name: string, options: number | PostProcessOptions, camera: Nullable<Camera>, samplingMode?: number, engine?: Engine, reusable?: boolean, textureType?: number, blockCompilation?: boolean);
    /**
     * @internal
     */
    static _Parse(parsedPostProcess: any, targetCamera: Camera, scene: Scene, rootUrl: string): GrainPostProcess;
}
