import type { ICanvasGradient, ICanvasRenderingContext } from "@babylonjs/core/Engines/ICanvas.js";
/**
 * Type that represents a single stop on the gradient.
 */
export type GradientColorStop = {
    /**
     * Offset from the start where the color will be applied.
     */
    offset: number;
    /**
     * Color to be applied.
     */
    color: string;
};
/**
 * Class that serves as a base for all the gradients created from context.
 */
export declare abstract class BaseGradient {
    private _colorStops;
    private _canvasGradient;
    private _context;
    private _gradientDirty;
    /**
     * Overwritten by child classes to create the canvas gradient.
     * @param context
     */
    protected abstract _createCanvasGradient(context: ICanvasRenderingContext): ICanvasGradient;
    private _addColorStopsToCanvasGradient;
    /**
     * If there are any changes or the context changed, regenerate the canvas gradient object. Else,
     * reuse the existing gradient.
     **/
    getCanvasGradient(context: ICanvasRenderingContext): CanvasGradient;
    /**
     * Adds a new color stop to the gradient.
     * @param offset the offset of the stop on the gradient. Should be between 0 and 1
     * @param color the color of the stop
     */
    addColorStop(offset: number, color: string): void;
    /**
     * Removes an existing color stop with the specified offset from the gradient
     * @param offset the offset of the stop to be removed
     */
    removeColorStop(offset: number): void;
    /**
     * Removes all color stops from the gradient
     */
    clearColorStops(): void;
    /** Color stops of the gradient */
    get colorStops(): GradientColorStop[];
    /** Type of the gradient */
    getClassName(): string;
    /** Serialize into a json object */
    serialize(serializationObject: any): void;
    /** Parse from json object */
    parse(serializationObject: any): void;
}
