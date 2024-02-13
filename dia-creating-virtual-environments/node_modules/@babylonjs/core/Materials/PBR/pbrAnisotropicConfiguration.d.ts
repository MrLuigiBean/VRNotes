import type { UniformBuffer } from "../../Materials/uniformBuffer";
import { Vector2 } from "../../Maths/math.vector";
import type { BaseTexture } from "../../Materials/Textures/baseTexture";
import type { Nullable } from "../../types";
import type { IAnimatable } from "../../Animations/animatable.interface";
import type { EffectFallbacks } from "../effectFallbacks";
import { MaterialPluginBase } from "../materialPluginBase";
import { MaterialDefines } from "../materialDefines";
import type { Scene } from "../../scene";
import type { AbstractMesh } from "../../Meshes/abstractMesh";
import type { PBRBaseMaterial } from "./pbrBaseMaterial";
/**
 * @internal
 */
export declare class MaterialAnisotropicDefines extends MaterialDefines {
    ANISOTROPIC: boolean;
    ANISOTROPIC_TEXTURE: boolean;
    ANISOTROPIC_TEXTUREDIRECTUV: number;
    ANISOTROPIC_LEGACY: boolean;
    MAINUV1: boolean;
}
/**
 * Plugin that implements the anisotropic component of the PBR material
 */
export declare class PBRAnisotropicConfiguration extends MaterialPluginBase {
    private _isEnabled;
    /**
     * Defines if the anisotropy is enabled in the material.
     */
    isEnabled: boolean;
    /**
     * Defines the anisotropy strength (between 0 and 1) it defaults to 1.
     */
    intensity: number;
    /**
     * Defines if the effect is along the tangents, bitangents or in between.
     * By default, the effect is "stretching" the highlights along the tangents.
     */
    direction: Vector2;
    /**
     * Sets the anisotropy direction as an angle.
     */
    set angle(value: number);
    /**
     * Gets the anisotropy angle value in radians.
     * @returns the anisotropy angle value in radians.
     */
    get angle(): number;
    private _texture;
    /**
     * Stores the anisotropy values in a texture.
     * rg is direction (like normal from -1 to 1)
     * b is a intensity
     */
    texture: Nullable<BaseTexture>;
    private _legacy;
    /**
     * Defines if the anisotropy is in legacy mode for backwards compatibility before 6.4.0.
     */
    legacy: boolean;
    /** @internal */
    private _internalMarkAllSubMeshesAsTexturesDirty;
    /** @internal */
    _markAllSubMeshesAsTexturesDirty(): void;
    /** @internal */
    private _internalMarkAllSubMeshesAsMiscDirty;
    /** @internal */
    _markAllSubMeshesAsMiscDirty(): void;
    constructor(material: PBRBaseMaterial, addToPluginList?: boolean);
    isReadyForSubMesh(defines: MaterialAnisotropicDefines, scene: Scene): boolean;
    prepareDefinesBeforeAttributes(defines: MaterialAnisotropicDefines, scene: Scene, mesh: AbstractMesh): void;
    bindForSubMesh(uniformBuffer: UniformBuffer, scene: Scene): void;
    hasTexture(texture: BaseTexture): boolean;
    getActiveTextures(activeTextures: BaseTexture[]): void;
    getAnimatables(animatables: IAnimatable[]): void;
    dispose(forceDisposeTextures?: boolean): void;
    getClassName(): string;
    addFallbacks(defines: MaterialAnisotropicDefines, fallbacks: EffectFallbacks, currentRank: number): number;
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
    /**
     * Parses a anisotropy Configuration from a serialized object.
     * @param source - Serialized object.
     * @param scene Defines the scene we are parsing for
     * @param rootUrl Defines the rootUrl to load from
     */
    parse(source: any, scene: Scene, rootUrl: string): void;
}
