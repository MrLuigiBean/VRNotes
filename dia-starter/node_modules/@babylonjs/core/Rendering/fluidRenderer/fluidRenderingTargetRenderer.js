
import { Color3, Color4 } from "../../Maths/math.color.js";
import { Matrix, Vector2, Vector3 } from "../../Maths/math.vector.js";
import { Observable } from "../../Misc/observable.js";
import { PostProcess } from "../../PostProcesses/postProcess.js";
import { FluidRenderingTextures } from "./fluidRenderingTextures.js";
/**
 * Textures that can be displayed as a debugging tool
 */
export var FluidRenderingDebug;
(function (FluidRenderingDebug) {
    FluidRenderingDebug[FluidRenderingDebug["DepthTexture"] = 0] = "DepthTexture";
    FluidRenderingDebug[FluidRenderingDebug["DepthBlurredTexture"] = 1] = "DepthBlurredTexture";
    FluidRenderingDebug[FluidRenderingDebug["ThicknessTexture"] = 2] = "ThicknessTexture";
    FluidRenderingDebug[FluidRenderingDebug["ThicknessBlurredTexture"] = 3] = "ThicknessBlurredTexture";
    FluidRenderingDebug[FluidRenderingDebug["DiffuseTexture"] = 4] = "DiffuseTexture";
    FluidRenderingDebug[FluidRenderingDebug["Normals"] = 5] = "Normals";
    FluidRenderingDebug[FluidRenderingDebug["DiffuseRendering"] = 6] = "DiffuseRendering";
})(FluidRenderingDebug || (FluidRenderingDebug = {}));
/**
 * Class used to render an object as a fluid thanks to different render target textures (depth, thickness, diffuse)
 */
