import { Observable } from "../Misc/observable";
import type { Nullable } from "../types";
import { Scene } from "../scene";
import { Engine } from "../Engines/engine";
import type { AbstractMesh } from "../Meshes/abstractMesh";
import type { AnimationGroup } from "../Animations/animationGroup";
import type { AssetContainer } from "../assetContainer";
import type { IParticleSystem } from "../Particles/IParticleSystem";
import type { Skeleton } from "../Bones/skeleton";
import type { IFileRequest } from "../Misc/fileRequest";
import type { WebRequest } from "../Misc/webRequest";
import type { LoadFileError } from "../Misc/fileTools";
import type { TransformNode } from "../Meshes/transformNode";
import type { Geometry } from "../Meshes/geometry";
import type { Light } from "../Lights/light";
/**
 * Type used for the success callback of ImportMesh
 */
export type SceneLoaderSuccessCallback = (meshes: AbstractMesh[], particleSystems: IParticleSystem[], skeletons: Skeleton[], animationGroups: AnimationGroup[], transformNodes: TransformNode[], geometries: Geometry[], lights: Light[]) => void;
/**
 * Interface used for the result of ImportMeshAsync
 */
export interface ISceneLoaderAsyncResult {
    /**
     * The array of loaded meshes
     */
    readonly meshes: AbstractMesh[];
    /**
     * The array of loaded particle systems
     */
    readonly particleSystems: IParticleSystem[];
    /**
     * The array of loaded skeletons
     */
    readonly skeletons: Skeleton[];
    /**
     * The array of loaded animation groups
     */
    readonly animationGroups: AnimationGroup[];
    /**
     * The array of loaded transform nodes
     */
    readonly transformNodes: TransformNode[];
    /**
     * The array of loaded geometries
     */
    readonly geometries: Geometry[];
    /**
     * The array of loaded lights
     */
    readonly lights: Light[];
}
/**
 * Interface used to represent data loading progression
 */
export interface ISceneLoaderProgressEvent {
    /**
     * Defines if data length to load can be evaluated
     */
    readonly lengthComputable: boolean;
    /**
     * Defines the loaded data length
     */
    readonly loaded: number;
    /**
     * Defines the data length to load
     */
    readonly total: number;
}
/**
 * Interface used by SceneLoader plugins to define supported file extensions
 */
export interface ISceneLoaderPluginExtensions {
    /**
     * Defines the list of supported extensions
     */
    [extension: string]: {
        isBinary: boolean;
    };
}
/**
 * Interface used by SceneLoader plugin factory
 */
export interface ISceneLoaderPluginFactory {
    /**
     * Defines the name of the factory
     */
    name: string;
    /**
     * Function called to create a new plugin
     * @returns the new plugin
     */
    createPlugin(): ISceneLoaderPlugin | ISceneLoaderPluginAsync;
    /**
     * The callback that returns true if the data can be directly loaded.
     * @param data string containing the file data
     * @returns if the data can be loaded directly
     */
    canDirectLoad?(data: string): boolean;
}
/**
 * Interface used to define the base of ISceneLoaderPlugin and ISceneLoaderPluginAsync
 */
export interface ISceneLoaderPluginBase {
    /**
     * The friendly name of this plugin.
     */
    name: string;
    /**
     * The file extensions supported by this plugin.
     */
    extensions: string | ISceneLoaderPluginExtensions;
    /**
     * The callback called when loading from a url.
     * @param scene scene loading this url
     * @param fileOrUrl file or url to load
     * @param onSuccess callback called when the file successfully loads
     * @param onProgress callback called while file is loading (if the server supports this mode)
     * @param useArrayBuffer defines a boolean indicating that date must be returned as ArrayBuffer
     * @param onError callback called when the file fails to load
     * @returns a file request object
     */
    loadFile?(scene: Scene, fileOrUrl: File | string | ArrayBufferView, rootUrl: string, onSuccess: (data: any, responseURL?: string) => void, onProgress?: (ev: ISceneLoaderProgressEvent) => void, useArrayBuffer?: boolean, onError?: (request?: WebRequest, exception?: LoadFileError) => void, name?: string): Nullable<IFileRequest>;
    /**
     * The callback that returns true if the data can be directly loaded.
     * @param data string containing the file data
     * @returns if the data can be loaded directly
     */
    canDirectLoad?(data: string): boolean;
    /**
     * The callback that returns the data to pass to the plugin if the data can be directly loaded.
     * @param scene scene loading this data
     * @param data string containing the data
     * @returns data to pass to the plugin
     */
    directLoad?(scene: Scene, data: string): any;
    /**
     * The callback that allows custom handling of the root url based on the response url.
     * @param rootUrl the original root url
     * @param responseURL the response url if available
     * @returns the new root url
     */
    rewriteRootURL?(rootUrl: string, responseURL?: string): string;
}
/**
 * Interface used to define a SceneLoader plugin
 */
