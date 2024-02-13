import type { InternalTexture } from "../../Materials/Textures/internalTexture";
import type { HardwareTextureWrapper } from "../../Materials/Textures/hardwareTextureWrapper";
/** @internal */
export declare class WebGPUTextureHelper {
    static ComputeNumMipmapLevels(width: number, height: number): number;
    static GetTextureTypeFromFormat(format: GPUTextureFormat): number;
    static GetBlockInformationFromFormat(format: GPUTextureFormat): {
        width: number;
        height: number;
        length: number;
    };
    static IsHardwareTexture(texture: HardwareTextureWrapper | GPUTexture): texture is HardwareTextureWrapper;
    static IsInternalTexture(texture: InternalTexture | GPUTexture): texture is InternalTexture;
    static IsImageBitmap(imageBitmap: ImageBitmap | {
        width: number;
        height: number;
    }): imageBitmap is ImageBitmap;
    static IsImageBitmapArray(imageBitmap: ImageBitmap[] | {
        width: number;
        height: number;
    }): imageBitmap is ImageBitmap[];
    static IsCompressedFormat(format: GPUTextureFormat): boolean;
    static GetWebGPUTextureFormat(type: number, format: number, useSRGBBuffer?: boolean): GPUTextureFormat;
    static GetNumChannelsFromWebGPUTextureFormat(format: GPUTextureFormat): number;
    static HasStencilAspect(format: GPUTextureFormat): boolean;
    static HasDepthAndStencilAspects(format: GPUTextureFormat): boolean;
    static GetDepthFormatOnly(format: GPUTextureFormat): GPUTextureFormat;
    static GetSample(sampleCount: number): 1 | 4;
}
