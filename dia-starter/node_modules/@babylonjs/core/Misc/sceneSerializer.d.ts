import type { Scene } from "../scene";
/**
 * Class used to serialize a scene into a string
 */
export declare class SceneSerializer {
    /**
     * Clear cache used by a previous serialization
     */
    static ClearCache(): void;
    /**
     * Serialize a scene into a JSON compatible object
     * Note that if the current engine does not support synchronous texture reading (like WebGPU), you should use SerializeAsync instead
     * as else you may not retrieve the proper base64 encoded texture data (when using the Texture.ForceSerializeBuffers flag)
     * @param scene defines the scene to serialize
     * @returns a JSON compatible object
     */
    static Serialize(scene: Scene): any;
    private static _Serialize;
    /**
     * Serialize a scene into a JSON compatible object
     * @param scene defines the scene to serialize
     * @returns a JSON promise compatible object
     */
    static SerializeAsync(scene: Scene): Promise<any>;
    private static _CollectPromises;
    /**
     * Serialize a mesh into a JSON compatible object
     * @param toSerialize defines the mesh to serialize
     * @param withParents defines if parents must be serialized as well
     * @param withChildren defines if children must be serialized as well
     * @returns a JSON compatible object
     */
    static SerializeMesh(toSerialize: any, withParents?: boolean, withChildren?: boolean): any;
}
