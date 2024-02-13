import { NodeMaterialBlock } from "../../nodeMaterialBlock.js";
import { NodeMaterialBlockConnectionPointTypes } from "../../Enums/nodeMaterialBlockConnectionPointTypes.js";
import { NodeMaterialConnectionPointDirection } from "../../nodeMaterialBlockConnectionPoint.js";
import { NodeMaterialBlockTargets } from "../../Enums/nodeMaterialBlockTargets.js";
import { RegisterClass } from "../../../../Misc/typeStore.js";
import { NodeMaterialConnectionPointCustomObject } from "../../nodeMaterialConnectionPointCustomObject.js";

import { ImageSourceBlock } from "../Dual/imageSourceBlock.js";
/**
 * Block used to read from prepass textures
 */
export class PrePassTextureBlock extends NodeMaterialBlock {
    /**
     * The texture associated with the node is the prepass texture
     */
    get texture() {
        return null;
    }
    set texture(value) {
        return;
    }
    /**
     * Creates a new PrePassTextureBlock
     * @param name defines the block name
     * @param target defines the target of that block (VertexAndFragment by default)
     */
    constructor(name, target = NodeMaterialBlockTargets.VertexAndFragment) {
        super(name, target, false);
        this.registerOutput("position", NodeMaterialBlockConnectionPointTypes.Object, NodeMaterialBlockTargets.VertexAndFragment, new NodeMaterialConnectionPointCustomObject("position", this, NodeMaterialConnectionPointDirection.Output, ImageSourceBlock, "ImageSourceBlock"));
        this.registerOutput("depth", NodeMaterialBlockConnectionPointTypes.Object, NodeMaterialBlockTargets.VertexAndFragment, new NodeMaterialConnectionPointCustomObject("depth", this, NodeMaterialConnectionPointDirection.Output, ImageSourceBlock, "ImageSourceBlock"));
        this.registerOutput("normal", NodeMaterialBlockConnectionPointTypes.Object, NodeMaterialBlockTargets.VertexAndFragment, new NodeMaterialConnectionPointCustomObject("normal", this, NodeMaterialConnectionPointDirection.Output, ImageSourceBlock, "ImageSourceBlock"));
    }
    /**
     * Returns the sampler name associated with the node connection point
     * @param output defines the connection point to get the associated sampler name
     * @returns
     */
    getSamplerName(output) {
        if (output === this._outputs[0]) {
            return this._positionSamplerName;
        }
        if (output === this._outputs[1]) {
            return this._depthSamplerName;
        }
        if (output === this._outputs[2]) {
            return this._normalSamplerName;
        }
        return "";
    }
    /**
     * Gets the position texture
     */
    get position() {
        return this._outputs[0];
    }
    /**
     * Gets the depth texture
     */
    get depth() {
        return this._outputs[1];
    }
    /**
     * Gets the normal texture
     */
    get normal() {
        return this._outputs[2];
    }
    /**
     * Gets the sampler name associated with this image source
     */
    get positionSamplerName() {
        return this._positionSamplerName;
    }
    /**
     * Gets the sampler name associated with this image source
     */
    get normalSamplerName() {
        return this._normalSamplerName;
    }
    /**
     * Gets the sampler name associated with this image source
     */
    get depthSamplerName() {
        return this._depthSamplerName;
    }
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName() {
        return "PrePassTextureBlock";
    }
    _buildBlock(state) {
        super._buildBlock(state);
        if (state.target === NodeMaterialBlockTargets.Vertex) {
            return;
        }
        this._positionSamplerName = "prepassPositionSampler";
        this._depthSamplerName = "prepassDepthSampler";
        this._normalSamplerName = "prepassNormalSampler";
        // Unique sampler names for every prepasstexture block
        state.sharedData.variableNames.prepassPositionSampler = 0;
        state.sharedData.variableNames.prepassDepthSampler = 0;
        state.sharedData.variableNames.prepassNormalSampler = 0;
        // Declarations
        state.sharedData.textureBlocks.push(this);
        state.sharedData.bindableBlocks.push(this);
        state._emit2DSampler(this._positionSamplerName);
        state._emit2DSampler(this._depthSamplerName);
        state._emit2DSampler(this._normalSamplerName);
        return this;
    }
    bind(effect, nodeMaterial) {
        const scene = nodeMaterial.getScene();
        const prePassRenderer = scene.enablePrePassRenderer();
        if (!prePassRenderer) {
            return;
        }
        const sceneRT = prePassRenderer.defaultRT;
        if (!sceneRT.textures) {
            return;
        }
        if (this.position.isConnected) {
            effect.setTexture(this._positionSamplerName, sceneRT.textures[prePassRenderer.getIndex(1)]);
        }
        if (this.depth.isConnected) {
            effect.setTexture(this._depthSamplerName, sceneRT.textures[prePassRenderer.getIndex(5)]);
        }
        if (this.normal.isConnected) {
            effect.setTexture(this._normalSamplerName, sceneRT.textures[prePassRenderer.getIndex(6)]);
        }
    }
}
RegisterClass("BABYLON.PrePassTextureBlock", PrePassTextureBlock);
//# sourceMappingURL=prePassTextureBlock.js.map