import type { Nullable } from "../types";
import type { Scene } from "../scene";
import type { Vector3 } from "../Maths/math.vector";
import type { AbstractMesh } from "../Meshes/abstractMesh";
import type { IParticleSystem } from "./IParticleSystem";
import { ParticleSystemSet } from "./particleSystemSet";
/**
 * This class is made for on one-liner static method to help creating particle system set.
 */
export declare class ParticleHelper {
    /**
     * Gets or sets base Assets URL
     */
    static BaseAssetsUrl: string;
    /** Define the Url to load snippets */
    static SnippetUrl: string;
    /**
     * Create a default particle system that you can tweak
     * @param emitter defines the emitter to use
     * @param capacity defines the system capacity (default is 500 particles)
     * @param scene defines the hosting scene
     * @param useGPU defines if a GPUParticleSystem must be created (default is false)
     * @returns the new Particle system
     */
    static CreateDefault(emitter: Nullable<AbstractMesh | Vector3>, capacity?: number, scene?: Scene, useGPU?: boolean): IParticleSystem;
    /**
     * This is the main static method (one-liner) of this helper to create different particle systems
     * @param type This string represents the type to the particle system to create
     * @param scene The scene where the particle system should live
     * @param gpu If the system will use gpu
     * @param capacity defines the system capacity (if null or undefined the sotred capacity will be used)
     * @returns the ParticleSystemSet created
     */
    static CreateAsync(type: string, scene: Nullable<Scene>, gpu?: boolean, capacity?: number): Promise<ParticleSystemSet>;
    /**
     * Static function used to export a particle system to a ParticleSystemSet variable.
     * Please note that the emitter shape is not exported
     * @param systems defines the particle systems to export
     * @returns the created particle system set
     */
    static ExportSet(systems: IParticleSystem[]): ParticleSystemSet;
    /**
     * Creates a particle system from a snippet saved in a remote file
     * @param name defines the name of the particle system to create (can be null or empty to use the one from the json data)
     * @param url defines the url to load from
     * @param scene defines the hosting scene
     * @param gpu If the system will use gpu
     * @param rootUrl defines the root URL to use to load textures and relative dependencies
     * @param capacity defines the system capacity (if null or undefined the sotred capacity will be used)
     * @returns a promise that will resolve to the new particle system
     */
    static ParseFromFileAsync(name: Nullable<string>, url: string, scene: Scene, gpu?: boolean, rootUrl?: string, capacity?: number): Promise<IParticleSystem>;
    /**
     * Creates a particle system from a snippet saved by the particle system editor
     * @param snippetId defines the snippet to load (can be set to _BLANK to create a default one)
     * @param scene defines the hosting scene
     * @param gpu If the system will use gpu
     * @param rootUrl defines the root URL to use to load textures and relative dependencies
     * @param capacity defines the system capacity (if null or undefined the sotred capacity will be used)
     * @returns a promise that will resolve to the new particle system
     */
    static ParseFromSnippetAsync(snippetId: string, scene: Scene, gpu?: boolean, rootUrl?: string, capacity?: number): Promise<IParticleSystem>;
    /**
     * Creates a particle system from a snippet saved by the particle system editor
     * @deprecated Please use ParseFromSnippetAsync instead
     * @param snippetId defines the snippet to load (can be set to _BLANK to create a default one)
     * @param scene defines the hosting scene
     * @param gpu If the system will use gpu
     * @param rootUrl defines the root URL to use to load textures and relative dependencies
     * @param capacity defines the system capacity (if null or undefined the sotred capacity will be used)
     * @returns a promise that will resolve to the new particle system
     */
    static CreateFromSnippetAsync: typeof ParticleHelper.ParseFromSnippetAsync;
}
