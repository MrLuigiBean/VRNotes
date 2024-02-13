import type { Scene } from "./scene";
import type { SmartArrayNoDuplicate } from "./Misc/smartArray";
import type { Nullable } from "./types";
import type { PickingInfo } from "./Collisions/pickingInfo";
import type { AbstractScene } from "./abstractScene";
import type { IPointerEvent } from "./Events/deviceInputEvents";
import type { Mesh } from "./Meshes/mesh";
import type { Effect } from "./Materials/effect";
import type { Camera } from "./Cameras/camera";
import type { AbstractMesh } from "./Meshes/abstractMesh";
import type { SubMesh } from "./Meshes/subMesh";
import type { RenderTargetTexture } from "./Materials/Textures/renderTargetTexture";
/**
 * Groups all the scene component constants in one place to ease maintenance.
 * @internal
 */
export declare class SceneComponentConstants {
    static readonly NAME_EFFECTLAYER = "EffectLayer";
    static readonly NAME_LAYER = "Layer";
    static readonly NAME_LENSFLARESYSTEM = "LensFlareSystem";
    static readonly NAME_BOUNDINGBOXRENDERER = "BoundingBoxRenderer";
    static readonly NAME_PARTICLESYSTEM = "ParticleSystem";
    static readonly NAME_GAMEPAD = "Gamepad";
    static readonly NAME_SIMPLIFICATIONQUEUE = "SimplificationQueue";
    static readonly NAME_GEOMETRYBUFFERRENDERER = "GeometryBufferRenderer";
    static readonly NAME_PREPASSRENDERER = "PrePassRenderer";
    static readonly NAME_DEPTHRENDERER = "DepthRenderer";
    static readonly NAME_DEPTHPEELINGRENDERER = "DepthPeelingRenderer";
    static readonly NAME_POSTPROCESSRENDERPIPELINEMANAGER = "PostProcessRenderPipelineManager";
    static readonly NAME_SPRITE = "Sprite";
    static readonly NAME_SUBSURFACE = "SubSurface";
    static readonly NAME_OUTLINERENDERER = "Outline";
    static readonly NAME_PROCEDURALTEXTURE = "ProceduralTexture";
    static readonly NAME_SHADOWGENERATOR = "ShadowGenerator";
    static readonly NAME_OCTREE = "Octree";
    static readonly NAME_PHYSICSENGINE = "PhysicsEngine";
    static readonly NAME_AUDIO = "Audio";
    static readonly NAME_FLUIDRENDERER = "FluidRenderer";
    static readonly STEP_ISREADYFORMESH_EFFECTLAYER = 0;
    static readonly STEP_BEFOREEVALUATEACTIVEMESH_BOUNDINGBOXRENDERER = 0;
    static readonly STEP_EVALUATESUBMESH_BOUNDINGBOXRENDERER = 0;
    static readonly STEP_PREACTIVEMESH_BOUNDINGBOXRENDERER = 0;
    static readonly STEP_CAMERADRAWRENDERTARGET_EFFECTLAYER = 1;
    static readonly STEP_BEFORECAMERADRAW_PREPASS = 0;
    static readonly STEP_BEFORECAMERADRAW_EFFECTLAYER = 1;
    static readonly STEP_BEFORECAMERADRAW_LAYER = 2;
    static readonly STEP_BEFORERENDERTARGETDRAW_PREPASS = 0;
    static readonly STEP_BEFORERENDERTARGETDRAW_LAYER = 1;
    static readonly STEP_BEFORERENDERINGMESH_PREPASS = 0;
    static readonly STEP_BEFORERENDERINGMESH_OUTLINE = 1;
    static readonly STEP_AFTERRENDERINGMESH_PREPASS = 0;
    static readonly STEP_AFTERRENDERINGMESH_OUTLINE = 1;
    static readonly STEP_AFTERRENDERINGGROUPDRAW_EFFECTLAYER_DRAW = 0;
    static readonly STEP_AFTERRENDERINGGROUPDRAW_BOUNDINGBOXRENDERER = 1;
    static readonly STEP_BEFORECAMERAUPDATE_SIMPLIFICATIONQUEUE = 0;
    static readonly STEP_BEFORECAMERAUPDATE_GAMEPAD = 1;
    static readonly STEP_BEFORECLEAR_PROCEDURALTEXTURE = 0;
    static readonly STEP_BEFORECLEAR_PREPASS = 1;
    static readonly STEP_BEFORERENDERTARGETCLEAR_PREPASS = 0;
    static readonly STEP_AFTERRENDERTARGETDRAW_PREPASS = 0;
    static readonly STEP_AFTERRENDERTARGETDRAW_LAYER = 1;
    static readonly STEP_AFTERCAMERADRAW_PREPASS = 0;
    static readonly STEP_AFTERCAMERADRAW_EFFECTLAYER = 1;
    static readonly STEP_AFTERCAMERADRAW_LENSFLARESYSTEM = 2;
    static readonly STEP_AFTERCAMERADRAW_EFFECTLAYER_DRAW = 3;
    static readonly STEP_AFTERCAMERADRAW_LAYER = 4;
    static readonly STEP_AFTERCAMERADRAW_FLUIDRENDERER = 5;
    static readonly STEP_AFTERCAMERAPOSTPROCESS_LAYER = 0;
    static readonly STEP_AFTERRENDERTARGETPOSTPROCESS_LAYER = 0;
    static readonly STEP_AFTERRENDER_AUDIO = 0;
    static readonly STEP_GATHERRENDERTARGETS_DEPTHRENDERER = 0;
    static readonly STEP_GATHERRENDERTARGETS_GEOMETRYBUFFERRENDERER = 1;
    static readonly STEP_GATHERRENDERTARGETS_SHADOWGENERATOR = 2;
    static readonly STEP_GATHERRENDERTARGETS_POSTPROCESSRENDERPIPELINEMANAGER = 3;
    static readonly STEP_GATHERACTIVECAMERARENDERTARGETS_DEPTHRENDERER = 0;
    static readonly STEP_GATHERACTIVECAMERARENDERTARGETS_FLUIDRENDERER = 1;
    static readonly STEP_POINTERMOVE_SPRITE = 0;
    static readonly STEP_POINTERDOWN_SPRITE = 0;
    static readonly STEP_POINTERUP_SPRITE = 0;
}
/**
 * This represents a scene component.
 *
 * This is used to decouple the dependency the scene is having on the different workloads like
 * layers, post processes...
 */
