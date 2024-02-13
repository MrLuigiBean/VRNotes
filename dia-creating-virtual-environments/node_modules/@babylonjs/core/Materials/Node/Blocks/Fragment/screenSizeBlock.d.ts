import { NodeMaterialBlock } from "../../nodeMaterialBlock";
import type { NodeMaterialBuildState } from "../../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../../nodeMaterialBlockConnectionPoint";
import type { Effect } from "../../../effect";
/**
 * Block used to get the screen sizes
 */
export declare class ScreenSizeBlock extends NodeMaterialBlock {
    private _varName;
    private _scene;
    /**
     * Creates a new ScreenSizeBlock
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
     * Gets the x component
     */
    get x(): NodeMaterialConnectionPoint;
    /**
     * Gets the y component
     */
    get y(): NodeMaterialConnectionPoint;
    bind(effect: Effect): void;
    protected writeOutputs(state: NodeMaterialBuildState, varName: string): string;
    protected _buildBlock(state: NodeMaterialBuildState): this;
}
