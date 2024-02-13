import type { Behavior } from "../behavior";
import type { Mesh } from "../../Meshes/mesh";
/**
 * A behavior that when attached to a mesh will allow the mesh to fade in and out
 */
export declare class FadeInOutBehavior implements Behavior<Mesh> {
    /**
     * Time in milliseconds to delay before fading in (Default: 0)
     */
    fadeInDelay: number;
    /**
     * Time in milliseconds to delay before fading out (Default: 0)
     */
    fadeOutDelay: number;
    /**
     * Time in milliseconds for the mesh to fade in (Default: 300)
     */
    fadeInTime: number;
    /**
     * Time in milliseconds for the mesh to fade out (Default: 300)
     */
    fadeOutTime: number;
    /**
     * Time in milliseconds to delay before fading in (Default: 0)
     * Will set both fade in and out delay to the same value
     */
    get delay(): number;
    set delay(value: number);
    private _millisecondsPerFrame;
    private _hovered;
    private _hoverValue;
    private _ownerNode;
    private _onBeforeRenderObserver;
    private _delay;
    private _time;
    /**
     * Instantiates the FadeInOutBehavior
     */
    constructor();
    /**
     *  The name of the behavior
     */
    get name(): string;
    /**
     *  Initializes the behavior
     */
    init(): void;
    /**
     * Attaches the fade behavior on the passed in mesh
     * @param ownerNode The mesh that will be faded in/out once attached
     */
    attach(ownerNode: Mesh): void;
    /**
     *  Detaches the behavior from the mesh
     */
    detach(): void;
    /**
     * Triggers the mesh to begin fading in (or out)
     * @param fadeIn if the object should fade in or out (true to fade in)
     */
    fadeIn(fadeIn?: boolean): void;
    /**
     * Triggers the mesh to begin fading out
     */
    fadeOut(): void;
    private _update;
    private _setAllVisibility;
    private _attachObserver;
    private _detachObserver;
}
