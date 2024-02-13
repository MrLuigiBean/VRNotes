import { NodeMaterialBlock } from "../../nodeMaterialBlock";
import type { NodeMaterialBuildState } from "../../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../../nodeMaterialBlockConnectionPoint";
/**
 * Block used to make gl_FragCoord available
 */
export declare class FragCoordBlock extends NodeMaterialBlock {
    /**
     * Creates a new FragCoordBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the xy component
     */
    get xy(): NodeMaterialConnectionPoint;
    /**
     * Gets the xyz component
     */
    get xyz(): NodeMaterialConnectionPoint;
    /**
     * Gets the xyzw component
     */
    get xyzw(): NodeMaterialConnectionPoint;
    /**
     * Gets the x component
     */
    get x(): NodeMaterialConnectionPoint;
    /**
     * Gets the y component
     */
    get y(): NodeMaterialConnectionPoint;
    /**
     * Gets the z component
     */
    get z(): NodeMaterialConnectionPoint;
    /**
     * Gets the w component
     */
    get output(): NodeMaterialConnectionPoint;
    protected writeOutputs(state: NodeMaterialBuildState): string;
    protected _buildBlock(state: NodeMaterialBuildState): this;
}
