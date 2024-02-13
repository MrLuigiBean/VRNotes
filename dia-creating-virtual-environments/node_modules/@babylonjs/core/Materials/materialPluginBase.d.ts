import type { Nullable } from "../types";
import { MaterialPluginManager } from "./materialPluginManager";
import type { SmartArray } from "../Misc/smartArray";
import type { Engine } from "../Engines/engine";
import type { Scene } from "../scene";
import type { AbstractMesh } from "../Meshes/abstractMesh";
import type { SubMesh } from "../Meshes/subMesh";
import type { IAnimatable } from "../Animations/animatable.interface";
import type { UniformBuffer } from "./uniformBuffer";
import type { EffectFallbacks } from "./effectFallbacks";
import type { MaterialDefines } from "./materialDefines";
import type { Material } from "./material";
import type { BaseTexture } from "./Textures/baseTexture";
import type { RenderTargetTexture } from "./Textures/renderTargetTexture";
/**
 * Base class for material plugins.
 * @since 5.0
 */
export declare class MaterialPluginBase {
    /**
     * Defines the name of the plugin
     */
    name: string;
    /**
     * Defines the priority of the plugin. Lower numbers run first.
     */
    priority: number;
    /**
     * Indicates that any #include directive in the plugin code must be replaced by the corresponding code.
     */
    resolveIncludes: boolean;
    /**
     * Indicates that this plugin should be notified for the extra events (HasRenderTargetTextures / FillRenderTargetTextures / HardBindForSubMesh)
     */
    registerForExtraEvents: boolean;
    protected _material: Material;
    protected _pluginManager: MaterialPluginManager;
    protected _pluginDefineNames?: {
        [name: string]: any;
    };
    protected _enable(enable: boolean): void;
    /**
     * Helper function to mark defines as being dirty.
     */
    readonly markAllDefinesAsDirty: () => void;
    /**
     * Creates a new material plugin
     * @param material parent material of the plugin
     * @param name name of the plugin
     * @param priority priority of the plugin
     * @param defines list of defines used by the plugin. The value of the property is the default value for this property
     * @param addToPluginList true to add the plugin to the list of plugins managed by the material plugin manager of the material (default: true)
     * @param enable true to enable the plugin (it is handy if the plugin does not handle properties to switch its current activation)
     * @param resolveIncludes Indicates that any #include directive in the plugin code must be replaced by the corresponding code (default: false)
     */
    constructor(material: Material, name: string, priority: number, defines?: {
        [key: string]: any;
    }, addToPluginList?: boolean, enable?: boolean, resolveIncludes?: boolean);
    /**
     * Gets the current class name useful for serialization or dynamic coding.
     * @returns The class name.
     */
    getClassName(): string;
    /**
     * Specifies that the submesh is ready to be used.
     * @param defines the list of "defines" to update.
     * @param scene defines the scene the material belongs to.
     * @param engine the engine this scene belongs to.
     * @param subMesh the submesh to check for readiness
     * @returns - boolean indicating that the submesh is ready or not.
     */
    isReadyForSubMesh(defines: MaterialDefines, scene: Scene, engine: Engine, subMesh: SubMesh): boolean;
    /**
     * Binds the material data (this function is called even if mustRebind() returns false)
     * @param uniformBuffer defines the Uniform buffer to fill in.
     * @param scene defines the scene the material belongs to.
     * @param engine defines the engine the material belongs to.
     * @param subMesh the submesh to bind data for
     */
    hardBindForSubMesh(uniformBuffer: UniformBuffer, scene: Scene, engine: Engine, subMesh: SubMesh): void;
    /**
     * Binds the material data.
     * @param uniformBuffer defines the Uniform buffer to fill in.
     * @param scene defines the scene the material belongs to.
     * @param engine the engine this scene belongs to.
     * @param subMesh the submesh to bind data for
     */
    bindForSubMesh(uniformBuffer: UniformBuffer, scene: Scene, engine: Engine, subMesh: SubMesh): void;
    /**
     * Disposes the resources of the material.
     * @param forceDisposeTextures - Forces the disposal of all textures.
     */
    dispose(forceDisposeTextures?: boolean): void;
    /**
     * Returns a list of custom shader code fragments to customize the shader.
     * @param shaderType "vertex" or "fragment"
     * @returns null if no code to be added, or a list of pointName =\> code.
     * Note that `pointName` can also be a regular expression if it starts with a `!`.
     * In that case, the string found by the regular expression (if any) will be
     * replaced by the code provided.
     */
    getCustomCode(shaderType: string): Nullable<{
        [pointName: string]: string;
    }>;
    /**
     * Collects all defines.
     * @param defines The object to append to.
     */
    collectDefines(defines: {
        [name: string]: {
            type: string;
            default: any;
        };
    }): void;
    /**
     * Sets the defines for the next rendering. Called before MaterialHelper.PrepareDefinesForAttributes is called.
     * @param defines the list of "defines" to update.
     * @param scene defines the scene to the material belongs to.
     * @param mesh the mesh being rendered
     */
    prepareDefinesBeforeAttributes(defines: MaterialDefines, scene: Scene, mesh: AbstractMesh): void;
    /**
     * Sets the defines for the next rendering
     * @param defines the list of "defines" to update.
     * @param scene defines the scene to the material belongs to.
     * @param mesh the mesh being rendered
     */
    prepareDefines(defines: MaterialDefines, scene: Scene, mesh: AbstractMesh): void;
    /**
     * Checks to see if a texture is used in the material.
     * @param texture - Base texture to use.
     * @returns - Boolean specifying if a texture is used in the material.
     */
    hasTexture(texture: BaseTexture): boolean;
    /**
     * Gets a boolean indicating that current material needs to register RTT
     * @returns true if this uses a render target otherwise false.
     */
    hasRenderTargetTextures(): boolean;
    /**
     * Fills the list of render target textures.
     * @param renderTargets the list of render targets to update
     */
    fillRenderTargetTextures(renderTargets: SmartArray<RenderTargetTexture>): void;
    /**
     * Returns an array of the actively used textures.
     * @param activeTextures Array of BaseTextures
     */
    getActiveTextures(activeTextures: BaseTexture[]): void;
    /**
     * Returns the animatable textures.
     * @param animatables Array of animatable textures.
     */
    getAnimatables(animatables: IAnimatable[]): void;
    /**
     * Add fallbacks to the effect fallbacks list.
     * @param defines defines the Base texture to use.
     * @param fallbacks defines the current fallback list.
     * @param currentRank defines the current fallback rank.
     * @returns the new fallback rank.
     */
    addFallbacks(defines: MaterialDefines, fallbacks: EffectFallbacks, currentRank: number): number;
    /**
     * Gets the samplers used by the plugin.
     * @param samplers list that the sampler names should be added to.
     */
    getSamplers(samplers: string[]): void;
    /**
     * Gets the attributes used by the plugin.
     * @param attributes list that the attribute names should be added to.
     * @param scene the scene that the material belongs to.
     * @param mesh the mesh being rendered.
     */
    getAttributes(attributes: string[], scene: Scene, mesh: AbstractMesh): void;
    /**
     * Gets the uniform buffers names added by the plugin.
     * @param ubos list that the ubo names should be added to.
     */
    getUniformBuffersNames(ubos: string[]): void;
    /**
     * Gets the description of the uniforms to add to the ubo (if engine supports ubos) or to inject directly in the vertex/fragment shaders (if engine does not support ubos)
     * @returns the description of the uniforms
     */
    getUniforms(): {
        ubo?: Array<{
            name: string;
            size?: number;
            type?: string;
            arraySize?: number;
        }>;
        vertex?: string;
        fragment?: string;
    };
    /**
     * Makes a duplicate of the current configuration into another one.
     * @param plugin define the config where to copy the info
     */
    copyTo(plugin: MaterialPluginBase): void;
    /**
     * Serializes this plugin configuration.
     * @returns - An object with the serialized config.
     */
    serialize(): any;
    /**
     * Parses a plugin configuration from a serialized object.
     * @param source - Serialized object.
     * @param scene Defines the scene we are parsing for
     * @param rootUrl Defines the rootUrl to load from
     */
    parse(source: any, scene: Scene, rootUrl: string): void;
}
