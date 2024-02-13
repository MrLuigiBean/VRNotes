import { Vector2 } from "@babylonjs/core/Maths/math.vector.js";
const tmpRect = [new Vector2(0, 0), new Vector2(0, 0), new Vector2(0, 0), new Vector2(0, 0)];
const tmpRect2 = [new Vector2(0, 0), new Vector2(0, 0), new Vector2(0, 0), new Vector2(0, 0)];
const tmpV1 = new Vector2(0, 0);
const tmpV2 = new Vector2(0, 0);
/**
 * Class used to store 2D control sizes
 */
export class Measure {
    /**
     * Creates a new measure
     * @param left defines left coordinate
     * @param top defines top coordinate
     * @param width defines width dimension
     * @param height defines height dimension
     */
    constructor(
    /** defines left coordinate */
    left, 
    /** defines top coordinate  */
    top, 
    /** defines width dimension  */
    width, 
    /** defines height dimension */
    height) {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    }
    /**
     * Copy from another measure
     * @param other defines the other measure to copy from
     */
    copyFrom(other) {
        this.left = other.left;
        this.top = other.top;
        this.width = other.width;
        this.height = other.height;
    }
    /**
     * Copy from a group of 4 floats
     * @param left defines left coordinate
     * @param top defines top coordinate
     * @param width defines width dimension
     * @param height defines height dimension
     */
    copyFromFloats(left, top, width, height) {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    }
    /**
     * Computes the axis aligned bounding box measure for two given measures
     * @param a Input measure
     * @param b Input measure
     * @param result the resulting bounding measure
     */
    static CombineToRef(a, b, result) {
        const left = Math.min(a.left, b.left);
        const top = Math.min(a.top, b.top);
        const right = Math.max(a.left + a.width, b.left + b.width);
        const bottom = Math.max(a.top + a.height, b.top + b.height);
        result.left = left;
        result.top = top;
        result.width = right - left;
        result.height = bottom - top;
    }
    /**
     * Computes the axis aligned bounding box of the measure after it is modified by a given transform
     * @param transform the matrix to transform the measure before computing the AABB
     * @param addX number to add to left
     * @param addY number to add to top
     * @param addWidth number to add to width
     * @param addHeight number to add to height
     * @param result the resulting AABB
     */
    addAndTransformToRef(transform, addX, addY, addWidth, addHeight, result) {
        const left = this.left + addX;
        const top = this.top + addY;
        const width = this.width + addWidth;
        const height = this.height + addHeight;
        tmpRect[0].copyFromFloats(left, top);
        tmpRect[1].copyFromFloats(left + width, top);
        tmpRect[2].copyFromFloats(left + width, top + height);
        tmpRect[3].copyFromFloats(left, top + height);
        tmpV1.copyFromFloats(Number.MAX_VALUE, Number.MAX_VALUE);
        tmpV2.copyFromFloats(0, 0);
        for (let i = 0; i < 4; i++) {
            transform.transformCoordinates(tmpRect[i].x, tmpRect[i].y, tmpRect2[i]);
            tmpV1.x = Math.floor(Math.min(tmpV1.x, tmpRect2[i].x));
            tmpV1.y = Math.floor(Math.min(tmpV1.y, tmpRect2[i].y));
            tmpV2.x = Math.ceil(Math.max(tmpV2.x, tmpRect2[i].x));
            tmpV2.y = Math.ceil(Math.max(tmpV2.y, tmpRect2[i].y));
        }
        result.left = tmpV1.x;
        result.top = tmpV1.y;
        result.width = tmpV2.x - tmpV1.x;
        result.height = tmpV2.y - tmpV1.y;
    }
    /**
     * Computes the axis aligned bounding box of the measure after it is modified by a given transform
     * @param transform the matrix to transform the measure before computing the AABB
     * @param result the resulting AABB
     */
    transformToRef(transform, result) {
        this.addAndTransformToRef(transform, 0, 0, 0, 0, result);
    }
    /**
     * Check equality between this measure and another one
     * @param other defines the other measures
     * @returns true if both measures are equals
     */
    isEqualsTo(other) {
        if (this.left !== other.left) {
            return false;
        }
        if (this.top !== other.top) {
            return false;
        }
        if (this.width !== other.width) {
            return false;
        }
        if (this.height !== other.height) {
            return false;
        }
        return true;
    }
    /**
     * Creates an empty measure
     * @returns a new measure
     */
    static Empty() {
        return new Measure(0, 0, 0, 0);
    }
}
//# sourceMappingURL=measure.js.map