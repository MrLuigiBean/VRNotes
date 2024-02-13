import { NodeGeometryBlock } from "../../nodeGeometryBlock";
import type { NodeGeometryConnectionPoint } from "../../nodeGeometryBlockConnectionPoint";
/**
 * Block used to fetch a color from texture data
 */
export declare class GeometryTextureFetchBlock extends NodeGeometryBlock {
    /**
     * Gets or sets a boolean indicating if coordinates should be clamped between 0 and 1
     */
    clampCoordinates: boolean;
    /**
     * Creates a new GeometryTextureFetchBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the texture component
     */
    get texture(): NodeGeometryConnectionPoint;
    /**
     * Gets the coordinates component
     */
    get coordinates(): NodeGeometryConnectionPoint;
    /**
     * Gets the rgba component
     */
    get rgba(): NodeGeometryConnectionPoint;
    /**
     * Gets the rgb component
     */
    get rgb(): NodeGeometryConnectionPoint;
    /**
     * Gets the r component
     */
    get r(): NodeGeometryConnectionPoint;
    /**
     * Gets the g component
     */
    get g(): NodeGeometryConnectionPoint;
    /**
     * Gets the b component
     */
    get b(): NodeGeometryConnectionPoint;
    /**
     * Gets the a component
     */
    get a(): NodeGeometryConnectionPoint;
    private _repeatClamp;
    protected _buildBlock(): void;
    protected _dumpPropertiesCode(): string;
    /**
     * Serializes this block in a JSON representation
     * @returns the serialized block object
     */
    serialize(): any;
    _deserialize(serializationObject: any): void;
}
