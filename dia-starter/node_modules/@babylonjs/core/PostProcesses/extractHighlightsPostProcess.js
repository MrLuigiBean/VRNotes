import { __decorate } from "../tslib.es6.js";
import { PostProcess } from "./postProcess.js";
import { ToGammaSpace } from "../Maths/math.constants.js";

import "../Shaders/extractHighlights.fragment.js";
import { serialize } from "../Misc/decorators.js";
import { RegisterClass } from "../Misc/typeStore.js";
/**
 * The extract highlights post process sets all pixels to black except pixels above the specified luminance threshold. Used as the first step for a bloom effect.
 */
export class ExtractHighlightsPostProcess extends PostProcess {
    /**
     * Gets a string identifying the name of the class
     * @returns "ExtractHighlightsPostProcess" string
     */
    getClassName() {
        return "ExtractHighlightsPostProcess";
    }
    constructor(name, options, camera, samplingMode, engine, reusable, textureType = 0, blockCompilation = false) {
        super(name, "extractHighlights", ["threshold", "exposure"], null, options, camera, samplingMode, engine, reusable, null, textureType, undefined, null, blockCompilation);
        /**
         * The luminance threshold, pixels below this value will be set to black.
         */
        this.threshold = 0.9;
        /** @internal */
        this._exposure = 1;
        /**
         * Post process which has the input texture to be used when performing highlight extraction
         * @internal
         */
        this._inputPostProcess = null;
        this.onApplyObservable.add((effect) => {
            this.externalTextureSamplerBinding = !!this._inputPostProcess;
            if (this._inputPostProcess) {
                effect.setTextureFromPostProcess("textureSampler", this._inputPostProcess);
            }
            effect.setFloat("threshold", Math.pow(this.threshold, ToGammaSpace));
            effect.setFloat("exposure", this._exposure);
        });
    }
}
__decorate([
    serialize()
], ExtractHighlightsPostProcess.prototype, "threshold", void 0);
RegisterClass("BABYLON.ExtractHighlightsPostProcess", ExtractHighlightsPostProcess);
//# sourceMappingURL=extractHighlightsPostProcess.js.map