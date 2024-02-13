import { Vector3 } from "@babylonjs/core/Maths/math.vector.js";
import type { float } from "@babylonjs/core/types.js";
import { VolumeBasedPanel } from "./volumeBasedPanel";
import type { Control3D } from "./control3D";
/**
 * Class used to create a container panel where items get randomized planar mapping
 */
export declare class ScatterPanel extends VolumeBasedPanel {
    private _iteration;
    /**
     * Gets or sets the number of iteration to use to scatter the controls (100 by default)
     */
    get iteration(): float;
    set iteration(value: float);
    protected _mapGridNode(control: Control3D, nodePosition: Vector3): void;
    private _scatterMapping;
    protected _finalProcessing(): void;
}
