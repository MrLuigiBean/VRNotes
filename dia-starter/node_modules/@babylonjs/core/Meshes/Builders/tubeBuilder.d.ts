import type { Nullable } from "../../types";
import type { Scene } from "../../scene";
import type { Vector4 } from "../../Maths/math.vector";
import { Vector3 } from "../../Maths/math.vector";
import { Mesh } from "../mesh";
/**
 * Creates a tube mesh.
 * The tube is a parametric shape. It has no predefined shape. Its final shape will depend on the input parameters
 * * The parameter `path` is a required array of successive Vector3. It is the curve used as the axis of the tube
 * * The parameter `radius` (positive float, default 1) sets the tube radius size
 * * The parameter `tessellation` (positive float, default 64) is the number of sides on the tubular surface
 * * The parameter `radiusFunction` (javascript function, default null) is a vanilla javascript function. If it is not null, it overrides the parameter `radius`
 * * This function is called on each point of the tube path and is passed the index `i` of the i-th point and the distance of this point from the first point of the path. It must return a radius value (positive float)
 * * The parameter `arc` (positive float, maximum 1, default 1) is the ratio to apply to the tube circumference : 2 x PI x arc
 * * The parameter `cap` sets the way the extruded shape is capped. Possible values : BABYLON.Mesh.NO_CAP (default), BABYLON.Mesh.CAP_START, BABYLON.Mesh.CAP_END, BABYLON.Mesh.CAP_ALL
 * * The optional parameter `instance` is an instance of an existing Tube object to be updated with the passed `pathArray` parameter. The `path`Array HAS to have the SAME number of points as the previous one: https://doc.babylonjs.com/features/featuresDeepDive/mesh/dynamicMeshMorph#tube
 * * You can also set the mesh side orientation with the values : BABYLON.Mesh.FRONTSIDE (default), BABYLON.Mesh.BACKSIDE or BABYLON.Mesh.DOUBLESIDE
 * * If you create a double-sided mesh, you can choose what parts of the texture image to crop and stick respectively on the front and the back sides with the parameters `frontUVs` and `backUVs` (Vector4). Detail here : https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set#side-orientation
 * * The optional parameter `invertUV` (boolean, default false) swaps in the geometry the U and V coordinates to apply a texture
 * * The mesh can be set to updatable with the boolean parameter `updatable` (default false) if its internal geometry is supposed to change once created. The NUMBER of points CAN'T CHANGE, only their positions.
 * @param name defines the name of the mesh
 * @param options defines the options used to create the mesh
 * @param options.path
 * @param options.radius
 * @param options.tessellation
 * @param options.radiusFunction
 * @param options.cap
 * @param options.arc
 * @param options.updatable
 * @param options.sideOrientation
 * @param options.frontUVs
 * @param options.backUVs
 * @param options.instance
 * @param options.invertUV
 * @param scene defines the hosting scene
 * @returns the tube mesh
 * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param
 * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set#tube
 */
export declare function CreateTube(name: string, options: {
    path: Vector3[];
    radius?: number;
    tessellation?: number;
    radiusFunction?: {
        (i: number, distance: number): number;
    };
    cap?: number;
    arc?: number;
    updatable?: boolean;
    sideOrientation?: number;
    frontUVs?: Vector4;
    backUVs?: Vector4;
    instance?: Mesh;
    invertUV?: boolean;
}, scene?: Nullable<Scene>): Mesh;
/**
 * Class containing static functions to help procedurally build meshes
 * @deprecated use CreateTube directly
 */
export declare const TubeBuilder: {
    CreateTube: typeof CreateTube;
};
