import type { Nullable } from "../../types";
import type { Scene } from "../../scene";
import { Vector4 } from "../../Maths/math.vector";
import { Color4 } from "../../Maths/math.color";
import { Mesh } from "../mesh";
import { VertexData } from "../mesh.vertexData";
/**
 * Creates the VertexData for a box
 * @param options an object used to set the following optional parameters for the box, required but can be empty
 * * size sets the width, height and depth of the box to the value of size, optional default 1
 * * width sets the width (x direction) of the box, overwrites the width set by size, optional, default size
 * * height sets the height (y direction) of the box, overwrites the height set by size, optional, default size
 * * depth sets the depth (z direction) of the box, overwrites the depth set by size, optional, default size
 * * faceUV an array of 6 Vector4 elements used to set different images to each box side
 * * faceColors an array of 6 Color3 elements used to set different colors to each box side
 * * sideOrientation optional and takes the values : Mesh.FRONTSIDE (default), Mesh.BACKSIDE or Mesh.DOUBLESIDE
 * * frontUvs only usable when you create a double-sided mesh, used to choose what parts of the texture image to crop and apply on the front side, optional, default vector4 (0, 0, 1, 1)
 * * backUVs only usable when you create a double-sided mesh, used to choose what parts of the texture image to crop and apply on the back side, optional, default vector4 (0, 0, 1, 1)
 * @param options.size
 * @param options.width
 * @param options.height
 * @param options.depth
 * @param options.faceUV
 * @param options.faceColors
 * @param options.sideOrientation
 * @param options.frontUVs
 * @param options.backUVs
 * @param options.wrap
 * @param options.topBaseAt
 * @param options.bottomBaseAt
 * @returns the VertexData of the box
 */
export declare function CreateBoxVertexData(options: {
    size?: number;
    width?: number;
    height?: number;
    depth?: number;
    faceUV?: Vector4[];
    faceColors?: Color4[];
    sideOrientation?: number;
    frontUVs?: Vector4;
    backUVs?: Vector4;
    wrap?: boolean;
    topBaseAt?: number;
    bottomBaseAt?: number;
}): VertexData;
/**
 * Creates the VertexData for a segmented box
 * @param options an object used to set the following optional parameters for the box, required but can be empty
 * * size sets the width, height and depth of the box to the value of size, optional default 1
 * * width sets the width (x direction) of the box, overwrites the width set by size, optional, default size
 * * height sets the height (y direction) of the box, overwrites the height set by size, optional, default size
 * * depth sets the depth (z direction) of the box, overwrites the depth set by size, optional, default size
 * * segments sets the number of segments on the all axis (1 by default)
 * * widthSegments sets the number of segments on the x axis (1 by default)
 * * heightSegments sets the number of segments on the y axis (1 by default)
 * * depthSegments sets the number of segments on the z axis (1 by default)
 * @param options.size
 * @param options.width
 * @param options.height
 * @param options.depth
 * @param options.segments
 * @param options.widthSegments
 * @param options.heightSegments
 * @param options.depthSegments
 * @returns the VertexData of the box
 */
export declare function CreateSegmentedBoxVertexData(options: {
    size?: number;
    width?: number;
    height?: number;
    depth?: number;
    segments?: number;
    widthSegments?: number;
    heightSegments?: number;
    depthSegments?: number;
}): VertexData;
/**
 * Creates a box mesh
 * * The parameter `size` sets the size (float) of each box side (default 1)
 * * You can set some different box dimensions by using the parameters `width`, `height` and `depth` (all by default have the same value of `size`)
 * * You can set different colors and different images to each box side by using the parameters `faceColors` (an array of 6 Color3 elements) and `faceUV` (an array of 6 Vector4 elements)
 * * Please read this tutorial : https://doc.babylonjs.com/features/featuresDeepDive/materials/using/texturePerBoxFace
 * * You can also set the mesh side orientation with the values : BABYLON.Mesh.FRONTSIDE (default), BABYLON.Mesh.BACKSIDE or BABYLON.Mesh.DOUBLESIDE
 * * If you create a double-sided mesh, you can choose what parts of the texture image to crop and stick respectively on the front and the back sides with the parameters `frontUVs` and `backUVs` (Vector4). Detail here : https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set#side-orientation
 * * The mesh can be set to updatable with the boolean parameter `updatable` (default false) if its internal geometry is supposed to change once created
 * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set#box
 * @param name defines the name of the mesh
 * @param options defines the options used to create the mesh
 * @param options.size
 * @param options.width
 * @param options.height
 * @param options.depth
 * @param options.faceUV
 * @param options.faceColors
 * @param options.sideOrientation
 * @param options.frontUVs
 * @param options.backUVs
 * @param options.wrap
 * @param options.topBaseAt
 * @param options.bottomBaseAt
 * @param options.updatable
 * @param scene defines the hosting scene
 * @returns the box mesh
 */
export declare function CreateBox(name: string, options?: {
    size?: number;
    width?: number;
    height?: number;
    depth?: number;
    faceUV?: Vector4[];
    faceColors?: Color4[];
    sideOrientation?: number;
    frontUVs?: Vector4;
    backUVs?: Vector4;
    wrap?: boolean;
    topBaseAt?: number;
    bottomBaseAt?: number;
    updatable?: boolean;
}, scene?: Nullable<Scene>): Mesh;
/**
 * Class containing static functions to help procedurally build meshes
 * @deprecated please use CreateBox directly
 */
export declare const BoxBuilder: {
    CreateBox: typeof CreateBox;
};
