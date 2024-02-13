import { Observable } from "../../Misc/observable";
import type { ICameraInput } from "../../Cameras/cameraInputsManager";
import type { FreeCamera } from "../../Cameras/freeCamera";
/**
 * Manage the mouse inputs to control the movement of a free camera.
 * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/customizingCameraInputs
 */
export declare class FreeCameraMouseInput implements ICameraInput<FreeCamera> {
    /**
     * Define if touch is enabled in the mouse input
     */
    touchEnabled: boolean;
    /**
     * Defines the camera the input is attached to.
     */
    camera: FreeCamera;
    /**
     * Defines the buttons associated with the input to handle camera move.
     */
    buttons: number[];
    /**
     * Defines the pointer angular sensibility  along the X and Y axis or how fast is the camera rotating.
     */
    angularSensibility: number;
    private _pointerInput;
    private _onMouseMove;
    private _observer;
    private _previousPosition;
    /**
     * Observable for when a pointer move event occurs containing the move offset
     */
    onPointerMovedObservable: Observable<{
        offsetX: number;
        offsetY: number;
    }>;
    /**
     * @internal
     * If the camera should be rotated automatically based on pointer movement
     */
    _allowCameraRotation: boolean;
    private _currentActiveButton;
    private _activePointerId;
    private _contextMenuBind;
    /**
     * Manage the mouse inputs to control the movement of a free camera.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/customizingCameraInputs
     * @param touchEnabled Defines if touch is enabled or not
     */
    constructor(
    /**
     * Define if touch is enabled in the mouse input
     */
    touchEnabled?: boolean);
    /**
     * Attach the input controls to a specific dom element to get the input from.
     * @param noPreventDefault Defines whether event caught by the controls should call preventdefault() (https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
     */
    attachControl(noPreventDefault?: boolean): void;
    /**
     * Called on JS contextmenu event.
     * Override this method to provide functionality.
     * @param evt
     */
    onContextMenu(evt: PointerEvent): void;
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
}
