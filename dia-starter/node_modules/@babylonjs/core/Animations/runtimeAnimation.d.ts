import type { _IAnimationState } from "./animation";
import { Animation } from "./animation";
import type { Animatable } from "./animatable";
import type { Scene } from "../scene";
/**
 * Defines a runtime animation
 */
export declare class RuntimeAnimation {
    private _events;
    /**
     * The current frame of the runtime animation
     */
    private _currentFrame;
    /**
     * The animation used by the runtime animation
     */
    private _animation;
    /**
     * The target of the runtime animation
     */
    private _target;
    /**
     * The initiating animatable
     */
    private _host;
    /**
     * The original value of the runtime animation
     */
    private _originalValue;
    /**
     * The original blend value of the runtime animation
     */
    private _originalBlendValue;
    /**
     * The offsets cache of the runtime animation
     */
    private _offsetsCache;
    /**
     * The high limits cache of the runtime animation
     */
    private _highLimitsCache;
    /**
     * Specifies if the runtime animation has been stopped
     */
    private _stopped;
    /**
     * The blending factor of the runtime animation
     */
    private _blendingFactor;
    /**
     * The BabylonJS scene
     */
    private _scene;
    /**
     * The current value of the runtime animation
     */
    private _currentValue;
    /** @internal */
    _animationState: _IAnimationState;
    /**
     * The active target of the runtime animation
     */
    private _activeTargets;
    private _currentActiveTarget;
    private _directTarget;
    /**
     * The target path of the runtime animation
     */
    private _targetPath;
    /**
     * The weight of the runtime animation
     */
    private _weight;
    /**
     * The absolute frame offset of the runtime animation
     */
    private _absoluteFrameOffset;
    /**
     * The previous elapsed time (since start of animation) of the runtime animation
     */
    private _previousElapsedTime;
    /**
     * The previous absolute frame of the runtime animation (meaning, without taking into account the from/to values, only the elapsed time and the fps)
     */
    private _previousAbsoluteFrame;
    private _enableBlending;
    private _keys;
    private _minFrame;
    private _maxFrame;
    private _minValue;
    private _maxValue;
    private _targetIsArray;
    /**
     * Gets the current frame of the runtime animation
     */
    get currentFrame(): number;
    /**
     * Gets the weight of the runtime animation
     */
    get weight(): number;
    /**
     * Gets the current value of the runtime animation
     */
    get currentValue(): any;
    /**
     * Gets or sets the target path of the runtime animation
     */
    get targetPath(): string;
    /**
     * Gets the actual target of the runtime animation
     */
    get target(): any;
    /**
     * Gets the additive state of the runtime animation
     */
    get isAdditive(): boolean;
    /** @internal */
    _onLoop: () => void;
    /**
     * Create a new RuntimeAnimation object
     * @param target defines the target of the animation
     * @param animation defines the source animation object
     * @param scene defines the hosting scene
     * @param host defines the initiating Animatable
     */
    constructor(target: any, animation: Animation, scene: Scene, host: Animatable);
    private _preparePath;
    /**
     * Gets the animation from the runtime animation
     */
    get animation(): Animation;
    /**
     * Resets the runtime animation to the beginning
     * @param restoreOriginal defines whether to restore the target property to the original value
     */
    reset(restoreOriginal?: boolean): void;
    /**
     * Specifies if the runtime animation is stopped
     * @returns Boolean specifying if the runtime animation is stopped
     */
    isStopped(): boolean;
    /**
     * Disposes of the runtime animation
     */
    dispose(): void;
    /**
     * Apply the interpolated value to the target
     * @param currentValue defines the value computed by the animation
     * @param weight defines the weight to apply to this value (Defaults to 1.0)
     */
    setValue(currentValue: any, weight: number): void;
    private _getOriginalValues;
    private _setValue;
    /**
     * Gets the loop pmode of the runtime animation
     * @returns Loop Mode
     */
    private _getCorrectLoopMode;
    /**
     * Move the current animation to a given frame
     * @param frame defines the frame to move to
     */
    goToFrame(frame: number): void;
    /**
     * @internal Internal use only
     */
    _prepareForSpeedRatioChange(newSpeedRatio: number): void;
    /**
     * Execute the current animation
     * @param elapsedTimeSinceAnimationStart defines the elapsed time (in milliseconds) since the animation was started
     * @param from defines the lower frame of the animation range
     * @param to defines the upper frame of the animation range
     * @param loop defines if the current animation must loop
     * @param speedRatio defines the current speed ratio
     * @param weight defines the weight of the animation (default is -1 so no weight)
     * @returns a boolean indicating if the animation is running
     */
    animate(elapsedTimeSinceAnimationStart: number, from: number, to: number, loop: boolean, speedRatio: number, weight?: number): boolean;
}
