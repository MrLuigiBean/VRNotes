import type { Scene } from "../../scene";
import { ShaderMaterial } from "../shaderMaterial";
import "../../Shaders/color.fragment";
import "../../Shaders/color.vertex";
/**
 * A material to use for fast depth-only rendering.
 * @since 5.0.0
 */
export declare class OcclusionMaterial extends ShaderMaterial {
    constructor(name: string, scene: Scene);
}
