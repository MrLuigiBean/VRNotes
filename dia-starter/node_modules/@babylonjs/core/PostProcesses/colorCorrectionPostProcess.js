import { __decorate } from "../tslib.es6.js";
import { PostProcess } from "./postProcess.js";
import { Texture } from "../Materials/Textures/texture.js";
import "../Shaders/colorCorrection.fragment.js";
import { RegisterClass } from "../Misc/typeStore.js";
import { SerializationHelper, serialize } from "../Misc/decorators.js";
/**
 *
 * This post-process allows the modification of rendered colors by using
 * a 'look-up table' (LUT). This effect is also called Color Grading.
 *
 * The object needs to be provided an url to a texture containing the color
 * look-up table: the texture must be 256 pixels wide and 16 pixels high.
 * Use an image editing software to tweak the LUT to match your needs.
 *
 * For an example of a color LUT, see here:
 * @see http://udn.epicgames.com/Three/rsrc/Three/ColorGrading/RGBTable16x1.png
 * For explanations on color grading, see here:
 * @see http://udn.epicgames.com/Three/ColorGrading.html
 *
 */
export class ColorCorrectionPostProcess extends PostProcess {
    /**
     * Gets a string identifying the name of the class
     * @returns "ColorCorrectionPostProcess" string
     */
    getClassName() {
        return "ColorCorrectionPostProcess";
    }
    constructor(name, colorTableUrl, options, camera, samplingMode, engine, reusable) {
        super(name, "colorCorrection", null, ["colorTable"], options, camera, samplingMode, engine, reusable);
        const scene = (camera === null || camera === void 0 ? void 0 : camera.getScene()) || null;
        this._colorTableTexture = new Texture(colorTableUrl, scene, true, false, Texture.TRILINEAR_SAMPLINGMODE);
        this._colorTableTexture.anisotropicFilteringLevel = 1;
        this._colorTableTexture.wrapU = Texture.CLAMP_ADDRESSMODE;
        this._colorTableTexture.wrapV = Texture.CLAMP_ADDRESSMODE;
        this.colorTableUrl = colorTableUrl;
        this.onApply = (effect) => {
            effect.setTexture("colorTable", this._colorTableTexture);
        };
    }
    /**
     * @internal
     */
    static _Parse(parsedPostProcess, targetCamera, scene, rootUrl) {
        return SerializationHelper.Parse(() => {
            return new ColorCorrectionPostProcess(parsedPostProcess.name, parsedPostProcess.colorTableUrl, parsedPostProcess.options, targetCamera, parsedPostProcess.renderTargetSamplingMode, scene.getEngine(), parsedPostProcess.reusable);
        }, parsedPostProcess, scene, rootUrl);
    }
}
__decorate([
    serialize()
], ColorCorrectionPostProcess.prototype, "colorTableUrl", void 0);
RegisterClass("BABYLON.ColorCorrectionPostProcess", ColorCorrectionPostProcess);
//# sourceMappingURL=colorCorrectionPostProcess.js.map