import type { Texture } from "../Materials/Textures/texture.js";
import type { Vector3 } from "../Maths/math.vector.js";
import type { Scene } from "../scene.js";
import type { AbstractMesh } from "./abstractMesh";
import type { BaseTexture } from "../Materials/Textures/baseTexture.js";
import type { Nullable } from "../types.js";
import { ShaderMaterial } from "../Materials/shaderMaterial.js";
import { Color4 } from "../Maths/math.color.js";
import "../Shaders/meshUVSpaceRenderer.vertex";
import "../Shaders/meshUVSpaceRenderer.fragment";
import "../Shaders/meshUVSpaceRendererMasker.vertex";
import "../Shaders/meshUVSpaceRendererMasker.fragment";
import "../Shaders/meshUVSpaceRendererFinaliser.fragment";
import "../Shaders/meshUVSpaceRendererFinaliser.vertex";
declare module "../scene" {
    interface Scene {
        /** @internal */
        _meshUVSpaceRendererShader: Nullable<ShaderMaterial>;
        /** @internal */
        _meshUVSpaceRendererMaskShader: Nullable<ShaderMaterial>;
    }
}
/**
 * Options for the MeshUVSpaceRenderer
 * @since 5.49.1
 */
export interface IMeshUVSpaceRendererOptions {
    /**
     * Width of the texture. Default: 1024
     */
    width?: number;
    /**
     * Height of the texture. Default: 1024
     */
    height?: number;
    /**
     * Type of the texture. Default: Constants.TEXTURETYPE_UNSIGNED_BYTE
     */
    textureType?: number;
    /**
     * Generate mip maps. Default: true
     */
    generateMipMaps?: boolean;
    /**
     * Optimize UV allocation. Default: true
     * If you plan to use the texture as a decal map and rotate / offset the texture, you should set this to false
     */
    optimizeUVAllocation?: boolean;
    /**
     * If true, a post processing effect will be applied to the texture to fix seams. Default: false
     */
    uvEdgeBlending?: boolean;
}
/**
 * Class used to render in the mesh UV space
 * @since 5.49.1
 */
export declare class MeshUVSpaceRenderer {
    private _mesh;
    private _scene;
    private _options;
    private _textureCreatedInternally;
    private _configureUserCreatedTexture;
    private _maskTexture;
    private _finalPostProcess;
    private static _GetShader;
    private static _GetMaskShader;
    private static _IsRenderTargetTexture;
    /**
     * Clear color of the texture
     */
    clearColor: Color4;
    /**
     * Target texture used for rendering
     * If you don't set the property, a RenderTargetTexture will be created internally given the options provided to the constructor.
     * If you provide a RenderTargetTexture, it will be used directly.
     */
    texture: Texture;
    /**
     * Creates a new MeshUVSpaceRenderer
     * @param mesh The mesh used for the source UV space
     * @param scene The scene the mesh belongs to
     * @param options The options to use when creating the texture
     */
    constructor(mesh: AbstractMesh, scene: Scene, options?: IMeshUVSpaceRendererOptions);
    /**
     * Checks if the texture is ready to be used
     * @returns true if the texture is ready to be used
     */
    isReady(): boolean;
    /**
     * Projects and renders a texture in the mesh UV space
     * @param texture The texture
     * @param position The position of the center of projection (world space coordinates)
     * @param normal The direction of the projection (world space coordinates)
     * @param size The size of the projection
     * @param angle The rotation angle around the direction of the projection
     */
    renderTexture(texture: BaseTexture, position: Vector3, normal: Vector3, size: Vector3, angle?: number): void;
    /**
     * Clears the texture map
     */
    clear(): void;
    /**
     * Disposes of the resources
     */
    dispose(): void;
    private _configureUserCreatedRTT;
    private _createDiffuseRTT;
    private _createMaskTexture;
    private _createPostProcess;
    private _createRenderTargetTexture;
    private _createProjectionMatrix;
}
