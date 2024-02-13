import { VertexData } from "../mesh.vertexData";
import { Vector3 } from "../../Maths/math.vector";
import { Mesh } from "../mesh";
import type { Nullable } from "../../types";
import type { Scene } from "../../scene";
/**
 * Scripts based off of https://github.com/maximeq/three-js-capsule-geometry/blob/master/src/CapsuleBufferGeometry.js
 * @param options the constructors options used to shape the mesh.
 * @returns the capsule VertexData
 * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/set/capsule
 */
export declare function CreateCapsuleVertexData(options?: ICreateCapsuleOptions): VertexData;
/**
 * The options Interface for creating a Capsule Mesh
 */
export interface ICreateCapsuleOptions {
    /** The Orientation of the capsule.  Default : Vector3.Up() */
    orientation?: Vector3;
    /** Number of sub segments on the tube section of the capsule running parallel to orientation. */
    subdivisions?: number;
    /** Number of cylindrical segments on the capsule. */
    tessellation?: number;
    /** Height or Length of the capsule. */
    height?: number;
    /** Radius of the capsule. */
    radius?: number;
    /** Number of sub segments on the cap sections of the capsule running parallel to orientation. */
    capSubdivisions?: number;
    /** Overwrite for the top radius. */
    radiusTop?: number;
    /** Overwrite for the bottom radius. */
    radiusBottom?: number;
    /** Overwrite for the top capSubdivisions. */
    topCapSubdivisions?: number;
    /** Overwrite for the bottom capSubdivisions. */
    bottomCapSubdivisions?: number;
    /** Internal geometry is supposed to change once created. */
    updatable?: boolean;
}
/**
 * Creates a capsule or a pill mesh
 * @param name defines the name of the mesh
 * @param options The constructors options.
 * @param scene The scene the mesh is scoped to.
 * @returns Capsule Mesh
 */
export declare function CreateCapsule(name: string, options?: ICreateCapsuleOptions, scene?: Nullable<Scene>): Mesh;
/**
 * Class containing static functions to help procedurally build meshes
 * @deprecated please use CreateCapsule directly
 */
export declare const CapsuleBuilder: {
    CreateCapsule: typeof CreateCapsule;
};
