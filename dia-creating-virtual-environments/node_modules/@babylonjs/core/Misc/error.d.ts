/**
 * Base error. Due to limitations of typedoc-check and missing documentation
 * in lib.es5.d.ts, cannot extend Error directly for RuntimeError.
 * @ignore
 */
export declare abstract class BaseError extends Error {
    protected static _setPrototypeOf: (o: any, proto: object | null) => any;
}
/**
 * Error codes for BaseError
 */
export declare const ErrorCodes: {
    /** Invalid or empty mesh vertex positions. */
    readonly MeshInvalidPositionsError: 0;
    /** Unsupported texture found. */
    readonly UnsupportedTextureError: 1000;
    /** Unexpected magic number found in GLTF file header. */
    readonly GLTFLoaderUnexpectedMagicError: 2000;
    /** SceneLoader generic error code. Ideally wraps the inner exception. */
    readonly SceneLoaderError: 3000;
    /** Load file error */
    readonly LoadFileError: 4000;
    /** Request file error */
    readonly RequestFileError: 4001;
    /** Read file error */
    readonly ReadFileError: 4002;
};
/**
 * Error code type
 */
export type ErrorCodesType = (typeof ErrorCodes)[keyof typeof ErrorCodes];
/**
 * Application runtime error
 */
export declare class RuntimeError extends BaseError {
    /**
     * The error code
     */
    errorCode: ErrorCodesType;
    /**
     * The error that caused this outer error
     */
    innerError?: Error;
    /**
     * Creates a new RuntimeError
     * @param message defines the message of the error
     * @param errorCode the error code
     * @param innerError the error that caused the outer error
     */
    constructor(message: string, errorCode: ErrorCodesType, innerError?: Error);
}
