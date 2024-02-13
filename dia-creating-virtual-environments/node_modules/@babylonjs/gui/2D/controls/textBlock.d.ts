import { Observable } from "@babylonjs/core/Misc/observable.js";
import type { Measure } from "../measure";
import { Control } from "./control";
import type { Nullable } from "@babylonjs/core/types.js";
import type { ICanvasRenderingContext } from "@babylonjs/core/Engines/ICanvas.js";
/**
 * Enum that determines the text-wrapping mode to use.
 */
export declare enum TextWrapping {
    /**
     * Clip the text when it's larger than Control.width; this is the default mode.
     */
    Clip = 0,
    /**
     * Wrap the text word-wise, i.e. try to add line-breaks at word boundary to fit within Control.width.
     */
    WordWrap = 1,
    /**
     * Ellipsize the text, i.e. shrink with trailing … when text is larger than Control.width.
     */
    Ellipsis = 2,
    /**
     * Wrap the text word-wise and clip the text when the text's height is larger than the Control.height, and shrink the last line with trailing … .
     */
    WordWrapEllipsis = 3
}
/**
 * Class used to create text block control
 */
export declare class TextBlock extends Control {
    /**
     * Defines the name of the control
     */
    name?: string | undefined;
    private _text;
    private _textWrapping;
    private _textHorizontalAlignment;
    private _textVerticalAlignment;
    private _lines;
    private _resizeToFit;
    private _lineSpacing;
    private _outlineWidth;
    private _outlineColor;
    private _underline;
    private _lineThrough;
    private _wordDivider;
    private _forceResizeWidth;
    private _applyOutlineToUnderline;
    /**
     * An event triggered after the text is changed
     */
    onTextChangedObservable: Observable<TextBlock>;
    /**
     * An event triggered after the text was broken up into lines
     */
    onLinesReadyObservable: Observable<TextBlock>;
    /**
     * Function used to split a string into words. By default, a string is split at each space character found
     */
    wordSplittingFunction: Nullable<(line: string) => string[]>;
    /**
     * Return the line list (you may need to use the onLinesReadyObservable to make sure the list is ready)
     */
    get lines(): any[];
    /**
     * Gets or sets a boolean indicating that the TextBlock will be resized to fit its content

     */
    get resizeToFit(): boolean;
    /**
     * Gets or sets a boolean indicating that the TextBlock will be resized to fit its content

     */
    set resizeToFit(value: boolean);
    /**
     * Gets or sets a boolean indicating if text must be wrapped
     */
    get textWrapping(): TextWrapping | boolean;
    /**
     * Gets or sets a boolean indicating if text must be wrapped
     */
    set textWrapping(value: TextWrapping | boolean);
    /**
     * Gets or sets text to display
     */
    get text(): string;
    /**
     * Gets or sets text to display
     */
    set text(value: string);
    /**
     * Gets or sets text horizontal alignment (BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER by default)
     */
    get textHorizontalAlignment(): number;
    /**
     * Gets or sets text horizontal alignment (BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER by default)
     */
    set textHorizontalAlignment(value: number);
    /**
     * Gets or sets text vertical alignment (BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER by default)
     */
    get textVerticalAlignment(): number;
    /**
     * Gets or sets text vertical alignment (BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER by default)
     */
    set textVerticalAlignment(value: number);
    /**
     * Gets or sets line spacing value
     */
    set lineSpacing(value: string | number);
    /**
     * Gets or sets line spacing value
     */
    get lineSpacing(): string | number;
    /**
     * Gets or sets outlineWidth of the text to display
     */
    get outlineWidth(): number;
    /**
     * Gets or sets outlineWidth of the text to display
     */
    set outlineWidth(value: number);
    /**
     * Gets or sets a boolean indicating that text must have underline
     */
    get underline(): boolean;
    /**
     * Gets or sets a boolean indicating that text must have underline
     */
    set underline(value: boolean);
    /**
     * Gets or sets an boolean indicating that text must be crossed out
     */
    get lineThrough(): boolean;
    /**
     * Gets or sets an boolean indicating that text must be crossed out
     */
    set lineThrough(value: boolean);
    /**
     * If the outline should be applied to the underline/strike-through too. Has different behavior in Edge/Chrome vs Firefox.
     */
    get applyOutlineToUnderline(): boolean;
    set applyOutlineToUnderline(value: boolean);
    /**
     * Gets or sets outlineColor of the text to display
     */
    get outlineColor(): string;
    /**
     * Gets or sets outlineColor of the text to display
     */
    set outlineColor(value: string);
    /**
     * Gets or sets word divider
     */
    get wordDivider(): string;
    /**
     * Gets or sets word divider
     */
    set wordDivider(value: string);
    /**
     * By default, if a text block has text wrapping other than Clip, its width
     * is not resized even if resizeToFit = true. This parameter forces the width
     * to be resized.
     */
    get forceResizeWidth(): boolean;
    set forceResizeWidth(value: boolean);
    /**
     * Creates a new TextBlock object
     * @param name defines the name of the control
     * @param text defines the text to display (empty string by default)
     */
    constructor(
    /**
     * Defines the name of the control
     */
    name?: string | undefined, text?: string);
    protected _getTypeName(): string;
    protected _processMeasures(parentMeasure: Measure, context: ICanvasRenderingContext): void;
    private _drawText;
    private _drawLine;
    /**
     * @internal
     */
    _draw(context: ICanvasRenderingContext): void;
    protected _applyStates(context: ICanvasRenderingContext): void;
    private _linesTemp;
    protected _breakLines(refWidth: number, refHeight: number, context: ICanvasRenderingContext): object[];
    protected _parseLine(line: string | undefined, context: ICanvasRenderingContext): object;
    private _getCharsToRemove;
    protected _parseLineEllipsis(line: string | undefined, width: number, context: ICanvasRenderingContext): object;
    private _getTextMetricsWidth;
    protected _parseLineWordWrap(line: string | undefined, width: number, context: ICanvasRenderingContext): object[];
    protected _parseLineWordWrapEllipsis(line: string | undefined, width: number, height: number, context: ICanvasRenderingContext): object[];
    protected _renderLines(context: ICanvasRenderingContext): void;
    private _computeHeightForLinesOf;
    isDimensionFullyDefined(dim: "width" | "height"): boolean;
    /**
     * Given a width constraint applied on the text block, find the expected height
     * @returns expected height
     */
    computeExpectedHeight(): number;
    dispose(): void;
}
