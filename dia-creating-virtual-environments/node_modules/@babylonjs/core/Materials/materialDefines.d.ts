/**
 * Manages the defines for the Material
 */
export declare class MaterialDefines {
    /** @internal */
    protected _keys: string[];
    private _isDirty;
    /** @internal */
    _renderId: number;
    /** @internal */
    _areLightsDirty: boolean;
    /** @internal */
    _areLightsDisposed: boolean;
    /** @internal */
    _areAttributesDirty: boolean;
    /** @internal */
    _areTexturesDirty: boolean;
    /** @internal */
    _areFresnelDirty: boolean;
    /** @internal */
    _areMiscDirty: boolean;
    /** @internal */
    _arePrePassDirty: boolean;
    /** @internal */
    _areImageProcessingDirty: boolean;
    /** @internal */
    _normals: boolean;
    /** @internal */
    _uvs: boolean;
    /** @internal */
    _needNormals: boolean;
    /** @internal */
    _needUVs: boolean;
    protected _externalProperties?: {
        [name: string]: {
            type: string;
            default: any;
        };
    };
    [id: string]: any;
    /**
     * Creates a new instance
     * @param externalProperties list of external properties to inject into the object
     */
    constructor(externalProperties?: {
        [name: string]: {
            type: string;
            default: any;
        };
    });
    /**
     * Specifies if the material needs to be re-calculated
     */
    get isDirty(): boolean;
    /**
     * Marks the material to indicate that it has been re-calculated
     */
    markAsProcessed(): void;
    /**
     * Marks the material to indicate that it needs to be re-calculated
     */
    markAsUnprocessed(): void;
    /**
     * Marks the material to indicate all of its defines need to be re-calculated
     */
    markAllAsDirty(): void;
    /**
     * Marks the material to indicate that image processing needs to be re-calculated
     */
    markAsImageProcessingDirty(): void;
    /**
     * Marks the material to indicate the lights need to be re-calculated
     * @param disposed Defines whether the light is dirty due to dispose or not
     */
    markAsLightDirty(disposed?: boolean): void;
    /**
     * Marks the attribute state as changed
     */
    markAsAttributesDirty(): void;
    /**
     * Marks the texture state as changed
     */
    markAsTexturesDirty(): void;
    /**
     * Marks the fresnel state as changed
     */
    markAsFresnelDirty(): void;
    /**
     * Marks the misc state as changed
     */
    markAsMiscDirty(): void;
    /**
     * Marks the prepass state as changed
     */
    markAsPrePassDirty(): void;
    /**
     * Rebuilds the material defines
     */
    rebuild(): void;
    /**
     * Specifies if two material defines are equal
     * @param other - A material define instance to compare to
     * @returns - Boolean indicating if the material defines are equal (true) or not (false)
     */
    isEqual(other: MaterialDefines): boolean;
    /**
     * Clones this instance's defines to another instance
     * @param other - material defines to clone values to
     */
    cloneTo(other: MaterialDefines): void;
    /**
     * Resets the material define values
     */
    reset(): void;
    private _setDefaultValue;
    /**
     * Converts the material define values to a string
     * @returns - String of material define information
     */
    toString(): string;
}
