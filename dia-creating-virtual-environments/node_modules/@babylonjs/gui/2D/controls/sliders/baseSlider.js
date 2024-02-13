import { __decorate } from "@babylonjs/core/tslib.es6.js";
import { Observable } from "@babylonjs/core/Misc/observable.js";
import { Control } from "../control.js";
import { ValueAndUnit } from "../../valueAndUnit.js";
import { serialize } from "@babylonjs/core/Misc/decorators.js";
import { Logger } from "@babylonjs/core/Misc/logger.js";
/**
 * Class used to create slider controls
 */
export class BaseSlider extends Control {
    /** Gets or sets a boolean indicating if the thumb must be rendered */
    get displayThumb() {
        return this._displayThumb;
    }
    set displayThumb(value) {
        if (this._displayThumb === value) {
            return;
        }
        this._displayThumb = value;
        this._markAsDirty();
    }
    /** Gets or sets a step to apply to values (0 by default) */
    get step() {
        return this._step;
    }
    set step(value) {
        if (this._step === value) {
            return;
        }
        this._step = value;
        this._markAsDirty();
    }
    /** Gets or sets main bar offset (ie. the margin applied to the value bar) */
    get barOffset() {
        return this._barOffset.toString(this._host);
    }
    /** Gets main bar offset in pixels*/
    get barOffsetInPixels() {
        return this._barOffset.getValueInPixel(this._host, this._cachedParentMeasure.width);
    }
    set barOffset(value) {
        if (this._barOffset.toString(this._host) === value) {
            return;
        }
        if (this._barOffset.fromString(value)) {
            this._markAsDirty();
        }
    }
    /** Gets or sets thumb width */
    get thumbWidth() {
        return this._thumbWidth.toString(this._host);
    }
    /** Gets thumb width in pixels */
    get thumbWidthInPixels() {
        return this._thumbWidth.getValueInPixel(this._host, this._cachedParentMeasure.width);
    }
    set thumbWidth(value) {
        if (this._thumbWidth.toString(this._host) === value) {
            return;
        }
        if (this._thumbWidth.fromString(value)) {
            this._markAsDirty();
        }
    }
    /** Gets or sets minimum value */
    get minimum() {
        return this._minimum;
    }
    set minimum(value) {
        if (this._minimum === value) {
            return;
        }
        this._minimum = value;
        this._markAsDirty();
        this.value = Math.max(Math.min(this.value, this._maximum), this._minimum);
    }
    /** Gets or sets maximum value */
    get maximum() {
        return this._maximum;
    }
    set maximum(value) {
        if (this._maximum === value) {
            return;
        }
        this._maximum = value;
        this._markAsDirty();
        this.value = Math.max(Math.min(this.value, this._maximum), this._minimum);
    }
    /** Gets or sets current value */
    get value() {
        return this._value;
    }
    set value(value) {
        value = Math.max(Math.min(value, this._maximum), this._minimum);
        if (this._value === value) {
            return;
        }
        this._value = value;
        this._markAsDirty();
        this.onValueChangedObservable.notifyObservers(this._value);
    }
    /**Gets or sets a boolean indicating if the slider should be vertical or horizontal */
    get isVertical() {
        return this._isVertical;
    }
    set isVertical(value) {
        if (this._isVertical === value) {
            return;
        }
        this._isVertical = value;
        this._markAsDirty();
    }
    /** Gets or sets a value indicating if the thumb can go over main bar extends */
    get isThumbClamped() {
        return this._isThumbClamped;
    }
    set isThumbClamped(value) {
        if (this._isThumbClamped === value) {
            return;
        }
        this._isThumbClamped = value;
        this._markAsDirty();
    }
    /**
     * Creates a new BaseSlider
     * @param name defines the control name
     */
    constructor(name) {
        super(name);
        this.name = name;
        this._thumbWidth = new ValueAndUnit(20, ValueAndUnit.UNITMODE_PIXEL, false);
        this._minimum = 0;
        this._maximum = 100;
        this._value = 50;
        this._isVertical = false;
        this._barOffset = new ValueAndUnit(5, ValueAndUnit.UNITMODE_PIXEL, false);
        this._isThumbClamped = false;
        this._displayThumb = true;
        this._step = 0;
        this._lastPointerDownId = -1;
        // Shared rendering info
        this._effectiveBarOffset = 0;
        /** Observable raised when the slider value changes */
        this.onValueChangedObservable = new Observable();
        // Events
        this._pointerIsDown = false;
        this.isPointerBlocker = true;
    }
    _getTypeName() {
        return "BaseSlider";
    }
    _getThumbPosition() {
        if (this.isVertical) {
            return ((this.maximum - this.value) / (this.maximum - this.minimum)) * this._backgroundBoxLength;
        }
        return ((this.value - this.minimum) / (this.maximum - this.minimum)) * this._backgroundBoxLength;
    }
    _getThumbThickness(type) {
        let thumbThickness = 0;
        switch (type) {
            case "circle":
                if (this._thumbWidth.isPixel) {
                    thumbThickness = Math.max(this._thumbWidth.getValue(this._host), this._backgroundBoxThickness);
                }
                else {
                    thumbThickness = this._backgroundBoxThickness * this._thumbWidth.getValue(this._host);
                }
                break;
            case "rectangle":
                if (this._thumbWidth.isPixel) {
                    thumbThickness = Math.min(this._thumbWidth.getValue(this._host), this._backgroundBoxThickness);
                }
                else {
                    thumbThickness = this._backgroundBoxThickness * this._thumbWidth.getValue(this._host);
                }
        }
        return thumbThickness;
    }
    _prepareRenderingData(type) {
        // Main bar
        this._effectiveBarOffset = 0;
        this._renderLeft = this._currentMeasure.left;
        this._renderTop = this._currentMeasure.top;
        this._renderWidth = this._currentMeasure.width;
        this._renderHeight = this._currentMeasure.height;
        this._backgroundBoxLength = Math.max(this._currentMeasure.width, this._currentMeasure.height);
        this._backgroundBoxThickness = Math.min(this._currentMeasure.width, this._currentMeasure.height);
        this._effectiveThumbThickness = this._getThumbThickness(type);
        if (this.displayThumb) {
            this._backgroundBoxLength -= this._effectiveThumbThickness;
        }
        //throw error when height is less than width for vertical slider
        if (this.isVertical && this._currentMeasure.height < this._currentMeasure.width) {
            Logger.Error("Height should be greater than width");
            return;
        }
        if (this._barOffset.isPixel) {
            this._effectiveBarOffset = Math.min(this._barOffset.getValue(this._host), this._backgroundBoxThickness);
        }
        else {
            this._effectiveBarOffset = this._backgroundBoxThickness * this._barOffset.getValue(this._host);
        }
        this._backgroundBoxThickness -= this._effectiveBarOffset * 2;
        if (this.isVertical) {
            this._renderLeft += this._effectiveBarOffset;
            if (!this.isThumbClamped && this.displayThumb) {
                this._renderTop += this._effectiveThumbThickness / 2;
            }
            this._renderHeight = this._backgroundBoxLength;
            this._renderWidth = this._backgroundBoxThickness;
        }
        else {
            this._renderTop += this._effectiveBarOffset;
            if (!this.isThumbClamped && this.displayThumb) {
                this._renderLeft += this._effectiveThumbThickness / 2;
            }
            this._renderHeight = this._backgroundBoxThickness;
            this._renderWidth = this._backgroundBoxLength;
        }
    }
    /**
     * @internal
     */
    _updateValueFromPointer(x, y) {
        if (this.rotation != 0) {
            this._invertTransformMatrix.transformCoordinates(x, y, this._transformedPosition);
            x = this._transformedPosition.x;
            y = this._transformedPosition.y;
        }
        let value;
        if (this._isVertical) {
            value = this._minimum + (1 - (y - this._currentMeasure.top) / this._currentMeasure.height) * (this._maximum - this._minimum);
        }
        else {
            value = this._minimum + ((x - this._currentMeasure.left) / this._currentMeasure.width) * (this._maximum - this._minimum);
        }
        this.value = this._step ? Math.round(value / this._step) * this._step : value;
    }
    _onPointerDown(target, coordinates, pointerId, buttonIndex, pi) {
        if (!super._onPointerDown(target, coordinates, pointerId, buttonIndex, pi)) {
            return false;
        }
        if (this.isReadOnly) {
            return true;
        }
        this._pointerIsDown = true;
        this._updateValueFromPointer(coordinates.x, coordinates.y);
        this._host._capturingControl[pointerId] = this;
        this._lastPointerDownId = pointerId;
        return true;
    }
    _onPointerMove(target, coordinates, pointerId, pi) {
        // Only listen to pointer move events coming from the last pointer to click on the element (To support dual vr controller interaction)
        if (pointerId != this._lastPointerDownId) {
            return;
        }
        if (this._pointerIsDown && !this.isReadOnly) {
            this._updateValueFromPointer(coordinates.x, coordinates.y);
        }
        super._onPointerMove(target, coordinates, pointerId, pi);
    }
    _onPointerUp(target, coordinates, pointerId, buttonIndex, notifyClick) {
        this._pointerIsDown = false;
        delete this._host._capturingControl[pointerId];
        super._onPointerUp(target, coordinates, pointerId, buttonIndex, notifyClick);
    }
    _onCanvasBlur() {
        this._forcePointerUp();
        super._onCanvasBlur();
    }
}
__decorate([
    serialize()
], BaseSlider.prototype, "displayThumb", null);
__decorate([
    serialize()
], BaseSlider.prototype, "step", null);
__decorate([
    serialize()
], BaseSlider.prototype, "barOffset", null);
__decorate([
    serialize()
], BaseSlider.prototype, "thumbWidth", null);
__decorate([
    serialize()
], BaseSlider.prototype, "minimum", null);
__decorate([
    serialize()
], BaseSlider.prototype, "maximum", null);
__decorate([
    serialize()
], BaseSlider.prototype, "value", null);
__decorate([
    serialize()
], BaseSlider.prototype, "isVertical", null);
__decorate([
    serialize()
], BaseSlider.prototype, "isThumbClamped", null);
//# sourceMappingURL=baseSlider.js.map