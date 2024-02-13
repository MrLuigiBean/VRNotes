import type { AnimationRange } from "../Animations/animationRange";
import { RawTexture } from "../Materials/Textures/rawTexture";
import type { Mesh } from "../Meshes/mesh";
import type { Scene } from "../scene";
/**
 * Class to bake vertex animation textures.
 * @since 5.0
 */
export declare class VertexAnimationBaker {
    private _scene;
    private _mesh;
    /**
     * Create a new VertexAnimationBaker object which can help baking animations into a texture.
     * @param scene Defines the scene the VAT belongs to
     * @param mesh Defines the mesh the VAT belongs to
     */
    constructor(scene: Scene, mesh: Mesh);
    /**
     * Bakes the animation into the texture. This should be called once, when the
     * scene starts, so the VAT is generated and associated to the mesh.
     * @param ranges Defines the ranges in the animation that will be baked.
     * @returns The array of matrix transforms for each vertex (columns) and frame (rows), as a Float32Array.
     */
    bakeVertexData(ranges: AnimationRange[]): Promise<Float32Array>;
    /**
     * Runs an animation frame and stores its vertex data
     *
     * @param vertexData The array to save data to.
     * @param frameIndex Current frame in the skeleton animation to render.
     * @param textureIndex Current index of the texture data.
     */
    private _executeAnimationFrame;
    /**
     * Builds a vertex animation texture given the vertexData in an array.
     * @param vertexData The vertex animation data. You can generate it with bakeVertexData().
     * @returns The vertex animation texture to be used with BakedVertexAnimationManager.
     */
    textureFromBakedVertexData(vertexData: Float32Array): RawTexture;
    /**
     * Serializes our vertexData to an object, with a nice string for the vertexData.
     * @param vertexData The vertex array data.
     * @returns This object serialized to a JS dict.
     */
    serializeBakedVertexDataToObject(vertexData: Float32Array): Record<string, any>;
    /**
     * Loads previously baked data.
     * @param data The object as serialized by serializeBakedVertexDataToObject()
     * @returns The array of matrix transforms for each vertex (columns) and frame (rows), as a Float32Array.
     */
    loadBakedVertexDataFromObject(data: Record<string, any>): Float32Array;
    /**
     * Serializes our vertexData to a JSON string, with a nice string for the vertexData.
     * Should be called right after bakeVertexData().
     * @param vertexData The vertex array data.
     * @returns This object serialized to a safe string.
     */
    serializeBakedVertexDataToJSON(vertexData: Float32Array): string;
    /**
     * Loads previously baked data in string format.
     * @param json The json string as serialized by serializeBakedVertexDataToJSON().
     * @returns The array of matrix transforms for each vertex (columns) and frame (rows), as a Float32Array.
     */
    loadBakedVertexDataFromJSON(json: string): Float32Array;
}
