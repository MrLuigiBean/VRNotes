import type { IMinimalMotionControllerObject, MotionControllerHandedness } from "./webXRAbstractMotionController";
import { WebXRAbstractMotionController } from "./webXRAbstractMotionController";
import type { Scene } from "../../scene";
import type { AbstractMesh } from "../../Meshes/abstractMesh";
/**
 * The motion controller class for the standard HTC-Vive controllers
 */
export declare class WebXRHTCViveMotionController extends WebXRAbstractMotionController {
    private _modelRootNode;
    /**
     * The base url used to load the left and right controller models
     */
    static MODEL_BASE_URL: string;
    /**
     * File name for the controller model.
     */
    static MODEL_FILENAME: string;
    profileId: string;
    /**
     * Create a new Vive motion controller object
     * @param scene the scene to use to create this controller
     * @param gamepadObject the corresponding gamepad object
     * @param handedness the handedness of the controller
     */
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
