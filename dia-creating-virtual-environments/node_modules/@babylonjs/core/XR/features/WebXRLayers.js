import { WebXRFeatureName, WebXRFeaturesManager } from "../webXRFeaturesManager.js";
import { WebXRAbstractFeature } from "./WebXRAbstractFeature.js";
import { WebXRLayerRenderTargetTextureProvider } from "../webXRRenderTargetTextureProvider.js";
import { WebXRLayerWrapper } from "../webXRLayerWrapper.js";
import { WebXRWebGLLayerWrapper } from "../webXRWebGLLayer.js";
/**
 * Wraps xr composition layers.
 * @internal
 */
export class WebXRCompositionLayerWrapper extends WebXRLayerWrapper {
    constructor(getWidth, getHeight, layer, layerType, isMultiview, createRTTProvider) {
        super(getWidth, getHeight, layer, layerType, createRTTProvider);
        this.getWidth = getWidth;
        this.getHeight = getHeight;
        this.layer = layer;
        this.layerType = layerType;
        this.isMultiview = isMultiview;
        this.createRTTProvider = createRTTProvider;
    }
}
/**
 * Provides render target textures and other important rendering information for a given XRCompositionLayer.
 * @internal
 */
class WebXRCompositionLayerRenderTargetTextureProvider extends WebXRLayerRenderTargetTextureProvider {
    constructor(_xrSessionManager, _xrWebGLBinding, layerWrapper) {
        super(_xrSessionManager.scene, layerWrapper);
        this._xrSessionManager = _xrSessionManager;
        this._xrWebGLBinding = _xrWebGLBinding;
        this.layerWrapper = layerWrapper;
        this._lastSubImages = new Map();
        this._compositionLayer = layerWrapper.layer;
    }
    _getRenderTargetForSubImage(subImage, eye) {
        var _a, _b, _c, _d;
        const lastSubImage = this._lastSubImages.get(eye);
        const eyeIndex = eye == "left" ? 0 : 1;
        const colorTextureWidth = (_a = subImage.colorTextureWidth) !== null && _a !== void 0 ? _a : subImage.textureWidth;
        const colorTextureHeight = (_b = subImage.colorTextureHeight) !== null && _b !== void 0 ? _b : subImage.textureHeight;
        if (!this._renderTargetTextures[eyeIndex] || (lastSubImage === null || lastSubImage === void 0 ? void 0 : lastSubImage.textureWidth) !== colorTextureWidth || (lastSubImage === null || lastSubImage === void 0 ? void 0 : lastSubImage.textureHeight) !== colorTextureHeight) {
            let depthStencilTexture;
            const depthStencilTextureWidth = (_c = subImage.depthStencilTextureWidth) !== null && _c !== void 0 ? _c : colorTextureWidth;
            const depthStencilTextureHeight = (_d = subImage.depthStencilTextureHeight) !== null && _d !== void 0 ? _d : colorTextureHeight;
            if (colorTextureWidth === depthStencilTextureWidth || colorTextureHeight === depthStencilTextureHeight) {
                depthStencilTexture = subImage.depthStencilTexture;
            }
            this._renderTargetTextures[eyeIndex] = this._createRenderTargetTexture(colorTextureWidth, colorTextureHeight, null, subImage.colorTexture, depthStencilTexture, this.layerWrapper.isMultiview);
            this._framebufferDimensions = {
                framebufferWidth: colorTextureWidth,
                framebufferHeight: colorTextureHeight,
            };
        }
        this._lastSubImages.set(eye, subImage);
        return this._renderTargetTextures[eyeIndex];
    }
    _getSubImageForEye(eye) {
        const currentFrame = this._xrSessionManager.currentFrame;
        if (currentFrame) {
            return this._xrWebGLBinding.getSubImage(this._compositionLayer, currentFrame, eye);
        }
        return null;
    }
    getRenderTargetTextureForEye(eye) {
        const subImage = this._getSubImageForEye(eye);
        if (subImage) {
            return this._getRenderTargetForSubImage(subImage, eye);
        }
        return null;
    }
    getRenderTargetTextureForView(view) {
        return this.getRenderTargetTextureForEye(view.eye);
    }
    _setViewportForSubImage(viewport, subImage) {
        var _a, _b;
        const textureWidth = (_a = subImage.colorTextureWidth) !== null && _a !== void 0 ? _a : subImage.textureWidth;
        const textureHeight = (_b = subImage.colorTextureWidth) !== null && _b !== void 0 ? _b : subImage.textureHeight;
        const xrViewport = subImage.viewport;
        viewport.x = xrViewport.x / textureWidth;
        viewport.y = xrViewport.y / textureHeight;
        viewport.width = xrViewport.width / textureWidth;
        viewport.height = xrViewport.height / textureHeight;
    }
    trySetViewportForView(viewport, view) {
        const subImage = this._lastSubImages.get(view.eye) || this._getSubImageForEye(view.eye);
        if (subImage) {
            this._setViewportForSubImage(viewport, subImage);
            return true;
        }
        return false;
    }
}
/**
 * Wraps xr projection layers.
 * @internal
 */
