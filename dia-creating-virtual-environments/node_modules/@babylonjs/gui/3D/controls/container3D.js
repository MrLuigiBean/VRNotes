import { TransformNode } from "@babylonjs/core/Meshes/transformNode.js";
import { Control3D } from "./control3D.js";
/**
 * Class used to create containers for controls
 */
export class Container3D extends Control3D {
    /**
     * Gets the list of child controls
     */
    get children() {
        return this._children;
    }
    /**
     * Gets or sets a boolean indicating if the layout must be blocked (default is false).
     * This is helpful to optimize layout operation when adding multiple children in a row
     */
    get blockLayout() {
        return this._blockLayout;
    }
    set blockLayout(value) {
        if (this._blockLayout === value) {
            return;
        }
        this._blockLayout = value;
        if (!this._blockLayout) {
            this._arrangeChildren();
        }
    }
    /**
     * Creates a new container
     * @param name defines the container name
     */
    constructor(name) {
        super(name);
        this._blockLayout = false;
        /**
         * Gets the list of child controls
         */
        this._children = new Array();
    }
    /**
     * Force the container to update the layout. Please note that it will not take blockLayout property in account
     * @returns the current container
     */
    updateLayout() {
        this._arrangeChildren();
        return this;
    }
    /**
     * Gets a boolean indicating if the given control is in the children of this control
     * @param control defines the control to check
     * @returns true if the control is in the child list
     */
    containsControl(control) {
        return this._children.indexOf(control) !== -1;
    }
    /**
     * Adds a control to the children of this control
     * @param control defines the control to add
     * @returns the current container
     */
    addControl(control) {
        const index = this._children.indexOf(control);
        if (index !== -1) {
            return this;
        }
        control.parent = this;
        control._host = this._host;
        this._children.push(control);
        if (this._host.utilityLayer) {
            control._prepareNode(this._host.utilityLayer.utilityLayerScene);
            if (control.node) {
                control.node.parent = this.node;
            }
            if (!this.blockLayout) {
                this._arrangeChildren();
            }
        }
        return this;
    }
    /**
     * This function will be called everytime a new control is added
     */
    _arrangeChildren() { }
    _createNode(scene) {
        return new TransformNode("ContainerNode", scene);
    }
    /**
     * Removes a control from the children of this control
     * @param control defines the control to remove
     * @returns the current container
     */
    removeControl(control) {
        const index = this._children.indexOf(control);
        if (index !== -1) {
            this._children.splice(index, 1);
            control.parent = null;
            control._disposeNode();
        }
        return this;
    }
    _getTypeName() {
        return "Container3D";
    }
    /**
     * Releases all associated resources
     */
    dispose() {
        for (const control of this._children) {
            control.dispose();
        }
        this._children.length = 0;
        super.dispose();
    }
}
/** Control rotation will remain unchanged  */
Container3D.UNSET_ORIENTATION = 0;
/** Control will rotate to make it look at sphere central axis */
Container3D.FACEORIGIN_ORIENTATION = 1;
/** Control will rotate to make it look back at sphere central axis */
Container3D.FACEORIGINREVERSED_ORIENTATION = 2;
/** Control will rotate to look at z axis (0, 0, 1) */
Container3D.FACEFORWARD_ORIENTATION = 3;
/** Control will rotate to look at negative z axis (0, 0, -1) */
Container3D.FACEFORWARDREVERSED_ORIENTATION = 4;
//# sourceMappingURL=container3D.js.map