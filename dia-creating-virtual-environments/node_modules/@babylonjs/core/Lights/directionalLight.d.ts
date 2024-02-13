import type { Camera } from "../Cameras/camera";
import type { Scene } from "../scene";
import { Matrix, Vector3 } from "../Maths/math.vector";
import type { AbstractMesh } from "../Meshes/abstractMesh";
import { Light } from "./light";
import { ShadowLight } from "./shadowLight";
import type { Effect } from "../Materials/effect";
/**
 * A directional light is defined by a direction (what a surprise!).
 * The light is emitted from everywhere in the specified direction, and has an infinite range.
 * An example of a directional light is when a distance planet is lit by the apparently parallel lines of light from its sun. Light in a downward direction will light the top of an object.
 * Documentation: https://doc.babylonjs.com/features/featuresDeepDive/lights/lights_introduction
 */
export declare class DirectionalLight extends ShadowLight {
    private _shadowFrustumSize;
    /**
     * Fix frustum size for the shadow generation. This is disabled if the value is 0.
     */
    get shadowFrustumSize(): number;
    /**
     * Specifies a fix frustum size for the shadow generation.
     */
    set shadowFrustumSize(value: number);
    private _shadowOrthoScale;
    /**
     * Gets the shadow projection scale against the optimal computed one.
     * 0.1 by default which means that the projection window is increase by 10% from the optimal size.
     * This does not impact in fixed frustum size (shadowFrustumSize being set)
     */
    get shadowOrthoScale(): number;
    /**
     * Sets the shadow projection scale against the optimal computed one.
     * 0.1 by default which means that the projection window is increase by 10% from the optimal size.
     * This does not impact in fixed frustum size (shadowFrustumSize being set)
     */
    set shadowOrthoScale(value: number);
    /**
     * Automatically compute the projection matrix to best fit (including all the casters)
     * on each frame.
     */
    autoUpdateExtends: boolean;
    /**
     * Automatically compute the shadowMinZ and shadowMaxZ for the projection matrix to best fit (including all the casters)
     * on each frame. autoUpdateExtends must be set to true for this to work
     */
    autoCalcShadowZBounds: boolean;
    private _orthoLeft;
    private _orthoRight;
    private _orthoTop;
    private _orthoBottom;
    /**
     * Gets or sets the orthoLeft property used to build the light frustum
     */
    get orthoLeft(): number;
    set orthoLeft(left: number);
    /**
     * Gets or sets the orthoRight property used to build the light frustum
     */
    get orthoRight(): number;
    set orthoRight(right: number);
    /**
     * Gets or sets the orthoTop property used to build the light frustum
     */
    get orthoTop(): number;
    set orthoTop(top: number);
    /**
     * Gets or sets the orthoBottom property used to build the light frustum
     */
    get orthoBottom(): number;
    set orthoBottom(bottom: number);
    /**
     * Creates a DirectionalLight object in the scene, oriented towards the passed direction (Vector3).
     * The directional light is emitted from everywhere in the given direction.
     * It can cast shadows.
     * Documentation : https://doc.babylonjs.com/features/featuresDeepDive/lights/lights_introduction
     * @param name The friendly name of the light
     * @param direction The direction of the light
     * @param scene The scene the light belongs to
     */
    constructor(name: string, direction: Vector3, scene?: Scene);
    /**
     * Returns the string "DirectionalLight".
     * @returns The class name
     */
    getClassName(): string;
    /**
     * Returns the integer 1.
     * @returns The light Type id as a constant defines in Light.LIGHTTYPEID_x
     */
    getTypeID(): number;
    /**
     * Sets the passed matrix "matrix" as projection matrix for the shadows cast by the light according to the passed view matrix.
     * Returns the DirectionalLight Shadow projection matrix.
     * @param matrix
     * @param viewMatrix
     * @param renderList
     */
    protected _setDefaultShadowProjectionMatrix(matrix: Matrix, viewMatrix: Matrix, renderList: Array<AbstractMesh>): void;
    /**
     * Sets the passed matrix "matrix" as fixed frustum projection matrix for the shadows cast by the light according to the passed view matrix.
     * Returns the DirectionalLight Shadow projection matrix.
     * @param matrix
     */
    protected _setDefaultFixedFrustumShadowProjectionMatrix(matrix: Matrix): void;
    /**
     * Sets the passed matrix "matrix" as auto extend projection matrix for the shadows cast by the light according to the passed view matrix.
     * Returns the DirectionalLight Shadow projection matrix.
     * @param matrix
     * @param viewMatrix
     * @param renderList
     */
    protected _setDefaultAutoExtendShadowProjectionMatrix(matrix: Matrix, viewMatrix: Matrix, renderList: Array<AbstractMesh>): void;
    protected _buildUniformLayout(): void;
    /**
     * Sets the passed Effect object with the DirectionalLight transformed position (or position if not parented) and the passed name.
     * @param effect The effect to update
     * @param lightIndex The index of the light in the effect to update
     * @returns The directional light
     */
    transferToEffect(effect: Effect, lightIndex: string): DirectionalLight;
    transferToNodeMaterialEffect(effect: Effect, lightDataUniformName: string): Light;
    /**
     * Gets the minZ used for shadow according to both the scene and the light.
     *
     * Values are fixed on directional lights as it relies on an ortho projection hence the need to convert being
     * -1 and 1 to 0 and 1 doing (depth + min) / (min + max) -> (depth + 1) / (1 + 1) -> (depth * 0.5) + 0.5.
     * (when not using reverse depth buffer / NDC half Z range)
     * @param activeCamera The camera we are returning the min for
     * @returns the depth min z
     */
    getDepthMinZ(activeCamera: Camera): number;
    /**
     * Gets the maxZ used for shadow according to both the scene and the light.
     *
     * Values are fixed on directional lights as it relies on an ortho projection hence the need to convert being
     * -1 and 1 to 0 and 1 doing (depth + min) / (min + max) -> (depth + 1) / (1 + 1) -> (depth * 0.5) + 0.5.
     * (when not using reverse depth buffer / NDC half Z range)
     * @param activeCamera The camera we are returning the max for
     * @returns the depth max z
     */
    getDepthMaxZ(activeCamera: Camera): number;
    /**
     * Prepares the list of defines specific to the light type.
     * @param defines the list of defines
     * @param lightIndex defines the index of the light for the effect
     */
    prepareLightSpecificDefines(defines: any, lightIndex: number): void;
}
