import type { Nullable } from "../types";
import { Color3 } from "../Maths/math.color";
import { Mesh } from "../Meshes/mesh";
import type { IGizmo } from "./gizmo";
import { Gizmo } from "./gizmo";
import { UtilityLayerRenderer } from "../Rendering/utilityLayerRenderer";
import { StandardMaterial } from "../Materials/standardMaterial";
import type { Camera } from "../Cameras/camera";
import type { PointerInfo } from "../Events/pointerEvents";
import type { Observer } from "../Misc/observable";
import { Observable } from "../Misc/observable";
/**
 * Interface for camera gizmo
 */
export interface ICameraGizmo extends IGizmo {
    /** Event that fires each time the gizmo is clicked */
    onClickedObservable: Observable<Camera>;
    /** A boolean indicating if frustum lines must be rendered */
    displayFrustum: boolean;
    /** The camera that the gizmo is attached to */
    camera: Nullable<Camera>;
    /** The material used to render the camera gizmo */
    readonly material: StandardMaterial;
}
/**
 * Gizmo that enables viewing a camera
 */
export declare class CameraGizmo extends Gizmo implements ICameraGizmo {
    protected _cameraMesh: Mesh;
    protected _cameraLinesMesh: Mesh;
    protected _material: StandardMaterial;
    protected _pointerObserver: Nullable<Observer<PointerInfo>>;
    private _frustumLinesColor?;
    /**
     * Event that fires each time the gizmo is clicked
     */
    onClickedObservable: Observable<Camera>;
    /**
     * Creates a CameraGizmo
     * @param gizmoLayer The utility layer the gizmo will be added to
     * @param gizmoColor Camera mesh color. Default is Gray
     * @param frustumLinesColor Frustum lines color. Default is White
     */
    constructor(gizmoLayer?: UtilityLayerRenderer, gizmoColor?: Color3, frustumLinesColor?: Color3);
    protected _camera: Nullable<Camera>;
    /** Gets or sets a boolean indicating if frustum lines must be rendered (true by default)) */
    get displayFrustum(): boolean;
    set displayFrustum(value: boolean);
    /**
     * The camera that the gizmo is attached to
     */
    set camera(camera: Nullable<Camera>);
    get camera(): Nullable<Camera>;
    /**
     * Gets the material used to render the camera gizmo
     */
    get material(): StandardMaterial;
    /**
     * @internal
     * Updates the gizmo to match the attached mesh's position/rotation
     */
    protected _update(): void;
    private static _Scale;
    private _invProjection;
    /**
     * Disposes and replaces the current camera mesh in the gizmo with the specified mesh
     * @param mesh The mesh to replace the default mesh of the camera gizmo
     */
    setCustomMesh(mesh: Mesh): void;
    /**
     * Disposes of the camera gizmo
     */
    dispose(): void;
    private static _CreateCameraMesh;
    private static _CreateCameraFrustum;
}
