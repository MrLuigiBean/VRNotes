import { NodeGeometryBlock } from "../../nodeGeometryBlock";
import type { NodeGeometryConnectionPoint } from "../../nodeGeometryBlockConnectionPoint";
import type { NodeGeometryBuildState } from "../../nodeGeometryBuildState";
import type { INodeGeometryExecutionContext } from "../../Interfaces/nodeGeometryExecutionContext";
import { Vector2, Vector3 } from "../../../../Maths/math.vector";
import type { INodeGeometryInstancingContext } from "../../Interfaces/nodeGeometryInstancingContext";
/**
 * Block used to instance geometry on every face of a geometry
 */
export declare class InstantiateOnFacesBlock extends NodeGeometryBlock implements INodeGeometryExecutionContext, INodeGeometryInstancingContext {
    private _vertexData;
    private _currentFaceIndex;
    private _currentLoopIndex;
    private _currentPosition;
    private _currentUV;
    private _vertex0;
    private _vertex1;
    private _vertex2;
    private _tempVector0;
    private _tempVector1;
    private _uv0;
    private _uv1;
    private _uv2;
    /**
     * Gets or sets a boolean indicating that this block can evaluate context
     * Build performance is improved when this value is set to false as the system will cache values instead of reevaluating everything per context change
     */
    evaluateContext: boolean;
    /**
     * Create a new InstantiateOnFacesBlock
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
     * Gets the current face index in the current flow
     * @returns the current face index
     */
    getExecutionFaceIndex(): number;
    /**
     * Gets the current loop index in the current flow
     * @returns the current loop index
     */
    getExecutionLoopIndex(): number;
    /**
     * Gets the value associated with a contextual positions
     * @returns the value associated with the source
     */
    getOverridePositionsContextualValue(): Vector3;
    /**
     * Gets the value associated with a contextual normals
     * @returns the value associated with the source
     */
    getOverrideNormalsContextualValue(): Vector3;
    /**
     * Gets the value associated with a contextual UV1 se
     * @returns the value associated with the source
     */
    getOverrideUVs1ContextualValue(): Vector2;
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
     * Gets the count input component
     */
    get count(): NodeGeometryConnectionPoint;
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
