import { NodeMaterialBlock } from "../../nodeMaterialBlock";
import type { NodeMaterialBuildState } from "../../nodeMaterialBuildState";
import { NodeMaterialBlockTargets } from "../../Enums/nodeMaterialBlockTargets";
import type { NodeMaterialConnectionPoint } from "../../nodeMaterialBlockConnectionPoint";
import type { Scene } from "../../../../scene";
import type { Effect } from "../../../effect";
import type { NodeMaterial } from "../../nodeMaterial";
/**
 * Block used to retrieve the depth (zbuffer) of the scene
 * @since 5.0.0
 */
export declare class SceneDepthBlock extends NodeMaterialBlock {
    private _samplerName;
    private _mainUVName;
    private _tempTextureRead;
    /**
     * Defines if the depth renderer should be setup in non linear mode
     */
    useNonLinearDepth: boolean;
    /**
     * Defines if the depth renderer should be setup in camera space Z mode (if set, useNonLinearDepth has no effect)
     */
    storeCameraSpaceZ: boolean;
    /**
     * Defines if the depth renderer should be setup in full 32 bits float mode
     */
    force32itsFloat: boolean;
    /**
     * Create a new SceneDepthBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the uv input component
     */
    get uv(): NodeMaterialConnectionPoint;
    /**
     * Gets the depth output component
     */
    get depth(): NodeMaterialConnectionPoint;
    /**
     * Initialize the block and prepare the context for build
     * @param state defines the state that will be used for the build
     */
    initialize(state: NodeMaterialBuildState): void;
    get target(): NodeMaterialBlockTargets.Fragment | NodeMaterialBlockTargets.VertexAndFragment;
    private _getTexture;
    bind(effect: Effect, nodeMaterial: NodeMaterial): void;
    private _injectVertexCode;
    private _writeTextureRead;
    private _writeOutput;
    protected _buildBlock(state: NodeMaterialBuildState): this | undefined;
    serialize(): any;
    _deserialize(serializationObject: any, scene: Scene, rootUrl: string): void;
}
