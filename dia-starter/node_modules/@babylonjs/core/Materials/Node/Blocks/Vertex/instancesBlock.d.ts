import { NodeMaterialBlock } from "../../nodeMaterialBlock";
import type { NodeMaterialConnectionPoint } from "../../nodeMaterialBlockConnectionPoint";
import type { NodeMaterialBuildState } from "../../nodeMaterialBuildState";
import type { AbstractMesh } from "../../../../Meshes/abstractMesh";
import type { NodeMaterial, NodeMaterialDefines } from "../../nodeMaterial";
import type { SubMesh } from "../../../../Meshes/subMesh";
/**
 * Block used to add support for instances
 * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/copies/instances
 */
export declare class InstancesBlock extends NodeMaterialBlock {
    /**
     * Creates a new InstancesBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the first world row input component
     */
    get world0(): NodeMaterialConnectionPoint;
    /**
     * Gets the second world row input component
     */
    get world1(): NodeMaterialConnectionPoint;
    /**
     * Gets the third world row input component
     */
    get world2(): NodeMaterialConnectionPoint;
    /**
     * Gets the forth world row input component
     */
    get world3(): NodeMaterialConnectionPoint;
    /**
     * Gets the world input component
     */
    get world(): NodeMaterialConnectionPoint;
    /**
     * Gets the output component
     */
    get output(): NodeMaterialConnectionPoint;
    /**
     * Gets the instanceID component
     */
    get instanceID(): NodeMaterialConnectionPoint;
    autoConfigure(material: NodeMaterial, additionalFilteringInfo?: (node: NodeMaterialBlock) => boolean): void;
    prepareDefines(mesh: AbstractMesh, nodeMaterial: NodeMaterial, defines: NodeMaterialDefines, useInstances?: boolean, subMesh?: SubMesh): void;
    protected _buildBlock(state: NodeMaterialBuildState): this;
}
