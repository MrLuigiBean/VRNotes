import { __decorate } from "@babylonjs/core/tslib.es6.js";
import { Rectangle } from "../rectangle.js";
import { Grid } from "../grid.js";
import { Control } from "../control.js";
import { _ScrollViewerWindow } from "./scrollViewerWindow.js";
import { ScrollBar } from "../sliders/scrollBar.js";
import { ImageScrollBar } from "../sliders/imageScrollBar.js";
import { RegisterClass } from "@babylonjs/core/Misc/typeStore.js";
import { serialize } from "@babylonjs/core/Misc/decorators.js";
/**
 * Class used to hold a viewer window and sliders in a grid
 */
export class ScrollViewer extends Rectangle {
    /**
     * Gets the horizontal scrollbar
     */
    get horizontalBar() {
        return this._horizontalBar;
    }
    /**
     * Gets the vertical scrollbar
     */
    get verticalBar() {
        return this._verticalBar;
    }
    /**
     * Adds a new control to the current container
     * @param control defines the control to add
     * @returns the current container
     */
    addControl(control) {
        if (!control) {
            return this;
        }
        this._window.addControl(control);
        return this;
    }
    /**
     * Removes a control from the current container
     * @param control defines the control to remove
     * @returns the current container
     */
    removeControl(control) {
        this._window.removeControl(control);
        return this;
    }
    /** Gets the list of children */
    get children() {
        return this._window.children;
    }
    _flagDescendantsAsMatrixDirty() {
        for (const child of this._children) {
            child._markMatrixAsDirty();
        }
    }
    /**
     * Freezes or unfreezes the controls in the window.
     * When controls are frozen, the scroll viewer can render a lot more quickly but updates to positions/sizes of controls
     * are not taken into account. If you want to change positions/sizes, unfreeze, perform the changes then freeze again
     */
    get freezeControls() {
        return this._window.freezeControls;
    }
    set freezeControls(value) {
        this._window.freezeControls = value;
    }
    /** Gets the bucket width */
    get bucketWidth() {
        return this._window.bucketWidth;
    }
    /** Gets the bucket height */
    get bucketHeight() {
        return this._window.bucketHeight;
    }
    /**
     * Sets the bucket sizes.
     * When freezeControls is true, setting a non-zero bucket size will improve performances by updating only
     * controls that are visible. The bucket sizes is used to subdivide (internally) the window area to smaller areas into which
     * controls are dispatched. So, the size should be roughly equals to the mean size of all the controls of
     * the window. To disable the usage of buckets, sets either width or height (or both) to 0.
     * Please note that using this option will raise the memory usage (the higher the bucket sizes, the less memory
     * used), that's why it is not enabled by default.
     * @param width width of the bucket
     * @param height height of the bucket
     */
    setBucketSizes(width, height) {
        this._window.setBucketSizes(width, height);
    }
    /**
     * Forces the horizontal scroll bar to be displayed
     */
    get forceHorizontalBar() {
        return this._forceHorizontalBar;
    }
    set forceHorizontalBar(value) {
        this._grid.setRowDefinition(1, value ? this._barSize : 0, true);
        this._horizontalBar.isVisible = value;
        this._forceHorizontalBar = value;
    }
    /**
     * Forces the vertical scroll bar to be displayed
     */
    get forceVerticalBar() {
        return this._forceVerticalBar;
    }
    set forceVerticalBar(value) {
        this._grid.setColumnDefinition(1, value ? this._barSize : 0, true);
        this._verticalBar.isVisible = value;
        this._forceVerticalBar = value;
    }
    /**
     * Creates a new ScrollViewer
     * @param name of ScrollViewer
     * @param isImageBased
     */
    constructor(name, isImageBased) {
        super(name);
        this._barSize = 20;
        this._pointerIsOver = false;
        this._wheelPrecision = 0.05;
        this._thumbLength = 0.5;
        this._thumbHeight = 1;
        this._barImageHeight = 1;
        this._horizontalBarImageHeight = 1;
        this._verticalBarImageHeight = 1;
        this._oldWindowContentsWidth = 0;
        this._oldWindowContentsHeight = 0;
        this._forceHorizontalBar = false;
        this._forceVerticalBar = false;
        this._useImageBar = isImageBased ? isImageBased : false;
        this.onDirtyObservable.add(() => {
            this._horizontalBarSpace.color = this.color;
            this._verticalBarSpace.color = this.color;
            this._dragSpace.color = this.color;
        });
        this.onPointerEnterObservable.add(() => {
            this._pointerIsOver = true;
        });
        this.onPointerOutObservable.add(() => {
            this._pointerIsOver = false;
        });
        this._grid = new Grid();
        if (this._useImageBar) {
            this._horizontalBar = new ImageScrollBar();
            this._verticalBar = new ImageScrollBar();
        }
        else {
            this._horizontalBar = new ScrollBar();
            this._verticalBar = new ScrollBar();
        }
        this._window = new _ScrollViewerWindow("scrollViewer_window");
        this._window.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        this._window.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        this._grid.addColumnDefinition(1);
        this._grid.addColumnDefinition(0, true);
        this._grid.addRowDefinition(1);
        this._grid.addRowDefinition(0, true);
        super.addControl(this._grid);
        this._grid.addControl(this._window, 0, 0);
        this._verticalBarSpace = new Rectangle();
        this._verticalBarSpace.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        this._verticalBarSpace.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        this._verticalBarSpace.thickness = 1;
        this._grid.addControl(this._verticalBarSpace, 0, 1);
        this._addBar(this._verticalBar, this._verticalBarSpace, true, Math.PI);
        this._horizontalBarSpace = new Rectangle();
        this._horizontalBarSpace.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        this._horizontalBarSpace.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        this._horizontalBarSpace.thickness = 1;
        this._grid.addControl(this._horizontalBarSpace, 1, 0);
        this._addBar(this._horizontalBar, this._horizontalBarSpace, false, 0);
        this._dragSpace = new Rectangle();
        this._dragSpace.thickness = 1;
        this._grid.addControl(this._dragSpace, 1, 1);
        // Colors
        if (!this._useImageBar) {
            this.barColor = "grey";
            this.barBackground = "transparent";
        }
    }
    /** Reset the scroll viewer window to initial size */
    resetWindow() {
        this._window.width = "100%";
        this._window.height = "100%";
    }
    _getTypeName() {
        return "ScrollViewer";
    }
    _buildClientSizes() {
        const ratio = this.host.idealRatio;
        this._window.parentClientWidth = this._currentMeasure.width - (this._verticalBar.isVisible || this.forceVerticalBar ? this._barSize * ratio : 0) - 2 * this.thickness;
        this._window.parentClientHeight = this._currentMeasure.height - (this._horizontalBar.isVisible || this.forceHorizontalBar ? this._barSize * ratio : 0) - 2 * this.thickness;
        this._clientWidth = this._window.parentClientWidth;
        this._clientHeight = this._window.parentClientHeight;
    }
    _additionalProcessing(parentMeasure, context) {
        super._additionalProcessing(parentMeasure, context);
        this._buildClientSizes();
    }
    _postMeasure() {
        super._postMeasure();
        this._updateScroller();
        this._setWindowPosition(false);
    }
    /**
     * Gets or sets the mouse wheel precision
     * from 0 to 1 with a default value of 0.05
     * */
    get wheelPrecision() {
        return this._wheelPrecision;
    }
    set wheelPrecision(value) {
        if (this._wheelPrecision === value) {
            return;
        }
        if (value < 0) {
            value = 0;
        }
        if (value > 1) {
            value = 1;
        }
        this._wheelPrecision = value;
    }
    /** Gets or sets the scroll bar container background color */
    get scrollBackground() {
        return this._horizontalBarSpace.background;
    }
    set scrollBackground(color) {
        if (this._horizontalBarSpace.background === color) {
            return;
        }
        this._horizontalBarSpace.background = color;
        this._verticalBarSpace.background = color;
    }
    /** Gets or sets the bar color */
    get barColor() {
        return this._barColor;
    }
    set barColor(color) {
        if (this._barColor === color) {
            return;
        }
        this._barColor = color;
        this._horizontalBar.color = color;
        this._verticalBar.color = color;
    }
    /** Gets or sets the bar image */
    get thumbImage() {
        return this._barImage;
    }
    set thumbImage(value) {
        if (this._barImage === value) {
            return;
        }
        this._barImage = value;
        const hb = this._horizontalBar;
        const vb = this._verticalBar;
        hb.thumbImage = value;
        vb.thumbImage = value;
    }
    /** Gets or sets the horizontal bar image */
    get horizontalThumbImage() {
        return this._horizontalBarImage;
    }
    set horizontalThumbImage(value) {
        if (this._horizontalBarImage === value) {
            return;
        }
        this._horizontalBarImage = value;
        const hb = this._horizontalBar;
        hb.thumbImage = value;
    }
    /** Gets or sets the vertical bar image */
    get verticalThumbImage() {
        return this._verticalBarImage;
    }
    set verticalThumbImage(value) {
        if (this._verticalBarImage === value) {
            return;
        }
        this._verticalBarImage = value;
        const vb = this._verticalBar;
        vb.thumbImage = value;
    }
    /** Gets or sets the size of the bar */
    get barSize() {
        return this._barSize;
    }
    set barSize(value) {
        if (this._barSize === value) {
            return;
        }
        this._barSize = value;
        this._markAsDirty();
        if (this._horizontalBar.isVisible) {
            this._grid.setRowDefinition(1, this._barSize, true);
        }
        if (this._verticalBar.isVisible) {
            this._grid.setColumnDefinition(1, this._barSize, true);
        }
    }
    /** Gets or sets the length of the thumb */
    get thumbLength() {
        return this._thumbLength;
    }
    set thumbLength(value) {
        if (this._thumbLength === value) {
            return;
        }
        if (value <= 0) {
            value = 0.1;
        }
        if (value > 1) {
            value = 1;
        }
        this._thumbLength = value;
        const hb = this._horizontalBar;
        const vb = this._verticalBar;
        hb.thumbLength = value;
        vb.thumbLength = value;
        this._markAsDirty();
    }
    /** Gets or sets the height of the thumb */
    get thumbHeight() {
        return this._thumbHeight;
    }
    set thumbHeight(value) {
        if (this._thumbHeight === value) {
            return;
        }
        if (value <= 0) {
            value = 0.1;
        }
        if (value > 1) {
            value = 1;
        }
        this._thumbHeight = value;
        const hb = this._horizontalBar;
        const vb = this._verticalBar;
        hb.thumbHeight = value;
        vb.thumbHeight = value;
        this._markAsDirty();
    }
    /** Gets or sets the height of the bar image */
    get barImageHeight() {
        return this._barImageHeight;
    }
    set barImageHeight(value) {
        if (this._barImageHeight === value) {
            return;
        }
        if (value <= 0) {
            value = 0.1;
        }
        if (value > 1) {
            value = 1;
        }
        this._barImageHeight = value;
        const hb = this._horizontalBar;
        const vb = this._verticalBar;
        hb.barImageHeight = value;
        vb.barImageHeight = value;
        this._markAsDirty();
    }
    /** Gets or sets the height of the horizontal bar image */
    get horizontalBarImageHeight() {
        return this._horizontalBarImageHeight;
    }
    set horizontalBarImageHeight(value) {
        if (this._horizontalBarImageHeight === value) {
            return;
        }
        if (value <= 0) {
            value = 0.1;
        }
        if (value > 1) {
            value = 1;
        }
        this._horizontalBarImageHeight = value;
        const hb = this._horizontalBar;
        hb.barImageHeight = value;
        this._markAsDirty();
    }
    /** Gets or sets the height of the vertical bar image */
    get verticalBarImageHeight() {
        return this._verticalBarImageHeight;
    }
    set verticalBarImageHeight(value) {
        if (this._verticalBarImageHeight === value) {
            return;
        }
        if (value <= 0) {
            value = 0.1;
        }
        if (value > 1) {
            value = 1;
        }
        this._verticalBarImageHeight = value;
        const vb = this._verticalBar;
        vb.barImageHeight = value;
        this._markAsDirty();
    }
    /** Gets or sets the bar background */
    get barBackground() {
        return this._barBackground;
    }
    set barBackground(color) {
        if (this._barBackground === color) {
            return;
        }
        this._barBackground = color;
        const hb = this._horizontalBar;
        const vb = this._verticalBar;
        hb.background = color;
        vb.background = color;
        this._dragSpace.background = color;
    }
    /** Gets or sets the bar background image */
    get barImage() {
        return this._barBackgroundImage;
    }
    set barImage(value) {
        this._barBackgroundImage = value;
        const hb = this._horizontalBar;
        const vb = this._verticalBar;
        hb.backgroundImage = value;
        vb.backgroundImage = value;
    }
    /** Gets or sets the horizontal bar background image */
    get horizontalBarImage() {
        return this._horizontalBarBackgroundImage;
    }
    set horizontalBarImage(value) {
        this._horizontalBarBackgroundImage = value;
        const hb = this._horizontalBar;
        hb.backgroundImage = value;
    }
    /** Gets or sets the vertical bar background image */
    get verticalBarImage() {
        return this._verticalBarBackgroundImage;
    }
    set verticalBarImage(value) {
        this._verticalBarBackgroundImage = value;
        const vb = this._verticalBar;
        vb.backgroundImage = value;
    }
    _setWindowPosition(force = true) {
        const ratio = this.host.idealRatio;
        const windowContentsWidth = this._window._currentMeasure.width;
        const windowContentsHeight = this._window._currentMeasure.height;
        if (!force && this._oldWindowContentsWidth === windowContentsWidth && this._oldWindowContentsHeight === windowContentsHeight) {
            return;
        }
        this._oldWindowContentsWidth = windowContentsWidth;
        this._oldWindowContentsHeight = windowContentsHeight;
        const _endLeft = this._clientWidth - windowContentsWidth;
        const _endTop = this._clientHeight - windowContentsHeight;
        const newLeft = (this._horizontalBar.value / ratio) * _endLeft + "px";
        const newTop = (this._verticalBar.value / ratio) * _endTop + "px";
        if (newLeft !== this._window.left) {
            this._window.left = newLeft;
            if (!this.freezeControls) {
                this._rebuildLayout = true;
            }
        }
        if (newTop !== this._window.top) {
            this._window.top = newTop;
            if (!this.freezeControls) {
                this._rebuildLayout = true;
            }
        }
    }
    /** @internal */
    _updateScroller() {
        const windowContentsWidth = this._window._currentMeasure.width;
        const windowContentsHeight = this._window._currentMeasure.height;
        if (this._horizontalBar.isVisible && windowContentsWidth <= this._clientWidth && !this.forceHorizontalBar) {
            this._grid.setRowDefinition(1, 0, true);
            this._horizontalBar.isVisible = false;
            this._horizontalBar.value = 0;
            this._rebuildLayout = true;
        }
        else if (!this._horizontalBar.isVisible && (windowContentsWidth > this._clientWidth || this.forceHorizontalBar)) {
            this._grid.setRowDefinition(1, this._barSize, true);
            this._horizontalBar.isVisible = true;
            this._rebuildLayout = true;
        }
        if (this._verticalBar.isVisible && windowContentsHeight <= this._clientHeight && !this.forceVerticalBar) {
            this._grid.setColumnDefinition(1, 0, true);
            this._verticalBar.isVisible = false;
            this._verticalBar.value = 0;
            this._rebuildLayout = true;
        }
        else if (!this._verticalBar.isVisible && (windowContentsHeight > this._clientHeight || this.forceVerticalBar)) {
            this._grid.setColumnDefinition(1, this._barSize, true);
            this._verticalBar.isVisible = true;
            this._rebuildLayout = true;
        }
        this._buildClientSizes();
        const ratio = this.host.idealRatio;
        this._horizontalBar.thumbWidth = this._thumbLength * 0.9 * (this._clientWidth / ratio) + "px";
        this._verticalBar.thumbWidth = this._thumbLength * 0.9 * (this._clientHeight / ratio) + "px";
    }
    _link(host) {
        super._link(host);
        this._attachWheel();
    }
    /**
     * @internal
     */
    _addBar(barControl, barContainer, isVertical, rotation) {
        barControl.paddingLeft = 0;
        barControl.width = "100%";
        barControl.height = "100%";
        barControl.barOffset = 0;
        barControl.value = 0;
        barControl.maximum = 1;
        barControl.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        barControl.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
        barControl.isVertical = isVertical;
        barControl.rotation = rotation;
        barControl.isVisible = false;
        barContainer.addControl(barControl);
        barControl.onValueChangedObservable.add(() => {
            this._setWindowPosition();
        });
    }
    /** @internal */
    _attachWheel() {
        if (!this._host || this._onWheelObserver) {
            return;
        }
        this._onWheelObserver = this.onWheelObservable.add((pi) => {
            if (!this._pointerIsOver || this.isReadOnly) {
                return;
            }
            if (this._verticalBar.isVisible == true) {
                if (pi.y < 0 && this._verticalBar.value > 0) {
                    this._verticalBar.value -= this._wheelPrecision;
                }
                else if (pi.y > 0 && this._verticalBar.value < this._verticalBar.maximum) {
                    this._verticalBar.value += this._wheelPrecision;
                }
            }
            if (this._horizontalBar.isVisible == true) {
                if (pi.x < 0 && this._horizontalBar.value < this._horizontalBar.maximum) {
                    this._horizontalBar.value += this._wheelPrecision;
                }
                else if (pi.x > 0 && this._horizontalBar.value > 0) {
                    this._horizontalBar.value -= this._wheelPrecision;
                }
            }
        });
    }
    _renderHighlightSpecific(context) {
        if (!this.isHighlighted) {
            return;
        }
        super._renderHighlightSpecific(context);
        this._grid._renderHighlightSpecific(context);
        context.restore();
    }
    /** Releases associated resources */
    dispose() {
        this.onWheelObservable.remove(this._onWheelObserver);
        this._onWheelObserver = null;
        super.dispose();
    }
}
__decorate([
    serialize()
], ScrollViewer.prototype, "wheelPrecision", null);
__decorate([
    serialize()
], ScrollViewer.prototype, "scrollBackground", null);
__decorate([
    serialize()
], ScrollViewer.prototype, "barColor", null);
__decorate([
    serialize()
], ScrollViewer.prototype, "barSize", null);
__decorate([
    serialize()
], ScrollViewer.prototype, "barBackground", null);
RegisterClass("BABYLON.GUI.ScrollViewer", ScrollViewer);
//# sourceMappingURL=scrollViewer.js.map