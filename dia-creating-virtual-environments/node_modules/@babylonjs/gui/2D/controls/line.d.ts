import { Vector3 } from "@babylonjs/core/Maths/math.vector.js";
import type { Scene } from "@babylonjs/core/scene.js";
import { Control } from "./control";
import { ValueAndUnit } from "../valueAndUnit";
import type { Measure } from "../measure";
import type { ICanvasRenderingContext } from "@babylonjs/core/Engines/ICanvas.js";
/** Class used to render 2D lines */
export declare class Line extends Control {
    name?: string | undefined;
    private _lineWidth;
    /** @internal */
    _x1: ValueAndUnit;
    /** @internal */
    _y1: ValueAndUnit;
    /** @internal */
    _x2: ValueAndUnit;
    /** @internal */
    _y2: ValueAndUnit;
    private _dash;
    private _connectedControl;
    private _connectedControlDirtyObserver;
    /** Gets or sets the dash pattern */
    get dash(): Array<number>;
    set dash(value: Array<number>);
    /** Gets or sets the control connected with the line end */
    get connectedControl(): Control;
    set connectedControl(value: Control);
    /** Gets or sets start coordinates on X axis */
    get x1(): string | number;
    set x1(value: string | number);
    /** Gets or sets start coordinates on Y axis */
    get y1(): string | number;
    set y1(value: string | number);
    /** Gets or sets end coordinates on X axis */
    get x2(): string | number;
    set x2(value: string | number);
    /** Gets or sets end coordinates on Y axis */
    get y2(): string | number;
    set y2(value: string | number);
    /** Gets or sets line width */
    get lineWidth(): number;
    set lineWidth(value: number);
    /** Gets or sets horizontal alignment */
    set horizontalAlignment(value: number);
    /** Gets or sets vertical alignment */
    set verticalAlignment(value: number);
    /** @internal */
    get _effectiveX2(): number;
    /** @internal */
    get _effectiveY2(): number;
    /**
     * Creates a new Line
     * @param name defines the control name
     */
    constructor(name?: string | undefined);
    protected _getTypeName(): string;
    _draw(context: ICanvasRenderingContext): void;
    _measure(): void;
    protected _computeAlignment(parentMeasure: Measure): void;
    /**
     * Move one end of the line given 3D cartesian coordinates.
     * @param position Targeted world position
     * @param scene Scene
     * @param end (opt) Set to true to assign x2 and y2 coordinates of the line. Default assign to x1 and y1.
     */
    moveToVector3(position: Vector3, scene: Scene, end?: boolean): void;
    /**
     * Move one end of the line to a position in screen absolute space.
     * @param projectedPosition Position in screen absolute space (X, Y)
     * @param end (opt) Set to true to assign x2 and y2 coordinates of the line. Default assign to x1 and y1.
     */
    _moveToProjectedPosition(projectedPosition: Vector3, end?: boolean): void;
}
