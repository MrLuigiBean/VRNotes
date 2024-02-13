import type { Scene } from "../scene";
import type { AbstractMesh } from "../Meshes/abstractMesh";
import type { TransformNode } from "../Meshes/transformNode";
import type { IParticleSystem } from "../Particles/IParticleSystem";
import type { Skeleton } from "../Bones/skeleton";
import { Observable } from "./observable";
import type { BaseTexture } from "../Materials/Textures/baseTexture";
import { Texture } from "../Materials/Textures/texture";
import { CubeTexture } from "../Materials/Textures/cubeTexture";
import { HDRCubeTexture } from "../Materials/Textures/hdrCubeTexture";
import { EquiRectangularCubeTexture } from "../Materials/Textures/equiRectangularCubeTexture";
import type { Animatable } from "../Animations/animatable";
import type { AnimationGroup } from "../Animations/animationGroup";
import type { AssetContainer } from "../assetContainer";
import type { Nullable } from "../types";
/**
 * Defines the list of states available for a task inside a AssetsManager
 */
export declare enum AssetTaskState {
    /**
     * Initialization
     */
    INIT = 0,
    /**
     * Running
     */
    RUNNING = 1,
    /**
     * Done
     */
    DONE = 2,
    /**
     * Error
     */
    ERROR = 3
}
/**
 * Define an abstract asset task used with a AssetsManager class to load assets into a scene
 */
export declare abstract class AbstractAssetTask {
    /**
     * Task name
     */ name: string;
    /**
     * Callback called when the task is successful
     */
    onSuccess: (task: any) => void;
    /**
     * Callback called when the task is not successful
     */
    onError: (task: any, message?: string, exception?: any) => void;
    /**
     * Creates a new AssetsManager
     * @param name defines the name of the task
     */
    constructor(
    /**
     * Task name
     */ name: string);
    private _isCompleted;
    private _taskState;
    private _errorObject;
    /**
     * Get if the task is completed
     */
    get isCompleted(): boolean;
    /**
     * Gets the current state of the task
     */
    get taskState(): AssetTaskState;
    /**
     * Gets the current error object (if task is in error)
     */
    get errorObject(): {
        message?: string;
        exception?: any;
    };
    /**
     * Internal only
     * @internal
     */
    _setErrorObject(message?: string, exception?: any): void;
    /**
     * Execute the current task
     * @param scene defines the scene where you want your assets to be loaded
     * @param onSuccess is a callback called when the task is successfully executed
     * @param onError is a callback called if an error occurs
     */
    run(scene: Scene, onSuccess: () => void, onError: (message?: string, exception?: any) => void): void;
    /**
     * Execute the current task
     * @param scene defines the scene where you want your assets to be loaded
     * @param onSuccess is a callback called when the task is successfully executed
     * @param onError is a callback called if an error occurs
     */
    runTask(scene: Scene, onSuccess: () => void, onError: (message?: string, exception?: any) => void): void;
    /**
     * Reset will set the task state back to INIT, so the next load call of the assets manager will execute this task again.
     * This can be used with failed tasks that have the reason for failure fixed.
     */
    reset(): void;
    private _onErrorCallback;
    private _onDoneCallback;
}
/**
 * Define the interface used by progress events raised during assets loading
 */
export interface IAssetsProgressEvent {
    /**
     * Defines the number of remaining tasks to process
     */
    remainingCount: number;
    /**
     * Defines the total number of tasks
     */
    totalCount: number;
    /**
     * Defines the task that was just processed
     */
    task: AbstractAssetTask;
}
/**
 * Class used to share progress information about assets loading
 */
export declare class AssetsProgressEvent implements IAssetsProgressEvent {
    /**
     * Defines the number of remaining tasks to process
     */
    remainingCount: number;
    /**
     * Defines the total number of tasks
     */
    totalCount: number;
    /**
     * Defines the task that was just processed
     */
    task: AbstractAssetTask;
    /**
     * Creates a AssetsProgressEvent
     * @param remainingCount defines the number of remaining tasks to process
     * @param totalCount defines the total number of tasks
     * @param task defines the task that was just processed
     */
    constructor(remainingCount: number, totalCount: number, task: AbstractAssetTask);
}
/**
 * Define a task used by AssetsManager to load assets into a container
 */
