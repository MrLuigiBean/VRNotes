import type { Nullable } from "@babylonjs/core/types.js";
import type { Matrix } from "@babylonjs/core/Maths/math.vector.js";
import { Vector4 } from "@babylonjs/core/Maths/math.vector.js";
import type { IAnimatable } from "@babylonjs/core/Animations/animatable.interface.js";
import type { BaseTexture } from "@babylonjs/core/Materials/Textures/baseTexture.js";
import { PushMaterial } from "@babylonjs/core/Materials/pushMaterial.js";
import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh.js";
import type { SubMesh } from "@babylonjs/core/Meshes/subMesh.js";
import type { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import type { Scene } from "@babylonjs/core/scene.js";
import { Color4 } from "@babylonjs/core/Maths/math.color.js";
import "./shaders/mrdlBackplate.fragment";
import "./shaders/mrdlBackplate.vertex";
/**
 * Class used to render backplate material with MRDL
 */
export declare class MRDLBackplateMaterial extends PushMaterial {
    /**
     * URL pointing to the texture used to define the coloring for the Iridescent Map effect.
     */
    static IRIDESCENT_MAP_TEXTURE_URL: string;
    private _iridescentMapTexture;
    /**
     * Gets or sets the corner radius on the backplate. If this value is changed, update the lineWidth to match.
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
     * Gets or sets the top left Radii Multiplier.
     */
    radiusTopLeft: number;
    /**
     * Gets or sets the top left Radii Multiplier.
     */
    radiusTopRight: number;
    /**
     * Gets or sets the top left Radii Multiplier.
     */
    radiusBottomLeft: number;
    /**
     * Gets or sets the top left Radii Multiplier.
     */
    radiusBottomRight: number;
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
    /**
     * Gets or sets the Tint of the iridescence effect on the backplate.
     */
    iridescenceTint: Color4;
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
     * Gets or sets the gradient color effect on the backplate.
     */
    gradientColor: Color4;
    /**
     * Gets or sets the top left gradient color effect on the backplate.
     */
    topLeftGradientColor: Color4;
    /**
     * Gets or sets the top right gradient color effect on the backplate.
     */
    topRightGradientColor: Color4;
    /**
     * Gets or sets the bottom left gradient color effect on the backplate.
     */
    bottomLeftGradientColor: Color4;
    /**
     * Gets or sets the bottom right gradient color effect on the backplate.
     */
    bottomRightGradientColor: Color4;
    /**
     * Gets or sets the edge width of the backplate.
     */
    edgeWidth: number;
    /**
     * Gets or sets the edge width of the backplate.
     */
    edgePower: number;
    /**
     * Gets or sets the edge width of the backplate.
     */
    edgeLineGradientBlend: number;
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
    clone(name: string): MRDLBackplateMaterial;
    serialize(): any;
    getClassName(): string;
    static Parse(source: any, scene: Scene, rootUrl: string): MRDLBackplateMaterial;
}
