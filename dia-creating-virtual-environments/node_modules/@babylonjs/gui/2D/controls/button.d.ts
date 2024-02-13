import type { Nullable } from "@babylonjs/core/types.js";
import type { Vector2 } from "@babylonjs/core/Maths/math.vector.js";
import { Rectangle } from "./rectangle";
import { Control } from "./control";
import { TextBlock } from "./textBlock";
import { Image } from "./image";
import type { PointerInfoBase } from "@babylonjs/core/Events/pointerEvents.js";
import type { AdvancedDynamicTexture } from "../advancedDynamicTexture";
import type { ICanvasRenderingContext } from "@babylonjs/core/Engines/ICanvas.js";
/**
 * Class used to create 2D buttons
 */
export declare class Button extends Rectangle {
    name?: string | undefined;
    /**
     * Function called to generate a pointer enter animation
     */
    pointerEnterAnimation: () => void;
    /**
     * Function called to generate a pointer out animation
     */
    pointerOutAnimation: () => void;
    /**
     * Function called to generate a pointer down animation
     */
    pointerDownAnimation: () => void;
    /**
     * Function called to generate a pointer up animation
     */
    pointerUpAnimation: () => void;
    /**
     * Gets or sets a boolean indicating that the button will let internal controls handle picking instead of doing it directly using its bounding info
     */
    delegatePickingToChildren: boolean;
    private _image;
    /**
     * Returns the image part of the button (if any)
     */
    get image(): Nullable<Image>;
    private _textBlock;
    /**
     * Returns the TextBlock part of the button (if any)
     */
    get textBlock(): Nullable<TextBlock>;
    /**
     * Creates a new Button
     * @param name defines the name of the button
     */
    constructor(name?: string | undefined);
    protected _getTypeName(): string;
    /**
     * @internal
     */
    _processPicking(x: number, y: number, pi: PointerInfoBase, type: number, pointerId: number, buttonIndex: number, deltaX?: number, deltaY?: number): boolean;
    /**
     * @internal
     */
    _onPointerEnter(target: Control, pi: PointerInfoBase): boolean;
    /**
     * @internal
     */
    _onPointerOut(target: Control, pi: PointerInfoBase, force?: boolean): void;
    /**
     * @internal
     */
    _onPointerDown(target: Control, coordinates: Vector2, pointerId: number, buttonIndex: number, pi: PointerInfoBase): boolean;
    protected _getRectangleFill(context: ICanvasRenderingContext): string | CanvasGradient;
    /**
     * @internal
     */
    _onPointerUp(target: Control, coordinates: Vector2, pointerId: number, buttonIndex: number, notifyClick: boolean, pi: PointerInfoBase): void;
    /**
     * Serializes the current button
     * @param serializationObject defines the JSON serialized object
     */
    serialize(serializationObject: any): void;
    /**
     * @internal
     */
    _parseFromContent(serializedObject: any, host: AdvancedDynamicTexture): void;
    /**
     * Creates a new button made with an image and a text
     * @param name defines the name of the button
     * @param text defines the text of the button
     * @param imageUrl defines the url of the image
     * @returns a new Button
     */
    static CreateImageButton(name: string, text: string, imageUrl: string): Button;
    /**
     * Creates a new button made with an image
     * @param name defines the name of the button
     * @param imageUrl defines the url of the image
     * @returns a new Button
     */
    static CreateImageOnlyButton(name: string, imageUrl: string): Button;
    /**
     * Creates a new button made with a text
     * @param name defines the name of the button
     * @param text defines the text of the button
     * @returns a new Button
     */
    static CreateSimpleButton(name: string, text: string): Button;
    /**
     * Creates a new button made with an image and a centered text
     * @param name defines the name of the button
     * @param text defines the text of the button
     * @param imageUrl defines the url of the image
     * @returns a new Button
     */
    static CreateImageWithCenterTextButton(name: string, text: string, imageUrl: string): Button;
}
