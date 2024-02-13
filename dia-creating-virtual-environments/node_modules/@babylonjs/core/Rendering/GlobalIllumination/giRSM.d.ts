import type { ReflectiveShadowMap } from "../reflectiveShadowMap";
/**
 * Class used to store the global illumination parameters for a reflective shadow map.
 * Instances of this class are used by the GIRSMManager class to generate global illumination for a scene.
 */
export declare class GIRSM {
    /**
     * The reflective shadow map used to generate the global illumination for the corresponding light.
     */
    rsm: ReflectiveShadowMap;
    /**
     * The number of samples to use to generate the global illumination. Default value is 400.
     */
    numSamples: number;
    /**
     * Radius of the circle in the RSM flux texture to read samples from. Default value is 0.1.
     * Valid values are between 0 and 1.
     */
    radius: number;
    /**
     * Intensity of the global illumination effect. Default value is 0.1.
     */
    intensity: number;
    /**
     * value used to correct for edge artifacts when calculating the global illumination effect. Default value is 0.1.
     * Will depend on your scene.
     */
    edgeArtifactCorrection: number;
    /**
     * Defines if samples should be rotated when generating the global illumination effect. Default value is true.
     * Rotating samples will improve the quality of the global illumination effect by trading banding for noise, at the cost of a bit of performance.
     */
    rotateSample: boolean;
    /**
     * Noise scale factor, only used if rotateSample is true. Default value is 100.
     * Will depend on your scene.
     */
    noiseFactor: number;
    /**
     * Defines if the full texture should be used when generating the global illumination effect. Default value is false.
     * If true, values for numSamples, radius, rotateSample and noiseFactor will be ignored and the full texture will be used to generate the global illumination effect.
     * Be careful to use a RSM texture size small enough to limit the number of samples! For eg. a 32x32 texture will generate 1024 samples per pixel!
     */
    useFullTexture: boolean;
    /**
     * Creates a new GIRSM instance
     * @param rsm The reflective shadow map
     */
    constructor(rsm: ReflectiveShadowMap);
    /**
     * Disposes the GIRSM
     */
    dispose(): void;
}
