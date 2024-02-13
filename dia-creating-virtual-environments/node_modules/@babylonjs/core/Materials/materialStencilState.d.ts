import type { IStencilState } from "../States/IStencilState";
import type { Scene } from "../scene";
/**
 * Class that holds the different stencil states of a material
 * Usage example: https://playground.babylonjs.com/#CW5PRI#10
 */
export declare class MaterialStencilState implements IStencilState {
    /**
     * Creates a material stencil state instance
     */
    constructor();
    /**
     * Resets all the stencil states to default values
     */
    reset(): void;
    private _func;
    /**
     * Gets or sets the stencil function
     */
    get func(): number;
    set func(value: number);
    private _funcRef;
    /**
     * Gets or sets the stencil function reference
     */
    get funcRef(): number;
    set funcRef(value: number);
    private _funcMask;
    /**
     * Gets or sets the stencil function mask
     */
    get funcMask(): number;
    set funcMask(value: number);
    private _opStencilFail;
    /**
     * Gets or sets the operation when the stencil test fails
     */
    get opStencilFail(): number;
    set opStencilFail(value: number);
    private _opDepthFail;
    /**
     * Gets or sets the operation when the depth test fails
     */
    get opDepthFail(): number;
    set opDepthFail(value: number);
    private _opStencilDepthPass;
    /**
     * Gets or sets the operation when the stencil+depth test succeeds
     */
    get opStencilDepthPass(): number;
    set opStencilDepthPass(value: number);
    private _mask;
    /**
     * Gets or sets the stencil mask
     */
    get mask(): number;
    set mask(value: number);
    private _enabled;
    /**
     * Enables or disables the stencil test
     */
    get enabled(): boolean;
    set enabled(value: boolean);
    /**
     * Get the current class name, useful for serialization or dynamic coding.
     * @returns "MaterialStencilState"
     */
    getClassName(): string;
    /**
     * Makes a duplicate of the current configuration into another one.
     * @param stencilState defines stencil state where to copy the info
     */
    copyTo(stencilState: MaterialStencilState): void;
    /**
     * Serializes this stencil configuration.
     * @returns - An object with the serialized config.
     */
    serialize(): any;
    /**
     * Parses a stencil state configuration from a serialized object.
     * @param source - Serialized object.
     * @param scene Defines the scene we are parsing for
     * @param rootUrl Defines the rootUrl to load from
     */
    parse(source: any, scene: Scene, rootUrl: string): void;
}