export interface ISceneComponent {
    /**
     * The name of the component. Each component must have a unique name.
     */
    name: string;
    /**
     * The scene the component belongs to.
     */
    scene: Scene;
    /**
     * Register the component to one instance of a scene.
     */
    register(): void;
    /**
     * Rebuilds the elements related to this component in case of
     * context lost for instance.
     */
    rebuild(): void;
    /**
     * Disposes the component and the associated ressources.
     */
    dispose(): void;
}
/**
 * This represents a SERIALIZABLE scene component.
 *
 * This extends Scene Component to add Serialization methods on top.
 */
export interface ISceneSerializableComponent extends ISceneComponent {
    /**
     * Adds all the elements from the container to the scene
     * @param container the container holding the elements
     */
    addFromContainer(container: AbstractScene): void;
    /**
     * Removes all the elements in the container from the scene
     * @param container contains the elements to remove
     * @param dispose if the removed element should be disposed (default: false)
     */
    removeFromContainer(container: AbstractScene, dispose?: boolean): void;
    /**
     * Serializes the component data to the specified json object
     * @param serializationObject The object to serialize to
     */
    serialize(serializationObject: any): void;
}
/**
 * Strong typing of a Mesh related stage step action
 */
export type MeshStageAction = (mesh: AbstractMesh, hardwareInstancedRendering: boolean) => boolean;
/**
 * Strong typing of a Evaluate Sub Mesh related stage step action
 */
export type EvaluateSubMeshStageAction = (mesh: AbstractMesh, subMesh: SubMesh) => void;
/**
 * Strong typing of a pre active Mesh related stage step action
 */
export type PreActiveMeshStageAction = (mesh: AbstractMesh) => void;
/**
 * Strong typing of a Camera related stage step action
 */
export type CameraStageAction = (camera: Camera) => void;
/**
 * Strong typing of a Camera Frame buffer related stage step action
 */
export type CameraStageFrameBufferAction = (camera: Camera) => boolean;
/**
 * Strong typing of a Render Target related stage step action
 */
export type RenderTargetStageAction = (renderTarget: RenderTargetTexture, faceIndex?: number, layer?: number) => void;
/**
 * Strong typing of a RenderingGroup related stage step action
 */
export type RenderingGroupStageAction = (renderingGroupId: number) => void;
/**
 * Strong typing of a Mesh Render related stage step action
 */
export type RenderingMeshStageAction = (mesh: Mesh, subMesh: SubMesh, batch: any, effect: Nullable<Effect>) => void;
/**
 * Strong typing of a simple stage step action
 */
export type SimpleStageAction = () => void;
/**
 * Strong typing of a render target action.
 */
export type RenderTargetsStageAction = (renderTargets: SmartArrayNoDuplicate<RenderTargetTexture>) => void;
/**
 * Strong typing of a pointer move action.
 */
export type PointerMoveStageAction = (unTranslatedPointerX: number, unTranslatedPointerY: number, pickResult: Nullable<PickingInfo>, isMeshPicked: boolean, element: Nullable<HTMLElement>) => Nullable<PickingInfo>;
/**
 * Strong typing of a pointer up/down action.
 */
export type PointerUpDownStageAction = (unTranslatedPointerX: number, unTranslatedPointerY: number, pickResult: Nullable<PickingInfo>, evt: IPointerEvent, doubleClick: boolean) => Nullable<PickingInfo>;
/**
 * Representation of a stage in the scene (Basically a list of ordered steps)
 * @internal
 */
export declare class Stage<T extends Function> extends Array<{
    index: number;
    component: ISceneComponent;
    action: T;
}> {
    /**
     * Hide ctor from the rest of the world.
     * @param items The items to add.
     */
    private constructor();
    /**
     * Creates a new Stage.
     * @returns A new instance of a Stage
     */
    static Create<T extends Function>(): Stage<T>;
    /**
     * Registers a step in an ordered way in the targeted stage.
     * @param index Defines the position to register the step in
     * @param component Defines the component attached to the step
     * @param action Defines the action to launch during the step
     */
    registerStep(index: number, component: ISceneComponent, action: T): void;
    /**
     * Clears all the steps from the stage.
     */
    clear(): void;
}
