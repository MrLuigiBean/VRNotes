import { VolumeBasedPanel } from "./volumeBasedPanel.js";
import { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import { CreateBox } from "@babylonjs/core/Meshes/Builders/boxBuilder.js";
import { FluentMaterial } from "../materials/fluent/fluentMaterial.js";
import { Color3 } from "@babylonjs/core/Maths/math.color.js";
import { Logger } from "@babylonjs/core/Misc/logger.js";
/**
 * Simple menu that can contain holographic buttons
 */
export class TouchHolographicMenu extends VolumeBasedPanel {
    /**
     * Gets or sets the margin size of the backplate in button size units.
     * Setting this to 1, will make the backPlate margin the size of 1 button
     */
    get backPlateMargin() {
        return this._backPlateMargin;
    }
    set backPlateMargin(value) {
        this._backPlateMargin = value;
        if (this._children.length >= 1) {
            this.children.forEach((control) => {
                this._updateCurrentMinMax(control.position);
            });
            this._updateMargins();
        }
    }
    _createNode(scene) {
        const node = new Mesh(`menu_${this.name}`, scene);
        this._backPlate = CreateBox("backPlate" + this.name, { size: 1 }, scene);
        this._backPlate.parent = node;
        return node;
    }
    _affectMaterial(mesh) {
        this._backPlateMaterial = new FluentMaterial(this.name + "backPlateMaterial", mesh.getScene());
        this._backPlateMaterial.albedoColor = new Color3(0.08, 0.15, 0.55);
        this._backPlateMaterial.renderBorders = true;
        this._backPlateMaterial.renderHoverLight = true;
        this._pickedPointObserver = this._host.onPickedPointChangedObservable.add((pickedPoint) => {
            if (pickedPoint) {
                this._backPlateMaterial.hoverPosition = pickedPoint;
                this._backPlateMaterial.hoverColor.a = 1.0;
            }
            else {
                this._backPlateMaterial.hoverColor.a = 0;
            }
        });
        this._backPlate.material = this._backPlateMaterial;
    }
    _mapGridNode(control, nodePosition) {
        // Simple plane mapping for the menu
        const mesh = control.mesh;
        if (!mesh) {
            return;
        }
        control.position = nodePosition.clone();
        this._updateCurrentMinMax(nodePosition);
    }
    _finalProcessing() {
        this._updateMargins();
    }
    _updateCurrentMinMax(nodePosition) {
        if (!this._currentMin) {
            this._currentMin = nodePosition.clone();
            this._currentMax = nodePosition.clone();
        }
        this._currentMin.minimizeInPlace(nodePosition);
        this._currentMax.maximizeInPlace(nodePosition);
    }
    _updateMargins() {
        if (this._children.length > 0) {
            this._currentMin.addInPlaceFromFloats(-this._cellWidth / 2, -this._cellHeight / 2, 0);
            this._currentMax.addInPlaceFromFloats(this._cellWidth / 2, this._cellHeight / 2, 0);
            const extendSize = this._currentMax.subtract(this._currentMin);
            // Also add a % margin
            this._backPlate.scaling.x = extendSize.x + this._cellWidth * this.backPlateMargin;
            this._backPlate.scaling.y = extendSize.y + this._cellHeight * this.backPlateMargin;
            this._backPlate.scaling.z = 0.001;
            for (let i = 0; i < this._children.length; i++) {
                this._children[i].position.subtractInPlace(this._currentMin).subtractInPlace(extendSize.scale(0.5));
                this._children[i].position.z -= 0.01;
            }
        }
        this._currentMin = null;
        this._currentMax = null;
    }
    /**
     * Creates a holographic menu GUI 3D control
     * @param name name of the menu
     */
    constructor(name) {
        super(name);
        this._backPlateMargin = 1.25;
    }
    /**
     * Adds a button to the menu.
     * Please note that the back material of the button will be set to transparent as it is attached to the menu.
     *
     * @param button Button to add
     * @returns This menu
     */
    addButton(button) {
        // Block updating the layout until the button is resized (which has to happen after node creation)
        const wasLayoutBlocked = this.blockLayout;
        if (!wasLayoutBlocked) {
            this.blockLayout = true;
        }
        super.addControl(button);
        button.isBackplateVisible = false;
        button.scaling.scaleInPlace(TouchHolographicMenu.MENU_BUTTON_SCALE);
        // Unblocking the layout triggers the pending layout update that uses the size of the buttons to determine the size of the backing mesh
        if (!wasLayoutBlocked) {
            this.blockLayout = false;
        }
        return this;
    }
    /**
     * This method should not be used directly. It is inherited from `Container3D`.
     * Please use `addButton` instead.
     * @param _control
     * @returns
     */
    addControl(_control) {
        Logger.Warn("TouchHolographicMenu can only contain buttons. Please use the method `addButton` instead.");
        return this;
    }
    /**
     * Disposes the menu
     */
    dispose() {
        super.dispose();
        this._host.onPickedPointChangedObservable.remove(this._pickedPointObserver);
    }
}
/**
 * Scale for the buttons added to the menu
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
TouchHolographicMenu.MENU_BUTTON_SCALE = 1;
//# sourceMappingURL=touchHolographicMenu.js.map