import type { Nullable } from "@babylonjs/core/types.js";
import type { IGLTFLoaderExtension } from "../glTFLoaderExtension";
import { GLTFLoader } from "../glTFLoader";
import { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh.js";
import type { INode, IMeshPrimitive, IMesh } from "../glTFLoaderInterfaces";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_variants/README.md)
 */
export declare class KHR_materials_variants implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name = "KHR_materials_variants";
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    private _loader;
    private _variants?;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /**
     * Gets the list of available variant names for this asset.
     * @param rootMesh The glTF root mesh
     * @returns the list of all the variant names for this model
     */
    static GetAvailableVariants(rootMesh: Mesh): string[];
    /**
     * Gets the list of available variant names for this asset.
     * @param rootMesh The glTF root mesh
     * @returns the list of all the variant names for this model
     */
    getAvailableVariants(rootMesh: Mesh): string[];
    /**
     * Select a variant given a variant name or a list of variant names.
     * @param rootMesh The glTF root mesh
     * @param variantName The variant name(s) to select.
     */
    static SelectVariant(rootMesh: Mesh, variantName: string | string[]): void;
    /**
     * Select a variant given a variant name or a list of variant names.
     * @param rootMesh The glTF root mesh
     * @param variantName The variant name(s) to select.
     */
    selectVariant(rootMesh: Mesh, variantName: string | string[]): void;
    /**
     * Reset back to the original before selecting a variant.
     * @param rootMesh The glTF root mesh
     */
    static Reset(rootMesh: Mesh): void;
    /**
     * Reset back to the original before selecting a variant.
     * @param rootMesh The glTF root mesh
     */
    reset(rootMesh: Mesh): void;
    /**
     * Gets the last selected variant name(s) or null if original.
     * @param rootMesh The glTF root mesh
     * @returns The selected variant name(s).
     */
    static GetLastSelectedVariant(rootMesh: Mesh): Nullable<string | string[]>;
    /**
     * Gets the last selected variant name(s) or null if original.
     * @param rootMesh The glTF root mesh
     * @returns The selected variant name(s).
     */
    getLastSelectedVariant(rootMesh: Mesh): Nullable<string | string[]>;
    private static _GetExtensionMetadata;
    /** @internal */
    onLoading(): void;
    /**
     * @internal
     */
    _loadMeshPrimitiveAsync(context: string, name: string, node: INode, mesh: IMesh, primitive: IMeshPrimitive, assign: (babylonMesh: AbstractMesh) => void): Nullable<Promise<AbstractMesh>>;
}
