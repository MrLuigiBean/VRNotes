import type { Nullable } from "@babylonjs/core/types.js";
import type { TransformNode } from "@babylonjs/core/Meshes/transformNode.js";
import type { Camera } from "@babylonjs/core/Cameras/camera.js";
import type { INode, ICamera, IMaterial } from "../glTFLoaderInterfaces";
import type { IGLTFLoaderExtension } from "../glTFLoaderExtension";
import { GLTFLoader } from "../glTFLoader";
import type { Material } from "@babylonjs/core/Materials/material.js";
/**
 * Store glTF extras (if present) in BJS objects' metadata
 */
export declare class ExtrasAsMetadata implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name = "ExtrasAsMetadata";
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    private _loader;
    private _assignExtras;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /**
     * @internal
     */
    loadNodeAsync(context: string, node: INode, assign: (babylonTransformNode: TransformNode) => void): Nullable<Promise<TransformNode>>;
    /**
     * @internal
     */
    loadCameraAsync(context: string, camera: ICamera, assign: (babylonCamera: Camera) => void): Nullable<Promise<Camera>>;
    /**
     * @internal
     */
    createMaterial(context: string, material: IMaterial, babylonDrawMode: number): Nullable<Material>;
}
