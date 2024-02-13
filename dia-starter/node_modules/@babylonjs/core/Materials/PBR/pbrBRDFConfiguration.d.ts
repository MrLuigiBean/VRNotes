import { MaterialDefines } from "../materialDefines";
import { MaterialPluginBase } from "../materialPluginBase";
import type { PBRBaseMaterial } from "./pbrBaseMaterial";
/**
 * @internal
 */
export declare class MaterialBRDFDefines extends MaterialDefines {
    BRDF_V_HEIGHT_CORRELATED: boolean;
    MS_BRDF_ENERGY_CONSERVATION: boolean;
    SPHERICAL_HARMONICS: boolean;
    SPECULAR_GLOSSINESS_ENERGY_CONSERVATION: boolean;
}
/**
 * Plugin that implements the BRDF component of the PBR material
 */
export declare class PBRBRDFConfiguration extends MaterialPluginBase {
    /**
     * Default value used for the energy conservation.
     * This should only be changed to adapt to the type of texture in scene.environmentBRDFTexture.
     */
    static DEFAULT_USE_ENERGY_CONSERVATION: boolean;
    /**
     * Default value used for the Smith Visibility Height Correlated mode.
     * This should only be changed to adapt to the type of texture in scene.environmentBRDFTexture.
     */
    static DEFAULT_USE_SMITH_VISIBILITY_HEIGHT_CORRELATED: boolean;
    /**
     * Default value used for the IBL diffuse part.
     * This can help switching back to the polynomials mode globally which is a tiny bit
     * less GPU intensive at the drawback of a lower quality.
     */
    static DEFAULT_USE_SPHERICAL_HARMONICS: boolean;
    /**
     * Default value used for activating energy conservation for the specular workflow.
     * If activated, the albedo color is multiplied with (1. - maxChannel(specular color)).
     * If deactivated, a material is only physically plausible, when (albedo color + specular color) < 1.
     */
    static DEFAULT_USE_SPECULAR_GLOSSINESS_INPUT_ENERGY_CONSERVATION: boolean;
    private _useEnergyConservation;
    /**
     * Defines if the material uses energy conservation.
     */
    useEnergyConservation: boolean;
    private _useSmithVisibilityHeightCorrelated;
    /**
     * LEGACY Mode set to false
     * Defines if the material uses height smith correlated visibility term.
     * If you intent to not use our default BRDF, you need to load a separate BRDF Texture for the PBR
     * You can either load https://assets.babylonjs.com/environments/uncorrelatedBRDF.png
     * or https://assets.babylonjs.com/environments/uncorrelatedBRDF.dds to have more precision
     * Not relying on height correlated will also disable energy conservation.
     */
    useSmithVisibilityHeightCorrelated: boolean;
    private _useSphericalHarmonics;
    /**
     * LEGACY Mode set to false
     * Defines if the material uses spherical harmonics vs spherical polynomials for the
     * diffuse part of the IBL.
     * The harmonics despite a tiny bigger cost has been proven to provide closer results
     * to the ground truth.
     */
    useSphericalHarmonics: boolean;
    private _useSpecularGlossinessInputEnergyConservation;
    /**
     * Defines if the material uses energy conservation, when the specular workflow is active.
     * If activated, the albedo color is multiplied with (1. - maxChannel(specular color)).
     * If deactivated, a material is only physically plausible, when (albedo color + specular color) < 1.
     * In the deactivated case, the material author has to ensure energy conservation, for a physically plausible rendering.
     */
    useSpecularGlossinessInputEnergyConservation: boolean;
    /** @internal */
    private _internalMarkAllSubMeshesAsMiscDirty;
    /** @internal */
    _markAllSubMeshesAsMiscDirty(): void;
    constructor(material: PBRBaseMaterial, addToPluginList?: boolean);
    prepareDefines(defines: MaterialBRDFDefines): void;
    getClassName(): string;
}