export interface ISceneLoaderPlugin extends ISceneLoaderPluginBase {
    /**
     * Import meshes into a scene.
     * @param meshesNames An array of mesh names, a single mesh name, or empty string for all meshes that filter what meshes are imported
     * @param scene The scene to import into
     * @param data The data to import
     * @param rootUrl The root url for scene and resources
     * @param meshes The meshes array to import into
     * @param particleSystems The particle systems array to import into
     * @param skeletons The skeletons array to import into
     * @param onError The callback when import fails
     * @returns True if successful or false otherwise
     */
    importMesh(meshesNames: any, scene: Scene, data: any, rootUrl: string, meshes: AbstractMesh[], particleSystems: IParticleSystem[], skeletons: Skeleton[], onError?: (message: string, exception?: any) => void): boolean;
    /**
     * Load into a scene.
     * @param scene The scene to load into
     * @param data The data to import
     * @param rootUrl The root url for scene and resources
     * @param onError The callback when import fails
     * @returns True if successful or false otherwise
     */
    load(scene: Scene, data: any, rootUrl: string, onError?: (message: string, exception?: any) => void): boolean;
    /**
     * Load into an asset container.
     * @param scene The scene to load into
     * @param data The data to import
     * @param rootUrl The root url for scene and resources
     * @param onError The callback when import fails
     * @returns The loaded asset container
     */
    loadAssetContainer(scene: Scene, data: any, rootUrl: string, onError?: (message: string, exception?: any) => void): AssetContainer;
}
/**
 * Interface used to define an async SceneLoader plugin
 */
export interface ISceneLoaderPluginAsync extends ISceneLoaderPluginBase {
    /**
     * Import meshes into a scene.
     * @param meshesNames An array of mesh names, a single mesh name, or empty string for all meshes that filter what meshes are imported
     * @param scene The scene to import into
     * @param data The data to import
     * @param rootUrl The root url for scene and resources
     * @param onProgress The callback when the load progresses
     * @param fileName Defines the name of the file to load
     * @returns The loaded objects (e.g. meshes, particle systems, skeletons, animation groups, etc.)
     */
    importMeshAsync(meshesNames: any, scene: Scene, data: any, rootUrl: string, onProgress?: (event: ISceneLoaderProgressEvent) => void, fileName?: string): Promise<ISceneLoaderAsyncResult>;
    /**
     * Load into a scene.
     * @param scene The scene to load into
     * @param data The data to import
     * @param rootUrl The root url for scene and resources
     * @param onProgress The callback when the load progresses
     * @param fileName Defines the name of the file to load
     * @returns Nothing
     */
    loadAsync(scene: Scene, data: any, rootUrl: string, onProgress?: (event: ISceneLoaderProgressEvent) => void, fileName?: string): Promise<void>;
    /**
     * Load into an asset container.
     * @param scene The scene to load into
     * @param data The data to import
     * @param rootUrl The root url for scene and resources
     * @param onProgress The callback when the load progresses
     * @param fileName Defines the name of the file to load
     * @returns The loaded asset container
     */
    loadAssetContainerAsync(scene: Scene, data: any, rootUrl: string, onProgress?: (event: ISceneLoaderProgressEvent) => void, fileName?: string): Promise<AssetContainer>;
}
/**
 * Mode that determines how to handle old animation groups before loading new ones.
 */
export declare enum SceneLoaderAnimationGroupLoadingMode {
    /**
     * Reset all old animations to initial state then dispose them.
     */
    Clean = 0,
    /**
     * Stop all old animations.
     */
    Stop = 1,
    /**
     * Restart old animations from first frame.
     */
    Sync = 2,
    /**
     * Old animations remains untouched.
     */
    NoSync = 3
}
/**
 * Defines a plugin registered by the SceneLoader
 */
interface IRegisteredPlugin {
    /**
     * Defines the plugin to use
     */
    plugin: ISceneLoaderPlugin | ISceneLoaderPluginAsync | ISceneLoaderPluginFactory;
    /**
     * Defines if the plugin supports binary data
     */
    isBinary: boolean;
}
/**
 * Class used to load scene from various file formats using registered plugins
 * @see https://doc.babylonjs.com/features/featuresDeepDive/importers/loadingFileTypes
 */
