import { NodeMaterialBlock } from "../../nodeMaterialBlock";
import type { NodeMaterialBuildState } from "../../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../../nodeMaterialBlockConnectionPoint";
import type { Nullable } from "../../../../types";
import { Texture } from "../../../Textures/texture";
import type { Effect } from "../../../effect";
import type { Scene } from "../../../../scene";
/**
 * Block used to provide an image for a TextureBlock
 */
export declare class ImageSourceBlock extends NodeMaterialBlock {
    private _samplerName;
    protected _texture: Nullable<Texture>;
    /**
     * Gets or sets the texture associated with the node
     */
    get texture(): Nullable<Texture>;
    set texture(texture: Nullable<Texture>);
    /**
     * Gets the sampler name associated with this image source
     */
    get samplerName(): string;
    /**
     * Creates a new ImageSourceBlock
     * @param name defines the block name
     */
    constructor(name: string);
    bind(effect: Effect): void;
    isReady(): boolean;
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the output component
     */
    get source(): NodeMaterialConnectionPoint;
    protected _buildBlock(state: NodeMaterialBuildState): this;
    protected _dumpPropertiesCode(): string;
    serialize(): any;
    _deserialize(serializationObject: any, scene: Scene, rootUrl: string): void;
}
