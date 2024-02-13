import { WebXRAbstractFeature } from "./WebXRAbstractFeature";
import type { WebXRSessionManager } from "../webXRSessionManager";
import type { TransformNode } from "../../Meshes/transformNode";
import { Matrix } from "../../Maths/math";
import { Observable } from "../../Misc/observable";
import { Mesh } from "../../Meshes/mesh";
/**
 * Options used in the mesh detector module
 */
export interface IWebXRMeshDetectorOptions {
    /**
     * The node to use to transform the local results to world coordinates
     */
    worldParentNode?: TransformNode;
    /**
     * If set to true a reference of the created meshes will be kept until the next session starts
     * If not defined, meshes will be removed from the array when the feature is detached or the session ended.
     */
    doNotRemoveMeshesOnSessionEnded?: boolean;
    /**
     * Preferred detector configuration, not all preferred options will be supported by all platforms.
     * Babylon native only!
     */
    preferredDetectorOptions?: XRGeometryDetectorOptions;
    /**
     * If set to true, WebXRMeshDetector will convert coordinate systems for meshes.
     * If not defined, mesh conversions from right handed to left handed coordinate systems won't be conducted.
     * Right handed mesh data will be available through IWebXRVertexData.xrMesh.
     */
    convertCoordinateSystems?: boolean;
    /**
     * If set to true, the feature will generate meshes for the detected data.
     * Note that this might be time consuming, as the mesh's vertex data will be updated on every change.
     * Setting this to true will also set convertCoordinateSystems to true.
     * Note - the meshes will NOT be disposed automatically when the feature is detached or the session ended.
     */
    generateMeshes?: boolean;
}
/**
 * A babylon interface for a XR mesh's vertex data.
 */
export interface IWebXRVertexData {
    /**
     * A babylon-assigned ID for this mesh
     */
    id: number;
    /**
     * Data required for constructing a mesh in Babylon.js.
     */
    xrMesh: XRMesh;
    /**
     * The node to use to transform the local results to world coordinates.
     * WorldParentNode will only exist if it was declared in the IWebXRMeshDetectorOptions.
     */
    worldParentNode?: TransformNode;
    /**
     * An array of vertex positions in babylon space. right/left hand system is taken into account.
     * Positions will only be calculated if convertCoordinateSystems is set to true in the IWebXRMeshDetectorOptions.
     */
    positions?: Float32Array;
    /**
     * An array of indices in babylon space. Indices have a counterclockwise winding order.
     * Indices will only be populated if convertCoordinateSystems is set to true in the IWebXRMeshDetectorOptions.
     */
    indices?: Uint32Array;
    /**
     * An array of vertex normals in babylon space. right/left hand system is taken into account.
     * Normals will not be calculated if convertCoordinateSystems is undefined in the IWebXRMeshDetectorOptions.
     * Different platforms may or may not support mesh normals when convertCoordinateSystems is set to true.
     */
    normals?: Float32Array;
    /**
     * A transformation matrix to apply on the mesh that will be built using the meshDefinition.
     * Local vs. World are decided if worldParentNode was provided or not in the options when constructing the module.
     * TransformationMatrix will only be calculated if convertCoordinateSystems is set to true in the IWebXRMeshDetectorOptions.
     */
    transformationMatrix?: Matrix;
    /**
     * If generateMeshes is set to true in the IWebXRMeshDetectorOptions, this will be the generated mesh.
     * This mesh will be updated with the vertex data provided and not regenerated every time.
     */
    mesh?: Mesh;
}
/**
 * The mesh detector is used to detect meshes in the real world when in AR
 */
export declare class WebXRMeshDetector extends WebXRAbstractFeature {
    private _options;
    private _detectedMeshes;
    /**
     * The module's name
     */
    static readonly Name = "xr-mesh-detection";
    /**
     * The (Babylon) version of this module.
     * This is an integer representing the implementation version.
     * This number does not correspond to the WebXR specs version
     */
    static readonly Version = 1;
    /**
     * Observers registered here will be executed when a new mesh was added to the session
     */
    onMeshAddedObservable: Observable<IWebXRVertexData>;
    /**
     * Observers registered here will be executed when a mesh is no longer detected in the session
     */
    onMeshRemovedObservable: Observable<IWebXRVertexData>;
    /**
     * Observers registered here will be executed when an existing mesh updates
     */
    onMeshUpdatedObservable: Observable<IWebXRVertexData>;
    constructor(_xrSessionManager: WebXRSessionManager, _options?: IWebXRMeshDetectorOptions);
    detach(): boolean;
    dispose(): void;
    protected _onXRFrame(frame: XRFrame): void;
    private _init;
    private _updateVertexDataWithXRMesh;
}
