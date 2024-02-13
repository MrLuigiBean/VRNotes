import { TouchHolographicButton } from "./touchHolographicButton.js";
import { DefaultBehavior } from "../behaviors/defaultBehavior.js";
import { TouchHolographicMenu } from "./touchHolographicMenu.js";
/**
 * NearMenu that displays buttons and follows the camera
 * @since 5.0.0
 */
export class NearMenu extends TouchHolographicMenu {
    /**
     * Regroups all mesh behaviors for the near menu
     */
    get defaultBehavior() {
        return this._defaultBehavior;
    }
    /**
     * Indicates if the near menu is world-pinned
     */
    get isPinned() {
        return this._isPinned;
    }
    set isPinned(value) {
        // Tell the pin button to toggle if this was called manually, for clean state control
        if (this._pinButton.isToggled !== value) {
            this._pinButton.isToggled = value;
            return;
        }
        this._isPinned = value;
        if (value) {
            this._defaultBehavior.followBehaviorEnabled = false;
        }
        else {
            this._defaultBehavior.followBehaviorEnabled = true;
        }
    }
    _createPinButton(parent) {
        const control = new TouchHolographicButton("pin" + this.name, false);
        control.imageUrl = NearMenu._ASSETS_BASE_URL + NearMenu._PIN_ICON_FILENAME;
        control.parent = this;
        control._host = this._host;
        control.isToggleButton = true;
        control.onToggleObservable.add((newState) => {
            this.isPinned = newState;
        });
        if (this._host.utilityLayer) {
            control._prepareNode(this._host.utilityLayer.utilityLayerScene);
            control.scaling.scaleInPlace(TouchHolographicMenu.MENU_BUTTON_SCALE);
            if (control.node) {
                control.node.parent = parent;
            }
        }
        return control;
    }
    _createNode(scene) {
        const node = super._createNode(scene);
        this._pinButton = this._createPinButton(node);
        this.isPinned = false;
        this._defaultBehavior.attach(node, [this._backPlate]);
        this._defaultBehavior.followBehavior.ignoreCameraPitchAndRoll = true;
        this._defaultBehavior.followBehavior.pitchOffset = -15;
        this._defaultBehavior.followBehavior.minimumDistance = 0.3;
        this._defaultBehavior.followBehavior.defaultDistance = 0.4;
        this._defaultBehavior.followBehavior.maximumDistance = 0.6;
        this._backPlate.isNearGrabbable = true;
        node.isVisible = false;
        return node;
    }
    _finalProcessing() {
        super._finalProcessing();
        this._pinButton.position.copyFromFloats((this._backPlate.scaling.x + TouchHolographicMenu.MENU_BUTTON_SCALE) / 2, this._backPlate.scaling.y / 2, 0);
    }
    /**
     * Creates a near menu GUI 3D control
     * @param name name of the near menu
     */
    constructor(name) {
        super(name);
        this._isPinned = false;
        this._defaultBehavior = new DefaultBehavior();
        this._dragObserver = this._defaultBehavior.sixDofDragBehavior.onDragObservable.add(() => {
            this.isPinned = true;
        });
        this.backPlateMargin = 1;
    }
    /**
     * Disposes the near menu
     */
    dispose() {
        super.dispose();
        this._defaultBehavior.sixDofDragBehavior.onDragObservable.remove(this._dragObserver);
        this._defaultBehavior.detach();
    }
}
/**
 * Base Url for the assets.
 */
NearMenu._ASSETS_BASE_URL = "https://assets.babylonjs.com/meshes/MRTK/";
/**
 * File name for the close icon.
 */
NearMenu._PIN_ICON_FILENAME = "IconPin.png";
//# sourceMappingURL=nearMenu.js.map