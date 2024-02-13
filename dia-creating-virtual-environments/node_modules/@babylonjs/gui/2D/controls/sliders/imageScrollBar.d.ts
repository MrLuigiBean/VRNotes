import type { Vector2 } from "@babylonjs/core/Maths/math.vector.js";
import { BaseSlider } from "./baseSlider";
import type { Control } from "../control";
import type { Image } from "../image";
import type { PointerInfoBase } from "@babylonjs/core/Events/pointerEvents.js";
import type { ICanvasRenderingContext } from "@babylonjs/core/Engines/ICanvas.js";
/**
 * Class used to create slider controls
 */
export declare class ImageScrollBar extends BaseSlider {
    name?: string | undefined;
    private _backgroundBaseImage;
    private _backgroundImage;
    private _thumbImage;
    private _thumbBaseImage;
    private _thumbLength;
    private _thumbHeight;
    private _barImageHeight;
    private _tempMeasure;
    private _invertScrollDirection;
    /** Number of 90° rotation to apply on the images when in vertical mode */
    num90RotationInVerticalMode: number;
    /** Inverts the scrolling direction (default: false) */
    get invertScrollDirection(): boolean;
    set invertScrollDirection(invert: boolean);
    /**
     * Gets or sets the image used to render the background for horizontal bar
     */
    get backgroundImage(): Image;
    set backgroundImage(value: Image);
    /**
     * Gets or sets the image used to render the thumb
     */
    get thumbImage(): Image;
    set thumbImage(value: Image);
    /**
     * Gets or sets the length of the thumb
     */
    get thumbLength(): number;
    set thumbLength(value: number);
    /**
     * Gets or sets the height of the thumb
     */
    get thumbHeight(): number;
    set thumbHeight(value: number);
    /**
     * Gets or sets the height of the bar image
     */
    get barImageHeight(): number;
    set barImageHeight(value: number);
    /**
     * Creates a new ImageScrollBar
     * @param name defines the control name
     */
    constructor(name?: string | undefined);
    protected _getTypeName(): string;
    protected _getThumbThickness(): number;
    _draw(context: ICanvasRenderingContext): void;
    private _first;
    private _originX;
    private _originY;
    /**
     * @internal
     */
    protected _updateValueFromPointer(x: number, y: number): void;
    _onPointerDown(target: Control, coordinates: Vector2, pointerId: number, buttonIndex: number, pi: PointerInfoBase): boolean;
}
