import { Mesh } from "../mesh";
import type { Scene } from "../../scene";
/**
 * Creates a hemisphere mesh
 * @param name defines the name of the mesh
 * @param options defines the options used to create the mesh
 * @param options.segments
 * @param options.diameter
 * @param options.sideOrientation
 * @param scene defines the hosting scene
 * @returns the hemisphere mesh
 */
export declare function CreateHemisphere(name: string, options?: {
    segments?: number;
    diameter?: number;
    sideOrientation?: number;
}, scene?: Scene): Mesh;
/**
 * Class containing static functions to help procedurally build meshes
 * @deprecated use the function directly from the module
 */
export declare const HemisphereBuilder: {
    CreateHemisphere: typeof CreateHemisphere;
};