export declare class ContainerAssetTask extends AbstractAssetTask {
    /**
     * Defines the name of the task
     */
    name: string;
    /**
     * Defines the list of mesh's names you want to load
     */
    meshesNames: any;
    /**
     * Defines the root url to use as a base to load your meshes and associated resources
     */
    rootUrl: string;
    /**
     * Defines the filename or File of the scene to load from
     */
    sceneFilename: string | File;
    /**
     * Defines the extension to use to load the scene (if not defined, ".babylon" will be used)
     */
    extension?: string | undefined;
    /**
     * Get the loaded asset container
     */
    loadedContainer: AssetContainer;
    /**
     * Gets the list of loaded transforms
     */
    loadedTransformNodes: Array<TransformNode>;
    /**
     * Gets the list of loaded meshes
     */
    loadedMeshes: Array<AbstractMesh>;
    /**
     * Gets the list of loaded particle systems
     */
    loadedParticleSystems: Array<IParticleSystem>;
    /**
     * Gets the list of loaded skeletons
     */
    loadedSkeletons: Array<Skeleton>;
    /**
     * Gets the list of loaded animation groups
     */
    loadedAnimationGroups: Array<AnimationGroup>;
    /**
     * Callback called when the task is successful
     */
    onSuccess: (task: ContainerAssetTask) => void;
    /**
     * Callback called when the task is successful
     */
    onError: (task: ContainerAssetTask, message?: string, exception?: any) => void;
    /**
     * Creates a new ContainerAssetTask
     * @param name defines the name of the task
     * @param meshesNames defines the list of mesh's names you want to load
     * @param rootUrl defines the root url to use as a base to load your meshes and associated resources
     * @param sceneFilename defines the filename or File of the scene to load from
     */
    constructor(
    /**
     * Defines the name of the task
     */
    name: string, 
    /**
     * Defines the list of mesh's names you want to load
     */
    meshesNames: any, 
    /**
     * Defines the root url to use as a base to load your meshes and associated resources
     */
    rootUrl: string, 
    /**
     * Defines the filename or File of the scene to load from
     */
    sceneFilename: string | File, 
    /**
     * Defines the extension to use to load the scene (if not defined, ".babylon" will be used)
     */
    extension?: string | undefined);
    /**
     * Execute the current task
     * @param scene defines the scene where you want your assets to be loaded
     * @param onSuccess is a callback called when the task is successfully executed
     * @param onError is a callback called if an error occurs
     */
    runTask(scene: Scene, onSuccess: () => void, onError: (message?: string, exception?: any) => void): void;
}
/**
 * Define a task used by AssetsManager to load meshes
 */
export declare class MeshAssetTask extends AbstractAssetTask {
    /**
     * Defines the name of the task
     */
    name: string;
    /**
     * Defines the list of mesh's names you want to load
     */
    meshesNames: any;
    /**
     * Defines the root url to use as a base to load your meshes and associated resources
     */
    rootUrl: string;
    /**
     * Defines the filename or File of the scene to load from
     */
    sceneFilename: string | File;
    /**
     * Defines the extension to use to load the scene (if not defined, ".babylon" will be used)
     */
    extension?: string | undefined;
    /**
     * Gets the list of loaded transforms
     */
    loadedTransformNodes: Array<TransformNode>;
    /**
     * Gets the list of loaded meshes
     */
    loadedMeshes: Array<AbstractMesh>;
    /**
     * Gets the list of loaded particle systems
     */
    loadedParticleSystems: Array<IParticleSystem>;
    /**
     * Gets the list of loaded skeletons
     */
    loadedSkeletons: Array<Skeleton>;
    /**
     * Gets the list of loaded animation groups
     */
    loadedAnimationGroups: Array<AnimationGroup>;
    /**
     * Callback called when the task is successful
     */
    onSuccess: (task: MeshAssetTask) => void;
    /**
     * Callback called when the task is successful
     */
    onError: (task: MeshAssetTask, message?: string, exception?: any) => void;
    /**
     * Creates a new MeshAssetTask
     * @param name defines the name of the task
     * @param meshesNames defines the list of mesh's names you want to load
     * @param rootUrl defines the root url to use as a base to load your meshes and associated resources
     * @param sceneFilename defines the filename or File of the scene to load from
     */
    constructor(
    /**
     * Defines the name of the task
     */
    name: string, 
    /**
     * Defines the list of mesh's names you want to load
     */
    meshesNames: any, 
    /**
     * Defines the root url to use as a base to load your meshes and associated resources
     */
    rootUrl: string, 
    /**
     * Defines the filename or File of the scene to load from
     */
    sceneFilename: string | File, 
    /**
     * Defines the extension to use to load the scene (if not defined, ".babylon" will be used)
     */
    extension?: string | undefined);
    /**
     * Execute the current task
     * @param scene defines the scene where you want your assets to be loaded
     * @param onSuccess is a callback called when the task is successfully executed
     * @param onError is a callback called if an error occurs
     */
    runTask(scene: Scene, onSuccess: () => void, onError: (message?: string, exception?: any) => void): void;
}
/**
 * Define a task used by AssetsManager to load animations
 */
