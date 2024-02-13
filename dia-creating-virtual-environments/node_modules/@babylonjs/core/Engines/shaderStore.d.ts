import { ShaderLanguage } from "../Materials/shaderLanguage";
/**
 * Defines the shader related stores and directory
 */
export declare class ShaderStore {
    /**
     * Gets or sets the relative url used to load shaders if using the engine in non-minified mode
     */
    static ShadersRepository: string;
    /**
     * Store of each shader (The can be looked up using effect.key)
     */
    static ShadersStore: {
        [key: string]: string;
    };
    /**
     * Store of each included file for a shader (The can be looked up using effect.key)
     */
    static IncludesShadersStore: {
        [key: string]: string;
    };
    /**
     * Gets or sets the relative url used to load shaders (WGSL) if using the engine in non-minified mode
     */
    static ShadersRepositoryWGSL: string;
    /**
     * Store of each shader  (WGSL)
     */
    static ShadersStoreWGSL: {
        [key: string]: string;
    };
    /**
     * Store of each included file for a shader (WGSL)
     */
    static IncludesShadersStoreWGSL: {
        [key: string]: string;
    };
    /**
     * Gets the shaders repository path for a given shader language
     * @param shaderLanguage the shader language
     * @returns the path to the shaders repository
     */
    static GetShadersRepository(shaderLanguage?: ShaderLanguage): string;
    /**
     * Gets the shaders store of a given shader language
     * @param shaderLanguage the shader language
     * @returns the shaders store
     */
    static GetShadersStore(shaderLanguage?: ShaderLanguage): {
        [key: string]: string;
    };
    /**
     * Gets the include shaders store of a given shader language
     * @param shaderLanguage the shader language
     * @returns the include shaders store
     */
    static GetIncludesShadersStore(shaderLanguage?: ShaderLanguage): {
        [key: string]: string;
    };
}
