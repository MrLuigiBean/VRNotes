import { Rectangle } from "./rectangle.js";
import { Control } from "./control.js";
import { TextBlock } from "./textBlock.js";
import { Image } from "./image.js";
import { RegisterClass } from "@babylonjs/core/Misc/typeStore.js";
/**
 * Class used to create 2D buttons
 */
export class Button extends Rectangle {
    /**
     * Returns the image part of the button (if any)
     */
    get image() {
        return this._image;
    }
    /**
     * Returns the TextBlock part of the button (if any)
     */
    get textBlock() {
        return this._textBlock;
    }
    /**
     * Creates a new Button
     * @param name defines the name of the button
     */
    constructor(name) {
        super(name);
        this.name = name;
        /**
         * Gets or sets a boolean indicating that the button will let internal controls handle picking instead of doing it directly using its bounding info
         */
        this.delegatePickingToChildren = false;
        this.thickness = 1;
        this.isPointerBlocker = true;
        let alphaStore = null;
        this.pointerEnterAnimation = () => {
            alphaStore = this.alpha;
            this.alpha -= 0.1;
        };
        this.pointerOutAnimation = () => {
            if (alphaStore !== null) {
                this.alpha = alphaStore;
            }
        };
        this.pointerDownAnimation = () => {
            this.scaleX -= 0.05;
            this.scaleY -= 0.05;
        };
        this.pointerUpAnimation = () => {
            this.scaleX += 0.05;
            this.scaleY += 0.05;
        };
    }
    _getTypeName() {
        return "Button";
    }
    // While being a container, the button behaves like a control.
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
        if (!this.isReadOnly && this.pointerEnterAnimation) {
            this.pointerEnterAnimation();
        }
        return true;
    }
    /**
     * @internal
     */
    _onPointerOut(target, pi, force = false) {
        if (!this.isReadOnly && this.pointerOutAnimation) {
            this.pointerOutAnimation();
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
        if (!this.isReadOnly && this.pointerDownAnimation) {
            this.pointerDownAnimation();
        }
        return true;
    }
    _getRectangleFill(context) {
        if (this.isEnabled) {
            return this._getBackgroundColor(context);
        }
        else {
            return this._disabledColor;
        }
    }
    /**
     * @internal
     */
    _onPointerUp(target, coordinates, pointerId, buttonIndex, notifyClick, pi) {
        if (!this.isReadOnly && this.pointerUpAnimation) {
            this.pointerUpAnimation();
        }
        super._onPointerUp(target, coordinates, pointerId, buttonIndex, notifyClick, pi);
    }
    /**
     * Serializes the current button
     * @param serializationObject defines the JSON serialized object
     */
    serialize(serializationObject) {
        super.serialize(serializationObject);
        if (this._textBlock) {
            serializationObject.textBlockName = this._textBlock.name;
        }
        if (this._image) {
            serializationObject.imageName = this._image.name;
        }
    }
    /**
     * @internal
     */
    _parseFromContent(serializedObject, host) {
        super._parseFromContent(serializedObject, host);
        if (serializedObject.textBlockName) {
            this._textBlock = this.getChildByName(serializedObject.textBlockName);
        }
        if (serializedObject.imageName) {
            this._image = this.getChildByName(serializedObject.imageName);
        }
    }
    // Statics
    /**
     * Creates a new button made with an image and a text
     * @param name defines the name of the button
     * @param text defines the text of the button
     * @param imageUrl defines the url of the image
     * @returns a new Button
     */
    static CreateImageButton(name, text, imageUrl) {
        const result = new this(name);
        // Adding text
        const textBlock = new TextBlock(name + "_button", text);
        textBlock.textWrapping = true;
        textBlock.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        textBlock.paddingLeft = "20%";
        result.addControl(textBlock);
        // Adding image
        const iconImage = new Image(name + "_icon", imageUrl);
        iconImage.width = "20%";
        iconImage.stretch = Image.STRETCH_UNIFORM;
        iconImage.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        result.addControl(iconImage);
        // Store
        result._image = iconImage;
        result._textBlock = textBlock;
        return result;
    }
    /**
     * Creates a new button made with an image
     * @param name defines the name of the button
     * @param imageUrl defines the url of the image
     * @returns a new Button
     */
    static CreateImageOnlyButton(name, imageUrl) {
        const result = new this(name);
        // Adding image
        const iconImage = new Image(name + "_icon", imageUrl);
        iconImage.stretch = Image.STRETCH_FILL;
        iconImage.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        result.addControl(iconImage);
        // Store
        result._image = iconImage;
        return result;
    }
    /**
     * Creates a new button made with a text
     * @param name defines the name of the button
     * @param text defines the text of the button
     * @returns a new Button
     */
    static CreateSimpleButton(name, text) {
        const result = new this(name);
        // Adding text
        const textBlock = new TextBlock(name + "_button", text);
        textBlock.textWrapping = true;
        textBlock.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        result.addControl(textBlock);
        // Store
        result._textBlock = textBlock;
        return result;
    }
    /**
     * Creates a new button made with an image and a centered text
     * @param name defines the name of the button
     * @param text defines the text of the button
     * @param imageUrl defines the url of the image
     * @returns a new Button
     */
    static CreateImageWithCenterTextButton(name, text, imageUrl) {
        const result = new this(name);
        // Adding image
        const iconImage = new Image(name + "_icon", imageUrl);
        iconImage.stretch = Image.STRETCH_FILL;
        result.addControl(iconImage);
        // Adding text
        const textBlock = new TextBlock(name + "_button", text);
        textBlock.textWrapping = true;
        textBlock.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        result.addControl(textBlock);
        // Store
        result._image = iconImage;
        result._textBlock = textBlock;
        return result;
    }
}
RegisterClass("BABYLON.GUI.Button", Button);
//# sourceMappingURL=button.js.map