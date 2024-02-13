import type { Nullable } from "../types";
import { Color3 } from "../Maths/math.color";
import { Texture } from "../Materials/Textures/texture";
import type { LensFlareSystem } from "./lensFlareSystem";
import { DrawWrapper } from "../Materials/drawWrapper";
/**
 * This represents one of the lens effect in a `lensFlareSystem`.
 * It controls one of the individual texture used in the effect.
 * @see https://doc.babylonjs.com/features/featuresDeepDive/environment/lenseFlare
 */
export declare class LensFlare {
    /**
     * Define the size of the lens flare in the system (a floating value between 0 and 1)
     */
    size: number;
    /**
     * Define the position of the lens flare in the system. (a floating value between -1 and 1). A value of 0 is located on the emitter. A value greater than 0 is beyond the emitter and a value lesser than 0 is behind.
     */
    position: number;
    /**
     * Define the lens color.
     */
    color: Color3;
    /**
     * Define the lens texture.
     */
    texture: Nullable<Texture>;
    /**
     * Define the alpha mode to render this particular lens.
     */
    alphaMode: number;
    /** @internal */
    _drawWrapper: DrawWrapper;
    private _system;
    /**
     * Creates a new Lens Flare.
     * This represents one of the lens effect in a `lensFlareSystem`.
     * It controls one of the individual texture used in the effect.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/environment/lenseFlare
     * @param size Define the size of the lens flare (a floating value between 0 and 1)
     * @param position Define the position of the lens flare in the system. (a floating value between -1 and 1). A value of 0 is located on the emitter. A value greater than 0 is beyond the emitter and a value lesser than 0 is behind.
     * @param color Define the lens color
     * @param imgUrl Define the lens texture url
     * @param system Define the `lensFlareSystem` this flare is part of
     * @returns The newly created Lens Flare
     */
    static AddFlare(size: number, position: number, color: Color3, imgUrl: string, system: LensFlareSystem): LensFlare;
    /**
     * Instantiates a new Lens Flare.
     * This represents one of the lens effect in a `lensFlareSystem`.
     * It controls one of the individual texture used in the effect.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/environment/lenseFlare
     * @param size Define the size of the lens flare in the system (a floating value between 0 and 1)
     * @param position Define the position of the lens flare in the system. (a floating value between -1 and 1). A value of 0 is located on the emitter. A value greater than 0 is beyond the emitter and a value lesser than 0 is behind.
     * @param color Define the lens color
     * @param imgUrl Define the lens texture url
     * @param system Define the `lensFlareSystem` this flare is part of
     */
    constructor(
    /**
     * Define the size of the lens flare in the system (a floating value between 0 and 1)
     */
    size: number, 
    /**
     * Define the position of the lens flare in the system. (a floating value between -1 and 1). A value of 0 is located on the emitter. A value greater than 0 is beyond the emitter and a value lesser than 0 is behind.
     */
    position: number, color: Color3, imgUrl: string, system: LensFlareSystem);
    /**
     * Dispose and release the lens flare with its associated resources.
     */
    dispose(): void;
}
