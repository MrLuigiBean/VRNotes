import type { DeviceType } from "./deviceEnums";
import { Observable } from "../../Misc/observable";
import type { DeviceInput } from "./deviceTypes";
import type { IDeviceInputSystem } from "../inputInterfaces";
import type { IKeyboardEvent, IPointerEvent, IWheelEvent } from "../../Events/deviceInputEvents";
/**
 * Subset of DeviceInput that only handles pointers and keyboard
 */
export type DeviceSourceEvent<T extends DeviceType> = T extends DeviceType.Keyboard ? IKeyboardEvent : T extends DeviceType.Mouse ? IWheelEvent | IPointerEvent : T extends DeviceType.Touch ? IPointerEvent : never;
/**
 * Class that handles all input for a specific device
 */
export declare class DeviceSource<T extends DeviceType> {
    /** Type of device */
    readonly deviceType: T;
    /** "Slot" or index that device is referenced in */
    readonly deviceSlot: number;
    /**
     * Observable to handle device input changes per device
     */
    readonly onInputChangedObservable: Observable<DeviceSourceEvent<T>>;
    private readonly _deviceInputSystem;
    /**
     * Default Constructor
     * @param deviceInputSystem - Reference to DeviceInputSystem
     * @param deviceType - Type of device
     * @param deviceSlot - "Slot" or index that device is referenced in
     */
    constructor(deviceInputSystem: IDeviceInputSystem, 
    /** Type of device */
    deviceType: T, 
    /** "Slot" or index that device is referenced in */
    deviceSlot?: number);
    /**
     * Get input for specific input
     * @param inputIndex - index of specific input on device
     * @returns Input value from DeviceInputSystem
     */
    getInput(inputIndex: DeviceInput<T>): number;
}
