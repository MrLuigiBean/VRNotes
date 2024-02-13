import type { Immutable, Nullable } from "../types";
import { VertexBuffer } from "../Buffers/buffer";
import { AbstractMesh } from "../Meshes/abstractMesh";
import type { Matrix } from "../Maths/math.vector";
import { Vector3 } from "../Maths/math.vector";
import type { IDisposable } from "../scene";
import { ShaderMaterial } from "../Materials/shaderMaterial";
import "../Shaders/line.fragment";
import "../Shaders/line.vertex";
import type { DataBuffer } from "../Buffers/dataBuffer";
import { SmartArray } from "../Misc/smartArray";
import { DrawWrapper } from "../Materials/drawWrapper";
declare module "../scene" {
    interface Scene {
        /** @internal */
        _edgeRenderLineShader: Nullable<ShaderMaterial>;
    }
}
declare module "../Meshes/abstractMesh" {
    interface AbstractMesh {
        /**
         * Gets the edgesRenderer associated with the mesh
         */
        edgesRenderer: Nullable<EdgesRenderer>;
    }
}
declare module "../Meshes/linesMesh" {
    interface LinesMesh {
        /**
         * Enables the edge rendering mode on the mesh.
         * This mode makes the mesh edges visible
         * @param epsilon defines the maximal distance between two angles to detect a face
         * @param checkVerticesInsteadOfIndices indicates that we should check vertex list directly instead of faces
         * @returns the currentAbstractMesh
         * @see https://www.babylonjs-playground.com/#19O9TU#0
         */
        enableEdgesRendering(epsilon?: number, checkVerticesInsteadOfIndices?: boolean): AbstractMesh;
    }
}
declare module "../Meshes/linesMesh" {
    interface InstancedLinesMesh {
        /**
         * Enables the edge rendering mode on the mesh.
         * This mode makes the mesh edges visible
         * @param epsilon defines the maximal distance between two angles to detect a face
         * @param checkVerticesInsteadOfIndices indicates that we should check vertex list directly instead of faces
         * @returns the current InstancedLinesMesh
         * @see https://www.babylonjs-playground.com/#19O9TU#0
         */
        enableEdgesRendering(epsilon?: number, checkVerticesInsteadOfIndices?: boolean): InstancedLinesMesh;
    }
}
/**
 * Defines the minimum contract an Edges renderer should follow.
 */
export interface IEdgesRenderer extends IDisposable {
    /**
     * Gets or sets a boolean indicating if the edgesRenderer is active
     */
    isEnabled: boolean;
    /**
     * Renders the edges of the attached mesh,
     */
    render(): void;
    /**
     * Checks whether or not the edges renderer is ready to render.
     * @returns true if ready, otherwise false.
     */
    isReady(): boolean;
    /**
     * List of instances to render in case the source mesh has instances
     */
    customInstances: SmartArray<Matrix>;
}
/**
 * Defines the additional options of the edges renderer
 */
export interface IEdgesRendererOptions {
    /**
     * Gets or sets a boolean indicating that the alternate edge finder algorithm must be used
     * If not defined, the default value is true
     */
    useAlternateEdgeFinder?: boolean;
    /**
     * Gets or sets a boolean indicating that the vertex merger fast processing must be used.
     * If not defined, the default value is true.
     * You should normally leave it undefined (or set it to true), except if you see some artifacts in the edges rendering (can happen with complex geometries)
     * This option is used only if useAlternateEdgeFinder = true
     */
    useFastVertexMerger?: boolean;
    /**
     * During edges processing, the vertices are merged if they are close enough: epsilonVertexMerge is the limit within which vertices are considered to be equal.
     * The default value is 1e-6
     * This option is used only if useAlternateEdgeFinder = true
     */
    epsilonVertexMerge?: number;
    /**
     * Gets or sets a boolean indicating that tessellation should be applied before finding the edges. You may need to activate this option if your geometry is a bit
     * unusual, like having a vertex of a triangle in-between two vertices of an edge of another triangle. It happens often when using CSG to construct meshes.
     * This option is used only if useAlternateEdgeFinder = true
     */
    applyTessellation?: boolean;
    /**
     * The limit under which 3 vertices are considered to be aligned. 3 vertices PQR are considered aligned if distance(PQ) + distance(QR) - distance(PR) < epsilonVertexAligned
     * The default value is 1e-6
     * This option is used only if useAlternateEdgeFinder = true
     */
    epsilonVertexAligned?: number;
    /**
     * Gets or sets a boolean indicating that degenerated triangles should not be processed.
     * Degenerated triangles are triangles that have 2 or 3 vertices with the same coordinates
     */
    removeDegeneratedTriangles?: boolean;
}
/**
 * This class is used to generate edges of the mesh that could then easily be rendered in a scene.
 */
