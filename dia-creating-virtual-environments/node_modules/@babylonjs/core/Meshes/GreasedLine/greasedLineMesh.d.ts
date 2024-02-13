import type { Scene } from "../../scene";
import type { Matrix } from "../../Maths/math.vector";
import { Vector3 } from "../../Maths/math.vector";
import { Mesh } from "../mesh";
import type { Ray, TrianglePickingPredicate } from "../../Culling/ray";
import { PickingInfo } from "../../Collisions/pickingInfo";
import type { Nullable } from "../../types";
import type { Node } from "../../node";
import type { GreasedLineMeshOptions } from "./greasedLineBaseMesh";
import { GreasedLineBaseMesh } from "./greasedLineBaseMesh";
import type { VertexData } from "../mesh.vertexData";
/**
 * GreasedLineMesh
 * Use the GreasedLineBuilder.CreateGreasedLine function to create an instance of this class.
 */
export declare class GreasedLineMesh extends GreasedLineBaseMesh {
    readonly name: string;
    private _previousAndSide;
    private _nextAndCounters;
    private static _V_START;
    private static _V_END;
    private static _V_OFFSET_START;
    private static _V_OFFSET_END;
    /**
     * Treshold used to pick the mesh
     */
    intersectionThreshold: number;
    /**
     * GreasedLineMesh
     * @param name name of the mesh
     * @param scene the scene
     * @param _options mesh options
     */
    constructor(name: string, scene: Scene, _options: GreasedLineMeshOptions);
    /**
     * "GreasedLineMesh"
     * @returns "GreasedLineMesh"
     */
    getClassName(): string;
    protected _updateColorPointers(): void;
    protected _updateWidths(): void;
    protected _setPoints(points: number[][]): void;
    /**
     * Clones the GreasedLineMesh.
     * @param name new line name
     * @param newParent new parent node
     * @returns cloned line
     */
    clone(name?: string, newParent?: Nullable<Node>): GreasedLineMesh;
    /**
     * Serializes this GreasedLineMesh
     * @param serializationObject object to write serialization to
     */
    serialize(serializationObject: any): void;
    /**
     * Parses a serialized GreasedLineMesh
     * @param parsedMesh the serialized GreasedLineMesh
     * @param scene the scene to create the GreasedLineMesh in
     * @returns the created GreasedLineMesh
     */
    static Parse(parsedMesh: any, scene: Scene): Mesh;
    protected _initGreasedLine(): void;
    /**
     * Checks whether a ray is intersecting this GreasedLineMesh
     * @param ray ray to check the intersection of this mesh with
     * @param fastCheck not supported
     * @param trianglePredicate not supported
     * @param onlyBoundingInfo defines a boolean indicating if picking should only happen using bounding info (false by default)
     * @param worldToUse not supported
     * @param skipBoundingInfo a boolean indicating if we should skip the bounding info check
     * @returns the picking info
     */
    intersects(ray: Ray, fastCheck?: boolean, trianglePredicate?: TrianglePickingPredicate, onlyBoundingInfo?: boolean, worldToUse?: Matrix, skipBoundingInfo?: boolean): PickingInfo;
    /**
     * Gets all intersections of a ray and the line
     * @param ray Ray to check the intersection of this mesh with
     * @param _fastCheck not supported
     * @param _trianglePredicate not supported
     * @param onlyBoundingInfo defines a boolean indicating if picking should only happen using bounding info (false by default)
     * @param _worldToUse not supported
     * @param skipBoundingInfo a boolean indicating if we should skip the bounding info check
     * @param firstOnly If true, the first and only intersection is immediatelly returned if found
     * @returns intersection(s)
     */
    findAllIntersections(ray: Ray, _fastCheck?: boolean, _trianglePredicate?: TrianglePickingPredicate, onlyBoundingInfo?: boolean, _worldToUse?: Matrix, skipBoundingInfo?: boolean, firstOnly?: boolean): {
        distance: number;
        point: Vector3;
    }[] | undefined;
    private get _boundingSphere();
    private static _CompareV3;
    private static _CopyV3;
    private _preprocess;
    protected _createVertexBuffers(): VertexData;
}
