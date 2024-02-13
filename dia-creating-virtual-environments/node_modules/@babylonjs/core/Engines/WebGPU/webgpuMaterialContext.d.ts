import { ExternalTexture } from "../../Materials/Textures/externalTexture";
import type { InternalTexture } from "../../Materials/Textures/internalTexture";
import type { TextureSampler } from "../../Materials/Textures/textureSampler";
import type { Nullable } from "../../types";
import type { IMaterialContext } from "../IMaterialContext";
/** @internal */
interface IWebGPUMaterialContextSamplerCache {
    sampler: Nullable<TextureSampler>;
    hashCode: number;
}
/** @internal */
interface IWebGPUMaterialContextTextureCache {
    texture: Nullable<InternalTexture | ExternalTexture>;
    isFloatOrDepthTexture: boolean;
    isExternalTexture: boolean;
}
/** @internal */
export declare class WebGPUMaterialContext implements IMaterialContext {
    private static _Counter;
    uniqueId: number;
    updateId: number;
    isDirty: boolean;
    samplers: {
        [name: string]: Nullable<IWebGPUMaterialContextSamplerCache>;
    };
    textures: {
        [name: string]: Nullable<IWebGPUMaterialContextTextureCache>;
    };
    textureState: number;
    get forceBindGroupCreation(): boolean;
    get hasFloatOrDepthTextures(): boolean;
    protected _numFloatOrDepthTextures: number;
    protected _numExternalTextures: number;
    constructor();
    reset(): void;
    setSampler(name: string, sampler: Nullable<TextureSampler>): void;
    setTexture(name: string, texture: Nullable<InternalTexture | ExternalTexture>): void;
}
export {};
