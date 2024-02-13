import { Container } from "./container";
import type { Measure } from "../measure";
import type { ICanvasRenderingContext } from "@babylonjs/core/Engines/ICanvas.js";
/** Class used to create rectangle container */
export declare class Rectangle extends Container {
    name?: string | undefined;
    private _thickness;
    private _cornerRadius;
    private _cachedRadius;
    /** Gets or sets border thickness */
    get thickness(): number;
    set thickness(value: number);
    /** Gets or sets the corner radius of all angles */
    get cornerRadius(): number;
    set cornerRadius(value: number);
    /** Gets or sets the corner radius top left angle */
    get cornerRadiusX(): number;
    set cornerRadiusX(value: number);
    /** Gets or sets the corner radius top right angle */
    get cornerRadiusY(): number;
    set cornerRadiusY(value: number);
    /** Gets or sets the corner radius bottom left angle */
    get cornerRadiusZ(): number;
    set cornerRadiusZ(value: number);
    /** Gets or sets the corner radius bottom right angle */
    get cornerRadiusW(): number;
    set cornerRadiusW(value: number);
    /**
     * Creates a new Rectangle
     * @param name defines the control name
     */
    constructor(name?: string | undefined);
    protected _getTypeName(): string;
    /** @internal */
    protected _computeAdditionalOffsetX(): number;
    /** @internal */
    protected _computeAdditionalOffsetY(): number;
    protected _getRectangleFill(context: ICanvasRenderingContext): string | CanvasGradient;
    protected _localDraw(context: ICanvasRenderingContext): void;
    protected _additionalProcessing(parentMeasure: Measure, context: ICanvasRenderingContext): void;
    private _drawRoundedRect;
    protected _clipForChildren(context: ICanvasRenderingContext): void;
}
