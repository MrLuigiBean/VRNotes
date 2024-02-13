import { Vector3 } from "../../Maths/math.vector";
import { Mesh } from "../mesh";
import type { AbstractMesh } from "../abstractMesh";
/**
 * Creates a decal mesh.
 * A decal is a mesh usually applied as a model onto the surface of another mesh. So don't forget the parameter `sourceMesh` depicting the decal
 * * The parameter `position` (Vector3, default `(0, 0, 0)`) sets the position of the decal in World coordinates
 * * The parameter `normal` (Vector3, default `Vector3.Up`) sets the normal of the mesh where the decal is applied onto in World coordinates
 * * The parameter `size` (Vector3, default `(1, 1, 1)`) sets the decal scaling
 * * The parameter `angle` (float in radian, default 0) sets the angle to rotate the decal
 * * The parameter `captureUVS` defines if we need to capture the uvs or compute them
 * * The parameter `cullBackFaces` defines if the back faces should be removed from the decal mesh
 * * The parameter `localMode` defines that the computations should be done with the local mesh coordinates instead of the world space coordinates.
 * *    Use this mode if you want the decal to be parented to the sourceMesh and move/rotate with it.
 * Note: Meshes with morph targets are not supported!
 * @param name defines the name of the mesh
 * @param sourceMesh defines the mesh where the decal must be applied
 * @param options defines the options used to create the mesh
 * @param options.position
 * @param options.normal
 * @param options.size
 * @param options.angle
 * @param options.captureUVS
 * @param options.cullBackFaces
 * @param options.localMode
 * @returns the decal mesh
 * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/decals
 */
export declare function CreateDecal(name: string, sourceMesh: AbstractMesh, options: {
    position?: Vector3;
    normal?: Vector3;
    size?: Vector3;
    angle?: number;
    captureUVS?: boolean;
    cullBackFaces?: boolean;
    localMode?: boolean;
}): Mesh;
/**
 * Class containing static functions to help procedurally build meshes
 * @deprecated use the function directly from the module
 */
export declare const DecalBuilder: {
    CreateDecal: typeof CreateDecal;
};
