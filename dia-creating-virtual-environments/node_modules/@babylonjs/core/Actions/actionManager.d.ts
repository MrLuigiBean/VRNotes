import type { Nullable } from "../types";
import type { AbstractMesh } from "../Meshes/abstractMesh";
import type { Scene } from "../scene";
import type { IAction } from "./action";
import type { IActionEvent } from "../Actions/actionEvent";
import { AbstractActionManager } from "./abstractActionManager";
/**
 * Action Manager manages all events to be triggered on a given mesh or the global scene.
 * A single scene can have many Action Managers to handle predefined actions on specific meshes.
 * @see https://doc.babylonjs.com/features/featuresDeepDive/events/actions
 */
export declare class ActionManager extends AbstractActionManager {
    /**
     * Nothing
     * @see https://doc.babylonjs.com/features/featuresDeepDive/events/actions#triggers
     */
    static readonly NothingTrigger = 0;
    /**
     * On pick
     * @see https://doc.babylonjs.com/features/featuresDeepDive/events/actions#triggers
     */
    static readonly OnPickTrigger = 1;
    /**
     * On left pick
     * @see https://doc.babylonjs.com/features/featuresDeepDive/events/actions#triggers
     */
    static readonly OnLeftPickTrigger = 2;
    /**
     * On right pick
     * @see https://doc.babylonjs.com/features/featuresDeepDive/events/actions#triggers
     */
    static readonly OnRightPickTrigger = 3;
    /**
     * On center pick
     * @see https://doc.babylonjs.com/features/featuresDeepDive/events/actions#triggers
     */
    static readonly OnCenterPickTrigger = 4;
    /**
     * On pick down
     * @see https://doc.babylonjs.com/features/featuresDeepDive/events/actions#triggers
     */
    static readonly OnPickDownTrigger = 5;
    /**
     * On double pick
     * @see https://doc.babylonjs.com/features/featuresDeepDive/events/actions#triggers
     */
    static readonly OnDoublePickTrigger = 6;
    /**
     * On pick up
     * @see https://doc.babylonjs.com/features/featuresDeepDive/events/actions#triggers
     */
    static readonly OnPickUpTrigger = 7;
    /**
     * On pick out.
     * This trigger will only be raised if you also declared a OnPickDown
     * @see https://doc.babylonjs.com/features/featuresDeepDive/events/actions#triggers
     */
    static readonly OnPickOutTrigger = 16;
    /**
     * On long press
     * @see https://doc.babylonjs.com/features/featuresDeepDive/events/actions#triggers
     */
    static readonly OnLongPressTrigger = 8;
    /**
     * On pointer over
     * @see https://doc.babylonjs.com/features/featuresDeepDive/events/actions#triggers
     */
    static readonly OnPointerOverTrigger = 9;
    /**
     * On pointer out
     * @see https://doc.babylonjs.com/features/featuresDeepDive/events/actions#triggers
     */
    static readonly OnPointerOutTrigger = 10;
    /**
     * On every frame
     * @see https://doc.babylonjs.com/features/featuresDeepDive/events/actions#triggers
     */
    static readonly OnEveryFrameTrigger = 11;
    /**
     * On intersection enter
     * @see https://doc.babylonjs.com/features/featuresDeepDive/events/actions#triggers
     */
    static readonly OnIntersectionEnterTrigger = 12;
    /**
     * On intersection exit
     * @see https://doc.babylonjs.com/features/featuresDeepDive/events/actions#triggers
     */
    static readonly OnIntersectionExitTrigger = 13;
    /**
     * On key down
     * @see https://doc.babylonjs.com/features/featuresDeepDive/events/actions#triggers
     */
    static readonly OnKeyDownTrigger = 14;
    /**
     * On key up
     * @see https://doc.babylonjs.com/features/featuresDeepDive/events/actions#triggers
     */
    static readonly OnKeyUpTrigger = 15;
    private _scene;
    /**
     * Creates a new action manager
     * @param scene defines the hosting scene
     */
    constructor(scene?: Nullable<Scene>);
    /**
     * Releases all associated resources
     */
    dispose(): void;
    /**
     * Gets hosting scene
     * @returns the hosting scene
     */
    getScene(): Scene;
    /**
     * Does this action manager handles actions of any of the given triggers
     * @param triggers defines the triggers to be tested
     * @returns a boolean indicating whether one (or more) of the triggers is handled
     */
    hasSpecificTriggers(triggers: number[]): boolean;
    /**
     * Does this action manager handles actions of any of the given triggers. This function takes two arguments for
     * speed.
     * @param triggerA defines the trigger to be tested
     * @param triggerB defines the trigger to be tested
     * @returns a boolean indicating whether one (or more) of the triggers is handled
     */
    hasSpecificTriggers2(triggerA: number, triggerB: number): boolean;
    /**
     * Does this action manager handles actions of a given trigger
     * @param trigger defines the trigger to be tested
     * @param parameterPredicate defines an optional predicate to filter triggers by parameter
     * @returns whether the trigger is handled
     */
    hasSpecificTrigger(trigger: number, parameterPredicate?: (parameter: any) => boolean): boolean;
    /**
     * Does this action manager has pointer triggers
     */
    get hasPointerTriggers(): boolean;
    /**
     * Does this action manager has pick triggers
     */
    get hasPickTriggers(): boolean;
    /**
     * Registers an action to this action manager
     * @param action defines the action to be registered
     * @returns the action amended (prepared) after registration
     */
    registerAction(action: IAction): Nullable<IAction>;
    /**
     * Unregisters an action to this action manager
     * @param action defines the action to be unregistered
     * @returns a boolean indicating whether the action has been unregistered
     */
    unregisterAction(action: IAction): Boolean;
    /**
     * Process a specific trigger
     * @param trigger defines the trigger to process
     * @param evt defines the event details to be processed
     */
    processTrigger(trigger: number, evt?: IActionEvent): void;
    /**
     * @internal
     */
    _getEffectiveTarget(target: any, propertyPath: string): any;
    /**
     * @internal
     */
    _getProperty(propertyPath: string): string;
    /**
     * Serialize this manager to a JSON object
     * @param name defines the property name to store this manager
     * @returns a JSON representation of this manager
     */
    serialize(name: string): any;
    /**
     * Creates a new ActionManager from a JSON data
     * @param parsedActions defines the JSON data to read from
     * @param object defines the hosting mesh
     * @param scene defines the hosting scene
     */
    static Parse(parsedActions: any, object: Nullable<AbstractMesh>, scene: Scene): void;
    /**
     * Get a trigger name by index
     * @param trigger defines the trigger index
     * @returns a trigger name
     */
    static GetTriggerName(trigger: number): string;
}
