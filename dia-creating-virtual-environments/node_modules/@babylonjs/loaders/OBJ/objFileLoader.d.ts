import { Vector2 } from "@babylonjs/core/Maths/math.vector.js";
import type { ISceneLoaderPluginAsync, ISceneLoaderPluginFactory, ISceneLoaderPlugin, ISceneLoaderAsyncResult } from "@babylonjs/core/Loading/sceneLoader.js";
import { AssetContainer } from "@babylonjs/core/assetContainer.js";
import type { Scene } from "@babylonjs/core/scene.js";
import type { OBJLoadingOptions } from "./objLoadingOptions";
/**
 * OBJ file type loader.
 * This is a babylon scene loader plugin.
 */
export declare class OBJFileLoader implements ISceneLoaderPluginAsync, ISceneLoaderPluginFactory {
    /**
     * Defines if UVs are optimized by default during load.
     */
    static OPTIMIZE_WITH_UV: boolean;
    /**
     * Invert model on y-axis (does a model scaling inversion)
     */
    static INVERT_Y: boolean;
    /**
     * Invert Y-Axis of referenced textures on load
     */
    static get INVERT_TEXTURE_Y(): boolean;
    static set INVERT_TEXTURE_Y(value: boolean);
    /**
     * Include in meshes the vertex colors available in some OBJ files.  This is not part of OBJ standard.
     */
    static IMPORT_VERTEX_COLORS: boolean;
    /**
     * Compute the normals for the model, even if normals are present in the file.
     */
    static COMPUTE_NORMALS: boolean;
    /**
     * Optimize the normals for the model. Lighting can be uneven if you use OptimizeWithUV = true because new vertices can be created for the same location if they pertain to different faces.
     * Using OptimizehNormals = true will help smoothing the lighting by averaging the normals of those vertices.
     */
    static OPTIMIZE_NORMALS: boolean;
    /**
     * Defines custom scaling of UV coordinates of loaded meshes.
     */
    static UV_SCALING: Vector2;
    /**
     * Skip loading the materials even if defined in the OBJ file (materials are ignored).
     */
    static SKIP_MATERIALS: boolean;
    /**
     * When a material fails to load OBJ loader will silently fail and onSuccess() callback will be triggered.
     *
     * Defaults to true for backwards compatibility.
     */
    static MATERIAL_LOADING_FAILS_SILENTLY: boolean;
    /**
     * Defines the name of the plugin.
     */
    name: string;
    /**
     * Defines the extension the plugin is able to load.
     */
    extensions: string;
    private _assetContainer;
    private _loadingOptions;
    /**
     * Creates loader for .OBJ files
     *
     * @param loadingOptions options for loading and parsing OBJ/MTL files.
     */
    constructor(loadingOptions?: OBJLoadingOptions);
    private static get _DefaultLoadingOptions();
    /**
     * Calls synchronously the MTL file attached to this obj.
     * Load function or importMesh function don't enable to load 2 files in the same time asynchronously.
     * Without this function materials are not displayed in the first frame (but displayed after).
     * In consequence it is impossible to get material information in your HTML file
     *
     * @param url The URL of the MTL file
     * @param rootUrl defines where to load data from
     * @param onSuccess Callback function to be called when the MTL file is loaded
     * @param onFailure
     */
    private _loadMTL;
    /**
     * Instantiates a OBJ file loader plugin.
     * @returns the created plugin
     */
    createPlugin(): ISceneLoaderPluginAsync | ISceneLoaderPlugin;
    /**
     * If the data string can be loaded directly.
     * @returns if the data can be loaded directly
     */
    canDirectLoad(): boolean;
    /**
     * Imports one or more meshes from the loaded OBJ data and adds them to the scene
     * @param meshesNames a string or array of strings of the mesh names that should be loaded from the file
     * @param scene the scene the meshes should be added to
     * @param data the OBJ data to load
     * @param rootUrl root url to load from
     * @returns a promise containing the loaded meshes, particles, skeletons and animations
     */
    importMeshAsync(meshesNames: any, scene: Scene, data: any, rootUrl: string): Promise<ISceneLoaderAsyncResult>;
    /**
     * Imports all objects from the loaded OBJ data and adds them to the scene
     * @param scene the scene the objects should be added to
     * @param data the OBJ data to load
     * @param rootUrl root url to load from
     * @returns a promise which completes when objects have been loaded to the scene
     */
    loadAsync(scene: Scene, data: string, rootUrl: string): Promise<void>;
    /**
     * Load into an asset container.
     * @param scene The scene to load into
     * @param data The data to import
     * @param rootUrl The root url for scene and resources
     * @returns The loaded asset container
     */
    loadAssetContainerAsync(scene: Scene, data: string, rootUrl: string): Promise<AssetContainer>;
    /**
     * Read the OBJ file and create an Array of meshes.
     * Each mesh contains all information given by the OBJ and the MTL file.
     * i.e. vertices positions and indices, optional normals values, optional UV values, optional material
     * @param meshesNames defines a string or array of strings of the mesh names that should be loaded from the file
     * @param scene defines the scene where are displayed the data
     * @param data defines the content of the obj file
     * @param rootUrl defines the path to the folder
     * @returns the list of loaded meshes
     */
    private _parseSolid;
}