export declare class AnimationAssetTask extends AbstractAssetTask {
    /**
     * Defines the name of the task
     */
    name: string;
    /**
     * Defines the root url to use as a base to load your meshes and associated resources
     */
    rootUrl: string;
    /**
     * Defines the filename to load from
     */
    filename: string | File;
    /**
     * Defines a function used to convert animation targets from loaded scene to current scene (default: search node by name)
     */
    targetConverter?: Nullable<(target: any) => any> | undefined;
    /**
     * Defines the extension to use to load the scene (if not defined, ".babylon" will be used)
     */
    extension?: string | undefined;
    /**
     * Gets the list of loaded animation groups
     */
    loadedAnimationGroups: Array<AnimationGroup>;
    /**
     * Gets the list of loaded animatables
     */
    loadedAnimatables: Array<Animatable>;
    /**
     * Callback called when the task is successful
     */
    onSuccess: (task: AnimationAssetTask) => void;
    /**
     * Callback called when the task is successful
     */
    onError: (task: AnimationAssetTask, message?: string, exception?: any) => void;
    /**
     * Creates a new AnimationAssetTask
     * @param name defines the name of the task
     * @param rootUrl defines the root url to use as a base to load your meshes and associated resources
     * @param filename defines the filename or File of the scene to load from
     * @param targetConverter defines a function used to convert animation targets from loaded scene to current scene (default: search node by name)
     */
    constructor(
    /**
     * Defines the name of the task
     */
    name: string, 
    /**
     * Defines the root url to use as a base to load your meshes and associated resources
     */
    rootUrl: string, 
    /**
     * Defines the filename to load from
     */
    filename: string | File, 
    /**
     * Defines a function used to convert animation targets from loaded scene to current scene (default: search node by name)
     */
    targetConverter?: Nullable<(target: any) => any> | undefined, 
    /**
     * Defines the extension to use to load the scene (if not defined, ".babylon" will be used)
     */
    extension?: string | undefined);
    /**
     * Execute the current task
     * @param scene defines the scene where you want your assets to be loaded
     * @param onSuccess is a callback called when the task is successfully executed
     * @param onError is a callback called if an error occurs
     */
    runTask(scene: Scene, onSuccess: () => void, onError: (message?: string, exception?: any) => void): void;
}
/**
 * Define a task used by AssetsManager to load text content
 */
export declare class TextFileAssetTask extends AbstractAssetTask {
    /**
     * Defines the name of the task
     */
    name: string;
    /**
     * Defines the location of the file to load
     */
    url: string;
    /**
     * Gets the loaded text string
     */
    text: string;
    /**
     * Callback called when the task is successful
     */
    onSuccess: (task: TextFileAssetTask) => void;
    /**
     * Callback called when the task is successful
     */
    onError: (task: TextFileAssetTask, message?: string, exception?: any) => void;
    /**
     * Creates a new TextFileAssetTask object
     * @param name defines the name of the task
     * @param url defines the location of the file to load
     */
    constructor(
    /**
     * Defines the name of the task
     */
    name: string, 
    /**
     * Defines the location of the file to load
     */
    url: string);
    /**
     * Execute the current task
     * @param scene defines the scene where you want your assets to be loaded
     * @param onSuccess is a callback called when the task is successfully executed
     * @param onError is a callback called if an error occurs
     */
    runTask(scene: Scene, onSuccess: () => void, onError: (message?: string, exception?: any) => void): void;
}
/**
 * Define a task used by AssetsManager to load binary data
 */
