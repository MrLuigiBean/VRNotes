import type { TransformNode } from "@babylonjs/core/Meshes/transformNode.js";
import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh.js";
import type { Material } from "@babylonjs/core/Materials/material.js";
import type { Scene } from "@babylonjs/core/scene.js";
import { AbstractButton3D } from "./abstractButton3D";
import type { AdvancedDynamicTexture } from "../../2D/advancedDynamicTexture";
/**
 * Options used to create a button in 3D
 */
export interface IButton3DCreationOptions {
    /**
     * Width of the button. Default: 1
     */
    width?: number;
    /**
     * Height of the button. Default: 1
     */
    height?: number;
    /**
     * Depth of the button. Default: 0.08
     */
    depth?: number;
}
/**
 * Class used to create a button in 3D
 */
export declare class Button3D extends AbstractButton3D {
    /** @internal */
    protected _currentMaterial: Material;
    protected _options: IButton3DCreationOptions;
    protected _height: number;
    protected _depth: number;
    /**
     * Creates a new button
     * @param name defines the control name
     */
    constructor(name?: string, options?: IButton3DCreationOptions);
    /**
     * Apply the facade texture (created from the content property).
     * @param facadeTexture defines the AdvancedDynamicTexture to use
     */
    protected _applyFacade(facadeTexture: AdvancedDynamicTexture): void;
    protected _getTypeName(): string;
    protected _createNode(scene: Scene): TransformNode;
    protected _affectMaterial(mesh: AbstractMesh): void;
    /**
     * Releases all associated resources
     */
    dispose(): void;
}
