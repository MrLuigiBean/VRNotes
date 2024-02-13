import { GLTFLoaderExtension } from "./glTFLoader";
import type { Scene } from "@babylonjs/core/scene.js";
import type { IGLTFLoaderData } from "../glTFFileLoader";
import type { IGLTFRuntime } from "./glTFLoaderInterfaces";
/**
 * @internal
 * @deprecated
 */
export declare class GLTFBinaryExtension extends GLTFLoaderExtension {
    private _bin;
    constructor();
    loadRuntimeAsync(scene: Scene, data: IGLTFLoaderData, rootUrl: string, onSuccess: (gltfRuntime: IGLTFRuntime) => void): boolean;
    loadBufferAsync(gltfRuntime: IGLTFRuntime, id: string, onSuccess: (buffer: ArrayBufferView) => void, onError: (message: string) => void): boolean;
    loadTextureBufferAsync(gltfRuntime: IGLTFRuntime, id: string, onSuccess: (buffer: ArrayBufferView) => void): boolean;
    loadShaderStringAsync(gltfRuntime: IGLTFRuntime, id: string, onSuccess: (shaderString: string) => void): boolean;
}
