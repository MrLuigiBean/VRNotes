import { NodeMaterialBlock } from "../nodeMaterialBlock";
import type { NodeMaterialBuildState } from "../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../nodeMaterialBlockConnectionPoint";
import type { Scene } from "../../../scene.js";
export declare enum MeshAttributeExistsBlockTypes {
    None = 0,
    Normal = 1,
    Tangent = 2,
    VertexColor = 3,
    UV1 = 4,
    UV2 = 5,
    UV3 = 6,
    UV4 = 7,
    UV5 = 8,
    UV6 = 9
}
/**
 * Block used to check if Mesh attribute of specified type exists
 * and provide an alternative fallback input for to use in such case
 */
export declare class MeshAttributeExistsBlock extends NodeMaterialBlock {
    /**
     * Creates a new MeshAttributeExistsBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Defines which mesh attribute to use
     */
    attributeType: MeshAttributeExistsBlockTypes;
    /**
     * Gets the input component
     */
    get input(): NodeMaterialConnectionPoint;
    /**
     * Gets the fallback component when speciefied attribute doesn't exist
     */
    get fallback(): NodeMaterialConnectionPoint;
    /**
     * Gets the output component
     */
    get output(): NodeMaterialConnectionPoint;
    protected _buildBlock(state: NodeMaterialBuildState): this;
    serialize(): any;
    _deserialize(serializationObject: any, scene: Scene, rootUrl: string): void;
    protected _dumpPropertiesCode(): string;
}
