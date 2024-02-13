import type { Scene } from "../../scene";
import type { Color3 } from "../../Maths/math.color";
import type { BaseTexture } from "../../Materials/Textures/baseTexture";
import { PBRBaseSimpleMaterial } from "./pbrBaseSimpleMaterial";
import type { Nullable } from "../../types";
/**
 * The PBR material of BJS following the metal roughness convention.
 *
 * This fits to the PBR convention in the GLTF definition:
 * https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Archived/KHR_materials_pbrSpecularGlossiness/README.md
 */
export declare class PBRMetallicRoughnessMaterial extends PBRBaseSimpleMaterial {
    /**
     * The base color has two different interpretations depending on the value of metalness.
     * When the material is a metal, the base color is the specific measured reflectance value
     * at normal incidence (F0). For a non-metal the base color represents the reflected diffuse color
     * of the material.
     */
    baseColor: Color3;
    /**
     * Base texture of the metallic workflow. It contains both the baseColor information in RGB as
     * well as opacity information in the alpha channel.
     */
    baseTexture: Nullable<BaseTexture>;
    /**
     * Specifies the metallic scalar value of the material.
     * Can also be used to scale the metalness values of the metallic texture.
     */
    metallic: number;
    /**
     * Specifies the roughness scalar value of the material.
     * Can also be used to scale the roughness values of the metallic texture.
     */
    roughness: number;
    /**
     * Texture containing both the metallic value in the B channel and the
     * roughness value in the G channel to keep better precision.
     */
    metallicRoughnessTexture: Nullable<BaseTexture>;
    /**
     * Instantiates a new PBRMetalRoughnessMaterial instance.
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
    clone(name: string): PBRMetallicRoughnessMaterial;
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
    static Parse(source: any, scene: Scene, rootUrl: string): PBRMetallicRoughnessMaterial;
}
