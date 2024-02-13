import type { Vector4 } from "../../Maths/math.vector";
import { Mesh } from "../mesh";
import { VertexData } from "../mesh.vertexData";
import type { Scene } from "../../scene";
/**
 * Creates the VertexData for a TorusKnot
 * @param options an object used to set the following optional parameters for the TorusKnot, required but can be empty
 * * radius the radius of the torus knot, optional, default 2
 * * tube the thickness of the tube, optional, default 0.5
 * * radialSegments the number of sides on each tube segments, optional, default 32
 * * tubularSegments the number of tubes to decompose the knot into, optional, default 32
 * * p the number of windings around the z axis, optional,  default 2
 * * q the number of windings around the x axis, optional,  default 3
 * * sideOrientation optional and takes the values : Mesh.FRONTSIDE (default), Mesh.BACKSIDE or Mesh.DOUBLESIDE
 * * frontUvs only usable when you create a double-sided mesh, used to choose what parts of the texture image to crop and apply on the front side, optional, default vector4 (0, 0, 1, 1)
 * * backUVs only usable when you create a double-sided mesh, used to choose what parts of the texture image to crop and apply on the back side, optional, default vector4 (0, 0, 1, 1)
 * @param options.radius
 * @param options.tube
 * @param options.radialSegments
 * @param options.tubularSegments
 * @param options.p
 * @param options.q
 * @param options.sideOrientation
 * @param options.frontUVs
 * @param options.backUVs
 * @returns the VertexData of the Torus Knot
 */
export declare function CreateTorusKnotVertexData(options: {
    radius?: number;
    tube?: number;
    radialSegments?: number;
    tubularSegments?: number;
    p?: number;
    q?: number;
    sideOrientation?: number;
    frontUVs?: Vector4;
    backUVs?: Vector4;
}): VertexData;
/**
 * Creates a torus knot mesh
 * * The parameter `radius` sets the global radius size (float) of the torus knot (default 2)
 * * The parameter `radialSegments` sets the number of sides on each tube segments (positive integer, default 32)
 * * The parameter `tubularSegments` sets the number of tubes to decompose the knot into (positive integer, default 32)
 * * The parameters `p` and `q` are the number of windings on each axis (positive integers, default 2 and 3)
 * * You can also set the mesh side orientation with the values : BABYLON.Mesh.FRONTSIDE (default), BABYLON.Mesh.BACKSIDE or BABYLON.Mesh.DOUBLESIDE
 * * If you create a double-sided mesh, you can choose what parts of the texture image to crop and stick respectively on the front and the back sides with the parameters `frontUVs` and `backUVs` (Vector4). Detail here : https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set#side-orientation
 * * The mesh can be set to updatable with the boolean parameter `updatable` (default false) if its internal geometry is supposed to change once created.
 * @param name defines the name of the mesh
 * @param options defines the options used to create the mesh
 * @param options.radius
 * @param options.tube
 * @param options.radialSegments
 * @param options.tubularSegments
 * @param options.p
 * @param options.q
 * @param options.updatable
 * @param options.sideOrientation
 * @param options.frontUVs
 * @param options.backUVs
 * @param scene defines the hosting scene
 * @returns the torus knot mesh
 * @see  https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set#torus-knot
 */
export declare function CreateTorusKnot(name: string, options?: {
    radius?: number;
    tube?: number;
    radialSegments?: number;
    tubularSegments?: number;
    p?: number;
    q?: number;
    updatable?: boolean;
    sideOrientation?: number;
    frontUVs?: Vector4;
    backUVs?: Vector4;
}, scene?: Scene): Mesh;
/**
 * Class containing static functions to help procedurally build meshes
 * @deprecated use CreateTorusKnot instead
 */
export declare const TorusKnotBuilder: {
    CreateTorusKnot: typeof CreateTorusKnot;
};
