import { __decorate } from "../../../tslib.es6.js";
import { NodeGeometryBlock } from "../nodeGeometryBlock.js";
import { RegisterClass } from "../../../Misc/typeStore.js";
import { NodeGeometryBlockConnectionPointTypes } from "../Enums/nodeGeometryConnectionPointTypes.js";
import { Vector2, Vector3, Vector4 } from "../../../Maths/math.vector.js";
import { PropertyTypeForEdition, editableInPropertyPage } from "../../../Decorators/nodeDecorator.js";
/**
 * Operations supported by the Math block
 */
export var MathBlockOperations;
(function (MathBlockOperations) {
    /** Add */
    MathBlockOperations[MathBlockOperations["Add"] = 0] = "Add";
    /** Subtract */
    MathBlockOperations[MathBlockOperations["Subtract"] = 1] = "Subtract";
    /** Multiply */
    MathBlockOperations[MathBlockOperations["Multiply"] = 2] = "Multiply";
    /** Divide */
    MathBlockOperations[MathBlockOperations["Divide"] = 3] = "Divide";
    /** Max */
    MathBlockOperations[MathBlockOperations["Max"] = 4] = "Max";
    /** Min */
    MathBlockOperations[MathBlockOperations["Min"] = 5] = "Min";
})(MathBlockOperations || (MathBlockOperations = {}));
/**
 * Block used to apply math functions
 */
