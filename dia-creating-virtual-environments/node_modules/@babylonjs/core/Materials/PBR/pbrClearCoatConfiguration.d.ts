import type { Nullable } from "../../types";
import { Color3 } from "../../Maths/math.color";
import type { BaseTexture } from "../../Materials/Textures/baseTexture";
import type { UniformBuffer } from "../../Materials/uniformBuffer";
import type { IAnimatable } from "../../Animations/animatable.interface";
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
export declare class MaterialClearCoatDefines extends MaterialDefines {
    CLEARCOAT: boolean;
    CLEARCOAT_DEFAULTIOR: boolean;
    CLEARCOAT_TEXTURE: boolean;
    CLEARCOAT_TEXTURE_ROUGHNESS: boolean;
    CLEARCOAT_TEXTUREDIRECTUV: number;
    CLEARCOAT_TEXTURE_ROUGHNESSDIRECTUV: number;
    CLEARCOAT_BUMP: boolean;
    CLEARCOAT_BUMPDIRECTUV: number;
    CLEARCOAT_USE_ROUGHNESS_FROM_MAINTEXTURE: boolean;
    CLEARCOAT_TEXTURE_ROUGHNESS_IDENTICAL: boolean;
    CLEARCOAT_REMAP_F0: boolean;
    CLEARCOAT_TINT: boolean;
    CLEARCOAT_TINT_TEXTURE: boolean;
    CLEARCOAT_TINT_TEXTUREDIRECTUV: number;
    CLEARCOAT_TINT_GAMMATEXTURE: boolean;
}
/**
 * Plugin that implements the clear coat component of the PBR material
 */
export declare class PBRClearCoatConfiguration extends MaterialPluginBase {
    protected _material: PBRBaseMaterial;
    /**
     * This defaults to 1.5 corresponding to a 0.04 f0 or a 4% reflectance at normal incidence
     * The default fits with a polyurethane material.
     * @internal
     */
    static readonly _DefaultIndexOfRefraction = 1.5;
    private _isEnabled;
    /**
     * Defines if the clear coat is enabled in the material.
     */
    isEnabled: boolean;
    /**
     * Defines the clear coat layer strength (between 0 and 1) it defaults to 1.
     */
    intensity: number;
    /**
     * Defines the clear coat layer roughness.
     */
    roughness: number;
    private _indexOfRefraction;
    /**
     * Defines the index of refraction of the clear coat.
     * This defaults to 1.5 corresponding to a 0.04 f0 or a 4% reflectance at normal incidence
     * The default fits with a polyurethane material.
     * Changing the default value is more performance intensive.
     */
    indexOfRefraction: number;
    private _texture;
    /**
     * Stores the clear coat values in a texture (red channel is intensity and green channel is roughness)
     * If useRoughnessFromMainTexture is false, the green channel of texture is not used and the green channel of textureRoughness is used instead
     * if textureRoughness is not empty, else no texture roughness is used
     */
    texture: Nullable<BaseTexture>;
    private _useRoughnessFromMainTexture;
    /**
     * Indicates that the green channel of the texture property will be used for roughness (default: true)
     * If false, the green channel from textureRoughness is used for roughness
     */
    useRoughnessFromMainTexture: boolean;
    private _textureRoughness;
    /**
     * Stores the clear coat roughness in a texture (green channel)
     * Not used if useRoughnessFromMainTexture is true
     */
    textureRoughness: Nullable<BaseTexture>;
    private _remapF0OnInterfaceChange;
    /**
     * Defines if the F0 value should be remapped to account for the interface change in the material.
     */
    remapF0OnInterfaceChange: boolean;
    private _bumpTexture;
    /**
     * Define the clear coat specific bump texture.
     */
    bumpTexture: Nullable<BaseTexture>;
    private _isTintEnabled;
    /**
     * Defines if the clear coat tint is enabled in the material.
     */
    isTintEnabled: boolean;
    /**
     * Defines the clear coat tint of the material.
     * This is only use if tint is enabled
     */
    tintColor: Color3;
    /**
     * Defines the distance at which the tint color should be found in the
     * clear coat media.
     * This is only use if tint is enabled
     */
    tintColorAtDistance: number;
    /**
     * Defines the clear coat layer thickness.
     * This is only use if tint is enabled
     */
    tintThickness: number;
    private _tintTexture;
    /**
     * Stores the clear tint values in a texture.
     * rgb is tint
     * a is a thickness factor
     */
    tintTexture: Nullable<BaseTexture>;
    /** @internal */
    private _internalMarkAllSubMeshesAsTexturesDirty;
    /** @internal */
    _markAllSubMeshesAsTexturesDirty(): void;
    constructor(material: PBRBaseMaterial, addToPluginList?: boolean);
    isReadyForSubMesh(defines: MaterialClearCoatDefines, scene: Scene, engine: Engine): boolean;
    prepareDefinesBeforeAttributes(defines: MaterialClearCoatDefines, scene: Scene): void;
    bindForSubMesh(uniformBuffer: UniformBuffer, scene: Scene, engine: Engine, subMesh: SubMesh): void;
    hasTexture(texture: BaseTexture): boolean;
    getActiveTextures(activeTextures: BaseTexture[]): void;
    getAnimatables(animatables: IAnimatable[]): void;
    dispose(forceDisposeTextures?: boolean): void;
    getClassName(): string;
    addFallbacks(defines: MaterialClearCoatDefines, fallbacks: EffectFallbacks, currentRank: number): number;
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
