import { NodeMaterialBlockConnectionPointTypes } from "./Enums/nodeMaterialBlockConnectionPointTypes";
import { NodeMaterialBlockTargets } from "./Enums/nodeMaterialBlockTargets";
import type { Nullable } from "../../types";
import type { InputBlock } from "./Blocks/Input/inputBlock";
import { Observable } from "../../Misc/observable";
import type { NodeMaterialBlock } from "./nodeMaterialBlock";
/**
 * Enum used to define the compatibility state between two connection points
 */
export declare enum NodeMaterialConnectionPointCompatibilityStates {
    /** Points are compatibles */
    Compatible = 0,
    /** Points are incompatible because of their types */
    TypeIncompatible = 1,
    /** Points are incompatible because of their targets (vertex vs fragment) */
    TargetIncompatible = 2,
    /** Points are incompatible because they are in the same hierarchy **/
    HierarchyIssue = 3
}
/**
 * Defines the direction of a connection point
 */
export declare enum NodeMaterialConnectionPointDirection {
    /** Input */
    Input = 0,
    /** Output */
    Output = 1
}
/**
 * Defines a connection point for a block
 */
export declare class NodeMaterialConnectionPoint {
    /**
     * Checks if two types are equivalent
     * @param type1 type 1 to check
     * @param type2 type 2 to check
     * @returns true if both types are equivalent, else false
     */
    static AreEquivalentTypes(type1: number, type2: number): boolean;
    /** @internal */
    _ownerBlock: NodeMaterialBlock;
    /** @internal */
    _connectedPoint: Nullable<NodeMaterialConnectionPoint>;
    private _endpoints;
    private _associatedVariableName;
    private _direction;
    /** @internal */
    _typeConnectionSource: Nullable<NodeMaterialConnectionPoint>;
    /** @internal */
    _defaultConnectionPointType: Nullable<NodeMaterialBlockConnectionPointTypes>;
    /** @internal */
    _linkedConnectionSource: Nullable<NodeMaterialConnectionPoint>;
    /** @internal */
    _acceptedConnectionPointType: Nullable<NodeMaterialConnectionPoint>;
    private _type;
    /** @internal */
    _enforceAssociatedVariableName: boolean;
    /** Gets the direction of the point */
    get direction(): NodeMaterialConnectionPointDirection;
    /** Indicates that this connection point needs dual validation before being connected to another point */
    needDualDirectionValidation: boolean;
    /**
     * Gets or sets the additional types supported by this connection point
     */
    acceptedConnectionPointTypes: NodeMaterialBlockConnectionPointTypes[];
    /**
     * Gets or sets the additional types excluded by this connection point
     */
    excludedConnectionPointTypes: NodeMaterialBlockConnectionPointTypes[];
    /**
     * Observable triggered when this point is connected
     */
    onConnectionObservable: Observable<NodeMaterialConnectionPoint>;
    /**
     * Gets or sets the associated variable name in the shader
     */
    get associatedVariableName(): string;
    set associatedVariableName(value: string);
    /** Get the inner type (ie AutoDetect for instance instead of the inferred one) */
    get innerType(): NodeMaterialBlockConnectionPointTypes;
    /**
     * Gets or sets the connection point type (default is float)
     */
    get type(): NodeMaterialBlockConnectionPointTypes;
    set type(value: NodeMaterialBlockConnectionPointTypes);
    /**
     * Gets or sets the connection point name
     */
    name: string;
    /**
     * Gets or sets the connection point name
     */
    displayName: string;
    /**
     * Gets or sets a boolean indicating that this connection point can be omitted
     */
    isOptional: boolean;
    /**
     * Gets or sets a boolean indicating that this connection point is exposed on a frame
     */
    isExposedOnFrame: boolean;
    /**
     * Gets or sets number indicating the position that the port is exposed to on a frame
     */
    exposedPortPosition: number;
    /**
     * Gets or sets a string indicating that this uniform must be defined under a #ifdef
     */
    define: string;
    /** @internal */
    _prioritizeVertex: boolean;
    private _target;
    /** Gets or sets the target of that connection point */
    get target(): NodeMaterialBlockTargets;
    set target(value: NodeMaterialBlockTargets);
    /**
     * Gets a boolean indicating that the current point is connected to another NodeMaterialBlock
     */
    get isConnected(): boolean;
    /**
     * Gets a boolean indicating that the current point is connected to an input block
     */
    get isConnectedToInputBlock(): boolean;
    /**
     * Gets a the connected input block (if any)
     */
    get connectInputBlock(): Nullable<InputBlock>;
    /** Get the other side of the connection (if any) */
    get connectedPoint(): Nullable<NodeMaterialConnectionPoint>;
    /** Get the block that owns this connection point */
    get ownerBlock(): NodeMaterialBlock;
    /** Get the block connected on the other side of this connection (if any) */
    get sourceBlock(): Nullable<NodeMaterialBlock>;
    /** Get the block connected on the endpoints of this connection (if any) */
    get connectedBlocks(): Array<NodeMaterialBlock>;
    /** Gets the list of connected endpoints */
    get endpoints(): NodeMaterialConnectionPoint[];
    /** Gets a boolean indicating if that output point is connected to at least one input */
    get hasEndpoints(): boolean;
    /** Gets a boolean indicating that this connection has a path to the vertex output*/
    get isDirectlyConnectedToVertexOutput(): boolean;
    /** Gets a boolean indicating that this connection will be used in the vertex shader */
    get isConnectedInVertexShader(): boolean;
    /** Gets a boolean indicating that this connection will be used in the fragment shader */
    get isConnectedInFragmentShader(): boolean;
    /**
     * Creates a block suitable to be used as an input for this input point.
     * If null is returned, a block based on the point type will be created.
     * @returns The returned string parameter is the name of the output point of NodeMaterialBlock (first parameter of the returned array) that can be connected to the input
     */
    createCustomInputBlock(): Nullable<[NodeMaterialBlock, string]>;
    /**
     * Creates a new connection point
     * @param name defines the connection point name
     * @param ownerBlock defines the block hosting this connection point
     * @param direction defines the direction of the connection point
     */
    constructor(name: string, ownerBlock: NodeMaterialBlock, direction: NodeMaterialConnectionPointDirection);
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
    canConnectTo(connectionPoint: NodeMaterialConnectionPoint): boolean;
    /**
     * Gets a number indicating if the current point can be connected to another point
     * @param connectionPoint defines the other connection point
     * @returns a number defining the compatibility state
     */
    checkCompatibilityState(connectionPoint: NodeMaterialConnectionPoint): NodeMaterialConnectionPointCompatibilityStates;
    /**
     * Connect this point to another connection point
     * @param connectionPoint defines the other connection point
     * @param ignoreConstraints defines if the system will ignore connection type constraints (default is false)
     * @returns the current connection point
     */
    connectTo(connectionPoint: NodeMaterialConnectionPoint, ignoreConstraints?: boolean): NodeMaterialConnectionPoint;
    /**
     * Disconnect this point from one of his endpoint
     * @param endpoint defines the other connection point
     * @returns the current connection point
     */
    disconnectFrom(endpoint: NodeMaterialConnectionPoint): NodeMaterialConnectionPoint;
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
