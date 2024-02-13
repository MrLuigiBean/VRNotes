import { Observable } from "@babylonjs/core/Misc/observable.js";
import { Vector3 } from "@babylonjs/core/Maths/math.vector.js";
import { PointerEventTypes } from "@babylonjs/core/Events/pointerEvents.js";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight.js";
import { UtilityLayerRenderer } from "@babylonjs/core/Rendering/utilityLayerRenderer.js";
import { EngineStore } from "@babylonjs/core/Engines/engineStore.js";
import { Container3D } from "./controls/container3D.js";
/**
 * Class used to manage 3D user interface
 * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui3D
 */
export class GUI3DManager {
    /** Gets the hosting scene */
    get scene() {
        return this._scene;
    }
    /** Gets associated utility layer */
    get utilityLayer() {
        return this._utilityLayer;
    }
    /** Gets the scaling for all UI elements owned by this manager */
    get controlScaling() {
        return this._customControlScaling;
    }
    /** Sets the scaling adjustment for all UI elements owned by this manager */
    set controlScaling(newScale) {
        if (this._customControlScaling !== newScale && newScale > 0) {
            const scaleRatio = newScale / this._customControlScaling;
            this._customControlScaling = newScale;
            this._rootContainer.children.forEach((control) => {
                control.scaling.scaleInPlace(scaleRatio);
                if (newScale !== 1) {
                    control._isScaledByManager = true;
                }
            });
        }
    }
    /** Gets if controls attached to this manager are realistically sized, based on the fact that 1 unit length is 1 meter */
    get useRealisticScaling() {
        return this.controlScaling === GUI3DManager.MRTK_REALISTIC_SCALING;
    }
    /** Sets if controls attached to this manager are realistically sized, based on the fact that 1 unit length is 1 meter */
    set useRealisticScaling(newValue) {
        this.controlScaling = newValue ? GUI3DManager.MRTK_REALISTIC_SCALING : 1;
    }
    /**
     * Creates a new GUI3DManager
     * @param scene
     */
    constructor(scene) {
        this._customControlScaling = 1.0;
        /** @internal */
        this._lastControlOver = {};
        /** @internal */
        this._lastControlDown = {};
        /**
         * Observable raised when the point picked by the pointer events changed
         */
        this.onPickedPointChangedObservable = new Observable();
        /**
         * Observable raised when a picking happens
         */
        this.onPickingObservable = new Observable();
        // Shared resources
        /** @internal */
        this._sharedMaterials = {};
        /** @internal */
        this._touchSharedMaterials = {};
        this._scene = scene || EngineStore.LastCreatedScene;
        this._sceneDisposeObserver = this._scene.onDisposeObservable.add(() => {
            this._sceneDisposeObserver = null;
            this._utilityLayer = null;
            this.dispose();
        });
        this._utilityLayer = UtilityLayerRenderer._CreateDefaultUtilityLayerFromScene(this._scene);
        this._utilityLayer.onlyCheckPointerDownEvents = false;
        this._utilityLayer.pickUtilitySceneFirst = false;
        this._utilityLayer.mainSceneTrackerPredicate = (mesh) => {
            return mesh && mesh.reservedDataStore?.GUI3D?.control?._node;
        };
        // Root
        this._rootContainer = new Container3D("RootContainer");
        this._rootContainer._host = this;
        const utilityLayerScene = this._utilityLayer.utilityLayerScene;
        // Events
        this._pointerOutObserver = this._utilityLayer.onPointerOutObservable.add((pointerId) => {
            this._handlePointerOut(pointerId, true);
        });
        this._pointerObserver = utilityLayerScene.onPointerObservable.add((pi) => {
            this._doPicking(pi);
        });
        // Scene
        this._utilityLayer.utilityLayerScene.autoClear = false;
        this._utilityLayer.utilityLayerScene.autoClearDepthAndStencil = false;
        new HemisphericLight("hemi", Vector3.Up(), this._utilityLayer.utilityLayerScene);
    }
    _handlePointerOut(pointerId, isPointerUp) {
        const previousControlOver = this._lastControlOver[pointerId];
        if (previousControlOver) {
            previousControlOver._onPointerOut(previousControlOver);
            delete this._lastControlOver[pointerId];
        }
        if (isPointerUp) {
            if (this._lastControlDown[pointerId]) {
                this._lastControlDown[pointerId].forcePointerUp();
                delete this._lastControlDown[pointerId];
            }
        }
        this.onPickedPointChangedObservable.notifyObservers(null);
    }
    _doPicking(pi) {
        if (!this._utilityLayer || !this._utilityLayer.shouldRender || !this._utilityLayer.utilityLayerScene.activeCamera) {
            return false;
        }
        const pointerEvent = pi.event;
        const pointerId = pointerEvent.pointerId || 0;
        const buttonIndex = pointerEvent.button;
        const pickingInfo = pi.pickInfo;
        if (pickingInfo) {
            this.onPickingObservable.notifyObservers(pickingInfo.pickedMesh);
        }
        if (!pickingInfo || !pickingInfo.hit) {
            this._handlePointerOut(pointerId, pi.type === PointerEventTypes.POINTERUP);
            return false;
        }
        if (pickingInfo.pickedPoint) {
            this.onPickedPointChangedObservable.notifyObservers(pickingInfo.pickedPoint);
        }
        const control = pickingInfo.pickedMesh.reservedDataStore?.GUI3D?.control;
        if (!!control && !control._processObservables(pi.type, pickingInfo.pickedPoint, pickingInfo.originMesh?.position || null, pointerId, buttonIndex)) {
            if (pi.type === PointerEventTypes.POINTERMOVE) {
                if (this._lastControlOver[pointerId]) {
                    this._lastControlOver[pointerId]._onPointerOut(this._lastControlOver[pointerId]);
                }
                delete this._lastControlOver[pointerId];
            }
        }
        if (pi.type === PointerEventTypes.POINTERUP) {
            if (this._lastControlDown[pointerEvent.pointerId]) {
                this._lastControlDown[pointerEvent.pointerId].forcePointerUp();
                delete this._lastControlDown[pointerEvent.pointerId];
            }
            if (pointerEvent.pointerType === "touch" || (pointerEvent.pointerType === "xr" && this._scene.getEngine().hostInformation.isMobile)) {
                this._handlePointerOut(pointerId, false);
            }
        }
        return true;
    }
    /**
     * Gets the root container
     */
    get rootContainer() {
        return this._rootContainer;
    }
    /**
     * Gets a boolean indicating if the given control is in the root child list
     * @param control defines the control to check
     * @returns true if the control is in the root child list
     */
    containsControl(control) {
        return this._rootContainer.containsControl(control);
    }
    /**
     * Adds a control to the root child list
     * @param control defines the control to add
     * @returns the current manager
     */
    addControl(control) {
        this._rootContainer.addControl(control);
        if (this._customControlScaling !== 1) {
            control.scaling.scaleInPlace(this._customControlScaling);
            control._isScaledByManager = true;
        }
        return this;
    }
    /**
     * Removes a control from the root child list
     * @param control defines the control to remove
     * @returns the current container
     */
    removeControl(control) {
        this._rootContainer.removeControl(control);
        if (control._isScaledByManager) {
            control.scaling.scaleInPlace(1 / this._customControlScaling);
            control._isScaledByManager = false;
        }
        return this;
    }
    /**
     * Releases all associated resources
     */
    dispose() {
        this._rootContainer.dispose();
        for (const materialName in this._sharedMaterials) {
            if (!Object.prototype.hasOwnProperty.call(this._sharedMaterials, materialName)) {
                continue;
            }
            this._sharedMaterials[materialName].dispose();
        }
        this._sharedMaterials = {};
        for (const materialName in this._touchSharedMaterials) {
            if (!Object.prototype.hasOwnProperty.call(this._touchSharedMaterials, materialName)) {
                continue;
            }
            this._touchSharedMaterials[materialName].dispose();
        }
        this._touchSharedMaterials = {};
        if (this._pointerOutObserver && this._utilityLayer) {
            this._utilityLayer.onPointerOutObservable.remove(this._pointerOutObserver);
            this._pointerOutObserver = null;
        }
        this.onPickedPointChangedObservable.clear();
        this.onPickingObservable.clear();
        const utilityLayerScene = this._utilityLayer ? this._utilityLayer.utilityLayerScene : null;
        if (utilityLayerScene) {
            if (this._pointerObserver) {
                utilityLayerScene.onPointerObservable.remove(this._pointerObserver);
                this._pointerObserver = null;
            }
        }
        if (this._scene) {
            if (this._sceneDisposeObserver) {
                this._scene.onDisposeObservable.remove(this._sceneDisposeObserver);
                this._sceneDisposeObserver = null;
            }
        }
        if (this._utilityLayer) {
            this._utilityLayer.dispose();
        }
    }
}
GUI3DManager.MRTK_REALISTIC_SCALING = 0.032;
//# sourceMappingURL=gui3DManager.js.map