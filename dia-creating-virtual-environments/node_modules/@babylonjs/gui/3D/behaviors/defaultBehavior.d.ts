import type { Behavior } from "@babylonjs/core/Behaviors/behavior.js";
import { FollowBehavior } from "@babylonjs/core/Behaviors/Meshes/followBehavior.js";
import { SixDofDragBehavior } from "@babylonjs/core/Behaviors/Meshes/sixDofDragBehavior.js";
import type { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import type { Nullable } from "@babylonjs/core/types.js";
import { SurfaceMagnetismBehavior } from "@babylonjs/core/Behaviors/Meshes/surfaceMagnetismBehavior.js";
import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh.js";
/**
 * Default behavior for 3D UI elements.
 * Handles a FollowBehavior, SixDofBehavior and SurfaceMagnetismBehavior
 * @since 5.0.0
 */
export declare class DefaultBehavior implements Behavior<Mesh> {
    private _scene;
    private _followBehavior;
    private _sixDofDragBehavior;
    private _surfaceMagnetismBehavior;
    private _onBeforeRenderObserver;
    private _onDragObserver;
    /**
     * Instantiates the default behavior
     */
    constructor();
    /**
     * Attached node of this behavior
     */
    attachedNode: Nullable<Mesh>;
    /**
     *  The name of the behavior
     */
    get name(): string;
    /**
     *  The follow behavior
     */
    get followBehavior(): FollowBehavior;
    /**
     *  The six DoF drag behavior
     */
    get sixDofDragBehavior(): SixDofDragBehavior;
    /**
     * The surface magnetism behavior
     */
    get surfaceMagnetismBehavior(): SurfaceMagnetismBehavior;
    /**
     * Enables the follow behavior
     */
    followBehaviorEnabled: boolean;
    /**
     * Enables the six DoF drag behavior
     */
    sixDofDragBehaviorEnabled: boolean;
    /**
     * Enables the surface magnetism behavior
     */
    surfaceMagnetismBehaviorEnabled: boolean;
    /**
     *  Initializes the behavior
     */
    init(): void;
    /**
     * Attaches the default behavior
     * @param ownerMesh The top level mesh
     * @param draggablesMeshes Descendant meshes that can be used for dragging the owner mesh
     * @param sceneUnderstandingMeshes Meshes from the scene understanding that will be used for surface magnetism
     */
    attach(ownerMesh: Mesh, draggablesMeshes?: Mesh[], sceneUnderstandingMeshes?: AbstractMesh[]): void;
    /**
     *  Detaches the behavior from the mesh
     */
    detach(): void;
    private _addObservables;
    private _removeObservables;
}
