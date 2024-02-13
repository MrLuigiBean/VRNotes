import type { InternalTexture } from "../Materials/Textures/internalTexture";
import type { ThinEngine } from "../Engines/thinEngine";
import type { Nullable } from "../types";
import type { IDecodedData, IKTX2DecoderOptions } from "../Materials/Textures/ktx2decoderTypes.js";
/**
 * Class that defines the default KTX2 decoder options.
 *
 * This class is useful for providing options to the KTX2 decoder to control how the source data is transcoded.
 */
export declare class DefaultKTX2DecoderOptions {
    private _isDirty;
    /**
     * Gets the dirty flag
     */
    get isDirty(): boolean;
    private _useRGBAIfASTCBC7NotAvailableWhenUASTC?;
    /**
     * force a (uncompressed) RGBA transcoded format if transcoding a UASTC source format and ASTC + BC7 are not available as a compressed transcoded format
     */
    get useRGBAIfASTCBC7NotAvailableWhenUASTC(): boolean | undefined;
    set useRGBAIfASTCBC7NotAvailableWhenUASTC(value: boolean | undefined);
    private _useRGBAIfOnlyBC1BC3AvailableWhenUASTC?;
    /**
     * force a (uncompressed) RGBA transcoded format if transcoding a UASTC source format and only BC1 or BC3 are available as a compressed transcoded format.
     * This property is true by default to favor speed over memory, because currently transcoding from UASTC to BC1/3 is slow because the transcoder transcodes
     * to uncompressed and then recompresses the texture
     */
    get useRGBAIfOnlyBC1BC3AvailableWhenUASTC(): boolean | undefined;
    set useRGBAIfOnlyBC1BC3AvailableWhenUASTC(value: boolean | undefined);
    private _forceRGBA?;
    /**
     * force to always use (uncompressed) RGBA for transcoded format
     */
    get forceRGBA(): boolean | undefined;
    set forceRGBA(value: boolean | undefined);
    private _forceR8?;
    /**
     * force to always use (uncompressed) R8 for transcoded format
     */
    get forceR8(): boolean | undefined;
    set forceR8(value: boolean | undefined);
    private _forceRG8?;
    /**
     * force to always use (uncompressed) RG8 for transcoded format
     */
    get forceRG8(): boolean | undefined;
    set forceRG8(value: boolean | undefined);
    private _bypassTranscoders?;
    /**
     * list of transcoders to bypass when looking for a suitable transcoder. The available transcoders are:
     *      UniversalTranscoder_UASTC_ASTC
     *      UniversalTranscoder_UASTC_BC7
     *      UniversalTranscoder_UASTC_RGBA_UNORM
     *      UniversalTranscoder_UASTC_RGBA_SRGB
     *      UniversalTranscoder_UASTC_R8_UNORM
     *      UniversalTranscoder_UASTC_RG8_UNORM
     *      MSCTranscoder
     */
    get bypassTranscoders(): string[] | undefined;
    set bypassTranscoders(value: string[] | undefined);
    private _ktx2DecoderOptions;
    /** @internal */
    _getKTX2DecoderOptions(): IKTX2DecoderOptions;
}
/**
 * Class for loading KTX2 files
 */
export declare class KhronosTextureContainer2 {
    private static _WorkerPoolPromise?;
    private static _DecoderModulePromise?;
    /**
     * URLs to use when loading the KTX2 decoder module as well as its dependencies
     * If a url is null, the default url is used (pointing to https://preview.babylonjs.com)
     * Note that jsDecoderModule can't be null and that the other dependencies will only be loaded if necessary
     * Urls you can change:
     *     URLConfig.jsDecoderModule
     *     URLConfig.wasmUASTCToASTC
     *     URLConfig.wasmUASTCToBC7
     *     URLConfig.wasmUASTCToRGBA_UNORM
     *     URLConfig.wasmUASTCToRGBA_SRGB
     *     URLConfig.wasmUASTCToR8_UNORM
     *     URLConfig.wasmUASTCToRG8_UNORM
     *     URLConfig.jsMSCTranscoder
     *     URLConfig.wasmMSCTranscoder
     *     URLConfig.wasmZSTDDecoder
     * You can see their default values in this PG: https://playground.babylonjs.com/#EIJH8L#29
     */
    static URLConfig: {
        jsDecoderModule: string;
        wasmUASTCToASTC: Nullable<string>;
        wasmUASTCToBC7: Nullable<string>;
        wasmUASTCToRGBA_UNORM: Nullable<string>;
        wasmUASTCToRGBA_SRGB: Nullable<string>;
        wasmUASTCToR8_UNORM: Nullable<string>;
        wasmUASTCToRG8_UNORM: Nullable<string>;
        jsMSCTranscoder: Nullable<string>;
        wasmMSCTranscoder: Nullable<string>;
        wasmZSTDDecoder: Nullable<string>;
    };
    /**
     * Default number of workers used to handle data decoding
     */
    static DefaultNumWorkers: number;
    /**
     * Default configuration for the KTX2 decoder.
     * The options defined in this way have priority over those passed when creating a KTX2 texture with new Texture(...).
     */
    static DefaultDecoderOptions: DefaultKTX2DecoderOptions;
    private static GetDefaultNumWorkers;
    private _engine;
    private static _Initialize;
    /**
     * Constructor
     * @param engine The engine to use
     * @param numWorkers The number of workers for async operations. Specify `0` to disable web workers and run synchronously in the current context.
     */
    constructor(engine: ThinEngine, numWorkers?: number);
    /**
     * @internal
     */
    uploadAsync(data: ArrayBufferView, internalTexture: InternalTexture, options?: IKTX2DecoderOptions & IDecodedData): Promise<void>;
    protected _createTexture(data: IDecodedData, internalTexture: InternalTexture, options?: IKTX2DecoderOptions & IDecodedData): void;
    /**
     * Checks if the given data starts with a KTX2 file identifier.
     * @param data the data to check
     * @returns true if the data is a KTX2 file or false otherwise
     */
    static IsValid(data: ArrayBufferView): boolean;
}
