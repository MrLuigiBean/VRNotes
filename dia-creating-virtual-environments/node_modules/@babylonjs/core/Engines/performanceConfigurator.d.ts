/** @internal */
export declare class PerformanceConfigurator {
    /** @internal */
    static MatrixUse64Bits: boolean;
    /** @internal */
    static MatrixTrackPrecisionChange: boolean;
    /** @internal */
    static MatrixCurrentType: any;
    /** @internal */
    static MatrixTrackedMatrices: Array<any> | null;
    /**
     * @internal
     */
    static SetMatrixPrecision(use64bits: boolean): void;
}
