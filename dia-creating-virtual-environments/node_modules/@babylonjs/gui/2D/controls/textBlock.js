import { __decorate } from "@babylonjs/core/tslib.es6.js";
import { Observable } from "@babylonjs/core/Misc/observable.js";
import { ValueAndUnit } from "../valueAndUnit.js";
import { Control } from "./control.js";
import { RegisterClass } from "@babylonjs/core/Misc/typeStore.js";
import { serialize } from "@babylonjs/core/Misc/decorators.js";
import { EngineStore } from "@babylonjs/core/Engines/engineStore.js";
/**
 * Enum that determines the text-wrapping mode to use.
 */
export var TextWrapping;
(function (TextWrapping) {
    /**
     * Clip the text when it's larger than Control.width; this is the default mode.
     */
    TextWrapping[TextWrapping["Clip"] = 0] = "Clip";
    /**
     * Wrap the text word-wise, i.e. try to add line-breaks at word boundary to fit within Control.width.
     */
    TextWrapping[TextWrapping["WordWrap"] = 1] = "WordWrap";
    /**
     * Ellipsize the text, i.e. shrink with trailing … when text is larger than Control.width.
     */
    TextWrapping[TextWrapping["Ellipsis"] = 2] = "Ellipsis";
    /**
     * Wrap the text word-wise and clip the text when the text's height is larger than the Control.height, and shrink the last line with trailing … .
     */
    TextWrapping[TextWrapping["WordWrapEllipsis"] = 3] = "WordWrapEllipsis";
})(TextWrapping || (TextWrapping = {}));
/**
 * Class used to create text block control
 */
