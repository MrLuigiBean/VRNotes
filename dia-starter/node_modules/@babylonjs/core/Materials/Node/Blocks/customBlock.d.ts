import { NodeMaterialBlock } from "../nodeMaterialBlock";
import type { NodeMaterialBuildState } from "../nodeMaterialBuildState";
import type { Scene } from "../../../scene";
/**
 * Custom block created from user-defined json
 */
export declare class CustomBlock extends NodeMaterialBlock {
    private _options;
    private _code;
    private _inputSamplers;
    /**
     * Gets or sets the options for this custom block
     */
    get options(): any;
    set options(options: any);
    /**
     * Creates a new CustomBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    protected _buildBlock(state: NodeMaterialBuildState): this;
    protected _dumpPropertiesCode(): string;
    serialize(): any;
    _deserialize(serializationObject: any, scene: Scene, rootUrl: string): void;
    private _deserializeOptions;
    private _findInputByName;
}
