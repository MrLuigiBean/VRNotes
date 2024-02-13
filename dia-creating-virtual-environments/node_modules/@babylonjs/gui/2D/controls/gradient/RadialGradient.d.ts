import type { ICanvasGradient, ICanvasRenderingContext } from "@babylonjs/core/Engines/ICanvas.js";
import { BaseGradient } from "./BaseGradient";
/**
 * Gradient formed from two circles with their own centers and radius.
 * The coordinates of the circles centers are relative to the canvas' space, not to any control's space.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createRadialGradient
 */
export declare class RadialGradient extends BaseGradient {
    private _x0;
    private _y0;
    private _r0;
    private _x1;
    private _y1;
    private _r1;
    /**
     * Creates a new radial gradient
     * @param x0 x coordinate of the first circle's center
     * @param y0 y coordinate of the first circle's center
     * @param r0 radius of the first circle
     * @param x1 x coordinate of the second circle's center
     * @param y1 y coordinate of the second circle's center
     * @param r1 radius of the second circle
     */
    constructor(x0?: number, y0?: number, r0?: number, x1?: number, y1?: number, r1?: number);
    protected _createCanvasGradient(context: ICanvasRenderingContext): ICanvasGradient;
    /** x coordinate of the first circle's center */
    get x0(): number;
    /** x coordinate of the second circle's center */
    get x1(): number;
    /** y coordinate of the first circle's center */
    get y0(): number;
    /** y coordinate of the second circle's center */
    get y1(): number;
    /** radius of the first circle */
    get r0(): number;
    /** radius of the second circle */
    get r1(): number;
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
