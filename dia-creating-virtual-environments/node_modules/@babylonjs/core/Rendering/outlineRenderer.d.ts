import type { SubMesh } from "../Meshes/subMesh";
import type { _InstancesBatch } from "../Meshes/mesh";
import { Scene } from "../scene";
import type { ISceneComponent } from "../sceneComponent";
import "../Shaders/outline.fragment";
import "../Shaders/outline.vertex";
declare module "../scene" {
    interface Scene {
        /** @internal */
        _outlineRenderer: OutlineRenderer;
        /**
         * Gets the outline renderer associated with the scene
         * @returns a OutlineRenderer
         */
        getOutlineRenderer(): OutlineRenderer;
    }
}
declare module "../Meshes/abstractMesh" {
    interface AbstractMesh {
        /** @internal (Backing field) */
        _renderOutline: boolean;
        /**
         * Gets or sets a boolean indicating if the outline must be rendered as well
         * @see https://www.babylonjs-playground.com/#10WJ5S#3
         */
        renderOutline: boolean;
        /** @internal (Backing field) */
        _renderOverlay: boolean;
        /**
         * Gets or sets a boolean indicating if the overlay must be rendered as well
         * @see https://www.babylonjs-playground.com/#10WJ5S#2
         */
        renderOverlay: boolean;
    }
}
/**
 * This class is responsible to draw the outline/overlay of meshes.
 * It should not be used directly but through the available method on mesh.
 */
export declare class OutlineRenderer implements ISceneComponent {
    /**
     * Stencil value used to avoid outline being seen within the mesh when the mesh is transparent
     */
    private static _StencilReference;
    /**
     * The name of the component. Each component must have a unique name.
     */
    name: string;
    /**
     * The scene the component belongs to.
     */
    scene: Scene;
    /**
     * Defines a zOffset default Factor to prevent zFighting between the overlay and the mesh.
     */
    zOffset: number;
    /**
     * Defines a zOffset default Unit to prevent zFighting between the overlay and the mesh.
     */
    zOffsetUnits: number;
    private _engine;
    private _savedDepthWrite;
    private _passIdForDrawWrapper;
    /**
     * Instantiates a new outline renderer. (There could be only one per scene).
     * @param scene Defines the scene it belongs to
     */
    constructor(scene: Scene);
    /**
     * Register the component to one instance of a scene.
     */
    register(): void;
    /**
     * Rebuilds the elements related to this component in case of
     * context lost for instance.
     */
    rebuild(): void;
    /**
     * Disposes the component and the associated resources.
     */
    dispose(): void;
    /**
     * Renders the outline in the canvas.
     * @param subMesh Defines the sumesh to render
     * @param batch Defines the batch of meshes in case of instances
     * @param useOverlay Defines if the rendering is for the overlay or the outline
     * @param renderPassId Render pass id to use to render the mesh
     */
    render(subMesh: SubMesh, batch: _InstancesBatch, useOverlay?: boolean, renderPassId?: number): void;
    /**
     * Returns whether or not the outline renderer is ready for a given submesh.
     * All the dependencies e.g. submeshes, texture, effect... mus be ready
     * @param subMesh Defines the submesh to check readiness for
     * @param useInstances Defines whether wee are trying to render instances or not
     * @param renderPassId Render pass id to use to render the mesh
     * @returns true if ready otherwise false
     */
    isReady(subMesh: SubMesh, useInstances: boolean, renderPassId?: number): boolean;
    private _beforeRenderingMesh;
    private _afterRenderingMesh;
}
