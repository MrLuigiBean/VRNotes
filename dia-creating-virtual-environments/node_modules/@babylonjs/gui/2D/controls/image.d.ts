import type { Nullable } from "@babylonjs/core/types.js";
import { Observable } from "@babylonjs/core/Misc/observable.js";
import { Control } from "./control";
import type { Measure } from "../measure";
import type { ICanvasRenderingContext, IImage } from "@babylonjs/core/Engines/ICanvas.js";
/**
 * Class used to create 2D images
 */
export declare class Image extends Control {
    name?: string | undefined;
    /**
     *  Specifies an alternate text for the image, if the image for some reason cannot be displayed.
     */
    alt?: string;
    private _workingCanvas;
    private _domImage;
    private _imageWidth;
    private _imageHeight;
    private _loaded;
    private _stretch;
    private _source;
    private _autoScale;
    private _sourceLeft;
    private _sourceTop;
    private _sourceWidth;
    private _sourceHeight;
    private _svgAttributesComputationCompleted;
    private _isSVG;
    private _cellWidth;
    private _cellHeight;
    private _cellId;
    private _sliceLeft;
    private _sliceRight;
    private _sliceTop;
    private _sliceBottom;
    private _populateNinePatchSlicesFromImage;
    private _detectPointerOnOpaqueOnly;
    private _imageDataCache;
    /**
     * Cache of images to avoid loading the same image multiple times
     */
    static SourceImgCache: Map<string, {
        img: IImage;
        timesUsed: number;
        loaded: boolean;
        waitingForLoadCallback: Array<() => void>;
    }>;
    /**
     * Observable notified when the content is loaded
     */
    onImageLoadedObservable: Observable<Image>;
    /**
     * Observable notified when _sourceLeft, _sourceTop, _sourceWidth and _sourceHeight are computed
     */
    onSVGAttributesComputedObservable: Observable<Image>;
    /**
     * Gets or sets the referrer policy to apply on the img element load request.
     * You should set referrerPolicy before set the source of the image if you want to ensure the header will be present on the xhr loading request
     */
    referrerPolicy: Nullable<ReferrerPolicy>;
    /**
     * Gets a boolean indicating that the content is loaded
     */
    get isLoaded(): boolean;
    isReady(): boolean;
    /**
     * Gets or sets a boolean indicating if pointers should only be validated on pixels with alpha > 0.
     * Beware using this as this will consume more memory as the image has to be stored twice
     */
    get detectPointerOnOpaqueOnly(): boolean;
    set detectPointerOnOpaqueOnly(value: boolean);
    /**
     * Gets or sets the left value for slicing (9-patch)
     */
    get sliceLeft(): number;
    set sliceLeft(value: number);
    /**
     * Gets or sets the right value for slicing (9-patch)
     */
    get sliceRight(): number;
    set sliceRight(value: number);
    /**
     * Gets or sets the top value for slicing (9-patch)
     */
    get sliceTop(): number;
    set sliceTop(value: number);
    /**
     * Gets or sets the bottom value for slicing (9-patch)
     */
    get sliceBottom(): number;
    set sliceBottom(value: number);
    /**
     * Gets or sets the left coordinate in the source image
     */
    get sourceLeft(): number;
    set sourceLeft(value: number);
    /**
     * Gets or sets the top coordinate in the source image
     */
    get sourceTop(): number;
    set sourceTop(value: number);
    /**
     * Gets or sets the width to capture in the source image
     */
    get sourceWidth(): number;
    set sourceWidth(value: number);
    /**
     * Gets or sets the height to capture in the source image
     */
    get sourceHeight(): number;
    set sourceHeight(value: number);
    /**
     * Gets the image width
     */
    get imageWidth(): number;
    /**
     * Gets the image height
     */
    get imageHeight(): number;
    /**
     * Gets or sets a boolean indicating if nine patch slices (left, top, right, bottom) should be read from image data
     */
    get populateNinePatchSlicesFromImage(): boolean;
    set populateNinePatchSlicesFromImage(value: boolean);
    /** Indicates if the format of the image is SVG */
    get isSVG(): boolean;
    /** Gets the status of the SVG attributes computation (sourceLeft, sourceTop, sourceWidth, sourceHeight) */
    get svgAttributesComputationCompleted(): boolean;
    /**
     * Gets or sets a boolean indicating if the image can force its container to adapt its size
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#image
     */
    get autoScale(): boolean;
    set autoScale(value: boolean);
    /** Gets or sets the stretching mode used by the image */
    get stretch(): number;
    set stretch(value: number);
    /**
     * @internal
     */
    _rotate90(n: number, preserveProperties?: boolean): Image;
    private _handleRotationForSVGImage;
    private _rotate90SourceProperties;
    private _extractNinePatchSliceDataFromImage;
    /**
     * Gets or sets the internal DOM image used to render the control
     */
    set domImage(value: IImage);
    get domImage(): IImage;
    private _onImageLoaded;
    /**
     * Gets the image source url
     */
    get source(): Nullable<string>;
    /**
     * Resets the internal Image Element cache. Can reduce memory usage.
     */
    static ResetImageCache(): void;
    private _removeCacheUsage;
    /**
     * Gets or sets image source url
     */
    set source(value: Nullable<string>);
    /**
     * Checks for svg document with icon id present
     * @param value
     */
    private _svgCheck;
    /**
     * Sets sourceLeft, sourceTop, sourceWidth, sourceHeight automatically
     * given external svg file and icon id
     * @param svgsrc
     * @param elemid
     */
    private _getSVGAttribs;
    /**
     * Gets or sets the cell width to use when animation sheet is enabled
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#image
     */
    get cellWidth(): number;
    set cellWidth(value: number);
    /**
     * Gets or sets the cell height to use when animation sheet is enabled
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#image
     */
    get cellHeight(): number;
    set cellHeight(value: number);
    /**
     * Gets or sets the cell id to use (this will turn on the animation sheet mode)
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#image
     */
    get cellId(): number;
    set cellId(value: number);
    /**
     * Creates a new Image
     * @param name defines the control name
     * @param url defines the image url
     */
    constructor(name?: string | undefined, url?: Nullable<string>);
    /**
     * Tests if a given coordinates belong to the current control
     * @param x defines x coordinate to test
     * @param y defines y coordinate to test
     * @returns true if the coordinates are inside the control
     */
    contains(x: number, y: number): boolean;
    protected _getTypeName(): string;
    /** Force the control to synchronize with its content */
    synchronizeSizeWithContent(): void;
    protected _processMeasures(parentMeasure: Measure, context: ICanvasRenderingContext): void;
    private _prepareWorkingCanvasForOpaqueDetection;
    private _drawImage;
    _draw(context: ICanvasRenderingContext): void;
    private _renderNinePatch;
    dispose(): void;
    /** STRETCH_NONE */
    static readonly STRETCH_NONE = 0;
    /** STRETCH_FILL */
    static readonly STRETCH_FILL = 1;
    /** STRETCH_UNIFORM */
    static readonly STRETCH_UNIFORM = 2;
    /** STRETCH_EXTEND */
    static readonly STRETCH_EXTEND = 3;
    /** NINE_PATCH */
    static readonly STRETCH_NINE_PATCH = 4;
}
