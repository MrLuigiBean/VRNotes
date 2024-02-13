import { Observable } from "@babylonjs/core/Misc/observable.js";
import type { Vector2 } from "@babylonjs/core/Maths/math.vector.js";
import { Control } from "./control";
import type { Measure } from "../measure";
import type { AdvancedDynamicTexture } from "../advancedDynamicTexture";
import { Color3 } from "@babylonjs/core/Maths/math.color.js";
import type { PointerInfoBase } from "@babylonjs/core/Events/pointerEvents.js";
import type { ICanvasRenderingContext } from "@babylonjs/core/Engines/ICanvas.js";
/** Class used to create color pickers */
export declare class ColorPicker extends Control {
    name?: string | undefined;
    private static _Epsilon;
    private _colorWheelCanvas;
    private _value;
    private _tmpColor;
    private _pointerStartedOnSquare;
    private _pointerStartedOnWheel;
    private _squareLeft;
    private _squareTop;
    private _squareSize;
    private _h;
    private _s;
    private _v;
    private _lastPointerDownId;
    /**
     * Observable raised when the value changes
     */
    onValueChangedObservable: Observable<Color3>;
    /** Gets or sets the color of the color picker */
    get value(): Color3;
    set value(value: Color3);
    /**
     * Gets or sets control width
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
     */
    get width(): string | number;
    set width(value: string | number);
    /**
     * Gets or sets control height
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
     */
    get height(): string | number;
    /** Gets or sets control height */
    set height(value: string | number);
    /** Gets or sets control size */
    get size(): string | number;
    set size(value: string | number);
    /**
     * Creates a new ColorPicker
     * @param name defines the control name
     */
    constructor(name?: string | undefined);
    protected _getTypeName(): string;
    /**
     * @internal
     */
    protected _preMeasure(parentMeasure: Measure): void;
    private _updateSquareProps;
    private _drawGradientSquare;
    private _drawCircle;
    private _createColorWheelCanvas;
    /**
     * @internal
     */
    _draw(context: ICanvasRenderingContext): void;
    private _pointerIsDown;
    private _updateValueFromPointer;
    private _isPointOnSquare;
    private _isPointOnWheel;
    _onPointerDown(target: Control, coordinates: Vector2, pointerId: number, buttonIndex: number, pi: PointerInfoBase): boolean;
    _onPointerMove(target: Control, coordinates: Vector2, pointerId: number, pi: PointerInfoBase): void;
    _onPointerUp(target: Control, coordinates: Vector2, pointerId: number, buttonIndex: number, notifyClick: boolean, pi: PointerInfoBase): void;
    _onCanvasBlur(): void;
    /**
     * This function expands the color picker by creating a color picker dialog with manual
     * color value input and the ability to save colors into an array to be used later in
     * subsequent launches of the dialogue.
     * @param advancedTexture defines the AdvancedDynamicTexture the dialog is assigned to
     * @param options defines size for dialog and options for saved colors. Also accepts last color picked as hex string and saved colors array as hex strings.
     * @param options.pickerWidth
     * @param options.pickerHeight
     * @param options.headerHeight
     * @param options.lastColor
     * @param options.swatchLimit
     * @param options.numSwatchesPerLine
     * @param options.savedColors
     * @returns picked color as a hex string and the saved colors array as hex strings.
     */
    static ShowPickerDialogAsync(advancedTexture: AdvancedDynamicTexture, options: {
        pickerWidth?: string;
        pickerHeight?: string;
        headerHeight?: string;
        lastColor?: string;
        swatchLimit?: number;
        numSwatchesPerLine?: number;
        savedColors?: Array<string>;
    }): Promise<{
        savedColors?: string[];
        pickedColor: string;
    }>;
}
