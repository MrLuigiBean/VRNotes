import type { NodeMaterialBuildState } from "../nodeMaterialBuildState";
import { TriPlanarBlock } from "./triPlanarBlock";
/**
 * Block used to read a texture with triplanar mapping (see https://iquilezles.org/articles/biplanar/)
 */
export declare class BiPlanarBlock extends TriPlanarBlock {
    /**
     * Create a new BiPlanarBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    protected _generateTextureLookup(state: NodeMaterialBuildState): void;
}
