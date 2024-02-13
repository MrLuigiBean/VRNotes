import { Vector3 } from "../Maths/math.vector";
import type { Nullable } from "../types";
import type { ActionManager } from "../Actions/actionManager";
import type { ISpriteManager, SpriteManager } from "./spriteManager";
import { Color4 } from "../Maths/math.color";
import { Observable } from "../Misc/observable";
import type { IAnimatable } from "../Animations/animatable.interface";
import { ThinSprite } from "./thinSprite";
import type { Animation } from "../Animations/animation";
/**
 * Class used to represent a sprite
 * @see https://doc.babylonjs.com/features/featuresDeepDive/sprites
 */
export declare class Sprite extends ThinSprite implements IAnimatable {
    /** defines the name */
    name: string;
    /** Gets or sets the current world position */
    position: Vector3;
    /** Gets or sets the main color */
    color: Color4;
    /** Gets or sets a boolean indicating that this sprite should be disposed after animation ends */
    disposeWhenFinishedAnimating: boolean;
    /** Gets the list of attached animations */
    animations: Nullable<Array<Animation>>;
    /** Gets or sets a boolean indicating if the sprite can be picked */
    isPickable: boolean;
    /** Gets or sets a boolean indicating that sprite texture alpha will be used for precise picking (false by default) */
    useAlphaForPicking: boolean;
    /**
     * Gets or sets the associated action manager
     */
    actionManager: Nullable<ActionManager>;
    /**
     * An event triggered when the control has been disposed
     */
    onDisposeObservable: Observable<Sprite>;
    private _manager;
    private _onAnimationEnd;
    /**
     * Gets or sets the sprite size
     */
    get size(): number;
    set size(value: number);
    /**
     * Gets or sets the unique id of the sprite
     */
    uniqueId: number;
    /**
     * Gets the manager of this sprite
     */
    get manager(): ISpriteManager;
    /**
     * Creates a new Sprite
     * @param name defines the name
     * @param manager defines the manager
     */
    constructor(
    /** defines the name */
    name: string, manager: ISpriteManager);
    /**
     * Returns the string "Sprite"
     * @returns "Sprite"
     */
    getClassName(): string;
    /** Gets or sets the initial key for the animation (setting it will restart the animation)  */
    get fromIndex(): number;
    set fromIndex(value: number);
    /** Gets or sets the end key for the animation (setting it will restart the animation)  */
    get toIndex(): number;
    set toIndex(value: number);
    /** Gets or sets a boolean indicating if the animation is looping (setting it will restart the animation)  */
    get loopAnimation(): boolean;
    set loopAnimation(value: boolean);
    /** Gets or sets the delay between cell changes (setting it will restart the animation)  */
    get delay(): number;
    set delay(value: number);
    /**
     * Starts an animation
     * @param from defines the initial key
     * @param to defines the end key
     * @param loop defines if the animation must loop
     * @param delay defines the start delay (in ms)
     * @param onAnimationEnd defines a callback to call when animation ends
     */
    playAnimation(from: number, to: number, loop: boolean, delay: number, onAnimationEnd?: Nullable<() => void>): void;
    private _endAnimation;
    /** Release associated resources */
    dispose(): void;
    /**
     * Serializes the sprite to a JSON object
     * @returns the JSON object
     */
    serialize(): any;
    /**
     * Parses a JSON object to create a new sprite
     * @param parsedSprite The JSON object to parse
     * @param manager defines the hosting manager
     * @returns the new sprite
     */
    static Parse(parsedSprite: any, manager: SpriteManager): Sprite;
}
