import type { Engine } from "../Engines/engine";
import type { IUIEvent } from "../Events/deviceInputEvents";
import { DeviceType } from "./InputDevices/deviceEnums";
import type { IDeviceInputSystem } from "./inputInterfaces";
/** @internal */
export declare class WebDeviceInputSystem implements IDeviceInputSystem {
    private _inputs;
    private _gamepads;
    private _keyboardActive;
    private _pointerActive;
    private _elementToAttachTo;
    private _metaKeys;
    private readonly _engine;
    private readonly _usingSafari;
    private readonly _usingMacOS;
    private _onDeviceConnected;
    private _onDeviceDisconnected;
    private _onInputChanged;
    private _keyboardDownEvent;
    private _keyboardUpEvent;
    private _keyboardBlurEvent;
    private _pointerMoveEvent;
    private _pointerDownEvent;
    private _pointerUpEvent;
    private _pointerCancelEvent;
    private _pointerWheelEvent;
    private _pointerBlurEvent;
    private _pointerMacOSChromeOutEvent;
    private _wheelEventName;
    private _eventsAttached;
    private _mouseId;
    private readonly _isUsingFirefox;
    private readonly _isUsingChromium;
    private _activeTouchIds;
    private _maxTouchPoints;
    private _pointerInputClearObserver;
    private _gamepadConnectedEvent;
    private _gamepadDisconnectedEvent;
    private _eventPrefix;
    /**
     * Constructor for the WebDeviceInputSystem
     * @param engine Engine to reference
     * @param onDeviceConnected Callback to execute when device is connected
     * @param onDeviceDisconnected Callback to execute when device is disconnected
     * @param onInputChanged Callback to execute when input changes on device
     */
    constructor(engine: Engine, onDeviceConnected: (deviceType: DeviceType, deviceSlot: number) => void, onDeviceDisconnected: (deviceType: DeviceType, deviceSlot: number) => void, onInputChanged: (deviceType: DeviceType, deviceSlot: number, eventData: IUIEvent) => void);
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
     * Dispose of all the eventlisteners
     */
    dispose(): void;
    /**
     * Enable listening for user input events
     */
    private _enableEvents;
    /**
     * Disable listening for user input events
     */
    private _disableEvents;
    /**
     * Checks for existing connections to devices and register them, if necessary
     * Currently handles gamepads and mouse
     */
    private _checkForConnectedDevices;
    /**
     * Add a gamepad to the DeviceInputSystem
     * @param gamepad A single DOM Gamepad object
     */
    private _addGamePad;
    /**
     * Add pointer device to DeviceInputSystem
     * @param deviceType Type of Pointer to add
     * @param deviceSlot Pointer ID (0 for mouse, pointerId for Touch)
     * @param currentX Current X at point of adding
     * @param currentY Current Y at point of adding
     */
    private _addPointerDevice;
    /**
     * Add device and inputs to device array
     * @param deviceType Enum specifying device type
     * @param deviceSlot "Slot" or index that device is referenced in
     * @param numberOfInputs Number of input entries to create for given device
     */
    private _registerDevice;
    /**
     * Given a specific device name, remove that device from the device map
     * @param deviceType Enum specifying device type
     * @param deviceSlot "Slot" or index that device is referenced in
     */
    private _unregisterDevice;
    /**
     * Handle all actions that come from keyboard interaction
     */
    private _handleKeyActions;
    /**
     * Handle all actions that come from pointer interaction
     */
    private _handlePointerActions;
    /**
     * Handle all actions that come from gamepad interaction
     */
    private _handleGamepadActions;
    /**
     * Update all non-event based devices with each frame
     * @param deviceType Enum specifying device type
     * @param deviceSlot "Slot" or index that device is referenced in
     * @param inputIndex Id of input to be checked
     */
    private _updateDevice;
    /**
     * Gets DeviceType from the device name
     * @param deviceName Name of Device from DeviceInputSystem
     * @returns DeviceType enum value
     */
    private _getGamepadDeviceType;
    /**
     * Get DeviceType from a given pointer/mouse/touch event.
     * @param evt PointerEvent to evaluate
     * @returns DeviceType interpreted from event
     */
    private _getPointerType;
}
