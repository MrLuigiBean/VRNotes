import type { IKeyboardEvent } from "./deviceInputEvents";
/**
 * Gather the list of keyboard event types as constants.
 */
export declare class KeyboardEventTypes {
    /**
     * The keydown event is fired when a key becomes active (pressed).
     */
    static readonly KEYDOWN = 1;
    /**
     * The keyup event is fired when a key has been released.
     */
    static readonly KEYUP = 2;
}
/**
 * This class is used to store keyboard related info for the onKeyboardObservable event.
 */
export declare class KeyboardInfo {
    /**
     * Defines the type of event (KeyboardEventTypes)
     */
    type: number;
    /**
     * Defines the related dom event
     */
    event: IKeyboardEvent;
    /**
     * Instantiates a new keyboard info.
     * This class is used to store keyboard related info for the onKeyboardObservable event.
     * @param type Defines the type of event (KeyboardEventTypes)
     * @param event Defines the related dom event
     */
    constructor(
    /**
     * Defines the type of event (KeyboardEventTypes)
     */
    type: number, 
    /**
     * Defines the related dom event
     */
    event: IKeyboardEvent);
}
/**
 * This class is used to store keyboard related info for the onPreKeyboardObservable event.
 * Set the skipOnKeyboardObservable property to true if you want the engine to stop any process after this event is triggered, even not calling onKeyboardObservable
 */
export declare class KeyboardInfoPre extends KeyboardInfo {
    /**
     * Defines the type of event (KeyboardEventTypes)
     */
    type: number;
    /**
     * Defines the related dom event
     */
    event: IKeyboardEvent;
    /**
     * Defines whether the engine should skip the next onKeyboardObservable associated to this pre.
     */
    skipOnKeyboardObservable: boolean;
    /**
     * Defines whether the engine should skip the next onKeyboardObservable associated to this pre.
     * @deprecated use skipOnKeyboardObservable property instead
     */
    get skipOnPointerObservable(): boolean;
    set skipOnPointerObservable(value: boolean);
    /**
     * Instantiates a new keyboard pre info.
     * This class is used to store keyboard related info for the onPreKeyboardObservable event.
     * @param type Defines the type of event (KeyboardEventTypes)
     * @param event Defines the related dom event
     */
    constructor(
    /**
     * Defines the type of event (KeyboardEventTypes)
     */
    type: number, 
    /**
     * Defines the related dom event
     */
    event: IKeyboardEvent);
}
