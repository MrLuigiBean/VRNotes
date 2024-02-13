import { ShaderDefineExpression } from "../shaderDefineExpression";
/** @internal */
export declare class ShaderDefineArithmeticOperator extends ShaderDefineExpression {
    define: string;
    operand: string;
    testValue: string;
    constructor(define: string, operand: string, testValue: string);
    isTrue(preprocessors: {
        [key: string]: string;
    }): boolean;
}
