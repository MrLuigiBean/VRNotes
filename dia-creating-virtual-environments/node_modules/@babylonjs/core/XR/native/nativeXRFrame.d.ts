/** @internal */
interface INativeXRFrame extends XRFrame {
    getPoseData: (space: XRSpace, baseSpace: XRReferenceSpace, vectorBuffer: ArrayBuffer, matrixBuffer: ArrayBuffer) => XRPose;
    _imageTrackingResults?: XRImageTrackingResult[];
}
/** @internal */
export declare class NativeXRFrame implements XRFrame {
    private _nativeImpl;
    private readonly _xrTransform;
    private readonly _xrPose;
    private readonly _xrPoseVectorData;
    get session(): XRSession;
    constructor(_nativeImpl: INativeXRFrame);
    getPose(space: XRSpace, baseSpace: XRReferenceSpace): XRPose | undefined;
    readonly fillPoses: any;
    readonly getViewerPose: any;
    readonly getHitTestResults: any;
    readonly getHitTestResultsForTransientInput: () => never;
    get trackedAnchors(): XRAnchorSet | undefined;
    readonly createAnchor: any;
    get worldInformation(): XRWorldInformation | undefined;
    get detectedPlanes(): XRPlaneSet | undefined;
    readonly getJointPose: any;
    readonly fillJointRadii: any;
    readonly getLightEstimate: () => never;
    get featurePointCloud(): number[] | undefined;
    readonly getImageTrackingResults: () => XRImageTrackingResult[];
    getDepthInformation(view: XRView): XRCPUDepthInformation | undefined;
}
export {};
