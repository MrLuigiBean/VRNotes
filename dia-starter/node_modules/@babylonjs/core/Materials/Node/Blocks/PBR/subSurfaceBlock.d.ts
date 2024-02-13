import { NodeMaterialBlock } from "../../nodeMaterialBlock";
import type { NodeMaterialBuildState } from "../../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../../nodeMaterialBlockConnectionPoint";
import type { NodeMaterial, NodeMaterialDefines } from "../../nodeMaterial";
import type { AbstractMesh } from "../../../../Meshes/abstractMesh";
import type { ReflectionBlock } from "./reflectionBlock";
import type { Nullable } from "../../../../types";
/**
 * Block used to implement the sub surface module of the PBR material
 */
export declare class SubSurfaceBlock extends NodeMaterialBlock {
    /**
     * Create a new SubSurfaceBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Initialize the block and prepare the context for build
     * @param state defines the state that will be used for the build
     */
    initialize(state: NodeMaterialBuildState): void;
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the thickness component
     */
    get thickness(): NodeMaterialConnectionPoint;
    /**
     * Gets the tint color input component
     */
    get tintColor(): NodeMaterialConnectionPoint;
    /**
     * Gets the translucency intensity input component
     */
    get translucencyIntensity(): NodeMaterialConnectionPoint;
    /**
     * Gets the translucency diffusion distance input component
     */
    get translucencyDiffusionDist(): NodeMaterialConnectionPoint;
    /**
     * Gets the refraction object parameters
     */
    get refraction(): NodeMaterialConnectionPoint;
    /**
     * Gets the dispersion input component
     */
    get dispersion(): NodeMaterialConnectionPoint;
    /**
     * Gets the sub surface object output component
     */
    get subsurface(): NodeMaterialConnectionPoint;
    autoConfigure(): void;
    prepareDefines(mesh: AbstractMesh, nodeMaterial: NodeMaterial, defines: NodeMaterialDefines): void;
    /**
     * Gets the main code of the block (fragment side)
     * @param state current state of the node material building
     * @param ssBlock instance of a SubSurfaceBlock or null if the code must be generated without an active sub surface module
     * @param reflectionBlock instance of a ReflectionBlock null if the code must be generated without an active reflection module
     * @param worldPosVarName name of the variable holding the world position
     * @returns the shader code
     */
    static GetCode(state: NodeMaterialBuildState, ssBlock: Nullable<SubSurfaceBlock>, reflectionBlock: Nullable<ReflectionBlock>, worldPosVarName: string): string;
    protected _buildBlock(state: NodeMaterialBuildState): this;
}
