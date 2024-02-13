import type { IVector3Like, IColor4Like } from "../Maths/math.like";
import type { Nullable } from "../types";
/**
 * ThinSprite Class used to represent a thin sprite
 * This is the base class for sprites but can also directly be used with ThinEngine
 * @see https://doc.babylonjs.com/features/featuresDeepDive/sprites
 */
export declare class ThinSprite {
    /** Gets or sets the cell index in the sprite sheet */
    cellIndex: number;
    /** Gets or sets the cell reference in the sprite sheet, uses sprite's filename when added to sprite sheet */
    cellRef: string;
    /** Gets or sets the current world position */
    position: IVector3Like;
    /** Gets or sets the main color */
    color: IColor4Like;
    /** Gets or sets the width */
    width: number;
    /** Gets or sets the height */
    height: number;
    /** Gets or sets rotation angle */
    angle: number;
    /** Gets or sets a boolean indicating if UV coordinates should be inverted in U axis */
    invertU: boolean;
    /** Gets or sets a boolean indicating if UV coordinates should be inverted in B axis */
    invertV: boolean;
    /** Gets or sets a boolean indicating if the sprite is visible (renderable). Default is true */
    isVisible: boolean;
    /**
     * Returns a boolean indicating if the animation is started
     */
    get animationStarted(): boolean;
    /** Gets the initial key for the animation (setting it will restart the animation)  */
    get fromIndex(): number;
    /** Gets or sets the end key for the animation (setting it will restart the animation)  */
    get toIndex(): number;
    /** Gets or sets a boolean indicating if the animation is looping (setting it will restart the animation)  */
    get loopAnimation(): boolean;
    /** Gets or sets the delay between cell changes (setting it will restart the animation)  */
    get delay(): number;
    /** @internal */
    _xOffset: number;
    /** @internal */
    _yOffset: number;
    /** @internal */
    _xSize: number;
    /** @internal */
    _ySize: number;
    private _animationStarted;
    protected _loopAnimation: boolean;
    protected _fromIndex: number;
    protected _toIndex: number;
    protected _delay: number;
    private _direction;
    private _time;
    private _onBaseAnimationEnd;
    /**
     * Creates a new Thin Sprite
     */
    constructor();
    /**
     * Starts an animation
     * @param from defines the initial key
     * @param to defines the end key
     * @param loop defines if the animation must loop
     * @param delay defines the start delay (in ms)
     * @param onAnimationEnd defines a callback for when the animation ends
     */
    playAnimation(from: number, to: number, loop: boolean, delay: number, onAnimationEnd: Nullable<() => void>): void;
    /** Stops current animation (if any) */
    stopAnimation(): void;
    /**
     * @internal
     */
    _animate(deltaTime: number): void;
}
