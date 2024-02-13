import { PostProcessRenderEffect } from "../PostProcesses/RenderPipeline/postProcessRenderEffect";
import type { PostProcess } from "./postProcess";
import { ExtractHighlightsPostProcess } from "./extractHighlightsPostProcess";
import type { Camera } from "../Cameras/camera";
import type { Scene } from "../scene";
/**
 * The bloom effect spreads bright areas of an image to simulate artifacts seen in cameras
 */
export declare class BloomEffect extends PostProcessRenderEffect {
    private _bloomScale;
    /**
     * @internal Internal
     */
    _effects: Array<PostProcess>;
    /**
     * @internal Internal
     */
    _downscale: ExtractHighlightsPostProcess;
    private _blurX;
    private _blurY;
    private _merge;
    /**
     * The luminance threshold to find bright areas of the image to bloom.
     */
    get threshold(): number;
    set threshold(value: number);
    /**
     * The strength of the bloom.
     */
    get weight(): number;
    set weight(value: number);
    /**
     * Specifies the size of the bloom blur kernel, relative to the final output size
     */
    get kernel(): number;
    set kernel(value: number);
    /**
     * Creates a new instance of @see BloomEffect
     * @param scene The scene the effect belongs to.
     * @param _bloomScale The ratio of the blur texture to the input texture that should be used to compute the bloom.
     * @param bloomWeight The strength of bloom.
     * @param bloomKernel The size of the kernel to be used when applying the blur.
     * @param pipelineTextureType The type of texture to be used when performing the post processing.
     * @param blockCompilation If compilation of the shader should not be done in the constructor. The updateEffect method can be used to compile the shader at a later time. (default: false)
     */
    constructor(scene: Scene, _bloomScale: number, bloomWeight: number, bloomKernel: number, pipelineTextureType?: number, blockCompilation?: boolean);
    /**
     * Disposes each of the internal effects for a given camera.
     * @param camera The camera to dispose the effect on.
     */
    disposeEffects(camera: Camera): void;
    /**
     * @internal Internal
     */
    _updateEffects(): void;
    /**
     * Internal
     * @returns if all the contained post processes are ready.
     * @internal
     */
    _isReady(): boolean;
}
