import { __decorate } from "../tslib.es6.js";
import { PostProcess } from "./postProcess.js";
import { Logger } from "../Misc/logger.js";

import "../Shaders/circleOfConfusion.fragment.js";
import { RegisterClass } from "../Misc/typeStore.js";
import { serialize } from "../Misc/decorators.js";
/**
 * The CircleOfConfusionPostProcess computes the circle of confusion value for each pixel given required lens parameters. See https://en.wikipedia.org/wiki/Circle_of_confusion
 */
export class CircleOfConfusionPostProcess extends PostProcess {
    /**
     * Gets a string identifying the name of the class
     * @returns "CircleOfConfusionPostProcess" string
     */
    getClassName() {
        return "CircleOfConfusionPostProcess";
    }
    /**
     * Creates a new instance CircleOfConfusionPostProcess
     * @param name The name of the effect.
     * @param depthTexture The depth texture of the scene to compute the circle of confusion. This must be set in order for this to function but may be set after initialization if needed.
     * @param options The required width/height ratio to downsize to before computing the render pass.
     * @param camera The camera to apply the render pass to.
     * @param samplingMode The sampling mode to be used when computing the pass. (default: 0)
     * @param engine The engine which the post process will be applied. (default: current engine)
     * @param reusable If the post process can be reused on the same frame. (default: false)
     * @param textureType Type of textures used when performing the post process. (default: 0)
     * @param blockCompilation If compilation of the shader should not be done in the constructor. The updateEffect method can be used to compile the shader at a later time. (default: false)
     */
    constructor(name, depthTexture, options, camera, samplingMode, engine, reusable, textureType = 0, blockCompilation = false) {
        super(name, "circleOfConfusion", ["cameraMinMaxZ", "focusDistance", "cocPrecalculation"], ["depthSampler"], options, camera, samplingMode, engine, reusable, null, textureType, undefined, null, blockCompilation);
        /**
         * Max lens size in scene units/1000 (eg. millimeter). Standard cameras are 50mm. (default: 50) The diameter of the resulting aperture can be computed by lensSize/fStop.
         */
        this.lensSize = 50;
        /**
         * F-Stop of the effect's camera. The diameter of the resulting aperture can be computed by lensSize/fStop. (default: 1.4)
         */
        this.fStop = 1.4;
        /**
         * Distance away from the camera to focus on in scene units/1000 (eg. millimeter). (default: 2000)
         */
        this.focusDistance = 2000;
        /**
         * Focal length of the effect's camera in scene units/1000 (eg. millimeter). (default: 50)
         */
        this.focalLength = 50;
        this._depthTexture = null;
        this._depthTexture = depthTexture;
        this.onApplyObservable.add((effect) => {
            if (!this._depthTexture) {
                Logger.Warn("No depth texture set on CircleOfConfusionPostProcess");
                return;
            }
            effect.setTexture("depthSampler", this._depthTexture);
            // Circle of confusion calculation, See https://developer.nvidia.com/gpugems/GPUGems/gpugems_ch23.html
            const aperture = this.lensSize / this.fStop;
            const cocPrecalculation = (aperture * this.focalLength) / (this.focusDistance - this.focalLength); // * ((this.focusDistance - pixelDistance)/pixelDistance) [This part is done in shader]
            effect.setFloat("focusDistance", this.focusDistance);
            effect.setFloat("cocPrecalculation", cocPrecalculation);
            const activeCamera = this._depthTexture.activeCamera;
            effect.setFloat2("cameraMinMaxZ", activeCamera.minZ, activeCamera.maxZ - activeCamera.minZ);
        });
    }
    /**
     * Depth texture to be used to compute the circle of confusion. This must be set here or in the constructor in order for the post process to function.
     */
    set depthTexture(value) {
        this._depthTexture = value;
    }
}
__decorate([
    serialize()
], CircleOfConfusionPostProcess.prototype, "lensSize", void 0);
__decorate([
    serialize()
], CircleOfConfusionPostProcess.prototype, "fStop", void 0);
__decorate([
    serialize()
], CircleOfConfusionPostProcess.prototype, "focusDistance", void 0);
__decorate([
    serialize()
], CircleOfConfusionPostProcess.prototype, "focalLength", void 0);
RegisterClass("BABYLON.CircleOfConfusionPostProcess", CircleOfConfusionPostProcess);
//# sourceMappingURL=circleOfConfusionPostProcess.js.map