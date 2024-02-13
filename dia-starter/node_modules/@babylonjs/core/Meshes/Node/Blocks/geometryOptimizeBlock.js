import { __decorate } from "../../../tslib.es6.js";
import { RegisterClass } from "../../../Misc/typeStore.js";
import { NodeGeometryBlockConnectionPointTypes } from "../Enums/nodeGeometryConnectionPointTypes.js";
import { NodeGeometryBlock } from "../nodeGeometryBlock.js";
import { PropertyTypeForEdition, editableInPropertyPage } from "../../../Decorators/nodeDecorator.js";
import { VertexData } from "../../../Meshes/mesh.vertexData.js";
import { Scalar } from "../../../Maths/math.scalar.js";
import { Epsilon } from "../../../Maths/math.constants.js";
/**
 * Block used to extract unique positions from a geometry
 */
export class GeometryOptimizeBlock extends NodeGeometryBlock {
    /**
     * Creates a new GeometryOptimizeBlock
     * @param name defines the block name
     */
    constructor(name) {
        super(name);
        /**
         * Gets or sets a boolean indicating that this block can evaluate context
         * Build performance is improved when this value is set to false as the system will cache values instead of reevaluating everything per context change
         */
        this.evaluateContext = true;
        /**
         * Define the epsilon used to compare similar positions
         */
        this.epsilon = Epsilon;
        this.registerInput("geometry", NodeGeometryBlockConnectionPointTypes.Geometry);
        this.registerOutput("output", NodeGeometryBlockConnectionPointTypes.Geometry);
    }
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName() {
        return "GeometryOptimizeBlock";
    }
    /**
     * Gets the geometry component
     */
    get geometry() {
        return this._inputs[0];
    }
    /**
     * Gets the output component
     */
    get output() {
        return this._outputs[0];
    }
    _buildBlock(state) {
        const func = (state) => {
            if (!this.geometry.isConnected) {
                return null;
            }
            const vertexData = this.geometry.getConnectedValue(state);
            const newPositions = [];
            const newIndicesMap = {};
            for (let index = 0; index < vertexData.positions.length; index += 3) {
                const x = vertexData.positions[index];
                const y = vertexData.positions[index + 1];
                const z = vertexData.positions[index + 2];
                // check if we already have it
                let found = false;
                for (let checkIndex = 0; checkIndex < newPositions.length; checkIndex += 3) {
                    if (Scalar.WithinEpsilon(x, newPositions[checkIndex], this.epsilon) &&
                        Scalar.WithinEpsilon(y, newPositions[checkIndex + 1], this.epsilon) &&
                        Scalar.WithinEpsilon(z, newPositions[checkIndex + 2], this.epsilon)) {
                        newIndicesMap[index / 3] = checkIndex / 3;
                        found = true;
                        continue;
                    }
                }
                if (!found) {
                    newIndicesMap[index / 3] = newPositions.length / 3;
                    newPositions.push(x, y, z);
                }
            }
            const newVertexData = new VertexData();
            newVertexData.positions = newPositions;
            newVertexData.indices = vertexData.indices.map((index) => newIndicesMap[index]);
            return newVertexData;
        };
        if (this.evaluateContext) {
            this.output._storedFunction = func;
        }
        else {
            this.output._storedFunction = null;
            this.output._storedValue = func(state);
        }
    }
    _dumpPropertiesCode() {
        let codeString = super._dumpPropertiesCode() + `${this._codeVariableName}.evaluateContext = ${this.evaluateContext ? "true" : "false"};\n`;
        codeString += `${this._codeVariableName}.epsilon = ${this.epsilon};\n`;
        return codeString;
    }
    /**
     * Serializes this block in a JSON representation
     * @returns the serialized block object
     */
    serialize() {
        const serializationObject = super.serialize();
        serializationObject.evaluateContext = this.evaluateContext;
        serializationObject.epsilon = this.epsilon;
        return serializationObject;
    }
    _deserialize(serializationObject) {
        super._deserialize(serializationObject);
        this.evaluateContext = serializationObject.evaluateContext;
        this.epsilon = serializationObject.epsilon;
    }
}
__decorate([
    editableInPropertyPage("Evaluate context", PropertyTypeForEdition.Boolean, "ADVANCED", { notifiers: { rebuild: true } })
], GeometryOptimizeBlock.prototype, "evaluateContext", void 0);
__decorate([
    editableInPropertyPage("Epsilon", PropertyTypeForEdition.Float, "ADVANCED", { notifiers: { rebuild: true } })
], GeometryOptimizeBlock.prototype, "epsilon", void 0);
RegisterClass("BABYLON.GeometryOptimizeBlock", GeometryOptimizeBlock);
//# sourceMappingURL=geometryOptimizeBlock.js.map