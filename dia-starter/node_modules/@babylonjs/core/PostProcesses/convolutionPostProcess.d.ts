import type { PostProcessOptions } from "./postProcess";
import { PostProcess } from "./postProcess";
import type { Nullable } from "../types";
import type { Camera } from "../Cameras/camera";
import type { Engine } from "../Engines/engine";
import "../Shaders/convolution.fragment";
import type { Scene } from "../scene";
/**
 * The ConvolutionPostProcess applies a 3x3 kernel to every pixel of the
 * input texture to perform effects such as edge detection or sharpening
 * See http://en.wikipedia.org/wiki/Kernel_(image_processing)
 */
export declare class ConvolutionPostProcess extends PostProcess {
    /** Array of 9 values corresponding to the 3x3 kernel to be applied */
    kernel: number[];
    /**
     * Gets a string identifying the name of the class
     * @returns "ConvolutionPostProcess" string
     */
    getClassName(): string;
    /**
     * Creates a new instance ConvolutionPostProcess
     * @param name The name of the effect.
     * @param kernel Array of 9 values corresponding to the 3x3 kernel to be applied
     * @param options The required width/height ratio to downsize to before computing the render pass.
     * @param camera The camera to apply the render pass to.
     * @param samplingMode The sampling mode to be used when computing the pass. (default: 0)
     * @param engine The engine which the post process will be applied. (default: current engine)
     * @param reusable If the post process can be reused on the same frame. (default: false)
     * @param textureType Type of textures used when performing the post process. (default: 0)
     */
    constructor(name: string, kernel: number[], options: number | PostProcessOptions, camera: Nullable<Camera>, samplingMode?: number, engine?: Engine, reusable?: boolean, textureType?: number);
    /**
     * @internal
     */
    static _Parse(parsedPostProcess: any, targetCamera: Camera, scene: Scene, rootUrl: string): Nullable<ConvolutionPostProcess>;
    /**
     * Edge detection 0 see https://en.wikipedia.org/wiki/Kernel_(image_processing)
     */
    static EdgeDetect0Kernel: number[];
    /**
     * Edge detection 1 see https://en.wikipedia.org/wiki/Kernel_(image_processing)
     */
    static EdgeDetect1Kernel: number[];
    /**
     * Edge detection 2 see https://en.wikipedia.org/wiki/Kernel_(image_processing)
     */
    static EdgeDetect2Kernel: number[];
    /**
     * Kernel to sharpen an image see https://en.wikipedia.org/wiki/Kernel_(image_processing)
     */
    static SharpenKernel: number[];
    /**
     * Kernel to emboss an image see https://en.wikipedia.org/wiki/Kernel_(image_processing)
     */
    static EmbossKernel: number[];
    /**
     * Kernel to blur an image see https://en.wikipedia.org/wiki/Kernel_(image_processing)
     */
    static GaussianKernel: number[];
}
