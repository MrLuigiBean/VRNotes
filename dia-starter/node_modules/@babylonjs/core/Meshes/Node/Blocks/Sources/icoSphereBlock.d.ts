import { NodeGeometryBlock } from "../../nodeGeometryBlock";
import type { NodeGeometryConnectionPoint } from "../../nodeGeometryBlockConnectionPoint";
import type { NodeGeometryBuildState } from "../../nodeGeometryBuildState";
/**
 * Defines a block used to generate icosphere geometry data
 */
export declare class IcoSphereBlock extends NodeGeometryBlock {
    /**
     * Gets or sets a boolean indicating that this block can evaluate context
     * Build performance is improved when this value is set to false as the system will cache values instead of reevaluating everything per context change
     */
    evaluateContext: boolean;
    /**
     * Create a new IcoSphereBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the radius input component
     */
    get radius(): NodeGeometryConnectionPoint;
    /**
     * Gets the radiusX input component
     */
    get radiusX(): NodeGeometryConnectionPoint;
    /**
     * Gets the radiusY input component
     */
    get radiusY(): NodeGeometryConnectionPoint;
    /**
     * Gets the radiusZ input component
     */
    get radiusZ(): NodeGeometryConnectionPoint;
    /**
     * Gets the subdivisions input component
     */
    get subdivisions(): NodeGeometryConnectionPoint;
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
