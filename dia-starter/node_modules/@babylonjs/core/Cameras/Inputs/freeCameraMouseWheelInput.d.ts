import type { Nullable } from "../../types";
import type { FreeCamera } from "../../Cameras/freeCamera";
import { BaseCameraMouseWheelInput } from "../../Cameras/Inputs/BaseCameraMouseWheelInput";
import { Coordinate } from "../../Maths/math.axis";
/**
 * Manage the mouse wheel inputs to control a free camera.
 * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras/customizingCameraInputs
 */
export declare class FreeCameraMouseWheelInput extends BaseCameraMouseWheelInput {
    /**
     * Defines the camera the input is attached to.
     */
    camera: FreeCamera;
    /**
     * Gets the class name of the current input.
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Set which movement axis (relative to camera's orientation) the mouse
     * wheel's X axis controls.
     * @param axis The axis to be moved. Set null to clear.
     */
    set wheelXMoveRelative(axis: Nullable<Coordinate>);
    /**
     * Get the configured movement axis (relative to camera's orientation) the
     * mouse wheel's X axis controls.
     * @returns The configured axis or null if none.
     */
    get wheelXMoveRelative(): Nullable<Coordinate>;
    /**
     * Set which movement axis (relative to camera's orientation) the mouse
     * wheel's Y axis controls.
     * @param axis The axis to be moved. Set null to clear.
     */
    set wheelYMoveRelative(axis: Nullable<Coordinate>);
    /**
     * Get the configured movement axis (relative to camera's orientation) the
     * mouse wheel's Y axis controls.
     * @returns The configured axis or null if none.
     */
    get wheelYMoveRelative(): Nullable<Coordinate>;
    /**
     * Set which movement axis (relative to camera's orientation) the mouse
     * wheel's Z axis controls.
     * @param axis The axis to be moved. Set null to clear.
     */
    set wheelZMoveRelative(axis: Nullable<Coordinate>);
    /**
     * Get the configured movement axis (relative to camera's orientation) the
     * mouse wheel's Z axis controls.
     * @returns The configured axis or null if none.
     */
    get wheelZMoveRelative(): Nullable<Coordinate>;
    /**
     * Set which rotation axis (relative to camera's orientation) the mouse
     * wheel's X axis controls.
     * @param axis The axis to be moved. Set null to clear.
     */
    set wheelXRotateRelative(axis: Nullable<Coordinate>);
    /**
     * Get the configured rotation axis (relative to camera's orientation) the
     * mouse wheel's X axis controls.
     * @returns The configured axis or null if none.
     */
    get wheelXRotateRelative(): Nullable<Coordinate>;
    /**
     * Set which rotation axis (relative to camera's orientation) the mouse
     * wheel's Y axis controls.
     * @param axis The axis to be moved. Set null to clear.
     */
    set wheelYRotateRelative(axis: Nullable<Coordinate>);
    /**
     * Get the configured rotation axis (relative to camera's orientation) the
     * mouse wheel's Y axis controls.
     * @returns The configured axis or null if none.
     */
    get wheelYRotateRelative(): Nullable<Coordinate>;
    /**
     * Set which rotation axis (relative to camera's orientation) the mouse
     * wheel's Z axis controls.
     * @param axis The axis to be moved. Set null to clear.
     */
    set wheelZRotateRelative(axis: Nullable<Coordinate>);
    /**
     * Get the configured rotation axis (relative to camera's orientation) the
     * mouse wheel's Z axis controls.
     * @returns The configured axis or null if none.
     */
    get wheelZRotateRelative(): Nullable<Coordinate>;
    /**
     * Set which movement axis (relative to the scene) the mouse wheel's X axis
     * controls.
     * @param axis The axis to be moved. Set null to clear.
     */
    set wheelXMoveScene(axis: Nullable<Coordinate>);
    /**
     * Get the configured movement axis (relative to the scene) the mouse wheel's
     * X axis controls.
     * @returns The configured axis or null if none.
     */
    get wheelXMoveScene(): Nullable<Coordinate>;
    /**
     * Set which movement axis (relative to the scene) the mouse wheel's Y axis
     * controls.
     * @param axis The axis to be moved. Set null to clear.
     */
    set wheelYMoveScene(axis: Nullable<Coordinate>);
    /**
     * Get the configured movement axis (relative to the scene) the mouse wheel's
     * Y axis controls.
     * @returns The configured axis or null if none.
     */
    get wheelYMoveScene(): Nullable<Coordinate>;
    /**
     * Set which movement axis (relative to the scene) the mouse wheel's Z axis
     * controls.
     * @param axis The axis to be moved. Set null to clear.
     */
    set wheelZMoveScene(axis: Nullable<Coordinate>);
    /**
     * Get the configured movement axis (relative to the scene) the mouse wheel's
     * Z axis controls.
     * @returns The configured axis or null if none.
     */
    get wheelZMoveScene(): Nullable<Coordinate>;
    /**
     * Called for each rendered frame.
     */
    checkInputs(): void;
    private _moveRelative;
    private _rotateRelative;
    private _moveScene;
    /**
     * These are set to the desired default behaviour.
     */
    private _wheelXAction;
    private _wheelXActionCoordinate;
    private _wheelYAction;
    private _wheelYActionCoordinate;
    private _wheelZAction;
    private _wheelZActionCoordinate;
    /**
     * Update the camera according to any configured properties for the 3
     * mouse-wheel axis.
     */
    private _updateCamera;
    /**
     * Update one property of the camera.
     * @param value
     * @param cameraProperty
     * @param coordinate
     */
    private _updateCameraProperty;
}
