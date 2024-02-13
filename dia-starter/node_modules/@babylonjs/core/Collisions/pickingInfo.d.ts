import type { Nullable } from "../types";
import { Vector3, Vector2 } from "../Maths/math.vector";
import type { AbstractMesh } from "../Meshes/abstractMesh";
import type { TransformNode } from "../Meshes/transformNode";
import type { Sprite } from "../Sprites/sprite";
import type { Ray } from "../Culling/ray";
/**
 * Information about the result of picking within a scene
 * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/interactions/picking_collisions
 */
export declare class PickingInfo {
    /**
     * If the pick collided with an object
     */
    hit: boolean;
    /**
     * Distance away where the pick collided
     */
    distance: number;
    /**
     * The location of pick collision
     */
    pickedPoint: Nullable<Vector3>;
    /**
     * The mesh corresponding the pick collision
     */
    pickedMesh: Nullable<AbstractMesh>;
    /** (See getTextureCoordinates) The barycentric U coordinate that is used when calculating the texture coordinates of the collision.*/
    bu: number;
    /** (See getTextureCoordinates) The barycentric V coordinate that is used when calculating the texture coordinates of the collision.*/
    bv: number;
    /** The index of the face on the mesh that was picked, or the index of the Line if the picked Mesh is a LinesMesh */
    faceId: number;
    /** The index of the face on the subMesh that was picked, or the index of the Line if the picked Mesh is a LinesMesh */
    subMeshFaceId: number;
    /** Id of the submesh that was picked */
    subMeshId: number;
    /** If a sprite was picked, this will be the sprite the pick collided with */
    pickedSprite: Nullable<Sprite>;
    /** If we are picking a mesh with thin instance, this will give you the picked thin instance */
    thinInstanceIndex: number;
    /**
     * The ray that was used to perform the picking.
     */
    ray: Nullable<Ray>;
    /**
     * If a mesh was used to do the picking (eg. 6dof controller) as a "near interaction", this will be populated.
     */
    originMesh: Nullable<AbstractMesh>;
    /**
     * The aim-space transform of the input used for picking, if it is an XR input source.
     */
    aimTransform: Nullable<TransformNode>;
    /**
     * The grip-space transform of the input used for picking, if it is an XR input source.
     * Some XR sources, such as input coming from head mounted displays, do not have this.
     */
    gripTransform: Nullable<TransformNode>;
    /**
     * Gets the normal corresponding to the face the pick collided with
     * @param useWorldCoordinates If the resulting normal should be relative to the world (default: false)
     * @param useVerticesNormals If the vertices normals should be used to calculate the normal instead of the normal map (default: true)
     * @returns The normal corresponding to the face the pick collided with
     * @remarks Note that the returned normal will always point towards the picking ray.
     */
    getNormal(useWorldCoordinates?: boolean, useVerticesNormals?: boolean): Nullable<Vector3>;
    /**
     * Gets the texture coordinates of where the pick occurred
     * @param uvSet The UV set to use to calculate the texture coordinates (default: VertexBuffer.UVKind)
     * @returns The vector containing the coordinates of the texture
     */
    getTextureCoordinates(uvSet?: string): Nullable<Vector2>;
}
