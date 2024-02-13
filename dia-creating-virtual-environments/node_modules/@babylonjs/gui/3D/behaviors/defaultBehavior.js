import { FollowBehavior } from "@babylonjs/core/Behaviors/Meshes/followBehavior.js";
import { SixDofDragBehavior } from "@babylonjs/core/Behaviors/Meshes/sixDofDragBehavior.js";
import { SurfaceMagnetismBehavior } from "@babylonjs/core/Behaviors/Meshes/surfaceMagnetismBehavior.js";
/**
 * Default behavior for 3D UI elements.
 * Handles a FollowBehavior, SixDofBehavior and SurfaceMagnetismBehavior
 * @since 5.0.0
 */
export class DefaultBehavior {
    /**
     * Instantiates the default behavior
     */
    constructor() {
        /**
         * Enables the follow behavior
         */
        this.followBehaviorEnabled = false;
        /**
         * Enables the six DoF drag behavior
         */
        this.sixDofDragBehaviorEnabled = true;
        /**
         * Enables the surface magnetism behavior
         */
        this.surfaceMagnetismBehaviorEnabled = true;
        this._followBehavior = new FollowBehavior();
        this._sixDofDragBehavior = new SixDofDragBehavior();
        this._surfaceMagnetismBehavior = new SurfaceMagnetismBehavior();
    }
    /**
     *  The name of the behavior
     */
    get name() {
        return "Default";
    }
    /**
     *  The follow behavior
     */
    get followBehavior() {
        return this._followBehavior;
    }
    /**
     *  The six DoF drag behavior
     */
    get sixDofDragBehavior() {
        return this._sixDofDragBehavior;
    }
    /**
     * The surface magnetism behavior
     */
    get surfaceMagnetismBehavior() {
        return this._surfaceMagnetismBehavior;
    }
    /**
     *  Initializes the behavior
     */
    init() { }
    /**
     * Attaches the default behavior
     * @param ownerMesh The top level mesh
     * @param draggablesMeshes Descendant meshes that can be used for dragging the owner mesh
     * @param sceneUnderstandingMeshes Meshes from the scene understanding that will be used for surface magnetism
     */
    attach(ownerMesh, draggablesMeshes, sceneUnderstandingMeshes) {
        this._scene = ownerMesh.getScene();
        this.attachedNode = ownerMesh;
        this._addObservables();
        // Since our observables are bound before the child behaviors', ours are called first
        this._followBehavior.attach(ownerMesh);
        this._sixDofDragBehavior.attach(ownerMesh);
        this._sixDofDragBehavior.draggableMeshes = draggablesMeshes || null;
        this._sixDofDragBehavior.faceCameraOnDragStart = true;
        this._surfaceMagnetismBehavior.attach(ownerMesh, this._scene);
        if (sceneUnderstandingMeshes) {
            this._surfaceMagnetismBehavior.meshes = sceneUnderstandingMeshes;
        }
        // We disable this behavior because we will handle pose changing event manually with sixDofDragBehavior
        this._surfaceMagnetismBehavior.enabled = false;
    }
    /**
     *  Detaches the behavior from the mesh
     */
    detach() {
        this.attachedNode = null;
        this._removeObservables();
        this._followBehavior.detach();
        this._sixDofDragBehavior.detach();
        this._surfaceMagnetismBehavior.detach();
    }
    _addObservables() {
        this._onBeforeRenderObserver = this._scene.onBeforeRenderObservable.add(() => {
            this._followBehavior._enabled = !this._sixDofDragBehavior.isMoving && this.followBehaviorEnabled;
        });
        this._onDragObserver = this._sixDofDragBehavior.onDragObservable.add((event) => {
            this._sixDofDragBehavior.disableMovement = this._surfaceMagnetismBehavior.findAndUpdateTarget(event.pickInfo);
        });
    }
    _removeObservables() {
        this._scene.onBeforeRenderObservable.remove(this._onBeforeRenderObserver);
        this._sixDofDragBehavior.onDragObservable.remove(this._onDragObserver);
    }
}
//# sourceMappingURL=defaultBehavior.js.map