import { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh.js";
import { Control } from "./control";
import { MultiLinePoint } from "../multiLinePoint";
import type { ICanvasRenderingContext } from "@babylonjs/core/Engines/ICanvas.js";
/**
 * Class used to create multi line control
 */
export declare class MultiLine extends Control {
    name?: string | undefined;
    private _lineWidth;
    private _dash;
    private _points;
    private _minX;
    private _minY;
    private _maxX;
    private _maxY;
    /**
     * Creates a new MultiLine
     * @param name defines the control name
     */
    constructor(name?: string | undefined);
    /** Gets or sets dash pattern */
    get dash(): Array<number>;
    set dash(value: Array<number>);
    /**
     * Gets point stored at specified index
     * @param index defines the index to look for
     * @returns the requested point if found
     */
    getAt(index: number): MultiLinePoint;
    /** Function called when a point is updated */
    onPointUpdate: () => void;
    /**
     * Adds new points to the point collection
     * @param items defines the list of items (mesh, control or 2d coordinates) to add
     * @returns the list of created MultiLinePoint
     */
    add(...items: (AbstractMesh | Control | {
        x: string | number;
        y: string | number;
    })[]): MultiLinePoint[];
    /**
     * Adds a new point to the point collection
     * @param item defines the item (mesh, control or 2d coordinates) to add
     * @returns the created MultiLinePoint
     */
    push(item?: AbstractMesh | Control | {
        x: string | number;
        y: string | number;
    }): MultiLinePoint;
    /**
     * Remove a specific value or point from the active point collection
     * @param value defines the value or point to remove
     */
    remove(value: number | MultiLinePoint): void;
    /**
     * Resets this object to initial state (no point)
     */
    reset(): void;
    /**
     * Resets all links
     */
    resetLinks(): void;
    /** Gets or sets line width */
    get lineWidth(): number;
    set lineWidth(value: number);
    set horizontalAlignment(value: number);
    set verticalAlignment(value: number);
    protected _getTypeName(): string;
    _draw(context: ICanvasRenderingContext): void;
    protected _additionalProcessing(): void;
    _measure(): void;
    protected _computeAlignment(): void;
    dispose(): void;
}
