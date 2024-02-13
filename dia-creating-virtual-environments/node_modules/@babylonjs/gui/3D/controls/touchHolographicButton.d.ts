import type { Nullable } from "@babylonjs/core/types.js";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial.js";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode.js";
import { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import type { Scene } from "@babylonjs/core/scene.js";
import { FluentMaterial } from "../materials/fluent/fluentMaterial";
import { FluentButtonMaterial } from "../materials/fluentButton/fluentButtonMaterial";
import { AdvancedDynamicTexture } from "../../2D/advancedDynamicTexture";
import { TouchButton3D } from "./touchButton3D";
import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh.js";
/**
 * Class used to create a holographic button in 3D
 * @since 5.0.0
 */
export declare class TouchHolographicButton extends TouchButton3D {
    /**
     * Base Url for the button model.
     */
    static MODEL_BASE_URL: string;
    /**
     * File name for the button model.
     */
    static MODEL_FILENAME: string;
    private _backPlate;
    private _textPlate;
    private _frontPlate;
    private _text;
    private _imageUrl;
    private _shareMaterials;
    private _isBackplateVisible;
    private _frontMaterial;
    private _backMaterial;
    private _plateMaterial;
    private _pickedPointObserver;
    private _pointerHoverObserver;
    private _frontPlateDepth;
    private _backPlateDepth;
    private _backplateColor;
    private _backplateToggledColor;
    private _tooltipFade;
    private _tooltipTextBlock;
    private _tooltipTexture;
    private _tooltipMesh;
    private _tooltipHoverObserver;
    private _tooltipOutObserver;
    private _disposeTooltip;
    /**
     * Rendering ground id of all the mesh in the button
     */
    set renderingGroupId(id: number);
    get renderingGroupId(): number;
    /**
     * Gets the mesh used to render this control
     */
    get mesh(): Nullable<AbstractMesh>;
    /**
     * Text to be displayed on the tooltip shown when hovering on the button. When set to null tooltip is disabled. (Default: null)
     */
    set tooltipText(text: Nullable<string>);
    get tooltipText(): Nullable<string>;
    /**
     * Gets or sets text for the button
     */
    get text(): string;
    set text(value: string);
    /**
     * Gets or sets the image url for the button
     */
    get imageUrl(): string;
    set imageUrl(value: string);
    /**
     * Gets the back material used by this button
     */
    get backMaterial(): FluentMaterial;
    /**
     * Gets the front material used by this button
     */
    get frontMaterial(): FluentButtonMaterial;
    /**
     * Gets the plate material used by this button
     */
    get plateMaterial(): StandardMaterial;
    /**
     * Gets a boolean indicating if this button shares its material with other HolographicButtons
     */
    get shareMaterials(): boolean;
    /**
     * Sets whether the backplate is visible or hidden. Hiding the backplate is not recommended without some sort of replacement
     */
    set isBackplateVisible(isVisible: boolean);
    /**
     * Creates a new button
     * @param name defines the control name
     * @param shareMaterials
     */
    constructor(name?: string, shareMaterials?: boolean);
    protected _getTypeName(): string;
    private _rebuildContent;
    protected _createNode(scene: Scene): TransformNode;
    protected _applyFacade(facadeTexture: AdvancedDynamicTexture): void;
    private _createBackMaterial;
    private _createFrontMaterial;
    private _createPlateMaterial;
    protected _onToggle(newState: boolean): void;
    protected _affectMaterial(mesh: Mesh): void;
    /**
     * Releases all associated resources
     */
    dispose(): void;
}
