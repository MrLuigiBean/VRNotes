import { __decorate } from "@babylonjs/core/tslib.es6.js";
import { Control } from "./control.js";
import { RegisterClass } from "@babylonjs/core/Misc/typeStore.js";
import { serialize } from "@babylonjs/core/Misc/decorators.js";
/** Class used to render a grid  */
export class DisplayGrid extends Control {
    /** Gets or sets a boolean indicating if minor lines must be rendered (true by default)) */
    get displayMinorLines() {
        return this._displayMinorLines;
    }
    set displayMinorLines(value) {
        if (this._displayMinorLines === value) {
            return;
        }
        this._displayMinorLines = value;
        this._markAsDirty();
    }
    /** Gets or sets a boolean indicating if major lines must be rendered (true by default)) */
    get displayMajorLines() {
        return this._displayMajorLines;
    }
    set displayMajorLines(value) {
        if (this._displayMajorLines === value) {
            return;
        }
        this._displayMajorLines = value;
        this._markAsDirty();
    }
    /** Gets or sets background color (Black by default) */
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
    /** Gets or sets the width of each cell (20 by default) */
    get cellWidth() {
        return this._cellWidth;
    }
    set cellWidth(value) {
        this._cellWidth = value;
        this._markAsDirty();
    }
    /** Gets or sets the height of each cell (20 by default) */
    get cellHeight() {
        return this._cellHeight;
    }
    set cellHeight(value) {
        this._cellHeight = value;
        this._markAsDirty();
    }
    /** Gets or sets the tickness of minor lines (1 by default) */
    get minorLineTickness() {
        return this._minorLineTickness;
    }
    set minorLineTickness(value) {
        this._minorLineTickness = value;
        this._markAsDirty();
    }
    /** Gets or sets the color of minor lines (DarkGray by default) */
    get minorLineColor() {
        return this._minorLineColor;
    }
    set minorLineColor(value) {
        this._minorLineColor = value;
        this._markAsDirty();
    }
    /** Gets or sets the tickness of major lines (2 by default) */
    get majorLineTickness() {
        return this._majorLineTickness;
    }
    set majorLineTickness(value) {
        this._majorLineTickness = value;
        this._markAsDirty();
    }
    /** Gets or sets the color of major lines (White by default) */
    get majorLineColor() {
        return this._majorLineColor;
    }
    set majorLineColor(value) {
        this._majorLineColor = value;
        this._markAsDirty();
    }
    /** Gets or sets the frequency of major lines (default is 1 every 5 minor lines)*/
    get majorLineFrequency() {
        return this._majorLineFrequency;
    }
    set majorLineFrequency(value) {
        this._majorLineFrequency = value;
        this._markAsDirty();
    }
    /**
     * Creates a new GridDisplayRectangle
     * @param name defines the control name
     */
    constructor(name) {
        super(name);
        this.name = name;
        this._cellWidth = 20;
        this._cellHeight = 20;
        this._minorLineTickness = 1;
        this._minorLineColor = "DarkGray";
        this._majorLineTickness = 2;
        this._majorLineColor = "White";
        this._majorLineFrequency = 5;
        this._background = "Black";
        this._displayMajorLines = true;
        this._displayMinorLines = true;
    }
    _draw(context) {
        context.save();
        this._applyStates(context);
        if (this._isEnabled) {
            if (this._background) {
                context.fillStyle = this._background;
                context.fillRect(this._currentMeasure.left, this._currentMeasure.top, this._currentMeasure.width, this._currentMeasure.height);
            }
            const cellCountX = this._currentMeasure.width / this._cellWidth;
            const cellCountY = this._currentMeasure.height / this._cellHeight;
            // Minor lines
            const left = this._currentMeasure.left + this._currentMeasure.width / 2;
            const top = this._currentMeasure.top + this._currentMeasure.height / 2;
            if (this._displayMinorLines) {
                context.strokeStyle = this._minorLineColor;
                context.lineWidth = this._minorLineTickness;
                for (let x = -cellCountX / 2 + 1; x < cellCountX / 2; x++) {
                    const cellX = left + x * this.cellWidth;
                    context.beginPath();
                    context.moveTo(cellX, this._currentMeasure.top);
                    context.lineTo(cellX, this._currentMeasure.top + this._currentMeasure.height);
                    context.stroke();
                }
                for (let y = -cellCountY / 2 + 1; y < cellCountY / 2; y++) {
                    const cellY = top + y * this.cellHeight;
                    context.beginPath();
                    context.moveTo(this._currentMeasure.left, cellY);
                    context.lineTo(this._currentMeasure.left + this._currentMeasure.width, cellY);
                    context.stroke();
                }
            }
            // Major lines
            if (this._displayMajorLines) {
                context.strokeStyle = this._majorLineColor;
                context.lineWidth = this._majorLineTickness;
                for (let x = -cellCountX / 2 + this._majorLineFrequency; x < cellCountX / 2; x += this._majorLineFrequency) {
                    const cellX = left + x * this.cellWidth;
                    context.beginPath();
                    context.moveTo(cellX, this._currentMeasure.top);
                    context.lineTo(cellX, this._currentMeasure.top + this._currentMeasure.height);
                    context.stroke();
                }
                for (let y = -cellCountY / 2 + this._majorLineFrequency; y < cellCountY / 2; y += this._majorLineFrequency) {
                    const cellY = top + y * this.cellHeight;
                    context.moveTo(this._currentMeasure.left, cellY);
                    context.lineTo(this._currentMeasure.left + this._currentMeasure.width, cellY);
                    context.closePath();
                    context.stroke();
                }
            }
        }
        context.restore();
    }
    _getTypeName() {
        return "DisplayGrid";
    }
}
__decorate([
    serialize()
], DisplayGrid.prototype, "displayMinorLines", null);
__decorate([
    serialize()
], DisplayGrid.prototype, "displayMajorLines", null);
__decorate([
    serialize()
], DisplayGrid.prototype, "background", null);
__decorate([
    serialize()
], DisplayGrid.prototype, "cellWidth", null);
__decorate([
    serialize()
], DisplayGrid.prototype, "cellHeight", null);
__decorate([
    serialize()
], DisplayGrid.prototype, "minorLineTickness", null);
__decorate([
    serialize()
], DisplayGrid.prototype, "minorLineColor", null);
__decorate([
    serialize()
], DisplayGrid.prototype, "majorLineTickness", null);
__decorate([
    serialize()
], DisplayGrid.prototype, "majorLineColor", null);
__decorate([
    serialize()
], DisplayGrid.prototype, "majorLineFrequency", null);
RegisterClass("BABYLON.GUI.DisplayGrid", DisplayGrid);
//# sourceMappingURL=displayGrid.js.map