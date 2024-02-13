import { NodeMaterialBlock } from "../nodeMaterialBlock.js";
import { NodeMaterialBlockConnectionPointTypes } from "../Enums/nodeMaterialBlockConnectionPointTypes.js";
import { NodeMaterialBlockTargets } from "../Enums/nodeMaterialBlockTargets.js";
import { RegisterClass } from "../../../Misc/typeStore.js";
/**
 * Block used to transform a vector (2, 3 or 4) with a matrix. It will generate a Vector4
 */
export class TransformBlock extends NodeMaterialBlock {
    /**
     * Creates a new TransformBlock
     * @param name defines the block name
     */
    constructor(name) {
        super(name, NodeMaterialBlockTargets.Neutral);
        /**
         * Defines the value to use to complement W value to transform it to a Vector4
         */
        this.complementW = 1;
        /**
         * Defines the value to use to complement z value to transform it to a Vector4
         */
        this.complementZ = 0;
        this.target = NodeMaterialBlockTargets.Vertex;
        this.registerInput("vector", NodeMaterialBlockConnectionPointTypes.AutoDetect);
        this.registerInput("transform", NodeMaterialBlockConnectionPointTypes.Matrix);
        this.registerOutput("output", NodeMaterialBlockConnectionPointTypes.Vector4);
        this.registerOutput("xyz", NodeMaterialBlockConnectionPointTypes.Vector3);
        this._inputs[0].onConnectionObservable.add((other) => {
            if (other.ownerBlock.isInput) {
                const otherAsInput = other.ownerBlock;
                if (otherAsInput.name === "normal" || otherAsInput.name === "tangent") {
                    this.complementW = 0;
                }
            }
        });
    }
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName() {
        return "TransformBlock";
    }
    /**
     * Gets the vector input
     */
    get vector() {
        return this._inputs[0];
    }
    /**
     * Gets the output component
     */
    get output() {
        return this._outputs[0];
    }
    /**
     * Gets the xyz output component
     */
    get xyz() {
        return this._outputs[1];
    }
    /**
     * Gets the matrix transform input
     */
    get transform() {
        return this._inputs[1];
    }
    _buildBlock(state) {
        super._buildBlock(state);
        const vector = this.vector;
        const transform = this.transform;
        if (vector.connectedPoint) {
            // None uniform scaling case.
            if (this.complementW === 0) {
                const comments = `//${this.name}`;
                state._emitFunctionFromInclude("helperFunctions", comments);
                state.sharedData.blocksWithDefines.push(this);
                const transformName = state._getFreeVariableName(`${transform.associatedVariableName}_NUS`);
                state.compilationString += `mat3 ${transformName} = mat3(${transform.associatedVariableName});\n`;
                state.compilationString += `#ifdef NONUNIFORMSCALING\n`;
                state.compilationString += `${transformName} = transposeMat3(inverseMat3(${transformName}));\n`;
                state.compilationString += `#endif\n`;
                switch (vector.connectedPoint.type) {
                    case NodeMaterialBlockConnectionPointTypes.Vector2:
                        state.compilationString +=
                            this._declareOutput(this.output, state) +
                                ` = vec4(${transformName} * vec3(${vector.associatedVariableName}, ${this._writeFloat(this.complementZ)}), ${this._writeFloat(this.complementW)});\n`;
                        break;
                    case NodeMaterialBlockConnectionPointTypes.Vector3:
                    case NodeMaterialBlockConnectionPointTypes.Color3:
                        state.compilationString +=
                            this._declareOutput(this.output, state) + ` = vec4(${transformName} * ${vector.associatedVariableName}, ${this._writeFloat(this.complementW)});\n`;
                        break;
                    default:
                        state.compilationString +=
                            this._declareOutput(this.output, state) + ` = vec4(${transformName} * ${vector.associatedVariableName}.xyz, ${this._writeFloat(this.complementW)});\n`;
                        break;
                }
            }
            else {
                const transformName = transform.associatedVariableName;
                switch (vector.connectedPoint.type) {
                    case NodeMaterialBlockConnectionPointTypes.Vector2:
                        state.compilationString +=
                            this._declareOutput(this.output, state) +
                                ` = ${transformName} * vec4(${vector.associatedVariableName}, ${this._writeFloat(this.complementZ)}, ${this._writeFloat(this.complementW)});\n`;
                        break;
                    case NodeMaterialBlockConnectionPointTypes.Vector3:
                    case NodeMaterialBlockConnectionPointTypes.Color3:
                        state.compilationString +=
                            this._declareOutput(this.output, state) + ` = ${transformName} * vec4(${vector.associatedVariableName}, ${this._writeFloat(this.complementW)});\n`;
                        break;
                    default:
                        state.compilationString += this._declareOutput(this.output, state) + ` = ${transformName} * ${vector.associatedVariableName};\n`;
                        break;
                }
            }
            if (this.xyz.hasEndpoints) {
                state.compilationString += this._declareOutput(this.xyz, state) + ` = ${this.output.associatedVariableName}.xyz;\n`;
            }
        }
        return this;
    }
    /**
     * Update defines for shader compilation
     * @param mesh defines the mesh to be rendered
     * @param nodeMaterial defines the node material requesting the update
     * @param defines defines the material defines to update
     */
    prepareDefines(mesh, nodeMaterial, defines) {
        // Do nothing
        if (mesh.nonUniformScaling) {
            defines.setValue("NONUNIFORMSCALING", true);
        }
    }
    serialize() {
        const serializationObject = super.serialize();
        serializationObject.complementZ = this.complementZ;
        serializationObject.complementW = this.complementW;
        return serializationObject;
    }
    _deserialize(serializationObject, scene, rootUrl) {
        super._deserialize(serializationObject, scene, rootUrl);
        this.complementZ = serializationObject.complementZ !== undefined ? serializationObject.complementZ : 0.0;
        this.complementW = serializationObject.complementW !== undefined ? serializationObject.complementW : 1.0;
    }
    _dumpPropertiesCode() {
        let codeString = super._dumpPropertiesCode() + `${this._codeVariableName}.complementZ = ${this.complementZ};\n`;
        codeString += `${this._codeVariableName}.complementW = ${this.complementW};\n`;
        return codeString;
    }
}
RegisterClass("BABYLON.TransformBlock", TransformBlock);
//# sourceMappingURL=transformBlock.js.map