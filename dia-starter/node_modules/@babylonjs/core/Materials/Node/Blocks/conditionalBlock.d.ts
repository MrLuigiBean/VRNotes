import { NodeMaterialBlock } from "../nodeMaterialBlock";
import type { NodeMaterialBuildState } from "../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../nodeMaterialBlockConnectionPoint";
import type { Scene } from "../../../scene";
/**
 * Operations supported by the ConditionalBlock block
 */
export declare enum ConditionalBlockConditions {
    /** Equal */
    Equal = 0,
    /** NotEqual */
    NotEqual = 1,
    /** LessThan */
    LessThan = 2,
    /** GreaterThan */
    GreaterThan = 3,
    /** LessOrEqual */
    LessOrEqual = 4,
    /** GreaterOrEqual */
    GreaterOrEqual = 5,
    /** Logical Exclusive OR */
    Xor = 6,
    /** Logical Or */
    Or = 7,
    /** Logical And */
    And = 8
}
/**
 * Block used to apply conditional operation between floats
 * @since 5.0.0
 */
export declare class ConditionalBlock extends NodeMaterialBlock {
    /**
     * Gets or sets the condition applied by the block
     */
    condition: ConditionalBlockConditions;
    /**
     * Creates a new ConditionalBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the first operand component
     */
    get a(): NodeMaterialConnectionPoint;
    /**
     * Gets the second operand component
     */
    get b(): NodeMaterialConnectionPoint;
    /**
     * Gets the value to return if condition is true
     */
    get true(): NodeMaterialConnectionPoint;
    /**
     * Gets the value to return if condition is false
     */
    get false(): NodeMaterialConnectionPoint;
    /**
     * Gets the output component
     */
    get output(): NodeMaterialConnectionPoint;
    protected _buildBlock(state: NodeMaterialBuildState): this;
    serialize(): any;
    _deserialize(serializationObject: any, scene: Scene, rootUrl: string): void;
    protected _dumpPropertiesCode(): string;
}
