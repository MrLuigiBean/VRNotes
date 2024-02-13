import { NodeMaterialBlock } from "../../nodeMaterialBlock";
import type { NodeMaterialBuildState } from "../../nodeMaterialBuildState";
import { NodeMaterialBlockTargets } from "../../Enums/nodeMaterialBlockTargets";
import type { NodeMaterialConnectionPoint } from "../../nodeMaterialBlockConnectionPoint";
import type { NodeMaterial, NodeMaterialDefines } from "../../nodeMaterial";
import type { AbstractMesh } from "../../../../Meshes/abstractMesh";
/**
 * Block used to implement TBN matrix
 */
export declare class TBNBlock extends NodeMaterialBlock {
    /**
     * Create a new TBNBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Initialize the block and prepare the context for build
     * @param state defines the state that will be used for the build
     */
    initialize(state: NodeMaterialBuildState): void;
    /**
     * Gets the normal input component
     */
    get normal(): NodeMaterialConnectionPoint;
    /**
     * Gets the tangent input component
     */
    get tangent(): NodeMaterialConnectionPoint;
    /**
     * Gets the world matrix input component
     */
    get world(): NodeMaterialConnectionPoint;
    /**
     * Gets the TBN output component
     */
    get TBN(): NodeMaterialConnectionPoint;
    /**
     * Gets the row0 of the output matrix
     */
    get row0(): NodeMaterialConnectionPoint;
    /**
     * Gets the row1 of the output matrix
     */
    get row1(): NodeMaterialConnectionPoint;
    /**
     * Gets the row2 of the output matrix
     */
    get row2(): NodeMaterialConnectionPoint;
    get target(): NodeMaterialBlockTargets;
    set target(value: NodeMaterialBlockTargets);
    autoConfigure(material: NodeMaterial, additionalFilteringInfo?: (node: NodeMaterialBlock) => boolean): void;
    prepareDefines(mesh: AbstractMesh, nodeMaterial: NodeMaterial, defines: NodeMaterialDefines): void;
    protected _buildBlock(state: NodeMaterialBuildState): this;
}
