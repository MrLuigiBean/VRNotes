import { PerfCounter } from "../../Misc/perfCounter";
/**
 * Class used to define a WebGPU performance counter
 */
export declare class WebGPUPerfCounter {
    private _gpuTimeInFrameId;
    /**
     * The GPU time in nanoseconds spent in the last frame
     */
    counter: PerfCounter;
    /**
     * @internal
     */
    _addDuration(currentFrameId: number, duration: number): void;
}
