import { Vector3 } from "@babylonjs/core/Maths/math.vector.js";
import { Epsilon } from "@babylonjs/core/Maths/math.constants.js";
import { ValueAndUnit } from "./valueAndUnit.js";
/**
 * Class used to store a point for a MultiLine object.
 * The point can be pure 2D coordinates, a mesh or a control
 */
export class MultiLinePoint {
    /**
     * Creates a new MultiLinePoint
     * @param multiLine defines the source MultiLine object
     */
    constructor(multiLine) {
        this._multiLine = multiLine;
        this._x = new ValueAndUnit(0);
        this._y = new ValueAndUnit(0);
        this._point = new Vector3(0, 0, 0);
    }
    /** Gets or sets x coordinate */
    get x() {
        return this._x.toString(this._multiLine._host);
    }
    set x(value) {
        if (this._x.toString(this._multiLine._host) === value) {
            return;
        }
        if (this._x.fromString(value)) {
            this._multiLine._markAsDirty();
        }
    }
    /** Gets or sets y coordinate */
    get y() {
        return this._y.toString(this._multiLine._host);
    }
    set y(value) {
        if (this._y.toString(this._multiLine._host) === value) {
            return;
        }
        if (this._y.fromString(value)) {
            this._multiLine._markAsDirty();
        }
    }
    /** Gets or sets the control associated with this point */
    get control() {
        return this._control;
    }
    set control(value) {
        if (this._control === value) {
            return;
        }
        if (this._control && this._controlObserver) {
            this._control.onDirtyObservable.remove(this._controlObserver);
            this._controlObserver = null;
        }
        this._control = value;
        if (this._control) {
            this._controlObserver = this._control.onDirtyObservable.add(this._multiLine.onPointUpdate);
        }
        this._multiLine._markAsDirty();
    }
    /** Gets or sets the mesh associated with this point */
    get mesh() {
        return this._mesh;
    }
    set mesh(value) {
        if (this._mesh === value) {
            return;
        }
        if (this._mesh && this._meshObserver) {
            this._mesh.getScene().onAfterCameraRenderObservable.remove(this._meshObserver);
        }
        this._mesh = value;
        if (this._mesh) {
            this._meshObserver = this._mesh.getScene().onAfterCameraRenderObservable.add(this._multiLine.onPointUpdate);
        }
        this._multiLine._markAsDirty();
    }
    /** Resets links */
    resetLinks() {
        this.control = null;
        this.mesh = null;
    }
    /**
     * Gets a translation vector with Z component
     * @returns the translation vector
     */
    translate() {
        this._point = this._translatePoint();
        return this._point;
    }
    _translatePoint() {
        if (this._mesh != null) {
            return this._multiLine._host.getProjectedPositionWithZ(this._mesh.getBoundingInfo().boundingSphere.center, this._mesh.getWorldMatrix());
        }
        else if (this._control != null) {
            return new Vector3(this._control.centerX, this._control.centerY, 1 - Epsilon);
        }
        else {
            const host = this._multiLine._host;
            const xValue = this._x.getValueInPixel(host, Number(host._canvas.width));
            const yValue = this._y.getValueInPixel(host, Number(host._canvas.height));
            return new Vector3(xValue, yValue, 1 - Epsilon);
        }
    }
    /** Release associated resources */
    dispose() {
        this.resetLinks();
    }
}
//# sourceMappingURL=multiLinePoint.js.map