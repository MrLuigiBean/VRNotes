import { __decorate } from "@babylonjs/core/tslib.es6.js";
import { Observable } from "@babylonjs/core/Misc/observable.js";
import { Control } from "./control.js";
import { StackPanel } from "./stackPanel.js";
import { TextBlock } from "./textBlock.js";
import { RegisterClass } from "@babylonjs/core/Misc/typeStore.js";
import { serialize } from "@babylonjs/core/Misc/decorators.js";
/**
 * Class used to represent a 2D checkbox
 */
export class Checkbox extends Control {
    /** Gets or sets border thickness  */
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
    }
    /**
     * Creates a new CheckBox
     * @param name defines the control name
     */
    constructor(name) {
        super(name);
        this.name = name;
        this._isChecked = false;
        this._background = "black";
        this._checkSizeRatio = 0.8;
        this._thickness = 1;
        /**
         * Observable raised when isChecked property changes
         */
        this.onIsCheckedChangedObservable = new Observable();
        this.isPointerBlocker = true;
    }
    _getTypeName() {
        return "Checkbox";
    }
    /**
     * @internal
     */
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
        context.fillStyle = this._isEnabled ? this._background : this._disabledColor;
        context.fillRect(this._currentMeasure.left + this._thickness / 2, this._currentMeasure.top + this._thickness / 2, actualWidth, actualHeight);
        if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
            context.shadowBlur = 0;
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
        }
        if (this._isChecked) {
            context.fillStyle = this._isEnabled ? this.color : this._disabledColorItem;
            const offsetWidth = actualWidth * this._checkSizeRatio;
            const offsetHeight = actualHeight * this._checkSizeRatio;
            context.fillRect(this._currentMeasure.left + this._thickness / 2 + (actualWidth - offsetWidth) / 2, this._currentMeasure.top + this._thickness / 2 + (actualHeight - offsetHeight) / 2, offsetWidth, offsetHeight);
        }
        context.strokeStyle = this.color;
        context.lineWidth = this._thickness;
        context.strokeRect(this._currentMeasure.left + this._thickness / 2, this._currentMeasure.top + this._thickness / 2, actualWidth, actualHeight);
        context.restore();
    }
    // Events
    /**
     * @internal
     */
    _onPointerDown(target, coordinates, pointerId, buttonIndex, pi) {
        if (!super._onPointerDown(target, coordinates, pointerId, buttonIndex, pi)) {
            return false;
        }
        if (!this.isReadOnly) {
            this.isChecked = !this.isChecked;
        }
        return true;
    }
    /**
     * Utility function to easily create a checkbox with a header
     * @param title defines the label to use for the header
     * @param onValueChanged defines the callback to call when value changes
     * @returns a StackPanel containing the checkbox and a textBlock
     */
    static AddCheckBoxWithHeader(title, onValueChanged) {
        const panel = new StackPanel();
        panel.isVertical = false;
        panel.height = "30px";
        const checkbox = new Checkbox();
        checkbox.width = "20px";
        checkbox.height = "20px";
        checkbox.isChecked = true;
        checkbox.color = "green";
        checkbox.onIsCheckedChangedObservable.add(onValueChanged);
        panel.addControl(checkbox);
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
], Checkbox.prototype, "thickness", null);
__decorate([
    serialize()
], Checkbox.prototype, "checkSizeRatio", null);
__decorate([
    serialize()
], Checkbox.prototype, "background", null);
__decorate([
    serialize()
], Checkbox.prototype, "isChecked", null);
RegisterClass("BABYLON.GUI.Checkbox", Checkbox);
//# sourceMappingURL=checkbox.js.map