export class TextBlock extends Control {
    /**
     * Return the line list (you may need to use the onLinesReadyObservable to make sure the list is ready)
     */
    get lines() {
        return this._lines;
    }
    /**
     * Gets or sets a boolean indicating that the TextBlock will be resized to fit its content

     */
    get resizeToFit() {
        return this._resizeToFit;
    }
    /**
     * Gets or sets a boolean indicating that the TextBlock will be resized to fit its content

     */
    set resizeToFit(value) {
        if (this._resizeToFit === value) {
            return;
        }
        this._resizeToFit = value;
        if (this._resizeToFit) {
            this._width.ignoreAdaptiveScaling = true;
            this._height.ignoreAdaptiveScaling = true;
        }
        this._markAsDirty();
    }
    /**
     * Gets or sets a boolean indicating if text must be wrapped
     */
    get textWrapping() {
        return this._textWrapping;
    }
    /**
     * Gets or sets a boolean indicating if text must be wrapped
     */
    set textWrapping(value) {
        if (this._textWrapping === value) {
            return;
        }
        this._textWrapping = +value;
        this._markAsDirty();
    }
    /**
     * Gets or sets text to display
     */
    get text() {
        return this._text;
    }
    /**
     * Gets or sets text to display
     */
    set text(value) {
        if (this._text === value) {
            return;
        }
        this._text = value + ""; // Making sure it is a text
        this._markAsDirty();
        this.onTextChangedObservable.notifyObservers(this);
    }
    /**
     * Gets or sets text horizontal alignment (BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER by default)
     */
    get textHorizontalAlignment() {
        return this._textHorizontalAlignment;
    }
    /**
     * Gets or sets text horizontal alignment (BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER by default)
     */
    set textHorizontalAlignment(value) {
        if (this._textHorizontalAlignment === value) {
            return;
        }
        this._textHorizontalAlignment = value;
        this._markAsDirty();
    }
    /**
     * Gets or sets text vertical alignment (BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER by default)
     */
    get textVerticalAlignment() {
        return this._textVerticalAlignment;
    }
    /**
     * Gets or sets text vertical alignment (BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER by default)
     */
    set textVerticalAlignment(value) {
        if (this._textVerticalAlignment === value) {
            return;
        }
        this._textVerticalAlignment = value;
        this._markAsDirty();
    }
    /**
     * Gets or sets line spacing value
     */
    set lineSpacing(value) {
        if (this._lineSpacing.fromString(value)) {
            this._markAsDirty();
        }
    }
    /**
     * Gets or sets line spacing value
     */
    get lineSpacing() {
        return this._lineSpacing.toString(this._host);
    }
    /**
     * Gets or sets outlineWidth of the text to display
     */
    get outlineWidth() {
        return this._outlineWidth;
    }
    /**
     * Gets or sets outlineWidth of the text to display
     */
    set outlineWidth(value) {
        if (this._outlineWidth === value) {
            return;
        }
        this._outlineWidth = value;
        this._markAsDirty();
    }
    /**
     * Gets or sets a boolean indicating that text must have underline
     */
    get underline() {
        return this._underline;
    }
    /**
     * Gets or sets a boolean indicating that text must have underline
     */
    set underline(value) {
        if (this._underline === value) {
            return;
        }
        this._underline = value;
        this._markAsDirty();
    }
    /**
     * Gets or sets an boolean indicating that text must be crossed out
     */
    get lineThrough() {
        return this._lineThrough;
    }
    /**
     * Gets or sets an boolean indicating that text must be crossed out
     */
    set lineThrough(value) {
        if (this._lineThrough === value) {
            return;
        }
        this._lineThrough = value;
        this._markAsDirty();
    }
    /**
     * If the outline should be applied to the underline/strike-through too. Has different behavior in Edge/Chrome vs Firefox.
     */
    get applyOutlineToUnderline() {
        return this._applyOutlineToUnderline;
    }
    set applyOutlineToUnderline(value) {
        if (this._applyOutlineToUnderline === value) {
            return;
        }
        this._applyOutlineToUnderline = value;
        this._markAsDirty();
    }
    /**
     * Gets or sets outlineColor of the text to display
     */
    get outlineColor() {
        return this._outlineColor;
    }
    /**
     * Gets or sets outlineColor of the text to display
     */
    set outlineColor(value) {
        if (this._outlineColor === value) {
            return;
        }
        this._outlineColor = value;
        this._markAsDirty();
    }
    /**
     * Gets or sets word divider
     */
    get wordDivider() {
        return this._wordDivider;
    }
    /**
     * Gets or sets word divider
     */
    set wordDivider(value) {
        if (this._wordDivider === value) {
            return;
        }
        this._wordDivider = value;
        this._markAsDirty();
    }
    /**
     * By default, if a text block has text wrapping other than Clip, its width
     * is not resized even if resizeToFit = true. This parameter forces the width
     * to be resized.
     */
    get forceResizeWidth() {
        return this._forceResizeWidth;
    }
    set forceResizeWidth(value) {
        if (this._forceResizeWidth === value) {
            return;
        }
        this._forceResizeWidth = value;
        this._markAsDirty();
    }
    /**
     * Creates a new TextBlock object
     * @param name defines the name of the control
     * @param text defines the text to display (empty string by default)
     */
    constructor(
    /**
     * Defines the name of the control
     */
    name, text = "") {
        super(name);
        this.name = name;
        this._text = "";
        this._textWrapping = TextWrapping.Clip;
        this._textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        this._textVerticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
        this._resizeToFit = false;
        this._lineSpacing = new ValueAndUnit(0);
        this._outlineWidth = 0;
        this._outlineColor = "white";
        this._underline = false;
        this._lineThrough = false;
        this._wordDivider = " ";
        this._forceResizeWidth = false;
        this._applyOutlineToUnderline = false;
        /**
         * An event triggered after the text is changed
         */
        this.onTextChangedObservable = new Observable();
        /**
         * An event triggered after the text was broken up into lines
         */
        this.onLinesReadyObservable = new Observable();
        this._linesTemp = [];
        this.text = text;
    }
    _getTypeName() {
        return "TextBlock";
    }
    _processMeasures(parentMeasure, context) {
        if (!this._fontOffset || this.isDirty) {
            this._fontOffset = Control._GetFontOffset(context.font);
        }
        super._processMeasures(parentMeasure, context);
        // Prepare lines
        this._lines = this._breakLines(this._currentMeasure.width, this._currentMeasure.height, context);
        this.onLinesReadyObservable.notifyObservers(this);
        let maxLineWidth = 0;
        for (let i = 0; i < this._lines.length; i++) {
            const line = this._lines[i];
            if (line.width > maxLineWidth) {
                maxLineWidth = line.width;
            }
        }
        if (this._resizeToFit) {
            if (this._textWrapping === TextWrapping.Clip || this._forceResizeWidth) {
                const newWidth = Math.ceil(this._paddingLeftInPixels) + Math.ceil(this._paddingRightInPixels) + Math.ceil(maxLineWidth);
                if (newWidth !== this._width.getValueInPixel(this._host, this._tempParentMeasure.width)) {
                    this._width.updateInPlace(newWidth, ValueAndUnit.UNITMODE_PIXEL);
                    this._rebuildLayout = true;
                }
            }
            let newHeight = (this._paddingTopInPixels + this._paddingBottomInPixels + this._fontOffset.height * this._lines.length) | 0;
            if (this._lines.length > 0 && this._lineSpacing.internalValue !== 0) {
                let lineSpacing = 0;
                if (this._lineSpacing.isPixel) {
                    lineSpacing = this._lineSpacing.getValue(this._host);
                }
                else {
                    lineSpacing = this._lineSpacing.getValue(this._host) * this._height.getValueInPixel(this._host, this._cachedParentMeasure.height);
                }
                newHeight += (this._lines.length - 1) * lineSpacing;
            }
            if (newHeight !== this._height.internalValue) {
                this._height.updateInPlace(newHeight, ValueAndUnit.UNITMODE_PIXEL);
                this._rebuildLayout = true;
            }
        }
    }
    _drawText(text, textWidth, y, context) {
        const width = this._currentMeasure.width;
        let x = 0;
        switch (this._textHorizontalAlignment) {
            case Control.HORIZONTAL_ALIGNMENT_LEFT:
                x = 0;
                break;
            case Control.HORIZONTAL_ALIGNMENT_RIGHT:
                x = width - textWidth;
                break;
            case Control.HORIZONTAL_ALIGNMENT_CENTER:
                x = (width - textWidth) / 2;
                break;
        }
        if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
            context.shadowColor = this.shadowColor;
            context.shadowBlur = this.shadowBlur;
            context.shadowOffsetX = this.shadowOffsetX;
            context.shadowOffsetY = this.shadowOffsetY;
        }
        if (this.outlineWidth) {
            context.strokeText(text, this._currentMeasure.left + x, y);
        }
        context.fillText(text, this._currentMeasure.left + x, y);
        if (this._underline) {
            this._drawLine(this._currentMeasure.left + x, y + 3, this._currentMeasure.left + x + textWidth, y + 3, context);
        }
        if (this._lineThrough) {
            this._drawLine(this._currentMeasure.left + x, y - this.fontSizeInPixels / 3, this._currentMeasure.left + x + textWidth, y - this.fontSizeInPixels / 3, context);
        }
    }
    _drawLine(xFrom, yFrom, xTo, yTo, context) {
        context.beginPath();
        context.lineWidth = Math.round(this.fontSizeInPixels * 0.05);
        context.moveTo(xFrom, yFrom);
        context.lineTo(xTo, yTo);
        if (this.outlineWidth && this.applyOutlineToUnderline) {
            context.stroke();
            context.fill();
        }
        else {
            const currentStroke = context.strokeStyle;
            context.strokeStyle = context.fillStyle;
            context.stroke();
            context.strokeStyle = currentStroke;
        }
        context.closePath();
    }
    /**
     * @internal
     */
    _draw(context) {
        context.save();
        this._applyStates(context);
        // Render lines
        this._renderLines(context);
        context.restore();
    }
    _applyStates(context) {
        super._applyStates(context);
        if (this.outlineWidth) {
            context.lineWidth = this.outlineWidth;
            context.strokeStyle = this.outlineColor;
            context.lineJoin = "miter";
            context.miterLimit = 2;
        }
    }
    _breakLines(refWidth, refHeight, context) {
        this._linesTemp.length = 0;
        const _lines = this.text.split("\n");
        if (this._textWrapping === TextWrapping.Ellipsis) {
            for (const _line of _lines) {
                this._linesTemp.push(this._parseLineEllipsis(_line, refWidth, context));
            }
        }
        else if (this._textWrapping === TextWrapping.WordWrap) {
            for (const _line of _lines) {
                this._linesTemp.push(...this._parseLineWordWrap(_line, refWidth, context));
            }
        }
        else if (this._textWrapping === TextWrapping.WordWrapEllipsis) {
            for (const _line of _lines) {
                this._linesTemp.push(...this._parseLineWordWrapEllipsis(_line, refWidth, refHeight, context));
            }
        }
        else {
            for (const _line of _lines) {
                this._linesTemp.push(this._parseLine(_line, context));
            }
        }
        return this._linesTemp;
    }
    _parseLine(line = "", context) {
        return { text: line, width: this._getTextMetricsWidth(context.measureText(line)) };
    }
    //Calculate how many characters approximately we need to remove
    _getCharsToRemove(lineWidth, width, lineLength) {
        const diff = lineWidth > width ? lineWidth - width : 0;
        // This isn't exact unless the font is monospaced
        const charWidth = lineWidth / lineLength;
        const removeChars = Math.max(Math.floor(diff / charWidth), 1);
        return removeChars;
    }
    _parseLineEllipsis(line = "", width, context) {
        let lineWidth = this._getTextMetricsWidth(context.measureText(line));
        let removeChars = this._getCharsToRemove(lineWidth, width, line.length);
        // unicode support. split('') does not work with unicode!
        // make sure Array.from is available
        const characters = Array.from && Array.from(line);
        if (!characters) {
            // no array.from, use the old method
            while (line.length > 2 && lineWidth > width) {
                line = line.slice(0, -removeChars);
                lineWidth = this._getTextMetricsWidth(context.measureText(line + "…"));
                removeChars = this._getCharsToRemove(lineWidth, width, line.length);
            }
            // Add on the end
            line += "…";
        }
        else {
            while (characters.length && lineWidth > width) {
                characters.splice(characters.length - removeChars, removeChars);
                line = `${characters.join("")}…`;
                lineWidth = this._getTextMetricsWidth(context.measureText(line));
                removeChars = this._getCharsToRemove(lineWidth, width, line.length);
            }
        }
        return { text: line, width: lineWidth };
    }
    _getTextMetricsWidth(textMetrics) {
        if (textMetrics.actualBoundingBoxLeft !== undefined) {
            return Math.abs(textMetrics.actualBoundingBoxLeft) + Math.abs(textMetrics.actualBoundingBoxRight);
        }
        return textMetrics.width;
    }
    _parseLineWordWrap(line = "", width, context) {
        const lines = [];
        const words = this.wordSplittingFunction ? this.wordSplittingFunction(line) : line.split(this._wordDivider);
        let lineWidth = this._getTextMetricsWidth(context.measureText(line));
        for (let n = 0; n < words.length; n++) {
            const testLine = n > 0 ? line + this._wordDivider + words[n] : words[0];
            const testWidth = this._getTextMetricsWidth(context.measureText(testLine));
            if (testWidth > width && n > 0) {
                lines.push({ text: line, width: lineWidth });
                line = words[n];
                lineWidth = this._getTextMetricsWidth(context.measureText(line));
            }
            else {
                lineWidth = testWidth;
                line = testLine;
            }
        }
        lines.push({ text: line, width: lineWidth });
        return lines;
    }
    _parseLineWordWrapEllipsis(line = "", width, height, context) {
        const lines = this._parseLineWordWrap(line, width, context);
        for (let n = 1; n <= lines.length; n++) {
            const currentHeight = this._computeHeightForLinesOf(n);
            if (currentHeight > height && n > 1) {
                const lastLine = lines[n - 2];
                const currentLine = lines[n - 1];
                lines[n - 2] = this._parseLineEllipsis(lastLine.text + this._wordDivider + currentLine.text, width, context);
                const linesToRemove = lines.length - n + 1;
                for (let i = 0; i < linesToRemove; i++) {
                    lines.pop();
                }
                return lines;
            }
        }
        return lines;
    }
    _renderLines(context) {
        if (!this._fontOffset || !this._lines) {
            return;
        }
        const height = this._currentMeasure.height;
        let rootY = 0;
        switch (this._textVerticalAlignment) {
            case Control.VERTICAL_ALIGNMENT_TOP:
                rootY = this._fontOffset.ascent;
                break;
            case Control.VERTICAL_ALIGNMENT_BOTTOM:
                rootY = height - this._fontOffset.height * (this._lines.length - 1) - this._fontOffset.descent;
                break;
            case Control.VERTICAL_ALIGNMENT_CENTER:
                rootY = this._fontOffset.ascent + (height - this._fontOffset.height * this._lines.length) / 2;
                break;
        }
        rootY += this._currentMeasure.top;
        for (let i = 0; i < this._lines.length; i++) {
            const line = this._lines[i];
            if (i !== 0 && this._lineSpacing.internalValue !== 0) {
                if (this._lineSpacing.isPixel) {
                    rootY += this._lineSpacing.getValue(this._host);
                }
                else {
                    rootY = rootY + this._lineSpacing.getValue(this._host) * this._height.getValueInPixel(this._host, this._cachedParentMeasure.height);
                }
            }
            this._drawText(line.text, line.width, rootY, context);
            rootY += this._fontOffset.height;
        }
    }
    _computeHeightForLinesOf(lineCount) {
        let newHeight = this._paddingTopInPixels + this._paddingBottomInPixels + this._fontOffset.height * lineCount;
        if (lineCount > 0 && this._lineSpacing.internalValue !== 0) {
            let lineSpacing = 0;
            if (this._lineSpacing.isPixel) {
                lineSpacing = this._lineSpacing.getValue(this._host);
            }
            else {
                lineSpacing = this._lineSpacing.getValue(this._host) * this._height.getValueInPixel(this._host, this._cachedParentMeasure.height);
            }
            newHeight += (lineCount - 1) * lineSpacing;
        }
        return newHeight;
    }
    isDimensionFullyDefined(dim) {
        if (this.resizeToFit) {
            return true;
        }
        return super.isDimensionFullyDefined(dim);
    }
    /**
     * Given a width constraint applied on the text block, find the expected height
     * @returns expected height
     */
    computeExpectedHeight() {
        if (this.text && this.widthInPixels) {
            // Should abstract platform instead of using LastCreatedEngine
            const context = EngineStore.LastCreatedEngine?.createCanvas(0, 0).getContext("2d");
            if (context) {
                this._applyStates(context);
                if (!this._fontOffset) {
                    this._fontOffset = Control._GetFontOffset(context.font);
                }
                const lines = this._lines
                    ? this._lines
                    : this._breakLines(this.widthInPixels - this._paddingLeftInPixels - this._paddingRightInPixels, this.heightInPixels - this._paddingTopInPixels - this._paddingBottomInPixels, context);
                return this._computeHeightForLinesOf(lines.length);
            }
        }
        return 0;
    }
    dispose() {
        super.dispose();
        this.onTextChangedObservable.clear();
    }
}
__decorate([
    serialize()
], TextBlock.prototype, "resizeToFit", null);
__decorate([
    serialize()
], TextBlock.prototype, "textWrapping", null);
__decorate([
    serialize()
], TextBlock.prototype, "text", null);
__decorate([
    serialize()
], TextBlock.prototype, "textHorizontalAlignment", null);
__decorate([
    serialize()
], TextBlock.prototype, "textVerticalAlignment", null);
__decorate([
    serialize()
], TextBlock.prototype, "lineSpacing", null);
__decorate([
    serialize()
], TextBlock.prototype, "outlineWidth", null);
__decorate([
    serialize()
], TextBlock.prototype, "underline", null);
__decorate([
    serialize()
], TextBlock.prototype, "lineThrough", null);
__decorate([
    serialize()
], TextBlock.prototype, "applyOutlineToUnderline", null);
__decorate([
    serialize()
], TextBlock.prototype, "outlineColor", null);
__decorate([
    serialize()
], TextBlock.prototype, "wordDivider", null);
__decorate([
    serialize()
], TextBlock.prototype, "forceResizeWidth", null);
RegisterClass("BABYLON.GUI.TextBlock", TextBlock);
//# sourceMappingURL=textBlock.js.map