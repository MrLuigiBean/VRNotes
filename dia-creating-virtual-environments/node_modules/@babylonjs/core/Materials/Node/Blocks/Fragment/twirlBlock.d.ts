import { NodeMaterialBlock } from "../../nodeMaterialBlock";
import type { NodeMaterialBuildState } from "../../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../../nodeMaterialBlockConnectionPoint";
/**
 * Block used to generate a twirl
 */
export declare class TwirlBlock extends NodeMaterialBlock {
    /**
     * Creates a new TwirlBlock
     * @param name defines the block name
     */
    constructor(name: string);
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
     * Gets the strength component
     */
    get strength(): NodeMaterialConnectionPoint;
    /**
     * Gets the center component
     */
    get center(): NodeMaterialConnectionPoint;
    /**
     * Gets the offset component
     */
    get offset(): NodeMaterialConnectionPoint;
    /**
     * Gets the output component
     */
    get output(): NodeMaterialConnectionPoint;
    /**
     * Gets the x output component
     */
    get x(): NodeMaterialConnectionPoint;
    /**
     * Gets the y output component
     */
    get y(): NodeMaterialConnectionPoint;
    autoConfigure(): void;
    protected _buildBlock(state: NodeMaterialBuildState): this;
}
