import type { IGLTFLoaderExtension } from "../glTFLoaderExtension";
import { GLTFLoader } from "../glTFLoader";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_mesh_quantization/README.md)
 */
export declare class KHR_mesh_quantization implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name = "KHR_mesh_quantization";
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
}
