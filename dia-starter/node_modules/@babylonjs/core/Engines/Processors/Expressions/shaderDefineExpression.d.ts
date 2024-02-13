/** @internal */
export declare class ShaderDefineExpression {
    /**
     * Cache items count limit for the InfixToPostfix cache.
     * It uses to improve the performance of the shader compilation.
     * For details see PR: https://github.com/BabylonJS/Babylon.js/pull/13936
     */
    static InfixToPostfixCacheLimitSize: number;
    /**
     * When the cache size is exceeded, a cache cleanup will be triggered
     * and the cache will be reduced by the size specified
     * in the InfixToPostfixCacheCleanupSize variable, removing entries
     * that have not been accessed the longest.
     */
    static InfixToPostfixCacheCleanupSize: number;
    protected static _InfixToPostfixCache: Map<string, {
        accessTime: number;
        result: string[];
    }>;
    isTrue(preprocessors: {
        [key: string]: string;
    }): boolean;
    private static _OperatorPriority;
    private static _Stack;
    static postfixToInfix(postfix: string[]): string;
    /**
     * Converts an infix expression to a postfix expression.
     *
     * This method is used to transform infix expressions, which are more human-readable,
     * into postfix expressions, also known as Reverse Polish Notation (RPN), that can be
     * evaluated more efficiently by a computer. The conversion is based on the operator
     * priority defined in _OperatorPriority.
     *
     * The function employs a stack-based algorithm for the conversion and caches the result
     * to improve performance. The cache keeps track of each converted expression's access time
     * to manage the cache size and optimize memory usage. When the cache size exceeds a specified
     * limit, the least recently accessed items in the cache are deleted.
     *
     * The cache mechanism is particularly helpful for shader compilation, where the same infix
     * expressions might be encountered repeatedly, hence the caching can speed up the process.
     *
     * @param infix - The infix expression to be converted.
     * @returns The postfix expression as an array of strings.
     */
    static infixToPostfix(infix: string): string[];
    private static ClearCache;
}
