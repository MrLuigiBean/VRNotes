import type { Nullable } from "../../../types";
declare module "../../webgpuEngine" {
    interface WebGPUEngine {
        /** @internal */
        _createComputePipelineStageDescriptor(computeShader: string, defines: Nullable<string>, entryPoint: string): GPUProgrammableStage;
    }
}
