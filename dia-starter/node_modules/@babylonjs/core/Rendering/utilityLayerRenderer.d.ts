import type { IDisposable } from "../scene";
import { Scene } from "../scene";
import type { Nullable } from "../types";
import { Observable } from "../Misc/observable";
import type { AbstractMesh } from "../Meshes/abstractMesh";
import { HemisphericLight } from "../Lights/hemisphericLight";
import type { Camera } from "../Cameras/camera";
/**
 * Renders a layer on top of an existing scene
 */
export declare class UtilityLayerRenderer implements IDisposable {
    /** the original scene that will be rendered on top of */
    originalScene: Scene;
    private _pointerCaptures;
    private _lastPointerEvents;
    /** @internal */
    static _DefaultUtilityLayer: Nullable<UtilityLayerRenderer>;
    /** @internal */
    static _DefaultKeepDepthUtilityLayer: Nullable<UtilityLayerRenderer>;
    private _sharedGizmoLight;
    private _renderCamera;
    /**
     * Gets the camera that is used to render the utility layer (when not set, this will be the last active camera)
     * @param getRigParentIfPossible if the current active camera is a rig camera, should its parent camera be returned
     * @returns the camera that is used when rendering the utility layer
     */
    getRenderCamera(getRigParentIfPossible?: boolean): Camera;
    /**
     * Sets the camera that should be used when rendering the utility layer (If set to null the last active camera will be used)
     * @param cam the camera that should be used when rendering the utility layer
     */
    setRenderCamera(cam: Nullable<Camera>): void;
    /**
     * @internal
     * Light which used by gizmos to get light shading
     */
    _getSharedGizmoLight(): HemisphericLight;
    /**
     * If the picking should be done on the utility layer prior to the actual scene (Default: true)
     */
    pickUtilitySceneFirst: boolean;
    /**
     * A shared utility layer that can be used to overlay objects into a scene (Depth map of the previous scene is cleared before drawing on top of it)
     */
    static get DefaultUtilityLayer(): UtilityLayerRenderer;
    /**
     * Creates an utility layer, and set it as a default utility layer
     * @param scene associated scene
     * @internal
     */
    static _CreateDefaultUtilityLayerFromScene(scene: Scene): UtilityLayerRenderer;
    /**
     * A shared utility layer that can be used to embed objects into a scene (Depth map of the previous scene is not cleared before drawing on top of it)
     */
    static get DefaultKeepDepthUtilityLayer(): UtilityLayerRenderer;
    /**
     * The scene that is rendered on top of the original scene
     */
    utilityLayerScene: Scene;
    /**
     *  If the utility layer should automatically be rendered on top of existing scene
     */
    shouldRender: boolean;
    /**
     * If set to true, only pointer down onPointerObservable events will be blocked when picking is occluded by original scene
     */
    onlyCheckPointerDownEvents: boolean;
    /**
     * If set to false, only pointerUp, pointerDown and pointerMove will be sent to the utilityLayerScene (false by default)
     */
    processAllEvents: boolean;
    /**
     * Set to false to disable picking
     */
    pickingEnabled: boolean;
    /**
     * Observable raised when the pointer moves from the utility layer scene to the main scene
     */
    onPointerOutObservable: Observable<number>;
    /** Gets or sets a predicate that will be used to indicate utility meshes present in the main scene */
    mainSceneTrackerPredicate: (mesh: Nullable<AbstractMesh>) => boolean;
    private _afterRenderObserver;
    private _sceneDisposeObserver;
    private _originalPointerObserver;
    /**
     * Instantiates a UtilityLayerRenderer
     * @param originalScene the original scene that will be rendered on top of
     * @param handleEvents boolean indicating if the utility layer should handle events
     */
    constructor(
    /** the original scene that will be rendered on top of */
    originalScene: Scene, handleEvents?: boolean);
    private _notifyObservers;
    /**
     * Renders the utility layers scene on top of the original scene
     */
    render(): void;
    /**
     * Disposes of the renderer
     */
    dispose(): void;
    private _updateCamera;
}
