import type { ProcessingOptions } from "./shaderProcessingOptions";
import type { WebRequest } from "../../Misc/webRequest";
import type { LoadFileError } from "../../Misc/fileTools";
import type { IOfflineProvider } from "../../Offline/IOfflineProvider";
import type { IFileRequest } from "../../Misc/fileRequest";
import type { ThinEngine } from "../thinEngine";
/** @internal */
export declare class ShaderProcessor {
    private static _MoveCursorRegex;
    static Initialize(options: ProcessingOptions): void;
    static Process(sourceCode: string, options: ProcessingOptions, callback: (migratedCode: string, codeBeforeMigration: string) => void, engine: ThinEngine): void;
    static PreProcess(sourceCode: string, options: ProcessingOptions, callback: (migratedCode: string, codeBeforeMigration: string) => void, engine: ThinEngine): void;
    static Finalize(vertexCode: string, fragmentCode: string, options: ProcessingOptions): {
        vertexCode: string;
        fragmentCode: string;
    };
    private static _ProcessPrecision;
    private static _ExtractOperation;
    private static _BuildSubExpression;
    private static _BuildExpression;
    private static _MoveCursorWithinIf;
    private static _MoveCursor;
    private static _EvaluatePreProcessors;
    private static _PreparePreProcessors;
    private static _ProcessShaderConversion;
    private static _ApplyPreProcessing;
    /** @internal */
    static _ProcessIncludes(sourceCode: string, options: ProcessingOptions, callback: (data: any) => void): void;
    /**
     * Loads a file from a url
     * @param url url to load
     * @param onSuccess callback called when the file successfully loads
     * @param onProgress callback called while file is loading (if the server supports this mode)
     * @param offlineProvider defines the offline provider for caching
     * @param useArrayBuffer defines a boolean indicating that date must be returned as ArrayBuffer
     * @param onError callback called when the file fails to load
     * @returns a file request object
     * @internal
     */
    static _FileToolsLoadFile(url: string, onSuccess: (data: string | ArrayBuffer, responseURL?: string) => void, onProgress?: (ev: ProgressEvent) => void, offlineProvider?: IOfflineProvider, useArrayBuffer?: boolean, onError?: (request?: WebRequest, exception?: LoadFileError) => void): IFileRequest;
}
