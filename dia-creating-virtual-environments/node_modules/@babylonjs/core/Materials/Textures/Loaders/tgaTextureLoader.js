import { GetTGAHeader, UploadContent } from "../../../Misc/tga.js";
import { Engine } from "../../../Engines/engine.js";
/**
 * Implementation of the TGA Texture Loader.
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export class _TGATextureLoader {
    constructor() {
        /**
         * Defines whether the loader supports cascade loading the different faces.
         */
        this.supportCascades = false;
    }
    /**
     * This returns if the loader support the current file information.
     * @param extension defines the file extension of the file being loaded
     * @returns true if the loader can load the specified file
     */
    canLoad(extension) {
        return extension.endsWith(".tga");
    }
    /**
     * Uploads the cube texture data to the WebGL texture. It has already been bound.
     */
    loadCubeData() {
        throw ".env not supported in Cube.";
    }
    /**
     * Uploads the 2D texture data to the WebGL texture. It has already been bound once in the callback.
     * @param data contains the texture data
     * @param texture defines the BabylonJS internal texture
     * @param callback defines the method to call once ready to upload
     */
    loadData(data, texture, callback) {
        const bytes = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
        const header = GetTGAHeader(bytes);
        callback(header.width, header.height, texture.generateMipMaps, false, () => {
            UploadContent(texture, bytes);
        });
    }
}
// Register the loader.
Engine._TextureLoaders.push(new _TGATextureLoader());
//# sourceMappingURL=tgaTextureLoader.js.map