import { NodeGeometryBlock } from "../nodeGeometryBlock";
import type { NodeGeometryConnectionPoint } from "../nodeGeometryBlockConnectionPoint";
/**
 * Conditions supported by the condition block
 */
export declare enum ConditionBlockTests {
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
 * Block used to evaluate a condition and return a true or false value
 */
export declare class ConditionBlock extends NodeGeometryBlock {
    /**
     * Gets or sets the test used by the block
     */
    test: ConditionBlockTests;
    /**
     * Create a new ConditionBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the left input component
     */
    get left(): NodeGeometryConnectionPoint;
    /**
     * Gets the right input component
     */
    get right(): NodeGeometryConnectionPoint;
    /**
     * Gets the ifTrue input component
     */
    get ifTrue(): NodeGeometryConnectionPoint;
    /**
     * Gets the ifFalse input component
     */
    get ifFalse(): NodeGeometryConnectionPoint;
    /**
     * Gets the output component
     */
    get output(): NodeGeometryConnectionPoint;
    protected _buildBlock(): void;
    protected _dumpPropertiesCode(): string;
    /**
     * Serializes this block in a JSON representation
     * @returns the serialized block object
     */
    serialize(): any;
    _deserialize(serializationObject: any): void;
}
