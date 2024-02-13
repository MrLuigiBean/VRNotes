import type { Nullable } from "../../types";
import type { IAnimatable } from "../../Animations/animatable.interface";
import { Color3 } from "../../Maths/math.color";
import type { SmartArray } from "../../Misc/smartArray";
import type { BaseTexture } from "../../Materials/Textures/baseTexture";
import type { RenderTargetTexture } from "../../Materials/Textures/renderTargetTexture";
import type { UniformBuffer } from "../../Materials/uniformBuffer";
import type { EffectFallbacks } from "../effectFallbacks";
import type { SubMesh } from "../../Meshes/subMesh";
import { MaterialPluginBase } from "../materialPluginBase";
import { MaterialDefines } from "../materialDefines";
import type { Engine } from "../../Engines/engine";
import type { Scene } from "../../scene";
import type { PBRBaseMaterial } from "./pbrBaseMaterial";
/**
 * @internal
 */
export declare class MaterialSubSurfaceDefines extends MaterialDefines {
    SUBSURFACE: boolean;
    SS_REFRACTION: boolean;
    SS_REFRACTION_USE_INTENSITY_FROM_TEXTURE: boolean;
    SS_TRANSLUCENCY: boolean;
    SS_TRANSLUCENCY_USE_INTENSITY_FROM_TEXTURE: boolean;
    SS_SCATTERING: boolean;
    SS_DISPERSION: boolean;
    SS_THICKNESSANDMASK_TEXTURE: boolean;
    SS_THICKNESSANDMASK_TEXTUREDIRECTUV: number;
    SS_HAS_THICKNESS: boolean;
    SS_REFRACTIONINTENSITY_TEXTURE: boolean;
    SS_REFRACTIONINTENSITY_TEXTUREDIRECTUV: number;
    SS_TRANSLUCENCYINTENSITY_TEXTURE: boolean;
    SS_TRANSLUCENCYINTENSITY_TEXTUREDIRECTUV: number;
    SS_REFRACTIONMAP_3D: boolean;
    SS_REFRACTIONMAP_OPPOSITEZ: boolean;
    SS_LODINREFRACTIONALPHA: boolean;
    SS_GAMMAREFRACTION: boolean;
    SS_RGBDREFRACTION: boolean;
    SS_LINEARSPECULARREFRACTION: boolean;
    SS_LINKREFRACTIONTOTRANSPARENCY: boolean;
    SS_ALBEDOFORREFRACTIONTINT: boolean;
    SS_ALBEDOFORTRANSLUCENCYTINT: boolean;
    SS_USE_LOCAL_REFRACTIONMAP_CUBIC: boolean;
    SS_USE_THICKNESS_AS_DEPTH: boolean;
    SS_MASK_FROM_THICKNESS_TEXTURE: boolean;
    SS_USE_GLTF_TEXTURES: boolean;
}
/**
 * Plugin that implements the sub surface component of the PBR material
 */
