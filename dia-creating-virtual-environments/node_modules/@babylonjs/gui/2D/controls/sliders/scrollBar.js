import { __decorate } from "@babylonjs/core/tslib.es6.js";
import { BaseSlider } from "./baseSlider.js";
import { Measure } from "../../measure.js";
import { serialize } from "@babylonjs/core/Misc/decorators.js";
import { Tools } from "@babylonjs/core/Misc/tools.js";
import { RegisterClass } from "@babylonjs/core/Misc/typeStore.js";
/**
 * Class used to create slider controls
 */
export class ScrollBar extends BaseSlider {
    /** Gets or sets border color */
    get borderColor() {
        return this._borderColor;
    }
    set borderColor(value) {
        if (this._borderColor === value) {
            return;
        }
        this._borderColor = value;
        this._markAsDirty();
    }
    /** Gets or sets background color */
    get background() {
        return this._background;
    }
    set background(value) {
        if (this._background === value) {
            return;
        }
        this._background = value;
        this._markAsDirty();
    }
    /** Gets or sets background gradient. Takes precedence over gradient. */
    get backgroundGradient() {
        return this._backgroundGradient;
    }
    set backgroundGradient(value) {
        if (this._backgroundGradient === value) {
            return;
        }
        this._backgroundGradient = value;
        this._markAsDirty();
    }
    /** Inverts the scrolling direction (default: false) */
    get invertScrollDirection() {
        return this._invertScrollDirection;
    }
    set invertScrollDirection(invert) {
        this._invertScrollDirection = invert;
    }
    /**
     * Creates a new Slider
     * @param name defines the control name
     */
    constructor(name) {
        super(name);
        this.name = name;
        this._background = "black";
        this._borderColor = "white";
        this._tempMeasure = new Measure(0, 0, 0, 0);
        this._invertScrollDirection = false;
        this._backgroundGradient = null;
    }
    _getTypeName() {
        return "Scrollbar";
    }
    _getThumbThickness() {
        let thumbThickness = 0;
        if (this._thumbWidth.isPixel) {
            thumbThickness = this._thumbWidth.getValue(this._host);
        }
        else {
            thumbThickness = this._backgroundBoxThickness * this._thumbWidth.getValue(this._host);
        }
        return thumbThickness;
    }
    _getBackgroundColor(context) {
        return this._backgroundGradient ? this._backgroundGradient.getCanvasGradient(context) : this._background;
    }
    _draw(context) {
        context.save();
        this._applyStates(context);
        this._prepareRenderingData("rectangle");
        const left = this._renderLeft;
        const thumbPosition = this._getThumbPosition();
        context.fillStyle = this._getBackgroundColor(context);
        context.fillRect(this._currentMeasure.left, this._currentMeasure.top, this._currentMeasure.width, this._currentMeasure.height);
        // Value bar
        context.fillStyle = this._getColor(context);
        // Thumb
        if (this.isVertical) {
            this._tempMeasure.left = left - this._effectiveBarOffset;
            this._tempMeasure.top = this._currentMeasure.top + thumbPosition;
            this._tempMeasure.width = this._currentMeasure.width;
            this._tempMeasure.height = this._effectiveThumbThickness;
        }
        else {
            this._tempMeasure.left = this._currentMeasure.left + thumbPosition;
            this._tempMeasure.top = this._currentMeasure.top;
            this._tempMeasure.width = this._effectiveThumbThickness;
            this._tempMeasure.height = this._currentMeasure.height;
        }
        context.fillRect(this._tempMeasure.left, this._tempMeasure.top, this._tempMeasure.width, this._tempMeasure.height);
        context.restore();
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
        const sign = this._invertScrollDirection ? -1 : 1;
        if (this._first) {
            this._first = false;
            this._originX = x;
            this._originY = y;
            // Check if move is required
            if (x < this._tempMeasure.left ||
                x > this._tempMeasure.left + this._tempMeasure.width ||
                y < this._tempMeasure.top ||
                y > this._tempMeasure.top + this._tempMeasure.height) {
                if (this.isVertical) {
                    this.value = this.minimum + (1 - (y - this._currentMeasure.top) / this._currentMeasure.height) * (this.maximum - this.minimum);
                }
                else {
                    this.value = this.minimum + ((x - this._currentMeasure.left) / this._currentMeasure.width) * (this.maximum - this.minimum);
                }
            }
        }
        // Delta mode
        let delta = 0;
        if (this.isVertical) {
            delta = -((y - this._originY) / (this._currentMeasure.height - this._effectiveThumbThickness));
        }
        else {
            delta = (x - this._originX) / (this._currentMeasure.width - this._effectiveThumbThickness);
        }
        this.value += sign * delta * (this.maximum - this.minimum);
        this._originX = x;
        this._originY = y;
    }
    _onPointerDown(target, coordinates, pointerId, buttonIndex, pi) {
        this._first = true;
        return super._onPointerDown(target, coordinates, pointerId, buttonIndex, pi);
    }
    serialize(serializationObject) {
        super.serialize(serializationObject);
        if (this.backgroundGradient) {
            serializationObject.backgroundGradient = {};
            this.backgroundGradient.serialize(serializationObject.backgroundGradient);
        }
    }
    _parseFromContent(serializationObject, host) {
        super._parseFromContent(serializationObject, host);
        if (serializationObject.backgroundGradient) {
            const className = Tools.Instantiate("BABYLON.GUI." + serializationObject.backgroundGradient.className);
            this.backgroundGradient = new className();
            this.backgroundGradient.parse(serializationObject.backgroundGradient);
        }
    }
}
__decorate([
    serialize()
], ScrollBar.prototype, "borderColor", null);
__decorate([
    serialize()
], ScrollBar.prototype, "background", null);
__decorate([
    serialize()
], ScrollBar.prototype, "invertScrollDirection", null);
RegisterClass("BABYLON.GUI.Scrollbar", ScrollBar);
//# sourceMappingURL=scrollBar.js.map