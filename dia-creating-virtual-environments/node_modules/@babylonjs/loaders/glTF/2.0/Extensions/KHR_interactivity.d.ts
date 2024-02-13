import { GLTFLoader } from "../glTFLoader";
import type { IGLTFLoaderExtension } from "../glTFLoaderExtension";
/**
 * Loader extension for KHR_interactivity
 */
export declare class KHR_interactivity implements IGLTFLoaderExtension {
    private _loader;
    /**
     * The name of this extension.
     */
    readonly name = "KHR_interactivity";
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    private _pathConverter?;
    /**
     * @internal
     * @param _loader
     */
    constructor(_loader: GLTFLoader);
    dispose(): void;
    onReady(): void;
}
