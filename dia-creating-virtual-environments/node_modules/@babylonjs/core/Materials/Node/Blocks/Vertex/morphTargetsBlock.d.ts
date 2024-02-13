import { NodeMaterialBlock } from "../../nodeMaterialBlock";
import type { NodeMaterialBuildState } from "../../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../../nodeMaterialBlockConnectionPoint";
import type { AbstractMesh } from "../../../../Meshes/abstractMesh";
import type { NodeMaterial, NodeMaterialDefines } from "../../nodeMaterial";
import type { Effect } from "../../../effect";
import type { Mesh } from "../../../../Meshes/mesh";
import "../../../../Shaders/ShadersInclude/morphTargetsVertexDeclaration";
import "../../../../Shaders/ShadersInclude/morphTargetsVertexGlobalDeclaration";
/**
 * Block used to add morph targets support to vertex shader
 */
export declare class MorphTargetsBlock extends NodeMaterialBlock {
    private _repeatableContentAnchor;
    /**
     * Create a new MorphTargetsBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the position input component
     */
    get position(): NodeMaterialConnectionPoint;
    /**
     * Gets the normal input component
     */
    get normal(): NodeMaterialConnectionPoint;
    /**
     * Gets the tangent input component
     */
    get tangent(): NodeMaterialConnectionPoint;
    /**
     * Gets the tangent input component
     */
    get uv(): NodeMaterialConnectionPoint;
    /**
     * Gets the position output component
     */
    get positionOutput(): NodeMaterialConnectionPoint;
    /**
     * Gets the normal output component
     */
    get normalOutput(): NodeMaterialConnectionPoint;
    /**
     * Gets the tangent output component
     */
    get tangentOutput(): NodeMaterialConnectionPoint;
    /**
     * Gets the tangent output component
     */
    get uvOutput(): NodeMaterialConnectionPoint;
    initialize(state: NodeMaterialBuildState): void;
    autoConfigure(material: NodeMaterial, additionalFilteringInfo?: (node: NodeMaterialBlock) => boolean): void;
    prepareDefines(mesh: AbstractMesh, nodeMaterial: NodeMaterial, defines: NodeMaterialDefines): void;
    bind(effect: Effect, nodeMaterial: NodeMaterial, mesh?: Mesh): void;
    replaceRepeatableContent(vertexShaderState: NodeMaterialBuildState, fragmentShaderState: NodeMaterialBuildState, mesh: AbstractMesh, defines: NodeMaterialDefines): void;
    protected _buildBlock(state: NodeMaterialBuildState): this;
}
