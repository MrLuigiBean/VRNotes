import { NodeMaterialBlock } from "../../nodeMaterialBlock";
import type { NodeMaterialBuildState } from "../../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../../nodeMaterialBlockConnectionPoint";
import type { NodeMaterial, NodeMaterialDefines } from "../../nodeMaterial";
import type { AbstractMesh } from "../../../../Meshes/abstractMesh";
import type { Scene } from "../../../../scene";
import type { Nullable } from "../../../../types";
/**
 * Block used to implement the iridescence module of the PBR material
 */
export declare class IridescenceBlock extends NodeMaterialBlock {
    /**
     * Create a new IridescenceBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Initialize the block and prepare the context for build
     * @param state defines the state that will be used for the build
     */
    initialize(state: NodeMaterialBuildState): void;
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the intensity input component
     */
    get intensity(): NodeMaterialConnectionPoint;
    /**
     * Gets the indexOfRefraction input component
     */
    get indexOfRefraction(): NodeMaterialConnectionPoint;
    /**
     * Gets the thickness input component
     */
    get thickness(): NodeMaterialConnectionPoint;
    /**
     * Gets the iridescence object output component
     */
    get iridescence(): NodeMaterialConnectionPoint;
    autoConfigure(): void;
    prepareDefines(mesh: AbstractMesh, nodeMaterial: NodeMaterial, defines: NodeMaterialDefines): void;
    /**
     * Gets the main code of the block (fragment side)
     * @param iridescenceBlock instance of a IridescenceBlock or null if the code must be generated without an active iridescence module
     * @returns the shader code
     */
    static GetCode(iridescenceBlock: Nullable<IridescenceBlock>): string;
    protected _buildBlock(state: NodeMaterialBuildState): this;
    serialize(): any;
    _deserialize(serializationObject: any, scene: Scene, rootUrl: string): void;
}
