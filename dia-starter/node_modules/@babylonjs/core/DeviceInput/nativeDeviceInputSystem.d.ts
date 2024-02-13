import type { IUIEvent } from "../Events/deviceInputEvents";
import { DeviceType } from "./InputDevices/deviceEnums";
import type { IDeviceInputSystem } from "./inputInterfaces";
/** @internal */
export declare class NativeDeviceInputSystem implements IDeviceInputSystem {
    private readonly _nativeInput;
    constructor(onDeviceConnected: (deviceType: DeviceType, deviceSlot: number) => void, onDeviceDisconnected: (deviceType: DeviceType, deviceSlot: number) => void, onInputChanged: (deviceType: DeviceType, deviceSlot: number, eventData: IUIEvent) => void);
    /**
     * Checks for current device input value, given an id and input index. Throws exception if requested device not initialized.
     * @param deviceType Enum specifying device type
     * @param deviceSlot "Slot" or index that device is referenced in
     * @param inputIndex Id of input to be checked
     * @returns Current value of input
     */
    pollInput(deviceType: DeviceType, deviceSlot: number, inputIndex: number): number;
    /**
     * Check for a specific device in the DeviceInputSystem
     * @param deviceType Type of device to check for
     * @returns bool with status of device's existence
     */
    isDeviceAvailable(deviceType: DeviceType): boolean;
    /**
     * Dispose of all the observables
     */
    dispose(): void;
    /**
     * For versions of BabylonNative that don't have the NativeInput plugin initialized, create a dummy version
     * @returns Object with dummy functions
     */
    private _createDummyNativeInput;
}
