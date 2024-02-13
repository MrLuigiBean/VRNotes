import type { PrePassEffectConfiguration } from "./prePassEffectConfiguration";
/**
 * Contains all parameters needed for the prepass to perform
 * screen space reflections
 */
export declare class ScreenSpaceReflectionsConfiguration implements PrePassEffectConfiguration {
    /**
     * Is ssr enabled
     */
    enabled: boolean;
    /**
     * Name of the configuration
     */
    name: string;
    /**
     * Textures that should be present in the MRT for this effect to work
     */
    readonly texturesRequired: number[];
}
