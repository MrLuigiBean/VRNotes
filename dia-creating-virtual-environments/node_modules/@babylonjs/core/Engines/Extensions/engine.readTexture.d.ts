import type { InternalTexture } from "../../Materials/Textures/internalTexture";
import type { Nullable } from "../../types";
declare module "../../Engines/thinEngine" {
    interface ThinEngine {
        /** @internal */
        _readTexturePixels(texture: InternalTexture, width: number, height: number, faceIndex?: number, level?: number, buffer?: Nullable<ArrayBufferView>, flushRenderer?: boolean, noDataConversion?: boolean, x?: number, y?: number): Promise<ArrayBufferView>;
        /** @internal */
        _readTexturePixelsSync(texture: InternalTexture, width: number, height: number, faceIndex?: number, level?: number, buffer?: Nullable<ArrayBufferView>, flushRenderer?: boolean, noDataConversion?: boolean, x?: number, y?: number): ArrayBufferView;
    }
}
/**
 * Allocate a typed array depending on a texture type. Optionally can copy existing data in the buffer.
 * @param type type of the texture
 * @param sizeOrDstBuffer size of the array OR an existing buffer that will be used as the destination of the copy (if copyBuffer is provided)
 * @param sizeInBytes true if the size of the array is given in bytes, false if it is the number of elements of the array
 * @param copyBuffer if provided, buffer to copy into the destination buffer (either a newly allocated buffer if sizeOrDstBuffer is a number or use sizeOrDstBuffer as the destination buffer otherwise)
 * @returns the allocated buffer or sizeOrDstBuffer if the latter is an ArrayBuffer
 */
export declare function allocateAndCopyTypedBuffer(type: number, sizeOrDstBuffer: number | ArrayBuffer, sizeInBytes?: boolean, copyBuffer?: ArrayBuffer): ArrayBufferView;
