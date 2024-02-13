import { InternalTexture } from "../Materials/Textures/internalTexture";
import type { Engine } from "../Engines/engine";
/**
 * Info about the .basis files
 */
declare class BasisFileInfo {
    /**
     * If the file has alpha
     */
    hasAlpha: boolean;
    /**
     * Info about each image of the basis file
     */
    images: Array<{
        levels: Array<{
            width: number;
            height: number;
            transcodedPixels: ArrayBufferView;
        }>;
    }>;
}
/**
 * Result of transcoding a basis file
 */
declare class TranscodeResult {
    /**
     * Info about the .basis file
     */
    fileInfo: BasisFileInfo;
    /**
     * Format to use when loading the file
     */
    format: number;
}
/**
 * Configuration options for the Basis transcoder
 */
export declare class BasisTranscodeConfiguration {
    /**
     * Supported compression formats used to determine the supported output format of the transcoder
     */
    supportedCompressionFormats?: {
        /**
         * etc1 compression format
         */
        etc1?: boolean;
        /**
         * s3tc compression format
         */
        s3tc?: boolean;
        /**
         * pvrtc compression format
         */
        pvrtc?: boolean;
        /**
         * etc2 compression format
         */
        etc2?: boolean;
        /**
         * astc compression format
         */
        astc?: boolean;
        /**
         * bc7 compression format
         */
        bc7?: boolean;
    };
    /**
     * If mipmap levels should be loaded for transcoded images (Default: true)
     */
    loadMipmapLevels?: boolean;
    /**
     * Index of a single image to load (Default: all images)
     */
    loadSingleImage?: number;
}
/**
 * Used to load .Basis files
 * See https://github.com/BinomialLLC/basis_universal/tree/master/webgl
 */
export declare const BasisToolsOptions: {
    /**
     * URL to use when loading the basis transcoder
     */
    JSModuleURL: string;
    /**
     * URL to use when loading the wasm module for the transcoder
     */
    WasmModuleURL: string;
};
/**
 * Get the internal format to be passed to texImage2D corresponding to the .basis format value
 * @param basisFormat format chosen from GetSupportedTranscodeFormat
 * @param engine
 * @returns internal format corresponding to the Basis format
 */
export declare const GetInternalFormatFromBasisFormat: (basisFormat: number, engine: Engine) => number;
/**
 * Transcodes a loaded image file to compressed pixel data
 * @param data image data to transcode
 * @param config configuration options for the transcoding
 * @returns a promise resulting in the transcoded image
 */
export declare const TranscodeAsync: (data: ArrayBuffer | ArrayBufferView, config: BasisTranscodeConfiguration) => Promise<TranscodeResult>;
/**
 * Loads a texture from the transcode result
 * @param texture texture load to
 * @param transcodeResult the result of transcoding the basis file to load from
 */
export declare const LoadTextureFromTranscodeResult: (texture: InternalTexture, transcodeResult: TranscodeResult) => void;
/**
 * Used to load .Basis files
 * See https://github.com/BinomialLLC/basis_universal/tree/master/webgl
 */
export declare const BasisTools: {
    /**
     * URL to use when loading the basis transcoder
     */
    JSModuleURL: string;
    /**
     * URL to use when loading the wasm module for the transcoder
     */
    WasmModuleURL: string;
    /**
     * Get the internal format to be passed to texImage2D corresponding to the .basis format value
     * @param basisFormat format chosen from GetSupportedTranscodeFormat
     * @returns internal format corresponding to the Basis format
     */
    GetInternalFormatFromBasisFormat: (basisFormat: number, engine: Engine) => number;
    /**
     * Transcodes a loaded image file to compressed pixel data
     * @param data image data to transcode
     * @param config configuration options for the transcoding
     * @returns a promise resulting in the transcoded image
     */
    TranscodeAsync: (data: ArrayBuffer | ArrayBufferView, config: BasisTranscodeConfiguration) => Promise<TranscodeResult>;
    /**
     * Loads a texture from the transcode result
     * @param texture texture load to
     * @param transcodeResult the result of transcoding the basis file to load from
     */
    LoadTextureFromTranscodeResult: (texture: InternalTexture, transcodeResult: TranscodeResult) => void;
};
export {};
