import type { Nullable } from "../types";
import { Color3 } from "../Maths/math.color";
import type { AbstractMesh } from "../Meshes/abstractMesh";
import type { IParticleSystem } from "./IParticleSystem";
import type { Scene, IDisposable } from "../scene";
import type { Vector3 } from "../Maths/math.vector";
/**
 * Represents a set of particle systems working together to create a specific effect
 */
export declare class ParticleSystemSet implements IDisposable {
    /**
     * Gets or sets base Assets URL
     */
    static BaseAssetsUrl: string;
    private _emitterCreationOptions;
    private _emitterNode;
    private _emitterNodeIsOwned;
    /**
     * Gets the particle system list
     */
    systems: IParticleSystem[];
    /**
     * Gets or sets the emitter node used with this set
     */
    get emitterNode(): Nullable<AbstractMesh | Vector3>;
    set emitterNode(value: Nullable<AbstractMesh | Vector3>);
    /**
     * Creates a new emitter mesh as a sphere
     * @param options defines the options used to create the sphere
     * @param options.diameter
     * @param options.segments
     * @param options.color
     * @param renderingGroupId defines the renderingGroupId to use for the sphere
     * @param scene defines the hosting scene
     */
    setEmitterAsSphere(options: {
        diameter: number;
        segments: number;
        color: Color3;
    }, renderingGroupId: number, scene: Scene): void;
    /**
     * Starts all particle systems of the set
     * @param emitter defines an optional mesh to use as emitter for the particle systems
     */
    start(emitter?: AbstractMesh): void;
    /**
     * Release all associated resources
     */
    dispose(): void;
    /**
     * Serialize the set into a JSON compatible object
     * @param serializeTexture defines if the texture must be serialized as well
     * @returns a JSON compatible representation of the set
     */
    serialize(serializeTexture?: boolean): any;
    /**
     * Parse a new ParticleSystemSet from a serialized source
     * @param data defines a JSON compatible representation of the set
     * @param scene defines the hosting scene
     * @param gpu defines if we want GPU particles or CPU particles
     * @param capacity defines the system capacity (if null or undefined the sotred capacity will be used)
     * @returns a new ParticleSystemSet
     */
    static Parse(data: any, scene: Scene, gpu?: boolean, capacity?: number): ParticleSystemSet;
}
