import type { Scene } from "../../scene";
import type { Vector3 } from "../../Maths/math.vector";
import { Vector4 } from "../../Maths/math.vector";
import { Color4 } from "../../Maths/math.color";
import { Mesh } from "../mesh";
import { VertexData } from "../mesh.vertexData";
import type { Nullable } from "../../types";
/**
 * Creates the VertexData for an irregular Polygon in the XoZ plane using a mesh built by polygonTriangulation.build()
 * All parameters are provided by CreatePolygon as needed
 * @param polygon a mesh built from polygonTriangulation.build()
 * @param sideOrientation takes the values Mesh.FRONTSIDE (default), Mesh.BACKSIDE or Mesh.DOUBLESIDE
 * @param fUV an array of Vector4 elements used to set different images to the top, rings and bottom respectively
 * @param fColors an array of Color3 elements used to set different colors to the top, rings and bottom respectively
 * @param frontUVs only usable when you create a double-sided mesh, used to choose what parts of the texture image to crop and apply on the front side, optional, default vector4 (0, 0, 1, 1)
 * @param backUVs only usable when you create a double-sided mesh, used to choose what parts of the texture image to crop and apply on the back side, optional, default vector4 (0, 0, 1, 1)
 * @param wrp a boolean, default false, when true and fUVs used texture is wrapped around all sides, when false texture is applied side
 * @returns the VertexData of the Polygon
 */
export declare function CreatePolygonVertexData(polygon: Mesh, sideOrientation: number, fUV?: Vector4[], fColors?: Color4[], frontUVs?: Vector4, backUVs?: Vector4, wrp?: boolean): VertexData;
/**
 * Creates a polygon mesh
 * The polygon's shape will depend on the input parameters and is constructed parallel to a ground mesh
 * * The parameter `shape` is a required array of successive Vector3 representing the corners of the polygon in th XoZ plane, that is y = 0 for all vectors
 * * You can set the mesh side orientation with the values : Mesh.FRONTSIDE (default), Mesh.BACKSIDE or Mesh.DOUBLESIDE
 * * The mesh can be set to updatable with the boolean parameter `updatable` (default false) if its internal geometry is supposed to change once created
 * * If you create a double-sided mesh, you can choose what parts of the texture image to crop and stick respectively on the front and the back sides with the parameters `frontUVs` and `backUVs` (Vector4)
 * * Remember you can only change the shape positions, not their number when updating a polygon
 * @param name defines the name of the mesh
 * @param options defines the options used to create the mesh
 * @param options.shape
 * @param options.holes
 * @param options.depth
 * @param options.smoothingThreshold
 * @param options.faceUV
 * @param options.faceColors
 * @param options.updatable
 * @param options.sideOrientation
 * @param options.frontUVs
 * @param options.backUVs
 * @param options.wrap
 * @param scene defines the hosting scene
 * @param earcutInjection can be used to inject your own earcut reference
 * @returns the polygon mesh
 */
export declare function CreatePolygon(name: string, options: {
    shape: Vector3[];
    holes?: Vector3[][];
    depth?: number;
    smoothingThreshold?: number;
    faceUV?: Vector4[];
    faceColors?: Color4[];
    updatable?: boolean;
    sideOrientation?: number;
    frontUVs?: Vector4;
    backUVs?: Vector4;
    wrap?: boolean;
}, scene?: Nullable<Scene>, earcutInjection?: any): Mesh;
/**
 * Creates an extruded polygon mesh, with depth in the Y direction.
 * * You can set different colors and different images to the top, bottom and extruded side by using the parameters `faceColors` (an array of 3 Color3 elements) and `faceUV` (an array of 3 Vector4 elements)
 * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/using/texturePerBoxFace
 * @param name defines the name of the mesh
 * @param options defines the options used to create the mesh
 * @param options.shape
 * @param options.holes
 * @param options.depth
 * @param options.faceUV
 * @param options.faceColors
 * @param options.updatable
 * @param options.sideOrientation
 * @param options.frontUVs
 * @param options.backUVs
 * @param options.wrap
 * @param scene defines the hosting scene
 * @param earcutInjection can be used to inject your own earcut reference
 * @returns the polygon mesh
 */
export declare function ExtrudePolygon(name: string, options: {
    shape: Vector3[];
    holes?: Vector3[][];
    depth?: number;
    faceUV?: Vector4[];
    faceColors?: Color4[];
    updatable?: boolean;
    sideOrientation?: number;
    frontUVs?: Vector4;
    backUVs?: Vector4;
    wrap?: boolean;
}, scene?: Nullable<Scene>, earcutInjection?: any): Mesh;
/**
 * Class containing static functions to help procedurally build meshes
 * @deprecated use the functions directly from the module
 */
export declare const PolygonBuilder: {
    ExtrudePolygon: typeof ExtrudePolygon;
    CreatePolygon: typeof CreatePolygon;
};
