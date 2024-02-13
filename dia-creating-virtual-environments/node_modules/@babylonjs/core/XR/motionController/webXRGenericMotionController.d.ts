import type { IMinimalMotionControllerObject, MotionControllerHandedness } from "./webXRAbstractMotionController";
import { WebXRAbstractMotionController } from "./webXRAbstractMotionController";
import type { AbstractMesh } from "../../Meshes/abstractMesh";
import type { Scene } from "../../scene";
/**
 * A generic trigger-only motion controller for WebXR
 */
export declare class WebXRGenericTriggerMotionController extends WebXRAbstractMotionController {
    /**
     * Static version of the profile id of this controller
     */
    static ProfileId: string;
    profileId: string;
    constructor(scene: Scene, gamepadObject: IMinimalMotionControllerObject, handedness: MotionControllerHandedness);
    protected _getFilenameAndPath(): {
        filename: string;
        path: string;
    };
    protected _getModelLoadingConstraints(): boolean;
    protected _processLoadedModel(meshes: AbstractMesh[]): void;
    protected _setRootMesh(meshes: AbstractMesh[]): void;
    protected _updateModel(): void;
}
