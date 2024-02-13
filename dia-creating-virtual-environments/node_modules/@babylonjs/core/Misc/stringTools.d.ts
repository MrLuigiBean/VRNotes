/**
 * Checks for a matching suffix at the end of a string (for ES5 and lower)
 * @param str Source string
 * @param suffix Suffix to search for in the source string
 * @returns Boolean indicating whether the suffix was found (true) or not (false)
 * @deprecated Please use native string function instead
 */
export declare const EndsWith: (str: string, suffix: string) => boolean;
/**
 * Checks for a matching suffix at the beginning of a string (for ES5 and lower)
 * @param str Source string
 * @param suffix Suffix to search for in the source string
 * @returns Boolean indicating whether the suffix was found (true) or not (false)
 * @deprecated Please use native string function instead
 */
export declare const StartsWith: (str: string, suffix: string) => boolean;
/**
 * Decodes a buffer into a string
 * @param buffer The buffer to decode
 * @returns The decoded string
 */
export declare const Decode: (buffer: Uint8Array | Uint16Array) => string;
/**
 * Encode a buffer to a base64 string
 * @param buffer defines the buffer to encode
 * @returns the encoded string
 */
export declare const EncodeArrayBufferToBase64: (buffer: ArrayBuffer | ArrayBufferView) => string;
/**
 * Converts a given base64 string as an ASCII encoded stream of data
 * @param base64Data The base64 encoded string to decode
 * @returns Decoded ASCII string
 */
export declare const DecodeBase64ToString: (base64Data: string) => string;
/**
 * Converts a given base64 string into an ArrayBuffer of raw byte data
 * @param base64Data The base64 encoded string to decode
 * @returns ArrayBuffer of byte data
 */
export declare const DecodeBase64ToBinary: (base64Data: string) => ArrayBuffer;
/**
 * Converts a number to string and pads with preceding zeroes until it is of specified length.
 * @param num the number to convert and pad
 * @param length the expected length of the string
 * @returns the padded string
 */
export declare const PadNumber: (num: number, length: number) => string;
/**
 * Helper to manipulate strings
 */
export declare const StringTools: {
    EndsWith: (str: string, suffix: string) => boolean;
    StartsWith: (str: string, suffix: string) => boolean;
    Decode: (buffer: Uint8Array | Uint16Array) => string;
    EncodeArrayBufferToBase64: (buffer: ArrayBuffer | ArrayBufferView) => string;
    DecodeBase64ToString: (base64Data: string) => string;
    DecodeBase64ToBinary: (base64Data: string) => ArrayBuffer;
    PadNumber: (num: number, length: number) => string;
};
