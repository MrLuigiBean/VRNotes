import type { Nullable } from "../types";
import type { IDisposable, Scene } from "../scene";
import { MorphTarget } from "./morphTarget";
import type { Effect } from "../Materials/effect";
import { RawTexture2DArray } from "../Materials/Textures/rawTexture2DArray";
import type { AbstractScene } from "../abstractScene";
/**
 * This class is used to deform meshes using morphing between different targets
 * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/morphTargets
 */
export declare class MorphTargetManager implements IDisposable {
    /** Enable storing morph target data into textures when set to true (true by default) */
    static EnableTextureStorage: boolean;
    /** Maximum number of active morph targets supported in the "vertex attribute" mode (i.e., not the "texture" mode) */
    static MaxActiveMorphTargetsInVertexAttributeMode: number;
    private _targets;
    private _targetInfluenceChangedObservers;
    private _targetDataLayoutChangedObservers;
    private _activeTargets;
    private _scene;
    private _influences;
    private _morphTargetTextureIndices;
    private _supportsNormals;
    private _supportsTangents;
    private _supportsUVs;
    private _vertexCount;
    private _textureVertexStride;
    private _textureWidth;
    private _textureHeight;
    private _uniqueId;
    private _tempInfluences;
    private _canUseTextureForTargets;
    private _blockCounter;
    /** @internal */
    _parentContainer: Nullable<AbstractScene>;
    /** @internal */
    _targetStoreTexture: Nullable<RawTexture2DArray>;
    /**
     * Gets or sets a boolean indicating if influencers must be optimized (eg. recompiling the shader if less influencers are used)
     */
    optimizeInfluencers: boolean;
    /**
     * Gets or sets a boolean indicating if normals must be morphed
     */
    enableNormalMorphing: boolean;
    /**
     * Gets or sets a boolean indicating if tangents must be morphed
     */
    enableTangentMorphing: boolean;
    /**
     * Gets or sets a boolean indicating if UV must be morphed
     */
    enableUVMorphing: boolean;
    /**
     * Sets a boolean indicating that adding new target or updating an existing target will not update the underlying data buffers
     */
    set areUpdatesFrozen(block: boolean);
    get areUpdatesFrozen(): boolean;
    /**
     * Creates a new MorphTargetManager
     * @param scene defines the current scene
     */
    constructor(scene?: Nullable<Scene>);
    /**
     * Gets the unique ID of this manager
     */
    get uniqueId(): number;
    /**
     * Gets the number of vertices handled by this manager
     */
    get vertexCount(): number;
    /**
     * Gets a boolean indicating if this manager supports morphing of normals
     */
    get supportsNormals(): boolean;
    /**
     * Gets a boolean indicating if this manager supports morphing of tangents
     */
    get supportsTangents(): boolean;
    /**
     * Gets a boolean indicating if this manager supports morphing of texture coordinates
     */
    get supportsUVs(): boolean;
    /**
     * Gets the number of targets stored in this manager
     */
    get numTargets(): number;
    /**
     * Gets the number of influencers (ie. the number of targets with influences > 0)
     */
    get numInfluencers(): number;
    /**
     * Gets the list of influences (one per target)
     */
    get influences(): Float32Array;
    private _useTextureToStoreTargets;
    /**
     * Gets or sets a boolean indicating that targets should be stored as a texture instead of using vertex attributes (default is true).
     * Please note that this option is not available if the hardware does not support it
     */
    get useTextureToStoreTargets(): boolean;
    set useTextureToStoreTargets(value: boolean);
    /**
     * Gets a boolean indicating that the targets are stored into a texture (instead of as attributes)
     */
    get isUsingTextureForTargets(): boolean;
    /**
     * Gets the active target at specified index. An active target is a target with an influence > 0
     * @param index defines the index to check
     * @returns the requested target
     */
    getActiveTarget(index: number): MorphTarget;
    /**
     * Gets the target at specified index
     * @param index defines the index to check
     * @returns the requested target
     */
    getTarget(index: number): MorphTarget;
    /**
     * Add a new target to this manager
     * @param target defines the target to add
     */
    addTarget(target: MorphTarget): void;
    /**
     * Removes a target from the manager
     * @param target defines the target to remove
     */
    removeTarget(target: MorphTarget): void;
    /**
     * @internal
     */
    _bind(effect: Effect): void;
    /**
     * Clone the current manager
     * @returns a new MorphTargetManager
     */
    clone(): MorphTargetManager;
    /**
     * Serializes the current manager into a Serialization object
     * @returns the serialized object
     */
    serialize(): any;
    private _syncActiveTargets;
    /**
     * Synchronize the targets with all the meshes using this morph target manager
     */
    synchronize(): void;
    /**
     * Release all resources
     */
    dispose(): void;
    /**
     * Creates a new MorphTargetManager from serialized data
     * @param serializationObject defines the serialized data
     * @param scene defines the hosting scene
     * @returns the new MorphTargetManager
     */
    static Parse(serializationObject: any, scene: Scene): MorphTargetManager;
}
