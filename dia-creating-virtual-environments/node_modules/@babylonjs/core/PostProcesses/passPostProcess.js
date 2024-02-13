
import { PostProcess } from "./postProcess.js";
import { Engine } from "../Engines/engine.js";
import "../Shaders/pass.fragment.js";
import "../Shaders/passCube.fragment.js";
import { RegisterClass } from "../Misc/typeStore.js";
import { SerializationHelper } from "../Misc/decorators.js";
/**
 * PassPostProcess which produces an output the same as it's input
 */
export class PassPostProcess extends PostProcess {
    /**
     * Gets a string identifying the name of the class
     * @returns "PassPostProcess" string
     */
    getClassName() {
        return "PassPostProcess";
    }
    /**
     * Creates the PassPostProcess
     * @param name The name of the effect.
     * @param options The required width/height ratio to downsize to before computing the render pass.
     * @param camera The camera to apply the render pass to.
     * @param samplingMode The sampling mode to be used when computing the pass. (default: 0)
     * @param engine The engine which the post process will be applied. (default: current engine)
     * @param reusable If the post process can be reused on the same frame. (default: false)
     * @param textureType The type of texture to be used when performing the post processing.
     * @param blockCompilation If compilation of the shader should not be done in the constructor. The updateEffect method can be used to compile the shader at a later time. (default: false)
     */
    constructor(name, options, camera = null, samplingMode, engine, reusable, textureType = 0, blockCompilation = false) {
        super(name, "pass", null, null, options, camera, samplingMode, engine, reusable, undefined, textureType, undefined, null, blockCompilation);
    }
    /**
     * @internal
     */
    static _Parse(parsedPostProcess, targetCamera, scene, rootUrl) {
        return SerializationHelper.Parse(() => {
            return new PassPostProcess(parsedPostProcess.name, parsedPostProcess.options, targetCamera, parsedPostProcess.renderTargetSamplingMode, parsedPostProcess._engine, parsedPostProcess.reusable);
        }, parsedPostProcess, scene, rootUrl);
    }
}
RegisterClass("BABYLON.PassPostProcess", PassPostProcess);
/**
 * PassCubePostProcess which produces an output the same as it's input (which must be a cube texture)
 */
export class PassCubePostProcess extends PostProcess {
    /**
     * Gets or sets the cube face to display.
     *  * 0 is +X
     *  * 1 is -X
     *  * 2 is +Y
     *  * 3 is -Y
     *  * 4 is +Z
     *  * 5 is -Z
     */
    get face() {
        return this._face;
    }
    set face(value) {
        if (value < 0 || value > 5) {
            return;
        }
        this._face = value;
        switch (this._face) {
            case 0:
                this.updateEffect("#define POSITIVEX");
                break;
            case 1:
                this.updateEffect("#define NEGATIVEX");
                break;
            case 2:
                this.updateEffect("#define POSITIVEY");
                break;
            case 3:
                this.updateEffect("#define NEGATIVEY");
                break;
            case 4:
                this.updateEffect("#define POSITIVEZ");
                break;
            case 5:
                this.updateEffect("#define NEGATIVEZ");
                break;
        }
    }
    /**
     * Gets a string identifying the name of the class
     * @returns "PassCubePostProcess" string
     */
    getClassName() {
        return "PassCubePostProcess";
    }
    /**
     * Creates the PassCubePostProcess
     * @param name The name of the effect.
     * @param options The required width/height ratio to downsize to before computing the render pass.
     * @param camera The camera to apply the render pass to.
     * @param samplingMode The sampling mode to be used when computing the pass. (default: 0)
     * @param engine The engine which the post process will be applied. (default: current engine)
     * @param reusable If the post process can be reused on the same frame. (default: false)
     * @param textureType The type of texture to be used when performing the post processing.
     * @param blockCompilation If compilation of the shader should not be done in the constructor. The updateEffect method can be used to compile the shader at a later time. (default: false)
     */
    constructor(name, options, camera = null, samplingMode, engine, reusable, textureType = 0, blockCompilation = false) {
        super(name, "passCube", null, null, options, camera, samplingMode, engine, reusable, "#define POSITIVEX", textureType, undefined, null, blockCompilation);
        this._face = 0;
    }
    /**
     * @internal
     */
    static _Parse(parsedPostProcess, targetCamera, scene, rootUrl) {
        return SerializationHelper.Parse(() => {
            return new PassCubePostProcess(parsedPostProcess.name, parsedPostProcess.options, targetCamera, parsedPostProcess.renderTargetSamplingMode, parsedPostProcess._engine, parsedPostProcess.reusable);
        }, parsedPostProcess, scene, rootUrl);
    }
}
Engine._RescalePostProcessFactory = (engine) => {
    return new PassPostProcess("rescale", 1, null, 2, engine, false, 0);
};
//# sourceMappingURL=passPostProcess.js.map