import { Animation } from "@babylonjs/core/Animations/animation.js";
import { Quaternion, Vector3 } from "@babylonjs/core/Maths/math.vector.js";
import type { INode } from "./glTFLoaderInterfaces";
import type { IAnimatable } from "@babylonjs/core/Animations/animatable.interface.js";
/** @internal */
export type GetValueFn = (target: any, source: Float32Array, offset: number, scale: number) => any;
/** @internal */
export declare function getVector3(_target: any, source: Float32Array, offset: number, scale: number): Vector3;
/** @internal */
export declare function getQuaternion(_target: any, source: Float32Array, offset: number, scale: number): Quaternion;
/** @internal */
export declare function getWeights(target: INode, source: Float32Array, offset: number, scale: number): Array<number>;
/** @internal */
export declare abstract class AnimationPropertyInfo {
    readonly type: number;
    readonly name: string;
    readonly getValue: GetValueFn;
    readonly getStride: (target: any) => number;
    /** @internal */
    constructor(type: number, name: string, getValue: GetValueFn, getStride: (target: any) => number);
    protected _buildAnimation(name: string, fps: number, keys: any[]): Animation;
    /** @internal */
    abstract buildAnimations(target: any, name: string, fps: number, keys: any[], callback: (babylonAnimatable: IAnimatable, babylonAnimation: Animation) => void): void;
}
/** @internal */
export declare class TransformNodeAnimationPropertyInfo extends AnimationPropertyInfo {
    /** @internal */
    buildAnimations(target: INode, name: string, fps: number, keys: any[], callback: (babylonAnimatable: IAnimatable, babylonAnimation: Animation) => void): void;
}
/** @internal */
export declare class WeightAnimationPropertyInfo extends AnimationPropertyInfo {
    buildAnimations(target: INode, name: string, fps: number, keys: any[], callback: (babylonAnimatable: IAnimatable, babylonAnimation: Animation) => void): void;
}
/** @internal */
export declare const nodeAnimationData: {
    translation: TransformNodeAnimationPropertyInfo[];
    rotation: TransformNodeAnimationPropertyInfo[];
    scale: TransformNodeAnimationPropertyInfo[];
    weights: WeightAnimationPropertyInfo[];
};
