import type { VertexBuffer } from "../../Buffers/buffer.js";
import type { DataBuffer } from "../../Buffers/dataBuffer.js";
import type { IParticleSystem } from "../../Particles/IParticleSystem.js";
import type { Scene } from "../../scene.js";
import type { Nullable } from "../../types.js";
import { FluidRenderingObject } from "./fluidRenderingObject";
/**
 * Defines a rendering object based on a particle system
 */
export declare class FluidRenderingObjectParticleSystem extends FluidRenderingObject {
    private _particleSystem;
    private _originalRender;
    private _blendMode;
    private _onBeforeDrawParticleObserver;
    private _updateInAnimate;
    /** Gets the particle system */
    get particleSystem(): IParticleSystem;
    /**
     * Gets the name of the class
     */
    getClassName(): string;
    private _useTrueRenderingForDiffuseTexture;
    /**
     * Gets or sets a boolean indicating that the diffuse texture should be generated based on the regular rendering of the particle system (default: true).
     * Sometimes, generating the diffuse texture this way may be sub-optimal. In that case, you can disable this property, in which case the particle system will be
     * rendered using a ALPHA_COMBINE mode instead of the one used by the particle system.
     */
    get useTrueRenderingForDiffuseTexture(): boolean;
    set useTrueRenderingForDiffuseTexture(use: boolean);
    /**
     * Gets the vertex buffers
     */
    get vertexBuffers(): {
        [key: string]: VertexBuffer;
    };
    /**
     * Gets the index buffer (or null if the object is using instancing)
     */
    get indexBuffer(): Nullable<DataBuffer>;
    /**
     * Creates a new instance of the class
     * @param scene The scene the particle system is part of
     * @param ps The particle system
     */
    constructor(scene: Scene, ps: IParticleSystem);
    /**
     * Indicates if the object is ready to be rendered
     * @returns True if everything is ready for the object to be rendered, otherwise false
     */
    isReady(): boolean;
    /**
     * Gets the number of particles in this particle system
     * @returns The number of particles
     */
    get numParticles(): number;
    /**
     * Render the diffuse texture for this object
     */
    renderDiffuseTexture(): void;
    /**
     * Releases the ressources used by the class
     */
    dispose(): void;
}
