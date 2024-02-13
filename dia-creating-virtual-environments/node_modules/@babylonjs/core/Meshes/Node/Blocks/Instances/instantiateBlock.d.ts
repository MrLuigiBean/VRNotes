import type { NodeGeometryConnectionPoint } from "../../nodeGeometryBlockConnectionPoint";
import type { NodeGeometryBuildState } from "../../nodeGeometryBuildState";
import type { VertexData } from "../../../mesh.vertexData";
import { InstantiateBaseBlock } from "./instantiateBaseBlock";
/**
 * Block used to instantiate a geometry inside a loop
 */
export declare class InstantiateBlock extends InstantiateBaseBlock {
    protected _vertexData: VertexData;
    protected _currentIndex: number;
    /**
     * Create a new InstantiateBlock
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
     * Gets the matrix input component
     */
    get matrix(): NodeGeometryConnectionPoint;
    /**
     * Gets the position input component
     */
    get position(): NodeGeometryConnectionPoint;
    /**
     * Gets the rotation input component
     */
    get rotation(): NodeGeometryConnectionPoint;
    /**
     * Gets the scaling input component
     */
    get scaling(): NodeGeometryConnectionPoint;
    protected _buildBlock(state: NodeGeometryBuildState): void;
}
