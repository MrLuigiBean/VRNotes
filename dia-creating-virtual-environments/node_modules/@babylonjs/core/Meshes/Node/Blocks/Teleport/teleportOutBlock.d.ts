import type { Nullable } from "../../../../types";
import { NodeGeometryBlock } from "../../nodeGeometryBlock";
import type { NodeGeometryConnectionPoint } from "../../nodeGeometryBlockConnectionPoint";
import type { TeleportInBlock } from "./teleportInBlock";
import type { NodeGeometryBuildState } from "../../nodeGeometryBuildState";
/**
 * Defines a block used to receive a value from a teleport entry point
 */
export declare class TeleportOutBlock extends NodeGeometryBlock {
    /** @internal */
    _entryPoint: Nullable<TeleportInBlock>;
    /** @internal */
    _tempEntryPointUniqueId: Nullable<number>;
    /**
     * Create a new TeleportOutBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the entry point
     */
    get entryPoint(): Nullable<TeleportInBlock>;
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the output component
     */
    get output(): NodeGeometryConnectionPoint;
    /** Detach from entry point */
    detach(): void;
    protected _buildBlock(): void;
    protected _customBuildStep(state: NodeGeometryBuildState): void;
    _dumpCode(uniqueNames: string[], alreadyDumped: NodeGeometryBlock[]): string;
    _dumpCodeForOutputConnections(alreadyDumped: NodeGeometryBlock[]): string;
    /**
     * Clone the current block to a new identical block
     * @returns a copy of the current block
     */
    clone(): NodeGeometryBlock | null;
    protected _dumpPropertiesCode(): string;
    /**
     * Serializes this block in a JSON representation
     * @returns the serialized block object
     */
    serialize(): any;
    _deserialize(serializationObject: any): void;
}
