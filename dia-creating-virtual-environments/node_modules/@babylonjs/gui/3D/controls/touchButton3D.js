// Assumptions: absolute position of button mesh is inside the mesh
import { Vector3, TmpVectors } from "@babylonjs/core/Maths/math.vector.js";
import { PointerEventTypes } from "@babylonjs/core/Events/pointerEvents.js";
import { Observable } from "@babylonjs/core/Misc/observable.js";
import { Button3D } from "./button3D.js";
/**
 * Class used to create a touchable button in 3D
 */
export class TouchButton3D extends Button3D {
    /**
     * Creates a new touchable button
     * @param name defines the control name
     * @param collisionMesh mesh to track collisions with
     */
    constructor(name, collisionMesh) {
        super(name);
        this._isNearPressed = false;
        this._interactionSurfaceHeight = 0;
        this._isToggleButton = false;
        this._toggleState = false;
        this._toggleButtonCallback = () => {
            this._onToggle(!this._toggleState);
        };
        /**
         * An event triggered when the button is toggled. Only fired if 'isToggleButton' is true
         */
        this.onToggleObservable = new Observable();
        this.collidableFrontDirection = Vector3.Zero();
        if (collisionMesh) {
            this.collisionMesh = collisionMesh;
        }
    }
    /**
     * Whether the current interaction is caused by near interaction or not
     */
    get isActiveNearInteraction() {
        return this._isNearPressed;
    }
    /**
     * Sets the front-facing direction of the button. Pass in Vector3.Zero to allow interactions from any direction
     * @param frontWorldDir the forward direction of the button
     */
    set collidableFrontDirection(frontWorldDir) {
        this._collidableFrontDirection = frontWorldDir.normalize();
        if (this._collisionMesh) {
            const invert = TmpVectors.Matrix[0];
            invert.copyFrom(this._collisionMesh.getWorldMatrix());
            invert.invert();
            Vector3.TransformNormalToRef(this._collidableFrontDirection, invert, this._collidableFrontDirection);
            this._collidableFrontDirection.normalize();
        }
    }
    /**
     * Returns the front-facing direction of the button, or Vector3.Zero if there is no 'front'
     */
    get collidableFrontDirection() {
        if (this._collisionMesh) {
            // Update the front direction to reflect any rotations of the collision mesh
            const transformedDirection = TmpVectors.Vector3[0];
            Vector3.TransformNormalToRef(this._collidableFrontDirection, this._collisionMesh.getWorldMatrix(), transformedDirection);
            return transformedDirection.normalize();
        }
        return this._collidableFrontDirection;
    }
    /**
     * Sets the mesh used for testing input collision
     * @param collisionMesh the new collision mesh for the button
     */
    set collisionMesh(collisionMesh) {
        // Remove the GUI3DManager's data from the previous collision mesh's reserved data store, and reset interactability
        if (this._collisionMesh) {
            this._collisionMesh.isNearPickable = false;
            if (this._collisionMesh.reservedDataStore?.GUI3D) {
                this._collisionMesh.reservedDataStore.GUI3D = {};
            }
            this._collisionMesh.getChildMeshes().forEach((mesh) => {
                mesh.isNearPickable = false;
                if (mesh.reservedDataStore?.GUI3D) {
                    mesh.reservedDataStore.GUI3D = {};
                }
            });
        }
        this._collisionMesh = collisionMesh;
        this._injectGUI3DReservedDataStore(this._collisionMesh).control = this;
        this._collisionMesh.isNearPickable = true;
        this._collisionMesh.getChildMeshes().forEach((mesh) => {
            this._injectGUI3DReservedDataStore(mesh).control = this;
            mesh.isNearPickable = true;
        });
        this.collidableFrontDirection = collisionMesh.forward;
    }
    /**
     * Setter for if this TouchButton3D should be treated as a toggle button
     * @param value If this TouchHolographicButton should act like a toggle button
     */
    set isToggleButton(value) {
        if (value === this._isToggleButton) {
            return;
        }
        this._isToggleButton = value;
        if (value) {
            this.onPointerUpObservable.add(this._toggleButtonCallback);
        }
        else {
            this.onPointerUpObservable.removeCallback(this._toggleButtonCallback);
            // Safety check, reset the button if it's toggled on but no longer a toggle button
            if (this._toggleState) {
                this._onToggle(false);
            }
        }
    }
    get isToggleButton() {
        return this._isToggleButton;
    }
    /**
     * A public entrypoint to set the toggle state of the TouchHolographicButton. Only works if 'isToggleButton' is true
     * @param newState The new state to set the TouchHolographicButton's toggle state to
     */
    set isToggled(newState) {
        if (this._isToggleButton && this._toggleState !== newState) {
            this._onToggle(newState);
        }
    }
    get isToggled() {
        return this._toggleState;
    }
    _onToggle(newState) {
        this._toggleState = newState;
        this.onToggleObservable.notifyObservers(newState);
    }
    // Returns true if the collidable is in front of the button, or if the button has no front direction
    _isInteractionInFrontOfButton(collidablePos) {
        return this._getInteractionHeight(collidablePos, this._collisionMesh.getAbsolutePosition()) > 0;
    }
    /**
     * Get the height of the touchPoint from the collidable part of the button
     * @param touchPoint the point to compare to the button, in absolute position
     * @returns the depth of the touch point into the front of the button
     */
    getPressDepth(touchPoint) {
        if (!this._isNearPressed) {
            return 0;
        }
        const interactionHeight = this._getInteractionHeight(touchPoint, this._collisionMesh.getAbsolutePosition());
        return this._interactionSurfaceHeight - interactionHeight;
    }
    // Returns true if the collidable is in front of the button, or if the button has no front direction
    _getInteractionHeight(interactionPos, basePos) {
        const frontDir = this.collidableFrontDirection;
        if (frontDir.length() === 0) {
            // The button has no front, just return the distance to the base
            return Vector3.Distance(interactionPos, basePos);
        }
        const d = Vector3.Dot(basePos, frontDir);
        const abc = Vector3.Dot(interactionPos, frontDir);
        return abc - d;
    }
    /**
     * @internal
     */
    _generatePointerEventType(providedType, nearMeshPosition, activeInteractionCount) {
        if (providedType === PointerEventTypes.POINTERDOWN || providedType === PointerEventTypes.POINTERMOVE) {
            if (!this._isInteractionInFrontOfButton(nearMeshPosition)) {
                // Near interaction mesh is behind the button, don't send a pointer down
                return PointerEventTypes.POINTERMOVE;
            }
            else {
                this._isNearPressed = true;
                this._interactionSurfaceHeight = this._getInteractionHeight(nearMeshPosition, this._collisionMesh.getAbsolutePosition());
            }
        }
        if (providedType === PointerEventTypes.POINTERUP) {
            if (activeInteractionCount == 0) {
                // We get the release for the down we swallowed earlier, swallow as well
                return PointerEventTypes.POINTERMOVE;
            }
            else {
                this._isNearPressed = false;
            }
        }
        return providedType;
    }
    _getTypeName() {
        return "TouchButton3D";
    }
    // Mesh association
    _createNode(scene) {
        return super._createNode(scene);
    }
    /**
     * Releases all associated resources
     */
    dispose() {
        super.dispose();
        // Clean up toggle observables
        this.onPointerUpObservable.removeCallback(this._toggleButtonCallback);
        this.onToggleObservable.clear();
        if (this._collisionMesh) {
            this._collisionMesh.dispose();
        }
    }
}
//# sourceMappingURL=touchButton3D.js.map