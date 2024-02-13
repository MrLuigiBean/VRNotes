import type { Nullable } from "../../types";
/**
 * Class used to store a texture sampler data
 */
export declare class TextureSampler {
    /**
     * Gets the sampling mode of the texture
     */
    samplingMode: number;
    /**
     * | Value | Type               | Description |
     * | ----- | ------------------ | ----------- |
     * | 0     | CLAMP_ADDRESSMODE  |             |
     * | 1     | WRAP_ADDRESSMODE   |             |
     * | 2     | MIRROR_ADDRESSMODE |             |
     */
    get wrapU(): Nullable<number>;
    set wrapU(value: Nullable<number>);
    /**
     * | Value | Type               | Description |
     * | ----- | ------------------ | ----------- |
     * | 0     | CLAMP_ADDRESSMODE  |             |
     * | 1     | WRAP_ADDRESSMODE   |             |
     * | 2     | MIRROR_ADDRESSMODE |             |
     */
    get wrapV(): Nullable<number>;
    set wrapV(value: Nullable<number>);
    /**
     * | Value | Type               | Description |
     * | ----- | ------------------ | ----------- |
     * | 0     | CLAMP_ADDRESSMODE  |             |
     * | 1     | WRAP_ADDRESSMODE   |             |
     * | 2     | MIRROR_ADDRESSMODE |             |
     */
    get wrapR(): Nullable<number>;
    set wrapR(value: Nullable<number>);
    /**
     * With compliant hardware and browser (supporting anisotropic filtering)
     * this defines the level of anisotropic filtering in the texture.
     * The higher the better but the slower.
     */
    get anisotropicFilteringLevel(): Nullable<number>;
    set anisotropicFilteringLevel(value: Nullable<number>);
    /**
     * Gets or sets the comparison function (Constants.LESS, Constants.EQUAL, etc). Set 0 to not use a comparison function
     */
    get comparisonFunction(): number;
    set comparisonFunction(value: number);
    private _useMipMaps;
    /**
     * Indicates to use the mip maps (if available on the texture).
     * Thanks to this flag, you can instruct the sampler to not sample the mipmaps even if they exist (and if the sampling mode is set to a value that normally samples the mipmaps!)
     */
    get useMipMaps(): boolean;
    set useMipMaps(value: boolean);
    /** @internal */
    _cachedWrapU: Nullable<number>;
    /** @internal */
    _cachedWrapV: Nullable<number>;
    /** @internal */
    _cachedWrapR: Nullable<number>;
    /** @internal */
    _cachedAnisotropicFilteringLevel: Nullable<number>;
    /** @internal */
    _comparisonFunction: number;
    /**
     * Used for debugging purpose only
     */
    label?: string;
    /**
     * Creates a Sampler instance
     */
    constructor();
    /**
     * Sets all the parameters of the sampler
     * @param wrapU u address mode (default: TEXTURE_WRAP_ADDRESSMODE)
     * @param wrapV v address mode (default: TEXTURE_WRAP_ADDRESSMODE)
     * @param wrapR r address mode (default: TEXTURE_WRAP_ADDRESSMODE)
     * @param anisotropicFilteringLevel anisotropic level (default: 1)
     * @param samplingMode sampling mode (default: Constants.TEXTURE_BILINEAR_SAMPLINGMODE)
     * @param comparisonFunction comparison function (default: 0 - no comparison function)
     * @returns the current sampler instance
     */
    setParameters(wrapU?: number, wrapV?: number, wrapR?: number, anisotropicFilteringLevel?: number, samplingMode?: number, comparisonFunction?: number): TextureSampler;
    /**
     * Compares this sampler with another one
     * @param other sampler to compare with
     * @returns true if the samplers have the same parametres, else false
     */
    compareSampler(other: TextureSampler): boolean;
}
