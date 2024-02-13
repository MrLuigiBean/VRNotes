import { RawTexture } from "../../Materials/Textures/rawTexture.js";
import { WebXRFeatureName, WebXRFeaturesManager } from "../webXRFeaturesManager.js";
import { WebXRAbstractFeature } from "./WebXRAbstractFeature.js";
import { Tools } from "../../Misc/tools.js";
import { Texture } from "../../Materials/Textures/texture.js";
import { Engine } from "../../Engines/engine.js";
import { Observable } from "../../Misc/observable.js";

import { WebGLHardwareTexture } from "../../Engines/WebGL/webGLHardwareTexture.js";
import { InternalTexture, InternalTextureSource } from "../../Materials/Textures/internalTexture.js";
/**
 * WebXR Feature for WebXR Depth Sensing Module
 * @since 5.49.1
 */
export class WebXRDepthSensing extends WebXRAbstractFeature {
    /**
     * Width of depth data. If depth data is not exist, returns null.
     */
    get width() {
        return this._width;
    }
    /**
     * Height of depth data. If depth data is not exist, returns null.
     */
    get height() {
        return this._height;
    }
    /**
     * Scale factor by which the raw depth values must be multiplied in order to get the depths in meters.
     */
    get rawValueToMeters() {
        return this._rawValueToMeters;
    }
    /**
     * An XRRigidTransform that needs to be applied when indexing into the depth buffer.
     */
    get normDepthBufferFromNormView() {
        return this._normDepthBufferFromNormView;
    }
    /**
     * Describes which depth-sensing usage ("cpu" or "gpu") is used.
     */
    get depthUsage() {
        switch (this._xrSessionManager.session.depthUsage) {
            case "cpu-optimized":
                return "cpu";
            case "gpu-optimized":
                return "gpu";
        }
    }
    /**
     * Describes which depth sensing data format ("ushort" or "float") is used.
     */
    get depthDataFormat() {
        switch (this._xrSessionManager.session.depthDataFormat) {
            case "luminance-alpha":
                return "ushort";
            case "float32":
                return "float";
        }
    }
    /**
     * Latest cached InternalTexture which containing depth buffer information.
     * This can be used when the depth usage is "gpu".
     */
    get latestInternalTexture() {
        var _a, _b;
        if (!this._cachedWebGLTexture) {
            return null;
        }
        const engine = this._xrSessionManager.scene.getEngine();
        const internalTexture = new InternalTexture(engine, InternalTextureSource.Unknown);
        internalTexture.isCube = false;
        internalTexture.invertY = false;
        internalTexture._useSRGBBuffer = false;
        internalTexture.format = this.depthDataFormat === "ushort" ? 2 : 5;
        internalTexture.generateMipMaps = false;
        internalTexture.type = this.depthDataFormat === "ushort" ? 5 : 1;
        internalTexture.samplingMode = 7;
        internalTexture.width = (_a = this.width) !== null && _a !== void 0 ? _a : 0;
        internalTexture.height = (_b = this.height) !== null && _b !== void 0 ? _b : 0;
        internalTexture._cachedWrapU = 1;
        internalTexture._cachedWrapV = 1;
        internalTexture._hardwareTexture = new WebGLHardwareTexture(this._cachedWebGLTexture, engine._gl);
        return internalTexture;
    }
    /**
     * cached depth buffer
     */
    get latestDepthBuffer() {
        if (!this._cachedDepthBuffer) {
            return null;
        }
        return this.depthDataFormat === "ushort" ? new Uint16Array(this._cachedDepthBuffer) : new Float32Array(this._cachedDepthBuffer);
    }
    /**
     * Latest cached Texture of depth image which is made from the depth buffer data.
     */
    get latestDepthImageTexture() {
        return this._cachedDepthImageTexture;
    }
    /**
     * Creates a new instance of the depth sensing feature
     * @param _xrSessionManager the WebXRSessionManager
     * @param options options for WebXR Depth Sensing Feature
     */
    constructor(_xrSessionManager, options) {
        super(_xrSessionManager);
        this.options = options;
        this._width = null;
        this._height = null;
        this._rawValueToMeters = null;
        this._normDepthBufferFromNormView = null;
        this._cachedDepthBuffer = null;
        this._cachedWebGLTexture = null;
        this._cachedDepthImageTexture = null;
        /**
         * Event that notify when `DepthInformation.getDepthInMeters` is available.
         * `getDepthInMeters` method needs active XRFrame (not available for cached XRFrame)
         */
        this.onGetDepthInMetersAvailable = new Observable();
        this.xrNativeFeatureName = "depth-sensing";
        // https://immersive-web.github.io/depth-sensing/
        Tools.Warn("depth-sensing is an experimental and unstable feature.");
    }
    /**
     * attach this feature
     * Will usually be called by the features manager
     *
     * @returns true if successful.
     */
    attach(force) {
        if (!super.attach(force)) {
            return false;
        }
        const isBothDepthUsageAndFormatNull = this._xrSessionManager.session.depthDataFormat == null || this._xrSessionManager.session.depthUsage == null;
        if (isBothDepthUsageAndFormatNull) {
            return false;
        }
        this._glBinding = new XRWebGLBinding(this._xrSessionManager.session, this._xrSessionManager.scene.getEngine()._gl);
        return true;
    }
    /**
     * Dispose this feature and all of the resources attached
     */
    dispose() {
        var _a;
        (_a = this._cachedDepthImageTexture) === null || _a === void 0 ? void 0 : _a.dispose();
    }
    _onXRFrame(_xrFrame) {
        const referenceSPace = this._xrSessionManager.referenceSpace;
        const pose = _xrFrame.getViewerPose(referenceSPace);
        if (pose == null) {
            return;
        }
        for (const view of pose.views) {
            switch (this.depthUsage) {
                case "cpu":
                    this._updateDepthInformationAndTextureCPUDepthUsage(_xrFrame, view, this.depthDataFormat);
                    break;
                case "gpu":
                    if (!this._glBinding) {
                        break;
                    }
                    this._updateDepthInformationAndTextureWebGLDepthUsage(this._glBinding, view, this.depthDataFormat);
                    break;
                default:
                    Tools.Error("Unknown depth usage");
                    this.detach();
                    break;
            }
        }
    }
    _updateDepthInformationAndTextureCPUDepthUsage(frame, view, dataFormat) {
        const depthInfo = frame.getDepthInformation(view);
        if (depthInfo === null) {
            return;
        }
        const { data, width, height, rawValueToMeters, getDepthInMeters } = depthInfo;
        this._width = width;
        this._height = height;
        this._rawValueToMeters = rawValueToMeters;
        this._cachedDepthBuffer = data;
        // to avoid Illegal Invocation error, bind `this`
        this.onGetDepthInMetersAvailable.notifyObservers(getDepthInMeters.bind(depthInfo));
        if (!this._cachedDepthImageTexture) {
            this._cachedDepthImageTexture = RawTexture.CreateRTexture(null, width, height, this._xrSessionManager.scene, false, true, Texture.NEAREST_SAMPLINGMODE, Engine.TEXTURETYPE_FLOAT);
        }
        switch (dataFormat) {
            case "ushort":
                this._cachedDepthImageTexture.update(Float32Array.from(new Uint16Array(data)).map((value) => value * rawValueToMeters));
                break;
            case "float":
                this._cachedDepthImageTexture.update(new Float32Array(data).map((value) => value * rawValueToMeters));
                break;
            default:
                break;
        }
    }
    _updateDepthInformationAndTextureWebGLDepthUsage(webglBinding, view, dataFormat) {
        const depthInfo = webglBinding.getDepthInformation(view);
        if (depthInfo === null) {
            return;
        }
        const { texture, width, height } = depthInfo;
        this._width = width;
        this._height = height;
        this._cachedWebGLTexture = texture;
        const scene = this._xrSessionManager.scene;
        const engine = scene.getEngine();
        const internalTexture = engine.wrapWebGLTexture(texture);
        if (!this._cachedDepthImageTexture) {
            this._cachedDepthImageTexture = RawTexture.CreateRTexture(null, width, height, scene, false, true, Texture.NEAREST_SAMPLINGMODE, dataFormat === "ushort" ? Engine.TEXTURETYPE_UNSIGNED_BYTE : Engine.TEXTURETYPE_FLOAT);
        }
        this._cachedDepthImageTexture._texture = internalTexture;
    }
    /**
     * Extends the session init object if needed
     * @returns augmentation object for the xr session init object.
     */
    getXRSessionInitExtension() {
        const isDepthUsageDeclared = this.options.usagePreference != null && this.options.usagePreference.length !== 0;
        const isDataFormatDeclared = this.options.dataFormatPreference != null && this.options.dataFormatPreference.length !== 0;
        return new Promise((resolve) => {
            if (isDepthUsageDeclared && isDataFormatDeclared) {
                const usages = this.options.usagePreference.map((usage) => {
                    switch (usage) {
                        case "cpu":
                            return "cpu-optimized";
                        case "gpu":
                            return "gpu-optimized";
                    }
                });
                const dataFormats = this.options.dataFormatPreference.map((format) => {
                    switch (format) {
                        case "ushort":
                            return "luminance-alpha";
                        case "float":
                            return "float32";
                    }
                });
                resolve({
                    depthSensing: {
                        usagePreference: usages,
                        dataFormatPreference: dataFormats,
                    },
                });
            }
            else {
                resolve({});
            }
        });
    }
}
/**
 * The module's name
 */
WebXRDepthSensing.Name = WebXRFeatureName.DEPTH_SENSING;
/**
 * The (Babylon) version of this module.
 * This is an integer representing the implementation version.
 * This number does not correspond to the WebXR specs version
 */
WebXRDepthSensing.Version = 1;
WebXRFeaturesManager.AddWebXRFeature(WebXRDepthSensing.Name, (xrSessionManager, options) => {
    return () => new WebXRDepthSensing(xrSessionManager, options);
}, WebXRDepthSensing.Version, false);
//# sourceMappingURL=WebXRDepthSensing.js.map