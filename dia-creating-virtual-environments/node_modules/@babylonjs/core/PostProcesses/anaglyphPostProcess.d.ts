import type { Engine } from "../Engines/engine";
import type { PostProcessOptions } from "./postProcess";
import { PostProcess } from "./postProcess";
import type { Camera } from "../Cameras/camera";
import "../Shaders/anaglyph.fragment";
/**
 * Postprocess used to generate anaglyphic rendering
 */
export declare class AnaglyphPostProcess extends PostProcess {
    private _passedProcess;
    /**
     * Gets a string identifying the name of the class
     * @returns "AnaglyphPostProcess" string
     */
    getClassName(): string;
    /**
     * Creates a new AnaglyphPostProcess
     * @param name defines postprocess name
     * @param options defines creation options or target ratio scale
     * @param rigCameras defines cameras using this postprocess
     * @param samplingMode defines required sampling mode (BABYLON.Texture.NEAREST_SAMPLINGMODE by default)
     * @param engine defines hosting engine
     * @param reusable defines if the postprocess will be reused multiple times per frame
     */
    constructor(name: string, options: number | PostProcessOptions, rigCameras: Camera[], samplingMode?: number, engine?: Engine, reusable?: boolean);
}
