import { ContentDisplay3D } from "./contentDisplay3D";
import { TouchHolographicButton } from "./touchHolographicButton";
import { AdvancedDynamicTexture } from "../../2D/advancedDynamicTexture";
import { DefaultBehavior } from "../behaviors/defaultBehavior";
import { SlateGizmo } from "../gizmos/slateGizmo";
import { Vector2, Vector3 } from "@babylonjs/core/Maths/math.vector.js";
import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh.js";
import type { TransformNode } from "@babylonjs/core/Meshes/transformNode.js";
import { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import type { Scene } from "@babylonjs/core/scene.js";
/**
 * Class used to create a holographic slate
 * @since 5.0.0
 */
export declare class HolographicSlate extends ContentDisplay3D {
    /**
     * Base Url for the assets.
     */
    static ASSETS_BASE_URL: string;
    /**
     * File name for the close icon.
     */
    static CLOSE_ICON_FILENAME: string;
    /**
     * File name for the close icon.
     */
    static FOLLOW_ICON_FILENAME: string;
    private static _DEFAULT_TEXT_RESOLUTION_Y;
    /**
     * Margin between title bar and contentplate
     */
    titleBarMargin: number;
    /**
     * Origin in local coordinates (top left corner)
     */
    origin: Vector3;
    private _dimensions;
    private _titleBarHeight;
    private _titleBarMaterial;
    private _backMaterial;
    private _contentMaterial;
    private _pickedPointObserver;
    private _positionChangedObserver;
    private _titleText;
    private _titleTextComponent;
    private _contentViewport;
    private _contentDragBehavior;
    private _defaultBehavior;
    /**
     * Regroups all mesh behaviors for the slate
     */
    get defaultBehavior(): DefaultBehavior;
    /** @internal */
    _gizmo: SlateGizmo;
    protected _titleBar: Mesh;
    protected _titleBarTitle: Mesh;
    protected _contentPlate: Mesh;
    protected _backPlate: Mesh;
    /** @internal */
    _followButton: TouchHolographicButton;
    protected _closeButton: TouchHolographicButton;
    protected _contentScaleRatio: number;
    /**
     * 2D dimensions of the slate
     */
    get dimensions(): Vector2;
    set dimensions(value: Vector2);
    /**
     * Minimum dimensions of the slate
     */
    minDimensions: Vector2;
    /**
     * Default dimensions of the slate
     */
    readonly defaultDimensions: Vector2;
    /**
     * Height of the title bar component
     */
    get titleBarHeight(): number;
    set titleBarHeight(value: number);
    /**
     * Rendering ground id of all the meshes
     */
    set renderingGroupId(id: number);
    get renderingGroupId(): number;
    /**
     * The title text displayed at the top of the slate
     */
    set title(title: string);
    get title(): string;
    /**
     * Creates a new slate
     * @param name defines the control name
     */
    constructor(name?: string);
    /**
     * Apply the facade texture (created from the content property).
     * This function can be overloaded by child classes
     * @param facadeTexture defines the AdvancedDynamicTexture to use
     */
    protected _applyFacade(facadeTexture: AdvancedDynamicTexture): void;
    private _addControl;
    protected _getTypeName(): string;
    /**
     * @internal
     */
    _positionElements(): void;
    private _applyContentViewport;
    private _resetContentPositionAndZoom;
    /**
     * @internal
     */
    _updatePivot(): void;
    protected _createNode(scene: Scene): TransformNode;
    private _attachContentPlateBehavior;
    protected _affectMaterial(mesh: AbstractMesh): void;
    /**
     * @internal*
     */
    _prepareNode(scene: Scene): void;
    /**
     * Resets the aspect and pose of the slate so it is right in front of the active camera, facing towards it.
     * @param resetAspect Should the slate's dimensions/aspect ratio be reset as well
     */
    resetDefaultAspectAndPose(resetAspect?: boolean): void;
    /**
     * Releases all associated resources
     */
    dispose(): void;
}