export declare class BinaryFileAssetTask extends AbstractAssetTask {
    /**
     * Defines the name of the task
     */
    name: string;
    /**
     * Defines the location of the file to load
     */
    url: string;
    /**
     * Gets the loaded data (as an array buffer)
     */
    data: ArrayBuffer;
    /**
     * Callback called when the task is successful
     */
    onSuccess: (task: BinaryFileAssetTask) => void;
    /**
     * Callback called when the task is successful
     */
    onError: (task: BinaryFileAssetTask, message?: string, exception?: any) => void;
    /**
     * Creates a new BinaryFileAssetTask object
     * @param name defines the name of the new task
     * @param url defines the location of the file to load
     */
    constructor(
    /**
     * Defines the name of the task
     */
    name: string, 
    /**
     * Defines the location of the file to load
     */
    url: string);
    /**
     * Execute the current task
     * @param scene defines the scene where you want your assets to be loaded
     * @param onSuccess is a callback called when the task is successfully executed
     * @param onError is a callback called if an error occurs
     */
    runTask(scene: Scene, onSuccess: () => void, onError: (message?: string, exception?: any) => void): void;
}
/**
 * Define a task used by AssetsManager to load images
 */
export declare class ImageAssetTask extends AbstractAssetTask {
    /**
     * Defines the name of the task
     */
    name: string;
    /**
     * Defines the location of the image to load
     */
    url: string;
    /**
     * Gets the loaded images
     */
    image: HTMLImageElement;
    /**
     * Callback called when the task is successful
     */
    onSuccess: (task: ImageAssetTask) => void;
    /**
     * Callback called when the task is successful
     */
    onError: (task: ImageAssetTask, message?: string, exception?: any) => void;
    /**
     * Creates a new ImageAssetTask
     * @param name defines the name of the task
     * @param url defines the location of the image to load
     */
    constructor(
    /**
     * Defines the name of the task
     */
    name: string, 
    /**
     * Defines the location of the image to load
     */
    url: string);
    /**
     * Execute the current task
     * @param scene defines the scene where you want your assets to be loaded
     * @param onSuccess is a callback called when the task is successfully executed
     * @param onError is a callback called if an error occurs
     */
    runTask(scene: Scene, onSuccess: () => void, onError: (message?: string, exception?: any) => void): void;
}
/**
 * Defines the interface used by texture loading tasks
 */
export interface ITextureAssetTask<TEX extends BaseTexture> {
    /**
     * Gets the loaded texture
     */
    texture: TEX;
}
/**
 * Define a task used by AssetsManager to load 2D textures
 */
export declare class TextureAssetTask extends AbstractAssetTask implements ITextureAssetTask<Texture> {
    /**
     * Defines the name of the task
     */
    name: string;
    /**
     * Defines the location of the file to load
     */
    url: string;
    /**
     * Defines if mipmap should not be generated (default is false)
     */
    noMipmap?: boolean | undefined;
    /**
     * Defines if texture must be inverted on Y axis (default is true)
     */
    invertY: boolean;
    /**
     * Defines the sampling mode to use (default is Texture.TRILINEAR_SAMPLINGMODE)
     */
    samplingMode: number;
    /**
     * Gets the loaded texture
     */
    texture: Texture;
    /**
     * Callback called when the task is successful
     */
    onSuccess: (task: TextureAssetTask) => void;
    /**
     * Callback called when the task is successful
     */
    onError: (task: TextureAssetTask, message?: string, exception?: any) => void;
    /**
     * Creates a new TextureAssetTask object
     * @param name defines the name of the task
     * @param url defines the location of the file to load
     * @param noMipmap defines if mipmap should not be generated (default is false)
     * @param invertY defines if texture must be inverted on Y axis (default is true)
     * @param samplingMode defines the sampling mode to use (default is Texture.TRILINEAR_SAMPLINGMODE)
     */
    constructor(
    /**
     * Defines the name of the task
     */
    name: string, 
    /**
     * Defines the location of the file to load
     */
    url: string, 
    /**
     * Defines if mipmap should not be generated (default is false)
     */
    noMipmap?: boolean | undefined, 
    /**
     * Defines if texture must be inverted on Y axis (default is true)
     */
    invertY?: boolean, 
    /**
     * Defines the sampling mode to use (default is Texture.TRILINEAR_SAMPLINGMODE)
     */
    samplingMode?: number);
    /**
     * Execute the current task
     * @param scene defines the scene where you want your assets to be loaded
     * @param onSuccess is a callback called when the task is successfully executed
     * @param onError is a callback called if an error occurs
     */
    runTask(scene: Scene, onSuccess: () => void, onError: (message?: string, exception?: any) => void): void;
}
/**
 * Define a task used by AssetsManager to load cube textures
 */
