import type { Nullable } from "../../types";
import type { Scene } from "../../scene";
import type { Vector4 } from "../../Maths/math.vector";
import { Mesh } from "../mesh";
import { VertexData } from "../mesh.vertexData";
/**
 * Creates the VertexData for a tiled plane
 * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set/tiled_plane
 * @param options an object used to set the following optional parameters for the tiled plane, required but can be empty
 * * pattern a limited pattern arrangement depending on the number
 * * size of the box
 * * width of the box, overwrites size
 * * height of the box, overwrites size
 * * tileSize sets the width, height and depth of the tile to the value of size, optional default 1
 * * tileWidth sets the width (x direction) of the tile, overwrites the width set by size, optional, default size
 * * tileHeight sets the height (y direction) of the tile, overwrites the height set by size, optional, default size
 * * sideOrientation optional and takes the values : Mesh.FRONTSIDE (default), Mesh.BACKSIDE or Mesh.DOUBLESIDE
 * * alignHorizontal places whole tiles aligned to the center, left or right of a row
 * * alignVertical places whole tiles aligned to the center, left or right of a column
 * * frontUvs only usable when you create a double-sided mesh, used to choose what parts of the texture image to crop and apply on the front side, optional, default vector4 (0, 0, 1, 1)
 * @param options.pattern
 * @param options.tileSize
 * @param options.tileWidth
 * @param options.tileHeight
 * @param options.size
 * @param options.width
 * @param options.height
 * @param options.alignHorizontal
 * @param options.alignVertical
 * @param options.sideOrientation
 * @param options.frontUVs
 * @param options.backUVs
 * * backUVs only usable when you create a double-sided mesh, used to choose what parts of the texture image to crop and apply on the back side, optional, default vector4 (0, 0, 1, 1)
 * @returns the VertexData of the tiled plane
 */
export declare function CreateTiledPlaneVertexData(options: {
    pattern?: number;
    tileSize?: number;
    tileWidth?: number;
    tileHeight?: number;
    size?: number;
    width?: number;
    height?: number;
    alignHorizontal?: number;
    alignVertical?: number;
    sideOrientation?: number;
    frontUVs?: Vector4;
    backUVs?: Vector4;
}): VertexData;
/**
 * Creates a tiled plane mesh
 * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set/tiled_plane
 * @param name defines the name of the mesh
 * @param options an object used to set the following optional parameters for the tiled plane, required but can be empty
 * * pattern a limited pattern arrangement depending on the number
 * * size of the box
 * * width of the box, overwrites size
 * * height of the box, overwrites size
 * * tileSize sets the width, height and depth of the tile to the value of size, optional default 1
 * * tileWidth sets the width (x direction) of the tile, overwrites the width set by size, optional, default size
 * * tileHeight sets the height (y direction) of the tile, overwrites the height set by size, optional, default size
 * * sideOrientation optional and takes the values : Mesh.FRONTSIDE (default), Mesh.BACKSIDE or Mesh.DOUBLESIDE
 * * alignHorizontal places whole tiles aligned to the center, left or right of a row
 * * alignVertical places whole tiles aligned to the center, left or right of a column
 * * frontUvs only usable when you create a double-sided mesh, used to choose what parts of the texture image to crop and apply on the front side, optional, default vector4 (0, 0, 1, 1)
 * * backUVs only usable when you create a double-sided mesh, used to choose what parts of the texture image to crop and apply on the back side, optional, default vector4 (0, 0, 1, 1)
 * @param options.pattern
 * @param options.tileSize
 * @param options.tileWidth
 * @param options.tileHeight
 * @param options.size
 * @param options.width
 * @param options.height
 * @param options.alignHorizontal
 * @param options.alignVertical
 * @param options.sideOrientation
 * @param options.frontUVs
 * @param options.backUVs
 * @param options.updatable
 * @param scene defines the hosting scene
 * @returns the box mesh
 */
export declare function CreateTiledPlane(name: string, options: {
    pattern?: number;
    tileSize?: number;
    tileWidth?: number;
    tileHeight?: number;
    size?: number;
    width?: number;
    height?: number;
    alignHorizontal?: number;
    alignVertical?: number;
    sideOrientation?: number;
    frontUVs?: Vector4;
    backUVs?: Vector4;
    updatable?: boolean;
}, scene?: Nullable<Scene>): Mesh;
/**
 * Class containing static functions to help procedurally build meshes
 * @deprecated use CreateTiledPlane instead
 */
export declare const TiledPlaneBuilder: {
    CreateTiledPlane: typeof CreateTiledPlane;
};
