/**
 * Class used to inline functions in shader code
 */
export declare class ShaderCodeInliner {
    private static readonly _RegexpFindFunctionNameAndType;
    private _sourceCode;
    private _functionDescr;
    private _numMaxIterations;
    /** Gets or sets the token used to mark the functions to inline */
    inlineToken: string;
    /** Gets or sets the debug mode */
    debug: boolean;
    /** Gets the code after the inlining process */
    get code(): string;
    /**
     * Initializes the inliner
     * @param sourceCode shader code source to inline
     * @param numMaxIterations maximum number of iterations (used to detect recursive calls)
     */
    constructor(sourceCode: string, numMaxIterations?: number);
    /**
     * Start the processing of the shader code
     */
    processCode(): void;
    private _collectFunctions;
    private _processInlining;
    private _replaceFunctionCallsByCode;
    private _replaceNames;
}
