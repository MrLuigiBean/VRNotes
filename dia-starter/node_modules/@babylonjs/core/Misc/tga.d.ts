import type { InternalTexture } from "../Materials/Textures/internalTexture";
/**
 * Gets the header of a TGA file
 * @param data defines the TGA data
 * @returns the header
 */
export declare function GetTGAHeader(data: Uint8Array): any;
/**
 * Uploads TGA content to a Babylon Texture
 * @internal
 */
export declare function UploadContent(texture: InternalTexture, data: Uint8Array): void;
/**
 * @internal
 */
declare function _getImageData8bits(header: any, palettes: Uint8Array, pixel_data: Uint8Array, y_start: number, y_step: number, y_end: number, x_start: number, x_step: number, x_end: number): Uint8Array;
/**
 * @internal
 */
declare function _getImageData16bits(header: any, palettes: Uint8Array, pixel_data: Uint8Array, y_start: number, y_step: number, y_end: number, x_start: number, x_step: number, x_end: number): Uint8Array;
/**
 * @internal
 */
declare function _getImageData24bits(header: any, palettes: Uint8Array, pixel_data: Uint8Array, y_start: number, y_step: number, y_end: number, x_start: number, x_step: number, x_end: number): Uint8Array;
/**
 * @internal
 */
declare function _getImageData32bits(header: any, palettes: Uint8Array, pixel_data: Uint8Array, y_start: number, y_step: number, y_end: number, x_start: number, x_step: number, x_end: number): Uint8Array;
/**
 * @internal
 */
declare function _getImageDataGrey8bits(header: any, palettes: Uint8Array, pixel_data: Uint8Array, y_start: number, y_step: number, y_end: number, x_start: number, x_step: number, x_end: number): Uint8Array;
/**
 * @internal
 */
declare function _getImageDataGrey16bits(header: any, palettes: Uint8Array, pixel_data: Uint8Array, y_start: number, y_step: number, y_end: number, x_start: number, x_step: number, x_end: number): Uint8Array;
/**
 * Based on jsTGALoader - Javascript loader for TGA file
 * By Vincent Thibault
 * @see http://blog.robrowser.com/javascript-tga-loader.html
 */
export declare const TGATools: {
    /**
     * Gets the header of a TGA file
     * @param data defines the TGA data
     * @returns the header
     */
    GetTGAHeader: typeof GetTGAHeader;
    /**
     * Uploads TGA content to a Babylon Texture
     * @internal
     */
    UploadContent: typeof UploadContent;
    /** @internal */
    _getImageData8bits: typeof _getImageData8bits;
    /** @internal */
    _getImageData16bits: typeof _getImageData16bits;
    /** @internal */
    _getImageData24bits: typeof _getImageData24bits;
    /** @internal */
    _getImageData32bits: typeof _getImageData32bits;
    /** @internal */
    _getImageDataGrey8bits: typeof _getImageDataGrey8bits;
    /** @internal */
    _getImageDataGrey16bits: typeof _getImageDataGrey16bits;
};
export {};
