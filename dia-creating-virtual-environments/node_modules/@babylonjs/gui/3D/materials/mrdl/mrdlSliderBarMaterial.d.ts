import type { Nullable } from "@babylonjs/core/types.js";
import type { Matrix } from "@babylonjs/core/Maths/math.vector.js";
import { Vector2, Vector3, Vector4 } from "@babylonjs/core/Maths/math.vector.js";
import type { IAnimatable } from "@babylonjs/core/Animations/animatable.interface.js";
import type { BaseTexture } from "@babylonjs/core/Materials/Textures/baseTexture.js";
import { Texture } from "@babylonjs/core/Materials/Textures/texture.js";
import { PushMaterial } from "@babylonjs/core/Materials/pushMaterial.js";
import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh.js";
import type { SubMesh } from "@babylonjs/core/Meshes/subMesh.js";
import type { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import type { Scene } from "@babylonjs/core/scene.js";
import { Color4 } from "@babylonjs/core/Maths/math.color.js";
import "./shaders/mrdlSliderBar.fragment";
import "./shaders/mrdlSliderBar.vertex";
/**
 * Class used to render Slider Bar material with MRDL
 */
export declare class MRDLSliderBarMaterial extends PushMaterial {
    /**
     * URL pointing to the texture used to define the coloring for the Iridescent Map effect.
     */
    static BLUE_GRADIENT_TEXTURE_URL: string;
    private _blueGradientTexture;
    private _decalTexture;
    private _reflectionMapTexture;
    private _indirectEnvTexture;
    /**
     * Gets or sets the corner Radius on the slider bar.
     */
    radius: number;
    /**
     * Gets or sets the Bevel Front on the slider bar.
     */
    bevelFront: number;
    /**
     * Gets or sets the Bevel Front Stretch on the slider bar.
     */
    bevelFrontStretch: number;
    /**
     * Gets or sets the Bevel Back on the slider bar.
     */
    bevelBack: number;
    /**
     * Gets or sets the Bevel Back Stretch on the slider bar.
     */
    bevelBackStretch: number;
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
    /**
     * Gets or sets whether Bulge is enabled.
     * Default is false.
     */
    bulgeEnabled: boolean;
    /**
     * Gets or sets the Bulge Height.
     */
    bulgeHeight: number;
    /**
     * Gets or sets the Bulge Radius.
     */
    bulgeRadius: number;
    /**
     * Gets or sets the Sun Intensity.
     */
    sunIntensity: number;
    /**
     * Gets or sets the Sun Theta.
     */
    sunTheta: number;
    /**
     * Gets or sets the Sun Phi.
     */
    sunPhi: number;
    /**
     * Gets or sets the Indirect Diffuse.
     */
    indirectDiffuse: number;
    /**
     * Gets or sets the base albedo.
     */
    albedo: Color4;
    /**
     * Gets or sets the Specular value.
     */
    specular: number;
    /**
     * Gets or sets the Shininess value.
     */
    shininess: number;
    /**
     * Gets or sets the Sharpness value.
     */
    sharpness: number;
    /**
     * Gets or sets the Subsurface value.
     */
    subsurface: number;
    /**
     * Gets or sets the left gradient color.
     */
    leftGradientColor: Color4;
    /**
     * Gets or sets the right gradient color.
     */
    rightGradientColor: Color4;
    /**
     * Gets or sets the reflection value.
     */
    reflection: number;
    /**
     * Gets or sets the front reflect value.
     */
    frontReflect: number;
    /**
     * Gets or sets the edge reflect value.
     */
    edgeReflect: number;
    /**
     * Gets or sets the power value.
     */
    power: number;
    /**
     * Gets or sets the sky color.
     */
    skyColor: Color4;
    /**
     * Gets or sets the horizon color.
     */
    horizonColor: Color4;
    /**
     * Gets or sets the ground color.
     */
    groundColor: Color4;
    /**
     * Gets or sets the horizon power value.
     */
    horizonPower: number;
    /**
     * Gets or sets the finger occlusion width value.
     */
    width: number;
    /**
     * Gets or sets the finger occlusion fuzz value.
     */
    fuzz: number;
    /**
     * Gets or sets the minimum finger occlusion fuzz value.
     */
    minFuzz: number;
    /**
     * Gets or sets the finger occlusion clip fade value.
     */
    clipFade: number;
    /**
     * Gets or sets the hue shift value.
     */
    hueShift: number;
    /**
     * Gets or sets the saturation shift value.
     */
    saturationShift: number;
    /**
     * Gets or sets the value shift.
     */
    valueShift: number;
    /**
     * Gets or sets the position of the hover glow effect.
     */
    blobPosition: Vector3;
    /**
     * Gets or sets the intensity of the hover glow effect.
     */
    blobIntensity: number;
    /**
     * Gets or sets the near size of the hover glow effect.
     */
    blobNearSize: number;
    /**
     * Gets or sets the far size of the hover glow effect.
     */
    blobFarSize: number;
    /**
     * Gets or sets the distance considered "near" to the mesh, which controls the size of the hover glow effect (see blobNearSize).
     */
    blobNearDistance: number;
    /**
     * Gets or sets the distance considered "far" from the mesh, which controls the size of the hover glow effect (see blobFarSize).
     */
    blobFarDistance: number;
    /**
     * Gets or sets the length of the hover glow effect fade.
     */
    blobFadeLength: number;
    /**
     * Gets or sets the progress of the hover glow effect selection animation corresponding to the left pointer (0.0 - 1.0).
     */
    blobPulse: number;
    /**
     * Gets or sets the opacity of the hover glow effect corresponding to the left pointer (0.0 - 1.0). Default is 0.
     */
    blobFade: number;
    /**
     * Gets or sets the position of the hover glow effect.
     */
    blobPosition2: Vector3;
    /**
     * Gets or sets the size of the hover glow effect when the right pointer is considered "near" to the mesh (see blobNearDistance).
     */
    blobNearSize2: number;
    /**
     * Gets or sets the progress of the hover glow effect selection animation corresponding to the right pointer (0.0 - 1.0).
     */
    blobPulse2: number;
    /**
     * Gets or sets the opacity of the hover glow effect corresponding to the right pointer (0.0 - 1.0). Default is 1.
     */
    blobFade2: number;
    /**
     * Gets or sets the texture of the hover glow effect.
     */
    blobTexture: Texture;
    /**
     * Gets or sets the finger position for left index.
     */
    leftIndexPosition: Vector3;
    /**
     * Gets or sets the finger position for right index.
     */
    rightIndexPosition: Vector3;
    /**
     * Gets or sets the finger position for left index middle position.
     */
    leftIndexMiddlePosition: Vector3;
    /**
     * Gets or sets the finger position for right index middle position.
     */
    rightIndexMiddlePosition: Vector3;
    /**
     * Gets or sets the Decal Scle for XY.
     */
    decalScaleXY: Vector2;
    /**
     * Gets or sets decalFrontOnly
     * Default is true
     */
    decalFrontOnly: boolean;
    /**
     * Gets or sets the Rim Light intensity.
     */
    rimIntensity: number;
    /**
     * Gets or sets the Rim Light hue shift value.
     */
    rimHueShift: number;
    /**
     * Gets or sets the Rim Light saturation shift value.
     */
    rimSaturationShift: number;
    /**
     * Gets or sets the Rim Light value shift.
     */
    rimValueShift: number;
    /**
     * Gets or sets the intensity of the iridescence effect.
     */
    iridescenceIntensity: number;
    /**
     * @internal
     */
    useGlobalLeftIndex: number;
    /**
     * @internal
     */
    useGlobalRightIndex: number;
    /**
     * @internal
     */
    globalLeftIndexTipProximity: number;
    /**
     * @internal
     */
    globalRightIndexTipProximity: number;
    /**
     * @internal
     */
    globalLeftIndexTipPosition: Vector4;
    /**
     * @internal
     */
    globaRightIndexTipPosition: Vector4;
    /**
     * @internal
     */
    globalLeftThumbTipPosition: Vector4;
    /**
     * @internal
     */
    globalRightThumbTipPosition: Vector4;
    /**
     * @internal
     */
    globalLeftIndexMiddlePosition: Vector4;
    /**
     * @internal
     */
    globalRightIndexMiddlePosition: Vector4;
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
    clone(name: string): MRDLSliderBarMaterial;
    serialize(): any;
    getClassName(): string;
    static Parse(source: any, scene: Scene, rootUrl: string): MRDLSliderBarMaterial;
}
