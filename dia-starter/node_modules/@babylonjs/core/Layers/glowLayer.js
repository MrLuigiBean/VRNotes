import { __decorate } from "../tslib.es6.js";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { serialize, SerializationHelper } from "../Misc/decorators.js";
import { Vector2 } from "../Maths/math.vector.js";
import { VertexBuffer } from "../Buffers/buffer.js";
import { Texture } from "../Materials/Textures/texture.js";
import { RenderTargetTexture } from "../Materials/Textures/renderTargetTexture.js";
import { Material } from "../Materials/material.js";
import { BlurPostProcess } from "../PostProcesses/blurPostProcess.js";
import { EffectLayer } from "./effectLayer.js";
import { AbstractScene } from "../abstractScene.js";

import { RegisterClass } from "../Misc/typeStore.js";
import { Engine } from "../Engines/engine.js";
import { Color4 } from "../Maths/math.color.js";
import "../Shaders/glowMapMerge.fragment.js";
import "../Shaders/glowMapMerge.vertex.js";
import "../Layers/effectLayerSceneComponent.js";
AbstractScene.prototype.getGlowLayerByName = function (name) {
    var _a;
    for (let index = 0; index < ((_a = this.effectLayers) === null || _a === void 0 ? void 0 : _a.length); index++) {
        if (this.effectLayers[index].name === name && this.effectLayers[index].getEffectName() === GlowLayer.EffectName) {
            return this.effectLayers[index];
        }
    }
    return null;
};
/**
 * The glow layer Helps adding a glow effect around the emissive parts of a mesh.
 *
 * Once instantiated in a scene, by default, all the emissive meshes will glow.
 *
 * Documentation: https://doc.babylonjs.com/features/featuresDeepDive/mesh/glowLayer
 */
