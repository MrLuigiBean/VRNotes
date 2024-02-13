import type { Nullable } from "@babylonjs/core/types.js";
import type { Observer } from "@babylonjs/core/Misc/observable.js";
import { Observable } from "@babylonjs/core/Misc/observable.js";
import type { Vector2 } from "@babylonjs/core/Maths/math.vector.js";
import type { ClipboardInfo } from "@babylonjs/core/Events/clipboardEvents.js";
import type { PointerInfo, PointerInfoBase } from "@babylonjs/core/Events/pointerEvents.js";
import { Control } from "./control";
import type { IFocusableControl } from "./focusableControl";
import { ValueAndUnit } from "../valueAndUnit";
import type { VirtualKeyboard } from "./virtualKeyboard";
import { TextWrapper } from "./textWrapper";
import type { IKeyboardEvent } from "@babylonjs/core/Events/deviceInputEvents.js";
import type { ICanvasRenderingContext } from "@babylonjs/core/Engines/ICanvas.js";
/**
 * Class used to create input text control
 */
export declare class InputText extends Control implements IFocusableControl {
    name?: string | undefined;
    protected _textWrapper: TextWrapper;
    protected _placeholderText: string;
    protected _background: string;
    protected _focusedBackground: string;
    protected _focusedColor: string;
    protected _placeholderColor: string;
    protected _thickness: number;
    protected _margin: ValueAndUnit;
    protected _autoStretchWidth: boolean;
    protected _maxWidth: ValueAndUnit;
    protected _isFocused: boolean;
    /** the type of device that most recently focused the input: "mouse", "touch" or "pen" */
    protected _focusedBy: string;
    protected _blinkTimeout: number;
    protected _blinkIsEven: boolean;
    private _cursorOffset;
    protected _scrollLeft: Nullable<number>;
    protected _textWidth: number;
    protected _clickedCoordinate: Nullable<number>;
    protected _deadKey: boolean;
    protected _addKey: boolean;
    protected _currentKey: string;
    protected _isTextHighlightOn: boolean;
    protected _textHighlightColor: string;
    protected _highligherOpacity: number;
    protected _highlightedText: string;
    private _startHighlightIndex;
    private _endHighlightIndex;
    private _cursorIndex;
    protected _onFocusSelectAll: boolean;
    protected _isPointerDown: boolean;
    protected _onClipboardObserver: Nullable<Observer<ClipboardInfo>>;
    protected _onPointerDblTapObserver: Nullable<Observer<PointerInfo>>;
    /** @internal */
    _connectedVirtualKeyboard: Nullable<VirtualKeyboard>;
    /** Gets or sets a string representing the message displayed on mobile when the control gets the focus */
    promptMessage: string;
    /** Force disable prompt on mobile device */
    disableMobilePrompt: boolean;
    /** Observable raised when the text changes */
    onTextChangedObservable: Observable<InputText>;
    /** Observable raised just before an entered character is to be added */
    onBeforeKeyAddObservable: Observable<InputText>;
    /** Observable raised when the control gets the focus */
    onFocusObservable: Observable<InputText>;
    /** Observable raised when the control loses the focus */
    onBlurObservable: Observable<InputText>;
    /**Observable raised when the text is highlighted */
    onTextHighlightObservable: Observable<InputText>;
    /**Observable raised when copy event is triggered */
    onTextCopyObservable: Observable<InputText>;
    /** Observable raised when cut event is triggered */
    onTextCutObservable: Observable<InputText>;
    /** Observable raised when paste event is triggered */
    onTextPasteObservable: Observable<InputText>;
    /** Observable raised when a key event was processed */
    onKeyboardEventProcessedObservable: Observable<IKeyboardEvent>;
    /** Gets or sets the maximum width allowed by the control */
    get maxWidth(): string | number;
    /** Gets the maximum width allowed by the control in pixels */
    get maxWidthInPixels(): number;
    set maxWidth(value: string | number);
    /** Gets or sets the text highlighter transparency; default: 0.4 */
    get highligherOpacity(): number;
    set highligherOpacity(value: number);
    /** Gets or sets a boolean indicating whether to select complete text by default on input focus */
    get onFocusSelectAll(): boolean;
    set onFocusSelectAll(value: boolean);
    /** Gets or sets the text hightlight color */
    get textHighlightColor(): string;
    set textHighlightColor(value: string);
    /** Gets or sets control margin */
    get margin(): string;
    /** Gets control margin in pixels */
    get marginInPixels(): number;
    set margin(value: string);
    /** Gets or sets a boolean indicating if the control can auto stretch its width to adapt to the text */
    get autoStretchWidth(): boolean;
    set autoStretchWidth(value: boolean);
    /** Gets or sets border thickness */
    get thickness(): number;
    set thickness(value: number);
    /** Gets or sets the background color when focused */
    get focusedBackground(): string;
    set focusedBackground(value: string);
    /** Gets or sets the background color when focused */
    get focusedColor(): string;
    set focusedColor(value: string);
    /** Gets or sets the background color */
    get background(): string;
    set background(value: string);
    /** Gets or sets the placeholder color */
    get placeholderColor(): string;
    set placeholderColor(value: string);
    /** Gets or sets the text displayed when the control is empty */
    get placeholderText(): string;
    set placeholderText(value: string);
    /** Gets or sets the dead key. 0 to disable. */
    get deadKey(): boolean;
    set deadKey(flag: boolean);
    /** Gets or sets the highlight text */
    get highlightedText(): string;
    set highlightedText(text: string);
    /** Gets or sets if the current key should be added */
    get addKey(): boolean;
    set addKey(flag: boolean);
    /** Gets or sets the value of the current key being entered */
    get currentKey(): string;
    set currentKey(key: string);
    /** Gets or sets the text displayed in the control */
    get text(): string;
    set text(value: string);
    protected _textHasChanged(): void;
    /** Gets or sets control width */
    get width(): string | number;
    set width(value: string | number);
    /**
     * Creates a new InputText
     * @param name defines the control name
     * @param text defines the text of the control
     */
    constructor(name?: string | undefined, text?: string);
    /** @internal */
    onBlur(): void;
    /** @internal */
    onFocus(): void;
    /**
     * Function to focus an inputText programmatically
     */
    focus(): void;
    /**
     * Function to unfocus an inputText programmatically
     */
    blur(): void;
    protected _getTypeName(): string;
    /**
     * Function called to get the list of controls that should not steal the focus from this control
     * @returns an array of controls
     */
    keepsFocusWith(): Nullable<Control[]>;
    /**
     * @internal
     */
    processKey(keyCode: number, key?: string, evt?: IKeyboardEvent): void;
    /**
     * @internal
     */
    protected _updateValueFromCursorIndex(offset: number): void;
    /**
     * @internal
     */
    protected _processDblClick(evt: PointerInfo): void;
    /** @internal */
    protected _selectAllText(): void;
    /**
     * Handles the keyboard event
     * @param evt Defines the KeyboardEvent
     */
    processKeyboard(evt: IKeyboardEvent): void;
    /**
     * @internal
     */
    protected _onCopyText(ev: ClipboardEvent): void;
    /**
     * @internal
     */
    protected _onCutText(ev: ClipboardEvent): void;
    /**
     * @internal
     */
    protected _onPasteText(ev: ClipboardEvent): void;
    _draw(context: ICanvasRenderingContext): void;
    _onPointerDown(target: Control, coordinates: Vector2, pointerId: number, buttonIndex: number, pi: PointerInfoBase): boolean;
    _onPointerMove(target: Control, coordinates: Vector2, pointerId: number, pi: PointerInfoBase): void;
    _onPointerUp(target: Control, coordinates: Vector2, pointerId: number, buttonIndex: number, notifyClick: boolean): void;
    protected _beforeRenderText(textWrapper: TextWrapper): TextWrapper;
    /** @internal */
    private set isTextHighlightOn(value);
    /** @internal */
    private get isTextHighlightOn();
    dispose(): void;
}