export declare class SceneLoader {
    /**
     * No logging while loading
     */
    static readonly NO_LOGGING = 0;
    /**
     * Minimal logging while loading
     */
    static readonly MINIMAL_LOGGING = 1;
    /**
     * Summary logging while loading
     */
    static readonly SUMMARY_LOGGING = 2;
    /**
     * Detailed logging while loading
     */
    static readonly DETAILED_LOGGING = 3;
    /**
     * Gets or sets a boolean indicating if entire scene must be loaded even if scene contains incremental data
     */
    static get ForceFullSceneLoadingForIncremental(): boolean;
    static set ForceFullSceneLoadingForIncremental(value: boolean);
    /**
     * Gets or sets a boolean indicating if loading screen must be displayed while loading a scene
     */
    static get ShowLoadingScreen(): boolean;
    static set ShowLoadingScreen(value: boolean);
    /**
     * Defines the current logging level (while loading the scene)
     * @ignorenaming
     */
    static get loggingLevel(): number;
    static set loggingLevel(value: number);
    /**
     * Gets or set a boolean indicating if matrix weights must be cleaned upon loading
     */
    static get CleanBoneMatrixWeights(): boolean;
    static set CleanBoneMatrixWeights(value: boolean);
    /**
     * Event raised when a plugin is used to load a scene
     */
    static OnPluginActivatedObservable: Observable<ISceneLoaderPlugin | ISceneLoaderPluginAsync>;
    private static _RegisteredPlugins;
    private static _ShowingLoadingScreen;
    /**
     * Gets the default plugin (used to load Babylon files)
     * @returns the .babylon plugin
     */
    static GetDefaultPlugin(): IRegisteredPlugin;
    private static _GetPluginForExtension;
    private static _GetPluginForDirectLoad;
    private static _GetPluginForFilename;
    private static _GetDirectLoad;
    private static _FormatErrorMessage;
    private static _LoadData;
    private static _GetFileInfo;
    /**
     * Gets a plugin that can load the given extension
     * @param extension defines the extension to load
     * @returns a plugin or null if none works
     */
    static GetPluginForExtension(extension: string): ISceneLoaderPlugin | ISceneLoaderPluginAsync | ISceneLoaderPluginFactory;
    /**
     * Gets a boolean indicating that the given extension can be loaded
     * @param extension defines the extension to load
     * @returns true if the extension is supported
     */
    static IsPluginForExtensionAvailable(extension: string): boolean;
    /**
     * Adds a new plugin to the list of registered plugins
     * @param plugin defines the plugin to add
     */
    static RegisterPlugin(plugin: ISceneLoaderPlugin | ISceneLoaderPluginAsync): void;
    /**
     * Import meshes into a scene
     * @param meshNames an array of mesh names, a single mesh name, or empty string for all meshes that filter what meshes are imported
     * @param rootUrl a string that defines the root url for the scene and resources or the concatenation of rootURL and filename (e.g. http://example.com/test.glb)
     * @param sceneFilename a string that defines the name of the scene file or starts with "data:" following by the stringified version of the scene or a File object (default: empty string)
     * @param scene the instance of BABYLON.Scene to append to
     * @param onSuccess a callback with a list of imported meshes, particleSystems, skeletons, and animationGroups when import succeeds
     * @param onProgress a callback with a progress event for each file being loaded
     * @param onError a callback with the scene, a message, and possibly an exception when import fails
     * @param pluginExtension the extension used to determine the plugin
     * @returns The loaded plugin
     */
    static ImportMesh(meshNames: any, rootUrl: string, sceneFilename?: string | File | ArrayBufferView, scene?: Nullable<Scene>, onSuccess?: Nullable<SceneLoaderSuccessCallback>, onProgress?: Nullable<(event: ISceneLoaderProgressEvent) => void>, onError?: Nullable<(scene: Scene, message: string, exception?: any) => void>, pluginExtension?: Nullable<string>, name?: string): Nullable<ISceneLoaderPlugin | ISceneLoaderPluginAsync>;
    /**
     * Import meshes into a scene
     * @param meshNames an array of mesh names, a single mesh name, or empty string for all meshes that filter what meshes are imported
     * @param rootUrl a string that defines the root url for the scene and resources or the concatenation of rootURL and filename (e.g. http://example.com/test.glb)
     * @param sceneFilename a string that defines the name of the scene file or starts with "data:" following by the stringified version of the scene or a File object (default: empty string)
     * @param scene the instance of BABYLON.Scene to append to
     * @param onProgress a callback with a progress event for each file being loaded
     * @param pluginExtension the extension used to determine the plugin
     * @returns The loaded list of imported meshes, particle systems, skeletons, and animation groups
     */
    static ImportMeshAsync(meshNames: any, rootUrl: string, sceneFilename?: string | File | ArrayBufferView, scene?: Nullable<Scene>, onProgress?: Nullable<(event: ISceneLoaderProgressEvent) => void>, pluginExtension?: Nullable<string>, name?: string): Promise<ISceneLoaderAsyncResult>;
    /**
     * Load a scene
     * @param rootUrl a string that defines the root url for the scene and resources or the concatenation of rootURL and filename (e.g. http://example.com/test.glb)
     * @param sceneFilename a string that defines the name of the scene file or starts with "data:" following by the stringified version of the scene or a File object (default: empty string)
     * @param engine is the instance of BABYLON.Engine to use to create the scene
     * @param onSuccess a callback with the scene when import succeeds
     * @param onProgress a callback with a progress event for each file being loaded
     * @param onError a callback with the scene, a message, and possibly an exception when import fails
     * @param pluginExtension the extension used to determine the plugin
     * @returns The loaded plugin
     */
    static Load(rootUrl: string, sceneFilename?: string | File | ArrayBufferView, engine?: Nullable<Engine>, onSuccess?: Nullable<(scene: Scene) => void>, onProgress?: Nullable<(event: ISceneLoaderProgressEvent) => void>, onError?: Nullable<(scene: Scene, message: string, exception?: any) => void>, pluginExtension?: Nullable<string>, name?: string): Nullable<ISceneLoaderPlugin | ISceneLoaderPluginAsync>;
    /**
     * Load a scene
     * @param rootUrl a string that defines the root url for the scene and resources or the concatenation of rootURL and filename (e.g. http://example.com/test.glb)
     * @param sceneFilename a string that defines the name of the scene file or starts with "data:" following by the stringified version of the scene or a File object (default: empty string)
     * @param engine is the instance of BABYLON.Engine to use to create the scene
     * @param onProgress a callback with a progress event for each file being loaded
     * @param pluginExtension the extension used to determine the plugin
     * @returns The loaded scene
     */
    static LoadAsync(rootUrl: string, sceneFilename?: string | File | ArrayBufferView, engine?: Nullable<Engine>, onProgress?: Nullable<(event: ISceneLoaderProgressEvent) => void>, pluginExtension?: Nullable<string>, name?: string): Promise<Scene>;
    /**
     * Append a scene
     * @param rootUrl a string that defines the root url for the scene and resources or the concatenation of rootURL and filename (e.g. http://example.com/test.glb)
     * @param sceneFilename a string that defines the name of the scene file or starts with "data:" following by the stringified version of the scene or a File object (default: empty string)
     * @param scene is the instance of BABYLON.Scene to append to
     * @param onSuccess a callback with the scene when import succeeds
     * @param onProgress a callback with a progress event for each file being loaded
     * @param onError a callback with the scene, a message, and possibly an exception when import fails
     * @param pluginExtension the extension used to determine the plugin
     * @returns The loaded plugin
     */
    static Append(rootUrl: string, sceneFilename?: string | File | ArrayBufferView, scene?: Nullable<Scene>, onSuccess?: Nullable<(scene: Scene) => void>, onProgress?: Nullable<(event: ISceneLoaderProgressEvent) => void>, onError?: Nullable<(scene: Scene, message: string, exception?: any) => void>, pluginExtension?: Nullable<string>, name?: string): Nullable<ISceneLoaderPlugin | ISceneLoaderPluginAsync>;
    /**
     * Append a scene
     * @param rootUrl a string that defines the root url for the scene and resources or the concatenation of rootURL and filename (e.g. http://example.com/test.glb)
     * @param sceneFilename a string that defines the name of the scene file or starts with "data:" following by the stringified version of the scene or a File object (default: empty string)
     * @param scene is the instance of BABYLON.Scene to append to
     * @param onProgress a callback with a progress event for each file being loaded
     * @param pluginExtension the extension used to determine the plugin
     * @returns The given scene
     */
    static AppendAsync(rootUrl: string, sceneFilename?: string | File | ArrayBufferView, scene?: Nullable<Scene>, onProgress?: Nullable<(event: ISceneLoaderProgressEvent) => void>, pluginExtension?: Nullable<string>, name?: string): Promise<Scene>;
    /**
     * Load a scene into an asset container
     * @param rootUrl a string that defines the root url for the scene and resources or the concatenation of rootURL and filename (e.g. http://example.com/test.glb)
     * @param sceneFilename a string that defines the name of the scene file or starts with "data:" following by the stringified version of the scene or a File object (default: empty string)
     * @param scene is the instance of BABYLON.Scene to append to (default: last created scene)
     * @param onSuccess a callback with the scene when import succeeds
     * @param onProgress a callback with a progress event for each file being loaded
     * @param onError a callback with the scene, a message, and possibly an exception when import fails
     * @param pluginExtension the extension used to determine the plugin
     * @returns The loaded plugin
     */
    static LoadAssetContainer(rootUrl: string, sceneFilename?: string | File | ArrayBufferView, scene?: Nullable<Scene>, onSuccess?: Nullable<(assets: AssetContainer) => void>, onProgress?: Nullable<(event: ISceneLoaderProgressEvent) => void>, onError?: Nullable<(scene: Scene, message: string, exception?: any) => void>, pluginExtension?: Nullable<string>, name?: string): Nullable<ISceneLoaderPlugin | ISceneLoaderPluginAsync>;
    /**
     * Load a scene into an asset container
     * @param rootUrl a string that defines the root url for the scene and resources or the concatenation of rootURL and filename (e.g. http://example.com/test.glb)
     * @param sceneFilename a string that defines the name of the scene file or starts with "data:" following by the stringified version of the scene (default: empty string)
     * @param scene is the instance of Scene to append to
     * @param onProgress a callback with a progress event for each file being loaded
     * @param pluginExtension the extension used to determine the plugin
     * @returns The loaded asset container
     */
    static LoadAssetContainerAsync(rootUrl: string, sceneFilename?: string | File, scene?: Nullable<Scene>, onProgress?: Nullable<(event: ISceneLoaderProgressEvent) => void>, pluginExtension?: Nullable<string>): Promise<AssetContainer>;
    /**
     * Import animations from a file into a scene
     * @param rootUrl a string that defines the root url for the scene and resources or the concatenation of rootURL and filename (e.g. http://example.com/test.glb)
     * @param sceneFilename a string that defines the name of the scene file or starts with "data:" following by the stringified version of the scene or a File object (default: empty string)
     * @param scene is the instance of BABYLON.Scene to append to (default: last created scene)
     * @param overwriteAnimations when true, animations are cleaned before importing new ones. Animations are appended otherwise
     * @param animationGroupLoadingMode defines how to handle old animations groups before importing new ones
     * @param targetConverter defines a function used to convert animation targets from loaded scene to current scene (default: search node by name)
     * @param onSuccess a callback with the scene when import succeeds
     * @param onProgress a callback with a progress event for each file being loaded
     * @param onError a callback with the scene, a message, and possibly an exception when import fails
     * @param pluginExtension the extension used to determine the plugin
     */
    static ImportAnimations(rootUrl: string, sceneFilename?: string | File, scene?: Nullable<Scene>, overwriteAnimations?: boolean, animationGroupLoadingMode?: SceneLoaderAnimationGroupLoadingMode, targetConverter?: Nullable<(target: any) => any>, onSuccess?: Nullable<(scene: Scene) => void>, onProgress?: Nullable<(event: ISceneLoaderProgressEvent) => void>, onError?: Nullable<(scene: Scene, message: string, exception?: any) => void>, pluginExtension?: Nullable<string>): void;
    /**
     * Import animations from a file into a scene
     * @param rootUrl a string that defines the root url for the scene and resources or the concatenation of rootURL and filename (e.g. http://example.com/test.glb)
     * @param sceneFilename a string that defines the name of the scene file or starts with "data:" following by the stringified version of the scene or a File object (default: empty string)
     * @param scene is the instance of BABYLON.Scene to append to (default: last created scene)
     * @param overwriteAnimations when true, animations are cleaned before importing new ones. Animations are appended otherwise
     * @param animationGroupLoadingMode defines how to handle old animations groups before importing new ones
     * @param targetConverter defines a function used to convert animation targets from loaded scene to current scene (default: search node by name)
     * @param onSuccess a callback with the scene when import succeeds
     * @param onProgress a callback with a progress event for each file being loaded
     * @param onError a callback with the scene, a message, and possibly an exception when import fails
     * @param pluginExtension the extension used to determine the plugin
     * @returns the updated scene with imported animations
     */
    static ImportAnimationsAsync(rootUrl: string, sceneFilename?: string | File, scene?: Nullable<Scene>, overwriteAnimations?: boolean, animationGroupLoadingMode?: SceneLoaderAnimationGroupLoadingMode, targetConverter?: Nullable<(target: any) => any>, onSuccess?: Nullable<(scene: Scene) => void>, onProgress?: Nullable<(event: ISceneLoaderProgressEvent) => void>, onError?: Nullable<(scene: Scene, message: string, exception?: any) => void>, pluginExtension?: Nullable<string>): Promise<Scene>;
}
export {};
