import { __decorate } from "../tslib.es6.js";
import { PostProcess } from "./postProcess.js";
import { Texture } from "../Materials/Textures/texture.js";

import "../Shaders/kernelBlur.fragment.js";
import "../Shaders/kernelBlur.vertex.js";
import { RegisterClass } from "../Misc/typeStore.js";
import { serialize, serializeAsVector2, SerializationHelper } from "../Misc/decorators.js";
/**
 * The Blur Post Process which blurs an image based on a kernel and direction.
 * Can be used twice in x and y directions to perform a gaussian blur in two passes.
 */
export class BlurPostProcess extends PostProcess {
    /**
     * Sets the length in pixels of the blur sample region
     */
    set kernel(v) {
        if (this._idealKernel === v) {
            return;
        }
        v = Math.max(v, 1);
        this._idealKernel = v;
        this._kernel = this._nearestBestKernel(v);
        if (!this._blockCompilation) {
            this._updateParameters();
        }
    }
    /**
     * Gets the length in pixels of the blur sample region
     */
    get kernel() {
        return this._idealKernel;
    }
    /**
     * Sets whether or not the blur needs to unpack/repack floats
     */
    set packedFloat(v) {
        if (this._packedFloat === v) {
            return;
        }
        this._packedFloat = v;
        if (!this._blockCompilation) {
            this._updateParameters();
        }
    }
    /**
     * Gets whether or not the blur is unpacking/repacking floats
     */
    get packedFloat() {
        return this._packedFloat;
    }
    /**
     * Gets a string identifying the name of the class
     * @returns "BlurPostProcess" string
     */
    getClassName() {
        return "BlurPostProcess";
    }
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
    constructor(name, direction, kernel, options, camera, samplingMode = Texture.BILINEAR_SAMPLINGMODE, engine, reusable, textureType = 0, defines = "", _blockCompilation = false, textureFormat = 5) {
        super(name, "kernelBlur", ["delta", "direction"], ["circleOfConfusionSampler"], options, camera, samplingMode, engine, reusable, null, textureType, "kernelBlur", { varyingCount: 0, depCount: 0 }, true, textureFormat);
        this._blockCompilation = _blockCompilation;
        this._packedFloat = false;
        this._staticDefines = "";
        this._staticDefines = defines;
        this.direction = direction;
        this.onApplyObservable.add((effect) => {
            if (this._outputTexture) {
                effect.setFloat2("delta", (1 / this._outputTexture.width) * this.direction.x, (1 / this._outputTexture.height) * this.direction.y);
            }
            else {
                effect.setFloat2("delta", (1 / this.width) * this.direction.x, (1 / this.height) * this.direction.y);
            }
        });
        this.kernel = kernel;
    }
    /**
     * Updates the effect with the current post process compile time values and recompiles the shader.
     * @param defines Define statements that should be added at the beginning of the shader. (default: null)
     * @param uniforms Set of uniform variables that will be passed to the shader. (default: null)
     * @param samplers Set of Texture2D variables that will be passed to the shader. (default: null)
     * @param indexParameters The index parameters to be used for babylons include syntax "#include<kernelBlurVaryingDeclaration>[0..varyingCount]". (default: undefined) See usage in babylon.blurPostProcess.ts and kernelBlur.vertex.fx
     * @param onCompiled Called when the shader has been compiled.
     * @param onError Called if there is an error when compiling a shader.
     */
    updateEffect(defines = null, uniforms = null, samplers = null, indexParameters, onCompiled, onError) {
        this._updateParameters(onCompiled, onError);
    }
    _updateParameters(onCompiled, onError) {
        // Generate sampling offsets and weights
        const N = this._kernel;
        const centerIndex = (N - 1) / 2;
        // Generate Gaussian sampling weights over kernel
        let offsets = [];
        let weights = [];
        let totalWeight = 0;
        for (let i = 0; i < N; i++) {
            const u = i / (N - 1);
            const w = this._gaussianWeight(u * 2.0 - 1);
            offsets[i] = i - centerIndex;
            weights[i] = w;
            totalWeight += w;
        }
        // Normalize weights
        for (let i = 0; i < weights.length; i++) {
            weights[i] /= totalWeight;
        }
        // Optimize: combine samples to take advantage of hardware linear sampling
        // Walk from left to center, combining pairs (symmetrically)
        const linearSamplingWeights = [];
        const linearSamplingOffsets = [];
        const linearSamplingMap = [];
        for (let i = 0; i <= centerIndex; i += 2) {
            const j = Math.min(i + 1, Math.floor(centerIndex));
            const singleCenterSample = i === j;
            if (singleCenterSample) {
                linearSamplingMap.push({ o: offsets[i], w: weights[i] });
            }
            else {
                const sharedCell = j === centerIndex;
                const weightLinear = weights[i] + weights[j] * (sharedCell ? 0.5 : 1);
                const offsetLinear = offsets[i] + 1 / (1 + weights[i] / weights[j]);
                if (offsetLinear === 0) {
                    linearSamplingMap.push({ o: offsets[i], w: weights[i] });
                    linearSamplingMap.push({ o: offsets[i + 1], w: weights[i + 1] });
                }
                else {
                    linearSamplingMap.push({ o: offsetLinear, w: weightLinear });
                    linearSamplingMap.push({ o: -offsetLinear, w: weightLinear });
                }
            }
        }
        for (let i = 0; i < linearSamplingMap.length; i++) {
            linearSamplingOffsets[i] = linearSamplingMap[i].o;
            linearSamplingWeights[i] = linearSamplingMap[i].w;
        }
        // Replace with optimized
        offsets = linearSamplingOffsets;
        weights = linearSamplingWeights;
        // Generate shaders
        const maxVaryingRows = this.getEngine().getCaps().maxVaryingVectors;
        const freeVaryingVec2 = Math.max(maxVaryingRows, 0) - 1; // Because of sampleCenter
        let varyingCount = Math.min(offsets.length, freeVaryingVec2);
        let defines = "";
        defines += this._staticDefines;
        // The DOF fragment should ignore the center pixel when looping as it is handled manually in the fragment shader.
        if (this._staticDefines.indexOf("DOF") != -1) {
            defines += `#define CENTER_WEIGHT ${this._glslFloat(weights[varyingCount - 1])}\n`;
            varyingCount--;
        }
        for (let i = 0; i < varyingCount; i++) {
            defines += `#define KERNEL_OFFSET${i} ${this._glslFloat(offsets[i])}\n`;
            defines += `#define KERNEL_WEIGHT${i} ${this._glslFloat(weights[i])}\n`;
        }
        let depCount = 0;
        for (let i = freeVaryingVec2; i < offsets.length; i++) {
            defines += `#define KERNEL_DEP_OFFSET${depCount} ${this._glslFloat(offsets[i])}\n`;
            defines += `#define KERNEL_DEP_WEIGHT${depCount} ${this._glslFloat(weights[i])}\n`;
            depCount++;
        }
        if (this.packedFloat) {
            defines += `#define PACKEDFLOAT 1`;
        }
        this._blockCompilation = false;
        super.updateEffect(defines, null, null, {
            varyingCount: varyingCount,
            depCount: depCount,
        }, onCompiled, onError);
    }
    /**
     * Best kernels are odd numbers that when divided by 2, their integer part is even, so 5, 9 or 13.
     * Other odd kernels optimize correctly but require proportionally more samples, even kernels are
     * possible but will produce minor visual artifacts. Since each new kernel requires a new shader we
     * want to minimize kernel changes, having gaps between physical kernels is helpful in that regard.
     * The gaps between physical kernels are compensated for in the weighting of the samples
     * @param idealKernel Ideal blur kernel.
     * @returns Nearest best kernel.
     */
    _nearestBestKernel(idealKernel) {
        const v = Math.round(idealKernel);
        for (const k of [v, v - 1, v + 1, v - 2, v + 2]) {
            if (k % 2 !== 0 && Math.floor(k / 2) % 2 === 0 && k > 0) {
                return Math.max(k, 3);
            }
        }
        return Math.max(v, 3);
    }
    /**
     * Calculates the value of a Gaussian distribution with sigma 3 at a given point.
     * @param x The point on the Gaussian distribution to sample.
     * @returns the value of the Gaussian function at x.
     */
    _gaussianWeight(x) {
        //reference: Engines/ImageProcessingBlur.cpp #dcc760
        // We are evaluating the Gaussian (normal) distribution over a kernel parameter space of [-1,1],
        // so we truncate at three standard deviations by setting stddev (sigma) to 1/3.
        // The choice of 3-sigma truncation is common but arbitrary, and means that the signal is
        // truncated at around 1.3% of peak strength.
        //the distribution is scaled to account for the difference between the actual kernel size and the requested kernel size
        const sigma = 1 / 3;
        const denominator = Math.sqrt(2.0 * Math.PI) * sigma;
        const exponent = -((x * x) / (2.0 * sigma * sigma));
        const weight = (1.0 / denominator) * Math.exp(exponent);
        return weight;
    }
    /**
     * Generates a string that can be used as a floating point number in GLSL.
     * @param x Value to print.
     * @param decimalFigures Number of decimal places to print the number to (excluding trailing 0s).
     * @returns GLSL float string.
     */
    _glslFloat(x, decimalFigures = 8) {
        return x.toFixed(decimalFigures).replace(/0+$/, "");
    }
    /**
     * @internal
     */
    static _Parse(parsedPostProcess, targetCamera, scene, rootUrl) {
        return SerializationHelper.Parse(() => {
            return new BlurPostProcess(parsedPostProcess.name, parsedPostProcess.direction, parsedPostProcess.kernel, parsedPostProcess.options, targetCamera, parsedPostProcess.renderTargetSamplingMode, scene.getEngine(), parsedPostProcess.reusable, parsedPostProcess.textureType, undefined, false);
        }, parsedPostProcess, scene, rootUrl);
    }
}
__decorate([
    serialize("kernel")
], BlurPostProcess.prototype, "_kernel", void 0);
__decorate([
    serialize("packedFloat")
], BlurPostProcess.prototype, "_packedFloat", void 0);
__decorate([
    serializeAsVector2()
], BlurPostProcess.prototype, "direction", void 0);
RegisterClass("BABYLON.BlurPostProcess", BlurPostProcess);
//# sourceMappingURL=blurPostProcess.js.map