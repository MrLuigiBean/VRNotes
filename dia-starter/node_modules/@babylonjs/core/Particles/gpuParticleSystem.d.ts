import type { Immutable, Nullable } from "../types";
import type { Color3Gradient, IValueGradient } from "../Misc/gradients";
import { Observable } from "../Misc/observable";
import { Matrix } from "../Maths/math.vector";
import { Color4 } from "../Maths/math.color";
import { VertexBuffer } from "../Buffers/buffer";
import type { IParticleSystem } from "./IParticleSystem";
import { BaseParticleSystem } from "./baseParticleSystem";
import type { IDisposable } from "../scene";
import type { Effect } from "../Materials/effect";
import { RawTexture } from "../Materials/Textures/rawTexture";
import type { IAnimatable } from "../Animations/animatable.interface";
import { ThinEngine } from "../Engines/thinEngine";
import type { DataBuffer } from "../Buffers/dataBuffer";
import { DrawWrapper } from "../Materials/drawWrapper";
import type { Scene } from "../scene";
import "../Engines/Extensions/engine.transformFeedback";
import "../Shaders/gpuRenderParticles.fragment";
import "../Shaders/gpuRenderParticles.vertex";
/**
 * This represents a GPU particle system in Babylon
 * This is the fastest particle system in Babylon as it uses the GPU to update the individual particle data
 * @see https://www.babylonjs-playground.com/#PU4WYI#4
 */
