import type { Nullable } from "../types";
import { Color4 } from "../Maths/math.color";
import type { SubMesh } from "../Meshes/subMesh";
import type { Scene } from "../scene";
import { RenderTargetTexture } from "../Materials/Textures/renderTargetTexture";
import { Camera } from "../Cameras/camera";
import "../Shaders/depth.fragment";
import "../Shaders/depth.vertex";
import type { Material } from "../Materials/material";
import type { AbstractMesh } from "../Meshes/abstractMesh";
/**
 * This represents a depth renderer in Babylon.
 * A depth renderer will render to it's depth map every frame which can be displayed or used in post processing
 */
export declare class DepthRenderer {
    private _scene;
    private _depthMap;
    private readonly _storeNonLinearDepth;
    private readonly _storeCameraSpaceZ;
    /** Color used to clear the depth texture. Default: (1,0,0,1) */
    clearColor: Color4;
    /** Get if the depth renderer is using packed depth or not */
    readonly isPacked: boolean;
    private _camera;
    /** Enable or disable the depth renderer. When disabled, the depth texture is not updated */
    enabled: boolean;
    /** Force writing the transparent objects into the depth map */
    forceDepthWriteTransparentMeshes: boolean;
    /**
     * Specifies that the depth renderer will only be used within
     * the camera it is created for.
     * This can help forcing its rendering during the camera processing.
     */
    useOnlyInActiveCamera: boolean;
    /** If true, reverse the culling of materials before writing to the depth texture.
     * So, basically, when "true", back facing instead of front facing faces are rasterized into the texture
     */
    reverseCulling: boolean;
    /**
     * @internal
     */
    static _SceneComponentInitialization: (scene: Scene) => void;
    /**
     * Sets a specific material to be used to render a mesh/a list of meshes by the depth renderer
     * @param mesh mesh or array of meshes
     * @param material material to use by the depth render when rendering the mesh(es). If undefined is passed, the specific material created by the depth renderer will be used.
     */
    setMaterialForRendering(mesh: AbstractMesh | AbstractMesh[], material?: Material): void;
    /**
     * Instantiates a depth renderer
     * @param scene The scene the renderer belongs to
     * @param type The texture type of the depth map (default: Engine.TEXTURETYPE_FLOAT)
     * @param camera The camera to be used to render the depth map (default: scene's active camera)
     * @param storeNonLinearDepth Defines whether the depth is stored linearly like in Babylon Shadows or directly like glFragCoord.z
     * @param samplingMode The sampling mode to be used with the render target (Linear, Nearest...) (default: TRILINEAR_SAMPLINGMODE)
     * @param storeCameraSpaceZ Defines whether the depth stored is the Z coordinate in camera space. If true, storeNonLinearDepth has no effect. (Default: false)
     * @param name Name of the render target (default: DepthRenderer)
     */
    constructor(scene: Scene, type?: number, camera?: Nullable<Camera>, storeNonLinearDepth?: boolean, samplingMode?: number, storeCameraSpaceZ?: boolean, name?: string);
    /**
     * Creates the depth rendering effect and checks if the effect is ready.
     * @param subMesh The submesh to be used to render the depth map of
     * @param useInstances If multiple world instances should be used
     * @returns if the depth renderer is ready to render the depth map
     */
    isReady(subMesh: SubMesh, useInstances: boolean): boolean;
    /**
     * Gets the texture which the depth map will be written to.
     * @returns The depth map texture
     */
    getDepthMap(): RenderTargetTexture;
    /**
     * Disposes of the depth renderer.
     */
    dispose(): void;
}
