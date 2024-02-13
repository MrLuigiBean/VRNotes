import type { Nullable } from "../types";
import type { Camera } from "../Cameras/camera";
import type { PostProcessOptions } from "./postProcess";
import { PostProcess } from "./postProcess";
import type { AbstractMesh } from "../Meshes/abstractMesh";
import "../Animations/animatable";
import "../Rendering/geometryBufferRendererSceneComponent";
import "../Shaders/motionBlur.fragment";
import type { Engine } from "../Engines/engine";
import type { Scene } from "../scene";
/**
 * The Motion Blur Post Process which blurs an image based on the objects velocity in scene.
 * Velocity can be affected by each object's rotation, position and scale depending on the transformation speed.
 * As an example, all you have to do is to create the post-process:
 *  var mb = new BABYLON.MotionBlurPostProcess(
 *      'mb', // The name of the effect.
 *      scene, // The scene containing the objects to blur according to their velocity.
 *      1.0, // The required width/height ratio to downsize to before computing the render pass.
 *      camera // The camera to apply the render pass to.
 * );
 * Then, all objects moving, rotating and/or scaling will be blurred depending on the transformation speed.
 */
export declare class MotionBlurPostProcess extends PostProcess {
    /**
     * Defines how much the image is blurred by the movement. Default value is equal to 1
     */
    motionStrength: number;
    /**
     * Gets the number of iterations are used for motion blur quality. Default value is equal to 32
     */
    get motionBlurSamples(): number;
    /**
     * Sets the number of iterations to be used for motion blur quality
     */
    set motionBlurSamples(samples: number);
    private _motionBlurSamples;
    /**
     * Gets whether or not the motion blur post-process is in object based mode.
     */
    get isObjectBased(): boolean;
    /**
     * Sets whether or not the motion blur post-process is in object based mode.
     */
    set isObjectBased(value: boolean);
    private _isObjectBased;
    private _forceGeometryBuffer;
    private get _geometryBufferRenderer();
    private get _prePassRenderer();
    private _invViewProjection;
    private _previousViewProjection;
    /**
     * Gets a string identifying the name of the class
     * @returns "MotionBlurPostProcess" string
     */
    getClassName(): string;
    /**
     * Creates a new instance MotionBlurPostProcess
     * @param name The name of the effect.
     * @param scene The scene containing the objects to blur according to their velocity.
     * @param options The required width/height ratio to downsize to before computing the render pass.
     * @param camera The camera to apply the render pass to.
     * @param samplingMode The sampling mode to be used when computing the pass. (default: 0)
     * @param engine The engine which the post process will be applied. (default: current engine)
     * @param reusable If the post process can be reused on the same frame. (default: false)
     * @param textureType Type of textures used when performing the post process. (default: 0)
     * @param blockCompilation If compilation of the shader should not be done in the constructor. The updateEffect method can be used to compile the shader at a later time. (default: true)
     * @param forceGeometryBuffer If this post process should use geometry buffer instead of prepass (default: false)
     */
    constructor(name: string, scene: Scene, options: number | PostProcessOptions, camera: Nullable<Camera>, samplingMode?: number, engine?: Engine, reusable?: boolean, textureType?: number, blockCompilation?: boolean, forceGeometryBuffer?: boolean);
    /**
     * Excludes the given skinned mesh from computing bones velocities.
     * Computing bones velocities can have a cost and that cost. The cost can be saved by calling this function and by passing the skinned mesh reference to ignore.
     * @param skinnedMesh The mesh containing the skeleton to ignore when computing the velocity map.
     */
    excludeSkinnedMesh(skinnedMesh: AbstractMesh): void;
    /**
     * Removes the given skinned mesh from the excluded meshes to integrate bones velocities while rendering the velocity map.
     * @param skinnedMesh The mesh containing the skeleton that has been ignored previously.
     * @see excludeSkinnedMesh to exclude a skinned mesh from bones velocity computation.
     */
    removeExcludedSkinnedMesh(skinnedMesh: AbstractMesh): void;
    /**
     * Disposes the post process.
     * @param camera The camera to dispose the post process on.
     */
    dispose(camera?: Camera): void;
    /**
     * Called on the mode changed (object based or screen based).
     */
    private _applyMode;
    /**
     * Called on the effect is applied when the motion blur post-process is in object based mode.
     * @param effect
     */
    private _onApplyObjectBased;
    /**
     * Called on the effect is applied when the motion blur post-process is in screen based mode.
     * @param effect
     */
    private _onApplyScreenBased;
    /**
     * Called on the effect must be updated (changed mode, samples count, etc.).
     */
    private _updateEffect;
    /**
     * @internal
     */
    static _Parse(parsedPostProcess: any, targetCamera: Camera, scene: Scene, rootUrl: string): Nullable<MotionBlurPostProcess>;
}
