import { NodeGeometryBlock } from "../nodeGeometryBlock";
import type { NodeGeometryConnectionPoint } from "../nodeGeometryBlockConnectionPoint";
import type { NodeGeometryBuildState } from "../nodeGeometryBuildState";
/**
 * Block used to randomly pick a geometry from a collection
 */
export declare class GeometryCollectionBlock extends NodeGeometryBlock {
    /**
     * Gets or sets a boolean indicating that this block can evaluate context
     * Build performance is improved when this value is set to false as the system will cache values instead of reevaluating everything per context change
     */
    evaluateContext: boolean;
    /**
     * Create a new GeometryCollectionBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the geometry0 input component
     */
    get geometry0(): NodeGeometryConnectionPoint;
    /**
     * Gets the geometry1 input component
     */
    get geometry1(): NodeGeometryConnectionPoint;
    /**
     * Gets the geometry2 input component
     */
    get geometry2(): NodeGeometryConnectionPoint;
    /**
     * Gets the geometry3 input component
     */
    get geometry3(): NodeGeometryConnectionPoint;
    /**
     * Gets the geometry4 input component
     */
    get geometry4(): NodeGeometryConnectionPoint;
    /**
     * Gets the geometry5 input component
     */
    get geometry5(): NodeGeometryConnectionPoint;
    /**
     * Gets the geometry6 input component
     */
    get geometry6(): NodeGeometryConnectionPoint;
    /**
     * Gets the geometry7 input component
     */
    get geometry7(): NodeGeometryConnectionPoint;
    /**
     * Gets the geometry8 input component
     */
    get geometry8(): NodeGeometryConnectionPoint;
    /**
     * Gets the geometry9 input component
     */
    get geometry9(): NodeGeometryConnectionPoint;
    /**
     * Gets the geometry output component
     */
    get output(): NodeGeometryConnectionPoint;
    private _storeGeometry;
    protected _buildBlock(state: NodeGeometryBuildState): void;
    protected _dumpPropertiesCode(): string;
    /**
     * Serializes this block in a JSON representation
     * @returns the serialized block object
     */
    serialize(): any;
    _deserialize(serializationObject: any): void;
}
