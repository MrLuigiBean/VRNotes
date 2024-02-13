import { __decorate } from "../../../../tslib.es6.js";
import { NodeMaterialBlock } from "../../nodeMaterialBlock.js";
import { NodeMaterialBlockConnectionPointTypes } from "../../Enums/nodeMaterialBlockConnectionPointTypes.js";
import { NodeMaterialBlockTargets } from "../../Enums/nodeMaterialBlockTargets.js";
import { RegisterClass } from "../../../../Misc/typeStore.js";
import { editableInPropertyPage, PropertyTypeForEdition } from "../../../../Decorators/nodeDecorator.js";
import "../../../../Shaders/ShadersInclude/helperFunctions.js";
import "../../../../Shaders/ShadersInclude/imageProcessingDeclaration.js";
import "../../../../Shaders/ShadersInclude/imageProcessingFunctions.js";
/**
 * Block used to add image processing support to fragment shader
 */
export class ImageProcessingBlock extends NodeMaterialBlock {
    /**
     * Create a new ImageProcessingBlock
     * @param name defines the block name
     */
    constructor(name) {
        super(name, NodeMaterialBlockTargets.Fragment);
        /**
         * Defines if the input should be converted to linear space (default: true)
         */
        this.convertInputToLinearSpace = true;
        this.registerInput("color", NodeMaterialBlockConnectionPointTypes.AutoDetect);
        this.registerOutput("output", NodeMaterialBlockConnectionPointTypes.Color4);
        this.registerOutput("rgb", NodeMaterialBlockConnectionPointTypes.Color3);
        this._inputs[0].addExcludedConnectionPointFromAllowedTypes(NodeMaterialBlockConnectionPointTypes.Color3 |
            NodeMaterialBlockConnectionPointTypes.Color4 |
            NodeMaterialBlockConnectionPointTypes.Vector3 |
            NodeMaterialBlockConnectionPointTypes.Vector4);
    }
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName() {
        return "ImageProcessingBlock";
    }
    /**
     * Gets the color input component
     */
    get color() {
        return this._inputs[0];
    }
    /**
     * Gets the output component
     */
    get output() {
        return this._outputs[0];
    }
    /**
     * Gets the rgb component
     */
    get rgb() {
        return this._outputs[1];
    }
    /**
     * Initialize the block and prepare the context for build
     * @param state defines the state that will be used for the build
     */
    initialize(state) {
        state._excludeVariableName("exposureLinear");
        state._excludeVariableName("contrast");
        state._excludeVariableName("vInverseScreenSize");
        state._excludeVariableName("vignetteSettings1");
        state._excludeVariableName("vignetteSettings2");
        state._excludeVariableName("vCameraColorCurveNegative");
        state._excludeVariableName("vCameraColorCurveNeutral");
        state._excludeVariableName("vCameraColorCurvePositive");
        state._excludeVariableName("txColorTransform");
        state._excludeVariableName("colorTransformSettings");
        state._excludeVariableName("ditherIntensity");
    }
    isReady(mesh, nodeMaterial, defines) {
        if (defines._areImageProcessingDirty && nodeMaterial.imageProcessingConfiguration) {
            if (!nodeMaterial.imageProcessingConfiguration.isReady()) {
                return false;
            }
        }
        return true;
    }
    prepareDefines(mesh, nodeMaterial, defines) {
        if (defines._areImageProcessingDirty && nodeMaterial.imageProcessingConfiguration) {
            nodeMaterial.imageProcessingConfiguration.prepareDefines(defines);
        }
    }
    bind(effect, nodeMaterial, mesh) {
        if (!mesh) {
            return;
        }
        if (!nodeMaterial.imageProcessingConfiguration) {
            return;
        }
        nodeMaterial.imageProcessingConfiguration.bind(effect);
    }
    _buildBlock(state) {
        var _a;
        super._buildBlock(state);
        // Register for defines
        state.sharedData.blocksWithDefines.push(this);
        // Register for blocking
        state.sharedData.blockingBlocks.push(this);
        // Register for binding
        state.sharedData.bindableBlocks.push(this);
        // Uniforms
        state.uniforms.push("exposureLinear");
        state.uniforms.push("contrast");
        state.uniforms.push("vInverseScreenSize");
        state.uniforms.push("vignetteSettings1");
        state.uniforms.push("vignetteSettings2");
        state.uniforms.push("vCameraColorCurveNegative");
        state.uniforms.push("vCameraColorCurveNeutral");
        state.uniforms.push("vCameraColorCurvePositive");
        state.uniforms.push("txColorTransform");
        state.uniforms.push("colorTransformSettings");
        state.uniforms.push("ditherIntensity");
        // Emit code
        const color = this.color;
        const output = this._outputs[0];
        const comments = `//${this.name}`;
        state._emitFunctionFromInclude("helperFunctions", comments);
        state._emitFunctionFromInclude("imageProcessingDeclaration", comments);
        state._emitFunctionFromInclude("imageProcessingFunctions", comments);
        if ((_a = color.connectedPoint) === null || _a === void 0 ? void 0 : _a.isConnected) {
            if (color.connectedPoint.type === NodeMaterialBlockConnectionPointTypes.Color4 || color.connectedPoint.type === NodeMaterialBlockConnectionPointTypes.Vector4) {
                state.compilationString += `${this._declareOutput(output, state)} = ${color.associatedVariableName};\n`;
            }
            else {
                state.compilationString += `${this._declareOutput(output, state)} = vec4(${color.associatedVariableName}, 1.0);\n`;
            }
            state.compilationString += `#ifdef IMAGEPROCESSINGPOSTPROCESS\n`;
            if (this.convertInputToLinearSpace) {
                state.compilationString += `${output.associatedVariableName}.rgb = toLinearSpace(${color.associatedVariableName}.rgb);\n`;
            }
            state.compilationString += `#else\n`;
            state.compilationString += `#ifdef IMAGEPROCESSING\n`;
            if (this.convertInputToLinearSpace) {
                state.compilationString += `${output.associatedVariableName}.rgb = toLinearSpace(${color.associatedVariableName}.rgb);\n`;
            }
            state.compilationString += `${output.associatedVariableName} = applyImageProcessing(${output.associatedVariableName});\n`;
            state.compilationString += `#endif\n`;
            state.compilationString += `#endif\n`;
            if (this.rgb.hasEndpoints) {
                state.compilationString += this._declareOutput(this.rgb, state) + ` = ${this.output.associatedVariableName}.xyz;\n`;
            }
        }
        return this;
    }
    _dumpPropertiesCode() {
        let codeString = super._dumpPropertiesCode();
        codeString += `${this._codeVariableName}.convertInputToLinearSpace = ${this.convertInputToLinearSpace};\n`;
        return codeString;
    }
    serialize() {
        const serializationObject = super.serialize();
        serializationObject.convertInputToLinearSpace = this.convertInputToLinearSpace;
        return serializationObject;
    }
    _deserialize(serializationObject, scene, rootUrl) {
        var _a;
        super._deserialize(serializationObject, scene, rootUrl);
        this.convertInputToLinearSpace = (_a = serializationObject.convertInputToLinearSpace) !== null && _a !== void 0 ? _a : true;
    }
}
__decorate([
    editableInPropertyPage("Convert input to linear space", PropertyTypeForEdition.Boolean, "ADVANCED")
], ImageProcessingBlock.prototype, "convertInputToLinearSpace", void 0);
RegisterClass("BABYLON.ImageProcessingBlock", ImageProcessingBlock);
//# sourceMappingURL=imageProcessingBlock.js.map