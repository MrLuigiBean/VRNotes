import { Observable } from "@babylonjs/core/Misc/observable.js";
import type { AdvancedDynamicTexture } from "./advancedDynamicTexture";
/**
 * Class used to specific a value and its associated unit
 */
export declare class ValueAndUnit {
    /** defines a boolean indicating if the value can be negative */
    negativeValueAllowed: boolean;
    private _value;
    private _unit;
    private _originalUnit;
    /**
     * Gets or sets a value indicating that this value will not scale accordingly with adaptive scaling property
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#adaptive-scaling
     */
    ignoreAdaptiveScaling: boolean;
    /**
     * Observable event triggered each time the value or unit changes
     */
    onChangedObservable: Observable<void>;
    /**
     * Creates a new ValueAndUnit
     * @param value defines the value to store
     * @param unit defines the unit to store - defaults to ValueAndUnit.UNITMODE_PIXEL
     * @param negativeValueAllowed defines a boolean indicating if the value can be negative
     */
    constructor(value: number, 
    /** defines the unit to store */
    unit?: number, 
    /** defines a boolean indicating if the value can be negative */
    negativeValueAllowed?: boolean);
    /** Gets a boolean indicating if the value is a percentage */
    get isPercentage(): boolean;
    /** Gets a boolean indicating if the value is store as pixel */
    get isPixel(): boolean;
    /**
     * Gets value (without units)
     * @deprecated use value property instead
     */
    get internalValue(): number;
    /** Gets value (without units) */
    get value(): number;
    /** Sets value (without units) */
    set value(value: number);
    /** Gets units (without value) */
    get unit(): number;
    /** Sets units (without value) */
    set unit(value: number);
    /**
     * Gets value as pixel
     * @param host defines the root host
     * @param refValue defines the reference value for percentages
     * @returns the value as pixel
     */
    getValueInPixel(host: AdvancedDynamicTexture, refValue: number): number;
    /**
     * Update the current value and unit.
     * @param value defines the value to store
     * @param unit defines the unit to store
     * @returns the current ValueAndUnit
     */
    updateInPlace(value: number, unit?: number): ValueAndUnit;
    /**
     * Gets the value accordingly to its unit
     * @param host  defines the root host
     * @returns the value
     */
    getValue(host: AdvancedDynamicTexture): number;
    /**
     * Gets a string representation of the value
     * @param host defines the root host
     * @param decimals defines an optional number of decimals to display
     * @returns a string
     */
    toString(host: AdvancedDynamicTexture, decimals?: number): string;
    /**
     * Store a value parsed from a string
     * @param source defines the source string
     * @returns true if the value was successfully parsed and updated
     */
    fromString(source: string | number): boolean;
    private static _Regex;
    private static _UNITMODE_PERCENTAGE;
    private static _UNITMODE_PIXEL;
    /** UNITMODE_PERCENTAGE */
    static get UNITMODE_PERCENTAGE(): number;
    /** UNITMODE_PIXEL */
    static get UNITMODE_PIXEL(): number;
}
