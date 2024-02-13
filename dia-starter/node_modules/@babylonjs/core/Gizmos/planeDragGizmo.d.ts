import type { Observer } from "../Misc/observable";
import { Observable } from "../Misc/observable";
import type { Nullable } from "../types";
import type { PointerInfo } from "../Events/pointerEvents";
import { Vector3 } from "../Maths/math.vector";
import { Color3 } from "../Maths/math.color";
import { TransformNode } from "../Meshes/transformNode";
import type { Node } from "../node";
import { PointerDragBehavior } from "../Behaviors/Meshes/pointerDragBehavior";
import type { IGizmo } from "./gizmo";
import { Gizmo } from "./gizmo";
import { UtilityLayerRenderer } from "../Rendering/utilityLayerRenderer";
import { StandardMaterial } from "../Materials/standardMaterial";
import type { Scene } from "../scene";
import type { PositionGizmo } from "./positionGizmo";
/**
 * Interface for plane drag gizmo
 */
export interface IPlaneDragGizmo extends IGizmo {
    /** Drag behavior responsible for the gizmos dragging interactions */
    dragBehavior: PointerDragBehavior;
    /** Drag distance in babylon units that the gizmo will snap to when dragged */
    snapDistance: number;
    /**
     * Event that fires each time the gizmo snaps to a new location.
     * * snapDistance is the change in distance
     */
    onSnapObservable: Observable<{
        snapDistance: number;
    }>;
    /** If the gizmo is enabled */
    isEnabled: boolean;
    /** Default material used to render when gizmo is not disabled or hovered */
    coloredMaterial: StandardMaterial;
    /** Material used to render when gizmo is hovered with mouse */
    hoverMaterial: StandardMaterial;
    /** Material used to render when gizmo is disabled. typically grey. */
    disableMaterial: StandardMaterial;
}
/**
 * Single plane drag gizmo
 */
export declare class PlaneDragGizmo extends Gizmo implements IPlaneDragGizmo {
    /**
     * Drag behavior responsible for the gizmos dragging interactions
     */
    dragBehavior: PointerDragBehavior;
    protected _pointerObserver: Nullable<Observer<PointerInfo>>;
    /**
     * Drag distance in babylon units that the gizmo will snap to when dragged (Default: 0)
     */
    snapDistance: number;
    /**
     * Event that fires each time the gizmo snaps to a new location.
     * * snapDistance is the change in distance
     */
    onSnapObservable: Observable<{
        snapDistance: number;
    }>;
    protected _gizmoMesh: TransformNode;
    protected _coloredMaterial: StandardMaterial;
    protected _hoverMaterial: StandardMaterial;
    protected _disableMaterial: StandardMaterial;
    protected _isEnabled: boolean;
    protected _parent: Nullable<PositionGizmo>;
    protected _dragging: boolean;
    /** Default material used to render when gizmo is not disabled or hovered */
    get coloredMaterial(): StandardMaterial;
    /** Material used to render when gizmo is hovered with mouse*/
    get hoverMaterial(): StandardMaterial;
    /** Material used to render when gizmo is disabled. typically grey.*/
    get disableMaterial(): StandardMaterial;
    /**
     * @internal
     */
    static _CreatePlane(scene: Scene, material: StandardMaterial): TransformNode;
    /**
     * Creates a PlaneDragGizmo
     * @param dragPlaneNormal The axis normal to which the gizmo will be able to drag on
     * @param color The color of the gizmo
     * @param gizmoLayer The utility layer the gizmo will be added to
     * @param parent
     * @param hoverColor The color of the gizmo when hovering over and dragging
     * @param disableColor The Color of the gizmo when its disabled
     */
    constructor(dragPlaneNormal: Vector3, color?: Color3, gizmoLayer?: UtilityLayerRenderer, parent?: Nullable<PositionGizmo>, hoverColor?: Color3, disableColor?: Color3);
    protected _attachedNodeChanged(value: Nullable<Node>): void;
    /**
     * If the gizmo is enabled
     */
    set isEnabled(value: boolean);
    get isEnabled(): boolean;
    /**
     * Disposes of the gizmo
     */
    dispose(): void;
}
