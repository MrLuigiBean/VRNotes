import type { Nullable } from "@babylonjs/core/types.js";
import { Observable } from "@babylonjs/core/Misc/observable.js";
import { Vector3 } from "@babylonjs/core/Maths/math.vector.js";
import type { Material } from "@babylonjs/core/Materials/material.js";
import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh.js";
import { UtilityLayerRenderer } from "@babylonjs/core/Rendering/utilityLayerRenderer.js";
import type { IDisposable, Scene } from "@babylonjs/core/scene.js";
import { Container3D } from "./controls/container3D";
import type { Control3D } from "./controls/control3D";
/**
 * Class used to manage 3D user interface
 * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui3D
 */
export declare class GUI3DManager implements IDisposable {
    private _scene;
    private _sceneDisposeObserver;
    private _utilityLayer;
    private _rootContainer;
    private _pointerObserver;
    private _pointerOutObserver;
    private _customControlScaling;
    /** @internal */
    _lastPickedControl: Control3D;
    /** @internal */
    _lastControlOver: {
        [pointerId: number]: Control3D;
    };
    /** @internal */
    _lastControlDown: {
        [pointerId: number]: Control3D;
    };
    protected static MRTK_REALISTIC_SCALING: number;
    /**
     * Observable raised when the point picked by the pointer events changed
     */
    onPickedPointChangedObservable: Observable<Nullable<Vector3>>;
    /**
     * Observable raised when a picking happens
     */
    onPickingObservable: Observable<Nullable<AbstractMesh>>;
    /** @internal */
    _sharedMaterials: {
        [key: string]: Material;
    };
    /** @internal */
    _touchSharedMaterials: {
        [key: string]: Material;
    };
    /** Gets the hosting scene */
    get scene(): Scene;
    /** Gets associated utility layer */
    get utilityLayer(): Nullable<UtilityLayerRenderer>;
    /** Gets the scaling for all UI elements owned by this manager */
    get controlScaling(): number;
    /** Sets the scaling adjustment for all UI elements owned by this manager */
    set controlScaling(newScale: number);
    /** Gets if controls attached to this manager are realistically sized, based on the fact that 1 unit length is 1 meter */
    get useRealisticScaling(): boolean;
    /** Sets if controls attached to this manager are realistically sized, based on the fact that 1 unit length is 1 meter */
    set useRealisticScaling(newValue: boolean);
    /**
     * Creates a new GUI3DManager
     * @param scene
     */
    constructor(scene?: Scene);
    private _handlePointerOut;
    private _doPicking;
    /**
     * Gets the root container
     */
    get rootContainer(): Container3D;
    /**
     * Gets a boolean indicating if the given control is in the root child list
     * @param control defines the control to check
     * @returns true if the control is in the root child list
     */
    containsControl(control: Control3D): boolean;
    /**
     * Adds a control to the root child list
     * @param control defines the control to add
     * @returns the current manager
     */
    addControl(control: Control3D): GUI3DManager;
    /**
     * Removes a control from the root child list
     * @param control defines the control to remove
     * @returns the current container
     */
    removeControl(control: Control3D): GUI3DManager;
    /**
     * Releases all associated resources
     */
    dispose(): void;
}
