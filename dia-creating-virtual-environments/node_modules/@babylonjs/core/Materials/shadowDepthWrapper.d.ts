import type { Nullable } from "../types";
import type { Scene } from "../scene";
import type { SubMesh } from "../Meshes/subMesh";
import type { Material } from "./material";
import type { ShadowGenerator } from "../Lights/Shadows/shadowGenerator";
import { DrawWrapper } from "./drawWrapper";
/**
 * Options to be used when creating a shadow depth material
 */
export interface IIOptionShadowDepthMaterial {
    /** Variables in the vertex shader code that need to have their names remapped.
     * The format is: ["var_name", "var_remapped_name", "var_name", "var_remapped_name", ...]
     * "var_name" should be either: worldPos or vNormalW
     * So, if the variable holding the world position in your vertex shader is not named worldPos, you must tell the system
     * the name to use instead by using: ["worldPos", "myWorldPosVar"] assuming the variable is named myWorldPosVar in your code.
     * If the normal must also be remapped: ["worldPos", "myWorldPosVar", "vNormalW", "myWorldNormal"]
     */
    remappedVariables?: string[];
    /** Set standalone to true if the base material wrapped by ShadowDepthMaterial is not used for a regular object but for depth shadow generation only */
    standalone?: boolean;
    /** Set doNotInjectCode if the specific shadow map generation code is already implemented by the material. That will prevent this code to be injected twice by ShadowDepthWrapper */
    doNotInjectCode?: boolean;
}
/**
 * Class that can be used to wrap a base material to generate accurate shadows when using custom vertex/fragment code in the base material
 */
export declare class ShadowDepthWrapper {
    private _scene;
    private _options?;
    private _baseMaterial;
    private _onEffectCreatedObserver;
    private _subMeshToEffect;
    private _subMeshToDepthWrapper;
    private _meshes;
    /** Gets the standalone status of the wrapper */
    get standalone(): boolean;
    /** Gets the base material the wrapper is built upon */
    get baseMaterial(): Material;
    /** Gets the doNotInjectCode status of the wrapper */
    get doNotInjectCode(): boolean;
    /**
     * Instantiate a new shadow depth wrapper.
     * It works by injecting some specific code in the vertex/fragment shaders of the base material and is used by a shadow generator to
     * generate the shadow depth map. For more information, please refer to the documentation:
     * https://doc.babylonjs.com/features/featuresDeepDive/lights/shadows
     * @param baseMaterial Material to wrap
     * @param scene Define the scene the material belongs to
     * @param options Options used to create the wrapper
     */
    constructor(baseMaterial: Material, scene?: Scene, options?: IIOptionShadowDepthMaterial);
    private _deleteDepthWrapperEffect;
    /**
     * Gets the effect to use to generate the depth map
     * @param subMesh subMesh to get the effect for
     * @param shadowGenerator shadow generator to get the effect for
     * @param passIdForDrawWrapper Id of the pass for which the effect from the draw wrapper must be retrieved from
     * @returns the effect to use to generate the depth map for the subMesh + shadow generator specified
     */
    getEffect(subMesh: Nullable<SubMesh>, shadowGenerator: ShadowGenerator, passIdForDrawWrapper: number): Nullable<DrawWrapper>;
    /**
     * Specifies that the submesh is ready to be used for depth rendering
     * @param subMesh submesh to check
     * @param defines the list of defines to take into account when checking the effect
     * @param shadowGenerator combined with subMesh, it defines the effect to check
     * @param useInstances specifies that instances should be used
     * @param passIdForDrawWrapper Id of the pass for which the draw wrapper should be created
     * @returns a boolean indicating that the submesh is ready or not
     */
    isReadyForSubMesh(subMesh: SubMesh, defines: string[], shadowGenerator: ShadowGenerator, useInstances: boolean, passIdForDrawWrapper: number): boolean;
    /**
     * Disposes the resources
     */
    dispose(): void;
    private _makeEffect;
}
