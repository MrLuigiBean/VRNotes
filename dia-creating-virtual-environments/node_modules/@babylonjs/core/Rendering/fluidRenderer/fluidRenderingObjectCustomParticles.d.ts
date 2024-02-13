import { VertexBuffer } from "../../Buffers/buffer.js";
import type { Scene } from "../../scene.js";
import type { FloatArray } from "../../types.js";
import { FluidRenderingObject } from "./fluidRenderingObject";
/**
 * Defines a rendering object based on a list of custom buffers
 * The list must contain at least a "position" buffer!
 */
export declare class FluidRenderingObjectCustomParticles extends FluidRenderingObject {
    private _numParticles;
    private _diffuseEffectWrapper;
    private _vertexBuffers;
    /**
     * Gets the name of the class
     */
    getClassName(): string;
    /**
     * Gets the vertex buffers
     */
    get vertexBuffers(): {
        [key: string]: VertexBuffer;
    };
    /**
     * Creates a new instance of the class
     * @param scene The scene the particles should be rendered into
     * @param buffers The list of buffers (must contain at least one "position" buffer!). Note that you don't have to pass all (or any!) buffers at once in the constructor, you can use the addBuffers method to add more later.
     * @param numParticles Number of vertices to take into account from the buffers
     */
    constructor(scene: Scene, buffers: {
        [key: string]: FloatArray;
    }, numParticles: number);
    /**
     * Add some new buffers
     * @param buffers List of buffers
     */
    addBuffers(buffers: {
        [key: string]: FloatArray;
    }): void;
    protected _createEffects(): void;
    /**
     * Indicates if the object is ready to be rendered
     * @returns True if everything is ready for the object to be rendered, otherwise false
     */
    isReady(): boolean;
    /**
     * Gets the number of particles in this object
     * @returns The number of particles
     */
    get numParticles(): number;
    /**
     * Sets the number of particles in this object
     * @param num The number of particles to take into account
     */
    setNumParticles(num: number): void;
    /**
     * Render the diffuse texture for this object
     */
    renderDiffuseTexture(): void;
    /**
     * Releases the ressources used by the class
     */
    dispose(): void;
}