export class GlowLayer extends EffectLayer {
    /**
     * Sets the kernel size of the blur.
     */
    set blurKernelSize(value) {
        if (value === this._options.blurKernelSize) {
            return;
        }
        this._options.blurKernelSize = value;
        const effectiveKernel = this._getEffectiveBlurKernelSize();
        this._horizontalBlurPostprocess1.kernel = effectiveKernel;
        this._verticalBlurPostprocess1.kernel = effectiveKernel;
        this._horizontalBlurPostprocess2.kernel = effectiveKernel;
        this._verticalBlurPostprocess2.kernel = effectiveKernel;
    }
    /**
     * Gets the kernel size of the blur.
     */
    get blurKernelSize() {
        return this._options.blurKernelSize;
    }
    /**
     * Sets the glow intensity.
     */
    set intensity(value) {
        this._intensity = value;
    }
    /**
     * Gets the glow intensity.
     */
    get intensity() {
        return this._intensity;
    }
    /**
     * Instantiates a new glow Layer and references it to the scene.
     * @param name The name of the layer
     * @param scene The scene to use the layer in
     * @param options Sets of none mandatory options to use with the layer (see IGlowLayerOptions for more information)
     */
    constructor(name, scene, options) {
        super(name, scene);
        this._intensity = 1.0;
        this._includedOnlyMeshes = [];
        this._excludedMeshes = [];
        this._meshesUsingTheirOwnMaterials = [];
        this.neutralColor = new Color4(0, 0, 0, 1);
        // Adapt options
        this._options = Object.assign({ mainTextureRatio: GlowLayer.DefaultTextureRatio, blurKernelSize: 32, mainTextureFixedSize: undefined, camera: null, mainTextureSamples: 1, renderingGroupId: -1, ldrMerge: false, alphaBlendingMode: 1, mainTextureType: 0, generateStencilBuffer: false }, options);
        // Initialize the layer
        this._init({
            alphaBlendingMode: this._options.alphaBlendingMode,
            camera: this._options.camera,
            mainTextureFixedSize: this._options.mainTextureFixedSize,
            mainTextureRatio: this._options.mainTextureRatio,
            renderingGroupId: this._options.renderingGroupId,
            mainTextureType: this._options.mainTextureType,
            generateStencilBuffer: this._options.generateStencilBuffer,
        });
    }
    /**
     * Get the effect name of the layer.
     * @returns The effect name
     */
    getEffectName() {
        return GlowLayer.EffectName;
    }
    /**
     * Create the merge effect. This is the shader use to blit the information back
     * to the main canvas at the end of the scene rendering.
     */
    _createMergeEffect() {
        let defines = "#define EMISSIVE \n";
        if (this._options.ldrMerge) {
            defines += "#define LDR \n";
        }
        // Effect
        return this._engine.createEffect("glowMapMerge", [VertexBuffer.PositionKind], ["offset"], ["textureSampler", "textureSampler2"], defines);
    }
    /**
     * Creates the render target textures and post processes used in the glow layer.
     */
    _createTextureAndPostProcesses() {
        let blurTextureWidth = this._mainTextureDesiredSize.width;
        let blurTextureHeight = this._mainTextureDesiredSize.height;
        blurTextureWidth = this._engine.needPOTTextures ? Engine.GetExponentOfTwo(blurTextureWidth, this._maxSize) : blurTextureWidth;
        blurTextureHeight = this._engine.needPOTTextures ? Engine.GetExponentOfTwo(blurTextureHeight, this._maxSize) : blurTextureHeight;
        let textureType = 0;
        if (this._engine.getCaps().textureHalfFloatRender) {
            textureType = 2;
        }
        else {
            textureType = 0;
        }
        this._blurTexture1 = new RenderTargetTexture("GlowLayerBlurRTT", {
            width: blurTextureWidth,
            height: blurTextureHeight,
        }, this._scene, false, true, textureType);
        this._blurTexture1.wrapU = Texture.CLAMP_ADDRESSMODE;
        this._blurTexture1.wrapV = Texture.CLAMP_ADDRESSMODE;
        this._blurTexture1.updateSamplingMode(Texture.BILINEAR_SAMPLINGMODE);
        this._blurTexture1.renderParticles = false;
        this._blurTexture1.ignoreCameraViewport = true;
        const blurTextureWidth2 = Math.floor(blurTextureWidth / 2);
        const blurTextureHeight2 = Math.floor(blurTextureHeight / 2);
        this._blurTexture2 = new RenderTargetTexture("GlowLayerBlurRTT2", {
            width: blurTextureWidth2,
            height: blurTextureHeight2,
        }, this._scene, false, true, textureType);
        this._blurTexture2.wrapU = Texture.CLAMP_ADDRESSMODE;
        this._blurTexture2.wrapV = Texture.CLAMP_ADDRESSMODE;
        this._blurTexture2.updateSamplingMode(Texture.BILINEAR_SAMPLINGMODE);
        this._blurTexture2.renderParticles = false;
        this._blurTexture2.ignoreCameraViewport = true;
        this._textures = [this._blurTexture1, this._blurTexture2];
        const effectiveKernel = this._getEffectiveBlurKernelSize();
        this._horizontalBlurPostprocess1 = new BlurPostProcess("GlowLayerHBP1", new Vector2(1.0, 0), effectiveKernel, {
            width: blurTextureWidth,
            height: blurTextureHeight,
        }, null, Texture.BILINEAR_SAMPLINGMODE, this._scene.getEngine(), false, textureType);
        this._horizontalBlurPostprocess1.width = blurTextureWidth;
        this._horizontalBlurPostprocess1.height = blurTextureHeight;
        this._horizontalBlurPostprocess1.externalTextureSamplerBinding = true;
        this._horizontalBlurPostprocess1.onApplyObservable.add((effect) => {
            effect.setTexture("textureSampler", this._mainTexture);
        });
        this._verticalBlurPostprocess1 = new BlurPostProcess("GlowLayerVBP1", new Vector2(0, 1.0), effectiveKernel, {
            width: blurTextureWidth,
            height: blurTextureHeight,
        }, null, Texture.BILINEAR_SAMPLINGMODE, this._scene.getEngine(), false, textureType);
        this._horizontalBlurPostprocess2 = new BlurPostProcess("GlowLayerHBP2", new Vector2(1.0, 0), effectiveKernel, {
            width: blurTextureWidth2,
            height: blurTextureHeight2,
        }, null, Texture.BILINEAR_SAMPLINGMODE, this._scene.getEngine(), false, textureType);
        this._horizontalBlurPostprocess2.width = blurTextureWidth2;
        this._horizontalBlurPostprocess2.height = blurTextureHeight2;
        this._horizontalBlurPostprocess2.externalTextureSamplerBinding = true;
        this._horizontalBlurPostprocess2.onApplyObservable.add((effect) => {
            effect.setTexture("textureSampler", this._blurTexture1);
        });
        this._verticalBlurPostprocess2 = new BlurPostProcess("GlowLayerVBP2", new Vector2(0, 1.0), effectiveKernel, {
            width: blurTextureWidth2,
            height: blurTextureHeight2,
        }, null, Texture.BILINEAR_SAMPLINGMODE, this._scene.getEngine(), false, textureType);
        this._postProcesses = [this._horizontalBlurPostprocess1, this._verticalBlurPostprocess1, this._horizontalBlurPostprocess2, this._verticalBlurPostprocess2];
        this._postProcesses1 = [this._horizontalBlurPostprocess1, this._verticalBlurPostprocess1];
        this._postProcesses2 = [this._horizontalBlurPostprocess2, this._verticalBlurPostprocess2];
        this._mainTexture.samples = this._options.mainTextureSamples;
        this._mainTexture.onAfterUnbindObservable.add(() => {
            const internalTexture = this._blurTexture1.renderTarget;
            if (internalTexture) {
                this._scene.postProcessManager.directRender(this._postProcesses1, internalTexture, true);
                const internalTexture2 = this._blurTexture2.renderTarget;
                if (internalTexture2) {
                    this._scene.postProcessManager.directRender(this._postProcesses2, internalTexture2, true);
                }
                this._engine.unBindFramebuffer(internalTexture2 !== null && internalTexture2 !== void 0 ? internalTexture2 : internalTexture, true);
            }
        });
        // Prevent autoClear.
        this._postProcesses.map((pp) => {
            pp.autoClear = false;
        });
    }
    /**
     * @returns The blur kernel size used by the glow.
     * Note: The value passed in the options is divided by 2 for back compatibility.
     */
    _getEffectiveBlurKernelSize() {
        return this._options.blurKernelSize / 2;
    }
    /**
     * Checks for the readiness of the element composing the layer.
     * @param subMesh the mesh to check for
     * @param useInstances specify whether or not to use instances to render the mesh
     * @returns true if ready otherwise, false
     */
    isReady(subMesh, useInstances) {
        const material = subMesh.getMaterial();
        const mesh = subMesh.getRenderingMesh();
        if (!material || !mesh) {
            return false;
        }
        const emissiveTexture = material.emissiveTexture;
        return super._isReady(subMesh, useInstances, emissiveTexture);
    }
    /**
     * Returns whether or not the layer needs stencil enabled during the mesh rendering.
     */
    needStencil() {
        return false;
    }
    /**
     * Returns true if the mesh can be rendered, otherwise false.
     * @param mesh The mesh to render
     * @param material The material used on the mesh
     * @returns true if it can be rendered otherwise false
     */
    _canRenderMesh(mesh, material) {
        return true;
    }
    /**
     * Implementation specific of rendering the generating effect on the main canvas.
     * @param effect The effect used to render through
     */
    _internalRender(effect) {
        // Texture
        effect.setTexture("textureSampler", this._blurTexture1);
        effect.setTexture("textureSampler2", this._blurTexture2);
        effect.setFloat("offset", this._intensity);
        // Cache
        const engine = this._engine;
        const previousStencilBuffer = engine.getStencilBuffer();
        // Draw order
        engine.setStencilBuffer(false);
        engine.drawElementsType(Material.TriangleFillMode, 0, 6);
        // Draw order
        engine.setStencilBuffer(previousStencilBuffer);
    }
    /**
     * Sets the required values for both the emissive texture and and the main color.
     * @param mesh
     * @param subMesh
     * @param material
     */
    _setEmissiveTextureAndColor(mesh, subMesh, material) {
        var _a;
        let textureLevel = 1.0;
        if (this.customEmissiveTextureSelector) {
            this._emissiveTextureAndColor.texture = this.customEmissiveTextureSelector(mesh, subMesh, material);
        }
        else {
            if (material) {
                this._emissiveTextureAndColor.texture = material.emissiveTexture;
                if (this._emissiveTextureAndColor.texture) {
                    textureLevel = this._emissiveTextureAndColor.texture.level;
                }
            }
            else {
                this._emissiveTextureAndColor.texture = null;
            }
        }
        if (this.customEmissiveColorSelector) {
            this.customEmissiveColorSelector(mesh, subMesh, material, this._emissiveTextureAndColor.color);
        }
        else {
            if (material.emissiveColor) {
                const emissiveIntensity = (_a = material.emissiveIntensity) !== null && _a !== void 0 ? _a : 1;
                textureLevel *= emissiveIntensity;
                this._emissiveTextureAndColor.color.set(material.emissiveColor.r * textureLevel, material.emissiveColor.g * textureLevel, material.emissiveColor.b * textureLevel, material.alpha);
            }
            else {
                this._emissiveTextureAndColor.color.set(this.neutralColor.r, this.neutralColor.g, this.neutralColor.b, this.neutralColor.a);
            }
        }
    }
    /**
     * Returns true if the mesh should render, otherwise false.
     * @param mesh The mesh to render
     * @returns true if it should render otherwise false
     */
    _shouldRenderMesh(mesh) {
        return this.hasMesh(mesh);
    }
    /**
     * Adds specific effects defines.
     * @param defines The defines to add specifics to.
     */
    _addCustomEffectDefines(defines) {
        defines.push("#define GLOW");
    }
    /**
     * Add a mesh in the exclusion list to prevent it to impact or being impacted by the glow layer.
     * @param mesh The mesh to exclude from the glow layer
     */
    addExcludedMesh(mesh) {
        if (this._excludedMeshes.indexOf(mesh.uniqueId) === -1) {
            this._excludedMeshes.push(mesh.uniqueId);
        }
    }
    /**
     * Remove a mesh from the exclusion list to let it impact or being impacted by the glow layer.
     * @param mesh The mesh to remove
     */
    removeExcludedMesh(mesh) {
        const index = this._excludedMeshes.indexOf(mesh.uniqueId);
        if (index !== -1) {
            this._excludedMeshes.splice(index, 1);
        }
    }
    /**
     * Add a mesh in the inclusion list to impact or being impacted by the glow layer.
     * @param mesh The mesh to include in the glow layer
     */
    addIncludedOnlyMesh(mesh) {
        if (this._includedOnlyMeshes.indexOf(mesh.uniqueId) === -1) {
            this._includedOnlyMeshes.push(mesh.uniqueId);
        }
    }
    /**
     * Remove a mesh from the Inclusion list to prevent it to impact or being impacted by the glow layer.
     * @param mesh The mesh to remove
     */
    removeIncludedOnlyMesh(mesh) {
        const index = this._includedOnlyMeshes.indexOf(mesh.uniqueId);
        if (index !== -1) {
            this._includedOnlyMeshes.splice(index, 1);
        }
    }
    /**
     * Determine if a given mesh will be used in the glow layer
     * @param mesh The mesh to test
     * @returns true if the mesh will be highlighted by the current glow layer
     */
    hasMesh(mesh) {
        if (!super.hasMesh(mesh)) {
            return false;
        }
        // Included Mesh
        if (this._includedOnlyMeshes.length) {
            return this._includedOnlyMeshes.indexOf(mesh.uniqueId) !== -1;
        }
        // Excluded Mesh
        if (this._excludedMeshes.length) {
            return this._excludedMeshes.indexOf(mesh.uniqueId) === -1;
        }
        return true;
    }
    /**
     * Defines whether the current material of the mesh should be use to render the effect.
     * @param mesh defines the current mesh to render
     */
    _useMeshMaterial(mesh) {
        if (this._meshesUsingTheirOwnMaterials.length == 0) {
            return false;
        }
        return this._meshesUsingTheirOwnMaterials.indexOf(mesh.uniqueId) > -1;
    }
    /**
     * Add a mesh to be rendered through its own material and not with emissive only.
     * @param mesh The mesh for which we need to use its material
     */
    referenceMeshToUseItsOwnMaterial(mesh) {
        mesh.resetDrawCache(this._mainTexture.renderPassId);
        this._meshesUsingTheirOwnMaterials.push(mesh.uniqueId);
        mesh.onDisposeObservable.add(() => {
            this._disposeMesh(mesh);
        });
    }
    /**
     * Remove a mesh from being rendered through its own material and not with emissive only.
     * @param mesh The mesh for which we need to not use its material
     */
    unReferenceMeshFromUsingItsOwnMaterial(mesh) {
        let index = this._meshesUsingTheirOwnMaterials.indexOf(mesh.uniqueId);
        while (index >= 0) {
            this._meshesUsingTheirOwnMaterials.splice(index, 1);
            index = this._meshesUsingTheirOwnMaterials.indexOf(mesh.uniqueId);
        }
        mesh.resetDrawCache(this._mainTexture.renderPassId);
    }
    /**
     * Free any resources and references associated to a mesh.
     * Internal use
     * @param mesh The mesh to free.
     * @internal
     */
    _disposeMesh(mesh) {
        this.removeIncludedOnlyMesh(mesh);
        this.removeExcludedMesh(mesh);
    }
    /**
     * Gets the class name of the effect layer
     * @returns the string with the class name of the effect layer
     */
    getClassName() {
        return "GlowLayer";
    }
    /**
     * Serializes this glow layer
     * @returns a serialized glow layer object
     */
    serialize() {
        const serializationObject = SerializationHelper.Serialize(this);
        serializationObject.customType = "BABYLON.GlowLayer";
        let index;
        // Included meshes
        serializationObject.includedMeshes = [];
        if (this._includedOnlyMeshes.length) {
            for (index = 0; index < this._includedOnlyMeshes.length; index++) {
                const mesh = this._scene.getMeshByUniqueId(this._includedOnlyMeshes[index]);
                if (mesh) {
                    serializationObject.includedMeshes.push(mesh.id);
                }
            }
        }
        // Excluded meshes
        serializationObject.excludedMeshes = [];
        if (this._excludedMeshes.length) {
            for (index = 0; index < this._excludedMeshes.length; index++) {
                const mesh = this._scene.getMeshByUniqueId(this._excludedMeshes[index]);
                if (mesh) {
                    serializationObject.excludedMeshes.push(mesh.id);
                }
            }
        }
        return serializationObject;
    }
    /**
     * Creates a Glow Layer from parsed glow layer data
     * @param parsedGlowLayer defines glow layer data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing the glow layer information
     * @returns a parsed Glow Layer
     */
    static Parse(parsedGlowLayer, scene, rootUrl) {
        const gl = SerializationHelper.Parse(() => new GlowLayer(parsedGlowLayer.name, scene, parsedGlowLayer.options), parsedGlowLayer, scene, rootUrl);
        let index;
        // Excluded meshes
        for (index = 0; index < parsedGlowLayer.excludedMeshes.length; index++) {
            const mesh = scene.getMeshById(parsedGlowLayer.excludedMeshes[index]);
            if (mesh) {
                gl.addExcludedMesh(mesh);
            }
        }
        // Included meshes
        for (index = 0; index < parsedGlowLayer.includedMeshes.length; index++) {
            const mesh = scene.getMeshById(parsedGlowLayer.includedMeshes[index]);
            if (mesh) {
                gl.addIncludedOnlyMesh(mesh);
            }
        }
        return gl;
    }
}
/**
 * Effect Name of the layer.
 */
GlowLayer.EffectName = "GlowLayer";
/**
 * The default blur kernel size used for the glow.
 */
GlowLayer.DefaultBlurKernelSize = 32;
/**
 * The default texture size ratio used for the glow.
 */
GlowLayer.DefaultTextureRatio = 0.5;
__decorate([
    serialize()
], GlowLayer.prototype, "blurKernelSize", null);
__decorate([
    serialize()
], GlowLayer.prototype, "intensity", null);
__decorate([
    serialize("options")
], GlowLayer.prototype, "_options", void 0);
RegisterClass("BABYLON.GlowLayer", GlowLayer);
//# sourceMappingURL=glowLayer.js.map