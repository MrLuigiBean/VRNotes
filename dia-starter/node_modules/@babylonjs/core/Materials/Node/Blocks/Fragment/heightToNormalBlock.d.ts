import { NodeMaterialBlock } from "../../nodeMaterialBlock";
import type { NodeMaterialBuildState } from "../../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../../nodeMaterialBlockConnectionPoint";
import type { Scene } from "../../../../scene";
/**
 * Block used to convert a height vector to a normal
 */
export declare class HeightToNormalBlock extends NodeMaterialBlock {
    /**
     * Creates a new HeightToNormalBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Defines if the output should be generated in world or tangent space.
     * Note that in tangent space the result is also scaled by 0.5 and offsetted by 0.5 so that it can directly be used as a PerturbNormal.normalMapColor input
     */
    generateInWorldSpace: boolean;
    /**
     * Defines that the worldNormal input will be normalized by the HeightToNormal block before being used
     */
    automaticNormalizationNormal: boolean;
    /**
     * Defines that the worldTangent input will be normalized by the HeightToNormal block before being used
     */
    automaticNormalizationTangent: boolean;
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the input component
     */
    get input(): NodeMaterialConnectionPoint;
    /**
     * Gets the position component
     */
    get worldPosition(): NodeMaterialConnectionPoint;
    /**
     * Gets the normal component
     */
    get worldNormal(): NodeMaterialConnectionPoint;
    /**
     * Gets the tangent component
     */
    get worldTangent(): NodeMaterialConnectionPoint;
    /**
     * Gets the output component
     */
    get output(): NodeMaterialConnectionPoint;
    /**
     * Gets the xyz component
     */
    get xyz(): NodeMaterialConnectionPoint;
    protected _buildBlock(state: NodeMaterialBuildState): this;
    protected _dumpPropertiesCode(): string;
    serialize(): any;
    _deserialize(serializationObject: any, scene: Scene, rootUrl: string): void;
}
