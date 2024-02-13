import type { Camera } from "../Cameras/camera";
import { PostProcess } from "./postProcess";
import "../Shaders/vrMultiviewToSingleview.fragment";
import "../Engines/Extensions/engine.multiview";
import type { Nullable } from "../types";
/**
 * VRMultiviewToSingleview used to convert multiview texture arrays to standard textures for scenarios such as webVR
 * This will not be used for webXR as it supports displaying texture arrays directly
 */
export declare class VRMultiviewToSingleviewPostProcess extends PostProcess {
    /**
     * Gets a string identifying the name of the class
     * @returns "VRMultiviewToSingleviewPostProcess" string
     */
    getClassName(): string;
    /**
     * Initializes a VRMultiviewToSingleview
     * @param name name of the post process
     * @param camera camera to be applied to
     * @param scaleFactor scaling factor to the size of the output texture
     */
    constructor(name: string, camera: Nullable<Camera>, scaleFactor: number);
}
