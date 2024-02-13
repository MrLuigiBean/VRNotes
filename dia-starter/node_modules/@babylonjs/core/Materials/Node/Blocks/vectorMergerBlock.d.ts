import { NodeMaterialBlock } from "../nodeMaterialBlock";
import type { NodeMaterialBuildState } from "../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../nodeMaterialBlockConnectionPoint";
import type { Scene } from "../../../scene";
/**
 * Block used to create a Vector2/3/4 out of individual inputs (one for each component)
 */
export declare class VectorMergerBlock extends NodeMaterialBlock {
    /**
     * Gets or sets the swizzle for x (meaning which component to affect to the output.x)
     */
    xSwizzle: "x" | "y" | "z" | "w";
    /**
     * Gets or sets the swizzle for y (meaning which component to affect to the output.y)
     */
    ySwizzle: "x" | "y" | "z" | "w";
    /**
     * Gets or sets the swizzle for z (meaning which component to affect to the output.z)
     */
    zSwizzle: "x" | "y" | "z" | "w";
    /**
     * Gets or sets the swizzle for w (meaning which component to affect to the output.w)
     */
    wSwizzle: "x" | "y" | "z" | "w";
    /**
     * Create a new VectorMergerBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the xyzw component (input)
     */
    get xyzwIn(): NodeMaterialConnectionPoint;
    /**
     * Gets the xyz component (input)
     */
    get xyzIn(): NodeMaterialConnectionPoint;
    /**
     * Gets the xy component (input)
     */
    get xyIn(): NodeMaterialConnectionPoint;
    /**
     * Gets the zw component (input)
     */
    get zwIn(): NodeMaterialConnectionPoint;
    /**
     * Gets the x component (input)
     */
    get x(): NodeMaterialConnectionPoint;
    /**
     * Gets the y component (input)
     */
    get y(): NodeMaterialConnectionPoint;
    /**
     * Gets the z component (input)
     */
    get z(): NodeMaterialConnectionPoint;
    /**
     * Gets the w component (input)
     */
    get w(): NodeMaterialConnectionPoint;
    /**
     * Gets the xyzw component (output)
     */
    get xyzw(): NodeMaterialConnectionPoint;
    /**
     * Gets the xyz component (output)
     */
    get xyzOut(): NodeMaterialConnectionPoint;
    /**
     * Gets the xy component (output)
     */
    get xyOut(): NodeMaterialConnectionPoint;
    /**
     * Gets the zw component (output)
     */
    get zwOut(): NodeMaterialConnectionPoint;
    /**
     * Gets the xy component (output)
     * @deprecated Please use xyOut instead.
     */
    get xy(): NodeMaterialConnectionPoint;
    /**
     * Gets the xyz component (output)
     * @deprecated Please use xyzOut instead.
     */
    get xyz(): NodeMaterialConnectionPoint;
    protected _inputRename(name: string): string;
    private _buildSwizzle;
    protected _buildBlock(state: NodeMaterialBuildState): this;
    serialize(): any;
    _deserialize(serializationObject: any, scene: Scene, rootUrl: string): void;
    protected _dumpPropertiesCode(): string;
}
