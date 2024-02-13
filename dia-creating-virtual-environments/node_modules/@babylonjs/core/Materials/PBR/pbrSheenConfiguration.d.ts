import type { UniformBuffer } from "../../Materials/uniformBuffer";
import { Color3 } from "../../Maths/math.color";
import type { BaseTexture } from "../../Materials/Textures/baseTexture";
import type { Nullable } from "../../types";
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
export declare class MaterialSheenDefines extends MaterialDefines {
    SHEEN: boolean;
    SHEEN_TEXTURE: boolean;
    SHEEN_GAMMATEXTURE: boolean;
    SHEEN_TEXTURE_ROUGHNESS: boolean;
    SHEEN_TEXTUREDIRECTUV: number;
    SHEEN_TEXTURE_ROUGHNESSDIRECTUV: number;
    SHEEN_LINKWITHALBEDO: boolean;
    SHEEN_ROUGHNESS: boolean;
    SHEEN_ALBEDOSCALING: boolean;
    SHEEN_USE_ROUGHNESS_FROM_MAINTEXTURE: boolean;
    SHEEN_TEXTURE_ROUGHNESS_IDENTICAL: boolean;
}
/**
 * Plugin that implements the sheen component of the PBR material.
 */
export declare class PBRSheenConfiguration extends MaterialPluginBase {
    private _isEnabled;
    /**
     * Defines if the material uses sheen.
     */
    isEnabled: boolean;
    private _linkSheenWithAlbedo;
    /**
     * Defines if the sheen is linked to the sheen color.
     */
    linkSheenWithAlbedo: boolean;
    /**
     * Defines the sheen intensity.
     */
    intensity: number;
    /**
     * Defines the sheen color.
     */
    color: Color3;
    private _texture;
    /**
     * Stores the sheen tint values in a texture.
     * rgb is tint
     * a is a intensity or roughness if the roughness property has been defined and useRoughnessFromTexture is true (in that case, textureRoughness won't be used)
     * If the roughness property has been defined and useRoughnessFromTexture is false then the alpha channel is not used to modulate roughness
     */
    texture: Nullable<BaseTexture>;
    private _useRoughnessFromMainTexture;
    /**
     * Indicates that the alpha channel of the texture property will be used for roughness.
     * Has no effect if the roughness (and texture!) property is not defined
     */
    useRoughnessFromMainTexture: boolean;
    private _roughness;
    /**
     * Defines the sheen roughness.
     * It is not taken into account if linkSheenWithAlbedo is true.
     * To stay backward compatible, material roughness is used instead if sheen roughness = null
     */
    roughness: Nullable<number>;
    private _textureRoughness;
    /**
     * Stores the sheen roughness in a texture.
     * alpha channel is the roughness. This texture won't be used if the texture property is not empty and useRoughnessFromTexture is true
     */
    textureRoughness: Nullable<BaseTexture>;
    private _albedoScaling;
    /**
     * If true, the sheen effect is layered above the base BRDF with the albedo-scaling technique.
     * It allows the strength of the sheen effect to not depend on the base color of the material,
     * making it easier to setup and tweak the effect
     */
    albedoScaling: boolean;
    /** @internal */
    private _internalMarkAllSubMeshesAsTexturesDirty;
    /** @internal */
    _markAllSubMeshesAsTexturesDirty(): void;
    constructor(material: PBRBaseMaterial, addToPluginList?: boolean);
    isReadyForSubMesh(defines: MaterialSheenDefines, scene: Scene): boolean;
    prepareDefinesBeforeAttributes(defines: MaterialSheenDefines, scene: Scene): void;
    bindForSubMesh(uniformBuffer: UniformBuffer, scene: Scene, engine: Engine, subMesh: SubMesh): void;
    hasTexture(texture: BaseTexture): boolean;
    getActiveTextures(activeTextures: BaseTexture[]): void;
    getAnimatables(animatables: IAnimatable[]): void;
    dispose(forceDisposeTextures?: boolean): void;
    getClassName(): string;
    addFallbacks(defines: MaterialSheenDefines, fallbacks: EffectFallbacks, currentRank: number): number;
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
