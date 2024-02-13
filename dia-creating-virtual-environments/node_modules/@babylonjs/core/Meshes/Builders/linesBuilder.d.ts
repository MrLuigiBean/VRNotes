import { Vector3 } from "../../Maths/math.vector";
import type { Color4 } from "../../Maths/math.color";
import { VertexData } from "../mesh.vertexData";
import type { Nullable } from "../../types";
import { LinesMesh } from "../../Meshes/linesMesh";
import type { Scene } from "../../scene";
import type { Material } from "../../Materials/material";
/**
 * Creates the VertexData of the LineSystem
 * @param options an object used to set the following optional parameters for the LineSystem, required but can be empty
 *  - lines an array of lines, each line being an array of successive Vector3
 *  - colors an array of line colors, each of the line colors being an array of successive Color4, one per line point
 * @param options.lines
 * @param options.colors
 * @returns the VertexData of the LineSystem
 */
export declare function CreateLineSystemVertexData(options: {
    lines: Vector3[][];
    colors?: Nullable<Color4[][]>;
}): VertexData;
/**
 * Create the VertexData for a DashedLines
 * @param options an object used to set the following optional parameters for the DashedLines, required but can be empty
 *  - points an array successive Vector3
 *  - dashSize the size of the dashes relative to the dash number, optional, default 3
 *  - gapSize the size of the gap between two successive dashes relative to the dash number, optional, default 1
 *  - dashNb the intended total number of dashes, optional, default 200
 * @param options.points
 * @param options.dashSize
 * @param options.gapSize
 * @param options.dashNb
 * @returns the VertexData for the DashedLines
 */
export declare function CreateDashedLinesVertexData(options: {
    points: Vector3[];
    dashSize?: number;
    gapSize?: number;
    dashNb?: number;
}): VertexData;
/**
 * Creates a line system mesh. A line system is a pool of many lines gathered in a single mesh
 * * A line system mesh is considered as a parametric shape since it has no predefined original shape. Its shape is determined by the passed array of lines as an input parameter
 * * Like every other parametric shape, it is dynamically updatable by passing an existing instance of LineSystem to this static function
 * * The parameter `lines` is an array of lines, each line being an array of successive Vector3
 * * The optional parameter `instance` is an instance of an existing LineSystem object to be updated with the passed `lines` parameter
 * * The optional parameter `colors` is an array of line colors, each line colors being an array of successive Color4, one per line point
 * * The optional parameter `useVertexAlpha` is to be set to `false` (default `true`) when you don't need the alpha blending (faster)
 * * The optional parameter `material` is the material to use to draw the lines if provided. If not, a default material will be created
 * * Updating a simple Line mesh, you just need to update every line in the `lines` array : https://doc.babylonjs.com/features/featuresDeepDive/mesh/dynamicMeshMorph#lines-and-dashedlines
 * * When updating an instance, remember that only line point positions can change, not the number of points, neither the number of lines
 * * The mesh can be set to updatable with the boolean parameter `updatable` (default false) if its internal geometry is supposed to change once created
 * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param#line-system
 * @param name defines the name of the new line system
 * @param options defines the options used to create the line system
 * @param options.lines
 * @param options.updatable
 * @param options.instance
 * @param options.colors
 * @param options.useVertexAlpha
 * @param options.material
 * @param scene defines the hosting scene
 * @returns a new line system mesh
 */
export declare function CreateLineSystem(name: string, options: {
    lines: Vector3[][];
    updatable?: boolean;
    instance?: Nullable<LinesMesh>;
    colors?: Nullable<Color4[][]>;
    useVertexAlpha?: boolean;
    material?: Material;
}, scene?: Nullable<Scene>): LinesMesh;
/**
 * Creates a line mesh
 * A line mesh is considered as a parametric shape since it has no predefined original shape. Its shape is determined by the passed array of points as an input parameter
 * * Like every other parametric shape, it is dynamically updatable by passing an existing instance of LineMesh to this static function
 * * The parameter `points` is an array successive Vector3
 * * The optional parameter `instance` is an instance of an existing LineMesh object to be updated with the passed `points` parameter : https://doc.babylonjs.com/features/featuresDeepDive/mesh/dynamicMeshMorph#lines-and-dashedlines
 * * The optional parameter `colors` is an array of successive Color4, one per line point
 * * The optional parameter `useVertexAlpha` is to be set to `false` (default `true`) when you don't need alpha blending (faster)
 * * The optional parameter `material` is the material to use to draw the lines if provided. If not, a default material will be created
 * * When updating an instance, remember that only point positions can change, not the number of points
 * * The mesh can be set to updatable with the boolean parameter `updatable` (default false) if its internal geometry is supposed to change once created
 * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param#lines
 * @param name defines the name of the new line system
 * @param options defines the options used to create the line system
 * @param options.points
 * @param options.updatable
 * @param options.instance
 * @param options.colors
 * @param options.useVertexAlpha
 * @param options.material
 * @param scene defines the hosting scene
 * @returns a new line mesh
 */
export declare function CreateLines(name: string, options: {
    points: Vector3[];
    updatable?: boolean;
    instance?: Nullable<LinesMesh>;
    colors?: Color4[];
    useVertexAlpha?: boolean;
    material?: Material;
}, scene?: Nullable<Scene>): LinesMesh;
/**
 * Creates a dashed line mesh
 * * A dashed line mesh is considered as a parametric shape since it has no predefined original shape. Its shape is determined by the passed array of points as an input parameter
 * * Like every other parametric shape, it is dynamically updatable by passing an existing instance of LineMesh to this static function
 * * The parameter `points` is an array successive Vector3
 * * The parameter `dashNb` is the intended total number of dashes (positive integer, default 200)
 * * The parameter `dashSize` is the size of the dashes relatively the dash number (positive float, default 3)
 * * The parameter `gapSize` is the size of the gap between two successive dashes relatively the dash number (positive float, default 1)
 * * The optional parameter `instance` is an instance of an existing LineMesh object to be updated with the passed `points` parameter : https://doc.babylonjs.com/features/featuresDeepDive/mesh/dynamicMeshMorph#lines-and-dashedlines
 * * The optional parameter `useVertexAlpha` is to be set to `false` (default `true`) when you don't need the alpha blending (faster)
 * * The optional parameter `material` is the material to use to draw the lines if provided. If not, a default material will be created
 * * When updating an instance, remember that only point positions can change, not the number of points
 * * The mesh can be set to updatable with the boolean parameter `updatable` (default false) if its internal geometry is supposed to change once created
 * @param name defines the name of the mesh
 * @param options defines the options used to create the mesh
 * @param options.points
 * @param options.dashSize
 * @param options.gapSize
 * @param options.dashNb
 * @param options.updatable
 * @param options.instance
 * @param options.useVertexAlpha
 * @param options.material
 * @param scene defines the hosting scene
 * @returns the dashed line mesh
 * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param#dashed-lines
 */
export declare function CreateDashedLines(name: string, options: {
    points: Vector3[];
    dashSize?: number;
    gapSize?: number;
    dashNb?: number;
    updatable?: boolean;
    instance?: LinesMesh;
    useVertexAlpha?: boolean;
    material?: Material;
}, scene?: Nullable<Scene>): LinesMesh;
/**
 * Class containing static functions to help procedurally build meshes
 * @deprecated use the functions directly from the module
 */
export declare const LinesBuilder: {
    CreateDashedLines: typeof CreateDashedLines;
    CreateLineSystem: typeof CreateLineSystem;
    CreateLines: typeof CreateLines;
};
