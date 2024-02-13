import { ShaderCodeNode } from "./shaderCodeNode";
import type { ProcessingOptions } from "./shaderProcessingOptions";
/** @internal */
export declare class ShaderCodeConditionNode extends ShaderCodeNode {
    process(preprocessors: {
        [key: string]: string;
    }, options: ProcessingOptions): string;
}
