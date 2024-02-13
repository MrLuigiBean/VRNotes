import type { ICanvasGradient, ICanvasRenderingContext } from "@babylonjs/core/Engines/ICanvas.js";
import { BaseGradient } from "./BaseGradient";
/**
 * Gradient along a line that connects two coordinates.
 * These coordinates are relative to the canvas' space, not to any control's space.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createLinearGradient
 */
export declare class LinearGradient extends BaseGradient {
    private _x0;
    private _y0;
    private _x1;
    private _y1;
    /**
     * Creates a new linear gradient
     * @param x0
     * @param y0
     * @param x1
     * @param y1
     */
    constructor(x0?: number, y0?: number, x1?: number, y1?: number);
    protected _createCanvasGradient(context: ICanvasRenderingContext): ICanvasGradient;
    /** X axis coordinate of the starting point in the line */
    get x0(): number;
    /** X axis coordinate of the ending point in the line */
    get x1(): number;
    /** Y axis coordinate of the starting point in the line */
    get y0(): number;
    /** Y axis coordinate of the ending point in the line */
    get y1(): number;
    /**
     * Class name of the gradient
     * @returns the class name of the gradient
     */
    getClassName(): string;
    /**
     * Serializes this gradient
     * @param serializationObject the object to serialize to
     */
    serialize(serializationObject: any): void;
    /**
     * Parses a gradient from a serialization object
     * @param serializationObject the object to parse from
     */
    parse(serializationObject: any): void;
}
