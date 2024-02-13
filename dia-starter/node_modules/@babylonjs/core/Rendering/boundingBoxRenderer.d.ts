import { Scene } from "../scene";
import { AbstractMesh } from "../Meshes/abstractMesh";
import { SmartArray } from "../Misc/smartArray";
import type { ISceneComponent } from "../sceneComponent";
import type { BoundingBox } from "../Culling/boundingBox";
import { Color3 } from "../Maths/math.color";
import { Observable } from "../Misc/observable";
import "../Shaders/boundingBoxRenderer.fragment";
import "../Shaders/boundingBoxRenderer.vertex";
declare module "../scene" {
    interface Scene {
        /** @internal (Backing field) */
        _boundingBoxRenderer: BoundingBoxRenderer;
        /** @internal (Backing field) */
        _forceShowBoundingBoxes: boolean;
        /**
         * Gets or sets a boolean indicating if all bounding boxes must be rendered
         */
        forceShowBoundingBoxes: boolean;
        /**
         * Gets the bounding box renderer associated with the scene
         * @returns a BoundingBoxRenderer
         */
        getBoundingBoxRenderer(): BoundingBoxRenderer;
    }
}
declare module "../Meshes/abstractMesh" {
    interface AbstractMesh {
        /** @internal (Backing field) */
        _showBoundingBox: boolean;
        /**
         * Gets or sets a boolean indicating if the bounding box must be rendered as well (false by default)
         */
        showBoundingBox: boolean;
    }
}
/**
 * Component responsible of rendering the bounding box of the meshes in a scene.
 * This is usually used through the mesh.showBoundingBox or the scene.forceShowBoundingBoxes properties
 */
export declare class BoundingBoxRenderer implements ISceneComponent {
    /**
     * The component name helpful to identify the component in the list of scene components.
     */
    readonly name = "BoundingBoxRenderer";
    /**
     * The scene the component belongs to.
     */
    scene: Scene;
    /**
     * Color of the bounding box lines placed in front of an object
     */
    frontColor: Color3;
    /**
     * Color of the bounding box lines placed behind an object
     */
    backColor: Color3;
    /**
     * Defines if the renderer should show the back lines or not
     */
    showBackLines: boolean;
    /**
     * Observable raised before rendering a bounding box
     */
    onBeforeBoxRenderingObservable: Observable<BoundingBox>;
    /**
     * Observable raised after rendering a bounding box
     */
    onAfterBoxRenderingObservable: Observable<BoundingBox>;
    /**
     * Observable raised after resources are created
     */
    onResourcesReadyObservable: Observable<BoundingBoxRenderer>;
    /**
     * When false, no bounding boxes will be rendered
     */
    enabled: boolean;
    /**
     * @internal
     */
    renderList: SmartArray<BoundingBox>;
    private _colorShader;
    private _colorShaderForOcclusionQuery;
    private _vertexBuffers;
    private _indexBuffer;
    private _fillIndexBuffer;
    private _fillIndexData;
    private _uniformBufferFront;
    private _uniformBufferBack;
    private _renderPassIdForOcclusionQuery;
    /**
     * Instantiates a new bounding box renderer in a scene.
     * @param scene the scene the  renderer renders in
     */
    constructor(scene: Scene);
    private _buildUniformLayout;
    /**
     * Registers the component in a given scene
     */
    register(): void;
    private _evaluateSubMesh;
    private _preActiveMesh;
    private _prepareResources;
    private _createIndexBuffer;
    /**
     * Rebuilds the elements related to this component in case of
     * context lost for instance.
     */
    rebuild(): void;
    /**
     * @internal
     */
    reset(): void;
    /**
     * Render the bounding boxes of a specific rendering group
     * @param renderingGroupId defines the rendering group to render
     */
    render(renderingGroupId: number): void;
    private _createWrappersForBoundingBox;
    /**
     * In case of occlusion queries, we can render the occlusion bounding box through this method
     * @param mesh Define the mesh to render the occlusion bounding box for
     */
    renderOcclusionBoundingBox(mesh: AbstractMesh): void;
    /**
     * Dispose and release the resources attached to this renderer.
     */
    dispose(): void;
}
