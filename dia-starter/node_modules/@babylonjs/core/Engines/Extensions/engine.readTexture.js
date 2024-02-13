import { ThinEngine } from "../../Engines/thinEngine.js";

/**
 * Allocate a typed array depending on a texture type. Optionally can copy existing data in the buffer.
 * @param type type of the texture
 * @param sizeOrDstBuffer size of the array OR an existing buffer that will be used as the destination of the copy (if copyBuffer is provided)
 * @param sizeInBytes true if the size of the array is given in bytes, false if it is the number of elements of the array
 * @param copyBuffer if provided, buffer to copy into the destination buffer (either a newly allocated buffer if sizeOrDstBuffer is a number or use sizeOrDstBuffer as the destination buffer otherwise)
 * @returns the allocated buffer or sizeOrDstBuffer if the latter is an ArrayBuffer
 */
export function allocateAndCopyTypedBuffer(type, sizeOrDstBuffer, sizeInBytes = false, copyBuffer) {
    switch (type) {
        case 3: {
            const buffer = sizeOrDstBuffer instanceof ArrayBuffer ? new Int8Array(sizeOrDstBuffer) : new Int8Array(sizeOrDstBuffer);
            if (copyBuffer) {
                buffer.set(new Int8Array(copyBuffer));
            }
            return buffer;
        }
        case 0: {
            const buffer = sizeOrDstBuffer instanceof ArrayBuffer ? new Uint8Array(sizeOrDstBuffer) : new Uint8Array(sizeOrDstBuffer);
            if (copyBuffer) {
                buffer.set(new Uint8Array(copyBuffer));
            }
            return buffer;
        }
        case 4: {
            const buffer = sizeOrDstBuffer instanceof ArrayBuffer ? new Int16Array(sizeOrDstBuffer) : new Int16Array(sizeInBytes ? sizeOrDstBuffer / 2 : sizeOrDstBuffer);
            if (copyBuffer) {
                buffer.set(new Int16Array(copyBuffer));
            }
            return buffer;
        }
        case 5:
        case 8:
        case 9:
        case 10:
        case 2: {
            const buffer = sizeOrDstBuffer instanceof ArrayBuffer ? new Uint16Array(sizeOrDstBuffer) : new Uint16Array(sizeInBytes ? sizeOrDstBuffer / 2 : sizeOrDstBuffer);
            if (copyBuffer) {
                buffer.set(new Uint16Array(copyBuffer));
            }
            return buffer;
        }
        case 6: {
            const buffer = sizeOrDstBuffer instanceof ArrayBuffer ? new Int32Array(sizeOrDstBuffer) : new Int32Array(sizeInBytes ? sizeOrDstBuffer / 4 : sizeOrDstBuffer);
            if (copyBuffer) {
                buffer.set(new Int32Array(copyBuffer));
            }
            return buffer;
        }
        case 7:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15: {
            const buffer = sizeOrDstBuffer instanceof ArrayBuffer ? new Uint32Array(sizeOrDstBuffer) : new Uint32Array(sizeInBytes ? sizeOrDstBuffer / 4 : sizeOrDstBuffer);
            if (copyBuffer) {
                buffer.set(new Uint32Array(copyBuffer));
            }
            return buffer;
        }
        case 1: {
            const buffer = sizeOrDstBuffer instanceof ArrayBuffer ? new Float32Array(sizeOrDstBuffer) : new Float32Array(sizeInBytes ? sizeOrDstBuffer / 4 : sizeOrDstBuffer);
            if (copyBuffer) {
                buffer.set(new Float32Array(copyBuffer));
            }
            return buffer;
        }
    }
    const buffer = sizeOrDstBuffer instanceof ArrayBuffer ? new Uint8Array(sizeOrDstBuffer) : new Uint8Array(sizeOrDstBuffer);
    if (copyBuffer) {
        buffer.set(new Uint8Array(copyBuffer));
    }
    return buffer;
}
ThinEngine.prototype._readTexturePixelsSync = function (texture, width, height, faceIndex = -1, level = 0, buffer = null, flushRenderer = true, noDataConversion = false, x = 0, y = 0) {
    var _a, _b;
    const gl = this._gl;
    if (!gl) {
        throw new Error("Engine does not have gl rendering context.");
    }
    if (!this._dummyFramebuffer) {
        const dummy = gl.createFramebuffer();
        if (!dummy) {
            throw new Error("Unable to create dummy framebuffer");
        }
        this._dummyFramebuffer = dummy;
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, this._dummyFramebuffer);
    if (faceIndex > -1) {
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_CUBE_MAP_POSITIVE_X + faceIndex, (_a = texture._hardwareTexture) === null || _a === void 0 ? void 0 : _a.underlyingResource, level);
    }
    else {
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, (_b = texture._hardwareTexture) === null || _b === void 0 ? void 0 : _b.underlyingResource, level);
    }
    let readType = texture.type !== undefined ? this._getWebGLTextureType(texture.type) : gl.UNSIGNED_BYTE;
    if (!noDataConversion) {
        switch (readType) {
            case gl.UNSIGNED_BYTE:
                if (!buffer) {
                    buffer = new Uint8Array(4 * width * height);
                }
                readType = gl.UNSIGNED_BYTE;
                break;
            default:
                if (!buffer) {
                    buffer = new Float32Array(4 * width * height);
                }
                readType = gl.FLOAT;
                break;
        }
    }
    else if (!buffer) {
        buffer = allocateAndCopyTypedBuffer(texture.type, 4 * width * height);
    }
    if (flushRenderer) {
        this.flushFramebuffer();
    }
    gl.readPixels(x, y, width, height, gl.RGBA, readType, buffer);
    gl.bindFramebuffer(gl.FRAMEBUFFER, this._currentFramebuffer);
    return buffer;
};
ThinEngine.prototype._readTexturePixels = function (texture, width, height, faceIndex = -1, level = 0, buffer = null, flushRenderer = true, noDataConversion = false, x = 0, y = 0) {
    return Promise.resolve(this._readTexturePixelsSync(texture, width, height, faceIndex, level, buffer, flushRenderer, noDataConversion, x, y));
};
//# sourceMappingURL=engine.readTexture.js.map