import type { Nullable } from "@babylonjs/core/types.js";
import type { Material } from "@babylonjs/core/Materials/material.js";
import type { IMaterial } from "../glTFLoaderInterfaces";
import type { IGLTFLoaderExtension } from "../glTFLoaderExtension";
import { GLTFLoader } from "../glTFLoader";
/** @internal */
export declare class MSFT_sRGBFactors implements IGLTFLoaderExtension {
    /** @internal */
    readonly name = "MSFT_sRGBFactors";
    /** @internal */
    enabled: boolean;
    private _loader;
    /** @internal */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /** @internal */
    loadMaterialPropertiesAsync(context: string, material: IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
}
