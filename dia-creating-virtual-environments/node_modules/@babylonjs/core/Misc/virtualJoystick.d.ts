import type { Nullable } from "../types";
import { Vector3 } from "../Maths/math.vector";
/**
 * Defines the potential axis of a Joystick
 */
export declare enum JoystickAxis {
    /** X axis */
    X = 0,
    /** Y axis */
    Y = 1,
    /** Z axis */
    Z = 2
}
/**
 * Represents the different customization options available
 * for VirtualJoystick
 */
interface VirtualJoystickCustomizations {
    /**
     * Size of the joystick's puck
     */
    puckSize: number;
    /**
     * Size of the joystick's container
     */
    containerSize: number;
    /**
     * Color of the joystick && puck
     */
    color: string;
    /**
     * Image URL for the joystick's puck
     */
    puckImage?: string;
    /**
     * Image URL for the joystick's container
     */
    containerImage?: string;
    /**
     * Defines the unmoving position of the joystick container
     */
    position?: {
        x: number;
        y: number;
    };
    /**
     * Defines whether or not the joystick container is always visible
     */
    alwaysVisible: boolean;
    /**
     * Defines whether or not to limit the movement of the puck to the joystick's container
     */
    limitToContainer: boolean;
}
/**
 * Class used to define virtual joystick (used in touch mode)
 */
export declare class VirtualJoystick {
    /**
     * Gets or sets a boolean indicating that left and right values must be inverted
     */
    reverseLeftRight: boolean;
    /**
     * Gets or sets a boolean indicating that up and down values must be inverted
     */
    reverseUpDown: boolean;
    /**
     * Gets the offset value for the position (ie. the change of the position value)
     */
    deltaPosition: Vector3;
    /**
     * Gets a boolean indicating if the virtual joystick was pressed
     */
    pressed: boolean;
    /**
     * Canvas the virtual joystick will render onto, default z-index of this is 5
     */
    static Canvas: Nullable<HTMLCanvasElement>;
    /**
     * boolean indicating whether or not the joystick's puck's movement should be limited to the joystick's container area
     */
    limitToContainer: boolean;
    private static _GlobalJoystickIndex;
    private static _AlwaysVisibleSticks;
    private static _VJCanvasContext;
    private static _VJCanvasWidth;
    private static _VJCanvasHeight;
    private static _HalfWidth;
    private static _GetDefaultOptions;
    private _action;
    private _axisTargetedByLeftAndRight;
    private _axisTargetedByUpAndDown;
    private _joystickSensibility;
    private _inversedSensibility;
    private _joystickPointerId;
    private _joystickColor;
    private _joystickPointerPos;
    private _joystickPreviousPointerPos;
    private _joystickPointerStartPos;
    private _deltaJoystickVector;
    private _leftJoystick;
    private _touches;
    private _joystickPosition;
    private _alwaysVisible;
    private _puckImage;
    private _containerImage;
    private _released;
    private _joystickPuckSize;
    private _joystickContainerSize;
    private _clearPuckSize;
    private _clearContainerSize;
    private _clearPuckSizeOffset;
    private _clearContainerSizeOffset;
    private _onPointerDownHandlerRef;
    private _onPointerMoveHandlerRef;
    private _onPointerUpHandlerRef;
    private _onResize;
    /**
     * Creates a new virtual joystick
     * @param leftJoystick defines that the joystick is for left hand (false by default)
     * @param customizations Defines the options we want to customize the VirtualJoystick
     */
    constructor(leftJoystick?: boolean, customizations?: Partial<VirtualJoystickCustomizations>);
    /**
     * Defines joystick sensibility (ie. the ratio between a physical move and virtual joystick position change)
     * @param newJoystickSensibility defines the new sensibility
     */
    setJoystickSensibility(newJoystickSensibility: number): void;
    private _onPointerDown;
    private _onPointerMove;
    private _onPointerUp;
    /**
     * Change the color of the virtual joystick
     * @param newColor a string that must be a CSS color value (like "red") or the hexa value (like "#FF0000")
     */
    setJoystickColor(newColor: string): void;
    /**
     * Size of the joystick's container
     */
    set containerSize(newSize: number);
    get containerSize(): number;
    /**
     * Size of the joystick's puck
     */
    set puckSize(newSize: number);
    get puckSize(): number;
    /**
     * Clears the set position of the joystick
     */
    clearPosition(): void;
    /**
     * Defines whether or not the joystick container is always visible
     */
    set alwaysVisible(value: boolean);
    get alwaysVisible(): boolean;
    /**
     * Sets the constant position of the Joystick container
     * @param x X axis coordinate
     * @param y Y axis coordinate
     */
    setPosition(x: number, y: number): void;
    /**
     * Defines a callback to call when the joystick is touched
     * @param action defines the callback
     */
    setActionOnTouch(action: () => any): void;
    /**
     * Defines which axis you'd like to control for left & right
     * @param axis defines the axis to use
     */
    setAxisForLeftRight(axis: JoystickAxis): void;
    /**
     * Defines which axis you'd like to control for up & down
     * @param axis defines the axis to use
     */
    setAxisForUpDown(axis: JoystickAxis): void;
    /**
     * Clears the canvas from the previous puck / container draw
     */
    private _clearPreviousDraw;
    /**
     * Loads `urlPath` to be used for the container's image
     * @param urlPath defines the urlPath of an image to use
     */
    setContainerImage(urlPath: string): void;
    /**
     * Loads `urlPath` to be used for the puck's image
     * @param urlPath defines the urlPath of an image to use
     */
    setPuckImage(urlPath: string): void;
    /**
     * Draws the Virtual Joystick's container
     */
    private _drawContainer;
    /**
     * Draws the Virtual Joystick's puck
     */
    private _drawPuck;
    private _drawVirtualJoystick;
    /**
     * Release internal HTML canvas
     */
    releaseCanvas(): void;
}
export {};
