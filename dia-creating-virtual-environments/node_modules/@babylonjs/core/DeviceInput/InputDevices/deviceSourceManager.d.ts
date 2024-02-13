import type { Engine } from "../../Engines/engine";
import { DeviceType } from "./deviceEnums";
import type { Nullable } from "../../types";
import { Observable } from "../../Misc/observable";
import type { DeviceSource } from "./deviceSource";
import type { IObservableManager, DeviceSourceType } from "../internalDeviceSourceManager";
import type { IDisposable } from "../../scene";
import type { IUIEvent } from "../../Events/deviceInputEvents";
/**
 * Class to keep track of devices
 */
export declare class DeviceSourceManager implements IDisposable, IObservableManager {
    /**
     * Observable to be triggered when after a device is connected, any new observers added will be triggered against already connected devices
     */
    readonly onDeviceConnectedObservable: Observable<DeviceSourceType>;
    /**
     * Observable to be triggered when after a device is disconnected
     */
    readonly onDeviceDisconnectedObservable: Observable<DeviceSourceType>;
    private _engine;
    private _onDisposeObserver;
    private readonly _devices;
    private readonly _firstDevice;
    /**
     * Gets a DeviceSource, given a type and slot
     * @param deviceType - Type of Device
     * @param deviceSlot - Slot or ID of device
     * @returns DeviceSource
     */
    getDeviceSource<T extends DeviceType>(deviceType: T, deviceSlot?: number): Nullable<DeviceSource<T>>;
    /**
     * Gets an array of DeviceSource objects for a given device type
     * @param deviceType - Type of Device
     * @returns All available DeviceSources of a given type
     */
    getDeviceSources<T extends DeviceType>(deviceType: T): ReadonlyArray<DeviceSource<T>>;
    /**
     * Default constructor
     * @param engine - Used to get canvas (if applicable)
     */
    constructor(engine: Engine);
    /**
     * Dispose of DeviceSourceManager
     */
    dispose(): void;
    /**
     * @param deviceSource - Source to add
     * @internal
     */
    _addDevice(deviceSource: DeviceSourceType): void;
    /**
     * @param deviceType - DeviceType
     * @param deviceSlot - DeviceSlot
     * @internal
     */
    _removeDevice(deviceType: DeviceType, deviceSlot: number): void;
    /**
     * @param deviceType - DeviceType
     * @param deviceSlot - DeviceSlot
     * @param eventData - Event
     * @internal
     */
    _onInputChanged<T extends DeviceType>(deviceType: T, deviceSlot: number, eventData: IUIEvent): void;
    private _updateFirstDevices;
}
