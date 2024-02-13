import { DataBuffer } from "../../Buffers/dataBuffer.js";
/** @internal */
export class WebGPUDataBuffer extends DataBuffer {
    constructor(resource, capacity = 0) {
        super();
        // Used to make sure the buffer is not recreated twice after a context loss/restoration
        this.engineId = -1;
        this.capacity = capacity;
        this._buffer = resource;
    }
    get underlyingResource() {
        return this._buffer;
    }
}
//# sourceMappingURL=webgpuDataBuffer.js.map