import { Vector3 } from "./math.vector";
/** Defines supported spaces */
export declare enum Space {
    /** Local (object) space */
    LOCAL = 0,
    /** World space */
    WORLD = 1,
    /** Bone space */
    BONE = 2
}
/** Defines the 3 main axes */
export declare class Axis {
    /** X axis */
    static X: Vector3;
    /** Y axis */
    static Y: Vector3;
    /** Z axis */
    static Z: Vector3;
}
/**
 * Defines cartesian components.
 */
export declare enum Coordinate {
    /** X axis */
    X = 0,
    /** Y axis */
    Y = 1,
    /** Z axis */
    Z = 2
}
