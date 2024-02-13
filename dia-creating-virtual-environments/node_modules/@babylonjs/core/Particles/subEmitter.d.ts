import type { ThinEngine } from "../Engines/thinEngine";
import type { Scene } from "../scene";
import type { ParticleSystem } from "../Particles/particleSystem";
/**
 * Type of sub emitter
 */
export declare enum SubEmitterType {
    /**
     * Attached to the particle over it's lifetime
     */
    ATTACHED = 0,
    /**
     * Created when the particle dies
     */
    END = 1
}
/**
 * Sub emitter class used to emit particles from an existing particle
 */
export declare class SubEmitter {
    /**
     * the particle system to be used by the sub emitter
     */
    particleSystem: ParticleSystem;
    /**
     * Type of the submitter (Default: END)
     */
    type: SubEmitterType;
    /**
     * If the particle should inherit the direction from the particle it's attached to. (+Y will face the direction the particle is moving) (Default: false)
     * Note: This only is supported when using an emitter of type Mesh
     */
    inheritDirection: boolean;
    /**
     * How much of the attached particles speed should be added to the sub emitted particle (default: 0)
     */
    inheritedVelocityAmount: number;
    /**
     * Creates a sub emitter
     * @param particleSystem the particle system to be used by the sub emitter
     */
    constructor(
    /**
     * the particle system to be used by the sub emitter
     */
    particleSystem: ParticleSystem);
    /**
     * Clones the sub emitter
     * @returns the cloned sub emitter
     */
    clone(): SubEmitter;
    /**
     * Serialize current object to a JSON object
     * @param serializeTexture defines if the texture must be serialized as well
     * @returns the serialized object
     */
    serialize(serializeTexture?: boolean): any;
    /**
     * @internal
     */
    static _ParseParticleSystem(system: any, sceneOrEngine: Scene | ThinEngine, rootUrl: string, doNotStart?: boolean): ParticleSystem;
    /**
     * Creates a new SubEmitter from a serialized JSON version
     * @param serializationObject defines the JSON object to read from
     * @param sceneOrEngine defines the hosting scene or the hosting engine
     * @param rootUrl defines the rootUrl for data loading
     * @returns a new SubEmitter
     */
    static Parse(serializationObject: any, sceneOrEngine: Scene | ThinEngine, rootUrl: string): SubEmitter;
    /** Release associated resources */
    dispose(): void;
}
