import type { Scene } from "../scene";
import type { Vector2 } from "../Maths/math.vector";
import { Vector3 } from "../Maths/math.vector";
import { Mesh } from "../Meshes/mesh";
import { Color4 } from "../Maths/math.color";
/**
 * Defines the set of goldberg data used to create the polygon
 */
export type GoldbergData = {
    /**
     * The list of Goldberg faces colors
     */
    faceColors: Color4[];
    /**
     * The list of Goldberg faces centers
     */
    faceCenters: Vector3[];
    /**
     * The list of Goldberg faces Z axis
     */
    faceZaxis: Vector3[];
    /**
     * The list of Goldberg faces Y axis
     */
    faceXaxis: Vector3[];
    /**
     * The list of Goldberg faces X axis
     */
    faceYaxis: Vector3[];
    /**
     * Defines the number of shared faces
     */
    nbSharedFaces: number;
    /**
     * Defines the number of unshared faces
     */
    nbUnsharedFaces: number;
    /**
     * Defines the total number of goldberg faces
     */
    nbFaces: number;
    /**
     * Defines the number of goldberg faces at the pole
     */
    nbFacesAtPole: number;
    /**
     * Defines the number of adjacent faces per goldberg faces
     */
    adjacentFaces: number[][];
};
/**
 * Mesh for a Goldberg Polyhedron which is made from 12 pentagonal and the rest hexagonal faces
 * @see https://en.wikipedia.org/wiki/Goldberg_polyhedron
 */
export declare class GoldbergMesh extends Mesh {
    /**
     * Defines the specific Goldberg data used in this mesh construction.
     */
    goldbergData: GoldbergData;
    /**
     * Gets the related Goldberg face from pole infos
     * @param poleOrShared Defines the pole index or the shared face index if the fromPole parameter is passed in
     * @param fromPole Defines an optional pole index to find the related info from
     * @returns the goldberg face number
     */
    relatedGoldbergFace(poleOrShared: number, fromPole?: number): number;
    private _changeGoldbergFaceColors;
    /**
     * Set new goldberg face colors
     * @param colorRange the new color to apply to the mesh
     */
    setGoldbergFaceColors(colorRange: (number | Color4)[][]): void;
    /**
     * Updates new goldberg face colors
     * @param colorRange the new color to apply to the mesh
     */
    updateGoldbergFaceColors(colorRange: (number | Color4)[][]): void;
    private _changeGoldbergFaceUVs;
    /**
     * set new goldberg face UVs
     * @param uvRange the new UVs to apply to the mesh
     */
    setGoldbergFaceUVs(uvRange: (number | Vector2)[][]): void;
    /**
     * Updates new goldberg face UVs
     * @param uvRange the new UVs to apply to the mesh
     */
    updateGoldbergFaceUVs(uvRange: (number | Vector2)[][]): void;
    /**
     * Places a mesh on a particular face of the goldberg polygon
     * @param mesh Defines the mesh to position
     * @param face Defines the face to position onto
     * @param position Defines the position relative to the face we are positioning the mesh onto
     */
    placeOnGoldbergFaceAt(mesh: Mesh, face: number, position: Vector3): void;
    /**
     * Serialize current mesh
     * @param serializationObject defines the object which will receive the serialization data
     */
    serialize(serializationObject: any): void;
    /**
     * Parses a serialized goldberg mesh
     * @param parsedMesh the serialized mesh
     * @param scene the scene to create the goldberg mesh in
     * @returns the created goldberg mesh
     */
    static Parse(parsedMesh: any, scene: Scene): GoldbergMesh;
}
