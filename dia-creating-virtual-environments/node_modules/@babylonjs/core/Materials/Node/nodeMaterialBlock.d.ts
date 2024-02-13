import { NodeMaterialBlockConnectionPointTypes } from "./Enums/nodeMaterialBlockConnectionPointTypes";
import type { NodeMaterialBuildState } from "./nodeMaterialBuildState";
import type { Nullable } from "../../types";
import { NodeMaterialConnectionPoint } from "./nodeMaterialBlockConnectionPoint";
import { NodeMaterialBlockTargets } from "./Enums/nodeMaterialBlockTargets";
import type { Effect } from "../effect";
import type { AbstractMesh } from "../../Meshes/abstractMesh";
import type { Mesh } from "../../Meshes/mesh";
import type { SubMesh } from "../../Meshes/subMesh";
import type { NodeMaterial, NodeMaterialDefines } from "./nodeMaterial";
import type { Scene } from "../../scene";
import type { EffectFallbacks } from "../effectFallbacks";
/**
 * Defines a block that can be used inside a node based material
 */
export declare class NodeMaterialBlock {
    private _buildId;
    private _buildTarget;
    protected _target: NodeMaterialBlockTargets;
    private _isFinalMerger;
    private _isInput;
    private _isTeleportOut;
    private _isTeleportIn;
    private _name;
    protected _isUnique: boolean;
    /** Gets or sets a boolean indicating that only one input can be connected at a time */
    inputsAreExclusive: boolean;
    /** @internal */
    _codeVariableName: string;
    /** @internal */
    _inputs: NodeMaterialConnectionPoint[];
    /** @internal */
    _outputs: NodeMaterialConnectionPoint[];
    /** @internal */
    _preparationId: number;
    /** @internal */
    readonly _originalTargetIsNeutral: boolean;
    /**
     * Gets the name of the block
     */
    get name(): string;
    /**
     * Sets the name of the block. Will check if the name is valid.
     */
    set name(newName: string);
    /**
     * Gets or sets the unique id of the node
     */
    uniqueId: number;
    /**
     * Gets or sets the comments associated with this block
     */
    comments: string;
    /**
     * Gets a boolean indicating that this block can only be used once per NodeMaterial
     */
    get isUnique(): boolean;
    /**
     * Gets a boolean indicating that this block is an end block (e.g. it is generating a system value)
     */
    get isFinalMerger(): boolean;
    /**
     * Gets a boolean indicating that this block is an input (e.g. it sends data to the shader)
     */
    get isInput(): boolean;
    /**
     * Gets a boolean indicating if this block is a teleport out
     */
    get isTeleportOut(): boolean;
    /**
     * Gets a boolean indicating if this block is a teleport in
     */
    get isTeleportIn(): boolean;
    /**
     * Gets or sets the build Id
     */
    get buildId(): number;
    set buildId(value: number);
    /**
     * Gets or sets the target of the block
     */
    get target(): NodeMaterialBlockTargets;
    set target(value: NodeMaterialBlockTargets);
    /**
     * Gets the list of input points
     */
    get inputs(): NodeMaterialConnectionPoint[];
    /** Gets the list of output points */
    get outputs(): NodeMaterialConnectionPoint[];
    /**
     * Find an input by its name
     * @param name defines the name of the input to look for
     * @returns the input or null if not found
     */
    getInputByName(name: string): NodeMaterialConnectionPoint | null;
    /**
     * Find an output by its name
     * @param name defines the name of the output to look for
     * @returns the output or null if not found
     */
    getOutputByName(name: string): NodeMaterialConnectionPoint | null;
    /** Gets or sets a boolean indicating that this input can be edited in the Inspector (false by default) */
    visibleInInspector: boolean;
    /** Gets or sets a boolean indicating that this input can be edited from a collapsed frame */
    visibleOnFrame: boolean;
    /**
     * Creates a new NodeMaterialBlock
     * @param name defines the block name
     * @param target defines the target of that block (Vertex by default)
     * @param isFinalMerger defines a boolean indicating that this block is an end block (e.g. it is generating a system value). Default is false
     */
    constructor(name: string, target?: NodeMaterialBlockTargets, isFinalMerger?: boolean);
    /** @internal */
    _setInitialTarget(target: NodeMaterialBlockTargets): void;
    /**
     * Initialize the block and prepare the context for build
     * @param state defines the state that will be used for the build
     */
    initialize(state: NodeMaterialBuildState): void;
    /**
     * Bind data to effect. Will only be called for blocks with isBindable === true
     * @param effect defines the effect to bind data to
     * @param nodeMaterial defines the hosting NodeMaterial
     * @param mesh defines the mesh that will be rendered
     * @param subMesh defines the submesh that will be rendered
     */
    bind(effect: Effect, nodeMaterial: NodeMaterial, mesh?: Mesh, subMesh?: SubMesh): void;
    protected _declareOutput(output: NodeMaterialConnectionPoint, state: NodeMaterialBuildState): string;
    protected _writeVariable(currentPoint: NodeMaterialConnectionPoint): string;
    protected _writeFloat(value: number): string;
    /**
     * Gets the current class name e.g. "NodeMaterialBlock"
     * @returns the class name
     */
    getClassName(): string;
    /** Gets a boolean indicating that this connection will be used in the fragment shader */
    isConnectedInFragmentShader(): boolean;
    /**
     * Register a new input. Must be called inside a block constructor
     * @param name defines the connection point name
     * @param type defines the connection point type
     * @param isOptional defines a boolean indicating that this input can be omitted
     * @param target defines the target to use to limit the connection point (will be VertexAndFragment by default)
     * @param point an already created connection point. If not provided, create a new one
     * @returns the current block
     */
    registerInput(name: string, type: NodeMaterialBlockConnectionPointTypes, isOptional?: boolean, target?: NodeMaterialBlockTargets, point?: NodeMaterialConnectionPoint): this;
    /**
     * Register a new output. Must be called inside a block constructor
     * @param name defines the connection point name
     * @param type defines the connection point type
     * @param target defines the target to use to limit the connection point (will be VertexAndFragment by default)
     * @param point an already created connection point. If not provided, create a new one
     * @returns the current block
     */
    registerOutput(name: string, type: NodeMaterialBlockConnectionPointTypes, target?: NodeMaterialBlockTargets, point?: NodeMaterialConnectionPoint): this;
    /**
     * Will return the first available input e.g. the first one which is not an uniform or an attribute
     * @param forOutput defines an optional connection point to check compatibility with
     * @returns the first available input or null
     */
    getFirstAvailableInput(forOutput?: Nullable<NodeMaterialConnectionPoint>): NodeMaterialConnectionPoint | null;
    /**
     * Will return the first available output e.g. the first one which is not yet connected and not a varying
     * @param forBlock defines an optional block to check compatibility with
     * @returns the first available input or null
     */
    getFirstAvailableOutput(forBlock?: Nullable<NodeMaterialBlock>): NodeMaterialConnectionPoint | null;
    /**
     * Gets the sibling of the given output
     * @param current defines the current output
     * @returns the next output in the list or null
     */
    getSiblingOutput(current: NodeMaterialConnectionPoint): NodeMaterialConnectionPoint | null;
    /**
     * Checks if the current block is an ancestor of a given block
     * @param block defines the potential descendant block to check
     * @returns true if block is a descendant
     */
    isAnAncestorOf(block: NodeMaterialBlock): boolean;
    /**
     * Connect current block with another block
     * @param other defines the block to connect with
     * @param options define the various options to help pick the right connections
     * @param options.input
     * @param options.output
     * @param options.outputSwizzle
     * @returns the current block
     */
    connectTo(other: NodeMaterialBlock, options?: {
        input?: string;
        output?: string;
        outputSwizzle?: string;
    }): this | undefined;
    protected _buildBlock(state: NodeMaterialBuildState): void;
    /**
     * Add uniforms, samplers and uniform buffers at compilation time
     * @param state defines the state to update
     * @param nodeMaterial defines the node material requesting the update
     * @param defines defines the material defines to update
     * @param uniformBuffers defines the list of uniform buffer names
     */
    updateUniformsAndSamples(state: NodeMaterialBuildState, nodeMaterial: NodeMaterial, defines: NodeMaterialDefines, uniformBuffers: string[]): void;
    /**
     * Add potential fallbacks if shader compilation fails
     * @param mesh defines the mesh to be rendered
     * @param fallbacks defines the current prioritized list of fallbacks
     */
    provideFallbacks(mesh: AbstractMesh, fallbacks: EffectFallbacks): void;
    /**
     * Initialize defines for shader compilation
     * @param mesh defines the mesh to be rendered
     * @param nodeMaterial defines the node material requesting the update
     * @param defines defines the material defines to update
     * @param useInstances specifies that instances should be used
     */
    initializeDefines(mesh: AbstractMesh, nodeMaterial: NodeMaterial, defines: NodeMaterialDefines, useInstances?: boolean): void;
    /**
     * Update defines for shader compilation
     * @param mesh defines the mesh to be rendered
     * @param nodeMaterial defines the node material requesting the update
     * @param defines defines the material defines to update
     * @param useInstances specifies that instances should be used
     * @param subMesh defines which submesh to render
     */
    prepareDefines(mesh: AbstractMesh, nodeMaterial: NodeMaterial, defines: NodeMaterialDefines, useInstances?: boolean, subMesh?: SubMesh): void;
    /**
     * Lets the block try to connect some inputs automatically
     * @param material defines the hosting NodeMaterial
     * @param additionalFilteringInfo optional additional filtering condition when looking for compatible blocks
     */
    autoConfigure(material: NodeMaterial, additionalFilteringInfo?: (node: NodeMaterialBlock) => boolean): void;
    /**
     * Function called when a block is declared as repeatable content generator
     * @param vertexShaderState defines the current compilation state for the vertex shader
     * @param fragmentShaderState defines the current compilation state for the fragment shader
     * @param mesh defines the mesh to be rendered
     * @param defines defines the material defines to update
     */
    replaceRepeatableContent(vertexShaderState: NodeMaterialBuildState, fragmentShaderState: NodeMaterialBuildState, mesh: AbstractMesh, defines: NodeMaterialDefines): void;
    /** Gets a boolean indicating that the code of this block will be promoted to vertex shader even if connected to fragment output */
    get willBeGeneratedIntoVertexShaderFromFragmentShader(): boolean;
    /**
     * Checks if the block is ready
     * @param mesh defines the mesh to be rendered
     * @param nodeMaterial defines the node material requesting the update
     * @param defines defines the material defines to update
     * @param useInstances specifies that instances should be used
     * @returns true if the block is ready
     */
    isReady(mesh: AbstractMesh, nodeMaterial: NodeMaterial, defines: NodeMaterialDefines, useInstances?: boolean): boolean;
    protected _linkConnectionTypes(inputIndex0: number, inputIndex1: number, looseCoupling?: boolean): void;
    private _processBuild;
    /**
     * Validates the new name for the block node.
     * @param newName the new name to be given to the node.
     * @returns false if the name is a reserve word, else true.
     */
    validateBlockName(newName: string): boolean;
    protected _customBuildStep(state: NodeMaterialBuildState, activeBlocks: NodeMaterialBlock[]): void;
    /**
     * Compile the current node and generate the shader code
     * @param state defines the current compilation state (uniforms, samplers, current string)
     * @param activeBlocks defines the list of active blocks (i.e. blocks to compile)
     * @returns true if already built
     */
    build(state: NodeMaterialBuildState, activeBlocks: NodeMaterialBlock[]): boolean;
    protected _inputRename(name: string): string;
    protected _outputRename(name: string): string;
    protected _dumpPropertiesCode(): string;
    /**
     * @internal
     */
    _dumpCode(uniqueNames: string[], alreadyDumped: NodeMaterialBlock[]): string;
    /**
     * @internal
     */
    _dumpCodeForOutputConnections(alreadyDumped: NodeMaterialBlock[]): string;
    /**
     * Clone the current block to a new identical block
     * @param scene defines the hosting scene
     * @param rootUrl defines the root URL to use to load textures and relative dependencies
     * @returns a copy of the current block
     */
    clone(scene: Scene, rootUrl?: string): NodeMaterialBlock | null;
    /**
     * Serializes this block in a JSON representation
     * @returns the serialized block object
     */
    serialize(): any;
    /**
     * @internal
     */
    _deserialize(serializationObject: any, scene: Scene, rootUrl: string): void;
    private _deserializePortDisplayNamesAndExposedOnFrame;
    /**
     * Release resources
     */
    dispose(): void;
}
