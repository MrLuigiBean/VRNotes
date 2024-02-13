import { TransformNode } from "@babylonjs/core/Meshes/transformNode.js";
import type { Scene } from "@babylonjs/core/scene.js";
import { ContentDisplay3D } from "./contentDisplay3D";
/**
 * Class used as a root to all buttons
 */
export declare class AbstractButton3D extends ContentDisplay3D {
    /**
     * Creates a new button
     * @param name defines the control name
     */
    constructor(name?: string);
    protected _getTypeName(): string;
    protected _createNode(scene: Scene): TransformNode;
}
