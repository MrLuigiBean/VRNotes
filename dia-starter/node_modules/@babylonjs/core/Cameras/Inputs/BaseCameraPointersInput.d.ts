import type { Nullable } from "../../types";
import type { Camera } from "../../Cameras/camera";
import type { ICameraInput } from "../../Cameras/cameraInputsManager";
import type { PointerTouch } from "../../Events/pointerEvents";
import type { IPointerEvent } from "../../Events/deviceInputEvents";
/**
 * Base class for Camera Pointer Inputs.
 * See FollowCameraPointersInput in src/Cameras/Inputs/followCameraPointersInput.ts
 * for example usage.
 */
export declare abstract class BaseCameraPointersInput implements ICameraInput<Camera> {
    /**
     * Defines the camera the input is attached to.
     */
    abstract camera: Camera;
    /**
     * Whether keyboard modifier keys are pressed at time of last mouse event.
     */
    protected _altKey: boolean;
    protected _ctrlKey: boolean;
    protected _metaKey: boolean;
    protected _shiftKey: boolean;
    /**
     * Which mouse buttons were pressed at time of last mouse event.
     * https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons
     */
    protected _buttonsPressed: number;
    private _currentActiveButton;
    private _contextMenuBind;
    /**
     * Defines the buttons associated with the input to handle camera move.
     */
    buttons: number[];
    /**
     * Attach the input controls to a specific dom element to get the input from.
     * @param noPreventDefault Defines whether event caught by the controls should call preventdefault() (https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
     */
    attachControl(noPreventDefault?: boolean): void;
    /**
     * Detach the current controls from the specified dom element.
     */
    detachControl(): void;
    /**
     * Gets the class name of the current input.
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Get the friendly name associated with the input class.
     * @returns the input friendly name
     */
    getSimpleName(): string;
    /**
     * Called on pointer POINTERDOUBLETAP event.
     * Override this method to provide functionality on POINTERDOUBLETAP event.
     * @param type
     */
    onDoubleTap(type: string): void;
    /**
     * Called on pointer POINTERMOVE event if only a single touch is active.
     * Override this method to provide functionality.
     * @param point
     * @param offsetX
     * @param offsetY
     */
    onTouch(point: Nullable<PointerTouch>, offsetX: number, offsetY: number): void;
    /**
     * Called on pointer POINTERMOVE event if multiple touches are active.
     * Override this method to provide functionality.
     * @param _pointA
     * @param _pointB
     * @param previousPinchSquaredDistance
     * @param pinchSquaredDistance
     * @param previousMultiTouchPanPosition
     * @param multiTouchPanPosition
     */
    onMultiTouch(_pointA: Nullable<PointerTouch>, _pointB: Nullable<PointerTouch>, previousPinchSquaredDistance: number, pinchSquaredDistance: number, previousMultiTouchPanPosition: Nullable<PointerTouch>, multiTouchPanPosition: Nullable<PointerTouch>): void;
    /**
     * Called on JS contextmenu event.
     * Override this method to provide functionality.
     * @param evt
     */
    onContextMenu(evt: PointerEvent): void;
    /**
     * Called each time a new POINTERDOWN event occurs. Ie, for each button
     * press.
     * Override this method to provide functionality.
     * @param _evt Defines the event to track
     */
    onButtonDown(_evt: IPointerEvent): void;
    /**
     * Called each time a new POINTERUP event occurs. Ie, for each button
     * release.
     * Override this method to provide functionality.
     * @param _evt Defines the event to track
     */
    onButtonUp(_evt: IPointerEvent): void;
    /**
     * Called when window becomes inactive.
     * Override this method to provide functionality.
     */
    onLostFocus(): void;
    private _pointerInput;
    private _observer;
    private _onLostFocus;
    private _pointA;
    private _pointB;
}
