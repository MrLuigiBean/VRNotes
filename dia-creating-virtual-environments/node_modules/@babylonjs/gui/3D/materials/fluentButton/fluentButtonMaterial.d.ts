import type { Nullable } from "@babylonjs/core/types.js";
import type { Matrix } from "@babylonjs/core/Maths/math.vector.js";
import { Vector3 } from "@babylonjs/core/Maths/math.vector.js";
import type { IAnimatable } from "@babylonjs/core/Animations/animatable.interface.js";
import type { BaseTexture } from "@babylonjs/core/Materials/Textures/baseTexture.js";
import { PushMaterial } from "@babylonjs/core/Materials/pushMaterial.js";
import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh.js";
import type { SubMesh } from "@babylonjs/core/Meshes/subMesh.js";
import type { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import type { Scene } from "@babylonjs/core/scene.js";
import { Color4 } from "@babylonjs/core/Maths/math.color.js";
import "./shaders/fluentButton.fragment";
import "./shaders/fluentButton.vertex";
/**
 * Class used to render square buttons with fluent design
 * @since 5.0.0
 */
export declare class FluentButtonMaterial extends PushMaterial {
    /**
     * URL pointing to the texture used to define the coloring for the fluent blob effect.
     */
    static BLOB_TEXTURE_URL: string;
    /**
     * Gets or sets the width of the glowing edge, relative to the scale of the button.
     * (Default is 4% of the height).
     */
    edgeWidth: number;
    /**
     * Gets or sets the color of the glowing edge.
     */
    edgeColor: Color4;
    /**
     * Gets or sets the maximum intensity of the proximity light.
     */
    proximityMaxIntensity: number;
    /**
     * Gets or sets the maximum distance for the proximity light (Default is 16mm).
     */
    proximityFarDistance: number;
    /**
     * Gets or sets the radius of the proximity light when near to the surface.
     */
    proximityNearRadius: number;
    /**
     * Gets or sets the anisotropy of the proximity light.
     */
    proximityAnisotropy: number;
    /**
     * Gets or sets the amount of fuzzing in the selection focus.
     */
    selectionFuzz: number;
    /**
     * Gets or sets an override value to display the button as selected.
     */
    selected: number;
    /**
     * Gets or sets a value to manually fade the blob size.
     */
    selectionFade: number;
    /**
     * Gets or sets a value to manually shrink the blob size as it fades (see selectionFade).
     */
    selectionFadeSize: number;
    /**
     * Gets or sets the distance from the button the cursor should be for the button
     * to appear selected (Default is 8cm).
     */
    selectedDistance: number;
    /**
     * Gets or sets the fall-off distance for the selection fade (Default is 8cm).
     */
    selectedFadeLength: number;
    /**
     * Gets or sets the intensity of the luminous blob (Ranges 0-1, default is 0.5).
     */
    blobIntensity: number;
    /**
     * The size of the blob when the pointer is at the blobFarDistance (Default is 5cm).
     */
    blobFarSize: number;
    /**
     * The distance at which the pointer is considered near. See [left|right]BlobNearSize. (Default is 0cm).
     */
    blobNearDistance: number;
    /**
     * The distance at which the pointer is considered far. See [left|right]BlobFarSize. (Default is 8cm).
     */
    blobFarDistance: number;
    /**
     * The distance over which the blob intensity fades from full to none (Default is 8cm).
     */
    blobFadeLength: number;
    /**
     * Gets or sets whether the blob corresponding to the left index finger is enabled.
     */
    leftBlobEnable: boolean;
    /**
     * Gets or sets the size of the left blob when the left pointer is considered near. See blobNearDistance. (Default is 2.5cm).
     */
    leftBlobNearSize: number;
    /**
     * Gets or sets the progress of the pulse animation on the left blob (Ranges 0-1).
     */
    leftBlobPulse: number;
    /**
     * Gets or sets the fade factor on the left blob.
     */
    leftBlobFade: number;
    /**
     * Gets or sets the inner fade on the left blob;
     */
    leftBlobInnerFade: number;
    /**
     * Gets or sets whether the blob corresponding to the right index finger is enabled.
     */
    rightBlobEnable: boolean;
    /**
     * Gets or sets the size of the right blob when the right pointer is considered near. See blobNearDistance. (Default is 2.5cm).
     */
    rightBlobNearSize: number;
    /**
     * Gets or sets the progress of the pulse animation on the right blob (Ranges 0-1).
     */
    rightBlobPulse: number;
    /**
     * Gets or sets the fade factor on the right blob.
     */
    rightBlobFade: number;
    /**
     * Gets or sets the inner fade on the right blob;
     */
    rightBlobInnerFade: number;
    /**
     * Gets or sets the direction of the active face before the world transform is applied.
     * This should almost always be set to -z.
     */
    activeFaceDir: Vector3;
    /**
     * Gets or sets the button's up direction before the world transform is applied.
     * This should almost always be set to +y.
     */
    activeFaceUp: Vector3;
    /**
     * Gets or sets whether the edge fade effect is enabled.
     */
    enableFade: boolean;
    /**
     * Gets or sets a value corresponding to the width of the edge fade effect (Default 1.5).
     */
    fadeWidth: number;
    /**
     * Gets or sets whether the active face is smoothly interpolated.
     */
    smoothActiveFace: boolean;
    /**
     * Gets or sets whether the frame of the fluent button model is visible.
     * This is usually only enabled for debugging purposes.
     */
    showFrame: boolean;
    /**
     * Gets or sets whether the blob color texture is used for the proximity
     * light effect. This is usually only disabled for debugging purposes.
     */
    useBlobTexture: boolean;
    /**
     * Gets or sets the world-space position of the tip of the left index finger.
     */
    globalLeftIndexTipPosition: Vector3;
    /**
     * Gets or sets the world-space position of the tip of the right index finger.
     */
    globalRightIndexTipPosition: Vector3;
    private _blobTexture;
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
    clone(name: string): FluentButtonMaterial;
    serialize(): any;
    getClassName(): string;
    static Parse(source: any, scene: Scene, rootUrl: string): FluentButtonMaterial;
}
