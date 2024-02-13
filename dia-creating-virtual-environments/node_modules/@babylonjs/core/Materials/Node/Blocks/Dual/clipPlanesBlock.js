import { NodeMaterialBlock } from "../../nodeMaterialBlock.js";
import { NodeMaterialBlockConnectionPointTypes } from "../../Enums/nodeMaterialBlockConnectionPointTypes.js";
import { NodeMaterialBlockTargets } from "../../Enums/nodeMaterialBlockTargets.js";
import { RegisterClass } from "../../../../Misc/typeStore.js";
import { bindClipPlane } from "../../../../Materials/clipPlaneMaterialHelper.js";
/**
 * Block used to implement clip planes
 */
export class ClipPlanesBlock extends NodeMaterialBlock {
    /**
     * Create a new ClipPlanesBlock
     * @param name defines the block name
     */
    constructor(name) {
        super(name, NodeMaterialBlockTargets.VertexAndFragment, true);
        this.registerInput("worldPosition", NodeMaterialBlockConnectionPointTypes.Vector4, false);
    }
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName() {
        return "ClipPlanesBlock";
    }
    /**
     * Initialize the block and prepare the context for build
     * @param state defines the state that will be used for the build
     */
    initialize(state) {
        state._excludeVariableName("vClipPlane");
        state._excludeVariableName("fClipDistance");
        state._excludeVariableName("vClipPlane2");
        state._excludeVariableName("fClipDistance2");
        state._excludeVariableName("vClipPlane3");
        state._excludeVariableName("fClipDistance3");
        state._excludeVariableName("vClipPlane4");
        state._excludeVariableName("fClipDistance4");
        state._excludeVariableName("vClipPlane5");
        state._excludeVariableName("fClipDistance5");
        state._excludeVariableName("vClipPlane6");
        state._excludeVariableName("fClipDistance6");
    }
    /**
     * Gets the worldPosition input component
     */
    get worldPosition() {
        return this._inputs[0];
    }
    get target() {
        return NodeMaterialBlockTargets.VertexAndFragment;
    }
    set target(value) { }
    prepareDefines(mesh, nodeMaterial, defines) {
        var _a, _b, _c, _d, _e, _f;
        const scene = mesh.getScene();
        const useClipPlane1 = ((_a = nodeMaterial.clipPlane) !== null && _a !== void 0 ? _a : scene.clipPlane) ? true : false;
        const useClipPlane2 = ((_b = nodeMaterial.clipPlane2) !== null && _b !== void 0 ? _b : scene.clipPlane2) ? true : false;
        const useClipPlane3 = ((_c = nodeMaterial.clipPlane3) !== null && _c !== void 0 ? _c : scene.clipPlane3) ? true : false;
        const useClipPlane4 = ((_d = nodeMaterial.clipPlane4) !== null && _d !== void 0 ? _d : scene.clipPlane4) ? true : false;
        const useClipPlane5 = ((_e = nodeMaterial.clipPlane5) !== null && _e !== void 0 ? _e : scene.clipPlane5) ? true : false;
        const useClipPlane6 = ((_f = nodeMaterial.clipPlane6) !== null && _f !== void 0 ? _f : scene.clipPlane6) ? true : false;
        defines.setValue("CLIPPLANE", useClipPlane1, true);
        defines.setValue("CLIPPLANE2", useClipPlane2, true);
        defines.setValue("CLIPPLANE3", useClipPlane3, true);
        defines.setValue("CLIPPLANE4", useClipPlane4, true);
        defines.setValue("CLIPPLANE5", useClipPlane5, true);
        defines.setValue("CLIPPLANE6", useClipPlane6, true);
    }
    bind(effect, nodeMaterial, mesh) {
        if (!mesh) {
            return;
        }
        const scene = mesh.getScene();
        bindClipPlane(effect, nodeMaterial, scene);
    }
    _buildBlock(state) {
        super._buildBlock(state);
        const comments = `//${this.name}`;
        if (state.target !== NodeMaterialBlockTargets.Fragment) {
            // Vertex
            const worldPos = this.worldPosition;
            state._emitFunctionFromInclude("clipPlaneVertexDeclaration", comments, {
                replaceStrings: [{ search: /uniform vec4 vClipPlane\d*;/g, replace: "" }],
            });
            state.compilationString += state._emitCodeFromInclude("clipPlaneVertex", comments, {
                replaceStrings: [{ search: /worldPos/g, replace: worldPos.associatedVariableName }],
            });
            state._emitUniformFromString("vClipPlane", "vec4");
            state._emitUniformFromString("vClipPlane2", "vec4");
            state._emitUniformFromString("vClipPlane3", "vec4");
            state._emitUniformFromString("vClipPlane4", "vec4");
            state._emitUniformFromString("vClipPlane5", "vec4");
            state._emitUniformFromString("vClipPlane6", "vec4");
            return;
        }
        // Fragment
        state.sharedData.bindableBlocks.push(this);
        state.sharedData.blocksWithDefines.push(this);
        state._emitFunctionFromInclude("clipPlaneFragmentDeclaration", comments);
        state.compilationString += state._emitCodeFromInclude("clipPlaneFragment", comments);
        return this;
    }
}
RegisterClass("BABYLON.ClipPlanesBlock", ClipPlanesBlock);
//# sourceMappingURL=clipPlanesBlock.js.map