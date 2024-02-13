import { NodeMaterialBlock } from "../nodeMaterialBlock";
import type { NodeMaterialBuildState } from "../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../nodeMaterialBlockConnectionPoint";
import type { Scene } from "../../../scene";
/**
 * Types of curves supported by the Curve block
 */
export declare enum CurveBlockTypes {
    /** EaseInSine */
    EaseInSine = 0,
    /** EaseOutSine */
    EaseOutSine = 1,
    /** EaseInOutSine */
    EaseInOutSine = 2,
    /** EaseInQuad */
    EaseInQuad = 3,
    /** EaseOutQuad */
    EaseOutQuad = 4,
    /** EaseInOutQuad */
    EaseInOutQuad = 5,
    /** EaseInCubic */
    EaseInCubic = 6,
    /** EaseOutCubic */
    EaseOutCubic = 7,
    /** EaseInOutCubic */
    EaseInOutCubic = 8,
    /** EaseInQuart */
    EaseInQuart = 9,
    /** EaseOutQuart */
    EaseOutQuart = 10,
    /** EaseInOutQuart */
    EaseInOutQuart = 11,
    /** EaseInQuint */
    EaseInQuint = 12,
    /** EaseOutQuint */
    EaseOutQuint = 13,
    /** EaseInOutQuint */
    EaseInOutQuint = 14,
    /** EaseInExpo */
    EaseInExpo = 15,
    /** EaseOutExpo */
    EaseOutExpo = 16,
    /** EaseInOutExpo */
    EaseInOutExpo = 17,
    /** EaseInCirc */
    EaseInCirc = 18,
    /** EaseOutCirc */
    EaseOutCirc = 19,
    /** EaseInOutCirc */
    EaseInOutCirc = 20,
    /** EaseInBack */
    EaseInBack = 21,
    /** EaseOutBack */
    EaseOutBack = 22,
    /** EaseInOutBack */
    EaseInOutBack = 23,
    /** EaseInElastic */
    EaseInElastic = 24,
    /** EaseOutElastic */
    EaseOutElastic = 25,
    /** EaseInOutElastic */
    EaseInOutElastic = 26
}
/**
 * Block used to apply curve operation
 */
export declare class CurveBlock extends NodeMaterialBlock {
    /**
     * Gets or sets the type of the curve applied by the block
     */
    type: CurveBlockTypes;
    /**
     * Creates a new CurveBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the input component
     */
    get input(): NodeMaterialConnectionPoint;
    /**
     * Gets the output component
     */
    get output(): NodeMaterialConnectionPoint;
    private _duplicateEntry;
    private _duplicateEntryDirect;
    private _duplicateVector;
    protected _buildBlock(state: NodeMaterialBuildState): this;
    serialize(): any;
    _deserialize(serializationObject: any, scene: Scene, rootUrl: string): void;
    protected _dumpPropertiesCode(): string;
}
