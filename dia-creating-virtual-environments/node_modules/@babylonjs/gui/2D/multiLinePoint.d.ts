import type { Nullable } from "@babylonjs/core/types.js";
import { Vector3 } from "@babylonjs/core/Maths/math.vector.js";
import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh.js";
import type { MultiLine } from "./controls/multiLine";
import type { Control } from "./controls/control";
/**
 * Class used to store a point for a MultiLine object.
 * The point can be pure 2D coordinates, a mesh or a control
 */
export declare class MultiLinePoint {
    private _multiLine;
    private _x;
    private _y;
    private _control;
    private _mesh;
    private _controlObserver;
    private _meshObserver;
    /** @internal */
    _point: Vector3;
    /**
     * Creates a new MultiLinePoint
     * @param multiLine defines the source MultiLine object
     */
    constructor(multiLine: MultiLine);
    /** Gets or sets x coordinate */
    get x(): string | number;
    set x(value: string | number);
    /** Gets or sets y coordinate */
    get y(): string | number;
    set y(value: string | number);
    /** Gets or sets the control associated with this point */
    get control(): Nullable<Control>;
    set control(value: Nullable<Control>);
    /** Gets or sets the mesh associated with this point */
    get mesh(): Nullable<AbstractMesh>;
    set mesh(value: Nullable<AbstractMesh>);
    /** Resets links */
    resetLinks(): void;
    /**
     * Gets a translation vector with Z component
     * @returns the translation vector
     */
    translate(): Vector3;
    private _translatePoint;
    /** Release associated resources */
    dispose(): void;
}
