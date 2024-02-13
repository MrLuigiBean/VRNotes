import { EffectRenderer, EffectWrapper } from "../Materials/effectRenderer.js";

import "../Shaders/copyTextureToTexture.fragment.js";
/**
 * Conversion modes available when copying a texture into another one
 */
export var ConversionMode;
(function (ConversionMode) {
    ConversionMode[ConversionMode["None"] = 0] = "None";
    ConversionMode[ConversionMode["ToLinearSpace"] = 1] = "ToLinearSpace";
    ConversionMode[ConversionMode["ToGammaSpace"] = 2] = "ToGammaSpace";
})(ConversionMode || (ConversionMode = {}));
/**
 * Class used for fast copy from one texture to another
 */
export class CopyTextureToTexture {
    _textureIsInternal(texture) {
        return texture.getInternalTexture === undefined;
    }
    /**
     * Constructs a new instance of the class
     * @param engine The engine to use for the copy
     * @param isDepthTexture True means that we should write (using gl_FragDepth) into the depth texture attached to the destination (default: false)
     */
    constructor(engine, isDepthTexture = false) {
        this._engine = engine;
        this._isDepthTexture = isDepthTexture;
        this._renderer = new EffectRenderer(engine);
        this._effectWrapper = new EffectWrapper({
            engine: engine,
            name: "CopyTextureToTexture",
            fragmentShader: "copyTextureToTexture",
            useShaderStore: true,
            uniformNames: ["conversion"],
            samplerNames: ["textureSampler"],
            defines: isDepthTexture ? ["#define DEPTH_TEXTURE"] : [],
        });
        this._effectWrapper.onApplyObservable.add(() => {
            if (isDepthTexture) {
                engine.setState(false);
                engine.setDepthBuffer(true);
                engine.depthCullingState.depthMask = true;
                engine.depthCullingState.depthFunc = 519;
            }
            if (this._textureIsInternal(this._source)) {
                this._effectWrapper.effect._bindTexture("textureSampler", this._source);
            }
            else {
                this._effectWrapper.effect.setTexture("textureSampler", this._source);
            }
            this._effectWrapper.effect.setFloat("conversion", this._conversion);
        });
    }
    /**
     * Indicates if the effect is ready to be used for the copy
     * @returns true if "copy" can be called without delay, else false
     */
    isReady() {
        return this._effectWrapper.effect.isReady();
    }
    /**
     * Copy one texture into another
     * @param source The source texture
     * @param destination The destination texture
     * @param conversion The conversion mode that should be applied when copying
     * @returns
     */
    copy(source, destination, conversion = ConversionMode.None) {
        if (!this.isReady()) {
            return false;
        }
        this._source = source;
        this._conversion = conversion;
        const engineDepthFunc = this._engine.depthCullingState.depthFunc;
        this._renderer.render(this._effectWrapper, destination);
        if (this._isDepthTexture && engineDepthFunc) {
            this._engine.depthCullingState.depthFunc = engineDepthFunc;
        }
        return true;
    }
    /**
     * Releases all the resources used by the class
     */
    dispose() {
        this._effectWrapper.dispose();
        this._renderer.dispose();
    }
}
//# sourceMappingURL=copyTextureToTexture.js.map