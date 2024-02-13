import type { Nullable } from "../../types";
import type { Scene } from "../../scene";
import type { Vector3, Vector2, Vector4 } from "../../Maths/math.vector";
import type { Color4 } from "../../Maths/math.color";
import { Mesh } from "../mesh";
import { VertexData } from "../mesh.vertexData";
/**
 * Creates the VertexData for a Ribbon
 * @param options an object used to set the following optional parameters for the ribbon, required but can be empty
 * * pathArray array of paths, each of which an array of successive Vector3
 * * closeArray creates a seam between the first and the last paths of the pathArray, optional, default false
 * * closePath creates a seam between the first and the last points of each path of the path array, optional, default false
 * * offset a positive integer, only used when pathArray contains a single path (offset = 10 means the point 1 is joined to the point 11), default rounded half size of the pathArray length
 * * sideOrientation optional and takes the values : Mesh.FRONTSIDE (default), Mesh.BACKSIDE or Mesh.DOUBLESIDE
 * * frontUvs only usable when you create a double-sided mesh, used to choose what parts of the texture image to crop and apply on the front side, optional, default vector4 (0, 0, 1, 1)
 * * backUVs only usable when you create a double-sided mesh, used to choose what parts of the texture image to crop and apply on the back side, optional, default vector4 (0, 0, 1, 1)
 * * invertUV swaps in the U and V coordinates when applying a texture, optional, default false
 * * uvs a linear array, of length 2 * number of vertices, of custom UV values, optional
 * * colors a linear array, of length 4 * number of vertices, of custom color values, optional
 * @param options.pathArray
 * @param options.closeArray
 * @param options.closePath
 * @param options.offset
 * @param options.sideOrientation
 * @param options.frontUVs
 * @param options.backUVs
 * @param options.invertUV
 * @param options.uvs
 * @param options.colors
 * @returns the VertexData of the ribbon
 */
export declare function CreateRibbonVertexData(options: {
    pathArray: Vector3[][];
    closeArray?: boolean;
    closePath?: boolean;
    offset?: number;
    sideOrientation?: number;
    frontUVs?: Vector4;
    backUVs?: Vector4;
    invertUV?: boolean;
    uvs?: Vector2[];
    colors?: Color4[];
}): VertexData;
/**
 * Creates a ribbon mesh. The ribbon is a parametric shape.  It has no predefined shape. Its final shape will depend on the input parameters
 * * The parameter `pathArray` is a required array of paths, what are each an array of successive Vector3. The pathArray parameter depicts the ribbon geometry
 * * The parameter `closeArray` (boolean, default false) creates a seam between the first and the last paths of the path array
 * * The parameter `closePath` (boolean, default false) creates a seam between the first and the last points of each path of the path array
 * * The parameter `offset` (positive integer, default : rounded half size of the pathArray length), is taken in account only if the `pathArray` is containing a single path
 * * It's the offset to join the points from the same path. Ex : offset = 10 means the point 1 is joined to the point 11
 * * The optional parameter `instance` is an instance of an existing Ribbon object to be updated with the passed `pathArray` parameter : https://doc.babylonjs.com/features/featuresDeepDive/mesh/dynamicMeshMorph#ribbon
 * * You can also set the mesh side orientation with the values : BABYLON.Mesh.FRONTSIDE (default), BABYLON.Mesh.BACKSIDE or BABYLON.Mesh.DOUBLESIDE
 * * If you create a double-sided mesh, you can choose what parts of the texture image to crop and stick respectively on the front and the back sides with the parameters `frontUVs` and `backUVs` (Vector4). Detail here : https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set#side-orientation
 * * The optional parameter `invertUV` (boolean, default false) swaps in the geometry the U and V coordinates to apply a texture
 * * The parameter `uvs` is an optional flat array of `Vector2` to update/set each ribbon vertex with its own custom UV values instead of the computed ones
 * * The parameters `colors` is an optional flat array of `Color4` to set/update each ribbon vertex with its own custom color values
 * * Note that if you use the parameters `uvs` or `colors`, the passed arrays must be populated with the right number of elements, it is to say the number of ribbon vertices. Remember that if you set `closePath` to `true`, there's one extra vertex per path in the geometry
 * * Moreover, you can use the parameter `color` with `instance` (to update the ribbon), only if you previously used it at creation time
 * * The mesh can be set to updatable with the boolean parameter `updatable` (default false) if its internal geometry is supposed to change once created
 * @param name defines the name of the mesh
 * @param options defines the options used to create the mesh
 * @param options.pathArray
 * @param options.closeArray
 * @param options.closePath
 * @param options.offset
 * @param options.updatable
 * @param options.sideOrientation
 * @param options.frontUVs
 * @param options.backUVs
 * @param options.instance
 * @param options.invertUV
 * @param options.uvs
 * @param options.colors
 * @param scene defines the hosting scene
 * @returns the ribbon mesh
 * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param/ribbon_extra
 * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param
 */
export declare function CreateRibbon(name: string, options: {
    pathArray: Vector3[][];
    closeArray?: boolean;
    closePath?: boolean;
    offset?: number;
    updatable?: boolean;
    sideOrientation?: number;
    frontUVs?: Vector4;
    backUVs?: Vector4;
    instance?: Mesh;
    invertUV?: boolean;
    uvs?: Vector2[];
    colors?: Color4[];
}, scene?: Nullable<Scene>): Mesh;
/**
 * Class containing static functions to help procedurally build meshes
 * @deprecated use CreateRibbon directly
 */
export declare const RibbonBuilder: {
    CreateRibbon: typeof CreateRibbon;
};
