import type { Scene } from "../../scene";
import type { Vector4 } from "../../Maths/math.vector";
import type { Color4 } from "../../Maths/math.color";
import type { Mesh } from "../../Meshes/mesh";
import type { Nullable } from "../../types";
/**
 * Creates the Mesh for a Geodesic Polyhedron
 * @see https://en.wikipedia.org/wiki/Geodesic_polyhedron
 * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/polyhedra/geodesic_poly
 * @param name defines the name of the mesh
 * @param options an object used to set the following optional parameters for the polyhedron, required but can be empty
 * * m number of horizontal steps along an isogrid
 * * n number of angled steps along an isogrid
 * * size the size of the Geodesic, optional default 1
 * * sizeX allows stretching in the x direction, optional, default size
 * * sizeY allows stretching in the y direction, optional, default size
 * * sizeZ allows stretching in the z direction, optional, default size
 * * faceUV an array of Vector4 elements used to set different images to the top, rings and bottom respectively
 * * faceColors an array of Color3 elements used to set different colors to the top, rings and bottom respectively
 * * flat when true creates a flat shaded mesh, optional, default true
 * * subdivisions increasing the subdivisions increases the number of faces, optional, default 4
 * * sideOrientation optional and takes the values : Mesh.FRONTSIDE (default), Mesh.BACKSIDE or Mesh.DOUBLESIDE
 * * frontUvs only usable when you create a double-sided mesh, used to choose what parts of the texture image to crop and apply on the front side, optional, default vector4 (0, 0, 1, 1)
 * * backUVs only usable when you create a double-sided mesh, used to choose what parts of the texture image to crop and apply on the back side, optional, default vector4 (0, 0, 1, 1)
 * @param options.n
 * @param options.size
 * @param options.sizeX
 * @param options.sizeY
 * @param options.sizeZ
 * @param options.faceUV
 * @param options.faceColors
 * @param options.flat
 * @param options.updatable
 * @param options.sideOrientation
 * @param options.frontUVs
 * @param options.backUVs
 * @param options.m
 * @param scene defines the hosting scene
 * @returns Geodesic mesh
 */
export declare function CreateGeodesic(name: string, options: {
    m?: number;
    n?: number;
    size?: number;
    sizeX?: number;
    sizeY?: number;
    sizeZ?: number;
    faceUV?: Vector4[];
    faceColors?: Color4[];
    flat?: boolean;
    updatable?: boolean;
    sideOrientation?: number;
    frontUVs?: Vector4;
    backUVs?: Vector4;
}, scene?: Nullable<Scene>): Mesh;
