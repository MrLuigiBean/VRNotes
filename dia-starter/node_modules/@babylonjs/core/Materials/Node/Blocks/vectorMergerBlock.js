import { NodeMaterialBlock } from "../nodeMaterialBlock.js";
import { NodeMaterialBlockConnectionPointTypes } from "../Enums/nodeMaterialBlockConnectionPointTypes.js";
import { NodeMaterialBlockTargets } from "../Enums/nodeMaterialBlockTargets.js";
import { RegisterClass } from "../../../Misc/typeStore.js";
/**
 * Block used to create a Vector2/3/4 out of individual inputs (one for each component)
 */
export class VectorMergerBlock extends NodeMaterialBlock {
    /**
     * Create a new VectorMergerBlock
     * @param name defines the block name
     */
    constructor(name) {
        super(name, NodeMaterialBlockTargets.Neutral);
        /**
         * Gets or sets the swizzle for x (meaning which component to affect to the output.x)
         */
        this.xSwizzle = "x";
        /**
         * Gets or sets the swizzle for y (meaning which component to affect to the output.y)
         */
        this.ySwizzle = "y";
        /**
         * Gets or sets the swizzle for z (meaning which component to affect to the output.z)
         */
        this.zSwizzle = "z";
        /**
         * Gets or sets the swizzle for w (meaning which component to affect to the output.w)
         */
        this.wSwizzle = "w";
        this.registerInput("xyzw ", NodeMaterialBlockConnectionPointTypes.Vector4, true);
        this.registerInput("xyz ", NodeMaterialBlockConnectionPointTypes.Vector3, true);
        this.registerInput("xy ", NodeMaterialBlockConnectionPointTypes.Vector2, true);
        this.registerInput("zw ", NodeMaterialBlockConnectionPointTypes.Vector2, true);
        this.registerInput("x", NodeMaterialBlockConnectionPointTypes.Float, true);
        this.registerInput("y", NodeMaterialBlockConnectionPointTypes.Float, true);
        this.registerInput("z", NodeMaterialBlockConnectionPointTypes.Float, true);
        this.registerInput("w", NodeMaterialBlockConnectionPointTypes.Float, true);
        this.registerOutput("xyzw", NodeMaterialBlockConnectionPointTypes.Vector4);
        this.registerOutput("xyz", NodeMaterialBlockConnectionPointTypes.Vector3);
        this.registerOutput("xy", NodeMaterialBlockConnectionPointTypes.Vector2);
        this.registerOutput("zw", NodeMaterialBlockConnectionPointTypes.Vector2);
    }
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName() {
        return "VectorMergerBlock";
    }
    /**
     * Gets the xyzw component (input)
     */
    get xyzwIn() {
        return this._inputs[0];
    }
    /**
     * Gets the xyz component (input)
     */
    get xyzIn() {
        return this._inputs[1];
    }
    /**
     * Gets the xy component (input)
     */
    get xyIn() {
        return this._inputs[2];
    }
    /**
     * Gets the zw component (input)
     */
    get zwIn() {
        return this._inputs[3];
    }
    /**
     * Gets the x component (input)
     */
    get x() {
        return this._inputs[4];
    }
    /**
     * Gets the y component (input)
     */
    get y() {
        return this._inputs[5];
    }
    /**
     * Gets the z component (input)
     */
    get z() {
        return this._inputs[6];
    }
    /**
     * Gets the w component (input)
     */
    get w() {
        return this._inputs[7];
    }
    /**
     * Gets the xyzw component (output)
     */
    get xyzw() {
        return this._outputs[0];
    }
    /**
     * Gets the xyz component (output)
     */
    get xyzOut() {
        return this._outputs[1];
    }
    /**
     * Gets the xy component (output)
     */
    get xyOut() {
        return this._outputs[2];
    }
    /**
     * Gets the zw component (output)
     */
    get zwOut() {
        return this._outputs[3];
    }
    /**
     * Gets the xy component (output)
     * @deprecated Please use xyOut instead.
     */
    get xy() {
        return this.xyOut;
    }
    /**
     * Gets the xyz component (output)
     * @deprecated Please use xyzOut instead.
     */
    get xyz() {
        return this.xyzOut;
    }
    _inputRename(name) {
        if (name === "xyzw ") {
            return "xyzwIn";
        }
        if (name === "xyz ") {
            return "xyzIn";
        }
        if (name === "xy ") {
            return "xyIn";
        }
        if (name === "zw ") {
            return "zwIn";
        }
        return name;
    }
    _buildSwizzle(len) {
        const swizzle = this.xSwizzle + this.ySwizzle + this.zSwizzle + this.wSwizzle;
        return "." + swizzle.substr(0, len);
    }
    _buildBlock(state) {
        super._buildBlock(state);
        const xInput = this.x;
        const yInput = this.y;
        const zInput = this.z;
        const wInput = this.w;
        const xyInput = this.xyIn;
        const zwInput = this.zwIn;
        const xyzInput = this.xyzIn;
        const xyzwInput = this.xyzwIn;
        const v4Output = this._outputs[0];
        const v3Output = this._outputs[1];
        const v2Output = this._outputs[2];
        const v2CompOutput = this._outputs[3];
        if (xyzwInput.isConnected) {
            if (v4Output.hasEndpoints) {
                state.compilationString += this._declareOutput(v4Output, state) + ` = ${xyzwInput.associatedVariableName}${this._buildSwizzle(4)};\n`;
            }
            if (v3Output.hasEndpoints) {
                state.compilationString += this._declareOutput(v3Output, state) + ` = ${xyzwInput.associatedVariableName}${this._buildSwizzle(3)};\n`;
            }
            if (v2Output.hasEndpoints) {
                state.compilationString += this._declareOutput(v2Output, state) + ` = ${xyzwInput.associatedVariableName}${this._buildSwizzle(2)};\n`;
            }
        }
        else if (xyzInput.isConnected) {
            if (v4Output.hasEndpoints) {
                state.compilationString +=
                    this._declareOutput(v4Output, state) +
                        ` = vec4(${xyzInput.associatedVariableName}, ${wInput.isConnected ? this._writeVariable(wInput) : "0.0"})${this._buildSwizzle(4)};\n`;
            }
            if (v3Output.hasEndpoints) {
                state.compilationString += this._declareOutput(v3Output, state) + ` = ${xyzInput.associatedVariableName}${this._buildSwizzle(3)};\n`;
            }
            if (v2Output.hasEndpoints) {
                state.compilationString += this._declareOutput(v2Output, state) + ` = ${xyzInput.associatedVariableName}${this._buildSwizzle(2)};\n`;
            }
        }
        else if (xyInput.isConnected) {
            if (v4Output.hasEndpoints) {
                if (zwInput.isConnected) {
                    state.compilationString +=
                        this._declareOutput(v4Output, state) + ` = vec4(${xyInput.associatedVariableName}, ${zwInput.associatedVariableName})${this._buildSwizzle(4)};\n`;
                }
                else {
                    state.compilationString +=
                        this._declareOutput(v4Output, state) +
                            ` = vec4(${xyInput.associatedVariableName}, ${zInput.isConnected ? this._writeVariable(zInput) : "0.0"}, ${wInput.isConnected ? this._writeVariable(wInput) : "0.0"})${this._buildSwizzle(4)};\n`;
                }
            }
            if (v3Output.hasEndpoints) {
                state.compilationString +=
                    this._declareOutput(v3Output, state) +
                        ` = vec3(${xyInput.associatedVariableName}, ${zInput.isConnected ? this._writeVariable(zInput) : "0.0"})${this._buildSwizzle(3)};\n`;
            }
            if (v2Output.hasEndpoints) {
                state.compilationString += this._declareOutput(v2Output, state) + ` = ${xyInput.associatedVariableName}${this._buildSwizzle(2)};\n`;
            }
            if (v2CompOutput.hasEndpoints) {
                if (zwInput.isConnected) {
                    state.compilationString += this._declareOutput(v2CompOutput, state) + ` = ${zwInput.associatedVariableName}${this._buildSwizzle(2)};\n`;
                }
                else {
                    state.compilationString +=
                        this._declareOutput(v2CompOutput, state) +
                            ` = vec2(${zInput.isConnected ? this._writeVariable(zInput) : "0.0"}, ${wInput.isConnected ? this._writeVariable(wInput) : "0.0"})${this._buildSwizzle(2)};\n`;
                }
            }
        }
        else {
            if (v4Output.hasEndpoints) {
                if (zwInput.isConnected) {
                    state.compilationString +=
                        this._declareOutput(v4Output, state) +
                            ` = vec4(${xInput.isConnected ? this._writeVariable(xInput) : "0.0"}, ${yInput.isConnected ? this._writeVariable(yInput) : "0.0"}, ${zwInput.associatedVariableName})${this._buildSwizzle(4)};\n`;
                }
                else {
                    state.compilationString +=
                        this._declareOutput(v4Output, state) +
                            ` = vec4(${xInput.isConnected ? this._writeVariable(xInput) : "0.0"}, ${yInput.isConnected ? this._writeVariable(yInput) : "0.0"}, ${zInput.isConnected ? this._writeVariable(zInput) : "0.0"}, ${wInput.isConnected ? this._writeVariable(wInput) : "0.0"})${this._buildSwizzle(4)};\n`;
                }
            }
            if (v3Output.hasEndpoints) {
                state.compilationString +=
                    this._declareOutput(v3Output, state) +
                        ` = vec3(${xInput.isConnected ? this._writeVariable(xInput) : "0.0"}, ${yInput.isConnected ? this._writeVariable(yInput) : "0.0"}, ${zInput.isConnected ? this._writeVariable(zInput) : "0.0"})${this._buildSwizzle(3)};\n`;
            }
            if (v2Output.hasEndpoints) {
                state.compilationString +=
                    this._declareOutput(v2Output, state) +
                        ` = vec2(${xInput.isConnected ? this._writeVariable(xInput) : "0.0"}, ${yInput.isConnected ? this._writeVariable(yInput) : "0.0"})${this._buildSwizzle(2)};\n`;
            }
            if (v2CompOutput.hasEndpoints) {
                if (zwInput.isConnected) {
                    state.compilationString += this._declareOutput(v2CompOutput, state) + ` = ${zwInput.associatedVariableName}${this._buildSwizzle(2)};\n`;
                }
                else {
                    state.compilationString +=
                        this._declareOutput(v2CompOutput, state) +
                            ` = vec2(${zInput.isConnected ? this._writeVariable(zInput) : "0.0"}, ${wInput.isConnected ? this._writeVariable(wInput) : "0.0"})${this._buildSwizzle(2)};\n`;
                }
            }
        }
        return this;
    }
    serialize() {
        const serializationObject = super.serialize();
        serializationObject.xSwizzle = this.xSwizzle;
        serializationObject.ySwizzle = this.ySwizzle;
        serializationObject.zSwizzle = this.zSwizzle;
        serializationObject.wSwizzle = this.wSwizzle;
        return serializationObject;
    }
    _deserialize(serializationObject, scene, rootUrl) {
        var _a, _b, _c, _d;
        super._deserialize(serializationObject, scene, rootUrl);
        this.xSwizzle = (_a = serializationObject.xSwizzle) !== null && _a !== void 0 ? _a : "x";
        this.ySwizzle = (_b = serializationObject.ySwizzle) !== null && _b !== void 0 ? _b : "y";
        this.zSwizzle = (_c = serializationObject.zSwizzle) !== null && _c !== void 0 ? _c : "z";
        this.wSwizzle = (_d = serializationObject.wSwizzle) !== null && _d !== void 0 ? _d : "w";
    }
    _dumpPropertiesCode() {
        let codeString = super._dumpPropertiesCode();
        codeString += `${this._codeVariableName}.xSwizzle = "${this.xSwizzle}";\n`;
        codeString += `${this._codeVariableName}.ySwizzle = "${this.ySwizzle}";\n`;
        codeString += `${this._codeVariableName}.zSwizzle = "${this.zSwizzle}";\n`;
        codeString += `${this._codeVariableName}.wSwizzle = "${this.wSwizzle}";\n`;
        return codeString;
    }
}
RegisterClass("BABYLON.VectorMergerBlock", VectorMergerBlock);
//# sourceMappingURL=vectorMergerBlock.js.map