import { __decorate } from "@babylonjs/core/tslib.es6.js";
import { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh.js";
import { Control } from "./control.js";
import { MultiLinePoint } from "../multiLinePoint.js";
import { RegisterClass } from "@babylonjs/core/Misc/typeStore.js";
import { serialize } from "@babylonjs/core/Misc/decorators.js";
/**
 * Class used to create multi line control
 */
export class MultiLine extends Control {
    /**
     * Creates a new MultiLine
     * @param name defines the control name
     */
    constructor(name) {
        super(name);
        this.name = name;
        this._lineWidth = 1;
        /** Function called when a point is updated */
        this.onPointUpdate = () => {
            this._markAsDirty();
        };
        this._automaticSize = true;
        this.isHitTestVisible = false;
        this._horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        this._verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        this._dash = [];
        this._points = [];
    }
    /** Gets or sets dash pattern */
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
    /**
     * Gets point stored at specified index
     * @param index defines the index to look for
     * @returns the requested point if found
     */
    getAt(index) {
        if (!this._points[index]) {
            this._points[index] = new MultiLinePoint(this);
        }
        return this._points[index];
    }
    /**
     * Adds new points to the point collection
     * @param items defines the list of items (mesh, control or 2d coordinates) to add
     * @returns the list of created MultiLinePoint
     */
    add(...items) {
        return items.map((item) => this.push(item));
    }
    /**
     * Adds a new point to the point collection
     * @param item defines the item (mesh, control or 2d coordinates) to add
     * @returns the created MultiLinePoint
     */
    push(item) {
        const point = this.getAt(this._points.length);
        if (item == null) {
            return point;
        }
        if (item instanceof AbstractMesh) {
            point.mesh = item;
        }
        else if (item instanceof Control) {
            point.control = item;
        }
        else if (item.x != null && item.y != null) {
            point.x = item.x;
            point.y = item.y;
        }
        return point;
    }
    /**
     * Remove a specific value or point from the active point collection
     * @param value defines the value or point to remove
     */
    remove(value) {
        let index;
        if (value instanceof MultiLinePoint) {
            index = this._points.indexOf(value);
            if (index === -1) {
                return;
            }
        }
        else {
            index = value;
        }
        const point = this._points[index];
        if (!point) {
            return;
        }
        point.dispose();
        this._points.splice(index, 1);
    }
    /**
     * Resets this object to initial state (no point)
     */
    reset() {
        while (this._points.length > 0) {
            this.remove(this._points.length - 1);
        }
    }
    /**
     * Resets all links
     */
    resetLinks() {
        this._points.forEach((point) => {
            if (point != null) {
                point.resetLinks();
            }
        });
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
    set horizontalAlignment(value) {
        return;
    }
    set verticalAlignment(value) {
        return;
    }
    _getTypeName() {
        return "MultiLine";
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
        context.strokeStyle = this.color;
        context.lineWidth = this._lineWidth;
        context.setLineDash(this._dash);
        context.beginPath();
        let first = true; //first index is not necessarily 0
        let previousPoint;
        this._points.forEach((point) => {
            if (!point) {
                return;
            }
            if (first) {
                context.moveTo(point._point.x, point._point.y);
                first = false;
            }
            else {
                if (point._point.z < 1 && previousPoint.z < 1) {
                    context.lineTo(point._point.x, point._point.y);
                }
                else {
                    context.moveTo(point._point.x, point._point.y);
                }
            }
            previousPoint = point._point;
        });
        context.stroke();
        context.restore();
    }
    _additionalProcessing() {
        this._minX = null;
        this._minY = null;
        this._maxX = null;
        this._maxY = null;
        this._points.forEach((point) => {
            if (!point) {
                return;
            }
            point.translate();
            if (this._minX == null || point._point.x < this._minX) {
                this._minX = point._point.x;
            }
            if (this._minY == null || point._point.y < this._minY) {
                this._minY = point._point.y;
            }
            if (this._maxX == null || point._point.x > this._maxX) {
                this._maxX = point._point.x;
            }
            if (this._maxY == null || point._point.y > this._maxY) {
                this._maxY = point._point.y;
            }
        });
        if (this._minX == null) {
            this._minX = 0;
        }
        if (this._minY == null) {
            this._minY = 0;
        }
        if (this._maxX == null) {
            this._maxX = 0;
        }
        if (this._maxY == null) {
            this._maxY = 0;
        }
    }
    _measure() {
        if (this._minX == null || this._maxX == null || this._minY == null || this._maxY == null) {
            return;
        }
        this._currentMeasure.width = Math.abs(this._maxX - this._minX) + this._lineWidth;
        this._currentMeasure.height = Math.abs(this._maxY - this._minY) + this._lineWidth;
    }
    _computeAlignment() {
        if (this._minX == null || this._minY == null) {
            return;
        }
        this._currentMeasure.left = this._minX - this._lineWidth / 2;
        this._currentMeasure.top = this._minY - this._lineWidth / 2;
    }
    dispose() {
        this.reset();
        super.dispose();
    }
}
__decorate([
    serialize()
], MultiLine.prototype, "dash", null);
RegisterClass("BABYLON.GUI.MultiLine", MultiLine);
//# sourceMappingURL=multiLine.js.map