import type { Nullable } from "../types";
import type { Color4 } from "../Maths/math.color";
import type { Camera } from "../Cameras/camera";
import type { BaseTexture } from "../Materials/Textures/baseTexture";
import type { ColorCurves } from "../Materials/colorCurves";
import { ImageProcessingConfiguration } from "../Materials/imageProcessingConfiguration";
import type { PostProcessOptions } from "./postProcess";
import { PostProcess } from "./postProcess";
import type { Engine } from "../Engines/engine";
import "../Shaders/imageProcessing.fragment";
import "../Shaders/postprocess.vertex";
/**
 * ImageProcessingPostProcess
 * @see https://doc.babylonjs.com/features/featuresDeepDive/postProcesses/usePostProcesses#imageprocessing
 */
export declare class ImageProcessingPostProcess extends PostProcess {
    /**
     * Default configuration related to image processing available in the PBR Material.
     */
    protected _imageProcessingConfiguration: ImageProcessingConfiguration;
    /**
     * Gets the image processing configuration used either in this material.
     */
    get imageProcessingConfiguration(): ImageProcessingConfiguration;
    /**
     * Sets the Default image processing configuration used either in the this material.
     *
     * If sets to null, the scene one is in use.
     */
    set imageProcessingConfiguration(value: ImageProcessingConfiguration);
    /**
     * Keep track of the image processing observer to allow dispose and replace.
     */
    private _imageProcessingObserver;
    /**
     * Attaches a new image processing configuration to the PBR Material.
     * @param configuration
     * @param doNotBuild
     */
    protected _attachImageProcessingConfiguration(configuration: Nullable<ImageProcessingConfiguration>, doNotBuild?: boolean): void;
    /**
     * If the post process is supported.
     */
    get isSupported(): boolean;
    /**
     * Gets Color curves setup used in the effect if colorCurvesEnabled is set to true .
     */
    get colorCurves(): Nullable<ColorCurves>;
    /**
     * Sets Color curves setup used in the effect if colorCurvesEnabled is set to true .
     */
    set colorCurves(value: Nullable<ColorCurves>);
    /**
     * Gets whether the color curves effect is enabled.
     */
    get colorCurvesEnabled(): boolean;
    /**
     * Sets whether the color curves effect is enabled.
     */
    set colorCurvesEnabled(value: boolean);
    /**
     * Gets Color grading LUT texture used in the effect if colorGradingEnabled is set to true.
     */
    get colorGradingTexture(): Nullable<BaseTexture>;
    /**
     * Sets Color grading LUT texture used in the effect if colorGradingEnabled is set to true.
     */
    set colorGradingTexture(value: Nullable<BaseTexture>);
    /**
     * Gets whether the color grading effect is enabled.
     */
    get colorGradingEnabled(): boolean;
    /**
     * Gets whether the color grading effect is enabled.
     */
    set colorGradingEnabled(value: boolean);
    /**
     * Gets exposure used in the effect.
     */
    get exposure(): number;
    /**
     * Sets exposure used in the effect.
     */
    set exposure(value: number);
    /**
     * Gets whether tonemapping is enabled or not.
     */
    get toneMappingEnabled(): boolean;
    /**
     * Sets whether tonemapping is enabled or not
     */
    set toneMappingEnabled(value: boolean);
    /**
     * Gets the type of tone mapping effect.
     */
    get toneMappingType(): number;
    /**
     * Sets the type of tone mapping effect.
     */
    set toneMappingType(value: number);
    /**
     * Gets contrast used in the effect.
     */
    get contrast(): number;
    /**
     * Sets contrast used in the effect.
     */
    set contrast(value: number);
    /**
     * Gets Vignette stretch size.
     */
    get vignetteStretch(): number;
    /**
     * Sets Vignette stretch size.
     */
    set vignetteStretch(value: number);
    /**
     * Gets Vignette center X Offset.
     * @deprecated use vignetteCenterX instead
     */
    get vignetteCentreX(): number;
    /**
     * Sets Vignette center X Offset.
     * @deprecated use vignetteCenterX instead
     */
    set vignetteCentreX(value: number);
    /**
     * Gets Vignette center Y Offset.
     * @deprecated use vignetteCenterY instead
     */
    get vignetteCentreY(): number;
    /**
     * Sets Vignette center Y Offset.
     * @deprecated use vignetteCenterY instead
     */
    set vignetteCentreY(value: number);
    /**
     * Vignette center Y Offset.
     */
    get vignetteCenterY(): number;
    set vignetteCenterY(value: number);
    /**
     * Vignette center X Offset.
     */
    get vignetteCenterX(): number;
    set vignetteCenterX(value: number);
    /**
     * Gets Vignette weight or intensity of the vignette effect.
     */
    get vignetteWeight(): number;
    /**
     * Sets Vignette weight or intensity of the vignette effect.
     */
    set vignetteWeight(value: number);
    /**
     * Gets Color of the vignette applied on the screen through the chosen blend mode (vignetteBlendMode)
     * if vignetteEnabled is set to true.
     */
    get vignetteColor(): Color4;
    /**
     * Sets Color of the vignette applied on the screen through the chosen blend mode (vignetteBlendMode)
     * if vignetteEnabled is set to true.
     */
    set vignetteColor(value: Color4);
    /**
     * Gets Camera field of view used by the Vignette effect.
     */
    get vignetteCameraFov(): number;
    /**
     * Sets Camera field of view used by the Vignette effect.
     */
    set vignetteCameraFov(value: number);
    /**
     * Gets the vignette blend mode allowing different kind of effect.
     */
    get vignetteBlendMode(): number;
    /**
     * Sets the vignette blend mode allowing different kind of effect.
     */
    set vignetteBlendMode(value: number);
    /**
     * Gets whether the vignette effect is enabled.
     */
    get vignetteEnabled(): boolean;
    /**
     * Sets whether the vignette effect is enabled.
     */
    set vignetteEnabled(value: boolean);
    /**
     * Gets intensity of the dithering effect.
     */
    get ditheringIntensity(): number;
    /**
     * Sets intensity of the dithering effect.
     */
    set ditheringIntensity(value: number);
    /**
     * Gets whether the dithering effect is enabled.
     */
    get ditheringEnabled(): boolean;
    /**
     * Sets whether the dithering effect is enabled.
     */
    set ditheringEnabled(value: boolean);
    private _fromLinearSpace;
    /**
     * Gets whether the input of the processing is in Gamma or Linear Space.
     */
    get fromLinearSpace(): boolean;
    /**
     * Sets whether the input of the processing is in Gamma or Linear Space.
     */
    set fromLinearSpace(value: boolean);
    /**
     * Defines cache preventing GC.
     */
    private _defines;
    constructor(name: string, options: number | PostProcessOptions, camera?: Nullable<Camera>, samplingMode?: number, engine?: Engine, reusable?: boolean, textureType?: number, imageProcessingConfiguration?: ImageProcessingConfiguration);
    /**
     *  "ImageProcessingPostProcess"
     * @returns "ImageProcessingPostProcess"
     */
    getClassName(): string;
    /**
     * @internal
     */
    _updateParameters(): void;
    dispose(camera?: Camera): void;
}
