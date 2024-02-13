import { NodeGeometryBlock } from "../nodeGeometryBlock";
import type { NodeGeometryConnectionPoint } from "../nodeGeometryBlockConnectionPoint";
/**
 * Operations supported by the Math block
 */
export declare enum MathBlockOperations {
    /** Add */
    Add = 0,
    /** Subtract */
    Subtract = 1,
    /** Multiply */
    Multiply = 2,
    /** Divide */
    Divide = 3,
    /** Max */
    Max = 4,
    /** Min */
    Min = 5
}
/**
 * Block used to apply math functions
 */
export declare class MathBlock extends NodeGeometryBlock {
    /**
     * Gets or sets the operation applied by the block
     */
    operation: MathBlockOperations;
    /**
     * Create a new MathBlock
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
     * Gets the geometry output component
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
