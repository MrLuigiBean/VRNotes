import { Observable } from "@babylonjs/core/Misc/observable.js";
import { Rectangle } from "./rectangle.js";
import { RegisterClass } from "@babylonjs/core/Misc/typeStore.js";
/**
 * Class used to create toggle buttons
 * @since 5.0.0
 */
export class ToggleButton extends Rectangle {
    /** Gets or sets group name this toggle button belongs to */
    get group() {
        return this._group;
    }
    set group(value) {
        if (this._group === value) {
            return;
        }
        this._group = value;
    }
    /** Gets or sets a boolean indicating if the toggle button is active or not */
    get isActive() {
        return this._isActive;
    }
    set isActive(value) {
        // Function modeled after radioButton.ts
        if (this._isActive === value) {
            return;
        }
        this._isActive = value;
        // Update the visual state based on the new value
        if (this._isActive) {
            this.toActiveAnimation?.();
        }
        else {
            this.toInactiveAnimation?.();
        }
        this._markAsDirty();
        this.onIsActiveChangedObservable.notifyObservers(value);
        if (this._isActive && this._host && this._group) {
            // A toggle button in a group can only have 1 active element at a given time.
            // If this toggle button has a group, set other toggle buttons in the group to inactive.
            this._host.executeOnAllControls((control) => {
                // Check for control type ToggleButton
                if (control.typeName === "ToggleButton") {
                    // Don't do anything to this toggle button
                    if (control === this) {
                        return;
                    }
                    const childToggle = control;
                    // If toggle button is in same group, set isActive to false
                    if (childToggle.group === this.group) {
                        childToggle.isActive = false;
                    }
                }
            });
        }
    }
    /**
     * Creates a new ToggleButton
     * @param name defines the control name
     * @param group defines the toggle group this toggle belongs to
     */
    constructor(name, group) {
        super(name);
        this.name = name;
        /** Observable raised when isActive is changed */
        this.onIsActiveChangedObservable = new Observable();
        /**
         * Gets or sets a boolean indicating that the toggle button will let internal controls handle picking instead of doing it directly using its bounding info
         */
        this.delegatePickingToChildren = false;
        this._isActive = false;
        this.group = group ?? "";
        this.thickness = 0;
        this.isPointerBlocker = true;
        let alphaStore = null;
        this.toActiveAnimation = () => {
            this.thickness = 1;
        };
        this.toInactiveAnimation = () => {
            this.thickness = 0;
        };
        this.pointerEnterActiveAnimation = () => {
            alphaStore = this.alpha;
            this.alpha -= 0.1;
        };
        this.pointerOutActiveAnimation = () => {
            if (alphaStore !== null) {
                this.alpha = alphaStore;
            }
        };
        this.pointerDownActiveAnimation = () => {
            this.scaleX -= 0.05;
            this.scaleY -= 0.05;
        };
        this.pointerUpActiveAnimation = () => {
            this.scaleX += 0.05;
            this.scaleY += 0.05;
        };
        this.pointerEnterInactiveAnimation = () => {
            alphaStore = this.alpha;
            this.alpha -= 0.1;
        };
        this.pointerOutInactiveAnimation = () => {
            if (alphaStore !== null) {
                this.alpha = alphaStore;
            }
        };
        this.pointerDownInactiveAnimation = () => {
            this.scaleX -= 0.05;
            this.scaleY -= 0.05;
        };
        this.pointerUpInactiveAnimation = () => {
            this.scaleX += 0.05;
            this.scaleY += 0.05;
        };
    }
    _getTypeName() {
        return "ToggleButton";
    }
    // While being a container, the toggle button behaves like a control.
    /**
     * @internal
     */
    _processPicking(x, y, pi, type, pointerId, buttonIndex, deltaX, deltaY) {
        if (!this._isEnabled || !this.isHitTestVisible || !this.isVisible || this.notRenderable) {
            return false;
        }
        if (!super.contains(x, y)) {
            return false;
        }
        if (this.delegatePickingToChildren) {
            let contains = false;
            for (let index = this._children.length - 1; index >= 0; index--) {
                const child = this._children[index];
                if (child.isEnabled && child.isHitTestVisible && child.isVisible && !child.notRenderable && child.contains(x, y)) {
                    contains = true;
                    break;
                }
            }
            if (!contains) {
                return false;
            }
        }
        this._processObservables(type, x, y, pi, pointerId, buttonIndex, deltaX, deltaY);
        return true;
    }
    /**
     * @internal
     */
    _onPointerEnter(target, pi) {
        if (!super._onPointerEnter(target, pi)) {
            return false;
        }
        if (this.isReadOnly) {
            return true;
        }
        if (this._isActive) {
            if (this.pointerEnterActiveAnimation) {
                this.pointerEnterActiveAnimation();
            }
        }
        else {
            if (this.pointerEnterInactiveAnimation) {
                this.pointerEnterInactiveAnimation();
            }
        }
        return true;
    }
    /**
     * @internal
     */
    _onPointerOut(target, pi, force = false) {
        if (!this.isReadOnly) {
            if (this._isActive) {
                if (this.pointerOutActiveAnimation) {
                    this.pointerOutActiveAnimation();
                }
            }
            else {
                if (this.pointerOutInactiveAnimation) {
                    this.pointerOutInactiveAnimation();
                }
            }
        }
        super._onPointerOut(target, pi, force);
    }
    /**
     * @internal
     */
    _onPointerDown(target, coordinates, pointerId, buttonIndex, pi) {
        if (!super._onPointerDown(target, coordinates, pointerId, buttonIndex, pi)) {
            return false;
        }
        if (this.isReadOnly) {
            return true;
        }
        if (this._isActive) {
            if (this.pointerDownActiveAnimation) {
                this.pointerDownActiveAnimation();
            }
        }
        else {
            if (this.pointerDownInactiveAnimation) {
                this.pointerDownInactiveAnimation();
            }
        }
        return true;
    }
    /**
     * @internal
     */
    _onPointerUp(target, coordinates, pointerId, buttonIndex, notifyClick, pi) {
        if (!this.isReadOnly) {
            if (this._isActive) {
                if (this.pointerUpActiveAnimation) {
                    this.pointerUpActiveAnimation();
                }
            }
            else {
                if (this.pointerUpInactiveAnimation) {
                    this.pointerUpInactiveAnimation();
                }
            }
        }
        super._onPointerUp(target, coordinates, pointerId, buttonIndex, notifyClick, pi);
    }
}
RegisterClass("BABYLON.GUI.ToggleButton", ToggleButton);
//# sourceMappingURL=toggleButton.js.map