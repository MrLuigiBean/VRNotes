import { Measure } from "../../measure";
import { Container } from "../container";
import type { ICanvasRenderingContext } from "@babylonjs/core/Engines/ICanvas.js";
/**
 * Class used to hold a the container for ScrollViewer
 * @internal
 */
export declare class _ScrollViewerWindow extends Container {
    parentClientWidth: number;
    parentClientHeight: number;
    private _freezeControls;
    private _parentMeasure;
    private _oldLeft;
    private _oldTop;
    get freezeControls(): boolean;
    set freezeControls(value: boolean);
    private _bucketWidth;
    private _bucketHeight;
    private _buckets;
    private _bucketLen;
    get bucketWidth(): number;
    get bucketHeight(): number;
    setBucketSizes(width: number, height: number): void;
    private _useBuckets;
    private _makeBuckets;
    private _dispatchInBuckets;
    private _updateMeasures;
    private _updateChildrenMeasures;
    private _restoreMeasures;
    /**
     * Creates a new ScrollViewerWindow
     * @param name of ScrollViewerWindow
     */
    constructor(name?: string);
    protected _getTypeName(): string;
    /**
     * @internal
     */
    protected _additionalProcessing(parentMeasure: Measure, context: ICanvasRenderingContext): void;
    /**
     * @internal
     */
    _layout(parentMeasure: Measure, context: ICanvasRenderingContext): boolean;
    private _scrollChildren;
    private _scrollChildrenWithBuckets;
    /**
     * @internal
     */
    _draw(context: ICanvasRenderingContext, invalidatedRectangle?: Measure): void;
    protected _postMeasure(): void;
}
