import { NodeMaterialBlock } from "../nodeMaterialBlock";
import type { NodeMaterialBuildState } from "../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../nodeMaterialBlockConnectionPoint";
import type { Scene } from "../../../scene";
/**
 * block used to Generate a Worley Noise 3D Noise Pattern
 */
export declare class WorleyNoise3DBlock extends NodeMaterialBlock {
    /** Gets or sets a boolean indicating that normal should be inverted on X axis */
    manhattanDistance: boolean;
    /**
     * Creates a new WorleyNoise3DBlock
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
     * Gets the jitter input component
     */
    get jitter(): NodeMaterialConnectionPoint;
    /**
     * Gets the output component
     */
    get output(): NodeMaterialConnectionPoint;
    /**
     * Gets the x component
     */
    get x(): NodeMaterialConnectionPoint;
    /**
     * Gets the y component
     */
    get y(): NodeMaterialConnectionPoint;
    protected _buildBlock(state: NodeMaterialBuildState): this | undefined;
    /**
     * Exposes the properties to the UI?
     */
    protected _dumpPropertiesCode(): string;
    /**
     * Exposes the properties to the Serialize?
     */
    serialize(): any;
    /**
     * Exposes the properties to the deserialize?
     * @param serializationObject
     * @param scene
     * @param rootUrl
     */
    _deserialize(serializationObject: any, scene: Scene, rootUrl: string): void;
}
