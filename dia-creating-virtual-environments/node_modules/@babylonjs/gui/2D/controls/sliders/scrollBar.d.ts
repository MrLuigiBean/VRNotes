import type { Vector2 } from "@babylonjs/core/Maths/math.vector.js";
import { BaseSlider } from "./baseSlider";
import type { Control } from "../control";
import type { PointerInfoBase } from "@babylonjs/core/Events/pointerEvents.js";
import type { ICanvasRenderingContext } from "@babylonjs/core/Engines/ICanvas.js";
import type { Nullable } from "@babylonjs/core/types.js";
import type { BaseGradient } from "../gradient/BaseGradient";
import type { AdvancedDynamicTexture } from "../../advancedDynamicTexture.js";
/**
 * Class used to create slider controls
 */
export declare class ScrollBar extends BaseSlider {
    name?: string | undefined;
    private _background;
    private _borderColor;
    private _tempMeasure;
    private _invertScrollDirection;
    private _backgroundGradient;
    /** Gets or sets border color */
    get borderColor(): string;
    set borderColor(value: string);
    /** Gets or sets background color */
    get background(): string;
    set background(value: string);
    /** Gets or sets background gradient. Takes precedence over gradient. */
    get backgroundGradient(): Nullable<BaseGradient>;
    set backgroundGradient(value: Nullable<BaseGradient>);
    /** Inverts the scrolling direction (default: false) */
    get invertScrollDirection(): boolean;
    set invertScrollDirection(invert: boolean);
    /**
     * Creates a new Slider
     * @param name defines the control name
     */
    constructor(name?: string | undefined);
    protected _getTypeName(): string;
    protected _getThumbThickness(): number;
    private _getBackgroundColor;
    _draw(context: ICanvasRenderingContext): void;
    private _first;
    private _originX;
    private _originY;
    /**
     * @internal
     */
    protected _updateValueFromPointer(x: number, y: number): void;
    _onPointerDown(target: Control, coordinates: Vector2, pointerId: number, buttonIndex: number, pi: PointerInfoBase): boolean;
    serialize(serializationObject: any): void;
    _parseFromContent(serializationObject: any, host: AdvancedDynamicTexture): void;
}
