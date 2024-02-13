import type { Nullable } from "../types";
import type { Scene } from "../scene";
import type { BaseTexture } from "../Materials/Textures/baseTexture";
import { Vector4 } from "../Maths/math.vector";
import type { Effect } from "../Materials/effect";
/**
 * Interface for baked vertex animation texture, see BakedVertexAnimationManager
 * @since 5.0
 */
export interface IBakedVertexAnimationManager {
    /**
     * The vertex animation texture
     */
    texture: Nullable<BaseTexture>;
    /**
     * Gets or sets a boolean indicating if the edgesRenderer is active
     */
    isEnabled: boolean;
    /**
     * The animation parameters for the mesh. See setAnimationParameters()
     */
    animationParameters: Vector4;
    /**
     * The time counter, to pick the correct animation frame.
     */
    time: number;
    /**
     * Binds to the effect.
     * @param effect The effect to bind to.
     * @param useInstances True when it's an instance.
     */
    bind(effect: Effect, useInstances: boolean): void;
    /**
     * Sets animation parameters.
     * @param startFrame The first frame of the animation.
     * @param endFrame The last frame of the animation.
     * @param offset The offset when starting the animation.
     * @param speedFramesPerSecond The frame rate.
     */
    setAnimationParameters(startFrame: number, endFrame: number, offset: number, speedFramesPerSecond: number): void;
    /**
     * Disposes the resources of the manager.
     * @param forceDisposeTextures - Forces the disposal of all textures.
     */
    dispose(forceDisposeTextures?: boolean): void;
    /**
     * Get the current class name useful for serialization or dynamic coding.
     * @returns "BakedVertexAnimationManager"
     */
    getClassName(): string;
}
/**
 * This class is used to animate meshes using a baked vertex animation texture
 * @see https://doc.babylonjs.com/features/featuresDeepDive/animation/baked_texture_animations
 * @since 5.0
 */
export declare class BakedVertexAnimationManager implements IBakedVertexAnimationManager {
    private _scene;
    private _texture;
    /**
     * The vertex animation texture
     */
    texture: Nullable<BaseTexture>;
    private _isEnabled;
    /**
     * Enable or disable the vertex animation manager
     */
    isEnabled: boolean;
    /**
     * The animation parameters for the mesh. See setAnimationParameters()
     */
    animationParameters: Vector4;
    /**
     * The time counter, to pick the correct animation frame.
     */
    time: number;
    /**
     * Creates a new BakedVertexAnimationManager
     * @param scene defines the current scene
     */
    constructor(scene?: Nullable<Scene>);
    /** @internal */
    _markSubMeshesAsAttributesDirty(): void;
    /**
     * Binds to the effect.
     * @param effect The effect to bind to.
     * @param useInstances True when it's an instance.
     */
    bind(effect: Effect, useInstances?: boolean): void;
    /**
     * Clone the current manager
     * @returns a new BakedVertexAnimationManager
     */
    clone(): BakedVertexAnimationManager;
    /**
     * Sets animation parameters.
     * @param startFrame The first frame of the animation.
     * @param endFrame The last frame of the animation.
     * @param offset The offset when starting the animation.
     * @param speedFramesPerSecond The frame rate.
     */
    setAnimationParameters(startFrame: number, endFrame: number, offset?: number, speedFramesPerSecond?: number): void;
    /**
     * Disposes the resources of the manager.
     * @param forceDisposeTextures - Forces the disposal of all textures.
     */
    dispose(forceDisposeTextures?: boolean): void;
    /**
     * Get the current class name useful for serialization or dynamic coding.
     * @returns "BakedVertexAnimationManager"
     */
    getClassName(): string;
    /**
     * Makes a duplicate of the current instance into another one.
     * @param vatMap define the instance where to copy the info
     */
    copyTo(vatMap: BakedVertexAnimationManager): void;
    /**
     * Serializes this vertex animation instance
     * @returns - An object with the serialized instance.
     */
    serialize(): any;
    /**
     * Parses a vertex animation setting from a serialized object.
     * @param source - Serialized object.
     * @param scene Defines the scene we are parsing for
     * @param rootUrl Defines the rootUrl to load from
     */
    parse(source: any, scene: Scene, rootUrl: string): void;
}
