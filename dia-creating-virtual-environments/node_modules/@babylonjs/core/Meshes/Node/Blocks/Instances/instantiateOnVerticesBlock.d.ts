import { NodeGeometryBlock } from "../../nodeGeometryBlock";
import type { NodeGeometryConnectionPoint } from "../../nodeGeometryBlockConnectionPoint";
import type { NodeGeometryBuildState } from "../../nodeGeometryBuildState";
import type { INodeGeometryExecutionContext } from "../../Interfaces/nodeGeometryExecutionContext";
import type { INodeGeometryInstancingContext } from "../../Interfaces/nodeGeometryInstancingContext";
/**
 * Block used to instance geometry on every vertex of a geometry
 */
export declare class InstantiateOnVerticesBlock extends NodeGeometryBlock implements INodeGeometryExecutionContext, INodeGeometryInstancingContext {
    private _vertexData;
    private _currentIndex;
    private _currentLoopIndex;
    private _indexTranslation;
    /**
     * Gets or sets a boolean indicating that this block can evaluate context
     * Build performance is improved when this value is set to false as the system will cache values instead of reevaluating everything per context change
     */
    evaluateContext: boolean;
    /**
     * Gets or sets a boolean indicating if the block should remove duplicated positions
     */
    removeDuplicatedPositions: boolean;
    /**
     * Create a new InstantiateOnVerticesBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current instance index in the current flow
     * @returns the current index
     */
    getInstanceIndex(): number;
    /**
     * Gets the current index in the current flow
     * @returns the current index
     */
    getExecutionIndex(): number;
    /**
     * Gets the current loop index in the current flow
     * @returns the current loop index
     */
    getExecutionLoopIndex(): number;
    /**
     * Gets the current face index in the current flow
     * @returns the current face index
     */
    getExecutionFaceIndex(): number;
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the geometry input component
     */
    get geometry(): NodeGeometryConnectionPoint;
    /**
     * Gets the instance input component
     */
    get instance(): NodeGeometryConnectionPoint;
    /**
     * Gets the density input component
     */
    get density(): NodeGeometryConnectionPoint;
    /**
     * Gets the matrix input component
     */
    get matrix(): NodeGeometryConnectionPoint;
    /**
     * Gets the rotation input component
     */
    get rotation(): NodeGeometryConnectionPoint;
    /**
     * Gets the scaling input component
     */
    get scaling(): NodeGeometryConnectionPoint;
    /**
     * Gets the geometry output component
     */
    get output(): NodeGeometryConnectionPoint;
    protected _buildBlock(state: NodeGeometryBuildState): void;
    protected _dumpPropertiesCode(): string;
    /**
     * Serializes this block in a JSON representation
     * @returns the serialized block object
     */
    serialize(): any;
    _deserialize(serializationObject: any): void;
}
