import { NodeGeometryBlock } from "../../nodeGeometryBlock";
import type { NodeGeometryConnectionPoint } from "../../nodeGeometryBlockConnectionPoint";
import type { NodeGeometryBuildState } from "../../nodeGeometryBuildState";
/**
 * Defines a block used to generate box geometry data
 */
export declare class BoxBlock extends NodeGeometryBlock {
    /**
     * Gets or sets a boolean indicating that this block can evaluate context
     * Build performance is improved when this value is set to false as the system will cache values instead of reevaluating everything per context change
     */
    evaluateContext: boolean;
    /**
     * Create a new BoxBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the size input component
     */
    get size(): NodeGeometryConnectionPoint;
    /**
     * Gets the width input component
     */
    get width(): NodeGeometryConnectionPoint;
    /**
     * Gets the height input component
     */
    get height(): NodeGeometryConnectionPoint;
    /**
     * Gets the depth input component
     */
    get depth(): NodeGeometryConnectionPoint;
    /**
     * Gets the subdivisions input component
     */
    get subdivisions(): NodeGeometryConnectionPoint;
    /**
     * Gets the subdivisionsX input component
     */
    get subdivisionsX(): NodeGeometryConnectionPoint;
    /**
     * Gets the subdivisionsY input component
     */
    get subdivisionsY(): NodeGeometryConnectionPoint;
    /**
     * Gets the subdivisionsZ input component
     */
    get subdivisionsZ(): NodeGeometryConnectionPoint;
    /**
     * Gets the geometry output component
     */
    get geometry(): NodeGeometryConnectionPoint;
    autoConfigure(): void;
    protected _buildBlock(state: NodeGeometryBuildState): void;
    protected _dumpPropertiesCode(): string;
    /**
     * Serializes this block in a JSON representation
     * @returns the serialized block object
     */
    serialize(): any;
    _deserialize(serializationObject: any): void;
}
