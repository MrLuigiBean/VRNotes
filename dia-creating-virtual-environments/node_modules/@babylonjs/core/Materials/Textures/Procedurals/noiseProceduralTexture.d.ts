import type { Nullable } from "../../../types";
import type { Scene } from "../../../scene";
import type { Texture } from "../../../Materials/Textures/texture";
import { ProceduralTexture } from "./proceduralTexture";
import "../../../Shaders/noise.fragment";
/**
 * Class used to generate noise procedural textures
 */
export declare class NoiseProceduralTexture extends ProceduralTexture {
    /** Gets or sets the start time (default is 0) */
    time: number;
    /** Gets or sets a value between 0 and 1 indicating the overall brightness of the texture (default is 0.2) */
    brightness: number;
    /** Defines the number of octaves to process */
    octaves: number;
    /** Defines the level of persistence (0.8 by default) */
    persistence: number;
    /** Gets or sets animation speed factor (default is 1) */
    animationSpeedFactor: number;
    /**
     * Creates a new NoiseProceduralTexture
     * @param name defines the name fo the texture
     * @param size defines the size of the texture (default is 256)
     * @param scene defines the hosting scene
     * @param fallbackTexture defines the texture to use if the NoiseProceduralTexture can't be created
     * @param generateMipMaps defines if mipmaps must be generated (true by default)
     */
    constructor(name: string, size?: number, scene?: Nullable<Scene>, fallbackTexture?: Texture, generateMipMaps?: boolean);
    private _updateShaderUniforms;
    protected _getDefines(): string;
    /**
     * Generate the current state of the procedural texture
     * @param useCameraPostProcess Define if camera post process should be applied to the texture
     */
    render(useCameraPostProcess?: boolean): void;
    /**
     * Serializes this noise procedural texture
     * @returns a serialized noise procedural texture object
     */
    serialize(): any;
    /**
     * Clone the texture.
     * @returns the cloned texture
     */
    clone(): NoiseProceduralTexture;
    /**
     * Creates a NoiseProceduralTexture from parsed noise procedural texture data
     * @param parsedTexture defines parsed texture data
     * @param scene defines the current scene
     * @returns a parsed NoiseProceduralTexture
     */
    static Parse(parsedTexture: any, scene: Scene): NoiseProceduralTexture;
}
