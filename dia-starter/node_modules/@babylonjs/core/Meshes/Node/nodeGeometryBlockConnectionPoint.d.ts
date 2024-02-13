import type { Nullable } from "../../types";
import type { NodeGeometryBlock } from "./nodeGeometryBlock";
import { Observable } from "../../Misc/observable";
import { NodeGeometryBlockConnectionPointTypes } from "./Enums/nodeGeometryConnectionPointTypes";
import type { NodeGeometryBuildState } from "./nodeGeometryBuildState";
/**
 * Enum used to define the compatibility state between two connection points
 */
export declare enum NodeGeometryConnectionPointCompatibilityStates {
    /** Points are compatibles */
    Compatible = 0,
    /** Points are incompatible because of their types */
    TypeIncompatible = 1,
    /** Points are incompatible because they are in the same hierarchy **/
    HierarchyIssue = 2
}
/**
 * Defines the direction of a connection point
 */
export declare enum NodeGeometryConnectionPointDirection {
    /** Input */
    Input = 0,
    /** Output */
    Output = 1
}
/**
 * Defines a connection point for a block
 */
export declare class NodeGeometryConnectionPoint {
    /** @internal */
    _ownerBlock: NodeGeometryBlock;
    /** @internal */
    _connectedPoint: Nullable<NodeGeometryConnectionPoint>;
    /** @internal */
    _storedValue: any;
    /** @internal */
    _storedFunction: Nullable<(state: NodeGeometryBuildState) => any>;
    /** @internal */
    _acceptedConnectionPointType: Nullable<NodeGeometryConnectionPoint>;
    private _endpoints;
    private _direction;
    private _type;
    /** @internal */
    _linkedConnectionSource: Nullable<NodeGeometryConnectionPoint>;
    /** @internal */
    _typeConnectionSource: Nullable<NodeGeometryConnectionPoint>;
    /** @internal */
    _defaultConnectionPointType: Nullable<NodeGeometryBlockConnectionPointTypes>;
    /** Gets the direction of the point */
    get direction(): NodeGeometryConnectionPointDirection;
    /**
     * Gets or sets the additional types supported by this connection point
     */
    acceptedConnectionPointTypes: NodeGeometryBlockConnectionPointTypes[];
    /**
     * Gets or sets the additional types excluded by this connection point
     */
    excludedConnectionPointTypes: NodeGeometryBlockConnectionPointTypes[];
    /**
     * Observable triggered when this point is connected
     */
    onConnectionObservable: Observable<NodeGeometryConnectionPoint>;
    /**
     * Gets or sets a boolean indicating that this connection point is exposed on a frame
     */
    isExposedOnFrame: boolean;
    /**
     * Gets or sets number indicating the position that the port is exposed to on a frame
     */
    exposedPortPosition: number;
    /**
     * Gets the default value used for this point at creation time
     */
    defaultValue: Nullable<any>;
    /**
     * Gets or sets the default value used for this point if nothing is connected
     */
    value: Nullable<any>;
    /**
     * Gets or sets the min value accepted for this point if nothing is connected
     */
    valueMin: Nullable<any>;
    /**
     * Gets or sets the max value accepted for this point if nothing is connected
     */
    valueMax: Nullable<any>;
    /**
     * Gets or sets the connection point type (default is float)
     */
    get type(): NodeGeometryBlockConnectionPointTypes;
    set type(value: NodeGeometryBlockConnectionPointTypes);
    /**
     * Gets or sets the connection point name
     */
    name: string;
    /**
     * Gets or sets the connection point display name
     */
    displayName: string;
    /**
     * Gets or sets a boolean indicating that this connection point can be omitted
     */
    isOptional: boolean;
    /**
     * Gets a boolean indicating that the current point is connected to another NodeMaterialBlock
     */
    get isConnected(): boolean;
    /** Get the other side of the connection (if any) */
    get connectedPoint(): Nullable<NodeGeometryConnectionPoint>;
    /** Get the block that owns this connection point */
    get ownerBlock(): NodeGeometryBlock;
    /** Get the block connected on the other side of this connection (if any) */
    get sourceBlock(): Nullable<NodeGeometryBlock>;
    /** Get the block connected on the endpoints of this connection (if any) */
    get connectedBlocks(): Array<NodeGeometryBlock>;
    /** Gets the list of connected endpoints */
    get endpoints(): NodeGeometryConnectionPoint[];
    /** Gets a boolean indicating if that output point is connected to at least one input */
    get hasEndpoints(): boolean;
    /** Get the inner type (ie AutoDetect for instance instead of the inferred one) */
    get innerType(): NodeGeometryBlockConnectionPointTypes;
    /** @internal */
    _callCount: number;
    /** @internal */
    _executionCount: number;
    /** @internal */
    _resetCounters(): void;
    /**
     * Gets the number of times this point was called
     */
    get callCount(): number;
    /**
     * Gets the number of times this point was executed
     */
    get executionCount(): number;
    /**
     * Gets the value represented by this connection point
     * @param state current evaluation state
     * @returns the connected value or the value if nothing is connected
     */
    getConnectedValue(state: NodeGeometryBuildState): any;
    /**
     * Creates a new connection point
     * @param name defines the connection point name
     * @param ownerBlock defines the block hosting this connection point
     * @param direction defines the direction of the connection point
     */
    constructor(name: string, ownerBlock: NodeGeometryBlock, direction: NodeGeometryConnectionPointDirection);
    /**
     * Gets the current class name e.g. "NodeMaterialConnectionPoint"
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets a boolean indicating if the current point can be connected to another point
     * @param connectionPoint defines the other connection point
     * @returns a boolean
     */
    canConnectTo(connectionPoint: NodeGeometryConnectionPoint): boolean;
    /**
     * Gets a number indicating if the current point can be connected to another point
     * @param connectionPoint defines the other connection point
     * @returns a number defining the compatibility state
     */
    checkCompatibilityState(connectionPoint: NodeGeometryConnectionPoint): NodeGeometryConnectionPointCompatibilityStates;
    /**
     * Connect this point to another connection point
     * @param connectionPoint defines the other connection point
     * @param ignoreConstraints defines if the system will ignore connection type constraints (default is false)
     * @returns the current connection point
     */
    connectTo(connectionPoint: NodeGeometryConnectionPoint, ignoreConstraints?: boolean): NodeGeometryConnectionPoint;
    /**
     * Disconnect this point from one of his endpoint
     * @param endpoint defines the other connection point
     * @returns the current connection point
     */
    disconnectFrom(endpoint: NodeGeometryConnectionPoint): NodeGeometryConnectionPoint;
    /**
     * Fill the list of excluded connection point types with all types other than those passed in the parameter
     * @param mask Types (ORed values of NodeMaterialBlockConnectionPointTypes) that are allowed, and thus will not be pushed to the excluded list
     */
    addExcludedConnectionPointFromAllowedTypes(mask: number): void;
    /**
     * Serializes this point in a JSON representation
     * @param isInput defines if the connection point is an input (default is true)
     * @returns the serialized point object
     */
    serialize(isInput?: boolean): any;
    /**
     * Release resources
     */
    dispose(): void;
}
