import type { Camera } from "../../../Cameras/camera";
import { PostProcessRenderPipeline } from "../postProcessRenderPipeline";
import type { Scene } from "../../../scene";
import type { Nullable } from "../../../types";
import type { CubeTexture } from "../../../Materials/Textures/cubeTexture";
import { DepthRenderer } from "../../../Rendering/depthRenderer";
import "../postProcessRenderPipelineManagerSceneComponent";
import "../../../Shaders/screenSpaceReflection2.fragment";
import "../../../Shaders/screenSpaceReflection2Blur.fragment";
import "../../../Shaders/screenSpaceReflection2BlurCombiner.fragment";
/**
 * Render pipeline to produce Screen Space Reflections (SSR) effect
 *
 * References:
 *   Screen Space Ray Tracing:
 *     - http://casual-effects.blogspot.com/2014/08/screen-space-ray-tracing.html
 *     - https://sourceforge.net/p/g3d/code/HEAD/tree/G3D10/data-files/shader/screenSpaceRayTrace.glsl
 *     - https://github.com/kode80/kode80SSR
 *   SSR:
 *     - general tips: https://sakibsaikia.github.io/graphics/2016/12/26/Screen-Space-Reflection-in-Killing-Floor-2.html
 *     - computation of blur radius from roughness and distance: https://github.com/godotengine/godot/blob/master/servers/rendering/renderer_rd/shaders/effects/screen_space_reflection.glsl
 *     - blur and usage of back depth buffer: https://github.com/kode80/kode80SSR
 */
