import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh.js";
import type { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import type { Nullable } from "@babylonjs/core/types.js";
import type { Scene } from "@babylonjs/core/scene.js";
import { AdvancedDynamicTexture } from "../../../2D/advancedDynamicTexture";
import { Color3, Color4 } from "@babylonjs/core/Maths/math.color.js";
import { MRDLBackglowMaterial } from "../../materials/mrdl/mrdlBackglowMaterial";
import { MRDLBackplateMaterial } from "../../materials/mrdl/mrdlBackplateMaterial";
import { MRDLFrontplateMaterial } from "../../materials/mrdl/mrdlFrontplateMaterial";
import { MRDLInnerquadMaterial } from "../../materials/mrdl/mrdlInnerquadMaterial";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial.js";
import { TouchButton3D } from "../touchButton3D";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode.js";
/**
 * Class used to create the mrtkv3 button
 */
export declare class TouchHolographicButton extends TouchButton3D {
    /**
     * Base Url for the frontplate model.
     */
    static MRTK_ASSET_BASE_URL: string;
    /**
     * File name for the frontplate model.
     */
    static FRONTPLATE_MODEL_FILENAME: string;
    /**
     * File name for the backplate model.
     */
    static BACKPLATE_MODEL_FILENAME: string;
    /**
     * File name for the backglow model.
     */
    static BACKGLOW_MODEL_FILENAME: string;
    /**
     * File name for the innerquad model.
     */
    static INNERQUAD_MODEL_FILENAME: string;
    /**
     * Gets or sets the horizontal scaling for the button.
     */
    width: number;
    /**
     * Gets or sets the vertical scaling for the button.
     */
    height: number;
    /**
     * Gets or sets the bevel radius for the button.
     */
    radius: number;
    /**
     * Gets or sets the font size of the button text in pixels.
     * This is only adjustable for a button with width to height ratio greater than 1.
     */
    textSizeInPixels: number;
    /**
     * Gets or sets the size of the button image in pixels.
     * This is only adjustable for a button with width to height ratio greater than 1.
     */
    imageSizeInPixels: number;
    /**
     * Gets or sets the color of the button plate.
     */
    plateMaterialColor: Color3;
    /**
     * Gets or sets the depth of the button's front plate.
     * This variable determines the z scaling and z position for some of the button's meshes.
     */
    frontPlateDepth: number;
    /**
     * Gets or sets the depth of the button's back plate.
     * This variable determines the z scaling and z position for some of the button's meshes.
     */
    backPlateDepth: number;
    /**
     * Gets or sets the offset value for button's back glow.
     * This variable determines the x, y scaling of the button's meshes.
     */
    backGlowOffset: number;
    /**
     * Gets or sets the value that determines the z scaling and z position for the innerQuad and BackGlow meshes.
     */
    flatPlaneDepth: number;
    /**
     * Gets or sets the radius for FrontMaterial and innerQuadMaterial.
     */
    innerQuadRadius: number;
    /**
     * Gets or sets the color for innerQuadMaterial.
     */
    innerQuadColor: Color4;
    /**
     * Gets or sets the color for innerQuadMaterial for when it is toggled.
     */
    innerQuadToggledColor: Color4;
    /**
     * Gets or sets the color for innerQuadMaterial for when it is hovered.
     */
    innerQuadHoverColor: Color4;
    /**
     * Gets or sets the color for innerQuadMaterial for when it is toggled and hovered.
     */
    innerQuadToggledHoverColor: Color4;
    private _backPlate;
    private _textPlate;
    private _frontPlate;
    private _backGlow;
    private _innerQuad;
    private _collisionPlate;
    private _frontPlateCollisionMesh;
    private _isBackplateVisible;
    private _text;
    private _subtext;
    private _imageUrl;
    private _shareMaterials;
    private _frontMaterial;
    private _backMaterial;
    private _backGlowMaterial;
    private _innerQuadMaterial;
    private _plateMaterial;
    private _pickedPointObserver;
    private _pointerClickObserver;
    private _pointerEnterObserver;
    private _pointerOutObserver;
    private _toggleObserver;
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
     * Set this property after adding the button to the GUI3DManager
     */
    set tooltipText(text: Nullable<string>);
    get tooltipText(): Nullable<string>;
    /**
     * Gets or sets text for the button
     */
    get text(): string;
    set text(value: string);
    /**
     * Gets or sets subtext for a button with larger width
     */
    get subtext(): string;
    set subtext(value: string);
    /**
     * Gets or sets the image url for the button
     */
    get imageUrl(): string;
    set imageUrl(value: string);
    /**
     * Gets the back material used by this button
     */
    get backMaterial(): MRDLBackplateMaterial;
    /**
     * Gets the front material used by this button
     */
    get frontMaterial(): MRDLFrontplateMaterial;
    /**
     * Gets the back glow material used by this button
     */
    get backGlowMaterial(): MRDLBackglowMaterial;
    /**
     * Gets the inner quad material used by this button
     */
    get innerQuadMaterial(): MRDLInnerquadMaterial;
    /**
     * Gets the plate material used by this button
     */
    get plateMaterial(): StandardMaterial;
    /**
     * Gets a boolean indicating if this button shares its material with other V3 Buttons
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
    private _getAspectRatio;
    private _alignContentVertically;
    private _alignContentHorizontally;
    protected _createNode(scene: Scene): TransformNode;
    private _createBackPlate;
    private _createFrontPlate;
    private _createInnerQuad;
    private _createBackGlow;
    protected _applyFacade(facadeTexture: AdvancedDynamicTexture): void;
    private _performClickAnimation;
    private _performEnterExitAnimation;
    private _createBackMaterial;
    private _createFrontMaterial;
    private _createBackGlowMaterial;
    private _createInnerQuadMaterial;
    private _createPlateMaterial;
    protected _onToggle(newState: boolean): void;
    protected _affectMaterial(mesh: Mesh): void;
    /**
     * Releases all associated resources
     */
    dispose(): void;
}
