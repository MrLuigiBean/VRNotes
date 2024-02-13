import type { Nullable } from "../types";
import type { Scene } from "../scene";
import { Matrix, Vector3 } from "../Maths/math.vector";
import { Color3 } from "../Maths/math.color";
import type { Effect } from "../Materials/effect";
import { Light } from "./light";
import type { IShadowGenerator } from "./Shadows/shadowGenerator";
/**
 * The HemisphericLight simulates the ambient environment light,
 * so the passed direction is the light reflection direction, not the incoming direction.
 */
export declare class HemisphericLight extends Light {
    /**
     * The groundColor is the light in the opposite direction to the one specified during creation.
     * You can think of the diffuse and specular light as coming from the centre of the object in the given direction and the groundColor light in the opposite direction.
     */
    groundColor: Color3;
    /**
     * The light reflection direction, not the incoming direction.
     */
    direction: Vector3;
    /**
     * Creates a HemisphericLight object in the scene according to the passed direction (Vector3).
     * The HemisphericLight simulates the ambient environment light, so the passed direction is the light reflection direction, not the incoming direction.
     * The HemisphericLight can't cast shadows.
     * Documentation : https://doc.babylonjs.com/features/featuresDeepDive/lights/lights_introduction
     * @param name The friendly name of the light
     * @param direction The direction of the light reflection
     * @param scene The scene the light belongs to
     */
    constructor(name: string, direction: Vector3, scene?: Scene);
    protected _buildUniformLayout(): void;
    /**
     * Returns the string "HemisphericLight".
     * @returns The class name
     */
    getClassName(): string;
    /**
     * Sets the HemisphericLight direction towards the passed target (Vector3).
     * Returns the updated direction.
     * @param target The target the direction should point to
     * @returns The computed direction
     */
    setDirectionToTarget(target: Vector3): Vector3;
    /**
     * Returns the shadow generator associated to the light.
     * @returns Always null for hemispheric lights because it does not support shadows.
     */
    getShadowGenerator(): Nullable<IShadowGenerator>;
    /**
     * Sets the passed Effect object with the HemisphericLight normalized direction and color and the passed name (string).
     * @param _effect The effect to update
     * @param lightIndex The index of the light in the effect to update
     * @returns The hemispheric light
     */
    transferToEffect(_effect: Effect, lightIndex: string): HemisphericLight;
    transferToNodeMaterialEffect(effect: Effect, lightDataUniformName: string): this;
    /**
     * Computes the world matrix of the node
     * @returns the world matrix
     */
    computeWorldMatrix(): Matrix;
    /**
     * Returns the integer 3.
     * @returns The light Type id as a constant defines in Light.LIGHTTYPEID_x
     */
    getTypeID(): number;
    /**
     * Prepares the list of defines specific to the light type.
     * @param defines the list of defines
     * @param lightIndex defines the index of the light for the effect
     */
    prepareLightSpecificDefines(defines: any, lightIndex: number): void;
}
