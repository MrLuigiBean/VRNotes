import { StandardMaterial } from "./../../Materials/standardMaterial";
import { PBRMaterial } from "../../Materials/PBR/pbrMaterial";
import type { Nullable } from "../../types";
import { GreasedLineMesh } from "../GreasedLine/greasedLineMesh";
import type { Scene } from "../../scene";
import type { Color3 } from "../../Maths/math.color";
import { GreasedLineSimpleMaterial } from "../../Materials/GreasedLine/greasedLineSimpleMaterial";
import type { GreasedLineMeshOptions } from "../GreasedLine/greasedLineBaseMesh";
import { GreasedLineRibbonMesh } from "../GreasedLine/greasedLineRibbonMesh";
import type { GreasedLineMaterialOptions } from "../../Materials/GreasedLine/greasedLineMaterialInterfaces";
/**
 * How are the colors distributed along the color table
 * {@link https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param/greased_line#colors-and-colordistribution}
 */
export declare enum GreasedLineMeshColorDistribution {
    /**
     * Do no modify the color table
     */
    COLOR_DISTRIBUTION_NONE = 0,
    /**
     * Repeat the colors until the color table is full
     */
    COLOR_DISTRIBUTION_REPEAT = 1,
    /**
     * Distribute the colors evenly through the color table
     */
    COLOR_DISTRIBUTION_EVEN = 2,
    /**
     * Put the colors to start of the color table a fill the rest with the default color
     */
    COLOR_DISTRIBUTION_START = 3,
    /**
     * Put the colors to the end of the color table and fill the rest with the default color
     */
    COLOR_DISTRIBUTION_END = 4,
    /**
     * Put the colors to start and to the end of the color table and fill the gap between with the default color
     */
    COLOR_DISTRIBUTION_START_END = 5
}
/**
 * How are the widths distributed along the width table
 * {@link https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param/greased_line#widths-and-widthdistribution}
 */
export declare enum GreasedLineMeshWidthDistribution {
    /**
     * Do no modify the width table
     */
    WIDTH_DISTRIBUTION_NONE = 0,
    /**
     * Repeat the widths until the width table is full
     */
    WIDTH_DISTRIBUTION_REPEAT = 1,
    /**
     * Distribute the widths evenly through the width table
     */
    WIDTH_DISTRIBUTION_EVEN = 2,
    /**
     * Put the widths to start of the width table a fill the rest with the default width
     */
    WIDTH_DISTRIBUTION_START = 3,
    /**
     * Put the widths to the end of the width table and fill the rest with the default width
     */
    WIDTH_DISTRIBUTION_END = 4,
    /**
     * Put the widths to start and to the end of the width table and fill the gap between with the default width
     */
    WIDTH_DISTRIBUTION_START_END = 5
}
/**
 * Material options for GreasedLineBuilder
 */
export interface GreasedLineMaterialBuilderOptions extends GreasedLineMaterialOptions {
    /**
     * If set to true a new material will be created and a new material plugin will be attached
     * to the material. The material will be set on the mesh. If the instance option is specified in the mesh options,
     * no material will be created/assigned. Defaults to true.
     */
    createAndAssignMaterial?: boolean;
    /**
     * Distribution of the colors if the color table contains fewer entries than needed. Defaults to GreasedLineMeshColorDistribution.COLOR_DISTRIBUTION_START
     * @see CompleteGreasedLineColorTable
     */
    colorDistribution?: GreasedLineMeshColorDistribution;
}
/**
 * Line mesh options for GreasedLineBuilder
 */
export interface GreasedLineMeshBuilderOptions extends GreasedLineMeshOptions {
    /**
     * Distribution of the widths if the width table contains fewer entries than needed. Defaults to GreasedLineMeshWidthDistribution.WIDTH_DISTRIBUTION_START
     * @see CompleteGreasedLineWidthTable
     */
    widthDistribution?: GreasedLineMeshWidthDistribution;
}
/**
 * Builder functions for creating GreasedLineMeshes
 */
/**
 * Creates a new @see GreasedLinePluginMaterial
 * @param name name of the material
 * @param options material options @see GreasedLineMaterialOptions
 * @param scene scene or null to use the last scene
 * @returns StandardMaterial or PBRMaterial with the @see GreasedLinePluginMaterial attached to it
 */
