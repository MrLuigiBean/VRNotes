import type { Scene } from "../scene";
import { Color3 } from "../Maths/math.color";
import { SubSurfaceScatteringPostProcess } from "../PostProcesses/subSurfaceScatteringPostProcess";
import type { PrePassEffectConfiguration } from "./prePassEffectConfiguration";
/**
 * Contains all parameters needed for the prepass to perform
 * screen space subsurface scattering
 */
export declare class SubSurfaceConfiguration implements PrePassEffectConfiguration {
    /**
     * @internal
     */
    static _SceneComponentInitialization: (scene: Scene) => void;
    private _ssDiffusionS;
    private _ssFilterRadii;
    private _ssDiffusionD;
    /**
     * Post process to attach for screen space subsurface scattering
     */
    postProcess: SubSurfaceScatteringPostProcess;
    /**
     * Diffusion profile color for subsurface scattering
     */
    get ssDiffusionS(): number[];
    /**
     * Diffusion profile max color channel value for subsurface scattering
     */
    get ssDiffusionD(): number[];
    /**
     * Diffusion profile filter radius for subsurface scattering
     */
    get ssFilterRadii(): number[];
    /**
     * Is subsurface enabled
     */
    enabled: boolean;
    /**
     * Does the output of this prepass need to go through imageprocessing
     */
    needsImageProcessing: boolean;
    /**
     * Name of the configuration
     */
    name: string;
    /**
     * Diffusion profile colors for subsurface scattering
     * You can add one diffusion color using `addDiffusionProfile` on `scene.prePassRenderer`
     * See ...
     * Note that you can only store up to 5 of them
     */
    ssDiffusionProfileColors: Color3[];
    /**
     * Defines the ratio real world => scene units.
     * Used for subsurface scattering
     */
    metersPerUnit: number;
    /**
     * Textures that should be present in the MRT for this effect to work
     */
    readonly texturesRequired: number[];
    private _scene;
    /**
     * Builds a subsurface configuration object
     * @param scene The scene
     */
    constructor(scene: Scene);
    /**
     * Adds a new diffusion profile.
     * Useful for more realistic subsurface scattering on diverse materials.
     * @param color The color of the diffusion profile. Should be the average color of the material.
     * @returns The index of the diffusion profile for the material subsurface configuration
     */
    addDiffusionProfile(color: Color3): number;
    /**
     * Creates the sss post process
     * @returns The created post process
     */
    createPostProcess(): SubSurfaceScatteringPostProcess;
    /**
     * Deletes all diffusion profiles.
     * Note that in order to render subsurface scattering, you should have at least 1 diffusion profile.
     */
    clearAllDiffusionProfiles(): void;
    /**
     * Disposes this object
     */
    dispose(): void;
    /**
     * @internal
     * https://zero-radiance.github.io/post/sampling-diffusion/
     *
     * Importance sample the normalized diffuse reflectance profile for the computed value of 's'.
     * ------------------------------------------------------------------------------------
     * R[r, phi, s]   = s * (Exp[-r * s] + Exp[-r * s / 3]) / (8 * Pi * r)
     * PDF[r, phi, s] = r * R[r, phi, s]
     * CDF[r, s]      = 1 - 1/4 * Exp[-r * s] - 3/4 * Exp[-r * s / 3]
     * ------------------------------------------------------------------------------------
     * We importance sample the color channel with the widest scattering distance.
     */
    getDiffusionProfileParameters(color: Color3): number;
    /**
     * Performs sampling of a Normalized Burley diffusion profile in polar coordinates.
     * 'u' is the random number (the value of the CDF): [0, 1).
     * rcp(s) = 1 / ShapeParam = ScatteringDistance.
     * Returns the sampled radial distance, s.t. (u = 0 -> r = 0) and (u = 1 -> r = Inf).
     * @param u
     * @param rcpS
     */
    private _sampleBurleyDiffusionProfile;
}
