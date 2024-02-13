import { ShaderCodeNode } from "./shaderCodeNode";
import type { ShaderDefineExpression } from "./Expressions/shaderDefineExpression";
/** @internal */
export declare class ShaderCodeTestNode extends ShaderCodeNode {
    testExpression: ShaderDefineExpression;
    isValid(preprocessors: {
        [key: string]: string;
    }): boolean;
}
