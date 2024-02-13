import { __decorate } from "../../../tslib.es6.js";
import { NodeMaterialBlock } from "../nodeMaterialBlock.js";
import { NodeMaterialBlockConnectionPointTypes } from "../Enums/nodeMaterialBlockConnectionPointTypes.js";
import { NodeMaterialBlockTargets } from "../Enums/nodeMaterialBlockTargets.js";
import { RegisterClass } from "../../../Misc/typeStore.js";
import { InputBlock } from "./Input/inputBlock.js";
import { MorphTargetsBlock } from "./Vertex/morphTargetsBlock.js";
import { PropertyTypeForEdition, editableInPropertyPage } from "../../../Decorators/nodeDecorator.js";
export var MeshAttributeExistsBlockTypes;
(function (MeshAttributeExistsBlockTypes) {
    MeshAttributeExistsBlockTypes[MeshAttributeExistsBlockTypes["None"] = 0] = "None";
    MeshAttributeExistsBlockTypes[MeshAttributeExistsBlockTypes["Normal"] = 1] = "Normal";
    MeshAttributeExistsBlockTypes[MeshAttributeExistsBlockTypes["Tangent"] = 2] = "Tangent";
    MeshAttributeExistsBlockTypes[MeshAttributeExistsBlockTypes["VertexColor"] = 3] = "VertexColor";
    MeshAttributeExistsBlockTypes[MeshAttributeExistsBlockTypes["UV1"] = 4] = "UV1";
    MeshAttributeExistsBlockTypes[MeshAttributeExistsBlockTypes["UV2"] = 5] = "UV2";
    MeshAttributeExistsBlockTypes[MeshAttributeExistsBlockTypes["UV3"] = 6] = "UV3";
    MeshAttributeExistsBlockTypes[MeshAttributeExistsBlockTypes["UV4"] = 7] = "UV4";
    MeshAttributeExistsBlockTypes[MeshAttributeExistsBlockTypes["UV5"] = 8] = "UV5";
    MeshAttributeExistsBlockTypes[MeshAttributeExistsBlockTypes["UV6"] = 9] = "UV6";
})(MeshAttributeExistsBlockTypes || (MeshAttributeExistsBlockTypes = {}));
/**
 * Block used to check if Mesh attribute of specified type exists
 * and provide an alternative fallback input for to use in such case
 */
