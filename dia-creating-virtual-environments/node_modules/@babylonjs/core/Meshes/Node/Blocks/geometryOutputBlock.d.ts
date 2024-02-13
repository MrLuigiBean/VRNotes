import { NodeGeometryBlock } from "../nodeGeometryBlock";
import type { NodeGeometryConnectionPoint } from "../nodeGeometryBlockConnectionPoint";
import type { NodeGeometryBuildState } from "../nodeGeometryBuildState";
import type { VertexData } from "../../mesh.vertexData.js";
import type { Nullable } from "../../../types";
/**
 * Block used to generate the final geometry
 */
export declare class GeometryOutputBlock extends NodeGeometryBlock {
    private _vertexData;
    /**
     * Gets the current vertex data if the graph was successfully built
     */
    get currentVertexData(): Nullable<VertexData>;
    /**
     * Create a new GeometryOutputBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the geometry input component
     */
    get geometry(): NodeGeometryConnectionPoint;
    protected _buildBlock(state: NodeGeometryBuildState): void;
}