export class WebXRProjectionLayerWrapper extends WebXRCompositionLayerWrapper {
    constructor(layer, isMultiview, xrGLBinding) {
        super(() => layer.textureWidth, () => layer.textureHeight, layer, "XRProjectionLayer", isMultiview, (sessionManager) => new WebXRProjectionLayerRenderTargetTextureProvider(sessionManager, xrGLBinding, this));
        this.layer = layer;
    }
}
/**
 * Provides render target textures and other important rendering information for a given XRProjectionLayer.
 * @internal
 */
class WebXRProjectionLayerRenderTargetTextureProvider extends WebXRCompositionLayerRenderTargetTextureProvider {
    constructor(_xrSessionManager, _xrWebGLBinding, layerWrapper) {
        super(_xrSessionManager, _xrWebGLBinding, layerWrapper);
        this.layerWrapper = layerWrapper;
        this._projectionLayer = layerWrapper.layer;
    }
    _getSubImageForView(view) {
        return this._xrWebGLBinding.getViewSubImage(this._projectionLayer, view);
    }
    getRenderTargetTextureForView(view) {
        return this._getRenderTargetForSubImage(this._getSubImageForView(view), view.eye);
    }
    getRenderTargetTextureForEye(eye) {
        const lastSubImage = this._lastSubImages.get(eye);
        if (lastSubImage) {
            return this._getRenderTargetForSubImage(lastSubImage, eye);
        }
        return null;
    }
    trySetViewportForView(viewport, view) {
        const subImage = this._lastSubImages.get(view.eye) || this._getSubImageForView(view);
        if (subImage) {
            this._setViewportForSubImage(viewport, subImage);
            return true;
        }
        return false;
    }
}
const defaultXRWebGLLayerInit = {};
const defaultXRProjectionLayerInit = {
    textureType: "texture",
    colorFormat: 0x1908 /* WebGLRenderingContext.RGBA */,
    depthFormat: 0x88f0 /* WebGLRenderingContext.DEPTH24_STENCIL8 */,
    scaleFactor: 1.0,
};
/**
 * Exposes the WebXR Layers API.
 */
