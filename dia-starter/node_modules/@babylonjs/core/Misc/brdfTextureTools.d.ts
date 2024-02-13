import type { BaseTexture } from "../Materials/Textures/baseTexture";
import type { Scene } from "../scene";
/**
 * Gets a default environment BRDF for MS-BRDF Height Correlated BRDF
 * @param scene defines the hosting scene
 * @returns the environment BRDF texture
 */
export declare const GetEnvironmentBRDFTexture: (scene: Scene) => BaseTexture;
/**
 * Class used to host texture specific utilities
 */
export declare const BRDFTextureTools: {
    /**
     * Gets a default environment BRDF for MS-BRDF Height Correlated BRDF
     * @param scene defines the hosting scene
     * @returns the environment BRDF texture
     */
    GetEnvironmentBRDFTexture: (scene: Scene) => BaseTexture;
};
