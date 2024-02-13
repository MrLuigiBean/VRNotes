import type { ThinEngine } from "../Engines/thinEngine";
import type { IGPUParticleSystemPlatform } from "./IGPUParticleSystemPlatform";
import type { Buffer, VertexBuffer } from "../Buffers/buffer";
import type { GPUParticleSystem } from "./gpuParticleSystem";
import type { DataArray, Nullable } from "../types";
import type { DataBuffer } from "../Buffers/dataBuffer";
import { UniformBufferEffectCommonAccessor } from "../Materials/uniformBufferEffectCommonAccessor";
import type { Effect } from "../Materials/effect";
import "../ShadersWGSL/gpuUpdateParticles.compute";
/** @internal */
export declare class ComputeShaderParticleSystem implements IGPUParticleSystemPlatform {
    private _parent;
    private _engine;
    private _updateComputeShader;
    private _simParamsComputeShader;
    private _bufferComputeShader;
    private _renderVertexBuffers;
    readonly alignDataInBuffer = true;
    constructor(parent: GPUParticleSystem, engine: ThinEngine);
    contextLost(): void;
    isUpdateBufferCreated(): boolean;
    isUpdateBufferReady(): boolean;
    createUpdateBuffer(defines: string): UniformBufferEffectCommonAccessor;
    createVertexBuffers(updateBuffer: Buffer, renderVertexBuffers: {
        [key: string]: VertexBuffer;
    }): void;
    createParticleBuffer(data: number[]): DataArray | DataBuffer;
    bindDrawBuffers(index: number, effect: Effect, indexBuffer: Nullable<DataBuffer>): void;
    preUpdateParticleBuffer(): void;
    updateParticleBuffer(index: number, targetBuffer: Buffer, currentActiveCount: number): void;
    releaseBuffers(): void;
    releaseVertexBuffers(): void;
}
