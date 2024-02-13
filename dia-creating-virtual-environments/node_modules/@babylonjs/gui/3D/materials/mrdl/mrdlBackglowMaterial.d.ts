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
import "./shaders/mrdlBackglow.fragment";
import "./shaders/mrdlBackglow.vertex";
export declare class MRDLBackglowMaterial extends PushMaterial {
    /**
     * Gets or sets the bevel radius on the backglow. If this value is changed, update the lineWidth to match.
     */
    bevelRadius: number;
    /**
     * Gets or sets the line width of the backglow.
     */
    lineWidth: number;
    /**
     * Gets or sets whether to use absolute sizes when calculating effects on the backglow.
     * Since desktop and VR/AR have different relative sizes, it's usually best to keep this false.
     */
    absoluteSizes: boolean;
    /**
     * Gets or sets the tuning motion of the backglow.
     */
    tuningMotion: number;
    /**
     * Gets or sets the motion of the backglow.
     */
    motion: number;
    /**
     * Gets or sets the maximum intensity of the backglow.
     */
    maxIntensity: number;
    /**
     * Gets or sets the fade-in exponent of the intensity of the backglow.
     */
    intensityFadeInExponent: number;
    /**
     * Gets or sets the start of the outer fuzz effect on the backglow.
     */
    outerFuzzStart: number;
    /**
     * Gets or sets the end of the outer fuzz effect on the backglow.
     */
    outerFuzzEnd: number;
    /**
     * Gets or sets the color of the backglow.
     */
    color: Color4;
    /**
     * Gets or sets the inner color of the backglow.
     */
    innerColor: Color4;
    /**
     * Gets or sets the blend exponent of the backglow.
     */
    blendExponent: number;
    /**
     * Gets or sets the falloff of the backglow.
     */
    falloff: number;
    /**
     * Gets or sets the bias of the backglow.
     */
    bias: number;
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
    clone(name: string): MRDLBackglowMaterial;
    serialize(): unknown;
    getClassName(): string;
    static Parse(source: any, scene: Scene, rootUrl: string): MRDLBackglowMaterial;
}
