import { NodeMaterialBlock } from "../../nodeMaterialBlock";
import type { NodeMaterialBuildState } from "../../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../../nodeMaterialBlockConnectionPoint";
import type { NodeMaterial, NodeMaterialDefines } from "../../nodeMaterial";
import type { Light } from "../../../../Lights/light";
import type { Nullable } from "../../../../types";
import type { AbstractMesh } from "../../../../Meshes/abstractMesh";
import type { Effect } from "../../../effect";
import type { Mesh } from "../../../../Meshes/mesh";
import type { Scene } from "../../../../scene";
/**
 * Block used to implement the PBR metallic/roughness model
 */
export declare class PBRMetallicRoughnessBlock extends NodeMaterialBlock {
    /**
     * Gets or sets the light associated with this block
     */
    light: Nullable<Light>;
    private static _OnGenerateOnlyFragmentCodeChanged;
    private _setTarget;
    private _lightId;
    private _scene;
    private _environmentBRDFTexture;
    private _environmentBrdfSamplerName;
    private _vNormalWName;
    private _invertNormalName;
    private _metallicReflectanceColor;
    private _metallicF0Factor;
    private _vMetallicReflectanceFactorsName;
    /**
     * Create a new ReflectionBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Intensity of the direct lights e.g. the four lights available in your scene.
     * This impacts both the direct diffuse and specular highlights.
     */
    directIntensity: number;
    /**
     * Intensity of the environment e.g. how much the environment will light the object
     * either through harmonics for rough material or through the reflection for shiny ones.
     */
    environmentIntensity: number;
    /**
     * This is a special control allowing the reduction of the specular highlights coming from the
     * four lights of the scene. Those highlights may not be needed in full environment lighting.
     */
    specularIntensity: number;
    /**
     * Defines the  falloff type used in this material.
     * It by default is Physical.
     */
    lightFalloff: number;
    /**
     * Specifies that alpha test should be used
     */
    useAlphaTest: boolean;
    /**
     * Defines the alpha limits in alpha test mode.
     */
    alphaTestCutoff: number;
    /**
     * Specifies that alpha blending should be used
     */
    useAlphaBlending: boolean;
    /**
     * Specifies that the material will keeps the reflection highlights over a transparent surface (only the most luminous ones).
     * A car glass is a good example of that. When the street lights reflects on it you can not see what is behind.
     */
    useRadianceOverAlpha: boolean;
    /**
     * Specifies that the material will keeps the specular highlights over a transparent surface (only the most luminous ones).
     * A car glass is a good example of that. When sun reflects on it you can not see what is behind.
     */
    useSpecularOverAlpha: boolean;
    /**
     * Enables specular anti aliasing in the PBR shader.
     * It will both interacts on the Geometry for analytical and IBL lighting.
     * It also prefilter the roughness map based on the bump values.
     */
    enableSpecularAntiAliasing: boolean;
    /**
     * Enables realtime filtering on the texture.
     */
    realTimeFiltering: boolean;
    /**
     * Quality switch for realtime filtering
     */
    realTimeFilteringQuality: number;
    /**
     * Defines if the material uses energy conservation.
     */
    useEnergyConservation: boolean;
    /**
     * This parameters will enable/disable radiance occlusion by preventing the radiance to lit
     * too much the area relying on ambient texture to define their ambient occlusion.
     */
    useRadianceOcclusion: boolean;
    /**
     * This parameters will enable/disable Horizon occlusion to prevent normal maps to look shiny when the normal
     * makes the reflect vector face the model (under horizon).
     */
    useHorizonOcclusion: boolean;
    /**
     * If set to true, no lighting calculations will be applied.
     */
    unlit: boolean;
    /**
     * Force normal to face away from face.
     */
    forceNormalForward: boolean;
    /** Indicates that no code should be generated in the vertex shader. Can be useful in some specific circumstances (like when doing ray marching for eg) */
    generateOnlyFragmentCode: boolean;
    /**
     * Defines the material debug mode.
     * It helps seeing only some components of the material while troubleshooting.
     */
    debugMode: number;
    /**
     * Specify from where on screen the debug mode should start.
     * The value goes from -1 (full screen) to 1 (not visible)
     * It helps with side by side comparison against the final render
     * This defaults to 0
     */
    debugLimit: number;
    /**
     * As the default viewing range might not be enough (if the ambient is really small for instance)
     * You can use the factor to better multiply the final value.
     */
    debugFactor: number;
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
     * Gets the world position input component
     */
    get worldPosition(): NodeMaterialConnectionPoint;
    /**
     * Gets the world normal input component
     */
    get worldNormal(): NodeMaterialConnectionPoint;
    /**
     * Gets the view matrix parameter
     */
    get view(): NodeMaterialConnectionPoint;
    /**
     * Gets the camera position input component
     */
    get cameraPosition(): NodeMaterialConnectionPoint;
    /**
     * Gets the perturbed normal input component
     */
    get perturbedNormal(): NodeMaterialConnectionPoint;
    /**
     * Gets the base color input component
     */
    get baseColor(): NodeMaterialConnectionPoint;
    /**
     * Gets the metallic input component
     */
    get metallic(): NodeMaterialConnectionPoint;
    /**
     * Gets the roughness input component
     */
    get roughness(): NodeMaterialConnectionPoint;
    /**
     * Gets the ambient occlusion input component
     */
    get ambientOcc(): NodeMaterialConnectionPoint;
    /**
     * Gets the opacity input component
     */
    get opacity(): NodeMaterialConnectionPoint;
    /**
     * Gets the index of refraction input component
     */
    get indexOfRefraction(): NodeMaterialConnectionPoint;
    /**
     * Gets the ambient color input component
     */
    get ambientColor(): NodeMaterialConnectionPoint;
    /**
     * Gets the reflection object parameters
     */
    get reflection(): NodeMaterialConnectionPoint;
    /**
     * Gets the clear coat object parameters
     */
    get clearcoat(): NodeMaterialConnectionPoint;
    /**
     * Gets the sheen object parameters
     */
    get sheen(): NodeMaterialConnectionPoint;
    /**
     * Gets the sub surface object parameters
     */
    get subsurface(): NodeMaterialConnectionPoint;
    /**
     * Gets the anisotropy object parameters
     */
    get anisotropy(): NodeMaterialConnectionPoint;
    /**
     * Gets the iridescence object parameters
     */
    get iridescence(): NodeMaterialConnectionPoint;
    /**
     * Gets the ambient output component
     */
    get ambientClr(): NodeMaterialConnectionPoint;
    /**
     * Gets the diffuse output component
     */
    get diffuseDir(): NodeMaterialConnectionPoint;
    /**
     * Gets the specular output component
     */
    get specularDir(): NodeMaterialConnectionPoint;
    /**
     * Gets the clear coat output component
     */
    get clearcoatDir(): NodeMaterialConnectionPoint;
    /**
     * Gets the sheen output component
     */
    get sheenDir(): NodeMaterialConnectionPoint;
    /**
     * Gets the indirect diffuse output component
     */
    get diffuseInd(): NodeMaterialConnectionPoint;
    /**
     * Gets the indirect specular output component
     */
    get specularInd(): NodeMaterialConnectionPoint;
    /**
     * Gets the indirect clear coat output component
     */
    get clearcoatInd(): NodeMaterialConnectionPoint;
    /**
     * Gets the indirect sheen output component
     */
    get sheenInd(): NodeMaterialConnectionPoint;
    /**
     * Gets the refraction output component
     */
    get refraction(): NodeMaterialConnectionPoint;
    /**
     * Gets the global lighting output component
     */
    get lighting(): NodeMaterialConnectionPoint;
    /**
     * Gets the shadow output component
     */
    get shadow(): NodeMaterialConnectionPoint;
    /**
     * Gets the alpha output component
     */
    get alpha(): NodeMaterialConnectionPoint;
    autoConfigure(material: NodeMaterial, additionalFilteringInfo?: (node: NodeMaterialBlock) => boolean): void;
    prepareDefines(mesh: AbstractMesh, nodeMaterial: NodeMaterial, defines: NodeMaterialDefines): void;
    updateUniformsAndSamples(state: NodeMaterialBuildState, nodeMaterial: NodeMaterial, defines: NodeMaterialDefines, uniformBuffers: string[]): void;
    isReady(mesh: AbstractMesh, nodeMaterial: NodeMaterial, defines: NodeMaterialDefines): boolean;
    bind(effect: Effect, nodeMaterial: NodeMaterial, mesh?: Mesh): void;
    private _injectVertexCode;
    private _getAlbedoOpacityCode;
    private _getAmbientOcclusionCode;
    private _getReflectivityCode;
    protected _buildBlock(state: NodeMaterialBuildState): this;
    protected _dumpPropertiesCode(): string;
    serialize(): any;
    _deserialize(serializationObject: any, scene: Scene, rootUrl: string): void;
}
