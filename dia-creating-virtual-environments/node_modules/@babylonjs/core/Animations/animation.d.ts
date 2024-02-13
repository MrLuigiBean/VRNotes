import type { IEasingFunction, EasingFunction } from "./easing";
import { Vector3, Quaternion, Vector2, Matrix } from "../Maths/math.vector";
import { Color3, Color4 } from "../Maths/math.color";
import type { DeepImmutable, Nullable } from "../types";
import type { Scene } from "../scene";
import type { IAnimationKey } from "./animationKey";
import { AnimationRange } from "./animationRange";
import type { AnimationEvent } from "./animationEvent";
import { Node } from "../node";
import type { IAnimatable } from "./animatable.interface";
import { Size } from "../Maths/math.size";
import type { Animatable } from "./animatable";
import type { RuntimeAnimation } from "./runtimeAnimation";
export declare const _staticOffsetValueQuaternion: DeepImmutable<Quaternion>;
export declare const _staticOffsetValueVector3: DeepImmutable<Vector3>;
export declare const _staticOffsetValueVector2: DeepImmutable<Vector2>;
export declare const _staticOffsetValueSize: DeepImmutable<Size>;
export declare const _staticOffsetValueColor3: DeepImmutable<Color3>;
export declare const _staticOffsetValueColor4: DeepImmutable<Color4>;
/**
 * Options to be used when creating an additive animation
 */
export interface IMakeAnimationAdditiveOptions {
    /**
     * The frame that the animation should be relative to (if not provided, 0 will be used)
     */
    referenceFrame?: number;
    /**
     * The name of the animation range to convert to additive. If not provided, fromFrame / toFrame will be used
     * If fromFrame / toFrame are not provided either, the whole animation will be converted to additive
     */
    range?: string;
    /**
     * If true, the original animation will be cloned and converted to additive. If false, the original animation will be converted to additive (default is false)
     */
    cloneOriginalAnimation?: boolean;
    /**
     * The name of the cloned animation if cloneOriginalAnimation is true. If not provided, use the original animation name
     */
    clonedAnimationName?: string;
    /**
     * Together with toFrame, defines the range of the animation to convert to additive. Will only be used if range is not provided
     * If range and fromFrame / toFrame are not provided, the whole animation will be converted to additive
     */
    fromFrame?: number;
    /**
     * Together with fromFrame, defines the range of the animation to convert to additive.
     */
    toFrame?: number;
    /**
     * If true, the key frames will be clipped to the range specified by range or fromFrame / toFrame (default is false)
     */
    clipKeys?: boolean;
}
/**
 * @internal
 */
export interface _IAnimationState {
    key: number;
    repeatCount: number;
    workValue?: any;
    loopMode?: number;
    offsetValue?: any;
    highLimitValue?: any;
}
/**
 * Class used to store any kind of animation
 */
