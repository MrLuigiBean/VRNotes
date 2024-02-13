import type { Scene } from "../../scene";
import { Vector3 } from "../../Maths/math.vector";
import { Mesh } from "../mesh";
import type { Nullable } from "../../types";
import type { Node } from "../../node";
import type { GreasedLineMeshOptions } from "./greasedLineBaseMesh";
import { GreasedLineBaseMesh } from "./greasedLineBaseMesh";
import type { VertexData } from "../mesh.vertexData";
/**
 * GreasedLineRibbonMesh
 * Use the GreasedLineBuilder.CreateGreasedLine function to create an instance of this class.
 */
export declare class GreasedLineRibbonMesh extends GreasedLineBaseMesh {
    readonly name: string;
    /**
     * Default line width
     */
    static DEFAULT_WIDTH: number;
    private static _RightHandedForwardReadOnlyQuaternion;
    private static _LeftHandedForwardReadOnlyQuaternion;
    private static _LeftReadOnlyQuaternion;
    /**
     * Direction which the line segment will be thickened if drawn on the XY plane
     */
    static DIRECTION_XY: import("../../types").DeepImmutableObject<Vector3>;
    /**
     * Direction which the line segment will be thickened if drawn on the XZ plane
     */
    static DIRECTION_XZ: import("../../types").DeepImmutableObject<Vector3>;
    /**
     * Direction which the line segment will be thickened if drawn on the YZ plane
     */
    static DIRECTION_YZ: import("../../types").DeepImmutableObject<Vector3>;
    private _paths;
    private _pathsOptions;
    private _vSegmentLengths;
    private _uSegmentLengths;
    private _vTotalLengths;
    private _uTotalLengths;
    private _counters;
    private _slopes;
    private _ribbonWidths;
    /**
     * GreasedLineRibbonMesh
     * @param name name of the mesh
     * @param scene the scene
     * @param _options mesh options
     * @param _pathOptions used internaly when parsing a serialized GreasedLineRibbonMesh
     */
    constructor(name: string, scene: Scene, _options: GreasedLineMeshOptions, _pathOptions?: {
        options: GreasedLineMeshOptions;
        pathCount: number;
    }[]);
    /**
     * Adds new points to the line. It doesn't rerenders the line if in lazy mode.
     * @param points points table
     * @param options mesh options
     * @param hasPathOptions defaults to false
     */
    addPoints(points: number[][], options: GreasedLineMeshOptions, hasPathOptions?: boolean): void;
    /**
     * "GreasedLineRibbonMesh"
     * @returns "GreasedLineRibbonMesh"
     */
    getClassName(): string;
    /**
     * Return true if the line was created from two edge paths or one points path.
     * In this case the line is always flat.
     */
    get isFlatLine(): boolean;
    /**
     * Returns the slopes of the line at each point relative to the center of the line
     */
    get slopes(): number[];
    /**
     * Set the slopes of the line at each point relative to the center of the line
     */
    set slopes(slopes: number[]);
    protected _updateColorPointers(): void;
    protected _updateWidths(): void;
    protected _setPoints(points: number[][], _options: GreasedLineMeshOptions): void;
    private static _GetDirectionPlanesFromDirectionsOption;
    private static _CreateRibbonVertexData;
    private _preprocess;
    private static _ConvertToRibbonPath;
    private static _GetDirectionFromPoints;
    /**
     * Clones the GreasedLineRibbonMesh.
     * @param name new line name
     * @param newParent new parent node
     * @returns cloned line
     */
    clone(name?: string, newParent?: Nullable<Node>): GreasedLineRibbonMesh;
    /**
     * Serializes this GreasedLineRibbonMesh
     * @param serializationObject object to write serialization to
     */
    serialize(serializationObject: any): void;
    /**
     * Parses a serialized GreasedLineRibbonMesh
     * @param parsedMesh the serialized GreasedLineRibbonMesh
     * @param scene the scene to create the GreasedLineRibbonMesh in
     * @returns the created GreasedLineRibbonMesh
     */
    static Parse(parsedMesh: any, scene: Scene): Mesh;
    protected _initGreasedLine(): void;
    private _calculateSegmentLengths;
    private static _CalculateSlopes;
    protected _createVertexBuffers(): VertexData;
}
