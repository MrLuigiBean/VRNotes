import type { Nullable } from "@babylonjs/core/types.js";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial.js";
import type { Scene } from "@babylonjs/core/scene.js";
import type { AssetContainer } from "@babylonjs/core/assetContainer.js";
/**
 * Class reading and parsing the MTL file bundled with the obj file.
 */
export declare class MTLFileLoader {
    /**
     * Invert Y-Axis of referenced textures on load
     */
    static INVERT_TEXTURE_Y: boolean;
    /**
     * All material loaded from the mtl will be set here
     */
    materials: StandardMaterial[];
    /**
     * This function will read the mtl file and create each material described inside
     * This function could be improve by adding :
     * -some component missing (Ni, Tf...)
     * -including the specific options available
     *
     * @param scene defines the scene the material will be created in
     * @param data defines the mtl data to parse
     * @param rootUrl defines the rooturl to use in order to load relative dependencies
     * @param assetContainer defines the asset container to store the material in (can be null)
     */
    parseMTL(scene: Scene, data: string | ArrayBuffer, rootUrl: string, assetContainer: Nullable<AssetContainer>): void;
    /**
     * Gets the texture for the material.
     *
     * If the material is imported from input file,
     * We sanitize the url to ensure it takes the texture from aside the material.
     *
     * @param rootUrl The root url to load from
     * @param value The value stored in the mtl
     * @param scene
     * @returns The Texture
     */
    private static _GetTexture;
}
