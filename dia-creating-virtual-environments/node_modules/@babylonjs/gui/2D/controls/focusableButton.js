import { Button } from "./button.js";
import { RegisterClass } from "@babylonjs/core/Misc/typeStore.js";
import { Observable } from "@babylonjs/core/Misc/observable.js";
/**
 * Class used to create a focusable button that can easily handle keyboard events
 * @since 5.0.0
 */
export class FocusableButton extends Button {
    constructor(name) {
        super(name);
        this.name = name;
        /** Highlight color when button is focused */
        this.focusedColor = null;
        this._isFocused = false;
        this._unfocusedColor = null;
        /** Observable raised when the control gets the focus */
        this.onFocusObservable = new Observable();
        /** Observable raised when the control loses the focus */
        this.onBlurObservable = new Observable();
        /** Observable raised when a key event was processed */
        this.onKeyboardEventProcessedObservable = new Observable();
        this._unfocusedColor = this.color;
    }
    /** @internal */
    onBlur() {
        if (this._isFocused) {
            this._isFocused = false;
            if (this.focusedColor && this._unfocusedColor != null) {
                // Set color back to saved unfocused color
                this.color = this._unfocusedColor;
            }
            this.onBlurObservable.notifyObservers(this);
        }
    }
    /** @internal */
    onFocus() {
        this._isFocused = true;
        if (this.focusedColor) {
            // Save the unfocused color
            this._unfocusedColor = this.color;
            this.color = this.focusedColor;
        }
        this.onFocusObservable.notifyObservers(this);
    }
    /**
     * Function called to get the list of controls that should not steal the focus from this control
     * @returns an array of controls
     */
    keepsFocusWith() {
        return null;
    }
    /**
     * Function to focus a button programmatically
     */
    focus() {
        this._host.moveFocusToControl(this);
    }
    /**
     * Function to unfocus a button programmatically
     */
    blur() {
        this._host.focusedControl = null;
    }
    /**
     * Handles the keyboard event
     * @param evt Defines the KeyboardEvent
     */
    processKeyboard(evt) {
        this.onKeyboardEventProcessedObservable.notifyObservers(evt, -1, this);
    }
    /**
     * @internal
     */
    _onPointerDown(target, coordinates, pointerId, buttonIndex, pi) {
        if (!this.isReadOnly) {
            // Clicking on button should focus
            this.focus();
        }
        return super._onPointerDown(target, coordinates, pointerId, buttonIndex, pi);
    }
    /** @internal */
    displose() {
        super.dispose();
        this.onBlurObservable.clear();
        this.onFocusObservable.clear();
        this.onKeyboardEventProcessedObservable.clear();
    }
}
RegisterClass("BABYLON.GUI.FocusableButton", FocusableButton);
//# sourceMappingURL=focusableButton.js.map