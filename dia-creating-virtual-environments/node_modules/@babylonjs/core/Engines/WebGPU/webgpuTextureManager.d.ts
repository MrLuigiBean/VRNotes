import type { WebGPUBufferManager } from "./webgpuBufferManager";
import type { Nullable } from "../../types";
import type { InternalTexture } from "../../Materials/Textures/internalTexture";
import { WebGPUHardwareTexture } from "./webgpuHardwareTexture";
import type { WebGPUTintWASM } from "./webgpuTintWASM";
import type { ExternalTexture } from "../../Materials/Textures/externalTexture";
import type { WebGPUEngine } from "../webgpuEngine";
/**
 * Map a (renderable) texture format (GPUTextureFormat) to an index for fast lookup (in caches for eg)
 * The number of entries should not go over 64! Else, the code in WebGPUCacheRenderPipeline.setMRT should be updated
 */
export declare const renderableTextureFormatToIndex: {
    [name: string]: number;
};
/** @internal */
export declare class WebGPUTextureManager {
    private _engine;
    private _device;
    private _glslang;
    private _tintWASM;
    private _bufferManager;
    private _mipmapSampler;
    private _videoSampler;
    private _ubCopyWithOfst;
    private _pipelines;
    private _compiledShaders;
    private _videoPipelines;
    private _videoCompiledShaders;
    private _deferredReleaseTextures;
    private _commandEncoderForCreation;
    constructor(engine: WebGPUEngine, device: GPUDevice, glslang: any, tintWASM: Nullable<WebGPUTintWASM>, bufferManager: WebGPUBufferManager, enabledExtensions: GPUFeatureName[]);
    private _getPipeline;
    private _getVideoPipeline;
    setCommandEncoder(encoder: GPUCommandEncoder): void;
    copyVideoToTexture(video: ExternalTexture, texture: InternalTexture, format: GPUTextureFormat, invertY?: boolean, commandEncoder?: GPUCommandEncoder): void;
    invertYPreMultiplyAlpha(gpuOrHdwTexture: GPUTexture | WebGPUHardwareTexture, width: number, height: number, format: GPUTextureFormat, invertY?: boolean, premultiplyAlpha?: boolean, faceIndex?: number, mipLevel?: number, layers?: number, ofstX?: number, ofstY?: number, rectWidth?: number, rectHeight?: number, commandEncoder?: GPUCommandEncoder, allowGPUOptimization?: boolean): void;
    copyWithInvertY(srcTextureView: GPUTextureView, format: GPUTextureFormat, renderPassDescriptor: GPURenderPassDescriptor, commandEncoder?: GPUCommandEncoder): void;
    createTexture(imageBitmap: ImageBitmap | {
        width: number;
        height: number;
        layers: number;
    }, hasMipmaps?: boolean, generateMipmaps?: boolean, invertY?: boolean, premultiplyAlpha?: boolean, is3D?: boolean, format?: GPUTextureFormat, sampleCount?: number, commandEncoder?: GPUCommandEncoder, usage?: number, additionalUsages?: number, label?: string): GPUTexture;
    createCubeTexture(imageBitmaps: ImageBitmap[] | {
        width: number;
        height: number;
    }, hasMipmaps?: boolean, generateMipmaps?: boolean, invertY?: boolean, premultiplyAlpha?: boolean, format?: GPUTextureFormat, sampleCount?: number, commandEncoder?: GPUCommandEncoder, usage?: number, additionalUsages?: number, label?: string): GPUTexture;
    generateCubeMipmaps(gpuTexture: GPUTexture | WebGPUHardwareTexture, format: GPUTextureFormat, mipLevelCount: number, commandEncoder?: GPUCommandEncoder): void;
    generateMipmaps(gpuOrHdwTexture: GPUTexture | WebGPUHardwareTexture, format: GPUTextureFormat, mipLevelCount: number, faceIndex?: number, commandEncoder?: GPUCommandEncoder): void;
    createGPUTextureForInternalTexture(texture: InternalTexture, width?: number, height?: number, depth?: number, creationFlags?: number): WebGPUHardwareTexture;
    createMSAATexture(texture: InternalTexture, samples: number, releaseExisting?: boolean, index?: number): void;
    updateCubeTextures(imageBitmaps: ImageBitmap[] | Uint8Array[], gpuTexture: GPUTexture, width: number, height: number, format: GPUTextureFormat, invertY?: boolean, premultiplyAlpha?: boolean, offsetX?: number, offsetY?: number): void;
    updateTexture(imageBitmap: ImageBitmap | Uint8Array | ImageData | HTMLImageElement | HTMLVideoElement | VideoFrame | HTMLCanvasElement | OffscreenCanvas, texture: GPUTexture | InternalTexture, width: number, height: number, layers: number, format: GPUTextureFormat, faceIndex?: number, mipLevel?: number, invertY?: boolean, premultiplyAlpha?: boolean, offsetX?: number, offsetY?: number, allowGPUOptimization?: boolean): void;
    readPixels(texture: GPUTexture, x: number, y: number, width: number, height: number, format: GPUTextureFormat, faceIndex?: number, mipLevel?: number, buffer?: Nullable<ArrayBufferView>, noDataConversion?: boolean): Promise<ArrayBufferView>;
    releaseTexture(texture: InternalTexture | GPUTexture): void;
    destroyDeferredTextures(): void;
}
