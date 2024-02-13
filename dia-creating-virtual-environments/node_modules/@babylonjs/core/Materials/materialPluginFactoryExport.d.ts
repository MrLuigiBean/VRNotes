import type { Nullable } from "../types";
import type { MaterialPluginBase } from "./materialPluginBase";
import type { Material } from "./material";
/**
 * Creates an instance of the anisotropic plugin
 * @param material parent material the plugin will be created for
 * @returns the plugin instance or null if the plugin is incompatible with material
 */
export declare function createPBRAnisotropicPlugin(material: Material): Nullable<MaterialPluginBase>;
/**
 * Creates an instance of the brdf plugin
 * @param material parent material the plugin will be created for
 * @returns the plugin instance or null if the plugin is incompatible with material
 */
export declare function createPBRBRDFPlugin(material: Material): Nullable<MaterialPluginBase>;
/**
 * Creates an instance of the clear coat plugin
 * @param material parent material the plugin will be created for
 * @returns the plugin instance or null if the plugin is incompatible with material
 */
export declare function createPBRClearCoatPlugin(material: Material): Nullable<MaterialPluginBase>;
/**
 * Creates an instance of the iridescence plugin
 * @param material parent material the plugin will be created for
 * @returns the plugin instance or null if the plugin is incompatible with material
 */
export declare function createPBRIridescencePlugin(material: Material): Nullable<MaterialPluginBase>;
/**
 * Creates an instance of the sheen plugin
 * @param material parent material the plugin will be created for
 * @returns the plugin instance or null if the plugin is incompatible with material
 */
export declare function createPBRSheenPlugin(material: Material): Nullable<MaterialPluginBase>;
/**
 * Creates an instance of the sub surface plugin
 * @param material parent material the plugin will be created for
 * @returns the plugin instance or null if the plugin is incompatible with material
 */
export declare function createPBRSubSurfacePlugin(material: Material): Nullable<MaterialPluginBase>;
/**
 * Creates an instance of the detail map plugin
 * @param material parent material the plugin will be created for
 * @returns the plugin instance or null if the plugin is incompatible with material
 */
export declare function createDetailMapPlugin(material: Material): Nullable<MaterialPluginBase>;
