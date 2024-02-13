import type { IUIEvent } from "../Events/deviceInputEvents";
import type { Nullable } from "../types";
import { DeviceType } from "./InputDevices/deviceEnums";
import type { IDeviceInputSystem } from "./inputInterfaces";
/**
 * Class to wrap DeviceInputSystem data into an event object
 */
export declare class DeviceEventFactory {
    /**
     * Create device input events based on provided type and slot
     *
     * @param deviceType Type of device
     * @param deviceSlot "Slot" or index that device is referenced in
     * @param inputIndex Id of input to be checked
     * @param currentState Current value for given input
     * @param deviceInputSystem Reference to DeviceInputSystem
     * @param elementToAttachTo HTMLElement to reference as target for inputs
     * @returns IUIEvent object
     */
    static CreateDeviceEvent(deviceType: DeviceType, deviceSlot: number, inputIndex: number, currentState: Nullable<number>, deviceInputSystem: IDeviceInputSystem, elementToAttachTo?: any, pointerId?: number): IUIEvent;
    /**
     * Creates pointer event
     *
     * @param deviceType Type of device
     * @param deviceSlot "Slot" or index that device is referenced in
     * @param inputIndex Id of input to be checked
     * @param currentState Current value for given input
     * @param deviceInputSystem Reference to DeviceInputSystem
     * @param elementToAttachTo HTMLElement to reference as target for inputs
     * @returns IUIEvent object (Pointer)
     */
    private static _CreatePointerEvent;
    /**
     * Create Mouse Wheel Event
     * @param deviceType Type of device
     * @param deviceSlot "Slot" or index that device is referenced in
     * @param inputIndex Id of input to be checked
     * @param currentState Current value for given input
     * @param deviceInputSystem Reference to DeviceInputSystem
     * @param elementToAttachTo HTMLElement to reference as target for inputs
     * @returns IUIEvent object (Wheel)
     */
    private static _CreateWheelEvent;
    /**
     * Create Mouse Event
     * @param deviceType Type of device
     * @param deviceSlot "Slot" or index that device is referenced in
     * @param inputIndex Id of input to be checked
     * @param currentState Current value for given input
     * @param deviceInputSystem Reference to DeviceInputSystem
     * @param elementToAttachTo HTMLElement to reference as target for inputs
     * @returns IUIEvent object (Mouse)
     */
    private static _CreateMouseEvent;
    /**
     * Create Keyboard Event
     * @param inputIndex Id of input to be checked
     * @param currentState Current value for given input
     * @param deviceInputSystem Reference to DeviceInputSystem
     * @param elementToAttachTo HTMLElement to reference as target for inputs
     * @returns IEvent object (Keyboard)
     */
    private static _CreateKeyboardEvent;
    /**
     * Add parameters for non-character keys (Ctrl, Alt, Meta, Shift)
     * @param evt Event object to add parameters to
     * @param deviceInputSystem DeviceInputSystem to pull values from
     */
    private static _CheckNonCharacterKeys;
    /**
     * Create base event object
     * @param elementToAttachTo Value to use as event target
     * @returns
     */
    private static _CreateEvent;
}
