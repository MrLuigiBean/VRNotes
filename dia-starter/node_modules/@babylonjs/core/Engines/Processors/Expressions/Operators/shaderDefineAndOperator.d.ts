import { ShaderDefineExpression } from "../shaderDefineExpression";
/** @internal */
export declare class ShaderDefineAndOperator extends ShaderDefineExpression {
    leftOperand: ShaderDefineExpression;
    rightOperand: ShaderDefineExpression;
    isTrue(preprocessors: {
        [key: string]: string;
    }): boolean;
}
