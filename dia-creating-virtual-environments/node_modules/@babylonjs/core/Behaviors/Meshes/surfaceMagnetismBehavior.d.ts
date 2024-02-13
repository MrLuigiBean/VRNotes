import type { PickingInfo } from "../../Collisions/pickingInfo";
import type { AbstractMesh } from "../../Meshes/abstractMesh";
import type { Mesh } from "../../Meshes/mesh";
import type { Scene } from "../../scene";
import type { Behavior } from "../behavior";
/**
 * A behavior that allows a transform node to stick to a surface position/orientation
 * @since 5.0.0
 */
export declare class SurfaceMagnetismBehavior implements Behavior<Mesh> {
    private _scene;
    private _attachedMesh;
    private _attachPointLocalOffset;
    private _pointerObserver;
    private _workingPosition;
    private _workingQuaternion;
    private _lastTick;
    private _onBeforeRender;
    private _hit;
    /**
     * Distance offset from the hit point to place the target at, along the hit normal.
     */
    hitNormalOffset: number;
    /**
     * Name of the behavior
     */
    get name(): string;
    /**
     * Spatial mapping meshes to collide with
     */
    meshes: AbstractMesh[];
    /**
     * Function called when the behavior needs to be initialized (after attaching it to a target)
     */
    init(): void;
    /**
     * Set to false if the node should strictly follow the camera without any interpolation time
     */
    interpolatePose: boolean;
    /**
     * Rate of interpolation of position and rotation of the attached node.
     * Higher values will give a slower interpolation.
     */
    lerpTime: number;
    /**
     * If true, pitch and roll are omitted.
     */
    keepOrientationVertical: boolean;
    /**
     * Is this behavior reacting to pointer events
     */
    enabled: boolean;
    /**
     * Maximum distance for the node to stick to the surface
     */
    maxStickingDistance: number;
    /**
     * Attaches the behavior to a transform node
     * @param target defines the target where the behavior is attached to
     * @param scene the scene
     */
    attach(target: Mesh, scene?: Scene): void;
    /**
     * Detaches the behavior
     */
    detach(): void;
    private _getTargetPose;
    /**
     * Updates the attach point with the current geometry extents of the attached mesh
     */
    updateAttachPoint(): void;
    /**
     * Finds the intersection point of the given ray onto the meshes and updates the target.
     * Transformation will be interpolated according to `interpolatePose` and `lerpTime` properties.
     * If no mesh of `meshes` are hit, this does nothing.
     * @param pickInfo The input pickingInfo that will be used to intersect the meshes
     * @returns a boolean indicating if we found a hit to stick to
     */
    findAndUpdateTarget(pickInfo: PickingInfo): boolean;
    private _getAttachPointOffsetToRef;
    private _updateTransformToGoal;
    private _addObservables;
    private _removeObservables;
}
