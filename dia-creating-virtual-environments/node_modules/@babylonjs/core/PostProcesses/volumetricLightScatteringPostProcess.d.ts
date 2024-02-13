import { Vector3 } from "../Maths/math.vector";
import { AbstractMesh } from "../Meshes/abstractMesh";
import type { Mesh } from "../Meshes/mesh";
import type { Camera } from "../Cameras/camera";
import { RenderTargetTexture } from "../Materials/Textures/renderTargetTexture";
import { PostProcess } from "./postProcess";
import type { Scene } from "../scene";
import "../Shaders/depth.vertex";
import "../Shaders/volumetricLightScattering.fragment";
import "../Shaders/volumetricLightScatteringPass.vertex";
import "../Shaders/volumetricLightScatteringPass.fragment";
import type { Nullable } from "../types";
import type { Engine } from "../Engines/engine";
/**
 *  Inspired by https://developer.nvidia.com/gpugems/gpugems3/part-ii-light-and-shadows/chapter-13-volumetric-light-scattering-post-process
 */
export declare class VolumetricLightScatteringPostProcess extends PostProcess {
    private _volumetricLightScatteringRTT;
    private _viewPort;
    private _screenCoordinates;
    /**
     * If not undefined, the mesh position is computed from the attached node position
     */
    attachedNode: {
        position: Vector3;
    };
    /**
     * Custom position of the mesh. Used if "useCustomMeshPosition" is set to "true"
     */
    customMeshPosition: Vector3;
    /**
     * Set if the post-process should use a custom position for the light source (true) or the internal mesh position (false)
     */
    useCustomMeshPosition: boolean;
    /**
     * If the post-process should inverse the light scattering direction
     */
    invert: boolean;
    /**
     * The internal mesh used by the post-process
     */
    mesh: Mesh;
    /**
     * @internal
     * VolumetricLightScatteringPostProcess.useDiffuseColor is no longer used, use the mesh material directly instead
     */
    get useDiffuseColor(): boolean;
    set useDiffuseColor(useDiffuseColor: boolean);
    /**
     * Array containing the excluded meshes not rendered in the internal pass
     */
    excludedMeshes: AbstractMesh[];
    /**
     * Array containing the only meshes rendered in the internal pass.
     * If this array is not empty, only the meshes from this array are rendered in the internal pass
     */
    includedMeshes: AbstractMesh[];
    /**
     * Controls the overall intensity of the post-process
     */
    exposure: number;
    /**
     * Dissipates each sample's contribution in range [0, 1]
     */
    decay: number;
    /**
     * Controls the overall intensity of each sample
     */
    weight: number;
    /**
     * Controls the density of each sample
     */
    density: number;
    /**
     * @constructor
     * @param name The post-process name
     * @param ratio The size of the post-process and/or internal pass (0.5 means that your postprocess will have a width = canvas.width 0.5 and a height = canvas.height 0.5)
     * @param camera The camera that the post-process will be attached to
     * @param mesh The mesh used to create the light scattering
     * @param samples The post-process quality, default 100
     * @param samplingMode The post-process filtering mode
     * @param engine The babylon engine
     * @param reusable If the post-process is reusable
     * @param scene The constructor needs a scene reference to initialize internal components. If "camera" is null a "scene" must be provided
     */
    constructor(name: string, ratio: any, camera: Nullable<Camera>, mesh?: Mesh, samples?: number, samplingMode?: number, engine?: Engine, reusable?: boolean, scene?: Scene);
    /**
     * Returns the string "VolumetricLightScatteringPostProcess"
     * @returns "VolumetricLightScatteringPostProcess"
     */
    getClassName(): string;
    private _isReady;
    /**
     * Sets the new light position for light scattering effect
     * @param position The new custom light position
     */
    setCustomMeshPosition(position: Vector3): void;
    /**
     * Returns the light position for light scattering effect
     * @returns Vector3 The custom light position
     */
    getCustomMeshPosition(): Vector3;
    /**
     * Disposes the internal assets and detaches the post-process from the camera
     * @param camera The camera from which to detach the post-process
     */
    dispose(camera: Camera): void;
    /**
     * Returns the render target texture used by the post-process
     * @returns the render target texture used by the post-process
     */
    getPass(): RenderTargetTexture;
    private _meshExcluded;
    private _createPass;
    private _updateMeshScreenCoordinates;
    /**
     * Creates a default mesh for the Volumeric Light Scattering post-process
     * @param name The mesh name
     * @param scene The scene where to create the mesh
     * @returns the default mesh
     */
    static CreateDefaultMesh(name: string, scene: Scene): Mesh;
}
