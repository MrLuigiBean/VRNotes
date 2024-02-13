import { Observable } from "../Misc/observable";
import type { Condition } from "./condition";
import type { AbstractActionManager } from "./abstractActionManager";
import type { Nullable } from "../types";
import type { Material } from "../Materials/material";
import type { Scene } from "../scene";
import type { ActionManager } from "./actionManager";
import type { ActionEvent } from "./actionEvent";
import type { Node } from "../node";
/**
 * Interface used to define Action
 */
export interface IAction {
    /**
     * Trigger for the action
     */
    trigger: number;
    /** Options of the trigger */
    triggerOptions: any;
    /**
     * Gets the trigger parameters
     * @returns the trigger parameters
     */
    getTriggerParameter(): any;
    /**
     * Internal only - executes current action event
     * @internal
     */
    _executeCurrent(evt?: ActionEvent): void;
    /**
     * Serialize placeholder for child classes
     * @param parent of child
     * @returns the serialized object
     */
    serialize(parent: any): any;
    /**
     * Internal only
     * @internal
     */
    _prepare(): void;
    /**
     * Internal only - manager for action
     * @internal
     */
    _actionManager: Nullable<AbstractActionManager>;
    /**
     * Adds action to chain of actions, may be a DoNothingAction
     * @param action defines the next action to execute
     * @returns The action passed in
     * @see https://www.babylonjs-playground.com/#1T30HR#0
     */
    then(action: IAction): IAction;
}
/**
 * The action to be carried out following a trigger
 * @see https://doc.babylonjs.com/features/featuresDeepDive/events/actions#available-actions
 */
export declare class Action implements IAction {
    /** the trigger, with or without parameters, for the action */
    triggerOptions: any;
    /**
     * Trigger for the action
     */
    trigger: number;
    /**
     * Internal only - manager for action
     * @internal
     */
    _actionManager: ActionManager;
    private _nextActiveAction;
    private _child;
    private _condition?;
    private _triggerParameter;
    /**
     * An event triggered prior to action being executed.
     */
    onBeforeExecuteObservable: Observable<Action>;
    /**
     * Creates a new Action
     * @param triggerOptions the trigger, with or without parameters, for the action
     * @param condition an optional determinant of action
     */
    constructor(
    /** the trigger, with or without parameters, for the action */
    triggerOptions: any, condition?: Condition);
    /**
     * Internal only
     * @internal
     */
    _prepare(): void;
    /**
     * Gets the trigger parameter
     * @returns the trigger parameter
     */
    getTriggerParameter(): any;
    /**
     * Sets the trigger parameter
     * @param value defines the new trigger parameter
     */
    setTriggerParameter(value: any): void;
    /**
     * Internal only - Returns if the current condition allows to run the action
     * @internal
     */
    _evaluateConditionForCurrentFrame(): boolean;
    /**
     * Internal only - executes current action event
     * @internal
     */
    _executeCurrent(evt?: ActionEvent): void;
    /**
     * Execute placeholder for child classes
     * @param evt optional action event
     */
    execute(evt?: ActionEvent): void;
    /**
     * Skips to next active action
     */
    skipToNextActiveAction(): void;
    /**
     * Adds action to chain of actions, may be a DoNothingAction
     * @param action defines the next action to execute
     * @returns The action passed in
     * @see https://www.babylonjs-playground.com/#1T30HR#0
     */
    then(action: Action): Action;
    /**
     * Internal only
     * @internal
     */
    _getProperty(propertyPath: string): string;
    /**
     * @internal
     */
    _getEffectiveTarget(target: any, propertyPath: string): any;
    /**
     * Serialize placeholder for child classes
     * @param parent of child
     * @returns the serialized object
     */
    serialize(parent: any): any;
    /**
     * Internal only called by serialize
     * @internal
     */
    protected _serialize(serializedAction: any, parent?: any): any;
    /**
     * Internal only
     * @internal
     */
    static _SerializeValueAsString: (value: any) => string;
    /**
     * Internal only
     * @internal
     */
    static _GetTargetProperty: (target: Scene | Node | Material) => {
        name: string;
        targetType: string;
        value: string;
    };
}
