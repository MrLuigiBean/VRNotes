import { Vector3 } from "../Maths/math.vector";
import type { Nullable } from "../types";
import type { Scene } from "../scene";
import type { TransformNode } from "../Meshes/transformNode";
/**
 * The Axes viewer will show 3 axes in a specific point in space
 * @see https://doc.babylonjs.com/toolsAndResources/utilities/World_Axes
 */
export declare class AxesViewer {
    private _xAxis;
    private _yAxis;
    private _zAxis;
    private _scaleLinesFactor;
    private _instanced;
    /**
     * Gets the hosting scene
     */
    scene: Nullable<Scene>;
    private _scaleLines;
    /**
     * Gets or sets a number used to scale line length
     */
    get scaleLines(): number;
    set scaleLines(value: number);
    /** Gets the node hierarchy used to render x-axis */
    get xAxis(): TransformNode;
    /** Gets the node hierarchy used to render y-axis */
    get yAxis(): TransformNode;
    /** Gets the node hierarchy used to render z-axis */
    get zAxis(): TransformNode;
    /**
     * Creates a new AxesViewer
     * @param scene defines the hosting scene
     * @param scaleLines defines a number used to scale line length (1 by default)
     * @param renderingGroupId defines a number used to set the renderingGroupId of the meshes (2 by default)
     * @param xAxis defines the node hierarchy used to render the x-axis
     * @param yAxis defines the node hierarchy used to render the y-axis
     * @param zAxis defines the node hierarchy used to render the z-axis
     * @param lineThickness The line thickness to use when creating the arrow. defaults to 1.
     */
    constructor(scene?: Scene, scaleLines?: number, renderingGroupId?: Nullable<number>, xAxis?: TransformNode, yAxis?: TransformNode, zAxis?: TransformNode, lineThickness?: number);
    /**
     * Force the viewer to update
     * @param position defines the position of the viewer
     * @param xaxis defines the x axis of the viewer
     * @param yaxis defines the y axis of the viewer
     * @param zaxis defines the z axis of the viewer
     */
    update(position: Vector3, xaxis: Vector3, yaxis: Vector3, zaxis: Vector3): void;
    /**
     * Creates an instance of this axes viewer.
     * @returns a new axes viewer with instanced meshes
     */
    createInstance(): AxesViewer;
    /** Releases resources */
    dispose(): void;
    private static _SetRenderingGroupId;
}
