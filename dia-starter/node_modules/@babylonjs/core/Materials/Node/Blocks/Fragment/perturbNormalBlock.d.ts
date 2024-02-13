import { NodeMaterialBlock } from "../../nodeMaterialBlock";
import type { NodeMaterialBuildState } from "../../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../../nodeMaterialBlockConnectionPoint";
import type { NodeMaterial, NodeMaterialDefines } from "../../nodeMaterial";
import type { AbstractMesh } from "../../../../Meshes/abstractMesh";
import type { Mesh } from "../../../../Meshes/mesh";
import type { Effect } from "../../../effect";
import type { Scene } from "../../../../scene";
import "../../../../Shaders/ShadersInclude/bumpFragmentMainFunctions";
import "../../../../Shaders/ShadersInclude/bumpFragmentFunctions";
import "../../../../Shaders/ShadersInclude/bumpFragment";
/**
 * Block used to perturb normals based on a normal map
 */
export declare class PerturbNormalBlock extends NodeMaterialBlock {
    private _tangentSpaceParameterName;
    private _tangentCorrectionFactorName;
    private _worldMatrixName;
    /** Gets or sets a boolean indicating that normal should be inverted on X axis */
    invertX: boolean;
    /** Gets or sets a boolean indicating that normal should be inverted on Y axis */
    invertY: boolean;
    /** Gets or sets a boolean indicating that parallax occlusion should be enabled */
    useParallaxOcclusion: boolean;
    /** Gets or sets a boolean indicating that sampling mode is in Object space */
    useObjectSpaceNormalMap: boolean;
    /**
     * Create a new PerturbNormalBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the world position input component
     */
    get worldPosition(): NodeMaterialConnectionPoint;
    /**
     * Gets the world normal input component
     */
    get worldNormal(): NodeMaterialConnectionPoint;
    /**
     * Gets the world tangent input component
     */
    get worldTangent(): NodeMaterialConnectionPoint;
    /**
     * Gets the uv input component
     */
    get uv(): NodeMaterialConnectionPoint;
    /**
     * Gets the normal map color input component
     */
    get normalMapColor(): NodeMaterialConnectionPoint;
    /**
     * Gets the strength input component
     */
    get strength(): NodeMaterialConnectionPoint;
    /**
     * Gets the view direction input component
     */
    get viewDirection(): NodeMaterialConnectionPoint;
    /**
     * Gets the parallax scale input component
     */
    get parallaxScale(): NodeMaterialConnectionPoint;
    /**
     * Gets the parallax height input component
     */
    get parallaxHeight(): NodeMaterialConnectionPoint;
    /**
     * Gets the TBN input component
     */
    get TBN(): NodeMaterialConnectionPoint;
    /**
     * Gets the World input component
     */
    get world(): NodeMaterialConnectionPoint;
    /**
     * Gets the output component
     */
    get output(): NodeMaterialConnectionPoint;
    /**
     * Gets the uv offset output component
     */
    get uvOffset(): NodeMaterialConnectionPoint;
    prepareDefines(mesh: AbstractMesh, nodeMaterial: NodeMaterial, defines: NodeMaterialDefines): void;
    bind(effect: Effect, nodeMaterial: NodeMaterial, mesh?: Mesh): void;
    autoConfigure(material: NodeMaterial, additionalFilteringInfo?: (node: NodeMaterialBlock) => boolean): void;
    protected _buildBlock(state: NodeMaterialBuildState): this;
    protected _dumpPropertiesCode(): string;
    serialize(): any;
    _deserialize(serializationObject: any, scene: Scene, rootUrl: string): void;
}
