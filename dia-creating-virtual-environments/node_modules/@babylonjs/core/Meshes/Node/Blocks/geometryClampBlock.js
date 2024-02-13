import { __decorate } from "../../../tslib.es6.js";
import { RegisterClass } from "../../../Misc/typeStore.js";
import { editableInPropertyPage, PropertyTypeForEdition } from "../../../Decorators/nodeDecorator.js";
import { NodeGeometryBlock } from "../nodeGeometryBlock.js";
import { NodeGeometryBlockConnectionPointTypes } from "../Enums/nodeGeometryConnectionPointTypes.js";
import { Vector2, Vector3, Vector4 } from "../../../Maths/math.vector.js";
/**
 * Block used to clamp a float
 */
export class GeometryClampBlock extends NodeGeometryBlock {
    /**
     * Creates a new GeometryClampBlock
     * @param name defines the block name
     */
    constructor(name) {
        super(name);
        /** Gets or sets the minimum range */
        this.minimum = 0.0;
        /** Gets or sets the maximum range */
        this.maximum = 1.0;
        this.registerInput("value", NodeGeometryBlockConnectionPointTypes.AutoDetect);
        this.registerOutput("output", NodeGeometryBlockConnectionPointTypes.BasedOnInput);
        this._outputs[0]._typeConnectionSource = this._inputs[0];
        this._inputs[0].excludedConnectionPointTypes.push(NodeGeometryBlockConnectionPointTypes.Matrix);
        this._inputs[0].excludedConnectionPointTypes.push(NodeGeometryBlockConnectionPointTypes.Geometry);
        this._inputs[0].excludedConnectionPointTypes.push(NodeGeometryBlockConnectionPointTypes.Texture);
    }
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName() {
        return "GeometryClampBlock";
    }
    /**
     * Gets the value input component
     */
    get value() {
        return this._inputs[0];
    }
    /**
     * Gets the output component
     */
    get output() {
        return this._outputs[0];
    }
    _buildBlock() {
        if (!this.value.isConnected) {
            this.output._storedFunction = null;
            this.output._storedValue = null;
            return;
        }
        const func = (value) => {
            return Math.max(this.minimum, Math.min(value, this.maximum));
        };
        this.output._storedFunction = (state) => {
            const value = this.value.getConnectedValue(state);
            switch (this.value.type) {
                case NodeGeometryBlockConnectionPointTypes.Int:
                case NodeGeometryBlockConnectionPointTypes.Float: {
                    return func(value);
                }
                case NodeGeometryBlockConnectionPointTypes.Vector2: {
                    return new Vector2(func(value.x), func(value.y));
                }
                case NodeGeometryBlockConnectionPointTypes.Vector3: {
                    return new Vector3(func(value.x), func(value.y), func(value.z));
                }
                case NodeGeometryBlockConnectionPointTypes.Vector4: {
                    return new Vector4(func(value.x), func(value.y), func(value.z), func(value.w));
                }
            }
            return 0;
        };
        return this;
    }
    _dumpPropertiesCode() {
        let codeString = super._dumpPropertiesCode() + `${this._codeVariableName}.minimum = ${this.minimum};\n`;
        codeString += `${this._codeVariableName}.maximum = ${this.maximum};\n`;
        return codeString;
    }
    serialize() {
        const serializationObject = super.serialize();
        serializationObject.minimum = this.minimum;
        serializationObject.maximum = this.maximum;
        return serializationObject;
    }
    _deserialize(serializationObject) {
        super._deserialize(serializationObject);
        this.minimum = serializationObject.minimum;
        this.maximum = serializationObject.maximum;
    }
}
__decorate([
    editableInPropertyPage("Minimum", PropertyTypeForEdition.Float)
], GeometryClampBlock.prototype, "minimum", void 0);
__decorate([
    editableInPropertyPage("Maximum", PropertyTypeForEdition.Float)
], GeometryClampBlock.prototype, "maximum", void 0);
RegisterClass("BABYLON.GeometryClampBlock", GeometryClampBlock);
//# sourceMappingURL=geometryClampBlock.js.map