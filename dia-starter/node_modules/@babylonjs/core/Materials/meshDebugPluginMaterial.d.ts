import { MaterialPluginBase } from "./materialPluginBase";
import type { Scene } from "../scene";
import type { UniformBuffer } from "./uniformBuffer";
import type { Nullable } from "../types";
import { MaterialDefines } from "./materialDefines";
import type { PBRBaseMaterial } from "./PBR/pbrBaseMaterial";
import type { StandardMaterial } from "./standardMaterial";
import { Color3 } from "../Maths/math.js";
import type { Mesh } from "../Meshes/mesh.js";
import type { AbstractMesh } from "../Meshes/abstractMesh.js";
/**
 * Supported visualizations of MeshDebugPluginMaterial
 */
export declare enum MeshDebugMode {
    /**
     * Material without any mesh debug visualization
     */
    NONE = 0,
    /**
     * A wireframe of the mesh
     * NOTE: For this mode to work correctly, convertToUnIndexedMesh() or MeshDebugPluginMaterial.PrepareMeshForTrianglesAndVerticesMode() must first be called on mesh.
     */
    TRIANGLES = 1,
    /**
     * Points drawn over vertices of mesh
     * NOTE: For this mode to work correctly, MeshDebugPluginMaterial.PrepareMeshForTrianglesAndVerticesMode() must first be called on mesh.
     */
    VERTICES = 2,
    /**
     * A wireframe of the mesh, with points drawn over vertices
     * NOTE: For this mode to work correctly, MeshDebugPluginMaterial.PrepareMeshForTrianglesAndVerticesMode() must first be called on mesh.
     */
    TRIANGLES_VERTICES = 3,
    /**
     * A checkerboard grid of the mesh's UV set 0
     */
    UV0 = 4,
    /**
     * A checkerboard grid of the mesh's UV set 1
     */
    UV1 = 5,
    /**
     * The mesh's vertex colors displayed as the primary texture
     */
    VERTEXCOLORS = 6,
    /**
     * An arbitrary, distinguishable color to identify the material
     */
    MATERIALIDS = 7
}
/**
 * Options for MeshDebugPluginMaterial visualizations
 */
export interface MeshDebugOptions {
    /**
     * The mesh debug visualization.
     * Defaults to NONE.
     */
    mode?: MeshDebugMode;
    /**
     * Whether the mesh debug visualization should multiply with color underneath.
     * Defaults to true.
     */
    multiply?: boolean;
    /**
     * Diffuse color used to shade the mesh.
     * Defaults to (1.0, 1.0, 1.0).
     */
    shadedDiffuseColor?: Color3;
    /**
     * Specular color used to shade the mesh.
     * Defaults to (0.8, 0.8, 0.8).
     */
    shadedSpecularColor?: Color3;
    /**
     * Specular power used to shade the mesh.
     * Defaults to 10.
     */
    shadedSpecularPower?: number;
    /**
     * Width of edge lines in TRIANGLES and TRIANGLE_VERTICES modes.
     * Defaults to 0.7.
     */
    wireframeThickness?: number;
    /**
     * Color of edge lines in TRIANGLES mode.
     * Defaults to (0.0, 0.0, 0.0).
     */
    wireframeTrianglesColor?: Color3;
    /**
     * Color of edge lines in TRIANGLES_VERTICES modes.
     * Defaults to (0.8, 0.8, 0.8).
     */
    wireframeVerticesColor?: Color3;
    /**
     * Color of vertices in TRIANGLES_VERTICES and VERTICES mode.
     * Defaults to (0.0, 0.0, 0.0).
     */
    vertexColor?: Color3;
    /**
     * Radius of dots drawn over vertices in TRIANGLE_VERTICES and VERTICES mode.
     * Defaults to 1.2.
     */
    vertexRadius?: number;
    /**
     * Size of tiles in UV1 or UV2 modes.
     * Defaults to 20.
     */
    uvScale?: number;
    /**
     * 1st color of checkerboard grid in UV1 or UV2 modes.
     * Defaults to (1.0, 1.0, 1.0).
     */
    uvPrimaryColor?: Color3;
    /**
     * 2nd color of checkerboard grid in UV1 or UV2 modes.
     * Defaults to (0.5, 0.5, 0.5).
     */
    uvSecondaryColor?: Color3;
}
/** @internal */
declare class MeshDebugDefines extends MaterialDefines {
    /**
     * Current mesh debug visualization.
     * Defaults to NONE.
     */
    DBG_MODE: MeshDebugMode;
    /**
     * Whether the mesh debug visualization multiplies with colors underneath.
     * Defaults to true.
     */
    DBG_MULTIPLY: boolean;
    /**
     * Whether the mesh debug plugin is enabled in the material.
     * Defaults to true.
     */
    DBG_ENABLED: boolean;
}
/**
 * Plugin that implements various mesh debug visualizations,
 * List of available visualizations can be found in MeshDebugMode enum.
 */
