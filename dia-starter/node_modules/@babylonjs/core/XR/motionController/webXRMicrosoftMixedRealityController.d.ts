import type { IMinimalMotionControllerObject, MotionControllerHandedness } from "./webXRAbstractMotionController";
import { WebXRAbstractMotionController } from "./webXRAbstractMotionController";
import type { AbstractMesh } from "../../Meshes/abstractMesh";
import type { Scene } from "../../scene";
/**
 * The motion controller class for all microsoft mixed reality controllers
 */
export declare class WebXRMicrosoftMixedRealityController extends WebXRAbstractMotionController {
    protected readonly _mapping: {
        defaultButton: {
            valueNodeName: string;
            unpressedNodeName: string;
            pressedNodeName: string;
        };
        defaultAxis: {
            valueNodeName: string;
            minNodeName: string;
            maxNodeName: string;
        };
        buttons: {
            "xr-standard-trigger": {
                rootNodeName: string;
                componentProperty: string;
                states: string[];
            };
            "xr-standard-squeeze": {
                rootNodeName: string;
                componentProperty: string;
                states: string[];
            };
            "xr-standard-touchpad": {
                rootNodeName: string;
                labelAnchorNodeName: string;
                touchPointNodeName: string;
            };
            "xr-standard-thumbstick": {
                rootNodeName: string;
                componentProperty: string;
                states: string[];
            };
        };
        axes: {
            "xr-standard-touchpad": {
                "x-axis": {
                    rootNodeName: string;
                };
                "y-axis": {
                    rootNodeName: string;
                };
            };
            "xr-standard-thumbstick": {
                "x-axis": {
                    rootNodeName: string;
                };
                "y-axis": {
                    rootNodeName: string;
                };
            };
        };
    };
    /**
     * The base url used to load the left and right controller models
     */
    static MODEL_BASE_URL: string;
    /**
     * The name of the left controller model file
     */
    static MODEL_LEFT_FILENAME: string;
    /**
     * The name of the right controller model file
     */
    static MODEL_RIGHT_FILENAME: string;
    profileId: string;
    constructor(scene: Scene, gamepadObject: IMinimalMotionControllerObject, handedness: MotionControllerHandedness);
    protected _getFilenameAndPath(): {
        filename: string;
        path: string;
    };
    protected _getModelLoadingConstraints(): boolean;
    protected _processLoadedModel(_meshes: AbstractMesh[]): void;
    protected _setRootMesh(meshes: AbstractMesh[]): void;
    protected _updateModel(): void;
}
