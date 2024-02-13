import { NodeMaterialBlock } from "../../nodeMaterialBlock";
import type { NodeMaterialBuildState } from "../../nodeMaterialBuildState";
import { NodeMaterialBlockTargets } from "../../Enums/nodeMaterialBlockTargets";
import type { NodeMaterialConnectionPoint } from "../../nodeMaterialBlockConnectionPoint";
import type { AbstractMesh } from "../../../../Meshes/abstractMesh";
import type { NodeMaterialDefines } from "../../nodeMaterial";
import type { BaseTexture } from "../../../Textures/baseTexture";
import type { Nullable } from "../../../../types";
import type { Scene } from "../../../../scene";
import type { NodeMaterial } from "../../nodeMaterial";
/**
 * Base block used as input for post process
 */
export declare class CurrentScreenBlock extends NodeMaterialBlock {
    private _samplerName;
    private _linearDefineName;
    private _gammaDefineName;
    private _mainUVName;
    private _tempTextureRead;
    /**
     * Gets or sets the texture associated with the node
     */
    texture: Nullable<BaseTexture>;
    /**
     * Gets or sets a boolean indicating if content needs to be converted to gamma space
     */
    convertToGammaSpace: boolean;
    /**
     * Gets or sets a boolean indicating if content needs to be converted to linear space
     */
    convertToLinearSpace: boolean;
    /**
     * Create a new CurrentScreenBlock
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
     * Gets the rgba output component
     */
    get rgba(): NodeMaterialConnectionPoint;
    /**
     * Gets the rgb output component
     */
    get rgb(): NodeMaterialConnectionPoint;
    /**
     * Gets the r output component
     */
    get r(): NodeMaterialConnectionPoint;
    /**
     * Gets the g output component
     */
    get g(): NodeMaterialConnectionPoint;
    /**
     * Gets the b output component
     */
    get b(): NodeMaterialConnectionPoint;
    /**
     * Gets the a output component
     */
    get a(): NodeMaterialConnectionPoint;
    /**
     * Initialize the block and prepare the context for build
     * @param state defines the state that will be used for the build
     */
    initialize(state: NodeMaterialBuildState): void;
    get target(): NodeMaterialBlockTargets.Fragment | NodeMaterialBlockTargets.VertexAndFragment;
    prepareDefines(mesh: AbstractMesh, nodeMaterial: NodeMaterial, defines: NodeMaterialDefines): void;
    isReady(): boolean;
    private _injectVertexCode;
    private _writeTextureRead;
    private _writeOutput;
    protected _buildBlock(state: NodeMaterialBuildState): this | undefined;
    serialize(): any;
    _deserialize(serializationObject: any, scene: Scene, rootUrl: string): void;
}
