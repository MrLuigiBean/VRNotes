import { NodeGeometryBlock } from "../nodeGeometryBlock";
import type { NodeGeometryConnectionPoint } from "../nodeGeometryBlockConnectionPoint";
import type { NodeGeometryBuildState } from "../nodeGeometryBuildState";
/**
 * Operations supported by the Trigonometry block
 */
export declare enum GeometryTrigonometryBlockOperations {
    /** Cos */
    Cos = 0,
    /** Sin */
    Sin = 1,
    /** Abs */
    Abs = 2,
    /** Exp */
    Exp = 3,
    /** Round */
    Round = 4,
    /** Floor */
    Floor = 5,
    /** Ceiling */
    Ceiling = 6,
    /** Square root */
    Sqrt = 7,
    /** Log */
    Log = 8,
    /** Tangent */
    Tan = 9,
    /** Arc tangent */
    ArcTan = 10,
    /** Arc cosinus */
    ArcCos = 11,
    /** Arc sinus */
    ArcSin = 12,
    /** Sign */
    Sign = 13,
    /** Negate */
    Negate = 14,
    /** OneMinus */
    OneMinus = 15,
    /** Reciprocal */
    Reciprocal = 16,
    /** ToDegrees */
    ToDegrees = 17,
    /** ToRadians */
    ToRadians = 18
}
/**
 * Block used to apply trigonometry operation to floats
 */
export declare class GeometryTrigonometryBlock extends NodeGeometryBlock {
    /**
     * Gets or sets the operation applied by the block
     */
    operation: GeometryTrigonometryBlockOperations;
    /**
     * Creates a new GeometryTrigonometryBlock
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
    get input(): NodeGeometryConnectionPoint;
    /**
     * Gets the output component
     */
    get output(): NodeGeometryConnectionPoint;
    protected _buildBlock(state: NodeGeometryBuildState): this | undefined;
    serialize(): any;
    _deserialize(serializationObject: any): void;
    protected _dumpPropertiesCode(): string;
}
