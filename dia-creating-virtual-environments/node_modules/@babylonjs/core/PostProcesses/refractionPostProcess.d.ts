import type { Color3 } from "../Maths/math.color";
import type { Camera } from "../Cameras/camera";
import { Texture } from "../Materials/Textures/texture";
import type { PostProcessOptions } from "./postProcess";
import { PostProcess } from "./postProcess";
import type { Engine } from "../Engines/engine";
import "../Shaders/refraction.fragment";
import type { Nullable } from "../types";
import type { Scene } from "../scene";
/**
 * Post process which applies a refraction texture
 * @see https://doc.babylonjs.com/features/featuresDeepDive/postProcesses/usePostProcesses#refraction
 */
export declare class RefractionPostProcess extends PostProcess {
    private _refTexture;
    private _ownRefractionTexture;
    /** the base color of the refraction (used to taint the rendering) */
    color: Color3;
    /** simulated refraction depth */
    depth: number;
    /** the coefficient of the base color (0 to remove base color tainting) */
    colorLevel: number;
    /** Gets the url used to load the refraction texture */
    refractionTextureUrl: string;
    /**
     * Gets or sets the refraction texture
     * Please note that you are responsible for disposing the texture if you set it manually
     */
    get refractionTexture(): Texture;
    set refractionTexture(value: Texture);
    /**
     * Gets a string identifying the name of the class
     * @returns "RefractionPostProcess" string
     */
    getClassName(): string;
    /**
     * Initializes the RefractionPostProcess
     * @see https://doc.babylonjs.com/features/featuresDeepDive/postProcesses/usePostProcesses#refraction
     * @param name The name of the effect.
     * @param refractionTextureUrl Url of the refraction texture to use
     * @param color the base color of the refraction (used to taint the rendering)
     * @param depth simulated refraction depth
     * @param colorLevel the coefficient of the base color (0 to remove base color tainting)
     * @param options The required width/height ratio to downsize to before computing the render pass.
     * @param camera The camera to apply the render pass to.
     * @param samplingMode The sampling mode to be used when computing the pass. (default: 0)
     * @param engine The engine which the post process will be applied. (default: current engine)
     * @param reusable If the post process can be reused on the same frame. (default: false)
     */
    constructor(name: string, refractionTextureUrl: string, color: Color3, depth: number, colorLevel: number, options: number | PostProcessOptions, camera: Nullable<Camera>, samplingMode?: number, engine?: Engine, reusable?: boolean);
    /**
     * Disposes of the post process
     * @param camera Camera to dispose post process on
     */
    dispose(camera: Camera): void;
    /**
     * @internal
     */
    static _Parse(parsedPostProcess: any, targetCamera: Camera, scene: Scene, rootUrl: string): RefractionPostProcess;
}