export declare class SSRRenderingPipeline extends PostProcessRenderPipeline {
    /**
     * The SSR PostProcess effect id in the pipeline
     */
    SSRRenderEffect: string;
    /**
     * The blur PostProcess effect id in the pipeline
     */
    SSRBlurRenderEffect: string;
    /**
     * The PostProcess effect id in the pipeline that combines the SSR-Blur output with the original scene color
     */
    SSRCombineRenderEffect: string;
    private _samples;
    /**
     * MSAA sample count, setting this to 4 will provide 4x anti aliasing. (default: 1)
     */
    set samples(sampleCount: number);
    get samples(): number;
    /**
     * Gets or sets the maxDistance used to define how far we look for reflection during the ray-marching on the reflected ray (default: 1000).
     * Note that this value is a view (camera) space distance (not pixels!).
     */
    maxDistance: number;
    /**
     * Gets or sets the step size used to iterate until the effect finds the color of the reflection's pixel. Should be an integer \>= 1 as it is the number of pixels we advance at each step (default: 1).
     * Use higher values to improve performances (but at the expense of quality).
     */
    step: number;
    /**
     * Gets or sets the thickness value used as tolerance when computing the intersection between the reflected ray and the scene (default: 0.5).
     * If setting "enableAutomaticThicknessComputation" to true, you can use lower values for "thickness" (even 0), as the geometry thickness
     * is automatically computed thank to the regular depth buffer + the backface depth buffer
     */
    thickness: number;
    /**
     * Gets or sets the current reflection strength. 1.0 is an ideal value but can be increased/decreased for particular results (default: 1).
     */
    strength: number;
    /**
     * Gets or sets the falloff exponent used to compute the reflection strength. Higher values lead to fainter reflections (default: 1).
     */
    reflectionSpecularFalloffExponent: number;
    /**
     * Maximum number of steps during the ray marching process after which we consider an intersection could not be found (default: 1000).
     * Should be an integer value.
     */
    maxSteps: number;
    /**
     * Gets or sets the factor applied when computing roughness. Default value is 0.2.
     * When blurring based on roughness is enabled (meaning blurDispersionStrength \> 0), roughnessFactor is used as a global roughness factor applied on all objects.
     * If you want to disable this global roughness set it to 0.
     */
    roughnessFactor: number;
    /**
     * Number of steps to skip at start when marching the ray to avoid self collisions (default: 1)
     * 1 should normally be a good value, depending on the scene you may need to use a higher value (2 or 3)
     */
    selfCollisionNumSkip: number;
    private _reflectivityThreshold;
    /**
     * Gets or sets the minimum value for one of the reflectivity component of the material to consider it for SSR (default: 0.04).
     * If all r/g/b components of the reflectivity is below or equal this value, the pixel will not be considered reflective and SSR won't be applied.
     */
    get reflectivityThreshold(): number;
    set reflectivityThreshold(threshold: number);
    private _ssrDownsample;
    /**
     * Gets or sets the downsample factor used to reduce the size of the texture used to compute the SSR contribution (default: 0).
     * Use 0 to render the SSR contribution at full resolution, 1 to render at half resolution, 2 to render at 1/3 resolution, etc.
     * Note that it is used only when blurring is enabled (blurDispersionStrength \> 0), because in that mode the SSR contribution is generated in a separate texture.
     */
    get ssrDownsample(): number;
    set ssrDownsample(downsample: number);
    private _blurDispersionStrength;
    /**
     * Gets or sets the blur dispersion strength. Set this value to 0 to disable blurring (default: 0.05)
     * The reflections are blurred based on the roughness of the surface and the distance between the pixel shaded and the reflected pixel: the higher the distance the more blurry the reflection is.
     * blurDispersionStrength allows to increase or decrease this effect.
     */
    get blurDispersionStrength(): number;
    set blurDispersionStrength(strength: number);
    private _useBlur;
    private _blurDownsample;
    /**
     * Gets or sets the downsample factor used to reduce the size of the textures used to blur the reflection effect (default: 0).
     * Use 0 to blur at full resolution, 1 to render at half resolution, 2 to render at 1/3 resolution, etc.
     */
    get blurDownsample(): number;
    set blurDownsample(downsample: number);
    private _enableSmoothReflections;
    /**
     * Gets or sets whether or not smoothing reflections is enabled (default: false)
     * Enabling smoothing will require more GPU power.
     * Note that this setting has no effect if step = 1: it's only used if step \> 1.
     */
    get enableSmoothReflections(): boolean;
    set enableSmoothReflections(enabled: boolean);
    private _environmentTexture;
    /**
     * Gets or sets the environment cube texture used to define the reflection when the reflected rays of SSR leave the view space or when the maxDistance/maxSteps is reached.
     */
    get environmentTexture(): Nullable<CubeTexture>;
    set environmentTexture(texture: Nullable<CubeTexture>);
    private _environmentTextureIsProbe;
    /**
     * Gets or sets the boolean defining if the environment texture is a standard cubemap (false) or a probe (true). Default value is false.
     * Note: a probe cube texture is treated differently than an ordinary cube texture because the Y axis is reversed.
     */
    get environmentTextureIsProbe(): boolean;
    set environmentTextureIsProbe(isProbe: boolean);
    private _attenuateScreenBorders;
    /**
     * Gets or sets a boolean indicating if the reflections should be attenuated at the screen borders (default: true).
     */
    get attenuateScreenBorders(): boolean;
    set attenuateScreenBorders(attenuate: boolean);
    private _attenuateIntersectionDistance;
    /**
     * Gets or sets a boolean indicating if the reflections should be attenuated according to the distance of the intersection (default: true).
     */
    get attenuateIntersectionDistance(): boolean;
    set attenuateIntersectionDistance(attenuate: boolean);
    private _attenuateIntersectionIterations;
    /**
     * Gets or sets a boolean indicating if the reflections should be attenuated according to the number of iterations performed to find the intersection (default: true).
     */
    get attenuateIntersectionIterations(): boolean;
    set attenuateIntersectionIterations(attenuate: boolean);
    private _attenuateFacingCamera;
    /**
     * Gets or sets a boolean indicating if the reflections should be attenuated when the reflection ray is facing the camera (the view direction) (default: false).
     */
    get attenuateFacingCamera(): boolean;
    set attenuateFacingCamera(attenuate: boolean);
    private _attenuateBackfaceReflection;
    /**
     * Gets or sets a boolean indicating if the backface reflections should be attenuated (default: false).
     */
    get attenuateBackfaceReflection(): boolean;
    set attenuateBackfaceReflection(attenuate: boolean);
    private _clipToFrustum;
    /**
     * Gets or sets a boolean indicating if the ray should be clipped to the frustum (default: true).
     * You can try to set this parameter to false to save some performances: it may produce some artefacts in some cases, but generally they won't really be visible
     */
    get clipToFrustum(): boolean;
    set clipToFrustum(clip: boolean);
    private _useFresnel;
    /**
     * Gets or sets a boolean indicating whether the blending between the current color pixel and the reflection color should be done with a Fresnel coefficient (default: false).
     * It is more physically accurate to use the Fresnel coefficient (otherwise it uses the reflectivity of the material for blending), but it is also more expensive when you use blur (when blurDispersionStrength \> 0).
     */
    get useFresnel(): boolean;
    set useFresnel(fresnel: boolean);
    private _enableAutomaticThicknessComputation;
    /**
     * Gets or sets a boolean defining if geometry thickness should be computed automatically (default: false).
     * When enabled, a depth renderer is created which will render the back faces of the scene to a depth texture (meaning additional work for the GPU).
     * In that mode, the "thickness" property is still used as an offset to compute the ray intersection, but you can typically use a much lower
     * value than when enableAutomaticThicknessComputation is false (it's even possible to use a value of 0 when using low values for "step")
     * Note that for performance reasons, this option will only apply to the first camera to which the rendering pipeline is attached!
     */
    get enableAutomaticThicknessComputation(): boolean;
    set enableAutomaticThicknessComputation(automatic: boolean);
    /**
     * Gets the depth renderer used to render the back faces of the scene to a depth texture.
     */
    get backfaceDepthRenderer(): Nullable<DepthRenderer>;
    private _backfaceDepthTextureDownsample;
    /**
     * Gets or sets the downsample factor (default: 0) used to create the backface depth texture - used only if enableAutomaticThicknessComputation = true.
     * Use 0 to render the depth at full resolution, 1 to render at half resolution, 2 to render at 1/4 resolution, etc.
     * Note that you will get rendering artefacts when using a value different from 0: it's a tradeoff between image quality and performances.
     */
    get backfaceDepthTextureDownsample(): number;
    set backfaceDepthTextureDownsample(factor: number);
    private _backfaceForceDepthWriteTransparentMeshes;
    /**
     * Gets or sets a boolean (default: true) indicating if the depth of transparent meshes should be written to the backface depth texture (when automatic thickness computation is enabled).
     */
    get backfaceForceDepthWriteTransparentMeshes(): boolean;
    set backfaceForceDepthWriteTransparentMeshes(force: boolean);
    private _isEnabled;
    /**
     * Gets or sets a boolean indicating if the effect is enabled (default: true).
     */
    get isEnabled(): boolean;
    set isEnabled(value: boolean);
    private _inputTextureColorIsInGammaSpace;
    /**
     * Gets or sets a boolean defining if the input color texture is in gamma space (default: true)
     * The SSR effect works in linear space, so if the input texture is in gamma space, we must convert the texture to linear space before applying the effect
     */
    get inputTextureColorIsInGammaSpace(): boolean;
    set inputTextureColorIsInGammaSpace(gammaSpace: boolean);
    private _generateOutputInGammaSpace;
    /**
     * Gets or sets a boolean defining if the output color texture generated by the SSR pipeline should be in gamma space (default: true)
     * If you have a post-process that comes after the SSR and that post-process needs the input to be in a linear space, you must disable generateOutputInGammaSpace
     */
    get generateOutputInGammaSpace(): boolean;
    set generateOutputInGammaSpace(gammaSpace: boolean);
    private _debug;
    /**
     * Gets or sets a boolean indicating if the effect should be rendered in debug mode (default: false).
     * In this mode, colors have this meaning:
     *   - blue: the ray hit the max distance (we reached maxDistance)
     *   - red: the ray ran out of steps (we reached maxSteps)
     *   - yellow: the ray went off screen
     *   - green: the ray hit a surface. The brightness of the green color is proportional to the distance between the ray origin and the intersection point: A brighter green means more computation than a darker green.
     * In the first 3 cases, the final color is calculated by mixing the skybox color with the pixel color (if environmentTexture is defined), otherwise the pixel color is not modified
     * You should try to get as few blue/red/yellow pixels as possible, as this means that the ray has gone further than if it had hit a surface.
     */
    get debug(): boolean;
    set debug(value: boolean);
    /**
     * Gets the scene the effect belongs to.
     * @returns the scene the effect belongs to.
     */
    getScene(): Scene;
    private _forceGeometryBuffer;
    private get _geometryBufferRenderer();
    private get _prePassRenderer();
    private _scene;
    private _isDirty;
    private _camerasToBeAttached;
    private _textureType;
    private _ssrPostProcess;
    private _blurPostProcessX;
    private _blurPostProcessY;
    private _blurCombinerPostProcess;
    private _depthRenderer;
    private _depthRendererCamera;
    /**
     * Gets active scene
     */
    get scene(): Scene;
    /**
     * Returns true if SSR is supported by the running hardware
     */
    get isSupported(): boolean;
    /**
     * Constructor of the SSR rendering pipeline
     * @param name The rendering pipeline name
     * @param scene The scene linked to this pipeline
     * @param cameras The array of cameras that the rendering pipeline will be attached to (default: scene.cameras)
     * @param forceGeometryBuffer Set to true if you want to use the legacy geometry buffer renderer (default: false)
     * @param textureType The texture type used by the different post processes created by SSR (default: Constants.TEXTURETYPE_UNSIGNED_BYTE)
     */
    constructor(name: string, scene: Scene, cameras?: Camera[], forceGeometryBuffer?: boolean, textureType?: number);
    /**
     * Get the class name
     * @returns "SSRRenderingPipeline"
     */
    getClassName(): string;
    /**
     * Adds a camera to the pipeline
     * @param camera the camera to be added
     */
    addCamera(camera: Camera): void;
    /**
     * Removes a camera from the pipeline
     * @param camera the camera to remove
     */
    removeCamera(camera: Camera): void;
    /**
     * Removes the internal pipeline assets and detaches the pipeline from the scene cameras
     * @param disableGeometryBufferRenderer if the geometry buffer renderer should be disabled
     */
    dispose(disableGeometryBufferRenderer?: boolean): void;
    private _getTextureSize;
    private _updateEffectDefines;
    private _buildPipeline;
    private _resizeDepthRenderer;
    private _disposeDepthRenderer;
    private _disposePostProcesses;
    private _createSSRPostProcess;
    private _createBlurAndCombinerPostProcesses;
    /**
     * Serializes the rendering pipeline (Used when exporting)
     * @returns the serialized object
     */
    serialize(): any;
    /**
     * Parse the serialized pipeline
     * @param source Source pipeline.
     * @param scene The scene to load the pipeline to.
     * @param rootUrl The URL of the serialized pipeline.
     * @returns An instantiated pipeline from the serialized object.
     */
    static Parse(source: any, scene: Scene, rootUrl: string): SSRRenderingPipeline;
}
