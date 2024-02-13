import type { Vector2 } from "../Maths/math.vector";
import type { Nullable } from "../types";
import type { PostProcessOptions } from "./postProcess";
import { PostProcess } from "./postProcess";
import type { Camera } from "../Cameras/camera";
import type { Effect } from "../Materials/effect";
import type { Engine } from "../Engines/engine";
import "../Shaders/kernelBlur.fragment";
import "../Shaders/kernelBlur.vertex";
import type { Scene } from "../scene";
/**
 * The Blur Post Process which blurs an image based on a kernel and direction.
 * Can be used twice in x and y directions to perform a gaussian blur in two passes.
 */
export declare class BlurPostProcess extends PostProcess {
    private _blockCompilation;
    protected _kernel: number;
    protected _idealKernel: number;
    protected _packedFloat: boolean;
    private _staticDefines;
    /** The direction in which to blur the image. */
    direction: Vector2;
    /**
     * Sets the length in pixels of the blur sample region
     */
    set kernel(v: number);
    /**
     * Gets the length in pixels of the blur sample region
     */
    get kernel(): number;
    /**
     * Sets whether or not the blur needs to unpack/repack floats
     */
    set packedFloat(v: boolean);
    /**
     * Gets whether or not the blur is unpacking/repacking floats
     */
    get packedFloat(): boolean;
    /**
     * Gets a string identifying the name of the class
     * @returns "BlurPostProcess" string
     */
    getClassName(): string;
    /**
     * Creates a new instance BlurPostProcess
     * @param name The name of the effect.
     * @param direction The direction in which to blur the image.
     * @param kernel The size of the kernel to be used when computing the blur. eg. Size of 3 will blur the center pixel by 2 pixels surrounding it.
     * @param options The required width/height ratio to downsize to before computing the render pass. (Use 1.0 for full size)
     * @param camera The camera to apply the render pass to.
     * @param samplingMode The sampling mode to be used when computing the pass. (default: 0)
     * @param engine The engine which the post process will be applied. (default: current engine)
     * @param reusable If the post process can be reused on the same frame. (default: false)
     * @param textureType Type of textures used when performing the post process. (default: 0)
     * @param defines
     * @param _blockCompilation If compilation of the shader should not be done in the constructor. The updateEffect method can be used to compile the shader at a later time. (default: false)
     * @param textureFormat Format of textures used when performing the post process. (default: TEXTUREFORMAT_RGBA)
     */
    constructor(name: string, direction: Vector2, kernel: number, options: number | PostProcessOptions, camera: Nullable<Camera>, samplingMode?: number, engine?: Engine, reusable?: boolean, textureType?: number, defines?: string, _blockCompilation?: boolean, textureFormat?: number);
    /**
     * Updates the effect with the current post process compile time values and recompiles the shader.
     * @param defines Define statements that should be added at the beginning of the shader. (default: null)
     * @param uniforms Set of uniform variables that will be passed to the shader. (default: null)
     * @param samplers Set of Texture2D variables that will be passed to the shader. (default: null)
     * @param indexParameters The index parameters to be used for babylons include syntax "#include<kernelBlurVaryingDeclaration>[0..varyingCount]". (default: undefined) See usage in babylon.blurPostProcess.ts and kernelBlur.vertex.fx
     * @param onCompiled Called when the shader has been compiled.
     * @param onError Called if there is an error when compiling a shader.
     */
    updateEffect(defines?: Nullable<string>, uniforms?: Nullable<string[]>, samplers?: Nullable<string[]>, indexParameters?: any, onCompiled?: (effect: Effect) => void, onError?: (effect: Effect, errors: string) => void): void;
    protected _updateParameters(onCompiled?: (effect: Effect) => void, onError?: (effect: Effect, errors: string) => void): void;
    /**
     * Best kernels are odd numbers that when divided by 2, their integer part is even, so 5, 9 or 13.
     * Other odd kernels optimize correctly but require proportionally more samples, even kernels are
     * possible but will produce minor visual artifacts. Since each new kernel requires a new shader we
     * want to minimize kernel changes, having gaps between physical kernels is helpful in that regard.
     * The gaps between physical kernels are compensated for in the weighting of the samples
     * @param idealKernel Ideal blur kernel.
     * @returns Nearest best kernel.
     */
    protected _nearestBestKernel(idealKernel: number): number;
    /**
     * Calculates the value of a Gaussian distribution with sigma 3 at a given point.
     * @param x The point on the Gaussian distribution to sample.
     * @returns the value of the Gaussian function at x.
     */
    protected _gaussianWeight(x: number): number;
    /**
     * Generates a string that can be used as a floating point number in GLSL.
     * @param x Value to print.
     * @param decimalFigures Number of decimal places to print the number to (excluding trailing 0s).
     * @returns GLSL float string.
     */
    protected _glslFloat(x: number, decimalFigures?: number): string;
    /**
     * @internal
     */
    static _Parse(parsedPostProcess: any, targetCamera: Camera, scene: Scene, rootUrl: string): Nullable<BlurPostProcess>;
}