export declare function CreateGreasedLineMaterial(name: string, options: GreasedLineMaterialOptions, scene: Nullable<Scene>): StandardMaterial | PBRMaterial | GreasedLineSimpleMaterial;
/**
 * Creates a GreasedLine mesh
 * @param name name of the mesh
 * @param options options for the mesh
 * @param materialOptions material options for the mesh
 * @param scene scene where the mesh will be created
 * @returns instance of GreasedLineMesh
 */
export declare function CreateGreasedLine(name: string, options: GreasedLineMeshBuilderOptions, materialOptions?: Nullable<GreasedLineMaterialBuilderOptions>, scene?: Nullable<Scene>): import("../GreasedLine/greasedLineBaseMesh").GreasedLineBaseMesh | GreasedLineMesh | GreasedLineRibbonMesh;
/**
 * Completes the width table/fills the missing entries. It means it creates a width entry for every point of the line mesh.
 * You can provide more points the widths when creating the mesh. This function will fill the empty entries.
 * The algorithm used to fill the empty entries can be
 * GreasedLineMeshWidthDistribution.REPEAT - the width table will be repeatedly copied to the empty values [wL, wU] = [wL, wU, wL, wU, wL, wU, wL, wU, ...]
 * GreasedLineMeshWidthDistribution.EVEN - the width table will be evenly copied to the empty values [wL, wU] = [wL, wL, wL, wL, wU, wU, wU, wU]
 * GreasedLineMeshWidthDistribution.START - the width table will be copied at the start of the empty values
 * and rest will be filled width the default width upper and default width lower values [wU, wL] = [wL, wU, dwL, dwU, dwL, dwU, dwL, dwU]
 * GreasedLineMeshWidthDistribution.END - the width table will be copied at the end of the empty values
 * and rest will be filled width the default values [wL, wU] = [wL, wU, dwL, dwU, dwL, dwU, wL, wU]
 * @param pointCount number of points of the line mesh
 * @param widths array of widths [widhtLower, widthUpper, widthLower, widthUpper ...]. Two widths (lower/upper) per point.
 * @param widthsDistribution how to distribute widths if the widths array has fewer entries than pointCount
 * @param defaultWidthUpper the default value which will be used to fill empty width entries - upper width
 * @param defaultWidthLower the default value which will be used to fill empty width entries - lower width
 * @returns completed width table.
 */
export declare function CompleteGreasedLineWidthTable(pointCount: number, widths: number[], widthsDistribution: GreasedLineMeshWidthDistribution, defaultWidthUpper?: number, defaultWidthLower?: number): number[];
/**
 * Completes the color table/fill the missing color entries. It means it creates a color entry for every point of the line mesh.
 * You can provide more points the colors when creating the mesh. This function will fill the empty entries.
 * The algorithm used to fill the empty entries can be
 * GreasedLineMesColorhDistribution.REPEAT - the color table will be repeatedly copied to the empty values [c1, c2] = [c1, c2, c1, c2, c1, c2, c1, c2]
 * GreasedLineMesColorhDistribution.EVEN - the color table will be evenly copied to the empty values [c1, c2] = [c1, c1, c1, c1, c2, c2, c2, c2]
 * GreasedLineMesColorhDistribution.START - the color table will be copied at the start of the empty values
 * and rest will be filled color the default color value [c1, c2] = [c1, c2, dc, dc, dc, dc, dc, dc]
 * GreasedLineMesColorhDistribution.START_END - the color table will be copied at the start and the end of the empty values
 * and rest will be filled color the default color value [c1, c2] = [c1, c2, dc, dc, dc, dc, c1, c2]
 * @param pointCount number of points of the line mesh
 * @param colors array of Color3 for the color table
 * @param colorDistribution how to distribute colors if the colors array has fewer entries than pointCount
 * @param defaultColor default color to be used to fill empty entries in the color table
 * @returns completed array of Color3s
 */
export declare function CompleteGreasedLineColorTable(pointCount: number, colors: Color3[], colorDistribution: GreasedLineMeshColorDistribution, defaultColor: Color3): Color3[];
