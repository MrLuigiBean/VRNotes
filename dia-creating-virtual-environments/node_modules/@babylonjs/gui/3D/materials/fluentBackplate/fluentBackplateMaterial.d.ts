import type { Nullable } from "@babylonjs/core/types.js";
import type { Matrix } from "@babylonjs/core/Maths/math.vector.js";
import { Vector3, Vector4 } from "@babylonjs/core/Maths/math.vector.js";
import type { IAnimatable } from "@babylonjs/core/Animations/animatable.interface.js";
import type { BaseTexture } from "@babylonjs/core/Materials/Textures/baseTexture.js";
import { PushMaterial } from "@babylonjs/core/Materials/pushMaterial.js";
import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh.js";
import type { SubMesh } from "@babylonjs/core/Meshes/subMesh.js";
import type { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import type { Scene } from "@babylonjs/core/scene.js";
import { Color4 } from "@babylonjs/core/Maths/math.color.js";
import "./shaders/fluentBackplate.fragment";
import "./shaders/fluentBackplate.vertex";
/**
 * Class used to render square buttons with fluent design
 */
export declare class FluentBackplateMaterial extends PushMaterial {
    /**
     * URL pointing to the texture used to define the coloring for the fluent blob effect.
     */
    static BLOB_TEXTURE_URL: string;
    /**
     * URL pointing to the texture used to define iridescent map.
     */
    static IM_TEXTURE_URL: string;
    private _blobTexture;
    private _iridescentMap;
    /**
     * Gets or sets the corner radius on the backplate. Best to keep this value between 0.01 and 0.5. Default is 0.03.
     */
    radius: number;
    /**
     * Gets or sets the line width of the backplate.
     */
    lineWidth: number;
    /**
     * Gets or sets whether to use absolute sizes when calculating effects on the backplate.
     * Since desktop and VR/AR have different relative sizes, it's usually best to keep this false.
     */
    absoluteSizes: boolean;
    /** @internal */
    _filterWidth: number;
    /**
     * Gets or sets the base color of the backplate.
     */
    baseColor: Color4;
    /**
     * Gets or sets the line color of the backplate.
     */
    lineColor: Color4;
    /**
     * Gets or sets the intensity of the fluent hover glow effect.
     */
    blobIntensity: number;
    /**
     * Gets or sets the far size of the fluent hover glow effect.
     */
    blobFarSize: number;
    /**
     * Gets or sets the distance considered "near" to the backplate, which controls the size of the fluent hover glow effect (see blobNearSize).
     */
    blobNearDistance: number;
    /**
     * Gets or sets the distance considered "far" from the backplate, which controls the size of the fluent hover glow effect (see blobFarSize).
     */
    blobFarDistance: number;
    /**
     * Gets or sets the length of the fluent hover glow effect fade.
     */
    blobFadeLength: number;
    /**
     * Gets or sets the size of the fluent hover glow effect when the left pointer is considered "near" to the backplate (see blobNearDistance).
     */
    blobNearSize: number;
    /**
     * Gets or sets the progress of the fluent hover glow effect selection animation corresponding to the left pointer (0.0 - 1.0).
     */
    blobPulse: number;
    /**
     * Gets or sets the opacity of the fluent hover glow effect corresponding to the left pointer (0.0 - 1.0). Default is 0.
     */
    blobFade: number;
    /**
     * Gets or sets the size of the fluent hover glow effect when the right pointer is considered "near" to the backplate (see blobNearDistance).
     */
    blobNearSize2: number;
    /**
     * Gets or sets the progress of the fluent hover glow effect selection animation corresponding to the right pointer (0.0 - 1.0).
     */
    blobPulse2: number;
    /**
     * Gets or sets the opacity of the fluent hover glow effect corresponding to the right pointer (0.0 - 1.0). Default is 0.
     */
    blobFade2: number;
    /** @internal */
    _rate: number;
    /**
     * Gets or sets the color of the highlights on the backplate line.
     */
    highlightColor: Color4;
    /**
     * Gets or sets the width of the highlights on the backplate line.
     */
    highlightWidth: number;
    /** @internal */
    _highlightTransform: Vector4;
    /** @internal */
    _highlight: number;
    /**
     * Gets or sets the intensity of the iridescence effect.
     */
    iridescenceIntensity: number;
    /**
     * Gets or sets the intensity of the iridescence effect on the backplate edges.
     */
    iridescenceEdgeIntensity: number;
    /** @internal */
    _angle: number;
    /**
     * Gets or sets the opacity of the backplate (0.0 - 1.0).
     */
    fadeOut: number;
    /** @internal */
    _reflected: boolean;
    /** @internal */
    _frequency: number;
    /** @internal */
    _verticalOffset: number;
    /**
     * Gets or sets the world-space position of the tip of the left index finger.
     */
    globalLeftIndexTipPosition: Vector3;
    private _globalLeftIndexTipPosition4;
    /**
     * Gets or sets the world-space position of the tip of the right index finger.
     */
    globalRightIndexTipPosition: Vector3;
    private _globalRightIndexTipPosition4;
    constructor(name: string, scene?: Scene);
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
    clone(name: string): FluentBackplateMaterial;
    serialize(): any;
    getClassName(): string;
    static Parse(source: any, scene: Scene, rootUrl: string): FluentBackplateMaterial;
}
