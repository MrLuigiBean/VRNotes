import { PostProcess } from "./postProcess.js";
import "../Shaders/anaglyph.fragment.js";
import { RegisterClass } from "../Misc/typeStore.js";
/**
 * Postprocess used to generate anaglyphic rendering
 */
export class AnaglyphPostProcess extends PostProcess {
    /**
     * Gets a string identifying the name of the class
     * @returns "AnaglyphPostProcess" string
     */
    getClassName() {
        return "AnaglyphPostProcess";
    }
    /**
     * Creates a new AnaglyphPostProcess
     * @param name defines postprocess name
     * @param options defines creation options or target ratio scale
     * @param rigCameras defines cameras using this postprocess
     * @param samplingMode defines required sampling mode (BABYLON.Texture.NEAREST_SAMPLINGMODE by default)
     * @param engine defines hosting engine
     * @param reusable defines if the postprocess will be reused multiple times per frame
     */
    constructor(name, options, rigCameras, samplingMode, engine, reusable) {
        super(name, "anaglyph", null, ["leftSampler"], options, rigCameras[1], samplingMode, engine, reusable);
        this._passedProcess = rigCameras[0]._rigPostProcess;
        this.onApplyObservable.add((effect) => {
            effect.setTextureFromPostProcess("leftSampler", this._passedProcess);
        });
    }
}
RegisterClass("BABYLON.AnaglyphPostProcess", AnaglyphPostProcess);
//# sourceMappingURL=anaglyphPostProcess.js.map