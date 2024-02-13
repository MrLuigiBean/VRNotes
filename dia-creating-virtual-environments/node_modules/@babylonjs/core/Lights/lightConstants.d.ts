/** Defines the cross module constantsused by lights to avoid circular dependencies */
export declare class LightConstants {
    /**
     * Falloff Default: light is falling off following the material specification:
     * standard material is using standard falloff whereas pbr material can request special falloff per materials.
     */
    static readonly FALLOFF_DEFAULT = 0;
    /**
     * Falloff Physical: light is falling off following the inverse squared distance law.
     */
    static readonly FALLOFF_PHYSICAL = 1;
    /**
     * Falloff gltf: light is falling off as described in the gltf moving to PBR document
     * to enhance interoperability with other engines.
     */
    static readonly FALLOFF_GLTF = 2;
    /**
     * Falloff Standard: light is falling off like in the standard material
     * to enhance interoperability with other materials.
     */
    static readonly FALLOFF_STANDARD = 3;
    /**
     * If every light affecting the material is in this lightmapMode,
     * material.lightmapTexture adds or multiplies
     * (depends on material.useLightmapAsShadowmap)
     * after every other light calculations.
     */
    static readonly LIGHTMAP_DEFAULT = 0;
    /**
     * material.lightmapTexture as only diffuse lighting from this light
     * adds only specular lighting from this light
     * adds dynamic shadows
     */
    static readonly LIGHTMAP_SPECULAR = 1;
    /**
     * material.lightmapTexture as only lighting
     * no light calculation from this light
     * only adds dynamic shadows from this light
     */
    static readonly LIGHTMAP_SHADOWSONLY = 2;
    /**
     * Each light type uses the default quantity according to its type:
     *      point/spot lights use luminous intensity
     *      directional lights use illuminance
     */
    static readonly INTENSITYMODE_AUTOMATIC = 0;
    /**
     * lumen (lm)
     */
    static readonly INTENSITYMODE_LUMINOUSPOWER = 1;
    /**
     * candela (lm/sr)
     */
    static readonly INTENSITYMODE_LUMINOUSINTENSITY = 2;
    /**
     * lux (lm/m^2)
     */
    static readonly INTENSITYMODE_ILLUMINANCE = 3;
    /**
     * nit (cd/m^2)
     */
    static readonly INTENSITYMODE_LUMINANCE = 4;
    /**
     * Light type const id of the point light.
     */
    static readonly LIGHTTYPEID_POINTLIGHT = 0;
    /**
     * Light type const id of the directional light.
     */
    static readonly LIGHTTYPEID_DIRECTIONALLIGHT = 1;
    /**
     * Light type const id of the spot light.
     */
    static readonly LIGHTTYPEID_SPOTLIGHT = 2;
    /**
     * Light type const id of the hemispheric light.
     */
    static readonly LIGHTTYPEID_HEMISPHERICLIGHT = 3;
    /**
     * Sort function to order lights for rendering.
     * @param a First Light object to compare to second.
     * @param b Second Light object to compare first.
     * @returns -1 to reduce's a's index relative to be, 0 for no change, 1 to increase a's index relative to b.
     */
    static CompareLightsPriority(a: ISortableLight, b: ISortableLight): number;
}
/**
 * Defines the common interface of sortable lights
 */
export interface ISortableLight {
    /**
     * Gets or sets whether or not the shadows are enabled for this light. This can help turning off/on shadow without detaching
     * the current shadow generator.
     */
    shadowEnabled: boolean;
    /**
     * Defines the rendering priority of the lights. It can help in case of fallback or number of lights
     * exceeding the number allowed of the materials.
     */
    renderPriority: number;
}
