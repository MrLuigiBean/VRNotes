import type { Nullable } from "../../types";
import type { ArcRotateCamera } from "../../Cameras/arcRotateCamera";
import { BaseCameraPointersInput } from "../../Cameras/Inputs/BaseCameraPointersInput";
import type { PointerTouch } from "../../Events/pointerEvents";
import type { IPointerEvent } from "../../Events/deviceInputEvents";
/**
 * Manage the pointers inputs to control an arc rotate camera.
 * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/customizingCameraInputs
 */
export declare class ArcRotateCameraPointersInput extends BaseCameraPointersInput {
    /**
     * Defines the camera the input is attached to.
     */
    camera: ArcRotateCamera;
    /**
     * The minimum radius used for pinch, to avoid radius lock at 0
     */
    static MinimumRadiusForPinch: number;
    /**
     * Gets the class name of the current input.
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Defines the buttons associated with the input to handle camera move.
     */
    buttons: number[];
    /**
     * Defines the pointer angular sensibility  along the X axis or how fast is
     * the camera rotating.
     */
    angularSensibilityX: number;
    /**
     * Defines the pointer angular sensibility along the Y axis or how fast is
     * the camera rotating.
     */
    angularSensibilityY: number;
    /**
     * Defines the pointer pinch precision or how fast is the camera zooming.
     */
    pinchPrecision: number;
    /**
     * pinchDeltaPercentage will be used instead of pinchPrecision if different
     * from 0.
     * It defines the percentage of current camera.radius to use as delta when
     * pinch zoom is used.
     */
    pinchDeltaPercentage: number;
    /**
     * When useNaturalPinchZoom is true, multi touch zoom will zoom in such
     * that any object in the plane at the camera's target point will scale
     * perfectly with finger motion.
     * Overrides pinchDeltaPercentage and pinchPrecision.
     */
    useNaturalPinchZoom: boolean;
    /**
     * Defines whether zoom (2 fingers pinch) is enabled through multitouch
     */
    pinchZoom: boolean;
    /**
     * Defines the pointer panning sensibility or how fast is the camera moving.
     */
    panningSensibility: number;
    /**
     * Defines whether panning (2 fingers swipe) is enabled through multitouch.
     */
    multiTouchPanning: boolean;
    /**
     * Defines whether panning is enabled for both pan (2 fingers swipe) and
     * zoom (pinch) through multitouch.
     */
    multiTouchPanAndZoom: boolean;
    /**
     * Revers pinch action direction.
     */
    pinchInwards: boolean;
    private _isPanClick;
    private _twoFingerActivityCount;
    private _isPinching;
    /**
     * Move camera from multi touch panning positions.
     * @param previousMultiTouchPanPosition
     * @param multiTouchPanPosition
     */
    private _computeMultiTouchPanning;
    /**
     * Move camera from pinch zoom distances.
     * @param previousPinchSquaredDistance
     * @param pinchSquaredDistance
     */
    private _computePinchZoom;
    /**
     * Called on pointer POINTERMOVE event if only a single touch is active.
     * @param point
     * @param offsetX
     * @param offsetY
     */
    onTouch(point: Nullable<PointerTouch>, offsetX: number, offsetY: number): void;
    /**
     * Called on pointer POINTERDOUBLETAP event.
     */
    onDoubleTap(): void;
    /**
     * Called on pointer POINTERMOVE event if multiple touches are active.
     * @param pointA
     * @param pointB
     * @param previousPinchSquaredDistance
     * @param pinchSquaredDistance
     * @param previousMultiTouchPanPosition
     * @param multiTouchPanPosition
     */
    onMultiTouch(pointA: Nullable<PointerTouch>, pointB: Nullable<PointerTouch>, previousPinchSquaredDistance: number, pinchSquaredDistance: number, previousMultiTouchPanPosition: Nullable<PointerTouch>, multiTouchPanPosition: Nullable<PointerTouch>): void;
    /**
     * Called each time a new POINTERDOWN event occurs. Ie, for each button
     * press.
     * @param evt Defines the event to track
     */
    onButtonDown(evt: IPointerEvent): void;
    /**
     * Called each time a new POINTERUP event occurs. Ie, for each button
     * release.
     * @param _evt Defines the event to track
     */
    onButtonUp(_evt: IPointerEvent): void;
    /**
     * Called when window becomes inactive.
     */
    onLostFocus(): void;
}
