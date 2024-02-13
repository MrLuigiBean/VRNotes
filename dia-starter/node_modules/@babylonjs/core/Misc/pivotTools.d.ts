import type { TransformNode } from "../Meshes/transformNode";
/**
 * Class containing a set of static utilities functions for managing Pivots
 * @internal
 */
export declare class PivotTools {
    private static _PivotCached;
    private static _OldPivotPoint;
    private static _PivotTranslation;
    private static _PivotTmpVector;
    private static _PivotPostMultiplyPivotMatrix;
    /**
     * @internal
     */
    static _RemoveAndStorePivotPoint(mesh: TransformNode): void;
    /**
     * @internal
     */
    static _RestorePivotPoint(mesh: TransformNode): void;
}
