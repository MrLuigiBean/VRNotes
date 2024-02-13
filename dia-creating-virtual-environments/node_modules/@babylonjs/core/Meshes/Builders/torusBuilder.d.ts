import type { Vector4 } from "../../Maths/math.vector";
import { Mesh } from "../mesh";
import { VertexData } from "../mesh.vertexData";
import type { Scene } from "../../scene";
/**
 * Creates the VertexData for a torus
 * @param options an object used to set the following optional parameters for the box, required but can be empty
 * * diameter the diameter of the torus, optional default 1
 * * thickness the diameter of the tube forming the torus, optional default 0.5
 * * tessellation the number of prism sides, 3 for a triangular prism, optional, default 24
 * * sideOrientation optional and takes the values : Mesh.FRONTSIDE (default), Mesh.BACKSIDE or Mesh.DOUBLESIDE
 * * frontUvs only usable when you create a double-sided mesh, used to choose what parts of the texture image to crop and apply on the front side, optional, default vector4 (0, 0, 1, 1)
 * * backUVs only usable when you create a double-sided mesh, used to choose what parts of the texture image to crop and apply on the back side, optional, default vector4 (0, 0, 1, 1)
 * @param options.diameter
 * @param options.thickness
 * @param options.tessellation
 * @param options.sideOrientation
 * @param options.frontUVs
 * @param options.backUVs
 * @returns the VertexData of the torus
 */
export declare function CreateTorusVertexData(options: {
    diameter?: number;
    thickness?: number;
    tessellation?: number;
    sideOrientation?: number;
    frontUVs?: Vector4;
    backUVs?: Vector4;
}): VertexData;
/**
 * Creates a torus mesh
 * * The parameter `diameter` sets the diameter size (float) of the torus (default 1)
 * * The parameter `thickness` sets the diameter size of the tube of the torus (float, default 0.5)
 * * The parameter `tessellation` sets the number of torus sides (positive integer, default 16)
 * * You can also set the mesh side orientation with the values : BABYLON.Mesh.FRONTSIDE (default), BABYLON.Mesh.BACKSIDE or BABYLON.Mesh.DOUBLESIDE
 * * If you create a double-sided mesh, you can choose what parts of the texture image to crop and stick respectively on the front and the back sides with the parameters `frontUVs` and `backUVs` (Vector4). Detail here : https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set#side-orientation
 * * The mesh can be set to updatable with the boolean parameter `updatable` (default false) if its internal geometry is supposed to change once created.
 * @param name defines the name of the mesh
 * @param options defines the options used to create the mesh
 * @param options.diameter
 * @param options.thickness
 * @param options.tessellation
 * @param options.updatable
 * @param options.sideOrientation
 * @param options.frontUVs
 * @param options.backUVs
 * @param scene defines the hosting scene
 * @returns the torus mesh
 * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set#torus
 */
export declare function CreateTorus(name: string, options?: {
    diameter?: number;
    thickness?: number;
    tessellation?: number;
    updatable?: boolean;
    sideOrientation?: number;
    frontUVs?: Vector4;
    backUVs?: Vector4;
}, scene?: Scene): Mesh;
/**
 * Class containing static functions to help procedurally build meshes
 * @deprecated use CreateTorus instead
 */
export declare const TorusBuilder: {
    CreateTorus: typeof CreateTorus;
};
