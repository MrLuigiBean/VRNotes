import { Observable } from "@babylonjs/core/Misc/observable.js";
/**
 * Class used to specific a value and its associated unit
 */
export class ValueAndUnit {
    /**
     * Creates a new ValueAndUnit
     * @param value defines the value to store
     * @param unit defines the unit to store - defaults to ValueAndUnit.UNITMODE_PIXEL
     * @param negativeValueAllowed defines a boolean indicating if the value can be negative
     */
    constructor(value, 
    /** defines the unit to store */
    unit = ValueAndUnit.UNITMODE_PIXEL, 
    /** defines a boolean indicating if the value can be negative */
    negativeValueAllowed = true) {
        this.negativeValueAllowed = negativeValueAllowed;
        this._value = 1;
        this._unit = ValueAndUnit.UNITMODE_PIXEL;
        /**
         * Gets or sets a value indicating that this value will not scale accordingly with adaptive scaling property
         * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#adaptive-scaling
         */
        this.ignoreAdaptiveScaling = false;
        /**
         * Observable event triggered each time the value or unit changes
         */
        this.onChangedObservable = new Observable();
        this._value = value;
        this._unit = unit;
        this._originalUnit = unit;
    }
    /** Gets a boolean indicating if the value is a percentage */
    get isPercentage() {
        return this._unit === ValueAndUnit.UNITMODE_PERCENTAGE;
    }
    /** Gets a boolean indicating if the value is store as pixel */
    get isPixel() {
        return this._unit === ValueAndUnit.UNITMODE_PIXEL;
    }
    /**
     * Gets value (without units)
     * @deprecated use value property instead
     */
    get internalValue() {
        return this._value;
    }
    /** Gets value (without units) */
    get value() {
        return this._value;
    }
    /** Sets value (without units) */
    set value(value) {
        if (value !== this._value) {
            this._value = value;
            this.onChangedObservable.notifyObservers();
        }
    }
    /** Gets units (without value) */
    get unit() {
        return this._unit;
    }
    /** Sets units (without value) */
    set unit(value) {
        if (value !== this._unit) {
            this._unit = value;
            this.onChangedObservable.notifyObservers();
        }
    }
    /**
     * Gets value as pixel
     * @param host defines the root host
     * @param refValue defines the reference value for percentages
     * @returns the value as pixel
     */
    getValueInPixel(host, refValue) {
        if (this.isPixel) {
            return this.getValue(host);
        }
        return this.getValue(host) * refValue;
    }
    /**
     * Update the current value and unit.
     * @param value defines the value to store
     * @param unit defines the unit to store
     * @returns the current ValueAndUnit
     */
    updateInPlace(value, unit = ValueAndUnit.UNITMODE_PIXEL) {
        if (this.value !== value || this.unit !== unit) {
            // set member variables to notify only once
            this._value = value;
            this._unit = unit;
            this.onChangedObservable.notifyObservers();
        }
        return this;
    }
    /**
     * Gets the value accordingly to its unit
     * @param host  defines the root host
     * @returns the value
     */
    getValue(host) {
        if (host && !this.ignoreAdaptiveScaling && this.unit !== ValueAndUnit.UNITMODE_PERCENTAGE) {
            let width = 0;
            let height = 0;
            if (host.idealWidth) {
                width = Math.ceil((this._value * host.getSize().width) / host.idealWidth);
            }
            if (host.idealHeight) {
                height = Math.ceil((this._value * host.getSize().height) / host.idealHeight);
            }
            if (host.useSmallestIdeal && host.idealWidth && host.idealHeight) {
                return window.innerWidth < window.innerHeight ? width : height;
            }
            if (host.idealWidth) {
                // horizontal
                return width;
            }
            if (host.idealHeight) {
                // vertical
                return height;
            }
        }
        return this._value;
    }
    /**
     * Gets a string representation of the value
     * @param host defines the root host
     * @param decimals defines an optional number of decimals to display
     * @returns a string
     */
    toString(host, decimals) {
        switch (this._unit) {
            case ValueAndUnit.UNITMODE_PERCENTAGE: {
                const percentage = this.getValue(host) * 100;
                return (decimals ? percentage.toFixed(decimals) : percentage) + "%";
            }
            case ValueAndUnit.UNITMODE_PIXEL: {
                const pixels = this.getValue(host);
                return (decimals ? pixels.toFixed(decimals) : pixels) + "px";
            }
        }
        return this._unit.toString();
    }
    /**
     * Store a value parsed from a string
     * @param source defines the source string
     * @returns true if the value was successfully parsed and updated
     */
    fromString(source) {
        const match = ValueAndUnit._Regex.exec(source.toString());
        if (!match || match.length === 0) {
            return false;
        }
        let sourceValue = parseFloat(match[1]);
        let sourceUnit = this._originalUnit;
        if (!this.negativeValueAllowed) {
            if (sourceValue < 0) {
                sourceValue = 0;
            }
        }
        if (match.length === 4) {
            switch (match[3]) {
                case "px":
                    sourceUnit = ValueAndUnit.UNITMODE_PIXEL;
                    break;
                case "%":
                    sourceUnit = ValueAndUnit.UNITMODE_PERCENTAGE;
                    sourceValue /= 100.0;
                    break;
            }
        }
        if (sourceValue === this._value && sourceUnit === this._unit) {
            return false;
        }
        this._value = sourceValue;
        this._unit = sourceUnit;
        this.onChangedObservable.notifyObservers();
        return true;
    }
    /** UNITMODE_PERCENTAGE */
    static get UNITMODE_PERCENTAGE() {
        return ValueAndUnit._UNITMODE_PERCENTAGE;
    }
    /** UNITMODE_PIXEL */
    static get UNITMODE_PIXEL() {
        return ValueAndUnit._UNITMODE_PIXEL;
    }
}
// Static
ValueAndUnit._Regex = /(^-?\d*(\.\d+)?)(%|px)?/;
ValueAndUnit._UNITMODE_PERCENTAGE = 0;
ValueAndUnit._UNITMODE_PIXEL = 1;
//# sourceMappingURL=valueAndUnit.js.map