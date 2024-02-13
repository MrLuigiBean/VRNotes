import { ShaderLanguage } from "../../Materials/shaderLanguage";
import type { IShaderProcessor } from "../Processors/iShaderProcessor";
/** @internal */
export declare class WebGL2ShaderProcessor implements IShaderProcessor {
    shaderLanguage: ShaderLanguage;
    attributeProcessor(attribute: string): string;
    varyingCheck(varying: string, _isFragment: boolean): boolean;
    varyingProcessor(varying: string, isFragment: boolean): string;
    postProcessor(code: string, defines: string[], isFragment: boolean): string;
}
