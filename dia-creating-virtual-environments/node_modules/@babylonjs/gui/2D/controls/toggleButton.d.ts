import { Observable } from "@babylonjs/core/Misc/observable.js";
import type { Vector2 } from "@babylonjs/core/Maths/math.vector.js";
import { Rectangle } from "./rectangle";
import type { Control } from "./control";
import type { PointerInfoBase } from "@babylonjs/core/Events/pointerEvents.js";
/**
 * Class used to create toggle buttons
 * @since 5.0.0
 */
export declare class ToggleButton extends Rectangle {
    name?: string | undefined;
    /**
     * Function called to generate the toActive animation
     */
    toActiveAnimation: () => void;
    /**
     * Function called to generate the toInactive animation
     */
    toInactiveAnimation: () => void;
    /**
     * Function called to generate a pointer enter animation when the toggle button is active.
     */
    pointerEnterActiveAnimation: () => void;
    /**
     * Function called to generate a pointer out animation when the toggle button is active.
     */
    pointerOutActiveAnimation: () => void;
    /**
     * Function called to generate a pointer down animation when the toggle button is active.
     */
    pointerDownActiveAnimation: () => void;
    /**
     * Function called to generate a pointer up animation when the toggle button is active.
     */
    pointerUpActiveAnimation: () => void;
    /**
     * Function called to generate a pointer enter animation when the toggle button is inactive.
     */
    pointerEnterInactiveAnimation: () => void;
    /**
     * Function called to generate a pointer out animation when the toggle button is inactive.
     */
    pointerOutInactiveAnimation: () => void;
    /**
     * Function called to generate a pointer down animation when the toggle button is inactive.
     */
    pointerDownInactiveAnimation: () => void;
    /**
     * Function called to generate a pointer up animation when the toggle button is inactive.
     */
    pointerUpInactiveAnimation: () => void;
    /** Observable raised when isActive is changed */
    onIsActiveChangedObservable: Observable<boolean>;
    /**
     * Gets or sets a boolean indicating that the toggle button will let internal controls handle picking instead of doing it directly using its bounding info
     */
    delegatePickingToChildren: boolean;
    private _group;
    /** Gets or sets group name this toggle button belongs to */
    get group(): string;
    set group(value: string);
    private _isActive;
    /** Gets or sets a boolean indicating if the toggle button is active or not */
    get isActive(): boolean;
    set isActive(value: boolean);
    /**
     * Creates a new ToggleButton
     * @param name defines the control name
     * @param group defines the toggle group this toggle belongs to
     */
    constructor(name?: string | undefined, group?: string);
    protected _getTypeName(): string;
    /**
     * @internal
     */
    _processPicking(x: number, y: number, pi: PointerInfoBase, type: number, pointerId: number, buttonIndex: number, deltaX?: number, deltaY?: number): boolean;
    /**
     * @internal
     */
    _onPointerEnter(target: Control, pi: PointerInfoBase): boolean;
    /**
     * @internal
     */
    _onPointerOut(target: Control, pi: PointerInfoBase, force?: boolean): void;
    /**
     * @internal
     */
    _onPointerDown(target: Control, coordinates: Vector2, pointerId: number, buttonIndex: number, pi: PointerInfoBase): boolean;
    /**
     * @internal
     */
    _onPointerUp(target: Control, coordinates: Vector2, pointerId: number, buttonIndex: number, notifyClick: boolean, pi: PointerInfoBase): void;
}