export class MeshAttributeExistsBlock extends NodeMaterialBlock {
    /**
     * Creates a new MeshAttributeExistsBlock
     * @param name defines the block name
     */
    constructor(name) {
        super(name, NodeMaterialBlockTargets.Neutral);
        /**
         * Defines which mesh attribute to use
         */
        this.attributeType = MeshAttributeExistsBlockTypes.None;
        this.registerInput("input", NodeMaterialBlockConnectionPointTypes.AutoDetect);
        this.registerInput("fallback", NodeMaterialBlockConnectionPointTypes.AutoDetect);
        this.registerOutput("output", NodeMaterialBlockConnectionPointTypes.BasedOnInput);
        this._outputs[0]._typeConnectionSource = this._inputs[0];
        this._linkConnectionTypes(0, 1);
        // Try to auto determine attributeType
        this._inputs[0].onConnectionObservable.add((other) => {
            var _a;
            if (this.attributeType) {
                // But only if not already specified
                return;
            }
            const sourceBlock = other.ownerBlock;
            if (sourceBlock instanceof InputBlock && sourceBlock.isAttribute) {
                switch (sourceBlock.name) {
                    case "color":
                        this.attributeType = MeshAttributeExistsBlockTypes.VertexColor;
                        break;
                    case "normal":
                        this.attributeType = MeshAttributeExistsBlockTypes.Normal;
                        break;
                    case "tangent":
                        this.attributeType = MeshAttributeExistsBlockTypes.Tangent;
                        break;
                    case "uv":
                        this.attributeType = MeshAttributeExistsBlockTypes.UV1;
                        break;
                    case "uv2":
                        this.attributeType = MeshAttributeExistsBlockTypes.UV2;
                        break;
                    case "uv3":
                        this.attributeType = MeshAttributeExistsBlockTypes.UV3;
                        break;
                    case "uv4":
                        this.attributeType = MeshAttributeExistsBlockTypes.UV4;
                        break;
                    case "uv5":
                        this.attributeType = MeshAttributeExistsBlockTypes.UV5;
                        break;
                    case "uv6":
                        this.attributeType = MeshAttributeExistsBlockTypes.UV6;
                        break;
                }
            }
            else if (sourceBlock instanceof MorphTargetsBlock) {
                switch ((_a = this.input.connectedPoint) === null || _a === void 0 ? void 0 : _a.name) {
                    case "normalOutput":
                        this.attributeType = MeshAttributeExistsBlockTypes.Normal;
                        break;
                    case "tangentOutput":
                        this.attributeType = MeshAttributeExistsBlockTypes.Tangent;
                        break;
                    case "uvOutput":
                        this.attributeType = MeshAttributeExistsBlockTypes.UV1;
                        break;
                }
            }
        });
    }
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName() {
        return "MeshAttributeExistsBlock";
    }
    /**
     * Gets the input component
     */
    get input() {
        return this._inputs[0];
    }
    /**
     * Gets the fallback component when speciefied attribute doesn't exist
     */
    get fallback() {
        return this._inputs[1];
    }
    /**
     * Gets the output component
     */
    get output() {
        return this._outputs[0];
    }
    _buildBlock(state) {
        super._buildBlock(state);
        let attributeDefine = null;
        switch (this.attributeType) {
            case MeshAttributeExistsBlockTypes.VertexColor:
                attributeDefine = "VERTEXCOLOR_NME";
                break;
            case MeshAttributeExistsBlockTypes.Normal:
                attributeDefine = "NORMAL";
                break;
            case MeshAttributeExistsBlockTypes.Tangent:
                attributeDefine = "TANGENT";
                break;
            case MeshAttributeExistsBlockTypes.UV1:
                attributeDefine = "UV1";
                break;
            case MeshAttributeExistsBlockTypes.UV2:
                attributeDefine = "UV2";
                break;
            case MeshAttributeExistsBlockTypes.UV3:
                attributeDefine = "UV3";
                break;
            case MeshAttributeExistsBlockTypes.UV4:
                attributeDefine = "UV4";
                break;
            case MeshAttributeExistsBlockTypes.UV5:
                attributeDefine = "UV5";
                break;
            case MeshAttributeExistsBlockTypes.UV6:
                attributeDefine = "UV6";
                break;
        }
        const output = this._declareOutput(this.output, state);
        if (attributeDefine) {
            state.compilationString += `#ifdef ${attributeDefine}\n`;
        }
        state.compilationString += `${output} = ${this.input.associatedVariableName};\n`;
        if (attributeDefine) {
            state.compilationString += `#else\n`;
            state.compilationString += `${output} = ${this.fallback.associatedVariableName};\n`;
            state.compilationString += `#endif\n`;
        }
        return this;
    }
    serialize() {
        const serializationObject = super.serialize();
        serializationObject.attributeType = this.attributeType;
        return serializationObject;
    }
    _deserialize(serializationObject, scene, rootUrl) {
        var _a;
        super._deserialize(serializationObject, scene, rootUrl);
        this.attributeType = (_a = serializationObject.attributeType) !== null && _a !== void 0 ? _a : MeshAttributeExistsBlockTypes.None;
    }
    _dumpPropertiesCode() {
        let codeString = super._dumpPropertiesCode();
        codeString += `${this._codeVariableName}.attributeType = ${this.attributeType};\n`;
        return codeString;
    }
}
__decorate([
    editableInPropertyPage("Attribute lookup", PropertyTypeForEdition.List, undefined, {
        notifiers: { update: true },
        options: [
            { label: "(None)", value: MeshAttributeExistsBlockTypes.None },
            { label: "Normal", value: MeshAttributeExistsBlockTypes.Normal },
            { label: "Tangent", value: MeshAttributeExistsBlockTypes.Tangent },
            { label: "Vertex Color", value: MeshAttributeExistsBlockTypes.VertexColor },
            { label: "UV1", value: MeshAttributeExistsBlockTypes.UV1 },
            { label: "UV2", value: MeshAttributeExistsBlockTypes.UV2 },
            { label: "UV3", value: MeshAttributeExistsBlockTypes.UV3 },
            { label: "UV4", value: MeshAttributeExistsBlockTypes.UV4 },
            { label: "UV5", value: MeshAttributeExistsBlockTypes.UV5 },
            { label: "UV6", value: MeshAttributeExistsBlockTypes.UV6 },
        ],
    })
], MeshAttributeExistsBlock.prototype, "attributeType", void 0);
RegisterClass("BABYLON.MeshAttributeExistsBlock", MeshAttributeExistsBlock);
//# sourceMappingURL=meshAttributeExistsBlock.js.map