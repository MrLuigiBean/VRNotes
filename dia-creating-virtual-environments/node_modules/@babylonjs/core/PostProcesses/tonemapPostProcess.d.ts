import type { Camera } from "../Cameras/camera";
import { PostProcess } from "./postProcess";
import "../Shaders/tonemap.fragment";
import type { Nullable } from "../types";
import type { Engine } from "../Engines/engine";
/** Defines operator used for tonemapping */
export declare enum TonemappingOperator {
    /** Hable */
    Hable = 0,
    /** Reinhard */
    Reinhard = 1,
    /** HejiDawson */
    HejiDawson = 2,
    /** Photographic */
    Photographic = 3
}
/**
 * Defines a post process to apply tone mapping
 */
export declare class TonemapPostProcess extends PostProcess {
    private _operator;
    /** Defines the required exposure adjustment */
    exposureAdjustment: number;
    /**
     * Gets a string identifying the name of the class
     * @returns "TonemapPostProcess" string
     */
    getClassName(): string;
    /**
     * Creates a new TonemapPostProcess
     * @param name defines the name of the postprocess
     * @param _operator defines the operator to use
     * @param exposureAdjustment defines the required exposure adjustment
     * @param camera defines the camera to use (can be null)
     * @param samplingMode defines the required sampling mode (BABYLON.Texture.BILINEAR_SAMPLINGMODE by default)
     * @param engine defines the hosting engine (can be ignore if camera is set)
     * @param textureFormat defines the texture format to use (BABYLON.Engine.TEXTURETYPE_UNSIGNED_INT by default)
     * @param reusable If the post process can be reused on the same frame. (default: false)
     */
    constructor(name: string, _operator: TonemappingOperator, 
    /** Defines the required exposure adjustment */
    exposureAdjustment: number, camera: Nullable<Camera>, samplingMode?: number, engine?: Engine, textureFormat?: number, reusable?: boolean);
}
