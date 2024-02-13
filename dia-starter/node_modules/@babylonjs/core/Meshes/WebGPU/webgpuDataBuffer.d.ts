import { DataBuffer } from "../../Buffers/dataBuffer";
/** @internal */
export declare class WebGPUDataBuffer extends DataBuffer {
    private _buffer;
    engineId: number;
    constructor(resource: GPUBuffer, capacity?: number);
    get underlyingResource(): any;
}
