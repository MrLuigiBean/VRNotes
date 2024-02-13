import { BaseSlider } from "./baseSlider";
import type { ICanvasRenderingContext } from "@babylonjs/core/Engines/ICanvas.js";
import type { Nullable } from "@babylonjs/core/types.js";
import type { BaseGradient } from "../gradient/BaseGradient";
import type { AdvancedDynamicTexture } from "../../advancedDynamicTexture.js";
/**
 * Class used to create slider controls
 */
export declare class Slider extends BaseSlider {
    name?: string | undefined;
    private _background;
    private _borderColor;
    private _thumbColor;
    private _isThumbCircle;
    protected _displayValueBar: boolean;
    private _backgroundGradient;
    /** Gets or sets a boolean indicating if the value bar must be rendered */
    get displayValueBar(): boolean;
    set displayValueBar(value: boolean);
    /** Gets or sets border color */
    get borderColor(): string;
    set borderColor(value: string);
    /** Gets or sets background color */
    get background(): string;
    set background(value: string);
    /** Gets or sets background gradient */
    get backgroundGradient(): Nullable<BaseGradient>;
    set backgroundGradient(value: Nullable<BaseGradient>);
    /** Gets or sets thumb's color */
    get thumbColor(): string;
    set thumbColor(value: string);
    /** Gets or sets a boolean indicating if the thumb should be round or square */
    get isThumbCircle(): boolean;
    set isThumbCircle(value: boolean);
    /**
     * Creates a new Slider
     * @param name defines the control name
     */
    constructor(name?: string | undefined);
    protected _getTypeName(): string;
    protected _getBackgroundColor(context: ICanvasRenderingContext): string | CanvasGradient;
    _draw(context: ICanvasRenderingContext): void;
    serialize(serializationObject: any): void;
    /** @internal */
    _parseFromContent(serializedObject: any, host: AdvancedDynamicTexture): void;
}
