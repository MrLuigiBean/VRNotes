import type { Scene } from "./scene";
import type { Nullable } from "./types";
import type { AbstractMesh } from "./Meshes/abstractMesh";
import type { TransformNode } from "./Meshes/transformNode";
import type { Geometry } from "./Meshes/geometry";
import type { Skeleton } from "./Bones/skeleton";
import type { MorphTargetManager } from "./Morph/morphTargetManager";
import type { AssetContainer } from "./assetContainer";
import type { IParticleSystem } from "./Particles/IParticleSystem";
import type { AnimationGroup } from "./Animations/animationGroup";
import type { BaseTexture } from "./Materials/Textures/baseTexture";
import type { Material } from "./Materials/material";
import type { MultiMaterial } from "./Materials/multiMaterial";
import type { AbstractActionManager } from "./Actions/abstractActionManager";
import type { Camera } from "./Cameras/camera";
import type { Light } from "./Lights/light";
import type { Node } from "./node";
import type { PostProcess } from "./PostProcesses/postProcess";
import type { Animation } from "./Animations/animation";
/**
 * Defines how the parser contract is defined.
 * These parsers are used to parse a list of specific assets (like particle systems, etc..)
 */
export type BabylonFileParser = (parsedData: any, scene: Scene, container: AssetContainer, rootUrl: string) => void;
/**
 * Defines how the individual parser contract is defined.
 * These parser can parse an individual asset
 */
export type IndividualBabylonFileParser = (parsedData: any, scene: Scene, rootUrl: string) => any;
/**
 * Base class of the scene acting as a container for the different elements composing a scene.
 * This class is dynamically extended by the different components of the scene increasing
 * flexibility and reducing coupling
 */
export declare abstract class AbstractScene {
    /**
     * Stores the list of available parsers in the application.
     */
    private static _BabylonFileParsers;
    /**
     * Stores the list of available individual parsers in the application.
     */
    private static _IndividualBabylonFileParsers;
    /**
     * Adds a parser in the list of available ones
     * @param name Defines the name of the parser
     * @param parser Defines the parser to add
     */
    static AddParser(name: string, parser: BabylonFileParser): void;
    /**
     * Gets a general parser from the list of available ones
     * @param name Defines the name of the parser
     * @returns the requested parser or null
     */
    static GetParser(name: string): Nullable<BabylonFileParser>;
    /**
     * Adds n individual parser in the list of available ones
     * @param name Defines the name of the parser
     * @param parser Defines the parser to add
     */
    static AddIndividualParser(name: string, parser: IndividualBabylonFileParser): void;
    /**
     * Gets an individual parser from the list of available ones
     * @param name Defines the name of the parser
     * @returns the requested parser or null
     */
    static GetIndividualParser(name: string): Nullable<IndividualBabylonFileParser>;
    /**
     * Parser json data and populate both a scene and its associated container object
     * @param jsonData Defines the data to parse
     * @param scene Defines the scene to parse the data for
     * @param container Defines the container attached to the parsing sequence
     * @param rootUrl Defines the root url of the data
     */
    static Parse(jsonData: any, scene: Scene, container: AssetContainer, rootUrl: string): void;
    /**
     * Gets the list of root nodes (ie. nodes with no parent)
     */
    rootNodes: Node[];
    /** All of the cameras added to this scene
     * @see https://doc.babylonjs.com/features/featuresDeepDive/cameras
     */
    cameras: Camera[];
    /**
     * All of the lights added to this scene
     * @see https://doc.babylonjs.com/features/featuresDeepDive/lights/lights_introduction
     */
    lights: Light[];
    /**
     * All of the (abstract) meshes added to this scene
     */
    meshes: AbstractMesh[];
    /**
     * The list of skeletons added to the scene
     * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/bonesSkeletons
     */
    skeletons: Skeleton[];
    /**
     * All of the particle systems added to this scene
     * @see https://doc.babylonjs.com/features/featuresDeepDive/particles/particle_system/particle_system_intro
     */
    particleSystems: IParticleSystem[];
    /**
     * Gets a list of Animations associated with the scene
     */
    animations: Animation[];
    /**
     * All of the animation groups added to this scene
     * @see https://doc.babylonjs.com/features/featuresDeepDive/animation/groupAnimations
     */
    animationGroups: AnimationGroup[];
    /**
     * All of the multi-materials added to this scene
     * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/using/multiMaterials
     */
    multiMaterials: MultiMaterial[];
    /**
     * All of the materials added to this scene
     * In the context of a Scene, it is not supposed to be modified manually.
     * Any addition or removal should be done using the addMaterial and removeMaterial Scene methods.
     * Note also that the order of the Material within the array is not significant and might change.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/using/materials_introduction
     */
    materials: Material[];
    /**
     * The list of morph target managers added to the scene
     * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/dynamicMeshMorph
     */
    morphTargetManagers: MorphTargetManager[];
    /**
     * The list of geometries used in the scene.
     */
    geometries: Geometry[];
    /**
     * All of the transform nodes added to this scene
     * In the context of a Scene, it is not supposed to be modified manually.
     * Any addition or removal should be done using the addTransformNode and removeTransformNode Scene methods.
     * Note also that the order of the TransformNode within the array is not significant and might change.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/transforms/parent_pivot/transform_node
     */
    transformNodes: TransformNode[];
    /**
     * ActionManagers available on the scene.
     * @deprecated
     */
    actionManagers: AbstractActionManager[];
    /**
     * Textures to keep.
     */
    textures: BaseTexture[];
    /** @internal */
    protected _environmentTexture: Nullable<BaseTexture>;
    /**
     * Texture used in all pbr material as the reflection texture.
     * As in the majority of the scene they are the same (exception for multi room and so on),
     * this is easier to reference from here than from all the materials.
     */
    get environmentTexture(): Nullable<BaseTexture>;
    set environmentTexture(value: Nullable<BaseTexture>);
    /**
     * The list of postprocesses added to the scene
     */
    postProcesses: PostProcess[];
    /**
     * @returns all meshes, lights, cameras, transformNodes and bones
     */
    getNodes(): Array<Node>;
}
