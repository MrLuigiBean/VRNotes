import { SphericalPolynomial } from "../../Maths/sphericalPolynomial";
import type { BaseTexture } from "../../Materials/Textures/baseTexture";
import type { Nullable } from "../../types";
import type { CubeMapInfo } from "./panoramaToCubemap";
/**
 * Helper class dealing with the extraction of spherical polynomial dataArray
 * from a cube map.
 */
export declare class CubeMapToSphericalPolynomialTools {
    private static _FileFaces;
    /** @internal */
    static MAX_HDRI_VALUE: number;
    /** @internal */
    static PRESERVE_CLAMPED_COLORS: boolean;
    /**
     * Converts a texture to the according Spherical Polynomial data.
     * This extracts the first 3 orders only as they are the only one used in the lighting.
     *
     * @param texture The texture to extract the information from.
     * @returns The Spherical Polynomial data.
     */
    static ConvertCubeMapTextureToSphericalPolynomial(texture: BaseTexture): Nullable<Promise<SphericalPolynomial>>;
    /**
     * Compute the area on the unit sphere of the rectangle defined by (x,y) and the origin
     * See https://www.rorydriscoll.com/2012/01/15/cubemap-texel-solid-angle/
     * @param x
     * @param y
     */
    private static _AreaElement;
    /**
     * Converts a cubemap to the according Spherical Polynomial data.
     * This extracts the first 3 orders only as they are the only one used in the lighting.
     *
     * @param cubeInfo The Cube map to extract the information from.
     * @returns The Spherical Polynomial data.
     */
    static ConvertCubeMapToSphericalPolynomial(cubeInfo: CubeMapInfo): SphericalPolynomial;
}
