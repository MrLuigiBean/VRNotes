import type { Nullable } from "@babylonjs/core/types.js";
import { Observable } from "@babylonjs/core/Misc/observable.js";
import type { TransformNode } from "@babylonjs/core/Meshes/transformNode.js";
import type { Scene } from "@babylonjs/core/scene.js";
import { Control3D } from "./control3D";
import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh.js";
import { MRDLSliderBarMaterial } from "../materials/mrdl/mrdlSliderBarMaterial";
import { MRDLSliderThumbMaterial } from "../materials/mrdl/mrdlSliderThumbMaterial";
import { MRDLBackplateMaterial } from "../materials/mrdl/mrdlBackplateMaterial";
/**
 * Class used to create a slider in 3D
 */
export declare class Slider3D extends Control3D {
    /**
     * Base Url for the models.
     */
    static MODEL_BASE_URL: string;
    /**
     * File name for the 8x4 model.
     */
    static MODEL_FILENAME: string;
    private _sliderBackplate;
    private _sliderBackplateMaterial;
    private _sliderBarMaterial;
    private _sliderThumbMaterial;
    private _sliderThumb;
    private _sliderBar;
    private _sliderBackplateVisible;
    private _minimum;
    private _maximum;
    private _value;
    private _step;
    private _draggedPosition;
    /** Observable raised when the sldier value changes */
    onValueChangedObservable: Observable<number>;
    /**
     * Creates a new slider
     * @param name defines the control name
     * @param sliderBackplateVisible defines if the control has a backplate, default is false
     */
    constructor(name?: string, sliderBackplateVisible?: boolean);
    /**
     * Gets the mesh used to render this control
     */
    get mesh(): Nullable<AbstractMesh>;
    /** Gets or sets minimum value */
    get minimum(): number;
    set minimum(value: number);
    /** Gets or sets maximum value */
    get maximum(): number;
    set maximum(value: number);
    /** Gets or sets step value */
    get step(): number;
    set step(value: number);
    /** Gets or sets current value */
    get value(): number;
    set value(value: number);
    protected get start(): number;
    protected get end(): number;
    /**
     * Gets the slider bar material used by this control
     */
    get sliderBarMaterial(): MRDLSliderBarMaterial;
    /**
     * Gets the slider thumb material used by this control
     */
    get sliderThumbMaterial(): MRDLSliderThumbMaterial;
    /**
     * Gets the slider backplate material used by this control
     */
    get sliderBackplateMaterial(): MRDLBackplateMaterial;
    /** Sets a boolean indicating if the control is visible */
    set isVisible(value: boolean);
    protected _createNode(scene: Scene): TransformNode;
    protected _affectMaterial(mesh: AbstractMesh): void;
    private _createBehavior;
    private _convertToPosition;
    private _convertToValue;
    /**
     * Releases all associated resources
     */
    dispose(): void;
}
