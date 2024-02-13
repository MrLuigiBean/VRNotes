import type { NodeMaterialBlock } from "./nodeMaterialBlock";
import type { NodeMaterialConnectionPointDirection } from "./nodeMaterialBlockConnectionPoint";
import { NodeMaterialConnectionPoint, NodeMaterialConnectionPointCompatibilityStates } from "./nodeMaterialBlockConnectionPoint";
import type { Nullable } from "../../types";
/**
 * Defines a connection point to be used for points with a custom object type
 */
export declare class NodeMaterialConnectionPointCustomObject<T extends NodeMaterialBlock> extends NodeMaterialConnectionPoint {
    _blockType: new (...args: any[]) => T;
    private _blockName;
    /**
     * Creates a new connection point
     * @param name defines the connection point name
     * @param ownerBlock defines the block hosting this connection point
     * @param direction defines the direction of the connection point
     * @param _blockType
     * @param _blockName
     */
    constructor(name: string, ownerBlock: NodeMaterialBlock, direction: NodeMaterialConnectionPointDirection, _blockType: new (...args: any[]) => T, _blockName: string);
    /**
     * Gets a number indicating if the current point can be connected to another point
     * @param connectionPoint defines the other connection point
     * @returns a number defining the compatibility state
     */
    checkCompatibilityState(connectionPoint: NodeMaterialConnectionPoint): NodeMaterialConnectionPointCompatibilityStates;
    /**
     * Creates a block suitable to be used as an input for this input point.
     * If null is returned, a block based on the point type will be created.
     * @returns The returned string parameter is the name of the output point of NodeMaterialBlock (first parameter of the returned array) that can be connected to the input
     */
    createCustomInputBlock(): Nullable<[NodeMaterialBlock, string]>;
}
