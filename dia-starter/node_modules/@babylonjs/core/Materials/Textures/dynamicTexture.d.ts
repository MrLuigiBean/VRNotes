import type { Nullable } from "../../types";
import type { Scene } from "../../scene";
import { Texture } from "../../Materials/Textures/texture";
import "../../Engines/Extensions/engine.dynamicTexture";
import type { ICanvasRenderingContext } from "../../Engines/ICanvas";
/**
 * A class extending Texture allowing drawing on a texture
 * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/using/dynamicTexture
 */
export declare class DynamicTexture extends Texture {
    private _generateMipMaps;
    private _canvas;
    private _ownCanvas;
    private _context;
    /**
     * Creates a DynamicTexture
     * @param name defines the name of the texture
     * @param options provides 3 alternatives for width and height of texture, a canvas, object with width and height properties, number for both width and height
     * @param scene defines the scene where you want the texture
     * @param generateMipMaps defines the use of MinMaps or not (default is false)
     * @param samplingMode defines the sampling mode to use (default is Texture.TRILINEAR_SAMPLINGMODE)
     * @param format defines the texture format to use (default is Engine.TEXTUREFORMAT_RGBA)
     * @param invertY defines if the texture needs to be inverted on the y axis during loading
     */
    constructor(name: string, options: any, scene?: Nullable<Scene>, generateMipMaps?: boolean, samplingMode?: number, format?: number, invertY?: boolean);
    /**
     * Get the current class name of the texture useful for serialization or dynamic coding.
     * @returns "DynamicTexture"
     */
    getClassName(): string;
    /**
     * Gets the current state of canRescale
     */
    get canRescale(): boolean;
    private _recreate;
    /**
     * Scales the texture
     * @param ratio the scale factor to apply to both width and height
     */
    scale(ratio: number): void;
    /**
     * Resizes the texture
     * @param width the new width
     * @param height the new height
     */
    scaleTo(width: number, height: number): void;
    /**
     * Gets the context of the canvas used by the texture
     * @returns the canvas context of the dynamic texture
     */
    getContext(): ICanvasRenderingContext;
    /**
     * Clears the texture
     * @param clearColor Defines the clear color to use
     */
    clear(clearColor?: string): void;
    /**
     * Updates the texture
     * @param invertY defines the direction for the Y axis (default is true - y increases downwards)
     * @param premulAlpha defines if alpha is stored as premultiplied (default is false)
     * @param allowGPUOptimization true to allow some specific GPU optimizations (subject to engine feature "allowGPUOptimizationsForGUI" being true)
     */
    update(invertY?: boolean, premulAlpha?: boolean, allowGPUOptimization?: boolean): void;
    /**
     * Draws text onto the texture
     * @param text defines the text to be drawn
     * @param x defines the placement of the text from the left
     * @param y defines the placement of the text from the top when invertY is true and from the bottom when false
     * @param font defines the font to be used with font-style, font-size, font-name
     * @param color defines the color used for the text
     * @param fillColor defines the color for the canvas, use null to not overwrite canvas (this bleands with the background to replace, use the clear function)
     * @param invertY defines the direction for the Y axis (default is true - y increases downwards)
     * @param update defines whether texture is immediately update (default is true)
     */
    drawText(text: string, x: number | null | undefined, y: number | null | undefined, font: string, color: string | null, fillColor: string | null, invertY?: boolean, update?: boolean): void;
    /**
     * Disposes the dynamic texture.
     */
    dispose(): void;
    /**
     * Clones the texture
     * @returns the clone of the texture.
     */
    clone(): DynamicTexture;
    /**
     * Serializes the dynamic texture.  The scene should be ready before the dynamic texture is serialized
     * @returns a serialized dynamic texture object
     */
    serialize(): any;
    private static _IsCanvasElement;
    /** @internal */
    _rebuild(): void;
}
