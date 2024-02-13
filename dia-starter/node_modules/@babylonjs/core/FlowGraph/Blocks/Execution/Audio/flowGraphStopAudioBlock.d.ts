import { Sound } from "../../../../Audio/sound";
import type { FlowGraphContext } from "../../../flowGraphContext";
import type { FlowGraphDataConnection } from "../../../flowGraphDataConnection";
import type { FlowGraphSignalConnection } from "../../../flowGraphSignalConnection";
import { FlowGraphExecutionBlockWithOutSignal } from "../../../flowGraphExecutionBlockWithOutSignal";
import type { IFlowGraphBlockConfiguration } from "../../../flowGraphBlock";
/**
 * Stops an audio.
 * @experimental
 */
export declare class FlowGraphStopAudioBlock extends FlowGraphExecutionBlockWithOutSignal {
    /**
     * Input connection: The audio to stop.
     */
    readonly audio: FlowGraphDataConnection<Sound>;
    constructor(config?: IFlowGraphBlockConfiguration);
    _execute(context: FlowGraphContext, _callingSignal: FlowGraphSignalConnection): void;
    getClassName(): string;
}