export declare class EdgesRenderer implements IEdgesRenderer {
    /**
     * Define the size of the edges with an orthographic camera
     */
    edgesWidthScalerForOrthographic: number;
    /**
     * Define the size of the edges with a perspective camera
     */
    edgesWidthScalerForPerspective: number;
    protected _source: AbstractMesh;
    protected _linesPositions: number[];
    protected _linesNormals: number[];
    protected _linesIndices: number[];
    protected _epsilon: number;
    protected _indicesCount: number;
    protected _drawWrapper?: DrawWrapper;
    protected _lineShader: ShaderMaterial;
    protected _ib: DataBuffer;
    protected _buffers: {
        [key: string]: Nullable<VertexBuffer>;
    };
    protected _buffersForInstances: {
        [key: string]: Nullable<VertexBuffer>;
    };
    protected _checkVerticesInsteadOfIndices: boolean;
    protected _options: Nullable<IEdgesRendererOptions>;
    private _meshRebuildObserver;
    private _meshDisposeObserver;
    /** Gets or sets a boolean indicating if the edgesRenderer is active */
    isEnabled: boolean;
    /** Gets the vertices generated by the edge renderer */
    get linesPositions(): Immutable<Array<number>>;
    /** Gets the normals generated by the edge renderer */
    get linesNormals(): Immutable<Array<number>>;
    /** Gets the indices generated by the edge renderer */
    get linesIndices(): Immutable<Array<number>>;
    /**
     * Gets or sets the shader used to draw the lines
     */
    get lineShader(): ShaderMaterial;
    set lineShader(shader: ShaderMaterial);
    /**
     * List of instances to render in case the source mesh has instances
     */
    customInstances: SmartArray<Matrix>;
    private static _GetShader;
    /**
     * Creates an instance of the EdgesRenderer. It is primarily use to display edges of a mesh.
     * Beware when you use this class with complex objects as the adjacencies computation can be really long
     * @param  source Mesh used to create edges
     * @param  epsilon sum of angles in adjacency to check for edge
     * @param  checkVerticesInsteadOfIndices bases the edges detection on vertices vs indices. Note that this parameter is not used if options.useAlternateEdgeFinder = true
     * @param  generateEdgesLines - should generate Lines or only prepare resources.
     * @param  options The options to apply when generating the edges
     */
    constructor(source: AbstractMesh, epsilon?: number, checkVerticesInsteadOfIndices?: boolean, generateEdgesLines?: boolean, options?: IEdgesRendererOptions);
    protected _prepareRessources(): void;
    /** @internal */
    _rebuild(): void;
    /**
     * Releases the required resources for the edges renderer
     */
    dispose(): void;
    protected _processEdgeForAdjacencies(pa: number, pb: number, p0: number, p1: number, p2: number): number;
    protected _processEdgeForAdjacenciesWithVertices(pa: Vector3, pb: Vector3, p0: Vector3, p1: Vector3, p2: Vector3): number;
    /**
     * Checks if the pair of p0 and p1 is en edge
     * @param faceIndex
     * @param edge
     * @param faceNormals
     * @param  p0
     * @param  p1
     * @private
     */
    protected _checkEdge(faceIndex: number, edge: number, faceNormals: Array<Vector3>, p0: Vector3, p1: Vector3): void;
    /**
     * push line into the position, normal and index buffer
     * @param p0
     * @param p1
     * @param offset
     * @protected
     */
    protected createLine(p0: Vector3, p1: Vector3, offset: number): void;
    /**
     * See https://playground.babylonjs.com/#R3JR6V#1 for a visual display of the algorithm
     * @param edgePoints
     * @param indexTriangle
     * @param indices
     * @param remapVertexIndices
     */
    private _tessellateTriangle;
    private _generateEdgesLinesAlternate;
    /**
     * Generates lines edges from adjacencjes
     * @private
     */
    _generateEdgesLines(): void;
    /**
     * Checks whether or not the edges renderer is ready to render.
     * @returns true if ready, otherwise false.
     */
    isReady(): boolean;
    /**
     * Renders the edges of the attached mesh,
     */
    render(): void;
}
/**
 * LineEdgesRenderer for LineMeshes to remove unnecessary triangulation
 */
export declare class LineEdgesRenderer extends EdgesRenderer {
    /**
     * This constructor turns off auto generating edges line in Edges Renderer to make it here.
     * @param  source LineMesh used to generate edges
     * @param  epsilon not important (specified angle for edge detection)
     * @param  checkVerticesInsteadOfIndices not important for LineMesh
     */
    constructor(source: AbstractMesh, epsilon?: number, checkVerticesInsteadOfIndices?: boolean);
    /**
     * Generate edges for each line in LinesMesh. Every Line should be rendered as edge.
     */
    _generateEdgesLines(): void;
}
