import type { Nullable } from "../types";
import { Vector2, Vector3, Vector4 } from "../Maths/math.vector";
import { Color4 } from "../Maths/math.color";
import type { ParticleSystem } from "./particleSystem";
import type { SubEmitter } from "./subEmitter";
import type { ColorGradient, FactorGradient } from "../Misc/gradients";
/**
 * A particle represents one of the element emitted by a particle system.
 * This is mainly define by its coordinates, direction, velocity and age.
 */
export declare class Particle {
    /**
     * The particle system the particle belongs to.
     */
    particleSystem: ParticleSystem;
    private static _Count;
    /**
     * Unique ID of the particle
     */
    id: number;
    /**
     * The world position of the particle in the scene.
     */
    position: Vector3;
    /**
     * The world direction of the particle in the scene.
     */
    direction: Vector3;
    /**
     * The color of the particle.
     */
    color: Color4;
    /**
     * The color change of the particle per step.
     */
    colorStep: Color4;
    /**
     * Defines how long will the life of the particle be.
     */
    lifeTime: number;
    /**
     * The current age of the particle.
     */
    age: number;
    /**
     * The current size of the particle.
     */
    size: number;
    /**
     * The current scale of the particle.
     */
    scale: Vector2;
    /**
     * The current angle of the particle.
     */
    angle: number;
    /**
     * Defines how fast is the angle changing.
     */
    angularSpeed: number;
    /**
     * Defines the cell index used by the particle to be rendered from a sprite.
     */
    cellIndex: number;
    /**
     * The information required to support color remapping
     */
    remapData: Vector4;
    /** @internal */
    _randomCellOffset?: number;
    /** @internal */
    _initialDirection: Nullable<Vector3>;
    /** @internal */
    _attachedSubEmitters: Nullable<Array<SubEmitter>>;
    /** @internal */
    _initialStartSpriteCellID: number;
    /** @internal */
    _initialEndSpriteCellID: number;
    /** @internal */
    _initialSpriteCellLoop: boolean;
    /** @internal */
    _currentColorGradient: Nullable<ColorGradient>;
    /** @internal */
    _currentColor1: Color4;
    /** @internal */
    _currentColor2: Color4;
    /** @internal */
    _currentSizeGradient: Nullable<FactorGradient>;
    /** @internal */
    _currentSize1: number;
    /** @internal */
    _currentSize2: number;
    /** @internal */
    _currentAngularSpeedGradient: Nullable<FactorGradient>;
    /** @internal */
    _currentAngularSpeed1: number;
    /** @internal */
    _currentAngularSpeed2: number;
    /** @internal */
    _currentVelocityGradient: Nullable<FactorGradient>;
    /** @internal */
    _currentVelocity1: number;
    /** @internal */
    _currentVelocity2: number;
    /** @internal */
    _currentLimitVelocityGradient: Nullable<FactorGradient>;
    /** @internal */
    _currentLimitVelocity1: number;
    /** @internal */
    _currentLimitVelocity2: number;
    /** @internal */
    _currentDragGradient: Nullable<FactorGradient>;
    /** @internal */
    _currentDrag1: number;
    /** @internal */
    _currentDrag2: number;
    /** @internal */
    _randomNoiseCoordinates1: Vector3;
    /** @internal */
    _randomNoiseCoordinates2: Vector3;
    /** @internal */
    _localPosition?: Vector3;
    /**
     * Creates a new instance Particle
     * @param particleSystem the particle system the particle belongs to
     */
    constructor(
    /**
     * The particle system the particle belongs to.
     */
    particleSystem: ParticleSystem);
    private _updateCellInfoFromSystem;
    /**
     * Defines how the sprite cell index is updated for the particle
     */
    updateCellIndex(): void;
    /**
     * @internal
     */
    _inheritParticleInfoToSubEmitter(subEmitter: SubEmitter): void;
    /** @internal */
    _inheritParticleInfoToSubEmitters(): void;
    /** @internal */
    _reset(): void;
    /**
     * Copy the properties of particle to another one.
     * @param other the particle to copy the information to.
     */
    copyTo(other: Particle): void;
}
