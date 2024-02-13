import type { Scene } from "../../scene";
import { VertexData } from "../mesh.vertexData";
import type { Nullable } from "../../types";
import type { PolyhedronData } from "../geodesicMesh";
import { GoldbergMesh } from "../goldbergMesh";
/**
 * Defines the set of data required to create goldberg vertex data.
 */
export type GoldbergVertexDataOption = {
    /**
     * the size of the Goldberg, optional default 1
     */
    size?: number;
    /**
     * allows stretching in the x direction, optional, default size
     */
    sizeX?: number;
    /**
     * allows stretching in the y direction, optional, default size
     */
    sizeY?: number;
    /**
     * allows stretching in the z direction, optional, default size
     */
    sizeZ?: number;
    /**
     * optional and takes the values : Mesh.FRONTSIDE (default), Mesh.BACKSIDE or Mesh.DOUBLESIDE
     */
    sideOrientation?: number;
};
/**
 * Defines the set of data required to create a goldberg mesh.
 */
export type GoldbergCreationOption = {
    /**
     * number of horizontal steps along an isogrid
     */
    m?: number;
    /**
     * number of angled steps along an isogrid
     */
    n?: number;
    /**
     * defines if the mesh must be flagged as updatable
     */
    updatable?: boolean;
} & GoldbergVertexDataOption;
/**
 * Creates the Mesh for a Goldberg Polyhedron
 * @param options an object used to set the following optional parameters for the polyhedron, required but can be empty
 * @param goldbergData polyhedronData defining the Goldberg polyhedron
 * @returns GoldbergSphere mesh
 */
export declare function CreateGoldbergVertexData(options: GoldbergVertexDataOption, goldbergData: PolyhedronData): VertexData;
/**
 * Creates the Mesh for a Goldberg Polyhedron which is made from 12 pentagonal and the rest hexagonal faces
 * @see https://en.wikipedia.org/wiki/Goldberg_polyhedron
 * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/polyhedra/goldberg_poly
 * @param name defines the name of the mesh
 * @param options an object used to set the following optional parameters for the polyhedron, required but can be empty
 * @param scene defines the hosting scene
 * @returns Goldberg mesh
 */
export declare function CreateGoldberg(name: string, options: GoldbergCreationOption, scene?: Nullable<Scene>): GoldbergMesh;
