import type { DeepImmutable } from "../types";
import { Color3 } from "../Maths/math.color";
/**
 * Options to be used when creating a FresnelParameters.
 */
export type IFresnelParametersCreationOptions = {
    /**
     * Define the color used on edges (grazing angle)
     */
    leftColor?: Color3;
    /**
     * Define the color used on center
     */
    rightColor?: Color3;
    /**
     * Define bias applied to computed fresnel term
     */
    bias?: number;
    /**
     * Defined the power exponent applied to fresnel term
     */
    power?: number;
    /**
     * Define if the fresnel effect is enable or not.
     */
    isEnabled?: boolean;
};
/**
 * Serialized format for FresnelParameters.
 */
export type IFresnelParametersSerialized = {
    /**
     * Define the color used on edges (grazing angle) [as an array]
     */
    leftColor: number[];
    /**
     * Define the color used on center [as an array]
     */
    rightColor: number[];
    /**
     * Define bias applied to computed fresnel term
     */
    bias: number;
    /**
     * Defined the power exponent applied to fresnel term
     */
    power?: number;
    /**
     * Define if the fresnel effect is enable or not.
     */
    isEnabled: boolean;
};
/**
 * This represents all the required information to add a fresnel effect on a material:
 * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/using/fresnelParameters
 */
export declare class FresnelParameters {
    private _isEnabled;
    /**
     * Define if the fresnel effect is enable or not.
     */
    get isEnabled(): boolean;
    set isEnabled(value: boolean);
    /**
     * Define the color used on edges (grazing angle)
     */
    leftColor: Color3;
    /**
     * Define the color used on center
     */
    rightColor: Color3;
    /**
     * Define bias applied to computed fresnel term
     */
    bias: number;
    /**
     * Defined the power exponent applied to fresnel term
     */
    power: number;
    /**
     * Creates a new FresnelParameters object.
     *
     * @param options provide your own settings to optionally to override defaults
     */
    constructor(options?: IFresnelParametersCreationOptions);
    /**
     * Clones the current fresnel and its values
     * @returns a clone fresnel configuration
     */
    clone(): FresnelParameters;
    /**
     * Determines equality between FresnelParameters objects
     * @param otherFresnelParameters defines the second operand
     * @returns true if the power, bias, leftColor, rightColor and isEnabled values are equal to the given ones
     */
    equals(otherFresnelParameters: DeepImmutable<FresnelParameters>): boolean;
    /**
     * Serializes the current fresnel parameters to a JSON representation.
     * @returns the JSON serialization
     */
    serialize(): IFresnelParametersSerialized;
    /**
     * Parse a JSON object and deserialize it to a new Fresnel parameter object.
     * @param parsedFresnelParameters Define the JSON representation
     * @returns the parsed parameters
     */
    static Parse(parsedFresnelParameters: IFresnelParametersSerialized): FresnelParameters;
}
