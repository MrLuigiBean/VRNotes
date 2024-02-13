import { ShaderLanguage } from "../../Materials/shaderLanguage";
import type { Nullable } from "../../types";
import type { IShaderProcessor } from "../Processors/iShaderProcessor";
import type { ShaderProcessingContext } from "../Processors/shaderProcessingOptions";
import type { ThinEngine } from "../thinEngine";
/** @internal */
export declare class WebGLShaderProcessor implements IShaderProcessor {
    shaderLanguage: ShaderLanguage;
    postProcessor(code: string, defines: string[], isFragment: boolean, processingContext: Nullable<ShaderProcessingContext>, engine: ThinEngine): string;
}
