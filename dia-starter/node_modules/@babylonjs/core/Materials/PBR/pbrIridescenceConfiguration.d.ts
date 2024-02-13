import type { Nullable } from "../../types";
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
export declare class MaterialIridescenceDefines extends MaterialDefines {
    IRIDESCENCE: boolean;
    IRIDESCENCE_TEXTURE: boolean;
    IRIDESCENCE_TEXTUREDIRECTUV: number;
    IRIDESCENCE_THICKNESS_TEXTURE: boolean;
    IRIDESCENCE_THICKNESS_TEXTUREDIRECTUV: number;
    IRIDESCENCE_USE_THICKNESS_FROM_MAINTEXTURE: boolean;
}
/**
 * Plugin that implements the iridescence (thin film) component of the PBR material
 */
export declare class PBRIridescenceConfiguration extends MaterialPluginBase {
    protected _material: PBRBaseMaterial;
    /**
     * The default minimum thickness of the thin-film layer given in nanometers (nm).
     * Defaults to 100 nm.
     * @internal
     */
    static readonly _DefaultMinimumThickness = 100;
    /**
     * The default maximum thickness of the thin-film layer given in nanometers (nm).
     * Defaults to 400 nm.
     * @internal
     */
    static readonly _DefaultMaximumThickness = 400;
    /**
     * The default index of refraction of the thin-film layer.
     * Defaults to 1.3
     * @internal
     */
    static readonly _DefaultIndexOfRefraction = 1.3;
    private _isEnabled;
    /**
     * Defines if the iridescence is enabled in the material.
     */
    isEnabled: boolean;
    /**
     * Defines the iridescence layer strength (between 0 and 1) it defaults to 1.
     */
    intensity: number;
    /**
     * Defines the minimum thickness of the thin-film layer given in nanometers (nm).
     */
    minimumThickness: number;
    /**
     * Defines the maximum thickness of the thin-film layer given in nanometers (nm). This will be the thickness used if not thickness texture has been set.
     */
    maximumThickness: number;
    /**
     * Defines the maximum thickness of the thin-film layer given in nanometers (nm).
     */
    indexOfRefraction: number;
    private _texture;
    /**
     * Stores the iridescence intensity in a texture (red channel)
     */
    texture: Nullable<BaseTexture>;
    private _thicknessTexture;
    /**
     * Stores the iridescence thickness in a texture (green channel)
     */
    thicknessTexture: Nullable<BaseTexture>;
    /** @internal */
    private _internalMarkAllSubMeshesAsTexturesDirty;
    /** @internal */
    _markAllSubMeshesAsTexturesDirty(): void;
    constructor(material: PBRBaseMaterial, addToPluginList?: boolean);
    isReadyForSubMesh(defines: MaterialIridescenceDefines, scene: Scene): boolean;
    prepareDefinesBeforeAttributes(defines: MaterialIridescenceDefines, scene: Scene): void;
    bindForSubMesh(uniformBuffer: UniformBuffer, scene: Scene, engine: Engine, subMesh: SubMesh): void;
    hasTexture(texture: BaseTexture): boolean;
    getActiveTextures(activeTextures: BaseTexture[]): void;
    getAnimatables(animatables: IAnimatable[]): void;
    dispose(forceDisposeTextures?: boolean): void;
    getClassName(): string;
    addFallbacks(defines: MaterialIridescenceDefines, fallbacks: EffectFallbacks, currentRank: number): number;
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
