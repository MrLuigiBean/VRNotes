import type { IDisposable } from "../../scene";
/**
 * Configuration for meshoptimizer compression
 */
export interface IMeshoptCompressionConfiguration {
    /**
     * Configuration for the decoder.
     */
    decoder: {
        /**
         * The url to the meshopt decoder library.
         */
        url: string;
    };
}
/**
 * Meshopt compression (https://github.com/zeux/meshoptimizer)
 *
 * This class wraps the meshopt library from https://github.com/zeux/meshoptimizer/tree/master/js.
 *
 * **Encoder**
 *
 * The encoder is not currently implemented.
 *
 * **Decoder**
 *
 * By default, the configuration points to a copy of the meshopt files on the Babylon.js preview CDN (e.g. https://preview.babylonjs.com/meshopt_decoder.js).
 *
 * To update the configuration, use the following code:
 * ```javascript
 *     MeshoptCompression.Configuration = {
 *         decoder: {
 *             url: "<url to the meshopt decoder library>"
 *         }
 *     };
 * ```
 */
export declare class MeshoptCompression implements IDisposable {
    private _decoderModulePromise?;
    /**
     * The configuration. Defaults to the following:
     * ```javascript
     * decoder: {
     *   url: "https://cdn.babylonjs.com/meshopt_decoder.js"
     * }
     * ```
     */
    static Configuration: IMeshoptCompressionConfiguration;
    private static _Default;
    /**
     * Default instance for the meshoptimizer object.
     */
    static get Default(): MeshoptCompression;
    /**
     * Constructor
     */
    constructor();
    /**
     * Stop all async operations and release resources.
     */
    dispose(): void;
    /**
     * Decode meshopt data.
     * @see https://github.com/zeux/meshoptimizer/tree/master/js#decoder
     * @param source The input data.
     * @param count The number of elements.
     * @param stride The stride in bytes.
     * @param mode The compression mode.
     * @param filter The compression filter.
     * @returns a Promise<Uint8Array> that resolves to the decoded data
     */
    decodeGltfBufferAsync(source: Uint8Array, count: number, stride: number, mode: "ATTRIBUTES" | "TRIANGLES" | "INDICES", filter?: string): Promise<Uint8Array>;
}