export declare class CubeTextureAssetTask extends AbstractAssetTask implements ITextureAssetTask<CubeTexture> {
    /**
     * Defines the name of the task
     */
    name: string;
    /**
     * Defines the location of the files to load (You have to specify the folder where the files are + filename with no extension)
     */
    url: string;
    /**
     * Defines the extensions to use to load files (["_px", "_py", "_pz", "_nx", "_ny", "_nz"] by default)
     */
    extensions?: string[] | undefined;
    /**
     * Defines if mipmaps should not be generated (default is false)
     */
    noMipmap?: boolean | undefined;
    /**
     * Defines the explicit list of files (undefined by default)
     */
    files?: string[] | undefined;
    /**
     * Defines the prefiltered texture option (default is false)
     */
    prefiltered?: boolean | undefined;
    /**
     * Gets the loaded texture
     */
    texture: CubeTexture;
    /**
     * Callback called when the task is successful
     */
    onSuccess: (task: CubeTextureAssetTask) => void;
    /**
     * Callback called when the task is successful
     */
    onError: (task: CubeTextureAssetTask, message?: string, exception?: any) => void;
    /**
     * Creates a new CubeTextureAssetTask
     * @param name defines the name of the task
     * @param url defines the location of the files to load (You have to specify the folder where the files are + filename with no extension)
     * @param extensions defines the extensions to use to load files (["_px", "_py", "_pz", "_nx", "_ny", "_nz"] by default)
     * @param noMipmap defines if mipmaps should not be generated (default is false)
     * @param files defines the explicit list of files (undefined by default)
     * @param prefiltered
     */
    constructor(
    /**
     * Defines the name of the task
     */
    name: string, 
    /**
     * Defines the location of the files to load (You have to specify the folder where the files are + filename with no extension)
     */
    url: string, 
    /**
     * Defines the extensions to use to load files (["_px", "_py", "_pz", "_nx", "_ny", "_nz"] by default)
     */
    extensions?: string[] | undefined, 
    /**
     * Defines if mipmaps should not be generated (default is false)
     */
    noMipmap?: boolean | undefined, 
    /**
     * Defines the explicit list of files (undefined by default)
     */
    files?: string[] | undefined, 
    /**
     * Defines the prefiltered texture option (default is false)
     */
    prefiltered?: boolean | undefined);
    /**
     * Execute the current task
     * @param scene defines the scene where you want your assets to be loaded
     * @param onSuccess is a callback called when the task is successfully executed
     * @param onError is a callback called if an error occurs
     */
    runTask(scene: Scene, onSuccess: () => void, onError: (message?: string, exception?: any) => void): void;
}
/**
 * Define a task used by AssetsManager to load HDR cube textures
 */
