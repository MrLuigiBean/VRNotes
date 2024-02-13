import type { Matrix, Vector3 } from "./math.vector";
import type { DeepImmutable } from "../types";
import { Plane } from "./math.plane";
/**
 * Represents a camera frustum
 */
export declare class Frustum {
    /**
     * Gets the planes representing the frustum
     * @param transform matrix to be applied to the returned planes
     * @returns a new array of 6 Frustum planes computed by the given transformation matrix.
     */
    static GetPlanes(transform: DeepImmutable<Matrix>): Plane[];
    /**
     * Gets the near frustum plane transformed by the transform matrix
     * @param transform transformation matrix to be applied to the resulting frustum plane
     * @param frustumPlane the resulting frustum plane
     */
    static GetNearPlaneToRef(transform: DeepImmutable<Matrix>, frustumPlane: Plane): void;
    /**
     * Gets the far frustum plane transformed by the transform matrix
     * @param transform transformation matrix to be applied to the resulting frustum plane
     * @param frustumPlane the resulting frustum plane
     */
    static GetFarPlaneToRef(transform: DeepImmutable<Matrix>, frustumPlane: Plane): void;
    /**
     * Gets the left frustum plane transformed by the transform matrix
     * @param transform transformation matrix to be applied to the resulting frustum plane
     * @param frustumPlane the resulting frustum plane
     */
    static GetLeftPlaneToRef(transform: DeepImmutable<Matrix>, frustumPlane: Plane): void;
    /**
     * Gets the right frustum plane transformed by the transform matrix
     * @param transform transformation matrix to be applied to the resulting frustum plane
     * @param frustumPlane the resulting frustum plane
     */
    static GetRightPlaneToRef(transform: DeepImmutable<Matrix>, frustumPlane: Plane): void;
    /**
     * Gets the top frustum plane transformed by the transform matrix
     * @param transform transformation matrix to be applied to the resulting frustum plane
     * @param frustumPlane the resulting frustum plane
     */
    static GetTopPlaneToRef(transform: DeepImmutable<Matrix>, frustumPlane: Plane): void;
    /**
     * Gets the bottom frustum plane transformed by the transform matrix
     * @param transform transformation matrix to be applied to the resulting frustum plane
     * @param frustumPlane the resulting frustum plane
     */
    static GetBottomPlaneToRef(transform: DeepImmutable<Matrix>, frustumPlane: Plane): void;
    /**
     * Sets the given array "frustumPlanes" with the 6 Frustum planes computed by the given transformation matrix.
     * @param transform transformation matrix to be applied to the resulting frustum planes
     * @param frustumPlanes the resulting frustum planes
     */
    static GetPlanesToRef(transform: DeepImmutable<Matrix>, frustumPlanes: Plane[]): void;
    /**
     * Tests if a point is located between the frustum planes.
     * @param point defines the point to test
     * @param frustumPlanes defines the frustum planes to test
     * @returns true if the point is located between the frustum planes
     */
    static IsPointInFrustum(point: Vector3, frustumPlanes: Array<DeepImmutable<Plane>>): boolean;
}
