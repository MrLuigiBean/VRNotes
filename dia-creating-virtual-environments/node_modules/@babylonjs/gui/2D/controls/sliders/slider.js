import { __decorate } from "@babylonjs/core/tslib.es6.js";
import { BaseSlider } from "./baseSlider.js";
import { RegisterClass } from "@babylonjs/core/Misc/typeStore.js";
import { serialize } from "@babylonjs/core/Misc/decorators.js";
import { Tools } from "@babylonjs/core/Misc/tools.js";
/**
 * Class used to create slider controls
 */
export class Slider extends BaseSlider {
    /** Gets or sets a boolean indicating if the value bar must be rendered */
    get displayValueBar() {
        return this._displayValueBar;
    }
    set displayValueBar(value) {
        if (this._displayValueBar === value) {
            return;
        }
        this._displayValueBar = value;
        this._markAsDirty();
    }
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
    /** Gets or sets background gradient */
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
    /** Gets or sets thumb's color */
    get thumbColor() {
        return this._thumbColor;
    }
    set thumbColor(value) {
        if (this._thumbColor === value) {
            return;
        }
        this._thumbColor = value;
        this._markAsDirty();
    }
    /** Gets or sets a boolean indicating if the thumb should be round or square */
    get isThumbCircle() {
        return this._isThumbCircle;
    }
    set isThumbCircle(value) {
        if (this._isThumbCircle === value) {
            return;
        }
        this._isThumbCircle = value;
        this._markAsDirty();
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
        this._thumbColor = "";
        this._isThumbCircle = false;
        this._displayValueBar = true;
        this._backgroundGradient = null;
    }
    _getTypeName() {
        return "Slider";
    }
    _getBackgroundColor(context) {
        return this._backgroundGradient ? this._backgroundGradient.getCanvasGradient(context) : this._background;
    }
    _draw(context) {
        context.save();
        this._applyStates(context);
        this._prepareRenderingData(this.isThumbCircle ? "circle" : "rectangle");
        let left = this._renderLeft;
        let top = this._renderTop;
        const width = this._renderWidth;
        const height = this._renderHeight;
        let radius = 0;
        if (this.isThumbClamped && this.isThumbCircle) {
            if (this.isVertical) {
                top += this._effectiveThumbThickness / 2;
            }
            else {
                left += this._effectiveThumbThickness / 2;
            }
            radius = this._backgroundBoxThickness / 2;
        }
        else {
            radius = (this._effectiveThumbThickness - this._effectiveBarOffset) / 2;
        }
        if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
            context.shadowColor = this.shadowColor;
            context.shadowBlur = this.shadowBlur;
            context.shadowOffsetX = this.shadowOffsetX;
            context.shadowOffsetY = this.shadowOffsetY;
        }
        const thumbPosition = this._getThumbPosition();
        context.fillStyle = this._getBackgroundColor(context);
        if (this.isVertical) {
            if (this.isThumbClamped) {
                if (this.isThumbCircle) {
                    context.beginPath();
                    context.arc(left + this._backgroundBoxThickness / 2, top, radius, Math.PI, 2 * Math.PI);
                    context.fill();
                    context.fillRect(left, top, width, height);
                }
                else {
                    context.fillRect(left, top, width, height + this._effectiveThumbThickness);
                }
            }
            else {
                context.fillRect(left, top, width, height);
            }
        }
        else {
            if (this.isThumbClamped) {
                if (this.isThumbCircle) {
                    context.beginPath();
                    context.arc(left + this._backgroundBoxLength, top + this._backgroundBoxThickness / 2, radius, 0, 2 * Math.PI);
                    context.fill();
                    context.fillRect(left, top, width, height);
                }
                else {
                    context.fillRect(left, top, width + this._effectiveThumbThickness, height);
                }
            }
            else {
                context.fillRect(left, top, width, height);
            }
        }
        if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
            context.shadowBlur = 0;
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
        }
        // Value bar
        context.fillStyle = this._getColor(context);
        if (this._displayValueBar) {
            if (this.isVertical) {
                if (this.isThumbClamped) {
                    if (this.isThumbCircle) {
                        context.beginPath();
                        context.arc(left + this._backgroundBoxThickness / 2, top + this._backgroundBoxLength, radius, 0, 2 * Math.PI);
                        context.fill();
                        context.fillRect(left, top + thumbPosition, width, height - thumbPosition);
                    }
                    else {
                        context.fillRect(left, top + thumbPosition, width, height - thumbPosition + this._effectiveThumbThickness);
                    }
                }
                else {
                    context.fillRect(left, top + thumbPosition, width, height - thumbPosition);
                }
            }
            else {
                if (this.isThumbClamped) {
                    if (this.isThumbCircle) {
                        context.beginPath();
                        context.arc(left, top + this._backgroundBoxThickness / 2, radius, 0, 2 * Math.PI);
                        context.fill();
                        context.fillRect(left, top, thumbPosition, height);
                    }
                    else {
                        context.fillRect(left, top, thumbPosition, height);
                    }
                }
                else {
                    context.fillRect(left, top, thumbPosition, height);
                }
            }
        }
        // Thumb
        context.fillStyle = this._thumbColor || this._getColor(context);
        if (this.displayThumb) {
            if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
                context.shadowColor = this.shadowColor;
                context.shadowBlur = this.shadowBlur;
                context.shadowOffsetX = this.shadowOffsetX;
                context.shadowOffsetY = this.shadowOffsetY;
            }
            if (this._isThumbCircle) {
                context.beginPath();
                if (this.isVertical) {
                    context.arc(left + this._backgroundBoxThickness / 2, top + thumbPosition, radius, 0, 2 * Math.PI);
                }
                else {
                    context.arc(left + thumbPosition, top + this._backgroundBoxThickness / 2, radius, 0, 2 * Math.PI);
                }
                context.fill();
                if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
                    context.shadowBlur = 0;
                    context.shadowOffsetX = 0;
                    context.shadowOffsetY = 0;
                }
                context.strokeStyle = this._borderColor;
                context.stroke();
            }
            else {
                if (this.isVertical) {
                    context.fillRect(left - this._effectiveBarOffset, this._currentMeasure.top + thumbPosition, this._currentMeasure.width, this._effectiveThumbThickness);
                }
                else {
                    context.fillRect(this._currentMeasure.left + thumbPosition, this._currentMeasure.top, this._effectiveThumbThickness, this._currentMeasure.height);
                }
                if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
                    context.shadowBlur = 0;
                    context.shadowOffsetX = 0;
                    context.shadowOffsetY = 0;
                }
                context.strokeStyle = this._borderColor;
                if (this.isVertical) {
                    context.strokeRect(left - this._effectiveBarOffset, this._currentMeasure.top + thumbPosition, this._currentMeasure.width, this._effectiveThumbThickness);
                }
                else {
                    context.strokeRect(this._currentMeasure.left + thumbPosition, this._currentMeasure.top, this._effectiveThumbThickness, this._currentMeasure.height);
                }
            }
        }
        context.restore();
    }
    serialize(serializationObject) {
        super.serialize(serializationObject);
        if (this.backgroundGradient) {
            serializationObject.backgroundGradient = {};
            this.backgroundGradient.serialize(serializationObject.backgroundGradient);
        }
    }
    /** @internal */
    _parseFromContent(serializedObject, host) {
        super._parseFromContent(serializedObject, host);
        if (serializedObject.backgroundGradient) {
            const className = Tools.Instantiate("BABYLON.GUI." + serializedObject.backgroundGradient.className);
            this.backgroundGradient = new className();
            this.backgroundGradient.parse(serializedObject.backgroundGradient);
        }
    }
}
__decorate([
    serialize()
], Slider.prototype, "displayValueBar", null);
__decorate([
    serialize()
], Slider.prototype, "borderColor", null);
__decorate([
    serialize()
], Slider.prototype, "background", null);
__decorate([
    serialize()
], Slider.prototype, "thumbColor", null);
__decorate([
    serialize()
], Slider.prototype, "isThumbCircle", null);
RegisterClass("BABYLON.GUI.Slider", Slider);
//# sourceMappingURL=slider.js.map