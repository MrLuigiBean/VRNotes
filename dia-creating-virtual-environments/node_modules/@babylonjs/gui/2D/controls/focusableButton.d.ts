import type { Nullable } from "@babylonjs/core/types.js";
import type { Vector2 } from "@babylonjs/core/Maths/math.vector.js";
import { Button } from "./button";
import type { Control } from "./control";
import type { PointerInfoBase } from "@babylonjs/core/Events/pointerEvents.js";
import type { IFocusableControl } from "./focusableControl";
import { Observable } from "@babylonjs/core/Misc/observable.js";
import type { IKeyboardEvent } from "@babylonjs/core/Events/deviceInputEvents.js";
/**
 * Class used to create a focusable button that can easily handle keyboard events
 * @since 5.0.0
 */
export declare class FocusableButton extends Button implements IFocusableControl {
    name?: string | undefined;
    /** Highlight color when button is focused */
    focusedColor: Nullable<string>;
    private _isFocused;
    private _unfocusedColor;
    /** Observable raised when the control gets the focus */
    onFocusObservable: Observable<Button>;
    /** Observable raised when the control loses the focus */
    onBlurObservable: Observable<Button>;
    /** Observable raised when a key event was processed */
    onKeyboardEventProcessedObservable: Observable<IKeyboardEvent>;
    constructor(name?: string | undefined);
    /** @internal */
    onBlur(): void;
    /** @internal */
    onFocus(): void;
    /**
     * Function called to get the list of controls that should not steal the focus from this control
     * @returns an array of controls
     */
    keepsFocusWith(): Nullable<Control[]>;
    /**
     * Function to focus a button programmatically
     */
    focus(): void;
    /**
     * Function to unfocus a button programmatically
     */
    blur(): void;
    /**
     * Handles the keyboard event
     * @param evt Defines the KeyboardEvent
     */
    processKeyboard(evt: IKeyboardEvent): void;
    /**
     * @internal
     */
    _onPointerDown(target: Control, coordinates: Vector2, pointerId: number, buttonIndex: number, pi: PointerInfoBase): boolean;
    /** @internal */
    displose(): void;
}
