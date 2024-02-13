import type { Nullable } from "../types";
import type { BaseTexture } from "./Textures/baseTexture";
import type { UniformBuffer } from "./uniformBuffer";
import type { IAnimatable } from "../Animations/animatable.interface";
import { MaterialDefines } from "./materialDefines";
import { MaterialPluginBase } from "./materialPluginBase";
import type { Engine } from "../Engines/engine";
import type { Scene } from "../scene";
import type { StandardMaterial } from "./standardMaterial";
import type { PBRBaseMaterial } from "./PBR/pbrBaseMaterial";
/**
 * @internal
 */
export declare class MaterialDetailMapDefines extends MaterialDefines {
    DETAIL: boolean;
    DETAILDIRECTUV: number;
    DETAIL_NORMALBLENDMETHOD: number;
}
/**
 * Plugin that implements the detail map component of a material
 *
 * Inspired from:
 *   Unity: https://docs.unity3d.com/Packages/com.unity.render-pipelines.high-definition@9.0/manual/Mask-Map-and-Detail-Map.html and https://docs.unity3d.com/Manual/StandardShaderMaterialParameterDetail.html
 *   Unreal: https://docs.unrealengine.com/en-US/Engine/Rendering/Materials/HowTo/DetailTexturing/index.html
 *   Cryengine: https://docs.cryengine.com/display/SDKDOC2/Detail+Maps
 */
export declare class DetailMapConfiguration extends MaterialPluginBase {
    private _texture;
    /**
     * The detail texture of the material.
     */
    texture: Nullable<BaseTexture>;
    /**
     * Defines how strongly the detail diffuse/albedo channel is blended with the regular diffuse/albedo texture
     * Bigger values mean stronger blending
     */
    diffuseBlendLevel: number;
    /**
     * Defines how strongly the detail roughness channel is blended with the regular roughness value
     * Bigger values mean stronger blending. Only used with PBR materials
     */
    roughnessBlendLevel: number;
    /**
     * Defines how strong the bump effect from the detail map is
     * Bigger values mean stronger effect
     */
    bumpLevel: number;
    private _normalBlendMethod;
    /**
     * The method used to blend the bump and detail normals together
     */
    normalBlendMethod: number;
    private _isEnabled;
    /**
     * Enable or disable the detail map on this material
     */
    isEnabled: boolean;
    /** @internal */
    private _internalMarkAllSubMeshesAsTexturesDirty;
    /** @internal */
    _markAllSubMeshesAsTexturesDirty(): void;
    constructor(material: PBRBaseMaterial | StandardMaterial, addToPluginList?: boolean);
    isReadyForSubMesh(defines: MaterialDetailMapDefines, scene: Scene, engine: Engine): boolean;
    prepareDefines(defines: MaterialDetailMapDefines, scene: Scene): void;
    bindForSubMesh(uniformBuffer: UniformBuffer, scene: Scene): void;
    hasTexture(texture: BaseTexture): boolean;
    getActiveTextures(activeTextures: BaseTexture[]): void;
    getAnimatables(animatables: IAnimatable[]): void;
    dispose(forceDisposeTextures?: boolean): void;
    getClassName(): string;
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
