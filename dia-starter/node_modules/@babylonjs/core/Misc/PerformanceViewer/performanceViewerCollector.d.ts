import type { Scene } from "../../scene";
import type { IPerfCustomEvent, IPerfDatasets, IPerfMetadata } from "../interfaces/iPerfViewer";
import { Observable } from "../observable";
import type { PerfStrategyInitialization } from "./performanceViewerCollectionStrategies";
/**
 * Callback strategy and optional category for data collection
 */
interface IPerformanceViewerStrategyParameter {
    /**
     * The strategy for collecting data. Available strategies are located on the PerfCollectionStrategy class
     */
    strategyCallback: PerfStrategyInitialization;
    /**
     * Category for displaying this strategy on the viewer. Can be undefined or an empty string, in which case the strategy will be displayed on top
     */
    category?: string;
    /**
     * Starts hidden
     */
    hidden?: boolean;
}
/**
 * The collector class handles the collection and storage of data into the appropriate array.
 * The collector also handles notifying any observers of any updates.
 */
export declare class PerformanceViewerCollector {
    private _scene;
    private _datasetMeta;
    private _strategies;
    private _startingTimestamp;
    private _hasLoadedData;
    private _isStarted;
    private readonly _customEventObservable;
    private readonly _eventRestoreSet;
    /**
     * Datastructure containing the collected datasets. Warning: you should not modify the values in here, data will be of the form [timestamp, numberOfPoints, value1, value2..., timestamp, etc...]
     */
    readonly datasets: IPerfDatasets;
    /**
     * An observable you can attach to get deltas in the dataset. Subscribing to this will increase memory consumption slightly, and may hurt performance due to increased garbage collection needed.
     * Updates of slices will be of the form [timestamp, numberOfPoints, value1, value2...].
     */
    readonly datasetObservable: Observable<number[]>;
    /**
     * An observable you can attach to get the most updated map of metadatas.
     */
    readonly metadataObservable: Observable<Map<string, IPerfMetadata>>;
    /**
     * The offset for when actual data values start appearing inside a slice.
     */
    static get SliceDataOffset(): number;
    /**
     * The offset for the value of the number of points inside a slice.
     */
    static get NumberOfPointsOffset(): number;
    /**
     * Handles the creation of a performance viewer collector.
     * @param _scene the scene to collect on.
     * @param _enabledStrategyCallbacks the list of data to collect with callbacks for initialization purposes.
     */
    constructor(_scene: Scene, _enabledStrategyCallbacks?: IPerformanceViewerStrategyParameter[]);
    /**
     * Registers a custom string event which will be callable via sendEvent. This method returns an event object which will contain the id of the event.
     * The user can set a value optionally, which will be used in the sendEvent method. If the value is set, we will record this value at the end of each frame,
     * if not we will increment our counter and record the value of the counter at the end of each frame. The value recorded is 0 if no sendEvent method is called, within a frame.
     * @param name The name of the event to register
     * @param forceUpdate if the code should force add an event, and replace the last one.
     * @param category the category for that event
     * @returns The event registered, used in sendEvent
     */
    registerEvent(name: string, forceUpdate?: boolean, category?: string): IPerfCustomEvent | undefined;
    /**
     * Lets the perf collector handle an event, occurences or event value depending on if the event.value params is set.
     * @param event the event to handle an occurence for
     */
    sendEvent(event: IPerfCustomEvent): void;
    /**
     * This event restores all custom string events if necessary.
     */
    private _restoreStringEvents;
    /**
     * This method adds additional collection strategies for data collection purposes.
     * @param strategyCallbacks the list of data to collect with callbacks.
     */
    addCollectionStrategies(...strategyCallbacks: IPerformanceViewerStrategyParameter[]): void;
    /**
     * Gets a 6 character hexcode representing the colour from a passed in string.
     * @param id the string to get a hex code for.
     * @returns a hexcode hashed from the id.
     */
    private _getHexColorFromId;
    /**
     * Collects data for every dataset by using the appropriate strategy. This is called every frame.
     * This method will then notify all observers with the latest slice.
     */
    private _collectDataAtFrame;
    /**
     * Collects and then sends the latest slice to any observers by using the appropriate strategy when the user wants.
     * The slice will be of the form [timestamp, numberOfPoints, value1, value2...]
     * This method does not add onto the collected data accessible via the datasets variable.
     */
    getCurrentSlice(): void;
    /**
     * Updates a property for a dataset's metadata with the value provided.
     * @param id the id of the dataset which needs its metadata updated.
     * @param prop the property to update.
     * @param value the value to update the property with.
     */
    updateMetadata<T extends keyof IPerfMetadata>(id: string, prop: T, value: IPerfMetadata[T]): void;
    /**
     * Completely clear, data, ids, and strategies saved to this performance collector.
     * @param preserveStringEventsRestore if it should preserve the string events, by default will clear string events registered when called.
     */
    clear(preserveStringEventsRestore?: boolean): void;
    /**
     * Accessor which lets the caller know if the performance collector has data loaded from a file or not!
     * Call clear() to reset this value.
     * @returns true if the data is loaded from a file, false otherwise.
     */
    get hasLoadedData(): boolean;
    /**
     * Given a string containing file data, this function parses the file data into the datasets object.
     * It returns a boolean to indicate if this object was successfully loaded with the data.
     * @param data string content representing the file data.
     * @param keepDatasetMeta if it should use reuse the existing dataset metadata
     * @returns true if the data was successfully loaded, false otherwise.
     */
    loadFromFileData(data: string, keepDatasetMeta?: boolean): boolean;
    /**
     * Exports the datasets inside of the collector to a csv.
     */
    exportDataToCsv(): void;
    /**
     * Starts the realtime collection of data.
     * @param shouldPreserve optional boolean param, if set will preserve the dataset between calls of start.
     */
    start(shouldPreserve?: boolean): void;
    /**
     * Stops the collection of data.
     */
    stop(): void;
    /**
     * Returns if the perf collector has been started or not.
     */
    get isStarted(): boolean;
    /**
     * Disposes of the object
     */
    dispose(): void;
}
export {};
