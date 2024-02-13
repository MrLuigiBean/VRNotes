import type { Nullable } from "../types";
/**
 * @internal
 */
export declare class IntersectionInfo {
    bu: Nullable<number>;
    bv: Nullable<number>;
    distance: number;
    faceId: number;
    subMeshId: number;
    constructor(bu: Nullable<number>, bv: Nullable<number>, distance: number);
}
