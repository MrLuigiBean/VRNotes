import type { NodeGeometryBlockConnectionPointTypes } from "./Enums/nodeGeometryConnectionPointTypes";
import { NodeGeometryConnectionPoint } from "./nodeGeometryBlockConnectionPoint";
import type { NodeGeometryBuildState } from "./nodeGeometryBuildState";
import { Observable } from "../../Misc/observable";
import type { Nullable } from "../../types";
/**
 * Defines a block that can be used inside a node based geometry
 */
export declare class NodeGeometryBlock {
    private _name;
    private _buildId;
    protected _isInput: boolean;
    protected _isTeleportOut: boolean;
    protected _isTeleportIn: boolean;
    protected _isDebug: boolean;
    protected _isUnique: boolean;
    private _buildExecutionTime;
    /**
     * Gets an observable raised when the block is built
     */
    onBuildObservable: Observable<NodeGeometryBlock>;
    /** @internal */
    _inputs: NodeGeometryConnectionPoint[];
    /** @internal */
    _outputs: NodeGeometryConnectionPoint[];
    /** @internal */
    _preparationId: number;
    /** @internal */
    _codeVariableName: string;
    /**
     * Gets the time spent to build this block (in ms)
     */
    get buildExecutionTime(): number;
    /**
     * Gets the list of input points
     */
    get inputs(): NodeGeometryConnectionPoint[];
    /** Gets the list of output points */
    get outputs(): NodeGeometryConnectionPoint[];
    /**
     * Gets or sets the unique id of the node
     */
    uniqueId: number;
    /**
     * Gets or set the name of the block
     */
    get name(): string;
    set name(value: string);
    /**
     * Gets a boolean indicating if this block is an input
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
     * Gets a boolean indicating if this block is a debug block
     */
    get isDebug(): boolean;
    /**
     * Gets a boolean indicating that this block can only be used once per NodeGeometry
     */
    get isUnique(): boolean;
    /**
     * A free comment about the block
     */
    comments: string;
    /** Gets or sets a boolean indicating that this input can be edited from a collapsed frame */
    visibleOnFrame: boolean;
    /**
     * Gets the current class name e.g. "NodeGeometryBlock"
     * @returns the class name
     */
    getClassName(): string;
    protected _inputRename(name: string): string;
    protected _outputRename(name: string): string;
    /**
     * Checks if the current block is an ancestor of a given block
     * @param block defines the potential descendant block to check
     * @returns true if block is a descendant
     */
    isAnAncestorOf(block: NodeGeometryBlock): boolean;
    /**
     * Checks if the current block is an ancestor of a given type
     * @param type defines the potential type to check
     * @returns true if block is a descendant
     */
    isAnAncestorOfType(type: string): boolean;
    /**
     * Get the first descendant using a predicate
     * @param predicate defines the predicate to check
     * @returns descendant or null if none found
     */
    getDescendantOfPredicate(predicate: (block: NodeGeometryBlock) => boolean): Nullable<NodeGeometryBlock>;
    /**
     * Creates a new NodeGeometryBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Register a new input. Must be called inside a block constructor
     * @param name defines the connection point name
     * @param type defines the connection point type
     * @param isOptional defines a boolean indicating that this input can be omitted
     * @param value value to return if there is no connection
     * @param valueMin min value accepted for value
     * @param valueMax max value accepted for value
     * @returns the current block
     */
    registerInput(name: string, type: NodeGeometryBlockConnectionPointTypes, isOptional?: boolean, value?: any, valueMin?: any, valueMax?: any): this;
    /**
     * Register a new output. Must be called inside a block constructor
     * @param name defines the connection point name
     * @param type defines the connection point type
     * @param point an already created connection point. If not provided, create a new one
     * @returns the current block
     */
    registerOutput(name: string, type: NodeGeometryBlockConnectionPointTypes, point?: NodeGeometryConnectionPoint): this;
    protected _buildBlock(state: NodeGeometryBuildState): void;
    protected _customBuildStep(state: NodeGeometryBuildState): void;
    /**
     * Build the current node and generate the vertex data
     * @param state defines the current generation state
     * @returns true if already built
     */
    build(state: NodeGeometryBuildState): boolean;
    protected _linkConnectionTypes(inputIndex0: number, inputIndex1: number, looseCoupling?: boolean): void;
    /**
     * Initialize the block and prepare the context for build
     */
    initialize(): void;
    /**
     * Lets the block try to connect some inputs automatically
     */
    autoConfigure(): void;
    /**
     * Find an input by its name
     * @param name defines the name of the input to look for
     * @returns the input or null if not found
     */
    getInputByName(name: string): NodeGeometryConnectionPoint | null;
    /**
     * Find an output by its name
     * @param name defines the name of the output to look for
     * @returns the output or null if not found
     */
    getOutputByName(name: string): NodeGeometryConnectionPoint | null;
    /**
     * Serializes this block in a JSON representation
     * @returns the serialized block object
     */
    serialize(): any;
    /**
     * @internal
     */
    _deserialize(serializationObject: any): void;
    private _deserializePortDisplayNamesAndExposedOnFrame;
    protected _dumpPropertiesCode(): string;
    /**
     * @internal
     */
    _dumpCodeForOutputConnections(alreadyDumped: NodeGeometryBlock[]): string;
    /**
     * @internal
     */
    _dumpCode(uniqueNames: string[], alreadyDumped: NodeGeometryBlock[]): string;
    /**
     * Clone the current block to a new identical block
     * @returns a copy of the current block
     */
    clone(): NodeGeometryBlock | null;
    /**
     * Release resources
     */
    dispose(): void;
}
