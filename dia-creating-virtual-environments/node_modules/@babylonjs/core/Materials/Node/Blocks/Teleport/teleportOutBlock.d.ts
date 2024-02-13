import type { Nullable } from "../../../../types";
import type { NodeMaterialTeleportInBlock } from "./teleportInBlock";
import { NodeMaterialBlock } from "../../nodeMaterialBlock";
import type { NodeMaterialConnectionPoint } from "../../nodeMaterialBlockConnectionPoint";
import type { Scene } from "../../../../scene";
import { NodeMaterialBlockTargets } from "../../Enums/nodeMaterialBlockTargets";
import type { NodeMaterialBuildState } from "../../nodeMaterialBuildState";
/**
 * Defines a block used to receive a value from a teleport entry point
 */
export declare class NodeMaterialTeleportOutBlock extends NodeMaterialBlock {
    /** @internal */
    _entryPoint: Nullable<NodeMaterialTeleportInBlock>;
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
    get entryPoint(): Nullable<NodeMaterialTeleportInBlock>;
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the output component
     */
    get output(): NodeMaterialConnectionPoint;
    /**
     * Gets or sets the target of the block
     */
    get target(): NodeMaterialBlockTargets;
    set target(value: NodeMaterialBlockTargets);
    /** Detach from entry point */
    detach(): void;
    protected _buildBlock(state: NodeMaterialBuildState): void;
    /**
     * Clone the current block to a new identical block
     * @param scene defines the hosting scene
     * @param rootUrl defines the root URL to use to load textures and relative dependencies
     * @returns a copy of the current block
     */
    clone(scene: Scene, rootUrl?: string): NodeMaterialBlock | null;
    protected _customBuildStep(state: NodeMaterialBuildState, activeBlocks: NodeMaterialBlock[]): void;
    _dumpCode(uniqueNames: string[], alreadyDumped: NodeMaterialBlock[]): string;
    _dumpCodeForOutputConnections(alreadyDumped: NodeMaterialBlock[]): string;
    protected _dumpPropertiesCode(): string;
    /**
     * Serializes this block in a JSON representation
     * @returns the serialized block object
     */
    serialize(): any;
    _deserialize(serializationObject: any, scene: Scene, rootUrl: string): void;
}
