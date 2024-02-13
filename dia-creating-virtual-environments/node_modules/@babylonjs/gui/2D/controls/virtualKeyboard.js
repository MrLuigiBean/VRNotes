import { Observable } from "@babylonjs/core/Misc/observable.js";
import { StackPanel } from "./stackPanel.js";
import { Button } from "./button.js";
import { RegisterClass } from "@babylonjs/core/Misc/typeStore.js";
import { InputTextArea } from "./inputTextArea.js";
/**
 * Class used to store key control properties
 */
export class KeyPropertySet {
}
/**
 * Class used to create virtual keyboard
 */
export class VirtualKeyboard extends StackPanel {
    constructor() {
        super(...arguments);
        /** Observable raised when a key is pressed */
        this.onKeyPressObservable = new Observable();
        /** Gets or sets default key button width */
        this.defaultButtonWidth = "40px";
        /** Gets or sets default key button height */
        this.defaultButtonHeight = "40px";
        /** Gets or sets default key button left padding */
        this.defaultButtonPaddingLeft = "2px";
        /** Gets or sets default key button right padding */
        this.defaultButtonPaddingRight = "2px";
        /** Gets or sets default key button top padding */
        this.defaultButtonPaddingTop = "2px";
        /** Gets or sets default key button bottom padding */
        this.defaultButtonPaddingBottom = "2px";
        /** Gets or sets default key button foreground color */
        this.defaultButtonColor = "#DDD";
        /** Gets or sets default key button background color */
        this.defaultButtonBackground = "#070707";
        /** Gets or sets shift button foreground color */
        this.shiftButtonColor = "#7799FF";
        /** Gets or sets shift button thickness*/
        this.selectedShiftThickness = 1;
        /** Gets shift key state */
        this.shiftState = 0;
        this._currentlyConnectedInputText = null;
        this._connectedInputTexts = [];
        this._onKeyPressObserver = null;
    }
    _getTypeName() {
        return "VirtualKeyboard";
    }
    _createKey(key, propertySet) {
        const button = Button.CreateSimpleButton(key, key);
        button.width = propertySet && propertySet.width ? propertySet.width : this.defaultButtonWidth;
        button.height = propertySet && propertySet.height ? propertySet.height : this.defaultButtonHeight;
        button.color = propertySet && propertySet.color ? propertySet.color : this.defaultButtonColor;
        button.background = propertySet && propertySet.background ? propertySet.background : this.defaultButtonBackground;
        button.paddingLeft = propertySet && propertySet.paddingLeft ? propertySet.paddingLeft : this.defaultButtonPaddingLeft;
        button.paddingRight = propertySet && propertySet.paddingRight ? propertySet.paddingRight : this.defaultButtonPaddingRight;
        button.paddingTop = propertySet && propertySet.paddingTop ? propertySet.paddingTop : this.defaultButtonPaddingTop;
        button.paddingBottom = propertySet && propertySet.paddingBottom ? propertySet.paddingBottom : this.defaultButtonPaddingBottom;
        button.thickness = 0;
        button.isFocusInvisible = true;
        button.shadowColor = this.shadowColor;
        button.shadowBlur = this.shadowBlur;
        button.shadowOffsetX = this.shadowOffsetX;
        button.shadowOffsetY = this.shadowOffsetY;
        button.onPointerUpObservable.add(() => {
            this.onKeyPressObservable.notifyObservers(key);
        });
        return button;
    }
    /**
     * Adds a new row of keys
     * @param keys defines the list of keys to add
     * @param propertySets defines the associated property sets
     */
    addKeysRow(keys, propertySets) {
        const panel = new StackPanel();
        panel.isVertical = false;
        panel.isFocusInvisible = true;
        let maxKey = null;
        for (let i = 0; i < keys.length; i++) {
            let properties = null;
            if (propertySets && propertySets.length === keys.length) {
                properties = propertySets[i];
            }
            const key = this._createKey(keys[i], properties);
            if (!maxKey || key.heightInPixels > maxKey.heightInPixels) {
                maxKey = key;
            }
            panel.addControl(key);
        }
        panel.height = maxKey ? maxKey.height : this.defaultButtonHeight;
        this.addControl(panel);
    }
    /**
     * Set the shift key to a specific state
     * @param shiftState defines the new shift state
     */
    applyShiftState(shiftState) {
        if (!this.children) {
            return;
        }
        for (let i = 0; i < this.children.length; i++) {
            const row = this.children[i];
            if (!row || !row.children) {
                continue;
            }
            const rowContainer = row;
            for (let j = 0; j < rowContainer.children.length; j++) {
                const button = rowContainer.children[j];
                if (!button || !button.children[0]) {
                    continue;
                }
                const button_tblock = button.children[0];
                if (button_tblock.text === "\u21E7") {
                    button.color = shiftState ? this.shiftButtonColor : this.defaultButtonColor;
                    button.thickness = shiftState > 1 ? this.selectedShiftThickness : 0;
                }
                button_tblock.text = shiftState > 0 ? button_tblock.text.toUpperCase() : button_tblock.text.toLowerCase();
            }
        }
    }
    /** Gets the input text control currently attached to the keyboard */
    get connectedInputText() {
        return this._currentlyConnectedInputText;
    }
    /**
     * Connects the keyboard with an input text control
     *
     * @param input defines the target control
     */
    connect(input) {
        const inputTextAlreadyConnected = this._connectedInputTexts.some((a) => a.input === input);
        if (inputTextAlreadyConnected) {
            return;
        }
        if (this._onKeyPressObserver === null) {
            this._onKeyPressObserver = this.onKeyPressObservable.add((key) => {
                if (!this._currentlyConnectedInputText) {
                    return;
                }
                this._currentlyConnectedInputText._host.focusedControl = this._currentlyConnectedInputText;
                switch (key) {
                    case "\u21E7":
                        this.shiftState++;
                        if (this.shiftState > 2) {
                            this.shiftState = 0;
                        }
                        this.applyShiftState(this.shiftState);
                        return;
                    case "\u2190":
                        if (this._currentlyConnectedInputText instanceof InputTextArea) {
                            this._currentlyConnectedInputText.alternativeProcessKey("Backspace");
                        }
                        else {
                            this._currentlyConnectedInputText.processKey(8);
                        }
                        return;
                    case "\u21B5":
                        if (this._currentlyConnectedInputText instanceof InputTextArea) {
                            this._currentlyConnectedInputText.alternativeProcessKey("Enter");
                        }
                        else {
                            this._currentlyConnectedInputText.processKey(13);
                        }
                        return;
                }
                if (this._currentlyConnectedInputText instanceof InputTextArea) {
                    this._currentlyConnectedInputText.alternativeProcessKey("", this.shiftState ? key.toUpperCase() : key);
                }
                else {
                    this._currentlyConnectedInputText.processKey(-1, this.shiftState ? key.toUpperCase() : key);
                }
                if (this.shiftState === 1) {
                    this.shiftState = 0;
                    this.applyShiftState(this.shiftState);
                }
            });
        }
        this.isVisible = false;
        this._currentlyConnectedInputText = input;
        input._connectedVirtualKeyboard = this;
        // Events hooking
        const onFocusObserver = input.onFocusObservable.add(() => {
            this._currentlyConnectedInputText = input;
            input._connectedVirtualKeyboard = this;
            this.isVisible = true;
        });
        const onBlurObserver = input.onBlurObservable.add(() => {
            input._connectedVirtualKeyboard = null;
            this._currentlyConnectedInputText = null;
            this.isVisible = false;
        });
        this._connectedInputTexts.push({
            input,
            onBlurObserver,
            onFocusObserver,
        });
    }
    /**
     * Disconnects the keyboard from connected InputText controls
     *
     * @param input optionally defines a target control, otherwise all are disconnected
     */
    disconnect(input) {
        if (input) {
            // .find not available on IE
            const filtered = this._connectedInputTexts.filter((a) => a.input === input);
            if (filtered.length === 1) {
                this._removeConnectedInputObservables(filtered[0]);
                this._connectedInputTexts = this._connectedInputTexts.filter((a) => a.input !== input);
                if (this._currentlyConnectedInputText === input) {
                    this._currentlyConnectedInputText = null;
                }
            }
        }
        else {
            this._connectedInputTexts.forEach((connectedInputText) => {
                this._removeConnectedInputObservables(connectedInputText);
            });
            this._connectedInputTexts.length = 0;
        }
        if (this._connectedInputTexts.length === 0) {
            this._currentlyConnectedInputText = null;
            this.onKeyPressObservable.remove(this._onKeyPressObserver);
            this._onKeyPressObserver = null;
        }
    }
    _removeConnectedInputObservables(connectedInputText) {
        connectedInputText.input._connectedVirtualKeyboard = null;
        connectedInputText.input.onFocusObservable.remove(connectedInputText.onFocusObserver);
        connectedInputText.input.onBlurObservable.remove(connectedInputText.onBlurObserver);
    }
    /**
     * Release all resources
     */
    dispose() {
        super.dispose();
        this.disconnect();
    }
    // Statics
    /**
     * Creates a new keyboard using a default layout
     *
     * @param name defines control name
     * @returns a new VirtualKeyboard
     */
    static CreateDefaultLayout(name) {
        const returnValue = new VirtualKeyboard(name);
        returnValue.addKeysRow(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "\u2190"]);
        returnValue.addKeysRow(["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"]);
        returnValue.addKeysRow(["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "\u21B5"]);
        returnValue.addKeysRow(["\u21E7", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/"]);
        returnValue.addKeysRow([" "], [{ width: "200px" }]);
        return returnValue;
    }
    /**
     * @internal
     */
    _parseFromContent(serializedObject, host) {
        super._parseFromContent(serializedObject, host);
        for (const row of this.children) {
            if (row.getClassName() === "StackPanel") {
                const stackPanel = row;
                for (const key of stackPanel.children) {
                    if (key.getClassName() === "Button" && key.name) {
                        key.onPointerUpObservable.add(() => {
                            this.onKeyPressObservable.notifyObservers(key.name);
                        });
                    }
                }
            }
        }
    }
}
RegisterClass("BABYLON.GUI.VirtualKeyboard", VirtualKeyboard);
//# sourceMappingURL=virtualKeyboard.js.map