export declare class HDRCubeTextureAssetTask extends AbstractAssetTask implements ITextureAssetTask<HDRCubeTexture> {
    /**
     * Defines the name of the task
     */
    name: string;
    /**
     * Defines the location of the file to load
     */
    url: string;
    /**
     * Defines the desired size (the more it increases the longer the generation will be)
     */
    size: number;
    /**
     * Defines if mipmaps should not be generated (default is false)
     */
    noMipmap: boolean;
    /**
     * Specifies whether you want to extract the polynomial harmonics during the generation process (default is true)
     */
    generateHarmonics: boolean;
    /**
     * Specifies if the texture will be use in gamma or linear space (the PBR material requires those texture in linear space, but the standard material would require them in Gamma space) (default is false)
     */
    gammaSpace: boolean;
    /**
     * Internal Use Only
     */
    reserved: boolean;
    /**
     * Gets the loaded texture
     */
    texture: HDRCubeTexture;
    /**
     * Callback called when the task is successful
     */
    onSuccess: (task: HDRCubeTextureAssetTask) => void;
    /**
     * Callback called when the task is successful
     */
    onError: (task: HDRCubeTextureAssetTask, message?: string, exception?: any) => void;
    /**
     * Creates a new HDRCubeTextureAssetTask object
     * @param name defines the name of the task
     * @param url defines the location of the file to load
     * @param size defines the desired size (the more it increases the longer the generation will be) If the size is omitted this implies you are using a preprocessed cubemap.
     * @param noMipmap defines if mipmaps should not be generated (default is false)
     * @param generateHarmonics specifies whether you want to extract the polynomial harmonics during the generation process (default is true)
     * @param gammaSpace specifies if the texture will be use in gamma or linear space (the PBR material requires those texture in linear space, but the standard material would require them in Gamma space) (default is false)
     * @param reserved Internal use only
     */
    constructor(
    /**
     * Defines the name of the task
     */
    name: string, 
    /**
     * Defines the location of the file to load
     */
    url: string, 
    /**
     * Defines the desired size (the more it increases the longer the generation will be)
     */
    size: number, 
    /**
     * Defines if mipmaps should not be generated (default is false)
     */
    noMipmap?: boolean, 
    /**
     * Specifies whether you want to extract the polynomial harmonics during the generation process (default is true)
     */
    generateHarmonics?: boolean, 
    /**
     * Specifies if the texture will be use in gamma or linear space (the PBR material requires those texture in linear space, but the standard material would require them in Gamma space) (default is false)
     */
    gammaSpace?: boolean, 
    /**
     * Internal Use Only
     */
    reserved?: boolean);
    /**
     * Execute the current task
     * @param scene defines the scene where you want your assets to be loaded
     * @param onSuccess is a callback called when the task is successfully executed
     * @param onError is a callback called if an error occurs
     */
    runTask(scene: Scene, onSuccess: () => void, onError: (message?: string, exception?: any) => void): void;
}
/**
 * Define a task used by AssetsManager to load Equirectangular cube textures
 */
export declare class EquiRectangularCubeTextureAssetTask extends AbstractAssetTask implements ITextureAssetTask<EquiRectangularCubeTexture> {
    /**
     * Defines the name of the task
     */
    name: string;
    /**
     * Defines the location of the file to load
     */
    url: string;
    /**
     * Defines the desired size (the more it increases the longer the generation will be)
     */
    size: number;
    /**
     * Defines if mipmaps should not be generated (default is false)
     */
    noMipmap: boolean;
    /**
     * Specifies if the texture will be use in gamma or linear space (the PBR material requires those texture in linear space,
     * but the standard material would require them in Gamma space) (default is true)
     */
    gammaSpace: boolean;
    /**
     * Gets the loaded texture
     */
    texture: EquiRectangularCubeTexture;
    /**
     * Callback called when the task is successful
     */
    onSuccess: (task: EquiRectangularCubeTextureAssetTask) => void;
    /**
     * Callback called when the task is successful
     */
    onError: (task: EquiRectangularCubeTextureAssetTask, message?: string, exception?: any) => void;
    /**
     * Creates a new EquiRectangularCubeTextureAssetTask object
     * @param name defines the name of the task
     * @param url defines the location of the file to load
     * @param size defines the desired size (the more it increases the longer the generation will be)
     * If the size is omitted this implies you are using a preprocessed cubemap.
     * @param noMipmap defines if mipmaps should not be generated (default is false)
     * @param gammaSpace specifies if the texture will be used in gamma or linear space
     * (the PBR material requires those texture in linear space, but the standard material would require them in Gamma space)
     * (default is true)
     */
    constructor(
    /**
     * Defines the name of the task
     */
    name: string, 
    /**
     * Defines the location of the file to load
     */
    url: string, 
    /**
     * Defines the desired size (the more it increases the longer the generation will be)
     */
    size: number, 
    /**
     * Defines if mipmaps should not be generated (default is false)
     */
    noMipmap?: boolean, 
    /**
     * Specifies if the texture will be use in gamma or linear space (the PBR material requires those texture in linear space,
     * but the standard material would require them in Gamma space) (default is true)
     */
    gammaSpace?: boolean);
    /**
     * Execute the current task
     * @param scene defines the scene where you want your assets to be loaded
     * @param onSuccess is a callback called when the task is successfully executed
     * @param onError is a callback called if an error occurs
     */
    runTask(scene: Scene, onSuccess: () => void, onError: (message?: string, exception?: any) => void): void;
}
/**
 * This class can be used to easily import assets into a scene
 * @see https://doc.babylonjs.com/features/featuresDeepDive/importers/assetManager
 */
