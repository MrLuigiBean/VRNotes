import type { Nullable } from "@babylonjs/core/types.js";
import { Observable } from "@babylonjs/core/Misc/observable.js";
import { Vector3 } from "@babylonjs/core/Maths/math.vector.js";
import type { TransformNode } from "@babylonjs/core/Meshes/transformNode.js";
import { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh.js";
import type { IBehaviorAware, Behavior } from "@babylonjs/core/Behaviors/behavior.js";
import type { IDisposable, Scene } from "@babylonjs/core/scene.js";
import type { GUI3DManager } from "../gui3DManager";
import { Vector3WithInfo } from "../vector3WithInfo";
import type { Container3D } from "./container3D";
/**
 * Class used as base class for controls
 */
export declare class Control3D implements IDisposable, IBehaviorAware<Control3D> {
    /** Defines the control name */
    name?: string | undefined;
    private _node;
    private _downCount;
    private _enterCount;
    private _downPointerIds;
    protected _isVisible: boolean;
    /** @internal */
    _host: GUI3DManager;
    /** @internal */
    _isScaledByManager: boolean;
    /** Gets or sets the control position in world space */
    get position(): Vector3;
    set position(value: Vector3);
    /** Gets or sets the control scaling in world space */
    get scaling(): Vector3;
    set scaling(value: Vector3);
    /** Callback used to start pointer enter animation */
    pointerEnterAnimation: () => void;
    /** Callback used to start pointer out animation */
    pointerOutAnimation: () => void;
    /** Callback used to start pointer down animation */
    pointerDownAnimation: () => void;
    /** Callback used to start pointer up animation */
    pointerUpAnimation: () => void;
    /**
     * An event triggered when the pointer moves over the control
     */
    onPointerMoveObservable: Observable<Vector3>;
    /**
     * An event triggered when the pointer moves out of the control
     */
    onPointerOutObservable: Observable<Control3D>;
    /**
     * An event triggered when the pointer taps the control
     */
    onPointerDownObservable: Observable<Vector3WithInfo>;
    /**
     * An event triggered when pointer is up
     */
    onPointerUpObservable: Observable<Vector3WithInfo>;
    /**
     * An event triggered when a control is clicked on (with a mouse)
     */
    onPointerClickObservable: Observable<Vector3WithInfo>;
    /**
     * An event triggered when pointer enters the control
     */
    onPointerEnterObservable: Observable<Control3D>;
    /**
     * Gets or sets the parent container
     */
    parent: Nullable<Container3D>;
    private _behaviors;
    /**
     * Gets the list of attached behaviors
     * @see https://doc.babylonjs.com/features/featuresDeepDive/behaviors
     */
    get behaviors(): Behavior<Control3D>[];
    /**
     * Attach a behavior to the control
     * @see https://doc.babylonjs.com/features/featuresDeepDive/behaviors
     * @param behavior defines the behavior to attach
     * @returns the current control
     */
    addBehavior(behavior: Behavior<Control3D>): Control3D;
    /**
     * Remove an attached behavior
     * @see https://doc.babylonjs.com/features/featuresDeepDive/behaviors
     * @param behavior defines the behavior to attach
     * @returns the current control
     */
    removeBehavior(behavior: Behavior<Control3D>): Control3D;
    /**
     * Gets an attached behavior by name
     * @param name defines the name of the behavior to look for
     * @see https://doc.babylonjs.com/features/featuresDeepDive/behaviors
     * @returns null if behavior was not found else the requested behavior
     */
    getBehaviorByName(name: string): Nullable<Behavior<Control3D>>;
    /** Gets or sets a boolean indicating if the control is visible */
    get isVisible(): boolean;
    set isVisible(value: boolean);
    /**
     * Creates a new control
     * @param name defines the control name
     */
    constructor(
    /** Defines the control name */
    name?: string | undefined);
    /**
     * Gets a string representing the class name
     */
    get typeName(): string;
    /**
     * Get the current class name of the control.
     * @returns current class name
     */
    getClassName(): string;
    protected _getTypeName(): string;
    /**
     * Gets the transform node used by this control
     */
    get node(): Nullable<TransformNode>;
    /**
     * Gets the mesh used to render this control
     */
    get mesh(): Nullable<AbstractMesh>;
    /**
     * Link the control as child of the given node
     * @param node defines the node to link to. Use null to unlink the control
     * @returns the current control
     */
    linkToTransformNode(node: Nullable<TransformNode>): Control3D;
    /**
     * @internal*
     */
    _prepareNode(scene: Scene): void;
    protected _injectGUI3DReservedDataStore(node: TransformNode): any;
    /**
     * Node creation.
     * Can be overriden by children
     * @param scene defines the scene where the node must be attached
     * @returns the attached node or null if none. Must return a Mesh or AbstractMesh if there is an attached visible object
     */
    protected _createNode(scene: Scene): Nullable<TransformNode>;
    /**
     * Affect a material to the given mesh
     * @param mesh defines the mesh which will represent the control
     */
    protected _affectMaterial(mesh: AbstractMesh): void;
    private _isTouchButton3D;
    /**
     * @internal
     */
    _onPointerMove(target: Control3D, coordinates: Vector3): void;
    /**
     * @internal
     */
    _onPointerEnter(target: Control3D): boolean;
    /**
     * @internal
     */
    _onPointerOut(target: Control3D): void;
    /**
     * @internal
     */
    _onPointerDown(target: Control3D, coordinates: Vector3, pointerId: number, buttonIndex: number): boolean;
    /**
     * @internal
     */
    _onPointerUp(target: Control3D, coordinates: Vector3, pointerId: number, buttonIndex: number, notifyClick: boolean): void;
    /**
     * @internal
     */
    forcePointerUp(pointerId?: Nullable<number>): void;
    /**
     * @internal
     */
    _processObservables(type: number, pickedPoint: Vector3, originMeshPosition: Nullable<Vector3>, pointerId: number, buttonIndex: number): boolean;
    /** @internal */
    _disposeNode(): void;
    /**
     * Releases all associated resources
     */
    dispose(): void;
}
