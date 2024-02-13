import { __decorate } from "@babylonjs/core/tslib.es6.js";
import { Observable } from "@babylonjs/core/Misc/observable.js";
import { Control } from "./control.js";
import { StackPanel } from "./stackPanel.js";
import { TextBlock } from "./textBlock.js";
import { RegisterClass } from "@babylonjs/core/Misc/typeStore.js";
import { serialize } from "@babylonjs/core/Misc/decorators.js";
/**
 * Class used to create radio button controls
 */
export class RadioButton extends Control {
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
    /** Gets or sets a value indicating the ratio between overall size and check size */
    get checkSizeRatio() {
        return this._checkSizeRatio;
    }
    set checkSizeRatio(value) {
        value = Math.max(Math.min(1, value), 0);
        if (this._checkSizeRatio === value) {
            return;
        }
        this._checkSizeRatio = value;
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
    /** Gets or sets a boolean indicating if the checkbox is checked or not */
    get isChecked() {
        return this._isChecked;
    }
    set isChecked(value) {
        if (this._isChecked === value) {
            return;
        }
        this._isChecked = value;
        this._markAsDirty();
        this.onIsCheckedChangedObservable.notifyObservers(value);
        if (this._isChecked && this._host) {
            // Update all controls from same group
            this._host.executeOnAllControls((control) => {
                if (control === this) {
                    return;
                }
                if (control.group === undefined) {
                    return;
                }
                const childRadio = control;
                if (childRadio.group === this.group) {
                    childRadio.isChecked = false;
                }
            });
        }
    }
    /**
     * Creates a new RadioButton
     * @param name defines the control name
     */
    constructor(name) {
        super(name);
        this.name = name;
        this._isChecked = false;
        this._background = "black";
        this._checkSizeRatio = 0.8;
        this._thickness = 1;
        /** Gets or sets group name */
        this.group = "";
        /** Observable raised when isChecked is changed */
        this.onIsCheckedChangedObservable = new Observable();
        this.isPointerBlocker = true;
    }
    _getTypeName() {
        return "RadioButton";
    }
    _draw(context) {
        context.save();
        this._applyStates(context);
        const actualWidth = this._currentMeasure.width - this._thickness;
        const actualHeight = this._currentMeasure.height - this._thickness;
        if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
            context.shadowColor = this.shadowColor;
            context.shadowBlur = this.shadowBlur;
            context.shadowOffsetX = this.shadowOffsetX;
            context.shadowOffsetY = this.shadowOffsetY;
        }
        // Outer
        Control.drawEllipse(this._currentMeasure.left + this._currentMeasure.width / 2, this._currentMeasure.top + this._currentMeasure.height / 2, this._currentMeasure.width / 2 - this._thickness / 2, this._currentMeasure.height / 2 - this._thickness / 2, context);
        context.fillStyle = this._isEnabled ? this._background : this._disabledColor;
        context.fill();
        if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
            context.shadowBlur = 0;
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
        }
        context.strokeStyle = this.color;
        context.lineWidth = this._thickness;
        context.stroke();
        // Inner
        if (this._isChecked) {
            context.fillStyle = this._isEnabled ? this.color : this._disabledColor;
            const offsetWidth = actualWidth * this._checkSizeRatio;
            const offseHeight = actualHeight * this._checkSizeRatio;
            Control.drawEllipse(this._currentMeasure.left + this._currentMeasure.width / 2, this._currentMeasure.top + this._currentMeasure.height / 2, offsetWidth / 2 - this._thickness / 2, offseHeight / 2 - this._thickness / 2, context);
            context.fill();
        }
        context.restore();
    }
    // Events
    _onPointerDown(target, coordinates, pointerId, buttonIndex, pi) {
        if (!super._onPointerDown(target, coordinates, pointerId, buttonIndex, pi)) {
            return false;
        }
        if (this.isReadOnly) {
            return true;
        }
        if (!this.isChecked) {
            this.isChecked = true;
        }
        return true;
    }
    /**
     * Utility function to easily create a radio button with a header
     * @param title defines the label to use for the header
     * @param group defines the group to use for the radio button
     * @param isChecked defines the initial state of the radio button
     * @param onValueChanged defines the callback to call when value changes
     * @returns a StackPanel containing the radio button and a textBlock
     */
    static AddRadioButtonWithHeader(title, group, isChecked, onValueChanged) {
        const panel = new StackPanel();
        panel.isVertical = false;
        panel.height = "30px";
        const radio = new RadioButton();
        radio.width = "20px";
        radio.height = "20px";
        radio.isChecked = isChecked;
        radio.color = "green";
        radio.group = group;
        radio.onIsCheckedChangedObservable.add((value) => onValueChanged(radio, value));
        panel.addControl(radio);
        const header = new TextBlock();
        header.text = title;
        header.width = "180px";
        header.paddingLeft = "5px";
        header.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        header.color = "white";
        panel.addControl(header);
        return panel;
    }
}
__decorate([
    serialize()
], RadioButton.prototype, "thickness", null);
__decorate([
    serialize()
], RadioButton.prototype, "group", void 0);
__decorate([
    serialize()
], RadioButton.prototype, "checkSizeRatio", null);
__decorate([
    serialize()
], RadioButton.prototype, "background", null);
__decorate([
    serialize()
], RadioButton.prototype, "isChecked", null);
RegisterClass("BABYLON.GUI.RadioButton", RadioButton);
//# sourceMappingURL=radioButton.js.map