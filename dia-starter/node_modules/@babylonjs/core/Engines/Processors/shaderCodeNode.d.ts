import type { ProcessingOptions } from "./shaderProcessingOptions";
/** @internal */
export declare class ShaderCodeNode {
    line: string;
    children: ShaderCodeNode[];
    additionalDefineKey?: string;
    additionalDefineValue?: string;
    isValid(preprocessors: {
        [key: string]: string;
    }): boolean;
    process(preprocessors: {
        [key: string]: string;
    }, options: ProcessingOptions): string;
}
