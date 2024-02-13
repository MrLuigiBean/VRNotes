import type { ShaderCustomProcessingFunction } from "../Engines/Processors/shaderProcessingOptions";
import type { SmartArray } from "../Misc/smartArray";
import type { BaseTexture } from "./Textures/baseTexture";
import type { EffectFallbacks } from "./effectFallbacks";
import type { MaterialDefines } from "./materialDefines";
import type { UniformBuffer } from "./uniformBuffer";
import type { SubMesh } from "../Meshes/subMesh";
import type { AbstractMesh } from "../Meshes/abstractMesh";
import type { IAnimatable } from "../Animations/animatable.interface";
import type { RenderTargetTexture } from "./Textures/renderTargetTexture";
/** @internal */
export type MaterialPluginCreated = {};
/** @internal */
export type MaterialPluginDisposed = {
    forceDisposeTextures?: boolean;
};
/** @internal */
export type MaterialPluginHasTexture = {
    hasTexture: boolean;
    texture: BaseTexture;
};
/** @internal */
export type MaterialPluginIsReadyForSubMesh = {
    isReadyForSubMesh: boolean;
    defines: MaterialDefines;
    subMesh: SubMesh;
};
/** @internal */
export type MaterialPluginGetDefineNames = {
    defineNames?: {
        [name: string]: {
            type: string;
            default: any;
        };
    };
};
/** @internal */
export type MaterialPluginPrepareEffect = {
    defines: MaterialDefines;
    fallbacks: EffectFallbacks;
    fallbackRank: number;
    customCode?: ShaderCustomProcessingFunction;
    attributes: string[];
    uniforms: string[];
    samplers: string[];
    uniformBuffersNames: string[];
    mesh: AbstractMesh;
    indexParameters: any;
};
/** @internal */
export type MaterialPluginPrepareDefines = {
    defines: MaterialDefines;
    mesh: AbstractMesh;
};
/** @internal */
export type MaterialPluginPrepareUniformBuffer = {
    ubo: UniformBuffer;
};
/** @internal */
export type MaterialPluginBindForSubMesh = {
    subMesh: SubMesh;
};
/** @internal */
export type MaterialPluginGetAnimatables = {
    animatables: IAnimatable[];
};
/** @internal */
export type MaterialPluginGetActiveTextures = {
    activeTextures: BaseTexture[];
};
/** @internal */
export type MaterialPluginFillRenderTargetTextures = {
    renderTargets: SmartArray<RenderTargetTexture>;
};
/** @internal */
export type MaterialPluginHasRenderTargetTextures = {
    hasRenderTargetTextures: boolean;
};
/** @internal */
export type MaterialPluginHardBindForSubMesh = {
    subMesh: SubMesh;
};
/**
 * @internal
 */
export declare enum MaterialPluginEvent {
    Created = 1,
    Disposed = 2,
    GetDefineNames = 4,
    PrepareUniformBuffer = 8,
    IsReadyForSubMesh = 16,
    PrepareDefines = 32,
    BindForSubMesh = 64,
    PrepareEffect = 128,
    GetAnimatables = 256,
    GetActiveTextures = 512,
    HasTexture = 1024,
    FillRenderTargetTextures = 2048,
    HasRenderTargetTextures = 4096,
    HardBindForSubMesh = 8192
}
