import { PostProcessRenderEffect } from "../PostProcesses/RenderPipeline/postProcessRenderEffect.js";
import { ExtractHighlightsPostProcess } from "./extractHighlightsPostProcess.js";
import { BlurPostProcess } from "./blurPostProcess.js";
import { BloomMergePostProcess } from "./bloomMergePostProcess.js";
import { Vector2 } from "../Maths/math.vector.js";
import { Texture } from "../Materials/Textures/texture.js";
/**
 * The bloom effect spreads bright areas of an image to simulate artifacts seen in cameras
 */
export class BloomEffect extends PostProcessRenderEffect {
    /**
     * The luminance threshold to find bright areas of the image to bloom.
     */
    get threshold() {
        return this._downscale.threshold;
    }
    set threshold(value) {
        this._downscale.threshold = value;
    }
    /**
     * The strength of the bloom.
     */
    get weight() {
        return this._merge.weight;
    }
    set weight(value) {
        this._merge.weight = value;
    }
    /**
     * Specifies the size of the bloom blur kernel, relative to the final output size
     */
    get kernel() {
        return this._blurX.kernel / this._bloomScale;
    }
    set kernel(value) {
        this._blurX.kernel = value * this._bloomScale;
        this._blurY.kernel = value * this._bloomScale;
    }
    /**
     * Creates a new instance of @see BloomEffect
     * @param scene The scene the effect belongs to.
     * @param _bloomScale The ratio of the blur texture to the input texture that should be used to compute the bloom.
     * @param bloomWeight The strength of bloom.
     * @param bloomKernel The size of the kernel to be used when applying the blur.
     * @param pipelineTextureType The type of texture to be used when performing the post processing.
     * @param blockCompilation If compilation of the shader should not be done in the constructor. The updateEffect method can be used to compile the shader at a later time. (default: false)
     */
    constructor(scene, _bloomScale, bloomWeight, bloomKernel, pipelineTextureType = 0, blockCompilation = false) {
        super(scene.getEngine(), "bloom", () => {
            return this._effects;
        }, true);
        this._bloomScale = _bloomScale;
        /**
         * @internal Internal
         */
        this._effects = [];
        this._downscale = new ExtractHighlightsPostProcess("highlights", 1.0, null, Texture.BILINEAR_SAMPLINGMODE, scene.getEngine(), false, pipelineTextureType, blockCompilation);
        this._blurX = new BlurPostProcess("horizontal blur", new Vector2(1.0, 0), 10.0, _bloomScale, null, Texture.BILINEAR_SAMPLINGMODE, scene.getEngine(), false, pipelineTextureType, undefined, blockCompilation);
        this._blurX.alwaysForcePOT = true;
        this._blurX.autoClear = false;
        this._blurY = new BlurPostProcess("vertical blur", new Vector2(0, 1.0), 10.0, _bloomScale, null, Texture.BILINEAR_SAMPLINGMODE, scene.getEngine(), false, pipelineTextureType, undefined, blockCompilation);
        this._blurY.alwaysForcePOT = true;
        this._blurY.autoClear = false;
        this.kernel = bloomKernel;
        this._effects = [this._downscale, this._blurX, this._blurY];
        this._merge = new BloomMergePostProcess("bloomMerge", this._downscale, this._blurY, bloomWeight, _bloomScale, null, Texture.BILINEAR_SAMPLINGMODE, scene.getEngine(), false, pipelineTextureType, blockCompilation);
        this._merge.autoClear = false;
        this._effects.push(this._merge);
    }
    /**
     * Disposes each of the internal effects for a given camera.
     * @param camera The camera to dispose the effect on.
     */
    disposeEffects(camera) {
        for (let effectIndex = 0; effectIndex < this._effects.length; effectIndex++) {
            this._effects[effectIndex].dispose(camera);
        }
    }
    /**
     * @internal Internal
     */
    _updateEffects() {
        for (let effectIndex = 0; effectIndex < this._effects.length; effectIndex++) {
            this._effects[effectIndex].updateEffect();
        }
    }
    /**
     * Internal
     * @returns if all the contained post processes are ready.
     * @internal
     */
    _isReady() {
        for (let effectIndex = 0; effectIndex < this._effects.length; effectIndex++) {
            if (!this._effects[effectIndex].isReady()) {
                return false;
            }
        }
        return true;
    }
}
//# sourceMappingURL=bloomEffect.js.map