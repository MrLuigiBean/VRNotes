import type { EventState, Observer } from "../Misc/observable";
import { PointerInfo } from "../Events/pointerEvents";
import type { Nullable } from "../types";
import { PickingInfo } from "../Collisions/pickingInfo";
import { Vector2 } from "../Maths/math.vector";
import type { AbstractMesh } from "../Meshes/abstractMesh";
import type { IMouseEvent, IPointerEvent } from "../Events/deviceInputEvents";
import type { Scene } from "../scene";
/**
 * Class used to manage all inputs for the scene.
 */
export declare class InputManager {
    /** The distance in pixel that you have to move to prevent some events */
    static DragMovementThreshold: number;
    /** Time in milliseconds to wait to raise long press events if button is still pressed */
    static LongPressDelay: number;
    /** Time in milliseconds with two consecutive clicks will be considered as a double click */
    static DoubleClickDelay: number;
    /**
     * This flag will modify the behavior so that, when true, a click will happen if and only if
     * another click DOES NOT happen within the DoubleClickDelay time frame.  If another click does
     * happen within that time frame, the first click will not fire an event and and a double click will occur.
     */
    static ExclusiveDoubleClickMode: boolean;
    /** This is a defensive check to not allow control attachment prior to an already active one. If already attached, previous control is unattached before attaching the new one. */
    private _alreadyAttached;
    private _alreadyAttachedTo;
    private _onPointerMove;
    private _onPointerDown;
    private _onPointerUp;
    private _initClickEvent;
    private _initActionManager;
    private _delayedSimpleClick;
    private _meshPickProceed;
    private _previousButtonPressed;
    private _currentPickResult;
    private _previousPickResult;
    private _totalPointersPressed;
    private _doubleClickOccured;
    private _isSwiping;
    private _swipeButtonPressed;
    private _skipPointerTap;
    private _isMultiTouchGesture;
    private _pointerOverMesh;
    private _pickedDownMesh;
    private _pickedUpMesh;
    private _pointerX;
    private _pointerY;
    private _unTranslatedPointerX;
    private _unTranslatedPointerY;
    private _startingPointerPosition;
    private _previousStartingPointerPosition;
    private _startingPointerTime;
    private _previousStartingPointerTime;
    private _pointerCaptures;
    private _meshUnderPointerId;
    private _movePointerInfo;
    private _cameraObserverCount;
    private _delayedClicks;
    private _onKeyDown;
    private _onKeyUp;
    private _scene;
    private _deviceSourceManager;
    /**
     * Creates a new InputManager
     * @param scene - defines the hosting scene
     */
    constructor(scene?: Scene);
    /**
     * Gets the mesh that is currently under the pointer
     * @returns Mesh that the pointer is pointer is hovering over
     */
    get meshUnderPointer(): Nullable<AbstractMesh>;
    /**
     * When using more than one pointer (for example in XR) you can get the mesh under the specific pointer
     * @param pointerId - the pointer id to use
     * @returns The mesh under this pointer id or null if not found
     */
    getMeshUnderPointerByPointerId(pointerId: number): Nullable<AbstractMesh>;
    /**
     * Gets the pointer coordinates in 2D without any translation (ie. straight out of the pointer event)
     * @returns Vector with X/Y values directly from pointer event
     */
    get unTranslatedPointer(): Vector2;
    /**
     * Gets or sets the current on-screen X position of the pointer
     * @returns Translated X with respect to screen
     */
    get pointerX(): number;
    set pointerX(value: number);
    /**
     * Gets or sets the current on-screen Y position of the pointer
     * @returns Translated Y with respect to screen
     */
    get pointerY(): number;
    set pointerY(value: number);
    private _updatePointerPosition;
    private _processPointerMove;
    /** @internal */
    _setRayOnPointerInfo(pickInfo: Nullable<PickingInfo>, event: IMouseEvent): void;
    /** @internal */
    _addCameraPointerObserver(observer: (p: PointerInfo, s: EventState) => void, mask?: number): Nullable<Observer<PointerInfo>>;
    /** @internal */
    _removeCameraPointerObserver(observer: Observer<PointerInfo>): boolean;
    private _checkForPicking;
    private _checkPrePointerObservable;
    /** @internal */
    _pickMove(evt: IPointerEvent): PickingInfo;
    private _setCursorAndPointerOverMesh;
    /**
     * Use this method to simulate a pointer move on a mesh
     * The pickResult parameter can be obtained from a scene.pick or scene.pickWithRay
     * @param pickResult - pickingInfo of the object wished to simulate pointer event on
     * @param pointerEventInit - pointer event state to be used when simulating the pointer event (eg. pointer id for multitouch)
     */
    simulatePointerMove(pickResult: PickingInfo, pointerEventInit?: PointerEventInit): void;
    /**
     * Use this method to simulate a pointer down on a mesh
     * The pickResult parameter can be obtained from a scene.pick or scene.pickWithRay
     * @param pickResult - pickingInfo of the object wished to simulate pointer event on
     * @param pointerEventInit - pointer event state to be used when simulating the pointer event (eg. pointer id for multitouch)
     */
    simulatePointerDown(pickResult: PickingInfo, pointerEventInit?: PointerEventInit): void;
    private _processPointerDown;
    /**
     * @internal
     * @internals Boolean if delta for pointer exceeds drag movement threshold
     */
    _isPointerSwiping(): boolean;
    /**
     * Use this method to simulate a pointer up on a mesh
     * The pickResult parameter can be obtained from a scene.pick or scene.pickWithRay
     * @param pickResult - pickingInfo of the object wished to simulate pointer event on
     * @param pointerEventInit - pointer event state to be used when simulating the pointer event (eg. pointer id for multitouch)
     * @param doubleTap - indicates that the pointer up event should be considered as part of a double click (false by default)
     */
    simulatePointerUp(pickResult: PickingInfo, pointerEventInit?: PointerEventInit, doubleTap?: boolean): void;
    private _processPointerUp;
    /**
     * Gets a boolean indicating if the current pointer event is captured (meaning that the scene has already handled the pointer down)
     * @param pointerId - defines the pointer id to use in a multi-touch scenario (0 by default)
     * @returns true if the pointer was captured
     */
    isPointerCaptured(pointerId?: number): boolean;
    /**
     * Attach events to the canvas (To handle actionManagers triggers and raise onPointerMove, onPointerDown and onPointerUp
     * @param attachUp - defines if you want to attach events to pointerup
     * @param attachDown - defines if you want to attach events to pointerdown
     * @param attachMove - defines if you want to attach events to pointermove
     * @param elementToAttachTo - defines the target DOM element to attach to (will use the canvas by default)
     */
    attachControl(attachUp?: boolean, attachDown?: boolean, attachMove?: boolean, elementToAttachTo?: Nullable<HTMLElement>): void;
    /**
     * Detaches all event handlers
     */
    detachControl(): void;
    /**
     * Force the value of meshUnderPointer
     * @param mesh - defines the mesh to use
     * @param pointerId - optional pointer id when using more than one pointer. Defaults to 0
     * @param pickResult - optional pickingInfo data used to find mesh
     * @param evt - optional pointer event
     */
    setPointerOverMesh(mesh: Nullable<AbstractMesh>, pointerId?: number, pickResult?: Nullable<PickingInfo>, evt?: IPointerEvent): void;
    /**
     * Gets the mesh under the pointer
     * @returns a Mesh or null if no mesh is under the pointer
     */
    getPointerOverMesh(): Nullable<AbstractMesh>;
    /**
     * @param mesh - Mesh to invalidate
     * @internal
     */
    _invalidateMesh(mesh: AbstractMesh): void;
}
