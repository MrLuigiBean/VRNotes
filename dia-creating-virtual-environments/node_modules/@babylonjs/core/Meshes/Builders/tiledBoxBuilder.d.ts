import type { Nullable } from "../../types";
import type { Scene } from "../../scene";
import { Vector4 } from "../../Maths/math.vector";
import { Color4 } from "../../Maths/math.color";
import { Mesh } from "../mesh";
import { VertexData } from "../mesh.vertexData";
/**
 * Creates the VertexData for a tiled box
 * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set/tiled_box
 * @param options an object used to set the following optional parameters for the tiled box, required but can be empty
 * * pattern sets the rotation or reflection pattern for the tiles,
 * * size of the box
 * * width of the box, overwrites size
 * * height of the box, overwrites size
 * * depth of the box, overwrites size
 * * tileSize sets the size of a tile
 * * tileWidth sets the tile width and overwrites tileSize
 * * tileHeight sets the tile width and overwrites tileSize
 * * faceUV an array of 6 Vector4 elements used to set different images to each box side
 * * faceColors an array of 6 Color3 elements used to set different colors to each box side
 * * alignHorizontal places whole tiles aligned to the center, left or right of a row
 * * alignVertical places whole tiles aligned to the center, left or right of a column
 * @param options.pattern
 * @param options.size
 * @param options.width
 * @param options.height
 * @param options.depth
 * @param options.tileSize
 * @param options.tileWidth
 * @param options.tileHeight
 * @param options.faceUV
 * @param options.faceColors
 * @param options.alignHorizontal
 * @param options.alignVertical
 * @param options.sideOrientation
 * * sideOrientation optional and takes the values : Mesh.FRONTSIDE (default), Mesh.BACKSIDE or Mesh.DOUBLESIDE
 * @returns the VertexData of the TiledBox
 */
export declare function CreateTiledBoxVertexData(options: {
    pattern?: number;
    size?: number;
    width?: number;
    height?: number;
    depth?: number;
    tileSize?: number;
    tileWidth?: number;
    tileHeight?: number;
    faceUV?: Vector4[];
    faceColors?: Color4[];
    alignHorizontal?: number;
    alignVertical?: number;
    sideOrientation?: number;
}): VertexData;
/**
 * Creates a tiled box mesh
 * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set/tiled_box
 * @param name defines the name of the mesh
 * @param options an object used to set the following optional parameters for the tiled box, required but can be empty
 * * pattern sets the rotation or reflection pattern for the tiles,
 * * size of the box
 * * width of the box, overwrites size
 * * height of the box, overwrites size
 * * depth of the box, overwrites size
 * * tileSize sets the size of a tile
 * * tileWidth sets the tile width and overwrites tileSize
 * * tileHeight sets the tile width and overwrites tileSize
 * * faceUV an array of 6 Vector4 elements used to set different images to each box side
 * * faceColors an array of 6 Color3 elements used to set different colors to each box side
 * * alignHorizontal places whole tiles aligned to the center, left or right of a row
 * * alignVertical places whole tiles aligned to the center, left or right of a column
 * * sideOrientation optional and takes the values : Mesh.FRONTSIDE (default), Mesh.BACKSIDE or Mesh.DOUBLESIDE
 * @param options.pattern
 * @param options.width
 * @param options.height
 * @param options.depth
 * @param options.tileSize
 * @param options.tileWidth
 * @param options.tileHeight
 * @param options.alignHorizontal
 * @param options.alignVertical
 * @param options.faceUV
 * @param options.faceColors
 * @param options.sideOrientation
 * @param options.updatable
 * @param scene defines the hosting scene
 * @returns the box mesh
 */
export declare function CreateTiledBox(name: string, options: {
    pattern?: number;
    width?: number;
    height?: number;
    depth?: number;
    tileSize?: number;
    tileWidth?: number;
    tileHeight?: number;
    alignHorizontal?: number;
    alignVertical?: number;
    faceUV?: Vector4[];
    faceColors?: Color4[];
    sideOrientation?: number;
    updatable?: boolean;
}, scene?: Nullable<Scene>): Mesh;
/**
 * Class containing static functions to help procedurally build meshes
 * @deprecated use CreateTiledBox instead
 */
export declare const TiledBoxBuilder: {
    CreateTiledBox: typeof CreateTiledBox;
};
