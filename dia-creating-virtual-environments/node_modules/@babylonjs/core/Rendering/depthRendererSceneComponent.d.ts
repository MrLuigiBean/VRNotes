import type { Nullable } from "../types";
import { Scene } from "../scene";
import { DepthRenderer } from "./depthRenderer";
import type { Camera } from "../Cameras/camera";
import type { ISceneComponent } from "../sceneComponent";
declare module "../scene" {
    interface Scene {
        /** @internal (Backing field) */
        _depthRenderer: {
            [id: string]: DepthRenderer;
        };
        /**
         * Creates a depth renderer a given camera which contains a depth map which can be used for post processing.
         * @param camera The camera to create the depth renderer on (default: scene's active camera)
         * @param storeNonLinearDepth Defines whether the depth is stored linearly like in Babylon Shadows or directly like glFragCoord.z
         * @param force32bitsFloat Forces 32 bits float when supported (else 16 bits float is prioritized over 32 bits float if supported)
         * @param samplingMode The sampling mode to be used with the render target (Linear, Nearest...)
         * @param storeCameraSpaceZ Defines whether the depth stored is the Z coordinate in camera space. If true, storeNonLinearDepth has no effect. (Default: false)
         * @returns the created depth renderer
         */
        enableDepthRenderer(camera?: Nullable<Camera>, storeNonLinearDepth?: boolean, force32bitsFloat?: boolean, samplingMode?: number, storeCameraSpaceZ?: boolean): DepthRenderer;
        /**
         * Disables a depth renderer for a given camera
         * @param camera The camera to disable the depth renderer on (default: scene's active camera)
         */
        disableDepthRenderer(camera?: Nullable<Camera>): void;
    }
}
/**
 * Defines the Depth Renderer scene component responsible to manage a depth buffer useful
 * in several rendering techniques.
 */
export declare class DepthRendererSceneComponent implements ISceneComponent {
    /**
     * The component name helpful to identify the component in the list of scene components.
     */
    readonly name = "DepthRenderer";
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
    private _gatherActiveCameraRenderTargets;
}
