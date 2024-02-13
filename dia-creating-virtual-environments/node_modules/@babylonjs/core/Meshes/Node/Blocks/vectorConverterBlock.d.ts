import { NodeGeometryBlock } from "../nodeGeometryBlock";
import type { NodeGeometryConnectionPoint } from "../nodeGeometryBlockConnectionPoint";
import type { NodeGeometryBuildState } from "../nodeGeometryBuildState";
/**
 * Block used to create a Vector2/3/4 out of individual or partial inputs
 */
export declare class VectorConverterBlock extends NodeGeometryBlock {
    /**
     * Create a new VectorConverterBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the xyzw component (input)
     */
    get xyzwIn(): NodeGeometryConnectionPoint;
    /**
     * Gets the xyz component (input)
     */
    get xyzIn(): NodeGeometryConnectionPoint;
    /**
     * Gets the xy component (input)
     */
    get xyIn(): NodeGeometryConnectionPoint;
    /**
     * Gets the zw component (input)
     */
    get zwIn(): NodeGeometryConnectionPoint;
    /**
     * Gets the x component (input)
     */
    get xIn(): NodeGeometryConnectionPoint;
    /**
     * Gets the y component (input)
     */
    get yIn(): NodeGeometryConnectionPoint;
    /**
     * Gets the z component (input)
     */
    get zIn(): NodeGeometryConnectionPoint;
    /**
     * Gets the w component (input)
     */
    get wIn(): NodeGeometryConnectionPoint;
    /**
     * Gets the xyzw component (output)
     */
    get xyzwOut(): NodeGeometryConnectionPoint;
    /**
     * Gets the xyz component (output)
     */
    get xyzOut(): NodeGeometryConnectionPoint;
    /**
     * Gets the xy component (output)
     */
    get xyOut(): NodeGeometryConnectionPoint;
    /**
     * Gets the zw component (output)
     */
    get zwOut(): NodeGeometryConnectionPoint;
    /**
     * Gets the x component (output)
     */
    get xOut(): NodeGeometryConnectionPoint;
    /**
     * Gets the y component (output)
     */
    get yOut(): NodeGeometryConnectionPoint;
    /**
     * Gets the z component (output)
     */
    get zOut(): NodeGeometryConnectionPoint;
    /**
     * Gets the w component (output)
     */
    get wOut(): NodeGeometryConnectionPoint;
    protected _inputRename(name: string): string;
    protected _outputRename(name: string): string;
    protected _buildBlock(state: NodeGeometryBuildState): void;
}
