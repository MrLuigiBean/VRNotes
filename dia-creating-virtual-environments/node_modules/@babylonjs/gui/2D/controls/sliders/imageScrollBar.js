import { __decorate } from "@babylonjs/core/tslib.es6.js";
import { BaseSlider } from "./baseSlider.js";
import { Measure } from "../../measure.js";
import { serialize } from "@babylonjs/core/Misc/decorators.js";
/**
 * Class used to create slider controls
 */
export class ImageScrollBar extends BaseSlider {
    /** Inverts the scrolling direction (default: false) */
    get invertScrollDirection() {
        return this._invertScrollDirection;
    }
    set invertScrollDirection(invert) {
        this._invertScrollDirection = invert;
    }
    /**
     * Gets or sets the image used to render the background for horizontal bar
     */
    get backgroundImage() {
        return this._backgroundBaseImage;
    }
    set backgroundImage(value) {
        if (this._backgroundBaseImage === value) {
            return;
        }
        this._backgroundBaseImage = value;
        if (this.isVertical && this.num90RotationInVerticalMode !== 0) {
            if (!value.isLoaded) {
                value.onImageLoadedObservable.addOnce(() => {
                    const rotatedValue = value._rotate90(this.num90RotationInVerticalMode, true);
                    this._backgroundImage = rotatedValue;
                    if (!rotatedValue.isLoaded) {
                        rotatedValue.onImageLoadedObservable.addOnce(() => {
                            this._markAsDirty();
                        });
                    }
                    this._markAsDirty();
                });
            }
            else {
                this._backgroundImage = value._rotate90(this.num90RotationInVerticalMode, true);
                this._markAsDirty();
            }
        }
        else {
            this._backgroundImage = value;
            if (value && !value.isLoaded) {
                value.onImageLoadedObservable.addOnce(() => {
                    this._markAsDirty();
                });
            }
            this._markAsDirty();
        }
    }
    /**
     * Gets or sets the image used to render the thumb
     */
    get thumbImage() {
        return this._thumbBaseImage;
    }
    set thumbImage(value) {
        if (this._thumbBaseImage === value) {
            return;
        }
        this._thumbBaseImage = value;
        if (this.isVertical && this.num90RotationInVerticalMode !== 0) {
            if (!value.isLoaded) {
                value.onImageLoadedObservable.addOnce(() => {
                    const rotatedValue = value._rotate90(-this.num90RotationInVerticalMode, true);
                    this._thumbImage = rotatedValue;
                    if (!rotatedValue.isLoaded) {
                        rotatedValue.onImageLoadedObservable.addOnce(() => {
                            this._markAsDirty();
                        });
                    }
                    this._markAsDirty();
                });
            }
            else {
                this._thumbImage = value._rotate90(-this.num90RotationInVerticalMode, true);
                this._markAsDirty();
            }
        }
        else {
            this._thumbImage = value;
            if (value && !value.isLoaded) {
                value.onImageLoadedObservable.addOnce(() => {
                    this._markAsDirty();
                });
            }
            this._markAsDirty();
        }
    }
    /**
     * Gets or sets the length of the thumb
     */
    get thumbLength() {
        return this._thumbLength;
    }
    set thumbLength(value) {
        if (this._thumbLength === value) {
            return;
        }
        this._thumbLength = value;
        this._markAsDirty();
    }
    /**
     * Gets or sets the height of the thumb
     */
    get thumbHeight() {
        return this._thumbHeight;
    }
    set thumbHeight(value) {
        if (this._thumbLength === value) {
            return;
        }
        this._thumbHeight = value;
        this._markAsDirty();
    }
    /**
     * Gets or sets the height of the bar image
     */
    get barImageHeight() {
        return this._barImageHeight;
    }
    set barImageHeight(value) {
        if (this._barImageHeight === value) {
            return;
        }
        this._barImageHeight = value;
        this._markAsDirty();
    }
    /**
     * Creates a new ImageScrollBar
     * @param name defines the control name
     */
    constructor(name) {
        super(name);
        this.name = name;
        this._thumbLength = 0.5;
        this._thumbHeight = 1;
        this._barImageHeight = 1;
        this._tempMeasure = new Measure(0, 0, 0, 0);
        this._invertScrollDirection = false;
        /** Number of 90° rotation to apply on the images when in vertical mode */
        this.num90RotationInVerticalMode = 1;
    }
    _getTypeName() {
        return "ImageScrollBar";
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
    _draw(context) {
        context.save();
        this._applyStates(context);
        this._prepareRenderingData("rectangle");
        const thumbPosition = this._getThumbPosition();
        const left = this._renderLeft;
        const top = this._renderTop;
        const width = this._renderWidth;
        const height = this._renderHeight;
        // Background
        if (this._backgroundImage) {
            this._tempMeasure.copyFromFloats(left, top, width, height);
            if (this.isVertical) {
                this._tempMeasure.copyFromFloats(left + width * (1 - this._barImageHeight) * 0.5, this._currentMeasure.top, width * this._barImageHeight, height);
                this._tempMeasure.height += this._effectiveThumbThickness;
                this._backgroundImage._currentMeasure.copyFrom(this._tempMeasure);
            }
            else {
                this._tempMeasure.copyFromFloats(this._currentMeasure.left, top + height * (1 - this._barImageHeight) * 0.5, width, height * this._barImageHeight);
                this._tempMeasure.width += this._effectiveThumbThickness;
                this._backgroundImage._currentMeasure.copyFrom(this._tempMeasure);
            }
            this._backgroundImage._draw(context);
        }
        // Thumb
        if (this.isVertical) {
            this._tempMeasure.copyFromFloats(left - this._effectiveBarOffset + this._currentMeasure.width * (1 - this._thumbHeight) * 0.5, this._currentMeasure.top + thumbPosition, this._currentMeasure.width * this._thumbHeight, this._effectiveThumbThickness);
        }
        else {
            this._tempMeasure.copyFromFloats(this._currentMeasure.left + thumbPosition, this._currentMeasure.top + this._currentMeasure.height * (1 - this._thumbHeight) * 0.5, this._effectiveThumbThickness, this._currentMeasure.height * this._thumbHeight);
        }
        if (this._thumbImage) {
            this._thumbImage._currentMeasure.copyFrom(this._tempMeasure);
            this._thumbImage._draw(context);
        }
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
}
__decorate([
    serialize()
], ImageScrollBar.prototype, "num90RotationInVerticalMode", void 0);
__decorate([
    serialize()
], ImageScrollBar.prototype, "invertScrollDirection", null);
//# sourceMappingURL=imageScrollBar.js.map