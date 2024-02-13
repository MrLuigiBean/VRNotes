import type { Nullable } from "../types";
import { Scene } from "../scene";
import type { ISceneComponent } from "../sceneComponent";
import { GeometryBufferRenderer } from "./geometryBufferRenderer";
declare module "../scene" {
    interface Scene {
        /** @internal (Backing field) */
        _geometryBufferRenderer: Nullable<GeometryBufferRenderer>;
        /**
         * Gets or Sets the current geometry buffer associated to the scene.
         */
        geometryBufferRenderer: Nullable<GeometryBufferRenderer>;
        /**
         * Enables a GeometryBufferRender and associates it with the scene
         * @param ratioOrDimensions defines the scaling ratio to apply to the renderer (1 by default which means same resolution). You can also directly pass a width and height for the generated textures
         * @param depthFormat Format of the depth texture (default: Constants.TEXTUREFORMAT_DEPTH16)
         * @param textureTypesAndFormats The types and formats of textures to create as render targets. If not provided, all textures will be RGBA and float or half float, depending on the engine capabilities.
         * @returns the GeometryBufferRenderer
         */
        enableGeometryBufferRenderer(ratioOrDimensions?: number | {
            width: number;
            height: number;
        }, depthFormat?: number, textureTypesAndFormats?: {
            [key: number]: {
                textureType: number;
                textureFormat: number;
            };
        }): Nullable<GeometryBufferRenderer>;
        /**
         * Disables the GeometryBufferRender associated with the scene
         */
        disableGeometryBufferRenderer(): void;
    }
}
/**
 * Defines the Geometry Buffer scene component responsible to manage a G-Buffer useful
 * in several rendering techniques.
 */
export declare class GeometryBufferRendererSceneComponent implements ISceneComponent {
    /**
     * The component name helpful to identify the component in the list of scene components.
     */
    readonly name = "GeometryBufferRenderer";
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
