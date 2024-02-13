import type { Nullable } from "@babylonjs/core/types.js";
import { Observable } from "@babylonjs/core/Misc/observable.js";
import type { Material } from "@babylonjs/core/Materials/material.js";
import type { TransformNode } from "@babylonjs/core/Meshes/transformNode.js";
import type { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import type { INode, IMaterial, IBuffer, IScene } from "../glTFLoaderInterfaces";
import type { IGLTFLoaderExtension } from "../glTFLoaderExtension";
import { GLTFLoader } from "../glTFLoader";
import type { IProperty } from "babylonjs-gltf2interface";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/MSFT_lod/README.md)
 */
export declare class MSFT_lod implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name = "MSFT_lod";
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    /**
     * Defines a number that determines the order the extensions are applied.
     */
    order: number;
    /**
     * Maximum number of LODs to load, starting from the lowest LOD.
     */
    maxLODsToLoad: number;
    /**
     * Observable raised when all node LODs of one level are loaded.
     * The event data is the index of the loaded LOD starting from zero.
     * Dispose the loader to cancel the loading of the next level of LODs.
     */
    onNodeLODsLoadedObservable: Observable<number>;
    /**
     * Observable raised when all material LODs of one level are loaded.
     * The event data is the index of the loaded LOD starting from zero.
     * Dispose the loader to cancel the loading of the next level of LODs.
     */
    onMaterialLODsLoadedObservable: Observable<number>;
    private _loader;
    private _bufferLODs;
    private _nodeIndexLOD;
    private _nodeSignalLODs;
    private _nodePromiseLODs;
    private _nodeBufferLODs;
    private _materialIndexLOD;
    private _materialSignalLODs;
    private _materialPromiseLODs;
    private _materialBufferLODs;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /** @internal */
    onReady(): void;
    /**
     * @internal
     */
    loadSceneAsync(context: string, scene: IScene): Nullable<Promise<void>>;
    /**
     * @internal
     */
    loadNodeAsync(context: string, node: INode, assign: (babylonTransformNode: TransformNode) => void): Nullable<Promise<TransformNode>>;
    /**
     * @internal
     */
    _loadMaterialAsync(context: string, material: IMaterial, babylonMesh: Nullable<Mesh>, babylonDrawMode: number, assign: (babylonMaterial: Material) => void): Nullable<Promise<Material>>;
    /**
     * @internal
     */
    _loadUriAsync(context: string, property: IProperty, uri: string): Nullable<Promise<ArrayBufferView>>;
    /**
     * @internal
     */
    loadBufferAsync(context: string, buffer: IBuffer, byteOffset: number, byteLength: number): Nullable<Promise<ArrayBufferView>>;
    private _loadBufferLOD;
    /**
     * Gets an array of LOD properties from lowest to highest.
     * @param context
     * @param property
     * @param array
     * @param ids
     */
    private _getLODs;
    private _disposeTransformNode;
    private _disposeMaterials;
}
