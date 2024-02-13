import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh.js";
import type { BaseTexture } from "@babylonjs/core/Materials/Textures/baseTexture.js";
import type { IAnimatable } from "@babylonjs/core/Animations/animatable.interface.js";
import type { Matrix } from "@babylonjs/core/Maths/math.vector.js";
import type { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import type { Nullable } from "@babylonjs/core/types.js";
import type { Scene } from "@babylonjs/core/scene.js";
import type { SubMesh } from "@babylonjs/core/Meshes/subMesh.js";
import { Color4 } from "@babylonjs/core/Maths/math.color.js";
import { PushMaterial } from "@babylonjs/core/Materials/pushMaterial.js";
import { Vector3 } from "@babylonjs/core/Maths/math.vector.js";
import "./shaders/mrdlFrontplate.fragment";
import "./shaders/mrdlFrontplate.vertex";
export declare class MRDLFrontplateMaterial extends PushMaterial {
    /**
     * Gets or sets the corner radius on the frontplate. If this value is changed, update the lineWidth to match.
     */
    radius: number;
    /**
     * Gets or sets the line width of the frontplate.
     */
    lineWidth: number;
    /**
     * Gets or sets whether the scale is relative to the frontplate height.
     */
    relativeToHeight: boolean;
    /** @hidden */
    _filterWidth: number;
    /**
     * Gets or sets the edge color of the frontplate.
     */
    edgeColor: Color4;
    /**
     * Gets or sets whether to enable blob effects on the frontplate.
     */
    blobEnable: boolean;
    /**
     * Gets or sets the blob position on the frontplate.
     */
    blobPosition: Vector3;
    /**
     * Gets or sets the blob intensity of the frontplate.
     */
    blobIntensity: number;
    /**
     * Gets or sets the blob near size of the frontplate.
     */
    blobNearSize: number;
    /**
     * Gets or sets the blob far size of the frontplate.
     */
    blobFarSize: number;
    /**
     * Gets or sets the blob near distance of the frontplate.
     */
    blobNearDistance: number;
    /**
     * Gets or sets the blob far distance of the frontplate.
     */
    blobFarDistance: number;
    /**
     * Gets or sets the blob fade length of the frontplate.
     */
    blobFadeLength: number;
    /**
     * Gets or sets the blob inner fade of the frontplate.
     */
    blobInnerFade: number;
    /**
     * Gets or sets the blob pulse of the frontplate.
     */
    blobPulse: number;
    /**
     * Gets or sets the blob fade effect on the frontplate.
     */
    blobFade: number;
    /**
     * Gets or sets the maximum size of the blob pulse on the frontplate.
     */
    blobPulseMaxSize: number;
    /**
     * Gets or sets whether to enable extra blob effects of the frontplate.
     */
    blobEnable2: boolean;
    /**
     * Gets or sets blob2 position of the frontplate.
     */
    blobPosition2: Vector3;
    /**
     * Gets or sets the blob2 near size of the frontplate.
     */
    blobNearSize2: number;
    /**
     * Gets or sets the blob2 inner fade of the frontplate.
     */
    blobInnerFade2: number;
    /**
     * Gets or sets the blob2 pulse of the frontplate.
     */
    blobPulse2: number;
    /**
     * Gets or sets the blob2 fade effect on the frontplate.
     */
    blobFade2: number;
    /**
     * Gets or sets the gaze intensity of the frontplate.
     */
    gazeIntensity: number;
    /**
     * Gets or sets the gaze focus of the frontplate.
     */
    gazeFocus: number;
    /**
     * Gets or sets the selection fuzz of the frontplate.
     */
    selectionFuzz: number;
    /**
     * Gets or sets the fade intensity of the frontplate.
     */
    selected: number;
    /**
     * Gets or sets the selection fade intensity of the frontplate.
     */
    selectionFade: number;
    /**
     * Gets or sets the selection fade size of the frontplate.
     */
    selectionFadeSize: number;
    /**
     * Gets or sets the selected distance of the frontplate.
     */
    selectedDistance: number;
    /**
     * Gets or sets the selected fade length of the frontplate.
     */
    selectedFadeLength: number;
    /**
     * Gets or sets the proximity maximum intensity of the frontplate.
     */
    proximityMaxIntensity: number;
    /**
     * Gets or sets the proximity far distance of the frontplate.
     */
    proximityFarDistance: number;
    /**
     * Gets or sets the proximity near radius of the frontplate.
     */
    proximityNearRadius: number;
    /**
     * Gets or sets the proximity anisotropy of the frontplate.
     */
    proximityAnisotropy: number;
    /**
     * Gets or sets whether to use global left index on the frontplate.
     */
    useGlobalLeftIndex: boolean;
    /**
     * Gets or sets  whether to use global right index of the frontplate.
     */
    useGlobalRightIndex: boolean;
    /**
     * URL pointing to the texture used to define the coloring for the BLOB.
     */
    static BLOB_TEXTURE_URL: string;
    /**
     * Gets or sets the opacity of the frontplate (0.0 - 1.0).
     */
    fadeOut: number;
    private _blobTexture;
    constructor(name: string, scene: Scene);
    needAlphaBlending(): boolean;
    needAlphaTesting(): boolean;
    getAlphaTestTexture(): Nullable<BaseTexture>;
    isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh): boolean;
    bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;
    /**
     * Get the list of animatables in the material.
     * @returns the list of animatables object used in the material
     */
    getAnimatables(): IAnimatable[];
    dispose(forceDisposeEffect?: boolean): void;
    clone(name: string): MRDLFrontplateMaterial;
    serialize(): unknown;
    getClassName(): string;
    static Parse(source: any, scene: Scene, rootUrl: string): MRDLFrontplateMaterial;
}
