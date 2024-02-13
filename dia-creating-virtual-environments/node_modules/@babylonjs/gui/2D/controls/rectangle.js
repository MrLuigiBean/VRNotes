import { __decorate } from "@babylonjs/core/tslib.es6.js";
import { Container } from "./container.js";
import { RegisterClass } from "@babylonjs/core/Misc/typeStore.js";
import { serialize } from "@babylonjs/core/Misc/decorators.js";
/** Class used to create rectangle container */
export class Rectangle extends Container {
    /** Gets or sets border thickness */
    get thickness() {
        return this._thickness;
    }
    set thickness(value) {
        if (this._thickness === value) {
            return;
        }
        this._thickness = value;
        this._markAsDirty();
    }
    /** Gets or sets the corner radius of all angles */
    get cornerRadius() {
        return this._cornerRadius[0];
    }
    set cornerRadius(value) {
        if (value < 0) {
            value = 0;
        }
        if (this._cornerRadius[0] === value && this._cornerRadius[1] === value && this._cornerRadius[2] === value && this._cornerRadius[3] === value) {
            return;
        }
        this._cornerRadius[0] = this._cornerRadius[1] = this._cornerRadius[2] = this._cornerRadius[3] = value;
        this._markAsDirty();
    }
    /** Gets or sets the corner radius top left angle */
    get cornerRadiusX() {
        return this._cornerRadius[0];
    }
    set cornerRadiusX(value) {
        if (this._cornerRadius[0] === value) {
            return;
        }
        this._cornerRadius[0] = value;
    }
    /** Gets or sets the corner radius top right angle */
    get cornerRadiusY() {
        return this._cornerRadius[1];
    }
    set cornerRadiusY(value) {
        if (this._cornerRadius[1] === value) {
            return;
        }
        this._cornerRadius[1] = value;
    }
    /** Gets or sets the corner radius bottom left angle */
    get cornerRadiusZ() {
        return this._cornerRadius[2];
    }
    set cornerRadiusZ(value) {
        if (this._cornerRadius[2] === value) {
            return;
        }
        this._cornerRadius[2] = value;
    }
    /** Gets or sets the corner radius bottom right angle */
    get cornerRadiusW() {
        return this._cornerRadius[3];
    }
    set cornerRadiusW(value) {
        if (this._cornerRadius[3] === value) {
            return;
        }
        this._cornerRadius[3] = value;
    }
    /**
     * Creates a new Rectangle
     * @param name defines the control name
     */
    constructor(name) {
        super(name);
        this.name = name;
        this._thickness = 1;
        this._cornerRadius = [0, 0, 0, 0];
        this._cachedRadius = [0, 0, 0, 0];
    }
    _getTypeName() {
        return "Rectangle";
    }
    /** @internal */
    _computeAdditionalOffsetX() {
        let additionalWidth = 0;
        if (this._cornerRadius[0] !== 0 || this._cornerRadius[1] !== 0 || this._cornerRadius[2] !== 0 || this._cornerRadius[3] !== 0) {
            // Take in account the aliasing
            additionalWidth += 1;
        }
        if (this.thickness) {
            additionalWidth += this.thickness / 2;
        }
        return additionalWidth;
    }
    /** @internal */
    _computeAdditionalOffsetY() {
        let additionalHeight = 0;
        if (this._cornerRadius[0] !== 0 || this._cornerRadius[1] !== 0 || this._cornerRadius[2] !== 0 || this._cornerRadius[3] !== 0) {
            // Take in account the aliasing
            additionalHeight += 1;
        }
        if (this.thickness) {
            additionalHeight += this.thickness / 2;
        }
        return additionalHeight;
    }
    _getRectangleFill(context) {
        return this._getBackgroundColor(context);
    }
    _localDraw(context) {
        context.save();
        if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
            context.shadowColor = this.shadowColor;
            context.shadowBlur = this.shadowBlur;
            context.shadowOffsetX = this.shadowOffsetX;
            context.shadowOffsetY = this.shadowOffsetY;
        }
        if (this._background || this._backgroundGradient) {
            context.fillStyle = this._getRectangleFill(context);
            if (this._cornerRadius[0] !== 0 || this._cornerRadius[1] !== 0 || this._cornerRadius[2] !== 0 || this._cornerRadius[3] !== 0) {
                this._drawRoundedRect(context, this._thickness / 2);
                context.fill();
            }
            else {
                context.fillRect(this._currentMeasure.left, this._currentMeasure.top, this._currentMeasure.width, this._currentMeasure.height);
            }
        }
        if (this._thickness) {
            if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
                context.shadowBlur = 0;
                context.shadowOffsetX = 0;
                context.shadowOffsetY = 0;
            }
            if (this.color || this.gradient) {
                context.strokeStyle = this.gradient ? this.gradient.getCanvasGradient(context) : this.color;
            }
            context.lineWidth = this._thickness;
            if (this._cornerRadius[0] !== 0 || this._cornerRadius[1] !== 0 || this._cornerRadius[2] !== 0 || this._cornerRadius[3] !== 0) {
                this._drawRoundedRect(context, this._thickness / 2);
                context.stroke();
            }
            else {
                context.strokeRect(this._currentMeasure.left + this._thickness / 2, this._currentMeasure.top + this._thickness / 2, this._currentMeasure.width - this._thickness, this._currentMeasure.height - this._thickness);
            }
        }
        context.restore();
    }
    _additionalProcessing(parentMeasure, context) {
        super._additionalProcessing(parentMeasure, context);
        this._measureForChildren.width -= 2 * this._thickness;
        this._measureForChildren.height -= 2 * this._thickness;
        this._measureForChildren.left += this._thickness;
        this._measureForChildren.top += this._thickness;
    }
    _drawRoundedRect(context, offset = 0) {
        const x = this._currentMeasure.left + offset;
        const y = this._currentMeasure.top + offset;
        const width = this._currentMeasure.width - offset * 2;
        const height = this._currentMeasure.height - offset * 2;
        for (let index = 0; index < this._cornerRadius.length; index++) {
            this._cachedRadius[index] = Math.abs(Math.min(height / 2, Math.min(width / 2, this._cornerRadius[index])));
        }
        context.beginPath();
        context.moveTo(x + this._cachedRadius[0], y);
        context.lineTo(x + width - this._cachedRadius[1], y);
        context.arc(x + width - this._cachedRadius[1], y + this._cachedRadius[1], this._cachedRadius[1], (3 * Math.PI) / 2, Math.PI * 2);
        context.lineTo(x + width, y + height - this._cachedRadius[2]);
        context.arc(x + width - this._cachedRadius[2], y + height - this._cachedRadius[2], this._cachedRadius[2], 0, Math.PI / 2);
        context.lineTo(x + this._cachedRadius[3], y + height);
        context.arc(x + this._cachedRadius[3], y + height - this._cachedRadius[3], this._cachedRadius[3], Math.PI / 2, Math.PI);
        context.lineTo(x, y + this._cachedRadius[0]);
        context.arc(x + this._cachedRadius[0], y + this._cachedRadius[0], this._cachedRadius[0], Math.PI, (3 * Math.PI) / 2);
        context.closePath();
    }
    _clipForChildren(context) {
        if (this._cornerRadius[0] !== 0 || this._cornerRadius[1] !== 0 || this._cornerRadius[2] !== 0 || this._cornerRadius[3] !== 0) {
            this._drawRoundedRect(context, this._thickness);
            context.clip();
        }
    }
}
__decorate([
    serialize()
], Rectangle.prototype, "thickness", null);
__decorate([
    serialize()
], Rectangle.prototype, "cornerRadius", null);
__decorate([
    serialize()
], Rectangle.prototype, "cornerRadiusX", null);
__decorate([
    serialize()
], Rectangle.prototype, "cornerRadiusY", null);
__decorate([
    serialize()
], Rectangle.prototype, "cornerRadiusZ", null);
__decorate([
    serialize()
], Rectangle.prototype, "cornerRadiusW", null);
RegisterClass("BABYLON.GUI.Rectangle", Rectangle);
//# sourceMappingURL=rectangle.js.map