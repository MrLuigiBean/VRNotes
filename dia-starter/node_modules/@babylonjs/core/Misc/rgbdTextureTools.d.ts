import "../Shaders/rgbdDecode.fragment";
import "../Engines/Extensions/engine.renderTarget";
import type { Texture } from "../Materials/Textures/texture";
import type { InternalTexture } from "../Materials/Textures/internalTexture";
import type { Scene } from "../scene";
/**
 * Class used to host RGBD texture specific utilities
 */
export declare class RGBDTextureTools {
    /**
     * Expand the RGBD Texture from RGBD to Half Float if possible.
     * @param texture the texture to expand.
     */
    static ExpandRGBDTexture(texture: Texture): void;
    /**
     * Encode the texture to RGBD if possible.
     * @param internalTexture the texture to encode
     * @param scene the scene hosting the texture
     * @param outputTextureType type of the texture in which the encoding is performed
     * @returns a promise with the internalTexture having its texture replaced by the result of the processing
     */
    static EncodeTextureToRGBD(internalTexture: InternalTexture, scene: Scene, outputTextureType?: number): Promise<InternalTexture>;
}
