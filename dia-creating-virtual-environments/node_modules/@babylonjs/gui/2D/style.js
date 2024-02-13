import { Observable } from "@babylonjs/core/Misc/observable.js";
import { ValueAndUnit } from "./valueAndUnit.js";
/**
 * Define a style used by control to automatically setup properties based on a template.
 * Only support font related properties so far
 */
export class Style {
    /**
     * Creates a new style object
     * @param host defines the AdvancedDynamicTexture which hosts this style
     */
    constructor(host) {
        this._fontFamily = "Arial";
        this._fontStyle = "";
        this._fontWeight = "";
        /** @internal */
        this._fontSize = new ValueAndUnit(18, ValueAndUnit.UNITMODE_PIXEL, false);
        /**
         * Observable raised when the style values are changed
         */
        this.onChangedObservable = new Observable();
        this._host = host;
    }
    /**
     * Gets or sets the font size
     */
    get fontSize() {
        return this._fontSize.toString(this._host);
    }
    set fontSize(value) {
        if (this._fontSize.toString(this._host) === value) {
            return;
        }
        if (this._fontSize.fromString(value)) {
            this.onChangedObservable.notifyObservers(this);
        }
    }
    /**
     * Gets or sets the font family
     */
    get fontFamily() {
        return this._fontFamily;
    }
    set fontFamily(value) {
        if (this._fontFamily === value) {
            return;
        }
        this._fontFamily = value;
        this.onChangedObservable.notifyObservers(this);
    }
    /**
     * Gets or sets the font style
     */
    get fontStyle() {
        return this._fontStyle;
    }
    set fontStyle(value) {
        if (this._fontStyle === value) {
            return;
        }
        this._fontStyle = value;
        this.onChangedObservable.notifyObservers(this);
    }
    /** Gets or sets font weight */
    get fontWeight() {
        return this._fontWeight;
    }
    set fontWeight(value) {
        if (this._fontWeight === value) {
            return;
        }
        this._fontWeight = value;
        this.onChangedObservable.notifyObservers(this);
    }
    /** Dispose all associated resources */
    dispose() {
        this.onChangedObservable.clear();
    }
}
//# sourceMappingURL=style.js.map