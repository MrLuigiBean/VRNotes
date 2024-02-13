import type { NodeMaterialConnectionPoint } from "./nodeMaterialBlockConnectionPoint";
import type { NodeMaterialBlock } from "./nodeMaterialBlock";
import type { InputBlock } from "./Blocks/Input/inputBlock";
import type { Scene } from "../../scene";
import type { Immutable } from "../../types";
import type { NodeMaterial, NodeMaterialTextureBlocks } from "./nodeMaterial";
/**
 * Class used to store shared data between 2 NodeMaterialBuildState
 */
export declare class NodeMaterialBuildStateSharedData {
    /**
     * The node material we are currently building
     */
    nodeMaterial: NodeMaterial;
    /**
     * Gets the list of emitted varyings
     */
    temps: string[];
    /**
     * Gets the list of emitted varyings
     */
    varyings: string[];
    /**
     * Gets the varying declaration string
     */
    varyingDeclaration: string;
    /**
     * List of the fragment output nodes
     */
    fragmentOutputNodes: Immutable<Array<NodeMaterialBlock>>;
    /**
     * Input blocks
     */
    inputBlocks: InputBlock[];
    /**
     * Input blocks
     */
    textureBlocks: NodeMaterialTextureBlocks[];
    /**
     * Bindable blocks (Blocks that need to set data to the effect)
     */
    bindableBlocks: NodeMaterialBlock[];
    /**
     * Bindable blocks (Blocks that need to set data to the effect) that will always be called (by bindForSubMesh), contrary to bindableBlocks that won't be called if _mustRebind() returns false
     */
    forcedBindableBlocks: NodeMaterialBlock[];
    /**
     * List of blocks that can provide a compilation fallback
     */
    blocksWithFallbacks: NodeMaterialBlock[];
    /**
     * List of blocks that can provide a define update
     */
    blocksWithDefines: NodeMaterialBlock[];
    /**
     * List of blocks that can provide a repeatable content
     */
    repeatableContentBlocks: NodeMaterialBlock[];
    /**
     * List of blocks that can provide a dynamic list of uniforms
     */
    dynamicUniformBlocks: NodeMaterialBlock[];
    /**
     * List of blocks that can block the isReady function for the material
     */
    blockingBlocks: NodeMaterialBlock[];
    /**
     * Gets the list of animated inputs
     */
    animatedInputs: InputBlock[];
    /**
     * Build Id used to avoid multiple recompilations
     */
    buildId: number;
    /** List of emitted variables */
    variableNames: {
        [key: string]: number;
    };
    /** List of emitted defines */
    defineNames: {
        [key: string]: number;
    };
    /** Should emit comments? */
    emitComments: boolean;
    /** Emit build activity */
    verbose: boolean;
    /** Gets or sets the hosting scene */
    scene: Scene;
    /**
     * Gets the compilation hints emitted at compilation time
     */
    hints: {
        needWorldViewMatrix: boolean;
        needWorldViewProjectionMatrix: boolean;
        needAlphaBlending: boolean;
        needAlphaTesting: boolean;
    };
    /**
     * List of compilation checks
     */
    checks: {
        emitVertex: boolean;
        emitFragment: boolean;
        notConnectedNonOptionalInputs: NodeMaterialConnectionPoint[];
    };
    /**
     * Is vertex program allowed to be empty?
     */
    allowEmptyVertexProgram: boolean;
    /** Creates a new shared data */
    constructor();
    /**
     * Emits console errors and exceptions if there is a failing check
     */
    emitErrors(): void;
}
