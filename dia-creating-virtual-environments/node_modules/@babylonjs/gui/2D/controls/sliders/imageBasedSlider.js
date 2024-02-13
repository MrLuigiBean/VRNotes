import { __decorate } from "@babylonjs/core/tslib.es6.js";
import { BaseSlider } from "./baseSlider.js";
import { Measure } from "../../measure.js";
import { Image } from "../image.js";
import { RegisterClass } from "@babylonjs/core/Misc/typeStore.js";
import { serialize } from "@babylonjs/core/Misc/decorators.js";
/**
 * Class used to create slider controls based on images
 */
export class ImageBasedSlider extends BaseSlider {
    get displayThumb() {
        return this._displayThumb && this.thumbImage != null;
    }
    set displayThumb(value) {
        if (this._displayThumb === value) {
            return;
        }
        this._displayThumb = value;
        this._markAsDirty();
    }
    /**
     * Gets or sets the image used to render the background
     */
    get backgroundImage() {
        return this._backgroundImage;
    }
    set backgroundImage(value) {
        if (this._backgroundImage === value) {
            return;
        }
        this._backgroundImage = value;
        if (value && !value.isLoaded) {
            value.onImageLoadedObservable.addOnce(() => this._markAsDirty());
        }
        this._markAsDirty();
    }
    /**
     * Gets or sets the image used to render the value bar
     */
    get valueBarImage() {
        return this._valueBarImage;
    }
    set valueBarImage(value) {
        if (this._valueBarImage === value) {
            return;
        }
        this._valueBarImage = value;
        if (value && !value.isLoaded) {
            value.onImageLoadedObservable.addOnce(() => this._markAsDirty());
        }
        this._markAsDirty();
    }
    /**
     * Gets or sets the image used to render the thumb
     */
    get thumbImage() {
        return this._thumbImage;
    }
    set thumbImage(value) {
        if (this._thumbImage === value) {
            return;
        }
        this._thumbImage = value;
        if (value && !value.isLoaded) {
            value.onImageLoadedObservable.addOnce(() => this._markAsDirty());
        }
        this._markAsDirty();
    }
    /**
     * Creates a new ImageBasedSlider
     * @param name defines the control name
     */
    constructor(name) {
        super(name);
        this.name = name;
        this._tempMeasure = new Measure(0, 0, 0, 0);
    }
    _getTypeName() {
        return "ImageBasedSlider";
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
            if (this.isThumbClamped && this.displayThumb) {
                if (this.isVertical) {
                    this._tempMeasure.height += this._effectiveThumbThickness;
                }
                else {
                    this._tempMeasure.width += this._effectiveThumbThickness;
                }
            }
            this._backgroundImage._currentMeasure.copyFrom(this._tempMeasure);
            this._backgroundImage._draw(context);
        }
        // Bar
        if (this._valueBarImage) {
            if (this.isVertical) {
                if (this.isThumbClamped && this.displayThumb) {
                    this._tempMeasure.copyFromFloats(left, top + thumbPosition, width, height - thumbPosition + this._effectiveThumbThickness);
                }
                else {
                    this._tempMeasure.copyFromFloats(left, top + thumbPosition, width, height - thumbPosition);
                }
            }
            else {
                if (this.isThumbClamped && this.displayThumb) {
                    this._tempMeasure.copyFromFloats(left, top, thumbPosition + this._effectiveThumbThickness / 2, height);
                }
                else {
                    this._tempMeasure.copyFromFloats(left, top, thumbPosition, height);
                }
            }
            this._valueBarImage._currentMeasure.copyFrom(this._tempMeasure);
            this._valueBarImage._draw(context);
        }
        // Thumb
        if (this.displayThumb) {
            if (this.isVertical) {
                this._tempMeasure.copyFromFloats(left - this._effectiveBarOffset, this._currentMeasure.top + thumbPosition, this._currentMeasure.width, this._effectiveThumbThickness);
            }
            else {
                this._tempMeasure.copyFromFloats(this._currentMeasure.left + thumbPosition, this._currentMeasure.top, this._effectiveThumbThickness, this._currentMeasure.height);
            }
            this._thumbImage._currentMeasure.copyFrom(this._tempMeasure);
            this._thumbImage._draw(context);
        }
        context.restore();
    }
    /**
     * Serializes the current control
     * @param serializationObject defined the JSON serialized object
     */
    serialize(serializationObject) {
        super.serialize(serializationObject);
        const backgroundImage = {};
        const thumbImage = {};
        const valueBarImage = {};
        this.backgroundImage.serialize(backgroundImage);
        this.thumbImage.serialize(thumbImage);
        this.valueBarImage.serialize(valueBarImage);
        serializationObject.backgroundImage = backgroundImage;
        serializationObject.thumbImage = thumbImage;
        serializationObject.valueBarImage = valueBarImage;
    }
    /**
     * @internal
     */
    _parseFromContent(serializedObject, host) {
        super._parseFromContent(serializedObject, host);
        this.backgroundImage = Image.Parse(serializedObject.backgroundImage, host);
        this.thumbImage = Image.Parse(serializedObject.thumbImage, host);
        this.valueBarImage = Image.Parse(serializedObject.valueBarImage, host);
    }
}
__decorate([
    serialize()
], ImageBasedSlider.prototype, "displayThumb", null);
RegisterClass("BABYLON.GUI.ImageBasedSlider", ImageBasedSlider);
//# sourceMappingURL=imageBasedSlider.js.map