export class MathBlock extends NodeGeometryBlock {
    /**
     * Create a new MathBlock
     * @param name defines the block name
     */
    constructor(name) {
        super(name);
        /**
         * Gets or sets the operation applied by the block
         */
        this.operation = MathBlockOperations.Add;
        this.registerInput("left", NodeGeometryBlockConnectionPointTypes.AutoDetect);
        this.registerInput("right", NodeGeometryBlockConnectionPointTypes.AutoDetect);
        this.registerOutput("output", NodeGeometryBlockConnectionPointTypes.BasedOnInput);
        this._outputs[0]._typeConnectionSource = this._inputs[0];
        this._inputs[0].excludedConnectionPointTypes.push(NodeGeometryBlockConnectionPointTypes.Matrix);
        this._inputs[0].excludedConnectionPointTypes.push(NodeGeometryBlockConnectionPointTypes.Geometry);
        this._inputs[0].excludedConnectionPointTypes.push(NodeGeometryBlockConnectionPointTypes.Texture);
        this._inputs[1].excludedConnectionPointTypes.push(NodeGeometryBlockConnectionPointTypes.Matrix);
        this._inputs[1].excludedConnectionPointTypes.push(NodeGeometryBlockConnectionPointTypes.Geometry);
        this._inputs[1].excludedConnectionPointTypes.push(NodeGeometryBlockConnectionPointTypes.Texture);
        this._inputs[1].acceptedConnectionPointTypes.push(NodeGeometryBlockConnectionPointTypes.Float);
        this._linkConnectionTypes(0, 1);
    }
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName() {
        return "MathBlock";
    }
    /**
     * Gets the left input component
     */
    get left() {
        return this._inputs[0];
    }
    /**
     * Gets the right input component
     */
    get right() {
        return this._inputs[1];
    }
    /**
     * Gets the geometry output component
     */
    get output() {
        return this._outputs[0];
    }
    _buildBlock() {
        let func;
        const left = this.left;
        const right = this.right;
        if (!left.isConnected || !right.isConnected) {
            this.output._storedFunction = null;
            this.output._storedValue = null;
            return;
        }
        const isFloat = left.type === NodeGeometryBlockConnectionPointTypes.Float || left.type === NodeGeometryBlockConnectionPointTypes.Int;
        switch (this.operation) {
            case MathBlockOperations.Add: {
                if (isFloat) {
                    func = (state) => {
                        return left.getConnectedValue(state) + right.getConnectedValue(state);
                    };
                }
                else {
                    func = (state) => {
                        return left.getConnectedValue(state).add(state.adapt(right, left.type));
                    };
                }
                break;
            }
            case MathBlockOperations.Subtract: {
                if (isFloat) {
                    func = (state) => {
                        return left.getConnectedValue(state) - right.getConnectedValue(state);
                    };
                }
                else {
                    func = (state) => {
                        return left.getConnectedValue(state).subtract(state.adapt(right, left.type));
                    };
                }
                break;
            }
            case MathBlockOperations.Multiply: {
                if (isFloat) {
                    func = (state) => {
                        return left.getConnectedValue(state) * right.getConnectedValue(state);
                    };
                }
                else {
                    func = (state) => {
                        return left.getConnectedValue(state).multiply(state.adapt(right, left.type));
                    };
                }
                break;
            }
            case MathBlockOperations.Divide: {
                if (isFloat) {
                    func = (state) => {
                        return left.getConnectedValue(state) / right.getConnectedValue(state);
                    };
                }
                else {
                    func = (state) => {
                        return left.getConnectedValue(state).divide(state.adapt(right, left.type));
                    };
                }
                break;
            }
            case MathBlockOperations.Min: {
                if (isFloat) {
                    func = (state) => {
                        return Math.min(left.getConnectedValue(state), right.getConnectedValue(state));
                    };
                }
                else {
                    switch (left.type) {
                        case NodeGeometryBlockConnectionPointTypes.Vector2: {
                            func = (state) => {
                                return Vector2.Minimize(left.getConnectedValue(state), state.adapt(right, left.type));
                            };
                            break;
                        }
                        case NodeGeometryBlockConnectionPointTypes.Vector3: {
                            func = (state) => {
                                return Vector3.Minimize(left.getConnectedValue(state), state.adapt(right, left.type));
                            };
                            break;
                        }
                        case NodeGeometryBlockConnectionPointTypes.Vector4: {
                            func = (state) => {
                                return Vector4.Minimize(left.getConnectedValue(state), state.adapt(right, left.type));
                            };
                            break;
                        }
                    }
                }
                break;
            }
            case MathBlockOperations.Max: {
                if (isFloat) {
                    func = (state) => {
                        return Math.max(left.getConnectedValue(state), right.getConnectedValue(state));
                    };
                }
                else {
                    switch (left.type) {
                        case NodeGeometryBlockConnectionPointTypes.Vector2: {
                            func = (state) => {
                                return Vector2.Maximize(left.getConnectedValue(state), state.adapt(right, left.type));
                            };
                            break;
                        }
                        case NodeGeometryBlockConnectionPointTypes.Vector3: {
                            func = (state) => {
                                return Vector3.Maximize(left.getConnectedValue(state), state.adapt(right, left.type));
                            };
                            break;
                        }
                        case NodeGeometryBlockConnectionPointTypes.Vector4: {
                            func = (state) => {
                                return Vector4.Maximize(left.getConnectedValue(state), state.adapt(right, left.type));
                            };
                            break;
                        }
                    }
                    break;
                }
            }
        }
        this.output._storedFunction = (state) => {
            if (left.type === NodeGeometryBlockConnectionPointTypes.Int) {
                return func(state) | 0;
            }
            return func(state);
        };
    }
    _dumpPropertiesCode() {
        const codeString = super._dumpPropertiesCode() + `${this._codeVariableName}.operation = BABYLON.MathBlockOperations.${MathBlockOperations[this.operation]};\n`;
        return codeString;
    }
    /**
     * Serializes this block in a JSON representation
     * @returns the serialized block object
     */
    serialize() {
        const serializationObject = super.serialize();
        serializationObject.operation = this.operation;
        return serializationObject;
    }
    _deserialize(serializationObject) {
        super._deserialize(serializationObject);
        this.operation = serializationObject.operation;
    }
}
__decorate([
    editableInPropertyPage("Operation", PropertyTypeForEdition.List, "ADVANCED", {
        notifiers: { rebuild: true },
        options: [
            { label: "Add", value: MathBlockOperations.Add },
            { label: "Subtract", value: MathBlockOperations.Subtract },
            { label: "Multiply", value: MathBlockOperations.Multiply },
            { label: "Divide", value: MathBlockOperations.Divide },
            { label: "Max", value: MathBlockOperations.Max },
            { label: "Min", value: MathBlockOperations.Min },
        ],
    })
], MathBlock.prototype, "operation", void 0);
RegisterClass("BABYLON.MathBlock", MathBlock);
//# sourceMappingURL=mathBlock.js.map