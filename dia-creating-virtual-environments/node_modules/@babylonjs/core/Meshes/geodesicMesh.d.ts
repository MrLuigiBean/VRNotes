import { Vector3 } from "../Maths/math.vector";
import { _IsoVector } from "../Maths/math.isovector";
/**
 * Class representing data for one face OAB of an equilateral icosahedron
 * When O is the isovector (0, 0), A is isovector (m, n)
 * @internal
 */
export declare class _PrimaryIsoTriangle {
    m: number;
    n: number;
    cartesian: Vector3[];
    vertices: _IsoVector[];
    max: number[];
    min: number[];
    vecToidx: {
        [key: string]: number;
    };
    vertByDist: {
        [key: string]: number[];
    };
    closestTo: number[][];
    innerFacets: string[][];
    isoVecsABOB: _IsoVector[][];
    isoVecsOBOA: _IsoVector[][];
    isoVecsBAOA: _IsoVector[][];
    vertexTypes: number[][];
    coau: number;
    cobu: number;
    coav: number;
    cobv: number;
    IDATA: PolyhedronData;
    /**
     * Creates the PrimaryIsoTriangle Triangle OAB
     * @param m an integer
     * @param n an integer
     */
    setIndices(): void;
    calcCoeffs(): void;
    createInnerFacets(): void;
    edgeVecsABOB(): void;
    mapABOBtoOBOA(): void;
    mapABOBtoBAOA(): void;
    MapToFace(faceNb: number, geodesicData: PolyhedronData): void;
    /**Creates a primary triangle
     * @internal
     */
    build(m: number, n: number): this;
}
/** Builds Polyhedron Data
 * @internal
 */
export declare class PolyhedronData {
    /**
     * The name of the polyhedron
     */
    name: string;
    /**
     * The category of the polyhedron
     */
    category: string;
    /**
     * vertex data
     */
    vertex: number[][];
    /**
     * face data
     */
    face: number[][];
    /**
     * @internal
     */
    edgematch: (number | string)[][];
    constructor(
    /**
     * The name of the polyhedron
     */
    name: string, 
    /**
     * The category of the polyhedron
     */
    category: string, 
    /**
     * vertex data
     */
    vertex: number[][], 
    /**
     * face data
     */
    face: number[][]);
}
/**
 * This class Extends the PolyhedronData Class to provide measures for a Geodesic Polyhedron
 */
export declare class GeodesicData extends PolyhedronData {
    /**
     * @internal
     */
    edgematch: (number | string)[][];
    /**
     * @internal
     */
    adjacentFaces: number[][];
    /**
     * @internal
     */
    sharedNodes: number;
    /**
     * @internal
     */
    poleNodes: number;
    /**
     * @internal
     */
    innerToData(face: number, primTri: _PrimaryIsoTriangle): void;
    /**
     * @internal
     */
    mapABOBtoDATA(faceNb: number, primTri: _PrimaryIsoTriangle): void;
    /**
     * @internal
     */
    mapOBOAtoDATA(faceNb: number, primTri: _PrimaryIsoTriangle): void;
    /**
     * @internal
     */
    mapBAOAtoDATA(faceNb: number, primTri: _PrimaryIsoTriangle): void;
    /**
     * @internal
     */
    orderData(primTri: _PrimaryIsoTriangle): void;
    /**
     * @internal
     */
    setOrder(m: number, faces: number[]): number[];
    /**
     * @internal
     */
    toGoldbergPolyhedronData(): PolyhedronData;
    /**Builds the data for a Geodesic Polyhedron from a primary triangle
     * @param primTri the primary triangle
     * @internal
     */
    static BuildGeodesicData(primTri: _PrimaryIsoTriangle): GeodesicData;
}
