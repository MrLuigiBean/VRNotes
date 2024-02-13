import { NodeGeometryBlock } from "../../nodeGeometryBlock";
import type { NodeGeometryConnectionPoint } from "../../nodeGeometryBlockConnectionPoint";
import type { Mesh } from "../../../../Meshes/mesh";
import type { Nullable } from "../../../../types";
/**
 * Defines a block used to generate a user defined mesh geometry data
 */
export declare class MeshBlock extends NodeGeometryBlock {
    private _mesh;
    private _cachedVertexData;
    /**
     * Gets or sets a boolean indicating that winding order needs to be reserved
     */
    reverseWindingOrder: boolean;
    /**
     * Gets or sets a boolean indicating that this block should serialize its cached data
     */
    serializedCachedData: boolean;
    /**
     * Gets or sets the mesh to use to get vertex data
     */
    get mesh(): Nullable<Mesh>;
    set mesh(value: Nullable<Mesh>);
    /**
     * Create a new MeshBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets a boolean indicating if the block is using cached data
     */
    get isUsingCachedData(): boolean;
    /**
     * Gets the geometry output component
     */
    get geometry(): NodeGeometryConnectionPoint;
    /**
     * Remove stored data
     */
    cleanData(): void;
    protected _buildBlock(): void;
    /**
     * Serializes this block in a JSON representation
     * @returns the serialized block object
     */
    serialize(): any;
    _deserialize(serializationObject: any): void;
}
