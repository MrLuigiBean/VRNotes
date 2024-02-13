import { Gizmo } from "@babylonjs/core/Gizmos/gizmo.js";
import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh.js";
import type { UtilityLayerRenderer } from "@babylonjs/core/Rendering/utilityLayerRenderer.js";
import type { Nullable } from "@babylonjs/core/types.js";
import type { HolographicSlate } from "../controls/holographicSlate";
/**
 * Gizmo to resize 2D slates
 */
export declare class SlateGizmo extends Gizmo {
    private _boundingDimensions;
    private _pickedPointObserver;
    private _renderObserver;
    private _tmpQuaternion;
    private _tmpVector;
    private _corners;
    private _sides;
    private _handlesParent;
    private _handleHovered;
    private _handleDragged;
    private _boundingBoxGizmo;
    /**
     * Value we use to offset handles from mesh
     */
    private _margin;
    private _handleSize;
    private _attachedSlate;
    private _existingSlateScale;
    /**
     * If set, the handles will increase in size based on the distance away from the camera to have a consistent screen size (Default: true)
     */
    fixedScreenSize: boolean;
    /**
     * The distance away from the object which the draggable meshes should appear world sized when fixedScreenSize is set to true (default: 10)
     */
    fixedScreenSizeDistanceFactor: number;
    /**
     * The slate attached to this gizmo
     */
    set attachedSlate(control: Nullable<HolographicSlate>);
    get attachedSlate(): Nullable<HolographicSlate>;
    constructor(utilityLayer?: UtilityLayerRenderer);
    private _createNode;
    private _keepAspectRatio;
    private _clampDimensions;
    private _moveHandle;
    private _assignDragBehaviorCorners;
    private _assignDragBehaviorSides;
    protected _attachedNodeChanged(value: Nullable<AbstractMesh>): void;
    /**
     * Updates the bounding box information for the gizmo
     */
    updateBoundingBox(): void;
    private _updateHandlesPosition;
    private _updateHandlesScaling;
    protected _update(): void;
    dispose(): void;
}
