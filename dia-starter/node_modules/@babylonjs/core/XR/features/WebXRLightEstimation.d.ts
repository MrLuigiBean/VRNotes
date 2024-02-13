import { Observable } from "../../Misc/observable";
import type { Nullable } from "../../types";
import type { WebXRSessionManager } from "../webXRSessionManager";
import { WebXRAbstractFeature } from "./WebXRAbstractFeature";
import { Color3 } from "../../Maths/math.color";
import { Vector3 } from "../../Maths/math.vector";
import { DirectionalLight } from "../../Lights/directionalLight";
import { BaseTexture } from "../../Materials/Textures/baseTexture";
import { SphericalHarmonics } from "../../Maths/sphericalPolynomial";
/**
 * Options for Light Estimation feature
 */
export interface IWebXRLightEstimationOptions {
    /**
     * Disable the cube map reflection feature. In this case only light direction and color will be updated
     */
    disableCubeMapReflection?: boolean;
    /**
     * Should the scene's env texture be set to the cube map reflection texture
     * Note that this doesn't work is disableCubeMapReflection if set to false
     */
    setSceneEnvironmentTexture?: boolean;
    /**
     * How often should the cubemap update in ms.
     * If not set the cubemap will be updated every time the underlying system updates the environment texture.
     */
    cubeMapPollInterval?: number;
    /**
     * How often should the light estimation properties update in ms.
     * If not set the light estimation properties will be updated on every frame (depending on the underlying system)
     */
    lightEstimationPollInterval?: number;
    /**
     * Should a directional light source be created.
     * If created, this light source will be updated whenever the light estimation values change
     */
    createDirectionalLightSource?: boolean;
    /**
     * Define the format to be used for the light estimation texture.
     */
    reflectionFormat?: XRReflectionFormat;
    /**
     * Should the light estimation's needed vectors be constructed on each frame.
     * Use this when you use those vectors and don't want their values to change outside of the light estimation feature
     */
    disableVectorReuse?: boolean;
    /**
     * disable applying the spherical polynomial to the cube map texture
     */
    disableSphericalPolynomial?: boolean;
    /**
     * disable prefiltering the cube map texture
     */
    disablePreFiltering?: boolean;
}
/**
 * An interface describing the result of a light estimation
 */
export interface IWebXRLightEstimation {
    /**
     * The intensity of the light source
     */
    lightIntensity: number;
    /**
     * Color of light source
     */
    lightColor: Color3;
    /**
     * The direction from the light source
     */
    lightDirection: Vector3;
    /**
     * Spherical harmonics coefficients of the light source
     */
    sphericalHarmonics: SphericalHarmonics;
}
/**
 * Light Estimation Feature
 *
 * @since 5.0.0
 */
export declare class WebXRLightEstimation extends WebXRAbstractFeature {
    /**
     * options to use when constructing this feature
     */
    readonly options: IWebXRLightEstimationOptions;
    private _canvasContext;
    private _reflectionCubeMap;
    private _xrLightEstimate;
    private _xrLightProbe;
    private _xrWebGLBinding;
    private _lightDirection;
    private _lightColor;
    private _intensity;
    private _sphericalHarmonics;
    private _cubeMapPollTime;
    private _lightEstimationPollTime;
    /**
     * The module's name
     */
    static readonly Name = "xr-light-estimation";
    /**
     * The (Babylon) version of this module.
     * This is an integer representing the implementation version.
     * This number does not correspond to the WebXR specs version
     */
    static readonly Version = 1;
    /**
     * ARCore's reflection cube map size is 16x16.
     * Once other systems support this feature we will need to change this to be dynamic.
     * see https://github.com/immersive-web/lighting-estimation/blob/main/lighting-estimation-explainer.md#cube-map-open-questions
     */
    private _reflectionCubeMapTextureSize;
    private _hdrFilter;
    /**
     * If createDirectionalLightSource is set to true this light source will be created automatically.
     * Otherwise this can be set with an external directional light source.
     * This light will be updated whenever the light estimation values change.
     */
    directionalLight: Nullable<DirectionalLight>;
    /**
     * This observable will notify when the reflection cube map is updated.
     */
    onReflectionCubeMapUpdatedObservable: Observable<BaseTexture>;
    /**
     * Creates a new instance of the light estimation feature
     * @param _xrSessionManager an instance of WebXRSessionManager
     * @param options options to use when constructing this feature
     */
    constructor(_xrSessionManager: WebXRSessionManager, 
    /**
     * options to use when constructing this feature
     */
    options: IWebXRLightEstimationOptions);
    /**
     * While the estimated cube map is expected to update over time to better reflect the user's environment as they move around those changes are unlikely to happen with every XRFrame.
     * Since creating and processing the cube map is potentially expensive, especially if mip maps are needed, you can listen to the onReflectionCubeMapUpdatedObservable to determine
     * when it has been updated.
     */
    get reflectionCubeMapTexture(): Nullable<BaseTexture>;
    /**
     * The most recent light estimate.  Available starting on the first frame where the device provides a light probe.
     */
    get xrLightingEstimate(): Nullable<IWebXRLightEstimation>;
    private _getCanvasContext;
    private _getXRGLBinding;
    /**
     * Event Listener for "reflectionchange" events.
     */
    private _updateReflectionCubeMap;
    /**
     * attach this feature
     * Will usually be called by the features manager
     *
     * @returns true if successful.
     */
    attach(): boolean;
    /**
     * detach this feature.
     * Will usually be called by the features manager
     *
     * @returns true if successful.
     */
    detach(): boolean;
    /**
     * Dispose this feature and all of the resources attached
     */
    dispose(): void;
    protected _onXRFrame(_xrFrame: XRFrame): void;
}