export declare class Animation {
    /**Name of the animation */
    name: string;
    /**Property to animate */
    targetProperty: string;
    /**The frames per second of the animation */
    framePerSecond: number;
    /**The data type of the animation */
    dataType: number;
    /**The loop mode of the animation */
    loopMode?: number | undefined;
    /**Specifies if blending should be enabled */
    enableBlending?: boolean | undefined;
    private static _UniqueIdGenerator;
    /**
     * Use matrix interpolation instead of using direct key value when animating matrices
     */
    static AllowMatricesInterpolation: boolean;
    /**
     * When matrix interpolation is enabled, this boolean forces the system to use Matrix.DecomposeLerp instead of Matrix.Lerp. Interpolation is more precise but slower
     */
    static AllowMatrixDecomposeForInterpolation: boolean;
    /**
     * Gets or sets the unique id of the animation (the uniqueness is solely among other animations)
     */
    uniqueId: number;
    /** Define the Url to load snippets */
    static SnippetUrl: string;
    /** Snippet ID if the animation was created from the snippet server */
    snippetId: string;
    /**
     * Stores the key frames of the animation
     */
    private _keys;
    /**
     * Stores the easing function of the animation
     */
    private _easingFunction;
    /**
     * @internal Internal use only
     */
    _runtimeAnimations: RuntimeAnimation[];
    /**
     * The set of event that will be linked to this animation
     */
    private _events;
    /**
     * Stores an array of target property paths
     */
    targetPropertyPath: string[];
    /**
     * Stores the blending speed of the animation
     */
    blendingSpeed: number;
    /**
     * Stores the animation ranges for the animation
     */
    private _ranges;
    /**
     * @internal Internal use
     */
    static _PrepareAnimation(name: string, targetProperty: string, framePerSecond: number, totalFrame: number, from: any, to: any, loopMode?: number, easingFunction?: EasingFunction): Nullable<Animation>;
    /**
     * Sets up an animation
     * @param property The property to animate
     * @param animationType The animation type to apply
     * @param framePerSecond The frames per second of the animation
     * @param easingFunction The easing function used in the animation
     * @returns The created animation
     */
    static CreateAnimation(property: string, animationType: number, framePerSecond: number, easingFunction: EasingFunction): Animation;
    /**
     * Create and start an animation on a node
     * @param name defines the name of the global animation that will be run on all nodes
     * @param target defines the target where the animation will take place
     * @param targetProperty defines property to animate
     * @param framePerSecond defines the number of frame per second yo use
     * @param totalFrame defines the number of frames in total
     * @param from defines the initial value
     * @param to defines the final value
     * @param loopMode defines which loop mode you want to use (off by default)
     * @param easingFunction defines the easing function to use (linear by default)
     * @param onAnimationEnd defines the callback to call when animation end
     * @param scene defines the hosting scene
     * @returns the animatable created for this animation
     */
    static CreateAndStartAnimation(name: string, target: any, targetProperty: string, framePerSecond: number, totalFrame: number, from: any, to: any, loopMode?: number, easingFunction?: EasingFunction, onAnimationEnd?: () => void, scene?: Scene): Nullable<Animatable>;
    /**
     * Create and start an animation on a node and its descendants
     * @param name defines the name of the global animation that will be run on all nodes
     * @param node defines the root node where the animation will take place
     * @param directDescendantsOnly if true only direct descendants will be used, if false direct and also indirect (children of children, an so on in a recursive manner) descendants will be used
     * @param targetProperty defines property to animate
     * @param framePerSecond defines the number of frame per second to use
     * @param totalFrame defines the number of frames in total
     * @param from defines the initial value
     * @param to defines the final value
     * @param loopMode defines which loop mode you want to use (off by default)
     * @param easingFunction defines the easing function to use (linear by default)
     * @param onAnimationEnd defines the callback to call when an animation ends (will be called once per node)
     * @returns the list of animatables created for all nodes
     * @example https://www.babylonjs-playground.com/#MH0VLI
     */
    static CreateAndStartHierarchyAnimation(name: string, node: Node, directDescendantsOnly: boolean, targetProperty: string, framePerSecond: number, totalFrame: number, from: any, to: any, loopMode?: number, easingFunction?: EasingFunction, onAnimationEnd?: () => void): Nullable<Animatable[]>;
    /**
     * Creates a new animation, merges it with the existing animations and starts it
     * @param name Name of the animation
     * @param node Node which contains the scene that begins the animations
     * @param targetProperty Specifies which property to animate
     * @param framePerSecond The frames per second of the animation
     * @param totalFrame The total number of frames
     * @param from The frame at the beginning of the animation
     * @param to The frame at the end of the animation
     * @param loopMode Specifies the loop mode of the animation
     * @param easingFunction (Optional) The easing function of the animation, which allow custom mathematical formulas for animations
     * @param onAnimationEnd Callback to run once the animation is complete
     * @returns Nullable animation
     */
    static CreateMergeAndStartAnimation(name: string, node: Node, targetProperty: string, framePerSecond: number, totalFrame: number, from: any, to: any, loopMode?: number, easingFunction?: EasingFunction, onAnimationEnd?: () => void): Nullable<Animatable>;
    /**
     * Convert the keyframes of an animation to be relative to a given reference frame.
     * @param sourceAnimation defines the Animation containing keyframes to convert
     * @param referenceFrame defines the frame that keyframes in the range will be relative to (default: 0)
     * @param range defines the name of the AnimationRange belonging to the Animation to convert
     * @param cloneOriginal defines whether or not to clone the animation and convert the clone or convert the original animation (default is false)
     * @param clonedName defines the name of the resulting cloned Animation if cloneOriginal is true
     * @returns a new Animation if cloneOriginal is true or the original Animation if cloneOriginal is false
     */
    static MakeAnimationAdditive(sourceAnimation: Animation, referenceFrame?: number, range?: string, cloneOriginal?: boolean, clonedName?: string): Animation;
    /**
     * Convert the keyframes of an animation to be relative to a given reference frame.
     * @param sourceAnimation defines the Animation containing keyframes to convert
     * @param options defines the options to use when converting ey keyframes
     * @returns a new Animation if options.cloneOriginalAnimation is true or the original Animation if options.cloneOriginalAnimation is false
     */
    static MakeAnimationAdditive(sourceAnimation: Animation, options?: IMakeAnimationAdditiveOptions): Animation;
    /**
     * Transition property of an host to the target Value
     * @param property The property to transition
     * @param targetValue The target Value of the property
     * @param host The object where the property to animate belongs
     * @param scene Scene used to run the animation
     * @param frameRate Framerate (in frame/s) to use
     * @param transition The transition type we want to use
     * @param duration The duration of the animation, in milliseconds
     * @param onAnimationEnd Callback trigger at the end of the animation
     * @returns Nullable animation
     */
    static TransitionTo(property: string, targetValue: any, host: any, scene: Scene, frameRate: number, transition: Animation, duration: number, onAnimationEnd?: Nullable<() => void>): Nullable<Animatable>;
    /**
     * Return the array of runtime animations currently using this animation
     */
    get runtimeAnimations(): RuntimeAnimation[];
    /**
     * Specifies if any of the runtime animations are currently running
     */
    get hasRunningRuntimeAnimations(): boolean;
    /**
     * Initializes the animation
     * @param name Name of the animation
     * @param targetProperty Property to animate
     * @param framePerSecond The frames per second of the animation
     * @param dataType The data type of the animation
     * @param loopMode The loop mode of the animation
     * @param enableBlending Specifies if blending should be enabled
     */
    constructor(
    /**Name of the animation */
    name: string, 
    /**Property to animate */
    targetProperty: string, 
    /**The frames per second of the animation */
    framePerSecond: number, 
    /**The data type of the animation */
    dataType: number, 
    /**The loop mode of the animation */
    loopMode?: number | undefined, 
    /**Specifies if blending should be enabled */
    enableBlending?: boolean | undefined);
    /**
     * Converts the animation to a string
     * @param fullDetails support for multiple levels of logging within scene loading
     * @returns String form of the animation
     */
    toString(fullDetails?: boolean): string;
    /**
     * Add an event to this animation
     * @param event Event to add
     */
    addEvent(event: AnimationEvent): void;
    /**
     * Remove all events found at the given frame
     * @param frame The frame to remove events from
     */
    removeEvents(frame: number): void;
    /**
     * Retrieves all the events from the animation
     * @returns Events from the animation
     */
    getEvents(): AnimationEvent[];
    /**
     * Creates an animation range
     * @param name Name of the animation range
     * @param from Starting frame of the animation range
     * @param to Ending frame of the animation
     */
    createRange(name: string, from: number, to: number): void;
    /**
     * Deletes an animation range by name
     * @param name Name of the animation range to delete
     * @param deleteFrames Specifies if the key frames for the range should also be deleted (true) or not (false)
     */
    deleteRange(name: string, deleteFrames?: boolean): void;
    /**
     * Gets the animation range by name, or null if not defined
     * @param name Name of the animation range
     * @returns Nullable animation range
     */
    getRange(name: string): Nullable<AnimationRange>;
    /**
     * Gets the key frames from the animation
     * @returns The key frames of the animation
     */
    getKeys(): Array<IAnimationKey>;
    /**
     * Gets the highest frame rate of the animation
     * @returns Highest frame rate of the animation
     */
    getHighestFrame(): number;
    /**
     * Gets the easing function of the animation
     * @returns Easing function of the animation
     */
    getEasingFunction(): Nullable<IEasingFunction>;
    /**
     * Sets the easing function of the animation
     * @param easingFunction A custom mathematical formula for animation
     */
    setEasingFunction(easingFunction: Nullable<IEasingFunction>): void;
    /**
     * Interpolates a scalar linearly
     * @param startValue Start value of the animation curve
     * @param endValue End value of the animation curve
     * @param gradient Scalar amount to interpolate
     * @returns Interpolated scalar value
     */
    floatInterpolateFunction(startValue: number, endValue: number, gradient: number): number;
    /**
     * Interpolates a scalar cubically
     * @param startValue Start value of the animation curve
     * @param outTangent End tangent of the animation
     * @param endValue End value of the animation curve
     * @param inTangent Start tangent of the animation curve
     * @param gradient Scalar amount to interpolate
     * @returns Interpolated scalar value
     */
    floatInterpolateFunctionWithTangents(startValue: number, outTangent: number, endValue: number, inTangent: number, gradient: number): number;
    /**
     * Interpolates a quaternion using a spherical linear interpolation
     * @param startValue Start value of the animation curve
     * @param endValue End value of the animation curve
     * @param gradient Scalar amount to interpolate
     * @returns Interpolated quaternion value
     */
    quaternionInterpolateFunction(startValue: Quaternion, endValue: Quaternion, gradient: number): Quaternion;
    /**
     * Interpolates a quaternion cubically
     * @param startValue Start value of the animation curve
     * @param outTangent End tangent of the animation curve
     * @param endValue End value of the animation curve
     * @param inTangent Start tangent of the animation curve
     * @param gradient Scalar amount to interpolate
     * @returns Interpolated quaternion value
     */
    quaternionInterpolateFunctionWithTangents(startValue: Quaternion, outTangent: Quaternion, endValue: Quaternion, inTangent: Quaternion, gradient: number): Quaternion;
    /**
     * Interpolates a Vector3 linearly
     * @param startValue Start value of the animation curve
     * @param endValue End value of the animation curve
     * @param gradient Scalar amount to interpolate (value between 0 and 1)
     * @returns Interpolated scalar value
     */
    vector3InterpolateFunction(startValue: Vector3, endValue: Vector3, gradient: number): Vector3;
    /**
     * Interpolates a Vector3 cubically
     * @param startValue Start value of the animation curve
     * @param outTangent End tangent of the animation
     * @param endValue End value of the animation curve
     * @param inTangent Start tangent of the animation curve
     * @param gradient Scalar amount to interpolate (value between 0 and 1)
     * @returns InterpolatedVector3 value
     */
    vector3InterpolateFunctionWithTangents(startValue: Vector3, outTangent: Vector3, endValue: Vector3, inTangent: Vector3, gradient: number): Vector3;
    /**
     * Interpolates a Vector2 linearly
     * @param startValue Start value of the animation curve
     * @param endValue End value of the animation curve
     * @param gradient Scalar amount to interpolate (value between 0 and 1)
     * @returns Interpolated Vector2 value
     */
    vector2InterpolateFunction(startValue: Vector2, endValue: Vector2, gradient: number): Vector2;
    /**
     * Interpolates a Vector2 cubically
     * @param startValue Start value of the animation curve
     * @param outTangent End tangent of the animation
     * @param endValue End value of the animation curve
     * @param inTangent Start tangent of the animation curve
     * @param gradient Scalar amount to interpolate (value between 0 and 1)
     * @returns Interpolated Vector2 value
     */
    vector2InterpolateFunctionWithTangents(startValue: Vector2, outTangent: Vector2, endValue: Vector2, inTangent: Vector2, gradient: number): Vector2;
    /**
     * Interpolates a size linearly
     * @param startValue Start value of the animation curve
     * @param endValue End value of the animation curve
     * @param gradient Scalar amount to interpolate
     * @returns Interpolated Size value
     */
    sizeInterpolateFunction(startValue: Size, endValue: Size, gradient: number): Size;
    /**
     * Interpolates a Color3 linearly
     * @param startValue Start value of the animation curve
     * @param endValue End value of the animation curve
     * @param gradient Scalar amount to interpolate
     * @returns Interpolated Color3 value
     */
    color3InterpolateFunction(startValue: Color3, endValue: Color3, gradient: number): Color3;
    /**
     * Interpolates a Color3 cubically
     * @param startValue Start value of the animation curve
     * @param outTangent End tangent of the animation
     * @param endValue End value of the animation curve
     * @param inTangent Start tangent of the animation curve
     * @param gradient Scalar amount to interpolate
     * @returns interpolated value
     */
    color3InterpolateFunctionWithTangents(startValue: Color3, outTangent: Color3, endValue: Color3, inTangent: Color3, gradient: number): Color3;
    /**
     * Interpolates a Color4 linearly
     * @param startValue Start value of the animation curve
     * @param endValue End value of the animation curve
     * @param gradient Scalar amount to interpolate
     * @returns Interpolated Color3 value
     */
    color4InterpolateFunction(startValue: Color4, endValue: Color4, gradient: number): Color4;
    /**
     * Interpolates a Color4 cubically
     * @param startValue Start value of the animation curve
     * @param outTangent End tangent of the animation
     * @param endValue End value of the animation curve
     * @param inTangent Start tangent of the animation curve
     * @param gradient Scalar amount to interpolate
     * @returns interpolated value
     */
    color4InterpolateFunctionWithTangents(startValue: Color4, outTangent: Color4, endValue: Color4, inTangent: Color4, gradient: number): Color4;
    /**
     * @internal Internal use only
     */
    _getKeyValue(value: any): any;
    /**
     * Evaluate the animation value at a given frame
     * @param currentFrame defines the frame where we want to evaluate the animation
     * @returns the animation value
     */
    evaluate(currentFrame: number): any;
    /**
     * @internal Internal use only
     */
    _interpolate(currentFrame: number, state: _IAnimationState, searchClosestKeyOnly?: boolean): any;
    /**
     * Defines the function to use to interpolate matrices
     * @param startValue defines the start matrix
     * @param endValue defines the end matrix
     * @param gradient defines the gradient between both matrices
     * @param result defines an optional target matrix where to store the interpolation
     * @returns the interpolated matrix
     */
    matrixInterpolateFunction(startValue: Matrix, endValue: Matrix, gradient: number, result?: Matrix): Matrix;
    /**
     * Makes a copy of the animation
     * @returns Cloned animation
     */
    clone(): Animation;
    /**
     * Sets the key frames of the animation
     * @param values The animation key frames to set
     * @param dontClone Whether to clone the keys or not (default is false, so the array of keys is cloned)
     */
    setKeys(values: Array<IAnimationKey>, dontClone?: boolean): void;
    /**
     * Creates a key for the frame passed as a parameter and adds it to the animation IF a key doesn't already exist for that frame
     * @param frame Frame number
     * @returns The key index if the key was added or the index of the pre existing key if the frame passed as parameter already has a corresponding key
     */
    createKeyForFrame(frame: number): number;
    /**
     * Serializes the animation to an object
     * @returns Serialized object
     */
    serialize(): any;
    /**
     * Float animation type
     */
    static readonly ANIMATIONTYPE_FLOAT = 0;
    /**
     * Vector3 animation type
     */
    static readonly ANIMATIONTYPE_VECTOR3 = 1;
    /**
     * Quaternion animation type
     */
    static readonly ANIMATIONTYPE_QUATERNION = 2;
    /**
     * Matrix animation type
     */
    static readonly ANIMATIONTYPE_MATRIX = 3;
    /**
     * Color3 animation type
     */
    static readonly ANIMATIONTYPE_COLOR3 = 4;
    /**
     * Color3 animation type
     */
    static readonly ANIMATIONTYPE_COLOR4 = 7;
    /**
     * Vector2 animation type
     */
    static readonly ANIMATIONTYPE_VECTOR2 = 5;
    /**
     * Size animation type
     */
    static readonly ANIMATIONTYPE_SIZE = 6;
    /**
     * Relative Loop Mode
     */
    static readonly ANIMATIONLOOPMODE_RELATIVE = 0;
    /**
     * Cycle Loop Mode
     */
    static readonly ANIMATIONLOOPMODE_CYCLE = 1;
    /**
     * Constant Loop Mode
     */
    static readonly ANIMATIONLOOPMODE_CONSTANT = 2;
    /**
     * Yoyo Loop Mode
     */
    static readonly ANIMATIONLOOPMODE_YOYO = 4;
    /**
     * Relative Loop Mode (add to current value of animated object, unlike ANIMATIONLOOPMODE_RELATIVE)
     */
    static readonly ANIMATIONLOOPMODE_RELATIVE_FROM_CURRENT = 5;
    /**
     * @internal
     */
    static _UniversalLerp(left: any, right: any, amount: number): any;
    /**
     * Parses an animation object and creates an animation
     * @param parsedAnimation Parsed animation object
     * @returns Animation object
     */
    static Parse(parsedAnimation: any): Animation;
    /**
     * Appends the serialized animations from the source animations
     * @param source Source containing the animations
     * @param destination Target to store the animations
     */
    static AppendSerializedAnimations(source: IAnimatable, destination: any): void;
    /**
     * Creates a new animation or an array of animations from a snippet saved in a remote file
     * @param name defines the name of the animation to create (can be null or empty to use the one from the json data)
     * @param url defines the url to load from
     * @returns a promise that will resolve to the new animation or an array of animations
     */
    static ParseFromFileAsync(name: Nullable<string>, url: string): Promise<Animation | Array<Animation>>;
    /**
     * Creates an animation or an array of animations from a snippet saved by the Inspector
     * @param snippetId defines the snippet to load
     * @returns a promise that will resolve to the new animation or a new array of animations
     */
    static ParseFromSnippetAsync(snippetId: string): Promise<Animation | Array<Animation>>;
    /**
     * Creates an animation or an array of animations from a snippet saved by the Inspector
     * @deprecated Please use ParseFromSnippetAsync instead
     * @param snippetId defines the snippet to load
     * @returns a promise that will resolve to the new animation or a new array of animations
     */
    static CreateFromSnippetAsync: typeof Animation.ParseFromSnippetAsync;
}
