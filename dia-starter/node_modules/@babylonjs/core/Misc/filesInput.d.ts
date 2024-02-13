import type { Engine } from "../Engines/engine";
import type { Scene } from "../scene";
import type { ISceneLoaderProgressEvent } from "../Loading/sceneLoader";
import type { Nullable } from "../types";
/**
 * Class used to help managing file picking and drag-n-drop
 */
export declare class FilesInput {
    readonly useAppend: boolean;
    /**
     * List of files ready to be loaded
     */
    static get FilesToLoad(): {
        [key: string]: File;
    };
    /**
     * Callback called when a file is processed
     */
    onProcessFileCallback: (file: File, name: string, extension: string, setSceneFileToLoad: (sceneFile: File) => void) => boolean;
    displayLoadingUI: boolean;
    /**
     * Function used when loading the scene file
     * @param sceneFile
     * @param onProgress
     */
    loadAsync: (sceneFile: File, onProgress: Nullable<(event: ISceneLoaderProgressEvent) => void>) => Promise<Scene>;
    private _engine;
    private _currentScene;
    private _sceneLoadedCallback;
    private _progressCallback;
    private _additionalRenderLoopLogicCallback;
    private _textureLoadingCallback;
    private _startingProcessingFilesCallback;
    private _onReloadCallback;
    private _errorCallback;
    private _elementToMonitor;
    private _sceneFileToLoad;
    private _filesToLoad;
    /**
     * Creates a new FilesInput
     * @param engine defines the rendering engine
     * @param scene defines the hosting scene
     * @param sceneLoadedCallback callback called when scene (files provided) is loaded
     * @param progressCallback callback called to track progress
     * @param additionalRenderLoopLogicCallback callback called to add user logic to the rendering loop
     * @param textureLoadingCallback callback called when a texture is loading
     * @param startingProcessingFilesCallback callback called when the system is about to process all files
     * @param onReloadCallback callback called when a reload is requested
     * @param errorCallback callback call if an error occurs
     * @param useAppend defines if the file loaded must be appended (true) or have the scene replaced (false, default behavior)
     */
    constructor(engine: Engine, scene: Nullable<Scene>, sceneLoadedCallback: Nullable<(sceneFile: File, scene: Scene) => void>, progressCallback: Nullable<(progress: ISceneLoaderProgressEvent) => void>, additionalRenderLoopLogicCallback: Nullable<() => void>, textureLoadingCallback: Nullable<(remaining: number) => void>, startingProcessingFilesCallback: Nullable<(files?: File[]) => void>, onReloadCallback: Nullable<(sceneFile: File) => void>, errorCallback: Nullable<(sceneFile: File, scene: Nullable<Scene>, message: string) => void>, useAppend?: boolean);
    private _dragEnterHandler;
    private _dragOverHandler;
    private _dropHandler;
    /**
     * Calls this function to listen to drag'n'drop events on a specific DOM element
     * @param elementToMonitor defines the DOM element to track
     */
    monitorElementForDragNDrop(elementToMonitor: HTMLElement): void;
    /** Gets the current list of files to load */
    get filesToLoad(): File[];
    /**
     * Release all associated resources
     */
    dispose(): void;
    private _renderFunction;
    private _drag;
    private _drop;
    private _traverseFolder;
    private _processFiles;
    /**
     * Load files from a drop event
     * @param event defines the drop event to use as source
     */
    loadFiles(event: any): void;
    private _processReload;
    /**
     * Reload the current scene from the loaded files
     */
    reload(): void;
}
