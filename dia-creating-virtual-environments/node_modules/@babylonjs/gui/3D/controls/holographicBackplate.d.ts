import type { TransformNode } from "@babylonjs/core/Meshes/transformNode.js";
import type { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import type { Scene } from "@babylonjs/core/scene.js";
import { FluentBackplateMaterial } from "../materials/fluentBackplate/fluentBackplateMaterial";
import { Control3D } from "./control3D";
/**
 * Class used to create a holographic backplate in 3D
 * @since 5.0.0
 */
export declare class HolographicBackplate extends Control3D {
    private _shareMaterials;
    /**
     * Base Url for the button model.
     */
    static MODEL_BASE_URL: string;
    /**
     * File name for the button model.
     */
    static MODEL_FILENAME: string;
    private _model;
    private _material;
    /**
     * Rendering ground id of the backplate mesh.
     */
    set renderingGroupId(id: number);
    get renderingGroupId(): number;
    /**
     * Gets the material used by the backplate
     */
    get material(): FluentBackplateMaterial;
    /**
     * Gets a boolean indicating if this backplate shares its material with other HolographicBackplates
     */
    get shareMaterials(): boolean;
    /**
     * Creates a new holographic backplate
     * @param name defines the control name
     * @param _shareMaterials
     */
    constructor(name?: string, _shareMaterials?: boolean);
    protected _getTypeName(): string;
    protected _createNode(scene: Scene): TransformNode;
    private _createMaterial;
    protected _affectMaterial(mesh: Mesh): void;
    /**
     * Releases all associated resources
     */
    dispose(): void;
}
