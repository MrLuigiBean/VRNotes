import { NodeMaterialBlock } from "../nodeMaterialBlock";
import type { NodeMaterialBuildState } from "../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../nodeMaterialBlockConnectionPoint";
import type { Scene } from "../../../scene";
/**
 * block used to Generate Fractal Brownian Motion Clouds
 */
export declare class CloudBlock extends NodeMaterialBlock {
    /** Gets or sets the number of octaves */
    octaves: number;
    /**
     * Creates a new CloudBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the seed input component
     */
    get seed(): NodeMaterialConnectionPoint;
    /**
     * Gets the chaos input component
     */
    get chaos(): NodeMaterialConnectionPoint;
    /**
     * Gets the offset X input component
     */
    get offsetX(): NodeMaterialConnectionPoint;
    /**
     * Gets the offset Y input component
     */
    get offsetY(): NodeMaterialConnectionPoint;
    /**
     * Gets the offset Z input component
     */
    get offsetZ(): NodeMaterialConnectionPoint;
    /**
     * Gets the output component
     */
    get output(): NodeMaterialConnectionPoint;
    protected _buildBlock(state: NodeMaterialBuildState): this | undefined;
    protected _dumpPropertiesCode(): string;
    serialize(): any;
    _deserialize(serializationObject: any, scene: Scene, rootUrl: string): void;
}