export declare class GPUParticleSystem extends BaseParticleSystem implements IDisposable, IParticleSystem, IAnimatable {
    /**
     * The layer mask we are rendering the particles through.
     */
    layerMask: number;
    private _capacity;
    private _maxActiveParticleCount;
    private _currentActiveCount;
    private _accumulatedCount;
    private _updateBuffer;
    private _buffer0;
    private _buffer1;
    private _spriteBuffer;
    private _renderVertexBuffers;
    private _linesIndexBufferUseInstancing;
    private _targetIndex;
    private _sourceBuffer;
    private _targetBuffer;
    private _currentRenderId;
    private _currentRenderingCameraUniqueId;
    private _started;
    private _stopped;
    private _timeDelta;
    /** @internal */
    _randomTexture: RawTexture;
    /** @internal */
    _randomTexture2: RawTexture;
    /** Indicates that the update of particles is done in the animate function (and not in render). Default: false */
    updateInAnimate: boolean;
    private _attributesStrideSize;
    private _cachedUpdateDefines;
    private _randomTextureSize;
    private _actualFrame;
    private _drawWrappers;
    private _customWrappers;
    private readonly _rawTextureWidth;
    private _platform;
    /**
     * Gets a boolean indicating if the GPU particles can be rendered on current browser
     */
    static get IsSupported(): boolean;
    /**
     * An event triggered when the system is disposed.
     */
    onDisposeObservable: Observable<IParticleSystem>;
    /**
     * An event triggered when the system is stopped
     */
    onStoppedObservable: Observable<IParticleSystem>;
    private _createIndexBuffer;
    /**
     * Gets the maximum number of particles active at the same time.
     * @returns The max number of active particles.
     */
    getCapacity(): number;
    /**
     * Forces the particle to write their depth information to the depth buffer. This can help preventing other draw calls
     * to override the particles.
     */
    forceDepthWrite: boolean;
    /**
     * Gets or set the number of active particles
     * The value cannot be greater than "capacity" (if it is, it will be limited to "capacity").
     */
    get maxActiveParticleCount(): number;
    set maxActiveParticleCount(value: number);
    /**
     * Gets or set the number of active particles
     * @deprecated Please use maxActiveParticleCount instead.
     */
    get activeParticleCount(): number;
    set activeParticleCount(value: number);
    private _preWarmDone;
    /**
     * Specifies if the particles are updated in emitter local space or world space.
     */
    isLocal: boolean;
    /** Indicates that the particle system is GPU based */
    readonly isGPU = true;
    /** Gets or sets a matrix to use to compute projection */
    defaultProjectionMatrix: Matrix;
    /**
     * Is this system ready to be used/rendered
     * @returns true if the system is ready
     */
    isReady(): boolean;
    /**
     * Gets if the system has been started. (Note: this will still be true after stop is called)
     * @returns True if it has been started, otherwise false.
     */
    isStarted(): boolean;
    /**
     * Gets if the system has been stopped. (Note: rendering is still happening but the system is frozen)
     * @returns True if it has been stopped, otherwise false.
     */
    isStopped(): boolean;
    /**
     * Gets a boolean indicating that the system is stopping
     * @returns true if the system is currently stopping
     */
    isStopping(): boolean;
    /**
     * Gets the number of particles active at the same time.
     * @returns The number of active particles.
     */
    getActiveCount(): number;
    /**
     * Starts the particle system and begins to emit
     * @param delay defines the delay in milliseconds before starting the system (this.startDelay by default)
     */
    start(delay?: number): void;
    /**
     * Stops the particle system.
     */
    stop(): void;
    /**
     * Remove all active particles
     */
    reset(): void;
    /**
     * Returns the string "GPUParticleSystem"
     * @returns a string containing the class name
     */
    getClassName(): string;
    /**
     * Gets the custom effect used to render the particles
     * @param blendMode Blend mode for which the effect should be retrieved
     * @returns The effect
     */
    getCustomEffect(blendMode?: number): Nullable<Effect>;
    private _getCustomDrawWrapper;
    /**
     * Sets the custom effect used to render the particles
     * @param effect The effect to set
     * @param blendMode Blend mode for which the effect should be set
     */
    setCustomEffect(effect: Nullable<Effect>, blendMode?: number): void;
    /** @internal */
    protected _onBeforeDrawParticlesObservable: Nullable<Observable<Nullable<Effect>>>;
    /**
     * Observable that will be called just before the particles are drawn
     */
    get onBeforeDrawParticlesObservable(): Observable<Nullable<Effect>>;
    /**
     * Gets the name of the particle vertex shader
     */
    get vertexShaderName(): string;
    /**
     * Gets the vertex buffers used by the particle system
     * Should be called after render() has been called for the current frame so that the buffers returned are the ones that have been updated
     * in the current frame (there's a ping-pong between two sets of buffers - for a given frame, one set is used as the source and the other as the destination)
     */
    get vertexBuffers(): Immutable<{
        [key: string]: VertexBuffer;
    }>;
    /**
     * Gets the index buffer used by the particle system (null for GPU particle systems)
     */
    get indexBuffer(): Nullable<DataBuffer>;
    /** @internal */
    _colorGradientsTexture: RawTexture;
    protected _removeGradientAndTexture(gradient: number, gradients: Nullable<IValueGradient[]>, texture: RawTexture): BaseParticleSystem;
    /**
     * Adds a new color gradient
     * @param gradient defines the gradient to use (between 0 and 1)
     * @param color1 defines the color to affect to the specified gradient
     * @returns the current particle system
     */
    addColorGradient(gradient: number, color1: Color4): GPUParticleSystem;
    private _refreshColorGradient;
    /** Force the system to rebuild all gradients that need to be resync */
    forceRefreshGradients(): void;
    /**
     * Remove a specific color gradient
     * @param gradient defines the gradient to remove
     * @returns the current particle system
     */
    removeColorGradient(gradient: number): GPUParticleSystem;
    /**
     * Resets the draw wrappers cache
     */
    resetDrawCache(): void;
    /** @internal */
    _angularSpeedGradientsTexture: RawTexture;
    /** @internal */
    _sizeGradientsTexture: RawTexture;
    /** @internal */
    _velocityGradientsTexture: RawTexture;
    /** @internal */
    _limitVelocityGradientsTexture: RawTexture;
    /** @internal */
    _dragGradientsTexture: RawTexture;
    private _addFactorGradient;
    /**
     * Adds a new size gradient
     * @param gradient defines the gradient to use (between 0 and 1)
     * @param factor defines the size factor to affect to the specified gradient
     * @returns the current particle system
     */
    addSizeGradient(gradient: number, factor: number): GPUParticleSystem;
    /**
     * Remove a specific size gradient
     * @param gradient defines the gradient to remove
     * @returns the current particle system
     */
    removeSizeGradient(gradient: number): GPUParticleSystem;
    private _refreshFactorGradient;
    /**
     * Adds a new angular speed gradient
     * @param gradient defines the gradient to use (between 0 and 1)
     * @param factor defines the angular speed to affect to the specified gradient
     * @returns the current particle system
     */
    addAngularSpeedGradient(gradient: number, factor: number): GPUParticleSystem;
    /**
     * Remove a specific angular speed gradient
     * @param gradient defines the gradient to remove
     * @returns the current particle system
     */
    removeAngularSpeedGradient(gradient: number): GPUParticleSystem;
    /**
     * Adds a new velocity gradient
     * @param gradient defines the gradient to use (between 0 and 1)
     * @param factor defines the velocity to affect to the specified gradient
     * @returns the current particle system
     */
    addVelocityGradient(gradient: number, factor: number): GPUParticleSystem;
    /**
     * Remove a specific velocity gradient
     * @param gradient defines the gradient to remove
     * @returns the current particle system
     */
    removeVelocityGradient(gradient: number): GPUParticleSystem;
    /**
     * Adds a new limit velocity gradient
     * @param gradient defines the gradient to use (between 0 and 1)
     * @param factor defines the limit velocity value to affect to the specified gradient
     * @returns the current particle system
     */
    addLimitVelocityGradient(gradient: number, factor: number): GPUParticleSystem;
    /**
     * Remove a specific limit velocity gradient
     * @param gradient defines the gradient to remove
     * @returns the current particle system
     */
    removeLimitVelocityGradient(gradient: number): GPUParticleSystem;
    /**
     * Adds a new drag gradient
     * @param gradient defines the gradient to use (between 0 and 1)
     * @param factor defines the drag value to affect to the specified gradient
     * @returns the current particle system
     */
    addDragGradient(gradient: number, factor: number): GPUParticleSystem;
    /**
     * Remove a specific drag gradient
     * @param gradient defines the gradient to remove
     * @returns the current particle system
     */
    removeDragGradient(gradient: number): GPUParticleSystem;
    /**
     * Not supported by GPUParticleSystem
     * @returns the current particle system
     */
    addEmitRateGradient(): IParticleSystem;
    /**
     * Not supported by GPUParticleSystem
     * @returns the current particle system
     */
    removeEmitRateGradient(): IParticleSystem;
    /**
     * Not supported by GPUParticleSystem
     * @returns the current particle system
     */
    addStartSizeGradient(): IParticleSystem;
    /**
     * Not supported by GPUParticleSystem
     * @returns the current particle system
     */
    removeStartSizeGradient(): IParticleSystem;
    /**
     * Not supported by GPUParticleSystem
     * @returns the current particle system
     */
    addColorRemapGradient(): IParticleSystem;
    /**
     * Not supported by GPUParticleSystem
     * @returns the current particle system
     */
    removeColorRemapGradient(): IParticleSystem;
    /**
     * Not supported by GPUParticleSystem
     * @returns the current particle system
     */
    addAlphaRemapGradient(): IParticleSystem;
    /**
     * Not supported by GPUParticleSystem
     * @returns the current particle system
     */
    removeAlphaRemapGradient(): IParticleSystem;
    /**
     * Not supported by GPUParticleSystem
     * @returns the current particle system
     */
    addRampGradient(): IParticleSystem;
    /**
     * Not supported by GPUParticleSystem
     * @returns the current particle system
     */
    removeRampGradient(): IParticleSystem;
    /**
     * Not supported by GPUParticleSystem
     * @returns the list of ramp gradients
     */
    getRampGradients(): Nullable<Array<Color3Gradient>>;
    /**
     * Not supported by GPUParticleSystem
     * Gets or sets a boolean indicating that ramp gradients must be used
     * @see https://doc.babylonjs.com/features/featuresDeepDive/particles/particle_system/particle_system_intro#ramp-gradients
     */
    get useRampGradients(): boolean;
    set useRampGradients(value: boolean);
    /**
     * Not supported by GPUParticleSystem
     * @returns the current particle system
     */
    addLifeTimeGradient(): IParticleSystem;
    /**
     * Not supported by GPUParticleSystem
     * @returns the current particle system
     */
    removeLifeTimeGradient(): IParticleSystem;
    /**
     * Instantiates a GPU particle system.
     * Particles are often small sprites used to simulate hard-to-reproduce phenomena like fire, smoke, water, or abstract visual effects like magic glitter and faery dust.
     * @param name The name of the particle system
     * @param options The options used to create the system
     * @param sceneOrEngine The scene the particle system belongs to or the engine to use if no scene
     * @param customEffect a custom effect used to change the way particles are rendered by default
     * @param isAnimationSheetEnabled Must be true if using a spritesheet to animate the particles texture
     */
    constructor(name: string, options: Partial<{
        capacity: number;
        randomTextureSize: number;
    }>, sceneOrEngine: Scene | ThinEngine, customEffect?: Nullable<Effect>, isAnimationSheetEnabled?: boolean);
    protected _reset(): void;
    private _createVertexBuffers;
    private _initialize;
    /** @internal */
    _recreateUpdateEffect(): boolean;
    /**
     * @internal
     */
    _getWrapper(blendMode: number): DrawWrapper;
    /**
     * @internal
     */
    static _GetAttributeNamesOrOptions(hasColorGradients?: boolean, isAnimationSheetEnabled?: boolean, isBillboardBased?: boolean, isBillboardStretched?: boolean): string[];
    /**
     * @internal
     */
    static _GetEffectCreationOptions(isAnimationSheetEnabled?: boolean, useLogarithmicDepth?: boolean): string[];
    /**
     * Fill the defines array according to the current settings of the particle system
     * @param defines Array to be updated
     * @param blendMode blend mode to take into account when updating the array
     */
    fillDefines(defines: Array<string>, blendMode?: number): void;
    /**
     * Fill the uniforms, attributes and samplers arrays according to the current settings of the particle system
     * @param uniforms Uniforms array to fill
     * @param attributes Attributes array to fill
     * @param samplers Samplers array to fill
     */
    fillUniformsAttributesAndSamplerNames(uniforms: Array<string>, attributes: Array<string>, samplers: Array<string>): void;
    /**
     * Animates the particle system for the current frame by emitting new particles and or animating the living ones.
     * @param preWarm defines if we are in the pre-warmimg phase
     */
    animate(preWarm?: boolean): void;
    private _createFactorGradientTexture;
    private _createSizeGradientTexture;
    private _createAngularSpeedGradientTexture;
    private _createVelocityGradientTexture;
    private _createLimitVelocityGradientTexture;
    private _createDragGradientTexture;
    private _createColorGradientTexture;
    private _render;
    /** @internal */
    _update(emitterWM?: Matrix): void;
    /**
     * Renders the particle system in its current state
     * @param preWarm defines if the system should only update the particles but not render them
     * @param forceUpdateOnly if true, force to only update the particles and never display them (meaning, even if preWarm=false, when forceUpdateOnly=true the particles won't be displayed)
     * @returns the current number of particles
     */
    render(preWarm?: boolean, forceUpdateOnly?: boolean): number;
    /**
     * Rebuilds the particle system
     */
    rebuild(): void;
    private _releaseBuffers;
    /**
     * Disposes the particle system and free the associated resources
     * @param disposeTexture defines if the particule texture must be disposed as well (true by default)
     */
    dispose(disposeTexture?: boolean): void;
    /**
     * Clones the particle system.
     * @param name The name of the cloned object
     * @param newEmitter The new emitter to use
     * @param cloneTexture Also clone the textures if true
     * @returns the cloned particle system
     */
    clone(name: string, newEmitter: any, cloneTexture?: boolean): GPUParticleSystem;
    /**
     * Serializes the particle system to a JSON object
     * @param serializeTexture defines if the texture must be serialized as well
     * @returns the JSON object
     */
    serialize(serializeTexture?: boolean): any;
    /**
     * Parses a JSON object to create a GPU particle system.
     * @param parsedParticleSystem The JSON object to parse
     * @param sceneOrEngine The scene or the engine to create the particle system in
     * @param rootUrl The root url to use to load external dependencies like texture
     * @param doNotStart Ignore the preventAutoStart attribute and does not start
     * @param capacity defines the system capacity (if null or undefined the sotred capacity will be used)
     * @returns the parsed GPU particle system
     */
    static Parse(parsedParticleSystem: any, sceneOrEngine: Scene | ThinEngine, rootUrl: string, doNotStart?: boolean, capacity?: number): GPUParticleSystem;
}
