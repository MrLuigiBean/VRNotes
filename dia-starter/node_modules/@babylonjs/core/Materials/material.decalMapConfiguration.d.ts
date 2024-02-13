import { MaterialDefines } from "./materialDefines";
import { MaterialPluginBase } from "./materialPluginBase";
import type { Scene } from "../scene.js";
import type { Engine } from "../Engines/engine.js";
import type { SubMesh } from "../Meshes/subMesh.js";
import type { AbstractMesh } from "../Meshes/abstractMesh.js";
import type { UniformBuffer } from "./uniformBuffer";
import type { PBRBaseMaterial } from "./PBR/pbrBaseMaterial";
import type { StandardMaterial } from "./standardMaterial";
/**
 * @internal
 */
export declare class DecalMapDefines extends MaterialDefines {
    DECAL: boolean;
    DECALDIRECTUV: number;
    DECAL_SMOOTHALPHA: boolean;
    GAMMADECAL: boolean;
}
/**
 * Plugin that implements the decal map component of a material
 * @since 5.49.1
 */
export declare class DecalMapConfiguration extends MaterialPluginBase {
    private _isEnabled;
    /**
     * Enables or disables the decal map on this material
     */
    isEnabled: boolean;
    private _smoothAlpha;
    /**
     * Enables or disables the smooth alpha mode on this material. Default: false.
     * When enabled, the alpha value used to blend the decal map will be the squared value and will produce a smoother result.
     */
    smoothAlpha: boolean;
    private _internalMarkAllSubMeshesAsTexturesDirty;
    /** @internal */
    _markAllSubMeshesAsTexturesDirty(): void;
    /**
     * Creates a new DecalMapConfiguration
     * @param material The material to attach the decal map plugin to
     * @param addToPluginList If the plugin should be added to the material plugin list
     */
    constructor(material: PBRBaseMaterial | StandardMaterial, addToPluginList?: boolean);
    isReadyForSubMesh(defines: DecalMapDefines, scene: Scene, engine: Engine, subMesh: SubMesh): boolean;
    prepareDefines(defines: DecalMapDefines, scene: Scene, mesh: AbstractMesh): void;
    /**
     * Note that we override hardBindForSubMesh and not bindForSubMesh because the material can be shared by multiple meshes,
     * in which case mustRebind could return false even though the decal map is different for each mesh: that's because the decal map
     * is not part of the material but hosted by the decalMap of the mesh instead.
     */
    hardBindForSubMesh(uniformBuffer: UniformBuffer, scene: Scene, _engine: Engine, subMesh: SubMesh): void;
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
