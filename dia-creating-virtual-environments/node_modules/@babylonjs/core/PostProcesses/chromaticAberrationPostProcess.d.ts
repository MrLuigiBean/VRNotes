import { Vector2 } from "../Maths/math.vector";
import type { Nullable } from "../types";
import type { PostProcessOptions } from "./postProcess";
import { PostProcess } from "./postProcess";
import type { Camera } from "../Cameras/camera";
import type { Engine } from "../Engines/engine";
import "../Shaders/chromaticAberration.fragment";
import type { Scene } from "../scene";
/**
 * The ChromaticAberrationPostProcess separates the rgb channels in an image to produce chromatic distortion around the edges of the screen
 */
export declare class ChromaticAberrationPostProcess extends PostProcess {
    /**
     * The amount of separation of rgb channels (default: 30)
     */
    aberrationAmount: number;
    /**
     * The amount the effect will increase for pixels closer to the edge of the screen. (default: 0)
     */
    radialIntensity: number;
    /**
     * The normalized direction in which the rgb channels should be separated. If set to 0,0 radial direction will be used. (default: Vector2(0.707,0.707))
     */
    direction: Vector2;
    /**
     * The center position where the radialIntensity should be around. [0.5,0.5 is center of screen, 1,1 is top right corner] (default: Vector2(0.5 ,0.5))
     */
    centerPosition: Vector2;
    /** The width of the screen to apply the effect on */
    screenWidth: number;
    /** The height of the screen to apply the effect on */
    screenHeight: number;
    /**
     * Gets a string identifying the name of the class
     * @returns "ChromaticAberrationPostProcess" string
     */
    getClassName(): string;
    /**
     * Creates a new instance ChromaticAberrationPostProcess
     * @param name The name of the effect.
     * @param screenWidth The width of the screen to apply the effect on.
     * @param screenHeight The height of the screen to apply the effect on.
     * @param options The required width/height ratio to downsize to before computing the render pass.
     * @param camera The camera to apply the render pass to.
     * @param samplingMode The sampling mode to be used when computing the pass. (default: 0)
     * @param engine The engine which the post process will be applied. (default: current engine)
     * @param reusable If the post process can be reused on the same frame. (default: false)
     * @param textureType Type of textures used when performing the post process. (default: 0)
     * @param blockCompilation If compilation of the shader should not be done in the constructor. The updateEffect method can be used to compile the shader at a later time. (default: false)
     */
    constructor(name: string, screenWidth: number, screenHeight: number, options: number | PostProcessOptions, camera: Nullable<Camera>, samplingMode?: number, engine?: Engine, reusable?: boolean, textureType?: number, blockCompilation?: boolean);
    /**
     * @internal
     */
    static _Parse(parsedPostProcess: any, targetCamera: Camera, scene: Scene, rootUrl: string): Nullable<ChromaticAberrationPostProcess>;
}