export declare class AssetsManager {
    private _scene;
    private _isLoading;
    protected _tasks: AbstractAssetTask[];
    protected _waitingTasksCount: number;
    protected _totalTasksCount: number;
    /**
     * Callback called when all tasks are processed
     */
    onFinish: (tasks: AbstractAssetTask[]) => void;
    /**
     * Callback called when a task is successful
     */
    onTaskSuccess: (task: AbstractAssetTask) => void;
    /**
     * Callback called when a task had an error
     */
    onTaskError: (task: AbstractAssetTask) => void;
    /**
     * Callback called when a task is done (whatever the result is)
     */
    onProgress: (remainingCount: number, totalCount: number, task: AbstractAssetTask) => void;
    /**
     * Observable called when all tasks are processed
     */
    onTaskSuccessObservable: Observable<AbstractAssetTask>;
    /**
     * Observable called when a task had an error
     */
    onTaskErrorObservable: Observable<AbstractAssetTask>;
    /**
     * Observable called when all tasks were executed
     */
    onTasksDoneObservable: Observable<AbstractAssetTask[]>;
    /**
     * Observable called when a task is done (whatever the result is)
     */
    onProgressObservable: Observable<IAssetsProgressEvent>;
    /**
     * Gets or sets a boolean defining if the AssetsManager should use the default loading screen
     * @see https://doc.babylonjs.com/features/featuresDeepDive/scene/customLoadingScreen
     */
    useDefaultLoadingScreen: boolean;
    /**
     * Gets or sets a boolean defining if the AssetsManager should automatically hide the loading screen
     * when all assets have been downloaded.
     * If set to false, you need to manually call in hideLoadingUI() once your scene is ready.
     */
    autoHideLoadingUI: boolean;
    /**
     * Creates a new AssetsManager
     * @param scene defines the scene to work on
     */
    constructor(scene?: Scene);
    /**
     * Add a ContainerAssetTask to the list of active tasks
     * @param taskName defines the name of the new task
     * @param meshesNames defines the name of meshes to load
     * @param rootUrl defines the root url to use to locate files
     * @param sceneFilename defines the filename of the scene file or the File itself
     * @param extension defines the extension to use to load the file
     * @returns a new ContainerAssetTask object
     */
    addContainerTask(taskName: string, meshesNames: any, rootUrl: string, sceneFilename: string | File, extension?: string): ContainerAssetTask;
    /**
     * Add a MeshAssetTask to the list of active tasks
     * @param taskName defines the name of the new task
     * @param meshesNames defines the name of meshes to load
     * @param rootUrl defines the root url to use to locate files
     * @param sceneFilename defines the filename of the scene file or the File itself
     * @param extension defines the extension to use to load the file
     * @returns a new MeshAssetTask object
     */
    addMeshTask(taskName: string, meshesNames: any, rootUrl: string, sceneFilename: string | File, extension?: string): MeshAssetTask;
    /**
     * Add a TextFileAssetTask to the list of active tasks
     * @param taskName defines the name of the new task
     * @param url defines the url of the file to load
     * @returns a new TextFileAssetTask object
     */
    addTextFileTask(taskName: string, url: string): TextFileAssetTask;
    /**
     * Add a BinaryFileAssetTask to the list of active tasks
     * @param taskName defines the name of the new task
     * @param url defines the url of the file to load
     * @returns a new BinaryFileAssetTask object
     */
    addBinaryFileTask(taskName: string, url: string): BinaryFileAssetTask;
    /**
     * Add a ImageAssetTask to the list of active tasks
     * @param taskName defines the name of the new task
     * @param url defines the url of the file to load
     * @returns a new ImageAssetTask object
     */
    addImageTask(taskName: string, url: string): ImageAssetTask;
    /**
     * Add a TextureAssetTask to the list of active tasks
     * @param taskName defines the name of the new task
     * @param url defines the url of the file to load
     * @param noMipmap defines if the texture must not receive mipmaps (false by default)
     * @param invertY defines if you want to invert Y axis of the loaded texture (true by default)
     * @param samplingMode defines the sampling mode to use (Texture.TRILINEAR_SAMPLINGMODE by default)
     * @returns a new TextureAssetTask object
     */
    addTextureTask(taskName: string, url: string, noMipmap?: boolean, invertY?: boolean, samplingMode?: number): TextureAssetTask;
    /**
     * Add a CubeTextureAssetTask to the list of active tasks
     * @param taskName defines the name of the new task
     * @param url defines the url of the file to load
     * @param extensions defines the extension to use to load the cube map (can be null)
     * @param noMipmap defines if the texture must not receive mipmaps (false by default)
     * @param files defines the list of files to load (can be null)
     * @param prefiltered defines the prefiltered texture option (default is false)
     * @returns a new CubeTextureAssetTask object
     */
    addCubeTextureTask(taskName: string, url: string, extensions?: string[], noMipmap?: boolean, files?: string[], prefiltered?: boolean): CubeTextureAssetTask;
    /**
     *
     * Add a HDRCubeTextureAssetTask to the list of active tasks
     * @param taskName defines the name of the new task
     * @param url defines the url of the file to load
     * @param size defines the size you want for the cubemap (can be null)
     * @param noMipmap defines if the texture must not receive mipmaps (false by default)
     * @param generateHarmonics defines if you want to automatically generate (true by default)
     * @param gammaSpace specifies if the texture will be use in gamma or linear space (the PBR material requires those texture in linear space, but the standard material would require them in Gamma space) (default is false)
     * @param reserved Internal use only
     * @returns a new HDRCubeTextureAssetTask object
     */
    addHDRCubeTextureTask(taskName: string, url: string, size: number, noMipmap?: boolean, generateHarmonics?: boolean, gammaSpace?: boolean, reserved?: boolean): HDRCubeTextureAssetTask;
    /**
     *
     * Add a EquiRectangularCubeTextureAssetTask to the list of active tasks
     * @param taskName defines the name of the new task
     * @param url defines the url of the file to load
     * @param size defines the size you want for the cubemap (can be null)
     * @param noMipmap defines if the texture must not receive mipmaps (false by default)
     * @param gammaSpace Specifies if the texture will be used in gamma or linear space
     * (the PBR material requires those textures in linear space, but the standard material would require them in Gamma space)
     * @returns a new EquiRectangularCubeTextureAssetTask object
     */
    addEquiRectangularCubeTextureAssetTask(taskName: string, url: string, size: number, noMipmap?: boolean, gammaSpace?: boolean): EquiRectangularCubeTextureAssetTask;
    /**
     * Remove a task from the assets manager.
     * @param task the task to remove
     */
    removeTask(task: AbstractAssetTask): void;
    private _decreaseWaitingTasksCount;
    private _runTask;
    private _formatTaskErrorMessage;
    /**
     * Reset the AssetsManager and remove all tasks
     * @returns the current instance of the AssetsManager
     */
    reset(): AssetsManager;
    /**
     * Start the loading process
     * @returns the current instance of the AssetsManager
     */
    load(): AssetsManager;
    /**
     * Start the loading process as an async operation
     * @returns a promise returning the list of failed tasks
     */
    loadAsync(): Promise<void>;
}
