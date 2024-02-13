import { Scene } from "../scene";
import type { ISceneComponent } from "../sceneComponent";
import type { Nullable } from "../types";
import { DepthPeelingRenderer } from "./depthPeelingRenderer";
declare module "../scene" {
    interface Scene {
        /**
         * The depth peeling renderer
         */
        depthPeelingRenderer: Nullable<DepthPeelingRenderer>;
        /** @internal (Backing field) */
        _depthPeelingRenderer: Nullable<DepthPeelingRenderer>;
        /**
         * Flag to indicate if we want to use order independent transparency, despite the performance hit
         */
        useOrderIndependentTransparency: boolean;
        /** @internal */
        _useOrderIndependentTransparency: boolean;
    }
}
/**
 * Scene component to render order independent transparency with depth peeling
 */
export declare class DepthPeelingSceneComponent implements ISceneComponent {
    /**
     * The component name helpful to identify the component in the list of scene components.
     */
    readonly name = "DepthPeelingRenderer";
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
     * Disposes the component and the associated resources.
     */
    dispose(): void;
}
