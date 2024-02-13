import { __decorate } from "@babylonjs/core/tslib.es6.js";
import { Vector3, Matrix } from "@babylonjs/core/Maths/math.vector.js";
import { Tools } from "@babylonjs/core/Misc/tools.js";
import { Control } from "./control.js";
import { ValueAndUnit } from "../valueAndUnit.js";
import { RegisterClass } from "@babylonjs/core/Misc/typeStore.js";
import { serialize } from "@babylonjs/core/Misc/decorators.js";
/** Class used to render 2D lines */
export class Line extends Control {
    /** Gets or sets the dash pattern */
    get dash() {
        return this._dash;
    }
    set dash(value) {
        if (this._dash === value) {
            return;
        }
        this._dash = value;
        this._markAsDirty();
    }
    /** Gets or sets the control connected with the line end */
    get connectedControl() {
        return this._connectedControl;
    }
    set connectedControl(value) {
        if (this._connectedControl === value) {
            return;
        }
        if (this._connectedControlDirtyObserver && this._connectedControl) {
            this._connectedControl.onDirtyObservable.remove(this._connectedControlDirtyObserver);
            this._connectedControlDirtyObserver = null;
        }
        if (value) {
            this._connectedControlDirtyObserver = value.onDirtyObservable.add(() => this._markAsDirty());
        }
        this._connectedControl = value;
        this._markAsDirty();
    }
    /** Gets or sets start coordinates on X axis */
    get x1() {
        return this._x1.toString(this._host);
    }
    set x1(value) {
        if (this._x1.toString(this._host) === value) {
            return;
        }
        if (this._x1.fromString(value)) {
            this._markAsDirty();
        }
    }
    /** Gets or sets start coordinates on Y axis */
    get y1() {
        return this._y1.toString(this._host);
    }
    set y1(value) {
        if (this._y1.toString(this._host) === value) {
            return;
        }
        if (this._y1.fromString(value)) {
            this._markAsDirty();
        }
    }
    /** Gets or sets end coordinates on X axis */
    get x2() {
        return this._x2.toString(this._host);
    }
    set x2(value) {
        if (this._x2.toString(this._host) === value) {
            return;
        }
        if (this._x2.fromString(value)) {
            this._markAsDirty();
        }
    }
    /** Gets or sets end coordinates on Y axis */
    get y2() {
        return this._y2.toString(this._host);
    }
    set y2(value) {
        if (this._y2.toString(this._host) === value) {
            return;
        }
        if (this._y2.fromString(value)) {
            this._markAsDirty();
        }
    }
    /** Gets or sets line width */
    get lineWidth() {
        return this._lineWidth;
    }
    set lineWidth(value) {
        if (this._lineWidth === value) {
            return;
        }
        this._lineWidth = value;
        this._markAsDirty();
    }
    /** Gets or sets horizontal alignment */
    set horizontalAlignment(value) {
        return;
    }
    /** Gets or sets vertical alignment */
    set verticalAlignment(value) {
        return;
    }
    /** @internal */
    get _effectiveX2() {
        return (this._connectedControl ? this._connectedControl.centerX : 0) + this._x2.getValue(this._host);
    }
    /** @internal */
    get _effectiveY2() {
        return (this._connectedControl ? this._connectedControl.centerY : 0) + this._y2.getValue(this._host);
    }
    /**
     * Creates a new Line
     * @param name defines the control name
     */
    constructor(name) {
        super(name);
        this.name = name;
        this._lineWidth = 1;
        /** @internal */
        this._x1 = new ValueAndUnit(0);
        /** @internal */
        this._y1 = new ValueAndUnit(0);
        /** @internal */
        this._x2 = new ValueAndUnit(0);
        /** @internal */
        this._y2 = new ValueAndUnit(0);
        this._dash = new Array();
        this._automaticSize = true;
        this.isHitTestVisible = false;
        this._horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        this._verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    }
    _getTypeName() {
        return "Line";
    }
    _draw(context) {
        context.save();
        if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
            context.shadowColor = this.shadowColor;
            context.shadowBlur = this.shadowBlur;
            context.shadowOffsetX = this.shadowOffsetX;
            context.shadowOffsetY = this.shadowOffsetY;
        }
        this._applyStates(context);
        context.strokeStyle = this._getColor(context);
        context.lineWidth = this._lineWidth;
        context.setLineDash(this._dash);
        context.beginPath();
        context.moveTo(this._cachedParentMeasure.left + this._x1.getValue(this._host), this._cachedParentMeasure.top + this._y1.getValue(this._host));
        context.lineTo(this._cachedParentMeasure.left + this._effectiveX2, this._cachedParentMeasure.top + this._effectiveY2);
        context.stroke();
        context.restore();
    }
    _measure() {
        // Width / Height
        this._currentMeasure.width = Math.abs(this._x1.getValue(this._host) - this._effectiveX2) + this._lineWidth;
        this._currentMeasure.height = Math.abs(this._y1.getValue(this._host) - this._effectiveY2) + this._lineWidth;
    }
    _computeAlignment(parentMeasure) {
        this._currentMeasure.left = parentMeasure.left + Math.min(this._x1.getValue(this._host), this._effectiveX2) - this._lineWidth / 2;
        this._currentMeasure.top = parentMeasure.top + Math.min(this._y1.getValue(this._host), this._effectiveY2) - this._lineWidth / 2;
    }
    /**
     * Move one end of the line given 3D cartesian coordinates.
     * @param position Targeted world position
     * @param scene Scene
     * @param end (opt) Set to true to assign x2 and y2 coordinates of the line. Default assign to x1 and y1.
     */
    moveToVector3(position, scene, end = false) {
        if (!this._host || this.parent !== this._host._rootContainer) {
            Tools.Error("Cannot move a control to a vector3 if the control is not at root level");
            return;
        }
        const globalViewport = this._host._getGlobalViewport();
        const projectedPosition = Vector3.Project(position, Matrix.IdentityReadOnly, scene.getTransformMatrix(), globalViewport);
        this._moveToProjectedPosition(projectedPosition, end);
        if (projectedPosition.z < 0 || projectedPosition.z > 1) {
            this.notRenderable = true;
            return;
        }
        this.notRenderable = false;
    }
    /**
     * Move one end of the line to a position in screen absolute space.
     * @param projectedPosition Position in screen absolute space (X, Y)
     * @param end (opt) Set to true to assign x2 and y2 coordinates of the line. Default assign to x1 and y1.
     */
    _moveToProjectedPosition(projectedPosition, end = false) {
        const x = projectedPosition.x + this._linkOffsetX.getValue(this._host) + "px";
        const y = projectedPosition.y + this._linkOffsetY.getValue(this._host) + "px";
        if (end) {
            this.x2 = x;
            this.y2 = y;
            this._x2.ignoreAdaptiveScaling = true;
            this._y2.ignoreAdaptiveScaling = true;
        }
        else {
            this.x1 = x;
            this.y1 = y;
            this._x1.ignoreAdaptiveScaling = true;
            this._y1.ignoreAdaptiveScaling = true;
        }
    }
}
__decorate([
    serialize()
], Line.prototype, "dash", null);
__decorate([
    serialize()
], Line.prototype, "x1", null);
__decorate([
    serialize()
], Line.prototype, "y1", null);
__decorate([
    serialize()
], Line.prototype, "x2", null);
__decorate([
    serialize()
], Line.prototype, "y2", null);
__decorate([
    serialize()
], Line.prototype, "lineWidth", null);
RegisterClass("BABYLON.GUI.Line", Line);
//# sourceMappingURL=line.js.map