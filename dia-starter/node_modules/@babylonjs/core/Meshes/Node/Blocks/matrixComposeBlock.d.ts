import { NodeGeometryBlock } from "../nodeGeometryBlock";
import type { NodeGeometryConnectionPoint } from "../nodeGeometryBlockConnectionPoint";
/**
 * Block used to compose two matrices
 */
export declare class MatrixComposeBlock extends NodeGeometryBlock {
    /**
     * Create a new MatrixComposeBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the matrix0 input component
     */
    get matrix0(): NodeGeometryConnectionPoint;
    /**
     * Gets the matrix1 input component
     */
    get matrix1(): NodeGeometryConnectionPoint;
    /**
     * Gets the output component
     */
    get output(): NodeGeometryConnectionPoint;
    protected _buildBlock(): void;
}
