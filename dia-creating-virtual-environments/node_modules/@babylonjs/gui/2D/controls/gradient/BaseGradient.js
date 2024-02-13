/*
 * Base Gradient class. Should not be used directly.
 */
/**
 * Class that serves as a base for all the gradients created from context.
 */
export class BaseGradient {
    constructor() {
        this._colorStops = [];
        this._gradientDirty = true;
    }
    _addColorStopsToCanvasGradient() {
        for (const stop of this._colorStops) {
            this._canvasGradient.addColorStop(stop.offset, stop.color);
        }
    }
    /**
     * If there are any changes or the context changed, regenerate the canvas gradient object. Else,
     * reuse the existing gradient.
     **/
    getCanvasGradient(context) {
        if (this._gradientDirty || this._context !== context) {
            this._context = context;
            this._canvasGradient = this._createCanvasGradient(context);
            this._addColorStopsToCanvasGradient();
            this._gradientDirty = false;
        }
        return this._canvasGradient;
    }
    /**
     * Adds a new color stop to the gradient.
     * @param offset the offset of the stop on the gradient. Should be between 0 and 1
     * @param color the color of the stop
     */
    addColorStop(offset, color) {
        this._colorStops.push({ offset, color });
        this._gradientDirty = true;
    }
    /**
     * Removes an existing color stop with the specified offset from the gradient
     * @param offset the offset of the stop to be removed
     */
    removeColorStop(offset) {
        this._colorStops = this._colorStops.filter((colorStop) => colorStop.offset !== offset);
        this._gradientDirty = true;
    }
    /**
     * Removes all color stops from the gradient
     */
    clearColorStops() {
        this._colorStops = [];
        this._gradientDirty = true;
    }
    /** Color stops of the gradient */
    get colorStops() {
        return this._colorStops;
    }
    /** Type of the gradient */
    getClassName() {
        return "BaseGradient";
    }
    /** Serialize into a json object */
    serialize(serializationObject) {
        serializationObject.colorStops = this._colorStops;
        serializationObject.className = this.getClassName();
    }
    /** Parse from json object */
    parse(serializationObject) {
        this._colorStops = serializationObject.colorStops;
    }
}
//# sourceMappingURL=BaseGradient.js.map