export declare class PBRSubSurfaceConfiguration extends MaterialPluginBase {
    protected _material: PBRBaseMaterial;
    private _isRefractionEnabled;
    /**
     * Defines if the refraction is enabled in the material.
     */
    isRefractionEnabled: boolean;
    private _isTranslucencyEnabled;
    /**
     * Defines if the translucency is enabled in the material.
     */
    isTranslucencyEnabled: boolean;
    private _isDispersionEnabled;
    /**
     * Defines if dispersion is enabled in the material.
     */
    isDispersionEnabled: boolean;
    private _isScatteringEnabled;
    /**
     * Defines if the sub surface scattering is enabled in the material.
     */
    isScatteringEnabled: boolean;
    private _scatteringDiffusionProfileIndex;
    /**
     * Diffusion profile for subsurface scattering.
     * Useful for better scattering in the skins or foliages.
     */
    get scatteringDiffusionProfile(): Nullable<Color3>;
    set scatteringDiffusionProfile(c: Nullable<Color3>);
    /**
     * Defines the refraction intensity of the material.
     * The refraction when enabled replaces the Diffuse part of the material.
     * The intensity helps transitioning between diffuse and refraction.
     */
    refractionIntensity: number;
    /**
     * Defines the translucency intensity of the material.
     * When translucency has been enabled, this defines how much of the "translucency"
     * is added to the diffuse part of the material.
     */
    translucencyIntensity: number;
    /**
     * When enabled, transparent surfaces will be tinted with the albedo colour (independent of thickness)
     */
    useAlbedoToTintRefraction: boolean;
    /**
     * When enabled, translucent surfaces will be tinted with the albedo colour (independent of thickness)
     */
    useAlbedoToTintTranslucency: boolean;
    private _thicknessTexture;
    /**
     * Stores the average thickness of a mesh in a texture (The texture is holding the values linearly).
     * The red (or green if useGltfStyleTextures=true) channel of the texture should contain the thickness remapped between 0 and 1.
     * 0 would mean minimumThickness
     * 1 would mean maximumThickness
     * The other channels might be use as a mask to vary the different effects intensity.
     */
    thicknessTexture: Nullable<BaseTexture>;
    private _refractionTexture;
    /**
     * Defines the texture to use for refraction.
     */
    refractionTexture: Nullable<BaseTexture>;
    /** @internal */
    _indexOfRefraction: number;
    /**
     * Index of refraction of the material base layer.
     * https://en.wikipedia.org/wiki/List_of_refractive_indices
     *
     * This does not only impact refraction but also the Base F0 of Dielectric Materials.
     *
     * From dielectric fresnel rules: F0 = square((iorT - iorI) / (iorT + iorI))
     */
    indexOfRefraction: number;
    private _volumeIndexOfRefraction;
    /**
     * Index of refraction of the material's volume.
     * https://en.wikipedia.org/wiki/List_of_refractive_indices
     *
     * This ONLY impacts refraction. If not provided or given a non-valid value,
     * the volume will use the same IOR as the surface.
     */
    get volumeIndexOfRefraction(): number;
    set volumeIndexOfRefraction(value: number);
    private _invertRefractionY;
    /**
     * Controls if refraction needs to be inverted on Y. This could be useful for procedural texture.
     */
    invertRefractionY: boolean;
    /** @internal */
    _linkRefractionWithTransparency: boolean;
    /**
     * This parameters will make the material used its opacity to control how much it is refracting against not.
     * Materials half opaque for instance using refraction could benefit from this control.
     */
    linkRefractionWithTransparency: boolean;
    /**
     * Defines the minimum thickness stored in the thickness map.
     * If no thickness map is defined, this value will be used to simulate thickness.
     */
    minimumThickness: number;
    /**
     * Defines the maximum thickness stored in the thickness map.
     */
    maximumThickness: number;
    /**
     * Defines that the thickness should be used as a measure of the depth volume.
     */
    useThicknessAsDepth: boolean;
    /**
     * Defines the volume tint of the material.
     * This is used for both translucency and scattering.
     */
    tintColor: Color3;
    /**
     * Defines the distance at which the tint color should be found in the media.
     * This is used for refraction only.
     */
    tintColorAtDistance: number;
    /**
     * Defines the Abbe number for the volume.
     */
    dispersion: number;
    /**
     * Defines how far each channel transmit through the media.
     * It is defined as a color to simplify it selection.
     */
    diffusionDistance: Color3;
    private _useMaskFromThicknessTexture;
    /**
     * Stores the intensity of the different subsurface effects in the thickness texture.
     * Note that if refractionIntensityTexture and/or translucencyIntensityTexture is provided it takes precedence over thicknessTexture + useMaskFromThicknessTexture
     * * the green (red if useGltfStyleTextures = true) channel is the refraction intensity.
     * * the blue channel is the translucency intensity.
     */
    useMaskFromThicknessTexture: boolean;
    private _refractionIntensityTexture;
    /**
     * Stores the intensity of the refraction. If provided, it takes precedence over thicknessTexture + useMaskFromThicknessTexture
     * * the green (red if useGltfStyleTextures = true) channel is the refraction intensity.
     */
    refractionIntensityTexture: Nullable<BaseTexture>;
    private _translucencyIntensityTexture;
    /**
     * Stores the intensity of the translucency. If provided, it takes precedence over thicknessTexture + useMaskFromThicknessTexture
     * * the blue channel is the translucency intensity.
     */
    translucencyIntensityTexture: Nullable<BaseTexture>;
    private _scene;
    private _useGltfStyleTextures;
    /**
     * Use channels layout used by glTF:
     * * thicknessTexture: the green (instead of red) channel is the thickness
     * * thicknessTexture/refractionIntensityTexture: the red (instead of green) channel is the refraction intensity
     * * thicknessTexture/translucencyIntensityTexture: no change, use the blue channel for the translucency intensity
     */
    useGltfStyleTextures: boolean;
    /** @internal */
    private _internalMarkAllSubMeshesAsTexturesDirty;
    private _internalMarkScenePrePassDirty;
    /** @internal */
    _markAllSubMeshesAsTexturesDirty(): void;
    /** @internal */
    _markScenePrePassDirty(): void;
    constructor(material: PBRBaseMaterial, addToPluginList?: boolean);
    isReadyForSubMesh(defines: MaterialSubSurfaceDefines, scene: Scene): boolean;
    prepareDefinesBeforeAttributes(defines: MaterialSubSurfaceDefines, scene: Scene): void;
    /**
     * Binds the material data (this function is called even if mustRebind() returns false)
     * @param uniformBuffer defines the Uniform buffer to fill in.
     * @param scene defines the scene the material belongs to.
     * @param engine defines the engine the material belongs to.
     * @param subMesh the submesh to bind data for
     */
    hardBindForSubMesh(uniformBuffer: UniformBuffer, scene: Scene, engine: Engine, subMesh: SubMesh): void;
    bindForSubMesh(uniformBuffer: UniformBuffer, scene: Scene, engine: Engine, subMesh: SubMesh): void;
    /**
     * Returns the texture used for refraction or null if none is used.
     * @param scene defines the scene the material belongs to.
     * @returns - Refraction texture if present.  If no refraction texture and refraction
     * is linked with transparency, returns environment texture.  Otherwise, returns null.
     */
    private _getRefractionTexture;
    /**
     * Returns true if alpha blending should be disabled.
     */
    get disableAlphaBlending(): boolean;
    /**
     * Fills the list of render target textures.
     * @param renderTargets the list of render targets to update
     */
    fillRenderTargetTextures(renderTargets: SmartArray<RenderTargetTexture>): void;
    hasTexture(texture: BaseTexture): boolean;
    hasRenderTargetTextures(): boolean;
    getActiveTextures(activeTextures: BaseTexture[]): void;
    getAnimatables(animatables: IAnimatable[]): void;
    dispose(forceDisposeTextures?: boolean): void;
    getClassName(): string;
    addFallbacks(defines: MaterialSubSurfaceDefines, fallbacks: EffectFallbacks, currentRank: number): number;
    getSamplers(samplers: string[]): void;
    getUniforms(): {
        ubo?: Array<{
            name: string;
            size: number;
            type: string;
        }>;
        vertex?: string;
        fragment?: string;
    };
}
