import type { Nullable } from "../types";
import { Scene } from "../scene";
import type { ISceneComponent } from "../sceneComponent";
import { PrePassRenderer } from "./prePassRenderer";
import type { PrePassRenderTarget } from "../Materials/Textures/prePassRenderTarget";
declare module "../abstractScene" {
    interface AbstractScene {
        /** @internal (Backing field) */
        _prePassRenderer: Nullable<PrePassRenderer>;
        /**
         * Gets or Sets the current prepass renderer associated to the scene.
         */
        prePassRenderer: Nullable<PrePassRenderer>;
        /**
         * Enables the prepass and associates it with the scene
         * @returns the PrePassRenderer
         */
        enablePrePassRenderer(): Nullable<PrePassRenderer>;
        /**
         * Disables the prepass associated with the scene
         */
        disablePrePassRenderer(): void;
    }
}
declare module "../Materials/Textures/renderTargetTexture" {
    interface RenderTargetTexture {
        /**
         * Gets or sets a boolean indicating that the prepass renderer should not be used with this render target
         */
        noPrePassRenderer: boolean;
        /** @internal */
        _prePassRenderTarget: Nullable<PrePassRenderTarget>;
    }
}
/**
 * Defines the Geometry Buffer scene component responsible to manage a G-Buffer useful
 * in several rendering techniques.
 */
export declare class PrePassRendererSceneComponent implements ISceneComponent {
    /**
     * The component name helpful to identify the component in the list of scene components.
     */
    readonly name = "PrePassRenderer";
    /**
     * The scene the component belongs to.
     */
    scene: Scene;
    /**
     * Creates a new instance of the component for the given scene
     * @param scene Defines the scene to register the component in
     */
    constructor(scene: Scene);
    /**
     * Registers the component in a given scene
     */
    register(): void;
    private _beforeRenderTargetDraw;
    private _afterRenderTargetDraw;
    private _beforeRenderTargetClearStage;
    private _beforeCameraDraw;
    private _afterCameraDraw;
    private _beforeClearStage;
    private _beforeRenderingMeshStage;
    private _afterRenderingMeshStage;
    /**
     * Rebuilds the elements related to this component in case of
     * context lost for instance.
     */
    rebuild(): void;
    /**
     * Disposes the component and the associated resources
     */
    dispose(): void;
}