export declare class MeshDebugPluginMaterial extends MaterialPluginBase {
    /**
     * Total number of instances of the plugin.
     * Starts at 0.
     */
    private static _PluginCount;
    /**
     * Color palette used for MATERIALIDS mode.
     * Defaults to `defaultMaterialColors`
     */
    static MaterialColors: Color3[];
    /**
     * Material ID color of this plugin instance.
     * Taken from index `_PluginCount` of `MaterialColors` at time of instantiation.
     */
    private _materialColor;
    /**
     * Whether the mesh debug plugin is enabled in the material.
     * Defaults to true in constructor.
     */
    private _isEnabled;
    private _mode;
    /**
     * The mesh debug visualization.
     * Defaults to NONE.
     */
    mode: MeshDebugMode;
    private _multiply;
    /**
     * Whether the mesh debug visualization should multiply with color underneath.
     * Defaults to true.
     */
    multiply: boolean;
    /**
     * Diffuse color used to shade the mesh.
     * Defaults to (1.0, 1.0, 1.0).
     */
    shadedDiffuseColor: Color3;
    /**
     * Specular color used to shade the mesh.
     * Defaults to (0.8, 0.8, 0.8).
     */
    shadedSpecularColor: Color3;
    /**
     * Specular power used to shade the mesh.
     * Defaults to 10.
     */
    shadedSpecularPower: number;
    /**
     * Width of edge lines in TRIANGLES and TRIANGLE_VERTICES modes.
     * Defaults to 0.7.
     */
    wireframeThickness: number;
    /**
     * Color of edge lines in TRIANGLES mode.
     * Defaults to (0.0, 0.0, 0.0).
     */
    wireframeTrianglesColor: Color3;
    /**
     * Color of edge lines in TRIANGLES_VERTICES modes.
     * Defaults to (0.8, 0.8, 0.8).
     */
    wireframeVerticesColor: Color3;
    /**
     * Color of vertices in TRIANGLES_VERTICES and VERTICES mode.
     * Defaults to (0.0, 0.0, 0.0).
     */
    vertexColor: Color3;
    /**
     * Radius of dots drawn over vertices in TRIANGLE_VERTICES and VERTICES mode.
     * Defaults to 1.2.
     */
    vertexRadius: number;
    /**
     * Size of tiles in UV1 or UV2 modes.
     * Defaults to 20.
     */
    uvScale: number;
    /**
     * 1st color of checkerboard grid in UV1 or UV2 modes.
     * Defaults to (1.0, 1.0, 1.0).
     */
    uvPrimaryColor: Color3;
    /**
     * 2nd color of checkerboard grid in UV1 or UV2 modes.
     * Defaults to (0.5, 0.5, 0.5).
     */
    uvSecondaryColor: Color3;
    /** @internal */
    protected _markAllDefinesAsDirty(): void;
    /**
     * Creates a new MeshDebugPluginMaterial
     * @param material Material to attach the mesh debug plugin to
     * @param options Options for the mesh debug plugin
     */
    constructor(material: PBRBaseMaterial | StandardMaterial, options?: MeshDebugOptions);
    /**
     * Get the class name
     * @returns Class name
     */
    getClassName(): string;
    /**
     * Gets whether the mesh debug plugin is enabled in the material.
     */
    get isEnabled(): boolean;
    /**
     * Sets whether the mesh debug plugin is enabled in the material.
     * @param value enabled
     */
    set isEnabled(value: boolean);
    /**
     * Prepare the defines
     * @param defines Mesh debug defines
     * @param scene Scene
     * @param mesh Mesh associated with material
     */
    prepareDefines(defines: MeshDebugDefines, scene: Scene, mesh: AbstractMesh): void;
    /**
     * Get the shader attributes
     * @param attributes Array of attributes
     */
    getAttributes(attributes: string[]): void;
    /**
     * Get the shader uniforms
     * @returns Uniforms
     */
    getUniforms(): {
        ubo: {
            name: string;
            size: number;
            type: string;
        }[];
        fragment: string;
    };
    /**
     * Bind the uniform buffer
     * @param uniformBuffer Uniform buffer
     */
    bindForSubMesh(uniformBuffer: UniformBuffer): void;
    /**
     * Get shader code
     * @param shaderType "vertex" or "fragment"
     * @returns Shader code
     */
    getCustomCode(shaderType: string): Nullable<{
        [pointName: string]: string;
    }>;
    /**
     * Resets static variables of the plugin to their original state
     */
    static Reset(): void;
    /**
     * Renders triangles in a mesh 3 times by tripling the indices in the index buffer.
     * Used to prepare a mesh to be rendered in `TRIANGLES`, `VERTICES`, or `TRIANGLES_VERTICES` modes.
     * NOTE: This is a destructive operation. The mesh's index buffer and vertex buffers are modified, and a new vertex buffer is allocated.
     * If you'd like the ability to revert these changes, toggle the optional `returnRollback` flag.
     * @param mesh the mesh to target
     * @param returnRollback whether or not to return a function that reverts mesh to its initial state. Default: false.
     * @returns a rollback function if `returnRollback` is true, otherwise an empty function.
     */
    static PrepareMeshForTrianglesAndVerticesMode(mesh: Mesh, returnRollback?: boolean): () => void;
}
export {};
