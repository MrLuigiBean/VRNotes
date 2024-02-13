import { __decorate } from "../tslib.es6.js";
import { Texture } from "../Materials/Textures/texture.js";
import { BlurPostProcess } from "./blurPostProcess.js";

import { RegisterClass } from "../Misc/typeStore.js";
import { serialize } from "../Misc/decorators.js";
/**
 * The DepthOfFieldBlurPostProcess applied a blur in a give direction.
 * This blur differs from the standard BlurPostProcess as it attempts to avoid blurring pixels
 * based on samples that have a large difference in distance than the center pixel.
 * See section 2.6.2 http://fileadmin.cs.lth.se/cs/education/edan35/lectures/12dof.pdf
 */
export class DepthOfFieldBlurPostProcess extends BlurPostProcess {
    /**
     * Gets a string identifying the name of the class
     * @returns "DepthOfFieldBlurPostProcess" string
     */
    getClassName() {
        return "DepthOfFieldBlurPostProcess";
    }
    /**
     * Creates a new instance DepthOfFieldBlurPostProcess
     * @param name The name of the effect.
     * @param scene The scene the effect belongs to.
     * @param direction The direction the blur should be applied.
     * @param kernel The size of the kernel used to blur.
     * @param options The required width/height ratio to downsize to before computing the render pass.
     * @param camera The camera to apply the render pass to.
     * @param circleOfConfusion The circle of confusion + depth map to be used to avoid blurring across edges
     * @param imageToBlur The image to apply the blur to (default: Current rendered frame)
     * @param samplingMode The sampling mode to be used when computing the pass. (default: 0)
     * @param engine The engine which the post process will be applied. (default: current engine)
     * @param reusable If the post process can be reused on the same frame. (default: false)
     * @param textureType Type of textures used when performing the post process. (default: 0)
     * @param blockCompilation If compilation of the shader should not be done in the constructor. The updateEffect method can be used to compile the shader at a later time. (default: false)
     * @param textureFormat Format of textures used when performing the post process. (default: TEXTUREFORMAT_RGBA)
     */
    constructor(name, scene, direction, kernel, options, camera, circleOfConfusion, imageToBlur = null, samplingMode = Texture.BILINEAR_SAMPLINGMODE, engine, reusable, textureType = 0, blockCompilation = false, textureFormat = 5) {
        super(name, direction, kernel, options, camera, 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (samplingMode = 2), engine, reusable, textureType, `#define DOF 1\n`, blockCompilation, textureFormat);
        this.direction = direction;
        this.externalTextureSamplerBinding = !!imageToBlur;
        this.onApplyObservable.add((effect) => {
            if (imageToBlur != null) {
                effect.setTextureFromPostProcess("textureSampler", imageToBlur);
            }
            effect.setTextureFromPostProcessOutput("circleOfConfusionSampler", circleOfConfusion);
        });
    }
}
__decorate([
    serialize()
], DepthOfFieldBlurPostProcess.prototype, "direction", void 0);
RegisterClass("BABYLON.DepthOfFieldBlurPostProcess", DepthOfFieldBlurPostProcess);
//# sourceMappingURL=depthOfFieldBlurPostProcess.js.map