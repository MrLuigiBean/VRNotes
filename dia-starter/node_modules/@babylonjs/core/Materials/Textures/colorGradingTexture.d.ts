import type { Nullable } from "../../types";
import type { Scene } from "../../scene";
import { Matrix } from "../../Maths/math.vector";
import { BaseTexture } from "../../Materials/Textures/baseTexture";
import type { ThinEngine } from "../../Engines/thinEngine";
import "../../Engines/Extensions/engine.rawTexture";
/**
 * This represents a color grading texture. This acts as a lookup table LUT, useful during post process
 * It can help converting any input color in a desired output one. This can then be used to create effects
 * from sepia, black and white to sixties or futuristic rendering...
 *
 * The only supported format is currently 3dl.
 * More information on LUT: https://en.wikipedia.org/wiki/3D_lookup_table
 */
export declare class ColorGradingTexture extends BaseTexture {
    /**
     * The texture URL.
     */
    url: string;
    /**
     * Empty line regex stored for GC.
     */
    private static _NoneEmptyLineRegex;
    private _textureMatrix;
    private _onLoad;
    /**
     * Instantiates a ColorGradingTexture from the following parameters.
     *
     * @param url The location of the color grading data (currently only supporting 3dl)
     * @param sceneOrEngine The scene or engine the texture will be used in
     * @param onLoad defines a callback triggered when the texture has been loaded
     */
    constructor(url: string, sceneOrEngine: Scene | ThinEngine, onLoad?: Nullable<() => void>);
    /**
     * Fires the onload event from the constructor if requested.
     */
    private _triggerOnLoad;
    /**
     * Returns the texture matrix used in most of the material.
     * This is not used in color grading but keep for troubleshooting purpose (easily swap diffuse by colorgrading to look in).
     */
    getTextureMatrix(): Matrix;
    /**
     * Occurs when the file being loaded is a .3dl LUT file.
     */
    private _load3dlTexture;
    /**
     * Starts the loading process of the texture.
     */
    private _loadTexture;
    /**
     * Clones the color grading texture.
     */
    clone(): ColorGradingTexture;
    /**
     * Called during delayed load for textures.
     */
    delayLoad(): void;
    /**
     * Parses a color grading texture serialized by Babylon.
     * @param parsedTexture The texture information being parsedTexture
     * @param scene The scene to load the texture in
     * @returns A color grading texture
     */
    static Parse(parsedTexture: any, scene: Scene): Nullable<ColorGradingTexture>;
    /**
     * Serializes the LUT texture to json format.
     */
    serialize(): any;
}
