import { ShaderDefineExpression } from "../shaderDefineExpression";
/** @internal */
export declare class ShaderDefineIsDefinedOperator extends ShaderDefineExpression {
    define: string;
    not: boolean;
    constructor(define: string, not?: boolean);
    isTrue(preprocessors: {
        [key: string]: string;
    }): boolean;
}
