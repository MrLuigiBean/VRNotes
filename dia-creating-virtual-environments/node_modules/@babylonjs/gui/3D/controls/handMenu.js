import { TouchHolographicMenu } from "./touchHolographicMenu.js";
import { HandConstraintBehavior } from "@babylonjs/core/Behaviors/Meshes/handConstraintBehavior.js";
/**
 * Hand menu that displays buttons and floats around the hand.
 * @since 5.0.0
 */
export class HandMenu extends TouchHolographicMenu {
    /**
     * The hand constraint behavior setting the transformation of this node
     */
    get handConstraintBehavior() {
        return this._handConstraintBehavior;
    }
    _createNode(scene) {
        const node = super._createNode(scene);
        this._handConstraintBehavior.attach(node);
        return node;
    }
    /**
     * Creates a hand menu GUI 3D control
     * @param xr the WebXRExperienceHelper used to link this control to the enabled WebXRHandTracking feature
     * @param name name of the hand menu
     */
    constructor(xr, name) {
        super(name);
        this._handConstraintBehavior = new HandConstraintBehavior();
        this._handConstraintBehavior.linkToXRExperience(xr);
        this.backPlateMargin = 0.15;
        this.rows = 3;
    }
    /**
     * Disposes the hand menu
     */
    dispose() {
        super.dispose();
        this._handConstraintBehavior.detach();
    }
}
//# sourceMappingURL=handMenu.js.map