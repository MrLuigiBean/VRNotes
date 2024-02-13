/** @internal */
export class WebGPUComputePipelineContext {
    get isAsync() {
        return false;
    }
    get isReady() {
        if (this.stage) {
            return true;
        }
        return false;
    }
    constructor(engine) {
        this._name = "unnamed";
        this.engine = engine;
    }
    _getComputeShaderCode() {
        var _a;
        return (_a = this.sources) === null || _a === void 0 ? void 0 : _a.compute;
    }
    dispose() { }
}
//# sourceMappingURL=webgpuComputePipelineContext.js.map