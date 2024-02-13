import type { Scene } from "../scene";
import { ReflectionProbe } from "../Probes/reflectionProbe";
import type { AbstractMesh } from "../Meshes/abstractMesh";
import type { Vector3 } from "../Maths/math.vector";
import "../Shaders/equirectangularPanorama.fragment";
/**
 * Interface containing options related to equirectangular capture of the current scene
 */
export interface EquiRectangularCaptureOptions {
    /**
     * This option relates to smallest dimension of the given equirectangular capture
     * Giving a 512px size would result in an image that 512 x 1024px
     */
    size: number;
    /**
     * Optional function to map which meshes should get rendered on the equirectangular map
     * This is specifically helpful when you have certain meshes that you want to skip, especially ground
     */
    meshesFilter?: (mesh: AbstractMesh) => boolean;
    /**
     * Optional argument to specify filename, passing this would auto download the given file
     */
    filename?: string;
    /**
     * Optional argument to specify position in 3D Space from where the equirectangular capture should be taken, if not specified, it would take the position of the scene's active camera or else origin
     */
    position?: Vector3;
    /**
     * Optional argument to specify probe with which the equirectangular image is generated
     * When passing this, size and position arguments are ignored
     */
    probe?: ReflectionProbe;
}
/**
 * @param scene This refers to the scene which would be rendered in the given equirectangular capture
 * @param options This refers to the options for a given equirectangular capture
 * @returns the requested capture's pixel-data or auto downloads the file if options.filename is specified
 */
export declare function captureEquirectangularFromScene(scene: Scene, options: EquiRectangularCaptureOptions): Promise<ArrayBufferView | null>;
