import type { Scene } from "../../scene";
import type { Color3 } from "../../Maths/math.color";
import type { BaseTexture } from "../../Materials/Textures/baseTexture";
import { PBRBaseSimpleMaterial } from "./pbrBaseSimpleMaterial";
import type { Nullable } from "../../types";
/**
 * The PBR material of BJS following the specular glossiness convention.
 *
 * This fits to the PBR convention in the GLTF definition:
 * https://github.com/KhronosGroup/glTF/tree/2.0/extensions/Khronos/KHR_materials_pbrSpecularGlossiness
 */
export declare class PBRSpecularGlossinessMaterial extends PBRBaseSimpleMaterial {
    /**
     * Specifies the diffuse color of the material.
     */
    diffuseColor: Color3;
    /**
     * Specifies the diffuse texture of the material. This can also contains the opacity value in its alpha
     * channel.
     */
    diffuseTexture: Nullable<BaseTexture>;
    /**
     * Specifies the specular color of the material. This indicates how reflective is the material (none to mirror).
     */
    specularColor: Color3;
    /**
     * Specifies the glossiness of the material. This indicates "how sharp is the reflection".
     */
    glossiness: number;
    /**
     * Specifies both the specular color RGB and the glossiness A of the material per pixels.
     */
    specularGlossinessTexture: Nullable<BaseTexture>;
    /**
     * Specifies if the reflectivity texture contains the glossiness information in its alpha channel.
     */
    get useMicroSurfaceFromReflectivityMapAlpha(): boolean;
    /**
     * Instantiates a new PBRSpecularGlossinessMaterial instance.
     *
     * @param name The material name
     * @param scene The scene the material will be use in.
     */
    constructor(name: string, scene?: Scene);
    /**
     * Return the current class name of the material.
     */
    getClassName(): string;
    /**
     * Makes a duplicate of the current material.
     * @param name - name to use for the new material.
     */
    clone(name: string): PBRSpecularGlossinessMaterial;
    /**
     * Serialize the material to a parsable JSON object.
     */
    serialize(): any;
    /**
     * Parses a JSON object corresponding to the serialize function.
     * @param source
     * @param scene
     * @param rootUrl
     */
    static Parse(source: any, scene: Scene, rootUrl: string): PBRSpecularGlossinessMaterial;
}
