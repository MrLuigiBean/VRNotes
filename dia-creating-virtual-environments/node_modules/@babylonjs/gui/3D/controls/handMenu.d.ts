import type { Scene } from "@babylonjs/core/scene.js";
import type { TransformNode } from "@babylonjs/core/Meshes/transformNode.js";
import type { Nullable } from "@babylonjs/core/types.js";
import { TouchHolographicMenu } from "./touchHolographicMenu";
import { HandConstraintBehavior } from "@babylonjs/core/Behaviors/Meshes/handConstraintBehavior.js";
import type { WebXRExperienceHelper } from "@babylonjs/core/XR/webXRExperienceHelper.js";
/**
 * Hand menu that displays buttons and floats around the hand.
 * @since 5.0.0
 */
export declare class HandMenu extends TouchHolographicMenu {
    private _handConstraintBehavior;
    /**
     * The hand constraint behavior setting the transformation of this node
     */
    get handConstraintBehavior(): HandConstraintBehavior;
    protected _createNode(scene: Scene): Nullable<TransformNode>;
    /**
     * Creates a hand menu GUI 3D control
     * @param xr the WebXRExperienceHelper used to link this control to the enabled WebXRHandTracking feature
     * @param name name of the hand menu
     */
    constructor(xr: WebXRExperienceHelper, name?: string);
    /**
     * Disposes the hand menu
     */
    dispose(): void;
}
