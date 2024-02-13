import type { Camera } from "../../Cameras/camera.js";
import type { Engine } from "../../Engines/engine.js";
import type { BaseTexture } from "../../Materials/Textures/baseTexture.js";
import type { InternalTexture } from "../../Materials/Textures/internalTexture.js";
import { Color3, Color4 } from "../../Maths/math.color.js";
import { Matrix, Vector3 } from "../../Maths/math.vector.js";
import { Observable } from "../../Misc/observable.js";
import { PostProcess } from "../../PostProcesses/postProcess.js";
import type { Scene } from "../../scene.js";
import type { Nullable } from "../../types.js";
import type { FluidRenderingObject } from "./fluidRenderingObject";
import { FluidRenderingTextures } from "./fluidRenderingTextures";
/**
 * Textures that can be displayed as a debugging tool
 */
export declare enum FluidRenderingDebug {
    DepthTexture = 0,
    DepthBlurredTexture = 1,
    ThicknessTexture = 2,
    ThicknessBlurredTexture = 3,
    DiffuseTexture = 4,
    Normals = 5,
    DiffuseRendering = 6
}
/**
 * Class used to render an object as a fluid thanks to different render target textures (depth, thickness, diffuse)
 */
export declare class FluidRenderingTargetRenderer {
    protected _scene: Scene;
    protected _camera: Nullable<Camera>;
    protected _engine: Engine;
    protected _invProjectionMatrix: Matrix;
    protected _depthClearColor: Color4;
    protected _thicknessClearColor: Color4;
    protected _needInitialization: boolean;
    /**
     * Returns true if the class needs to be reinitialized (because of changes in parameterization)
     */
    get needInitialization(): boolean;
    private _generateDiffuseTexture;
    /**
     * Gets or sets a boolean indicating that the diffuse texture should be generated and used for the rendering
     */
    get generateDiffuseTexture(): boolean;
    set generateDiffuseTexture(generate: boolean);
    /**
     * Fluid color. Not used if generateDiffuseTexture is true
     */
    fluidColor: Color3;
    /**
     * Density of the fluid (positive number). The higher the value, the more opaque the fluid.
     */
    density: number;
    /**
     * Strength of the refraction (positive number, but generally between 0 and 0.3).
     */
    refractionStrength: number;
    /**
     * Strength of the fresnel effect (value between 0 and 1). Lower the value if you want to soften the specular effect
     */
    fresnelClamp: number;
    /**
     * Strength of the specular power (positive number). Increase the value to make the specular effect more concentrated
     */
    specularPower: number;
    /**
     * Minimum thickness of the particles (positive number). If useFixedThickness is true, minimumThickness is the thickness used
     */
    minimumThickness: number;
    /**
     * Direction of the light. The fluid is assumed to be lit by a directional light
     */
    dirLight: Vector3;
    private _debugFeature;
    /**
     * Gets or sets the feature (texture) to be debugged. Not used if debug is false
     */
    get debugFeature(): FluidRenderingDebug;
    set debugFeature(feature: FluidRenderingDebug);
    private _debug;
    /**
     * Gets or sets a boolean indicating if we should display a specific texture (given by debugFeature) for debugging purpose
     */
    get debug(): boolean;
    set debug(debug: boolean);
    private _environmentMap?;
    /**
     * Gets or sets the environment map used for the reflection part of the shading
     * If null, no map will be used. If undefined, the scene.environmentMap will be used (if defined)
     */
    get environmentMap(): Nullable<BaseTexture> | undefined;
    set environmentMap(map: Nullable<BaseTexture> | undefined);
    private _enableBlurDepth;
    /**
     * Gets or sets a boolean indicating that the depth texture should be blurred
     */
    get enableBlurDepth(): boolean;
    set enableBlurDepth(enable: boolean);
    private _blurDepthSizeDivisor;
    /**
     * Gets or sets the depth size divisor (positive number, generally between 1 and 4), which is used as a divisor when creating the texture used for blurring the depth
     * For eg. if blurDepthSizeDivisor=2, the texture used to blur the depth will be half the size of the depth texture
     */
    get blurDepthSizeDivisor(): number;
    set blurDepthSizeDivisor(scale: number);
    private _blurDepthFilterSize;
    /**
     * Size of the kernel used to filter the depth blur texture (positive number, generally between 1 and 20 - higher values will require more processing power from the GPU)
     */
    get blurDepthFilterSize(): number;
    set blurDepthFilterSize(filterSize: number);
    private _blurDepthNumIterations;
    /**
     * Number of blurring iterations used to generate the depth blur texture (positive number, generally between 1 and 10 - higher values will require more processing power from the GPU)
     */
    get blurDepthNumIterations(): number;
    set blurDepthNumIterations(numIterations: number);
    private _blurDepthMaxFilterSize;
    /**
     * Maximum size of the kernel used to blur the depth texture (positive number, generally between 1 and 200 - higher values will require more processing power from the GPU when the particles are larger on screen)
     */
    get blurDepthMaxFilterSize(): number;
    set blurDepthMaxFilterSize(maxFilterSize: number);
    private _blurDepthDepthScale;
    /**
     * Depth weight in the calculation when applying the bilateral blur to generate the depth blur texture (positive number, generally between 0 and 100)
     */
    get blurDepthDepthScale(): number;
    set blurDepthDepthScale(scale: number);
    private _enableBlurThickness;
    /**
     * Gets or sets a boolean indicating that the thickness texture should be blurred
     */
    get enableBlurThickness(): boolean;
    set enableBlurThickness(enable: boolean);
    private _blurThicknessSizeDivisor;
    /**
     * Gets or sets the thickness size divisor (positive number, generally between 1 and 4), which is used as a divisor when creating the texture used for blurring the thickness
     * For eg. if blurThicknessSizeDivisor=2, the texture used to blur the thickness will be half the size of the thickness texture
     */
    get blurThicknessSizeDivisor(): number;
    set blurThicknessSizeDivisor(scale: number);
    private _blurThicknessFilterSize;
    /**
     * Size of the kernel used to filter the thickness blur texture (positive number, generally between 1 and 20 - higher values will require more processing power from the GPU)
     */
    get blurThicknessFilterSize(): number;
    set blurThicknessFilterSize(filterSize: number);
    private _blurThicknessNumIterations;
    /**
     * Number of blurring iterations used to generate the thickness blur texture (positive number, generally between 1 and 10 - higher values will require more processing power from the GPU)
     */
    get blurThicknessNumIterations(): number;
    set blurThicknessNumIterations(numIterations: number);
    private _useFixedThickness;
    /**
     * Gets or sets a boolean indicating that a fixed thickness should be used instead of generating a thickness texture
     */
    get useFixedThickness(): boolean;
    set useFixedThickness(use: boolean);
    /** @internal */
    _bgDepthTexture: Nullable<InternalTexture>;
    /** @internal */
    _onUseVelocityChanged: Observable<FluidRenderingTargetRenderer>;
    private _useVelocity;
    /**
     * Gets or sets a boolean indicating that the velocity should be used when rendering the particles as a fluid.
     * Note: the vertex buffers must contain a "velocity" buffer for this to work!
     */
    get useVelocity(): boolean;
    set useVelocity(use: boolean);
    private _depthMapSize;
    /**
     * Defines the size of the depth texture.
     * If null, the texture will have the size of the screen
     */
    get depthMapSize(): Nullable<number>;
    set depthMapSize(size: Nullable<number>);
    private _thicknessMapSize;
    /**
     * Defines the size of the thickness texture.
     * If null, the texture will have the size of the screen
     */
    get thicknessMapSize(): Nullable<number>;
    set thicknessMapSize(size: Nullable<number>);
    private _diffuseMapSize;
    /**
     * Defines the size of the diffuse texture.
     * If null, the texture will have the size of the screen
     */
    get diffuseMapSize(): Nullable<number>;
    set diffuseMapSize(size: Nullable<number>);
    private _samples;
    /**
     * Gets or sets the number of samples used by MSAA
     * Note: changing this value in WebGL does not work because depth/stencil textures can't be created with MSAA (see https://github.com/BabylonJS/Babylon.js/issues/12444)
     */
    get samples(): number;
    set samples(samples: number);
    /**
     * Gets the camera used for the rendering
     */
    get camera(): Nullable<Camera>;
    /** @internal */
    _renderPostProcess: Nullable<PostProcess>;
    /** @internal */
    _depthRenderTarget: Nullable<FluidRenderingTextures>;
    /** @internal */
    _diffuseRenderTarget: Nullable<FluidRenderingTextures>;
    /** @internal */
    _thicknessRenderTarget: Nullable<FluidRenderingTextures>;
    /**
     * Creates an instance of the class
     * @param scene Scene used to render the fluid object into
     * @param camera Camera used to render the fluid object. If not provided, use the active camera of the scene instead
     */
    constructor(scene: Scene, camera?: Camera);
    /** @internal */
    _initialize(): void;
    protected _setBlurParameters(renderTarget?: Nullable<FluidRenderingTextures>): void;
    protected _setBlurDepthParameters(): void;
    protected _setBlurThicknessParameters(): void;
    protected _initializeRenderTarget(renderTarget: FluidRenderingTextures): void;
    protected _createLiquidRenderingPostProcess(): void;
    /** @internal */
    _clearTargets(): void;
    /** @internal */
    _render(fluidObject: FluidRenderingObject): void;
    /**
     * Releases all the ressources used by the class
     * @param onlyPostProcesses If true, releases only the ressources used by the render post processes
     */
    dispose(onlyPostProcesses?: boolean): void;
}
