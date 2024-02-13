import { BaseGradient } from "./BaseGradient.js";
import { RegisterClass } from "@babylonjs/core/Misc/typeStore.js";
/**
 * Gradient along a line that connects two coordinates.
 * These coordinates are relative to the canvas' space, not to any control's space.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createLinearGradient
 */
export class LinearGradient extends BaseGradient {
    /**
     * Creates a new linear gradient
     * @param x0
     * @param y0
     * @param x1
     * @param y1
     */
    constructor(x0, y0, x1, y1) {
        super();
        this._x0 = x0 ?? 0;
        this._y0 = y0 ?? 0;
        this._x1 = x1 ?? 0;
        this._y1 = y1 ?? 0;
    }
    _createCanvasGradient(context) {
        return context.createLinearGradient(this._x0, this._y0, this._x1, this._y1);
    }
    /** X axis coordinate of the starting point in the line */
    get x0() {
        return this._x0;
    }
    /** X axis coordinate of the ending point in the line */
    get x1() {
        return this._x1;
    }
    /** Y axis coordinate of the starting point in the line */
    get y0() {
        return this._y0;
    }
    /** Y axis coordinate of the ending point in the line */
    get y1() {
        return this._y1;
    }
    /**
     * Class name of the gradient
     * @returns the class name of the gradient
     */
    getClassName() {
        return "LinearGradient";
    }
    /**
     * Serializes this gradient
     * @param serializationObject the object to serialize to
     */
    serialize(serializationObject) {
        super.serialize(serializationObject);
        serializationObject.x0 = this._x0;
        serializationObject.y0 = this._y0;
        serializationObject.x1 = this._x1;
        serializationObject.y1 = this._y1;
    }
    /**
     * Parses a gradient from a serialization object
     * @param serializationObject the object to parse from
     */
    parse(serializationObject) {
        super.parse(serializationObject);
        this._x0 = serializationObject.x0;
        this._y0 = serializationObject.y0;
        this._x1 = serializationObject.x1;
        this._y1 = serializationObject.y1;
    }
}
RegisterClass("BABYLON.GUI.LinearGradient", LinearGradient);
//# sourceMappingURL=LinearGradient.js.map