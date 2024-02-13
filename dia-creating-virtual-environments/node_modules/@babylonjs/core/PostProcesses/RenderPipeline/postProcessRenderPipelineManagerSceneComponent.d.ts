import type { ISceneComponent } from "../../sceneComponent";
import { PostProcessRenderPipelineManager } from "./postProcessRenderPipelineManager";
import { Scene } from "../../scene";
declare module "../../scene" {
    interface Scene {
        /** @internal (Backing field) */
        _postProcessRenderPipelineManager: PostProcessRenderPipelineManager;
        /**
         * Gets the postprocess render pipeline manager
         * @see https://doc.babylonjs.com/features/featuresDeepDive/postProcesses/postProcessRenderPipeline
         * @see https://doc.babylonjs.com/features/featuresDeepDive/postProcesses/defaultRenderingPipeline
         */
        readonly postProcessRenderPipelineManager: PostProcessRenderPipelineManager;
    }
}
/**
 * Defines the Render Pipeline scene component responsible to rendering pipelines
 */
export declare class PostProcessRenderPipelineManagerSceneComponent implements ISceneComponent {
    /**
     * The component name helpful to identify the component in the list of scene components.
     */
    readonly name = "PostProcessRenderPipelineManager";
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
    /**
     * Rebuilds the elements related to this component in case of
     * context lost for instance.
     */
    rebuild(): void;
    /**
     * Disposes the component and the associated resources
     */
    dispose(): void;
    private _gatherRenderTargets;
}
