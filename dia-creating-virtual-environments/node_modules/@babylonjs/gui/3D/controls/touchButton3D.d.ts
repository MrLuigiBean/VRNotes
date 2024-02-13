import { Vector3 } from "@babylonjs/core/Maths/math.vector.js";
import type { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import type { TransformNode } from "@babylonjs/core/Meshes/transformNode.js";
import type { Scene } from "@babylonjs/core/scene.js";
import { Observable } from "@babylonjs/core/Misc/observable.js";
import { Button3D } from "./button3D";
/**
 * Class used to create a touchable button in 3D
 */
export declare class TouchButton3D extends Button3D {
    private _collisionMesh;
    private _collidableFrontDirection;
    private _isNearPressed;
    private _interactionSurfaceHeight;
    private _isToggleButton;
    private _toggleState;
    private _toggleButtonCallback;
    /**
     * An event triggered when the button is toggled. Only fired if 'isToggleButton' is true
     */
    onToggleObservable: Observable<boolean>;
    /**
     * Creates a new touchable button
     * @param name defines the control name
     * @param collisionMesh mesh to track collisions with
     */
    constructor(name?: string, collisionMesh?: Mesh);
    /**
     * Whether the current interaction is caused by near interaction or not
     */
    get isActiveNearInteraction(): boolean;
    /**
     * Sets the front-facing direction of the button. Pass in Vector3.Zero to allow interactions from any direction
     * @param frontWorldDir the forward direction of the button
     */
    set collidableFrontDirection(frontWorldDir: Vector3);
    /**
     * Returns the front-facing direction of the button, or Vector3.Zero if there is no 'front'
     */
    get collidableFrontDirection(): Vector3;
    /**
     * Sets the mesh used for testing input collision
     * @param collisionMesh the new collision mesh for the button
     */
    set collisionMesh(collisionMesh: Mesh);
    /**
     * Setter for if this TouchButton3D should be treated as a toggle button
     * @param value If this TouchHolographicButton should act like a toggle button
     */
    set isToggleButton(value: boolean);
    get isToggleButton(): boolean;
    /**
     * A public entrypoint to set the toggle state of the TouchHolographicButton. Only works if 'isToggleButton' is true
     * @param newState The new state to set the TouchHolographicButton's toggle state to
     */
    set isToggled(newState: boolean);
    get isToggled(): boolean;
    protected _onToggle(newState: boolean): void;
    private _isInteractionInFrontOfButton;
    /**
     * Get the height of the touchPoint from the collidable part of the button
     * @param touchPoint the point to compare to the button, in absolute position
     * @returns the depth of the touch point into the front of the button
     */
    getPressDepth(touchPoint: Vector3): number;
    protected _getInteractionHeight(interactionPos: Vector3, basePos: Vector3): number;
    /**
     * @internal
     */
    _generatePointerEventType(providedType: number, nearMeshPosition: Vector3, activeInteractionCount: number): number;
    protected _getTypeName(): string;
    protected _createNode(scene: Scene): TransformNode;
    /**
     * Releases all associated resources
     */
    dispose(): void;
}