export class FluidRenderingTargetRenderer {
    /**
     * Returns true if the class needs to be reinitialized (because of changes in parameterization)
     */
    get needInitialization() {
        return this._needInitialization;
    }
    /**
     * Gets or sets a boolean indicating that the diffuse texture should be generated and used for the rendering
     */
    get generateDiffuseTexture() {
        return this._generateDiffuseTexture;
    }
    set generateDiffuseTexture(generate) {
        if (this._generateDiffuseTexture === generate) {
            return;
        }
        this._generateDiffuseTexture = generate;
        this._needInitialization = true;
    }
    /**
     * Gets or sets the feature (texture) to be debugged. Not used if debug is false
     */
    get debugFeature() {
        return this._debugFeature;
    }
    set debugFeature(feature) {
        if (this._debugFeature === feature) {
            return;
        }
        this._needInitialization = true;
        this._debugFeature = feature;
    }
    /**
     * Gets or sets a boolean indicating if we should display a specific texture (given by debugFeature) for debugging purpose
     */
    get debug() {
        return this._debug;
    }
    set debug(debug) {
        if (this._debug === debug) {
            return;
        }
        this._debug = debug;
        this._needInitialization = true;
    }
    /**
     * Gets or sets the environment map used for the reflection part of the shading
     * If null, no map will be used. If undefined, the scene.environmentMap will be used (if defined)
     */
    get environmentMap() {
        return this._environmentMap;
    }
    set environmentMap(map) {
        if (this._environmentMap === map) {
            return;
        }
        this._needInitialization = true;
        this._environmentMap = map;
    }
    /**
     * Gets or sets a boolean indicating that the depth texture should be blurred
     */
    get enableBlurDepth() {
        return this._enableBlurDepth;
    }
    set enableBlurDepth(enable) {
        if (this._enableBlurDepth === enable) {
            return;
        }
        this._enableBlurDepth = enable;
        this._needInitialization = true;
    }
    /**
     * Gets or sets the depth size divisor (positive number, generally between 1 and 4), which is used as a divisor when creating the texture used for blurring the depth
     * For eg. if blurDepthSizeDivisor=2, the texture used to blur the depth will be half the size of the depth texture
     */
    get blurDepthSizeDivisor() {
        return this._blurDepthSizeDivisor;
    }
    set blurDepthSizeDivisor(scale) {
        if (this._blurDepthSizeDivisor === scale) {
            return;
        }
        this._blurDepthSizeDivisor = scale;
        this._needInitialization = true;
    }
    /**
     * Size of the kernel used to filter the depth blur texture (positive number, generally between 1 and 20 - higher values will require more processing power from the GPU)
     */
    get blurDepthFilterSize() {
        return this._blurDepthFilterSize;
    }
    set blurDepthFilterSize(filterSize) {
        if (this._blurDepthFilterSize === filterSize) {
            return;
        }
        this._blurDepthFilterSize = filterSize;
        this._setBlurParameters();
    }
    /**
     * Number of blurring iterations used to generate the depth blur texture (positive number, generally between 1 and 10 - higher values will require more processing power from the GPU)
     */
    get blurDepthNumIterations() {
        return this._blurDepthNumIterations;
    }
    set blurDepthNumIterations(numIterations) {
        if (this._blurDepthNumIterations === numIterations) {
            return;
        }
        this._blurDepthNumIterations = numIterations;
        this._setBlurParameters();
    }
    /**
     * Maximum size of the kernel used to blur the depth texture (positive number, generally between 1 and 200 - higher values will require more processing power from the GPU when the particles are larger on screen)
     */
    get blurDepthMaxFilterSize() {
        return this._blurDepthMaxFilterSize;
    }
    set blurDepthMaxFilterSize(maxFilterSize) {
        if (this._blurDepthMaxFilterSize === maxFilterSize) {
            return;
        }
        this._blurDepthMaxFilterSize = maxFilterSize;
        this._setBlurParameters();
    }
    /**
     * Depth weight in the calculation when applying the bilateral blur to generate the depth blur texture (positive number, generally between 0 and 100)
     */
    get blurDepthDepthScale() {
        return this._blurDepthDepthScale;
    }
    set blurDepthDepthScale(scale) {
        if (this._blurDepthDepthScale === scale) {
            return;
        }
        this._blurDepthDepthScale = scale;
        this._setBlurParameters();
    }
    /**
     * Gets or sets a boolean indicating that the thickness texture should be blurred
     */
    get enableBlurThickness() {
        return this._enableBlurThickness;
    }
    set enableBlurThickness(enable) {
        if (this._enableBlurThickness === enable) {
            return;
        }
        this._enableBlurThickness = enable;
        this._needInitialization = true;
    }
    /**
     * Gets or sets the thickness size divisor (positive number, generally between 1 and 4), which is used as a divisor when creating the texture used for blurring the thickness
     * For eg. if blurThicknessSizeDivisor=2, the texture used to blur the thickness will be half the size of the thickness texture
     */
    get blurThicknessSizeDivisor() {
        return this._blurThicknessSizeDivisor;
    }
    set blurThicknessSizeDivisor(scale) {
        if (this._blurThicknessSizeDivisor === scale) {
            return;
        }
        this._blurThicknessSizeDivisor = scale;
        this._needInitialization = true;
    }
    /**
     * Size of the kernel used to filter the thickness blur texture (positive number, generally between 1 and 20 - higher values will require more processing power from the GPU)
     */
    get blurThicknessFilterSize() {
        return this._blurThicknessFilterSize;
    }
    set blurThicknessFilterSize(filterSize) {
        if (this._blurThicknessFilterSize === filterSize) {
            return;
        }
        this._blurThicknessFilterSize = filterSize;
        this._setBlurParameters();
    }
    /**
     * Number of blurring iterations used to generate the thickness blur texture (positive number, generally between 1 and 10 - higher values will require more processing power from the GPU)
     */
    get blurThicknessNumIterations() {
        return this._blurThicknessNumIterations;
    }
    set blurThicknessNumIterations(numIterations) {
        if (this._blurThicknessNumIterations === numIterations) {
            return;
        }
        this._blurThicknessNumIterations = numIterations;
        this._setBlurParameters();
    }
    /**
     * Gets or sets a boolean indicating that a fixed thickness should be used instead of generating a thickness texture
     */
    get useFixedThickness() {
        return this._useFixedThickness;
    }
    set useFixedThickness(use) {
        if (this._useFixedThickness === use) {
            return;
        }
        this._useFixedThickness = use;
        this._needInitialization = true;
    }
    /**
     * Gets or sets a boolean indicating that the velocity should be used when rendering the particles as a fluid.
     * Note: the vertex buffers must contain a "velocity" buffer for this to work!
     */
    get useVelocity() {
        return this._useVelocity;
    }
    set useVelocity(use) {
        if (this._useVelocity === use) {
            return;
        }
        this._useVelocity = use;
        this._needInitialization = true;
        this._onUseVelocityChanged.notifyObservers(this);
    }
    /**
     * Defines the size of the depth texture.
     * If null, the texture will have the size of the screen
     */
    get depthMapSize() {
        return this._depthMapSize;
    }
    set depthMapSize(size) {
        if (this._depthMapSize === size) {
            return;
        }
        this._depthMapSize = size;
        this._needInitialization = true;
    }
    /**
     * Defines the size of the thickness texture.
     * If null, the texture will have the size of the screen
     */
    get thicknessMapSize() {
        return this._thicknessMapSize;
    }
    set thicknessMapSize(size) {
        if (this._thicknessMapSize === size) {
            return;
        }
        this._thicknessMapSize = size;
        this._needInitialization = true;
    }
    /**
     * Defines the size of the diffuse texture.
     * If null, the texture will have the size of the screen
     */
    get diffuseMapSize() {
        return this._diffuseMapSize;
    }
    set diffuseMapSize(size) {
        if (this._diffuseMapSize === size) {
            return;
        }
        this._diffuseMapSize = size;
        this._needInitialization = true;
    }
    /**
     * Gets or sets the number of samples used by MSAA
     * Note: changing this value in WebGL does not work because depth/stencil textures can't be created with MSAA (see https://github.com/BabylonJS/Babylon.js/issues/12444)
     */
    get samples() {
        return this._samples;
    }
    set samples(samples) {
        if (this._samples === samples) {
            return;
        }
        this._samples = samples;
        this._needInitialization = true;
    }
    /**
     * Gets the camera used for the rendering
     */
    get camera() {
        return this._camera;
    }
    /**
     * Creates an instance of the class
     * @param scene Scene used to render the fluid object into
     * @param camera Camera used to render the fluid object. If not provided, use the active camera of the scene instead
     */
    constructor(scene, camera) {
        this._generateDiffuseTexture = false;
        /**
         * Fluid color. Not used if generateDiffuseTexture is true
         */
        this.fluidColor = new Color3(0.085, 0.6375, 0.765);
        /**
         * Density of the fluid (positive number). The higher the value, the more opaque the fluid.
         */
        this.density = 2;
        /**
         * Strength of the refraction (positive number, but generally between 0 and 0.3).
         */
        this.refractionStrength = 0.1;
        /**
         * Strength of the fresnel effect (value between 0 and 1). Lower the value if you want to soften the specular effect
         */
        this.fresnelClamp = 1.0;
        /**
         * Strength of the specular power (positive number). Increase the value to make the specular effect more concentrated
         */
        this.specularPower = 250;
        /**
         * Minimum thickness of the particles (positive number). If useFixedThickness is true, minimumThickness is the thickness used
         */
        this.minimumThickness = 0;
        /**
         * Direction of the light. The fluid is assumed to be lit by a directional light
         */
        this.dirLight = new Vector3(-2, -1, 1).normalize();
        this._debugFeature = FluidRenderingDebug.DepthBlurredTexture;
        this._debug = false;
        this._enableBlurDepth = true;
        this._blurDepthSizeDivisor = 1;
        this._blurDepthFilterSize = 7;
        this._blurDepthNumIterations = 3;
        this._blurDepthMaxFilterSize = 100;
        this._blurDepthDepthScale = 10;
        this._enableBlurThickness = true;
        this._blurThicknessSizeDivisor = 1;
        this._blurThicknessFilterSize = 5;
        this._blurThicknessNumIterations = 1;
        this._useFixedThickness = false;
        /** @internal */
        this._onUseVelocityChanged = new Observable();
        this._useVelocity = false;
        this._depthMapSize = null;
        this._thicknessMapSize = null;
        this._diffuseMapSize = null;
        this._samples = 1;
        this._scene = scene;
        this._engine = scene.getEngine();
        this._camera = camera !== null && camera !== void 0 ? camera : scene.activeCamera;
        this._needInitialization = true;
        this._bgDepthTexture = null;
        this._invProjectionMatrix = new Matrix();
        this._depthClearColor = new Color4(1e6, 1e6, 1e6, 1);
        this._thicknessClearColor = new Color4(0, 0, 0, 1);
        this._depthRenderTarget = null;
        this._diffuseRenderTarget = null;
        this._thicknessRenderTarget = null;
        this._renderPostProcess = null;
    }
    /** @internal */
    _initialize() {
        var _a, _b, _c;
        this.dispose();
        this._needInitialization = false;
        const depthWidth = (_a = this._depthMapSize) !== null && _a !== void 0 ? _a : this._engine.getRenderWidth();
        const depthHeight = this._depthMapSize !== null ? Math.round((this._depthMapSize * this._engine.getRenderHeight()) / this._engine.getRenderWidth()) : this._engine.getRenderHeight();
        this._depthRenderTarget = new FluidRenderingTextures("Depth", this._scene, depthWidth, depthHeight, depthWidth, depthHeight, 1, 7, 1, 7, false, this._camera, true, this._samples);
        this._initializeRenderTarget(this._depthRenderTarget);
        if (this.generateDiffuseTexture) {
            const diffuseWidth = (_b = this._diffuseMapSize) !== null && _b !== void 0 ? _b : this._engine.getRenderWidth();
            const diffuseHeight = this._diffuseMapSize !== null
                ? Math.round((this._diffuseMapSize * this._engine.getRenderHeight()) / this._engine.getRenderWidth())
                : this._engine.getRenderHeight();
            this._diffuseRenderTarget = new FluidRenderingTextures("Diffuse", this._scene, diffuseWidth, diffuseHeight, 0, 0, 0, 5, 0, 5, true, this._camera, true, this._samples);
            this._initializeRenderTarget(this._diffuseRenderTarget);
        }
        const thicknessWidth = (_c = this._thicknessMapSize) !== null && _c !== void 0 ? _c : this._engine.getRenderWidth();
        const thicknessHeight = this._thicknessMapSize !== null
            ? Math.round((this._thicknessMapSize * this._engine.getRenderHeight()) / this._engine.getRenderWidth())
            : this._engine.getRenderHeight();
        if (!this._useFixedThickness) {
            this._thicknessRenderTarget = new FluidRenderingTextures("Thickness", this._scene, thicknessWidth, thicknessHeight, thicknessWidth, thicknessHeight, 2, 6, 2, 6, true, this._camera, false, this._samples);
            this._initializeRenderTarget(this._thicknessRenderTarget);
        }
        this._createLiquidRenderingPostProcess();
    }
    _setBlurParameters(renderTarget = null) {
        if (renderTarget === null || renderTarget === this._depthRenderTarget) {
            this._setBlurDepthParameters();
        }
        if (renderTarget === null || renderTarget === this._thicknessRenderTarget) {
            this._setBlurThicknessParameters();
        }
    }
    _setBlurDepthParameters() {
        if (!this._depthRenderTarget) {
            return;
        }
        this._depthRenderTarget.blurFilterSize = this.blurDepthFilterSize;
        this._depthRenderTarget.blurMaxFilterSize = this.blurDepthMaxFilterSize;
        this._depthRenderTarget.blurNumIterations = this.blurDepthNumIterations;
        this._depthRenderTarget.blurDepthScale = this.blurDepthDepthScale;
    }
    _setBlurThicknessParameters() {
        if (!this._thicknessRenderTarget) {
            return;
        }
        this._thicknessRenderTarget.blurFilterSize = this.blurThicknessFilterSize;
        this._thicknessRenderTarget.blurNumIterations = this.blurThicknessNumIterations;
    }
    _initializeRenderTarget(renderTarget) {
        if (renderTarget !== this._diffuseRenderTarget) {
            renderTarget.enableBlur = renderTarget === this._depthRenderTarget ? this.enableBlurDepth : this.enableBlurThickness;
            renderTarget.blurSizeDivisor = renderTarget === this._depthRenderTarget ? this.blurDepthSizeDivisor : this.blurThicknessSizeDivisor;
        }
        this._setBlurParameters(renderTarget);
        renderTarget.initialize();
    }
    _createLiquidRenderingPostProcess() {
        var _a;
        const engine = this._scene.getEngine();
        const uniformNames = [
            "viewMatrix",
            "projectionMatrix",
            "invProjectionMatrix",
            "texelSize",
            "dirLight",
            "cameraFar",
            "density",
            "refractionStrength",
            "fresnelClamp",
            "specularPower",
        ];
        const samplerNames = ["depthSampler"];
        const defines = [];
        this.dispose(true);
        if (!this._camera) {
            return;
        }
        const texture = this._depthRenderTarget.enableBlur ? this._depthRenderTarget.textureBlur : this._depthRenderTarget.texture;
        const texelSize = new Vector2(1 / texture.getSize().width, 1 / texture.getSize().height);
        if (this._scene.useRightHandedSystem) {
            defines.push("#define FLUIDRENDERING_RHS");
        }
        if (this._environmentMap !== null) {
            const envMap = (_a = this._environmentMap) !== null && _a !== void 0 ? _a : this._scene.environmentTexture;
            if (envMap) {
                samplerNames.push("reflectionSampler");
                defines.push("#define FLUIDRENDERING_ENVIRONMENT");
            }
        }
        if (this._diffuseRenderTarget) {
            samplerNames.push("diffuseSampler");
            defines.push("#define FLUIDRENDERING_DIFFUSETEXTURE");
        }
        else {
            uniformNames.push("diffuseColor");
        }
        if (this._useVelocity) {
            samplerNames.push("velocitySampler");
            defines.push("#define FLUIDRENDERING_VELOCITY");
        }
        if (this._useFixedThickness) {
            uniformNames.push("thickness");
            samplerNames.push("bgDepthSampler");
            defines.push("#define FLUIDRENDERING_FIXED_THICKNESS");
        }
        else {
            uniformNames.push("minimumThickness");
            samplerNames.push("thicknessSampler");
        }
        if (this._debug) {
            defines.push("#define FLUIDRENDERING_DEBUG");
            if (this._debugFeature === FluidRenderingDebug.Normals) {
                defines.push("#define FLUIDRENDERING_DEBUG_SHOWNORMAL");
            }
            else if (this._debugFeature === FluidRenderingDebug.DiffuseRendering) {
                defines.push("#define FLUIDRENDERING_DEBUG_DIFFUSERENDERING");
            }
            else {
                defines.push("#define FLUIDRENDERING_DEBUG_TEXTURE");
                samplerNames.push("debugSampler");
                if (this._debugFeature === FluidRenderingDebug.DepthTexture || this._debugFeature === FluidRenderingDebug.DepthBlurredTexture) {
                    defines.push("#define FLUIDRENDERING_DEBUG_DEPTH");
                }
            }
        }
        this._renderPostProcess = new PostProcess("FluidRendering", "fluidRenderingRender", uniformNames, samplerNames, 1, null, 2, engine, false, null, 0, undefined, undefined, true, undefined);
        this._renderPostProcess.updateEffect(defines.join("\n"));
        this._renderPostProcess.samples = this._samples;
        this._renderPostProcess.onApplyObservable.add((effect) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
            this._invProjectionMatrix.copyFrom(this._scene.getProjectionMatrix());
            this._invProjectionMatrix.invert();
            if (engine.isWebGPU) {
                effect.setTextureSampler("textureSamplerSampler", this._renderPostProcess.inputTexture.texture);
            }
            if (!this._depthRenderTarget.enableBlur) {
                effect.setTexture("depthSampler", this._depthRenderTarget.texture);
                if (engine.isWebGPU) {
                    effect.setTextureSampler("depthSamplerSampler", (_b = (_a = this._depthRenderTarget.texture) === null || _a === void 0 ? void 0 : _a.getInternalTexture()) !== null && _b !== void 0 ? _b : null);
                }
            }
            else {
                effect.setTexture("depthSampler", this._depthRenderTarget.textureBlur);
                if (engine.isWebGPU) {
                    effect.setTextureSampler("depthSamplerSampler", (_d = (_c = this._depthRenderTarget.textureBlur) === null || _c === void 0 ? void 0 : _c.getInternalTexture()) !== null && _d !== void 0 ? _d : null);
                }
            }
            if (this._diffuseRenderTarget) {
                if (!this._diffuseRenderTarget.enableBlur) {
                    effect.setTexture("diffuseSampler", this._diffuseRenderTarget.texture);
                    if (engine.isWebGPU) {
                        effect.setTextureSampler("diffuseSamplerSampler", (_f = (_e = this._diffuseRenderTarget.texture) === null || _e === void 0 ? void 0 : _e.getInternalTexture()) !== null && _f !== void 0 ? _f : null);
                    }
                }
                else {
                    effect.setTexture("diffuseSampler", this._diffuseRenderTarget.textureBlur);
                    if (engine.isWebGPU) {
                        effect.setTextureSampler("diffuseSamplerSampler", (_h = (_g = this._diffuseRenderTarget.textureBlur) === null || _g === void 0 ? void 0 : _g.getInternalTexture()) !== null && _h !== void 0 ? _h : null);
                    }
                }
            }
            else {
                effect.setColor3("diffuseColor", this.fluidColor);
            }
            if (this._useFixedThickness) {
                effect.setFloat("thickness", this.minimumThickness);
                effect._bindTexture("bgDepthSampler", this._bgDepthTexture);
                if (engine.isWebGPU) {
                    effect.setTextureSampler("bgDepthSamplerSampler", (_j = this._bgDepthTexture) !== null && _j !== void 0 ? _j : null);
                }
            }
            else {
                if (!this._thicknessRenderTarget.enableBlur) {
                    effect.setTexture("thicknessSampler", this._thicknessRenderTarget.texture);
                    if (engine.isWebGPU) {
                        effect.setTextureSampler("thicknessSamplerSampler", (_l = (_k = this._thicknessRenderTarget.texture) === null || _k === void 0 ? void 0 : _k.getInternalTexture()) !== null && _l !== void 0 ? _l : null);
                    }
                }
                else {
                    effect.setTexture("thicknessSampler", this._thicknessRenderTarget.textureBlur);
                    if (engine.isWebGPU) {
                        effect.setTextureSampler("thicknessSamplerSampler", (_o = (_m = this._thicknessRenderTarget.textureBlur) === null || _m === void 0 ? void 0 : _m.getInternalTexture()) !== null && _o !== void 0 ? _o : null);
                    }
                }
                effect.setFloat("minimumThickness", this.minimumThickness);
            }
            if (this._environmentMap !== null) {
                const envMap = (_p = this._environmentMap) !== null && _p !== void 0 ? _p : this._scene.environmentTexture;
                if (envMap) {
                    effect.setTexture("reflectionSampler", envMap);
                    if (engine.isWebGPU) {
                        effect.setTextureSampler("reflectionSamplerSampler", (_q = envMap === null || envMap === void 0 ? void 0 : envMap.getInternalTexture()) !== null && _q !== void 0 ? _q : null);
                    }
                }
            }
            effect.setMatrix("viewMatrix", this._scene.getViewMatrix());
            effect.setMatrix("invProjectionMatrix", this._invProjectionMatrix);
            effect.setMatrix("projectionMatrix", this._scene.getProjectionMatrix());
            effect.setVector2("texelSize", texelSize);
            effect.setFloat("density", this.density);
            effect.setFloat("refractionStrength", this.refractionStrength);
            effect.setFloat("fresnelClamp", this.fresnelClamp);
            effect.setFloat("specularPower", this.specularPower);
            effect.setVector3("dirLight", this.dirLight);
            effect.setFloat("cameraFar", this._camera.maxZ);
            if (this._debug) {
                let texture = null;
                switch (this._debugFeature) {
                    case FluidRenderingDebug.DepthTexture:
                        texture = this._depthRenderTarget.texture;
                        break;
                    case FluidRenderingDebug.DepthBlurredTexture:
                        texture = this._depthRenderTarget.enableBlur ? this._depthRenderTarget.textureBlur : this._depthRenderTarget.texture;
                        break;
                    case FluidRenderingDebug.ThicknessTexture:
                        texture = (_s = (_r = this._thicknessRenderTarget) === null || _r === void 0 ? void 0 : _r.texture) !== null && _s !== void 0 ? _s : null;
                        break;
                    case FluidRenderingDebug.ThicknessBlurredTexture:
                        texture = ((_t = this._thicknessRenderTarget) === null || _t === void 0 ? void 0 : _t.enableBlur) ? (_v = (_u = this._thicknessRenderTarget) === null || _u === void 0 ? void 0 : _u.textureBlur) !== null && _v !== void 0 ? _v : null : (_x = (_w = this._thicknessRenderTarget) === null || _w === void 0 ? void 0 : _w.texture) !== null && _x !== void 0 ? _x : null;
                        break;
                    case FluidRenderingDebug.DiffuseTexture:
                        if (this._diffuseRenderTarget) {
                            texture = this._diffuseRenderTarget.texture;
                        }
                        break;
                }
                if (this._debugFeature !== FluidRenderingDebug.Normals) {
                    effect.setTexture("debugSampler", texture);
                    if (engine.isWebGPU) {
                        effect.setTextureSampler("debugSamplerSampler", (_y = texture === null || texture === void 0 ? void 0 : texture.getInternalTexture()) !== null && _y !== void 0 ? _y : null);
                    }
                }
            }
        });
    }
    /** @internal */
    _clearTargets() {
        var _a, _b, _c;
        if ((_a = this._depthRenderTarget) === null || _a === void 0 ? void 0 : _a.renderTarget) {
            this._engine.bindFramebuffer(this._depthRenderTarget.renderTarget);
            this._engine.clear(this._depthClearColor, true, true, false);
            this._engine.unBindFramebuffer(this._depthRenderTarget.renderTarget);
        }
        if ((_b = this._diffuseRenderTarget) === null || _b === void 0 ? void 0 : _b.renderTarget) {
            this._engine.bindFramebuffer(this._diffuseRenderTarget.renderTarget);
            this._engine.clear(this._thicknessClearColor, true, true, false);
            this._engine.unBindFramebuffer(this._diffuseRenderTarget.renderTarget);
        }
        if ((_c = this._thicknessRenderTarget) === null || _c === void 0 ? void 0 : _c.renderTarget) {
            this._engine.bindFramebuffer(this._thicknessRenderTarget.renderTarget);
            // we don't clear the depth buffer because it is the depth buffer that is coming from the scene and that we reuse in the thickness rendering pass
            this._engine.clear(this._thicknessClearColor, true, false, false);
            this._engine.unBindFramebuffer(this._thicknessRenderTarget.renderTarget);
        }
    }
    /** @internal */
    _render(fluidObject) {
        var _a, _b, _c, _d, _e, _f;
        if (this._needInitialization || !fluidObject.isReady()) {
            return;
        }
        const currentRenderTarget = this._engine._currentRenderTarget;
        this._engine.setState(false, undefined, undefined, undefined, true);
        this._engine.setDepthBuffer(true);
        this._engine.setDepthWrite(true);
        this._engine.setAlphaMode(0);
        // Render the particles in the depth texture
        if ((_a = this._depthRenderTarget) === null || _a === void 0 ? void 0 : _a.renderTarget) {
            this._engine.bindFramebuffer(this._depthRenderTarget.renderTarget);
            fluidObject.renderDepthTexture();
            this._engine.unbindInstanceAttributes();
            this._engine.unBindFramebuffer(this._depthRenderTarget.renderTarget);
        }
        // Render the particles in the diffuse texture
        if ((_b = this._diffuseRenderTarget) === null || _b === void 0 ? void 0 : _b.renderTarget) {
            this._engine.bindFramebuffer(this._diffuseRenderTarget.renderTarget);
            fluidObject.renderDiffuseTexture();
            this._engine.unbindInstanceAttributes();
            this._engine.unBindFramebuffer(this._diffuseRenderTarget.renderTarget);
        }
        // Render the particles in the thickness texture
        if ((_c = this._thicknessRenderTarget) === null || _c === void 0 ? void 0 : _c.renderTarget) {
            this._engine.bindFramebuffer(this._thicknessRenderTarget.renderTarget);
            fluidObject.renderThicknessTexture();
            this._engine.unbindInstanceAttributes();
            this._engine.unBindFramebuffer(this._thicknessRenderTarget.renderTarget);
        }
        // Run the blur post processes
        (_d = this._depthRenderTarget) === null || _d === void 0 ? void 0 : _d.applyBlurPostProcesses();
        (_e = this._diffuseRenderTarget) === null || _e === void 0 ? void 0 : _e.applyBlurPostProcesses();
        (_f = this._thicknessRenderTarget) === null || _f === void 0 ? void 0 : _f.applyBlurPostProcesses();
        if (currentRenderTarget) {
            this._engine.bindFramebuffer(currentRenderTarget);
        }
    }
    /**
     * Releases all the ressources used by the class
     * @param onlyPostProcesses If true, releases only the ressources used by the render post processes
     */
    dispose(onlyPostProcesses = false) {
        var _a, _b, _c, _d;
        if (!onlyPostProcesses) {
            (_a = this._depthRenderTarget) === null || _a === void 0 ? void 0 : _a.dispose();
            this._depthRenderTarget = null;
            (_b = this._diffuseRenderTarget) === null || _b === void 0 ? void 0 : _b.dispose();
            this._diffuseRenderTarget = null;
            (_c = this._thicknessRenderTarget) === null || _c === void 0 ? void 0 : _c.dispose();
            this._thicknessRenderTarget = null;
        }
        if (this._renderPostProcess && this._camera) {
            this._camera.detachPostProcess(this._renderPostProcess);
        }
        (_d = this._renderPostProcess) === null || _d === void 0 ? void 0 : _d.dispose();
        this._renderPostProcess = null;
        this._needInitialization = false;
    }
}
//# sourceMappingURL=fluidRenderingTargetRenderer.js.map