import { NodeMaterialBlock } from "../nodeMaterialBlock.js";
import { NodeMaterialBlockConnectionPointTypes } from "../Enums/nodeMaterialBlockConnectionPointTypes.js";
import { NodeMaterialBlockTargets } from "../Enums/nodeMaterialBlockTargets.js";
import { RegisterClass } from "../../../Misc/typeStore.js";
/**
 * Operations supported by the Wave block
 */
export var WaveBlockKind;
(function (WaveBlockKind) {
    /** SawTooth */
    WaveBlockKind[WaveBlockKind["SawTooth"] = 0] = "SawTooth";
    /** Square */
    WaveBlockKind[WaveBlockKind["Square"] = 1] = "Square";
    /** Triangle */
    WaveBlockKind[WaveBlockKind["Triangle"] = 2] = "Triangle";
})(WaveBlockKind || (WaveBlockKind = {}));
/**
 * Block used to apply wave operation to floats
 */
export class WaveBlock extends NodeMaterialBlock {
    /**
     * Creates a new WaveBlock
     * @param name defines the block name
     */
    constructor(name) {
        super(name, NodeMaterialBlockTargets.Neutral);
        /**
         * Gets or sets the kibnd of wave to be applied by the block
         */
        this.kind = WaveBlockKind.SawTooth;
        this.registerInput("input", NodeMaterialBlockConnectionPointTypes.AutoDetect);
        this.registerOutput("output", NodeMaterialBlockConnectionPointTypes.BasedOnInput);
        this._outputs[0]._typeConnectionSource = this._inputs[0];
        this._inputs[0].excludedConnectionPointTypes.push(NodeMaterialBlockConnectionPointTypes.Matrix);
    }
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName() {
        return "WaveBlock";
    }
    /**
     * Gets the input component
     */
    get input() {
        return this._inputs[0];
    }
    /**
     * Gets the output component
     */
    get output() {
        return this._outputs[0];
    }
    _buildBlock(state) {
        super._buildBlock(state);
        const output = this._outputs[0];
        switch (this.kind) {
            case WaveBlockKind.SawTooth: {
                state.compilationString += this._declareOutput(output, state) + ` = ${this.input.associatedVariableName} - floor(0.5 + ${this.input.associatedVariableName});\n`;
                break;
            }
            case WaveBlockKind.Square: {
                state.compilationString += this._declareOutput(output, state) + ` = 1.0 - 2.0 * round(fract(${this.input.associatedVariableName}));\n`;
                break;
            }
            case WaveBlockKind.Triangle: {
                state.compilationString +=
                    this._declareOutput(output, state) + ` = 2.0 * abs(2.0 * (${this.input.associatedVariableName} - floor(0.5 + ${this.input.associatedVariableName}))) - 1.0;\n`;
                break;
            }
        }
        return this;
    }
    serialize() {
        const serializationObject = super.serialize();
        serializationObject.kind = this.kind;
        return serializationObject;
    }
    _deserialize(serializationObject, scene, rootUrl) {
        super._deserialize(serializationObject, scene, rootUrl);
        this.kind = serializationObject.kind;
    }
}
RegisterClass("BABYLON.WaveBlock", WaveBlock);
//# sourceMappingURL=waveBlock.js.map