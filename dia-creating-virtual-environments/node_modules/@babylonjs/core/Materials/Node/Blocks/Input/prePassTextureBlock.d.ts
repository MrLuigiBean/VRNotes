import { NodeMaterialBlock } from "../../nodeMaterialBlock";
import type { Effect } from "../../../../Materials/effect";
import type { NodeMaterialConnectionPoint } from "../../nodeMaterialBlockConnectionPoint";
import type { NodeMaterialBuildState } from "../../nodeMaterialBuildState";
import { NodeMaterialBlockTargets } from "../../Enums/nodeMaterialBlockTargets";
import type { NodeMaterial } from "../../nodeMaterial";
/**
 * Block used to read from prepass textures
 */
export declare class PrePassTextureBlock extends NodeMaterialBlock {
    private _positionSamplerName;
    private _depthSamplerName;
    private _normalSamplerName;
    /**
     * The texture associated with the node is the prepass texture
     */
    get texture(): any;
    set texture(value: any);
    /**
     * Creates a new PrePassTextureBlock
     * @param name defines the block name
     * @param target defines the target of that block (VertexAndFragment by default)
     */
    constructor(name: string, target?: NodeMaterialBlockTargets);
    /**
     * Returns the sampler name associated with the node connection point
     * @param output defines the connection point to get the associated sampler name
     * @returns
     */
    getSamplerName(output: NodeMaterialConnectionPoint): string;
    /**
     * Gets the position texture
     */
    get position(): NodeMaterialConnectionPoint;
    /**
     * Gets the depth texture
     */
    get depth(): NodeMaterialConnectionPoint;
    /**
     * Gets the normal texture
     */
    get normal(): NodeMaterialConnectionPoint;
    /**
     * Gets the sampler name associated with this image source
     */
    get positionSamplerName(): string;
    /**
     * Gets the sampler name associated with this image source
     */
    get normalSamplerName(): string;
    /**
     * Gets the sampler name associated with this image source
     */
    get depthSamplerName(): string;
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    protected _buildBlock(state: NodeMaterialBuildState): this | undefined;
    bind(effect: Effect, nodeMaterial: NodeMaterial): void;
}