export class WebXRLayers extends WebXRAbstractFeature {
    constructor(_xrSessionManager, _options = {}) {
        super(_xrSessionManager);
        this._options = _options;
        /**
         * Already-created layers
         */
        this._existingLayers = [];
        this.xrNativeFeatureName = "layers";
    }
    /**
     * Attach this feature.
     * Will usually be called by the features manager.
     *
     * @returns true if successful.
     */
    attach() {
        if (!super.attach()) {
            return false;
        }
        const engine = this._xrSessionManager.scene.getEngine();
        this._glContext = engine._gl;
        this._xrWebGLBinding = new XRWebGLBinding(this._xrSessionManager.session, this._glContext);
        this._existingLayers.length = 0;
        const projectionLayerInit = Object.assign({}, defaultXRProjectionLayerInit);
        const projectionLayerMultiview = this._options.preferMultiviewOnInit && engine.getCaps().multiview;
        if (projectionLayerMultiview) {
            projectionLayerInit.textureType = "texture-array";
        }
        this.addXRSessionLayer(this.createProjectionLayer(projectionLayerInit, projectionLayerMultiview));
        return true;
    }
    detach() {
        if (!super.detach()) {
            return false;
        }
        this._existingLayers.length = 0;
        return true;
    }
    /**
     * Creates a new XRWebGLLayer.
     * @param params an object providing configuration options for the new XRWebGLLayer
     * @returns the XRWebGLLayer
     */
    createXRWebGLLayer(params = defaultXRWebGLLayerInit) {
        const layer = new XRWebGLLayer(this._xrSessionManager.session, this._glContext, params);
        return new WebXRWebGLLayerWrapper(layer);
    }
    /**
     * Creates a new XRProjectionLayer.
     * @param params an object providing configuration options for the new XRProjectionLayer.
     * @param multiview whether the projection layer should render with multiview.
     * @returns the projection layer
     */
    createProjectionLayer(params = defaultXRProjectionLayerInit, multiview = false) {
        if (multiview && params.textureType !== "texture-array") {
            throw new Error("Projection layers can only be made multiview if they use texture arrays. Set the textureType parameter to 'texture-array'.");
        }
        // TODO (rgerd): Support RTT's that are bound to sub-images in the texture array.
        if (!multiview && params.textureType === "texture-array") {
            throw new Error("We currently only support multiview rendering when the textureType parameter is set to 'texture-array'.");
        }
        const projLayer = this._xrWebGLBinding.createProjectionLayer(params);
        return new WebXRProjectionLayerWrapper(projLayer, multiview, this._xrWebGLBinding);
    }
    /**
     * Add a new layer to the already-existing list of layers
     * @param wrappedLayer the new layer to add to the existing ones
     */
    addXRSessionLayer(wrappedLayer) {
        this.setXRSessionLayers([...this._existingLayers, wrappedLayer]);
    }
    /**
     * Sets the layers to be used by the XR session.
     * Note that you must call this function with any layers you wish to render to
     * since it adds them to the XR session's render state
     * (replacing any layers that were added in a previous call to setXRSessionLayers or updateRenderState).
     * This method also sets up the session manager's render target texture provider
     * as the first layer in the array, which feeds the WebXR camera(s) attached to the session.
     * @param wrappedLayers An array of WebXRLayerWrapper, usually returned from the WebXRLayers createLayer functions.
     */
    setXRSessionLayers(wrappedLayers) {
        this._existingLayers = wrappedLayers;
        const renderStateInit = Object.assign({}, this._xrSessionManager.session.renderState);
        // Clear out the layer-related fields.
        renderStateInit.baseLayer = undefined;
        renderStateInit.layers = wrappedLayers.map((wrappedLayer) => wrappedLayer.layer);
        this._xrSessionManager.updateRenderState(renderStateInit);
        this._xrSessionManager._setBaseLayerWrapper(wrappedLayers.length > 0 ? wrappedLayers[0] : null);
    }
    isCompatible() {
        // TODO (rgerd): Add native support.
        return !this._xrSessionManager.isNative && typeof XRWebGLBinding !== "undefined" && !!XRWebGLBinding.prototype.createProjectionLayer;
    }
    /**
     * Dispose this feature and all of the resources attached.
     */
    dispose() {
        super.dispose();
    }
    _onXRFrame(_xrFrame) {
        /* empty */
    }
}
/**
 * The module's name
 */
WebXRLayers.Name = WebXRFeatureName.LAYERS;
/**
 * The (Babylon) version of this module.
 * This is an integer representing the implementation version.
 * This number does not correspond to the WebXR specs version
 */
WebXRLayers.Version = 1;
//register the plugin
WebXRFeaturesManager.AddWebXRFeature(WebXRLayers.Name, (xrSessionManager, options) => {
    return () => new WebXRLayers(xrSessionManager, options);
}, WebXRLayers.Version, false);
//# sourceMappingURL=WebXRLayers.js.map