import { NodeMaterialBlock } from "../nodeMaterialBlock";
import type { NodeMaterialBuildState } from "../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../nodeMaterialBlockConnectionPoint";
import type { Scene } from "../../../scene";
import type { AbstractMesh } from "../../../Meshes/abstractMesh";
import type { NodeMaterial, NodeMaterialDefines } from "../nodeMaterial";
/**
 * Block used to transform a vector (2, 3 or 4) with a matrix. It will generate a Vector4
 */
export declare class TransformBlock extends NodeMaterialBlock {
    /**
     * Defines the value to use to complement W value to transform it to a Vector4
     */
    complementW: number;
    /**
     * Defines the value to use to complement z value to transform it to a Vector4
     */
    complementZ: number;
    /**
     * Creates a new TransformBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the vector input
     */
    get vector(): NodeMaterialConnectionPoint;
    /**
     * Gets the output component
     */
    get output(): NodeMaterialConnectionPoint;
    /**
     * Gets the xyz output component
     */
    get xyz(): NodeMaterialConnectionPoint;
    /**
     * Gets the matrix transform input
     */
    get transform(): NodeMaterialConnectionPoint;
    protected _buildBlock(state: NodeMaterialBuildState): this;
    /**
     * Update defines for shader compilation
     * @param mesh defines the mesh to be rendered
     * @param nodeMaterial defines the node material requesting the update
     * @param defines defines the material defines to update
     */
    prepareDefines(mesh: AbstractMesh, nodeMaterial: NodeMaterial, defines: NodeMaterialDefines): void;
    serialize(): any;
    _deserialize(serializationObject: any, scene: Scene, rootUrl: string): void;
    protected _dumpPropertiesCode(): string;
}
