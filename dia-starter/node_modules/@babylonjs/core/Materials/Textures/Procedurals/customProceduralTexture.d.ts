import type { Scene } from "../../../scene";
import { Texture } from "../../../Materials/Textures/texture";
import type { IProceduralTextureCreationOptions } from "./proceduralTexture";
import { ProceduralTexture } from "./proceduralTexture";
import type { TextureSize } from "../../../Materials/Textures/textureCreationOptions";
/**
 * Options to create a Custom Procedural Texture.
 */
export interface ICustomProceduralTextureCreationOptions extends IProceduralTextureCreationOptions {
    /**
     * Define a boolena indicating that there is no json config file to load
     */
    skipJson?: boolean;
}
/**
 * Procedural texturing is a way to programmatically create a texture. There are 2 types of procedural textures: code-only, and code that references some classic 2D images, sometimes called 'refMaps' or 'sampler' images.
 * Custom Procedural textures are the easiest way to create your own procedural in your application.
 * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/using/proceduralTextures#creating-custom-procedural-textures
 */
export declare class CustomProceduralTexture extends ProceduralTexture {
    private _animate;
    private _time;
    private _config;
    private _texturePath;
    /**
     * Instantiates a new Custom Procedural Texture.
     * Procedural texturing is a way to programmatically create a texture. There are 2 types of procedural textures: code-only, and code that references some classic 2D images, sometimes called 'refMaps' or 'sampler' images.
     * Custom Procedural textures are the easiest way to create your own procedural in your application.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/using/proceduralTextures#creating-custom-procedural-textures
     * @param name Define the name of the texture
     * @param texturePath Define the folder path containing all the custom texture related files (config, shaders...)
     * @param size Define the size of the texture to create
     * @param scene Define the scene the texture belongs to
     * @param fallbackTexture Define a fallback texture in case there were issues to create the custom texture
     * @param generateMipMaps Define if the texture should creates mip maps or not
     * @param skipJson Define a boolena indicating that there is no json config file to load
     */
    constructor(name: string, texturePath: string, size: TextureSize, scene: Scene, fallbackTexture?: Texture | ICustomProceduralTextureCreationOptions, generateMipMaps?: boolean, skipJson?: boolean);
    private _loadJson;
    /**
     * Is the texture ready to be used ? (rendered at least once)
     * @returns true if ready, otherwise, false.
     */
    isReady(): boolean;
    /**
     * Render the texture to its associated render target.
     * @param useCameraPostProcess Define if camera post process should be applied to the texture
     */
    render(useCameraPostProcess?: boolean): void;
    /**
     * Update the list of dependant textures samplers in the shader.
     */
    updateTextures(): void;
    /**
     * Update the uniform values of the procedural texture in the shader.
     */
    updateShaderUniforms(): void;
    /**
     * Define if the texture animates or not.
     */
    get animate(): boolean;
    set animate(value: boolean);
}
