import type { Nullable } from "../types";
import type { Scene } from "../scene";
import { Matrix, Vector3, Vector2, Vector4, Quaternion } from "../Maths/math.vector";
import type { AbstractMesh } from "../Meshes/abstractMesh";
import type { Mesh } from "../Meshes/mesh";
import type { SubMesh } from "../Meshes/subMesh";
import type { BaseTexture } from "../Materials/Textures/baseTexture";
import type { Effect } from "./effect";
import { Color3, Color4 } from "../Maths/math.color";
import type { ShaderLanguage } from "./shaderLanguage";
import type { UniformBuffer } from "./uniformBuffer";
import type { TextureSampler } from "./Textures/textureSampler";
import type { StorageBuffer } from "../Buffers/storageBuffer";
import { PushMaterial } from "./pushMaterial";
import type { ExternalTexture } from "./Textures/externalTexture";
/**
 * Defines the options associated with the creation of a shader material.
 */
export interface IShaderMaterialOptions {
    /**
     * Does the material work in alpha blend mode
     */
    needAlphaBlending: boolean;
    /**
     * Does the material work in alpha test mode
     */
    needAlphaTesting: boolean;
    /**
     * The list of attribute names used in the shader
     */
    attributes: string[];
    /**
     * The list of uniform names used in the shader
     */
    uniforms: string[];
    /**
     * The list of UBO names used in the shader
     */
    uniformBuffers: string[];
    /**
     * The list of sampler (texture) names used in the shader
     */
    samplers: string[];
    /**
     * The list of external texture names used in the shader
     */
    externalTextures: string[];
    /**
     * The list of sampler object names used in the shader
     */
    samplerObjects: string[];
    /**
     * The list of storage buffer names used in the shader
     */
    storageBuffers: string[];
    /**
     * The list of defines used in the shader
     */
    defines: string[];
    /**
     * Defines if clip planes have to be turned on: true to turn them on, false to turn them off and null to turn them on/off depending on the scene configuration (scene.clipPlaneX)
     */
    useClipPlane: Nullable<boolean>;
    /**
     * The language the shader is written in (default: GLSL)
     */
    shaderLanguage?: ShaderLanguage;
}
/**
 * The ShaderMaterial object has the necessary methods to pass data from your scene to the Vertex and Fragment Shaders and returns a material that can be applied to any mesh.
 *
 * This returned material effects how the mesh will look based on the code in the shaders.
 *
 * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/shaders/shaderMaterial
 */
export declare class ShaderMaterial extends PushMaterial {
    private _shaderPath;
    private _options;
    private _textures;
    private _textureArrays;
    private _externalTextures;
    private _floats;
    private _ints;
    private _uints;
    private _floatsArrays;
    private _colors3;
    private _colors3Arrays;
    private _colors4;
    private _colors4Arrays;
    private _vectors2;
    private _vectors3;
    private _vectors4;
    private _quaternions;
    private _quaternionsArrays;
    private _matrices;
    private _matrixArrays;
    private _matrices3x3;
    private _matrices2x2;
    private _vectors2Arrays;
    private _vectors3Arrays;
    private _vectors4Arrays;
    private _uniformBuffers;
    private _textureSamplers;
    private _storageBuffers;
    private _cachedWorldViewMatrix;
    private _cachedWorldViewProjectionMatrix;
    private _multiview;
    /**
     * @internal
     */
    _materialHelperNeedsPreviousMatrices: boolean;
    /** Define the Url to load snippets */
    static SnippetUrl: string;
    /** Snippet ID if the material was created from the snippet server */
    snippetId: string;
    /**
     * Instantiate a new shader material.
     * The ShaderMaterial object has the necessary methods to pass data from your scene to the Vertex and Fragment Shaders and returns a material that can be applied to any mesh.
     * This returned material effects how the mesh will look based on the code in the shaders.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/shaders/shaderMaterial
     * @param name Define the name of the material in the scene
     * @param scene Define the scene the material belongs to
     * @param shaderPath Defines  the route to the shader code in one of three ways:
     *  * object: \{ vertex: "custom", fragment: "custom" \}, used with Effect.ShadersStore["customVertexShader"] and Effect.ShadersStore["customFragmentShader"]
     *  * object: \{ vertexElement: "vertexShaderCode", fragmentElement: "fragmentShaderCode" \}, used with shader code in script tags
     *  * object: \{ vertexSource: "vertex shader code string", fragmentSource: "fragment shader code string" \} using with strings containing the shaders code
     *  * string: "./COMMON_NAME", used with external files COMMON_NAME.vertex.fx and COMMON_NAME.fragment.fx in index.html folder.
     * @param options Define the options used to create the shader
     * @param storeEffectOnSubMeshes true to store effect on submeshes, false to store the effect directly in the material class.
     */
    constructor(name: string, scene: Scene, shaderPath: any, options?: Partial<IShaderMaterialOptions>, storeEffectOnSubMeshes?: boolean);
    /**
     * Gets the shader path used to define the shader code
     * It can be modified to trigger a new compilation
     */
    get shaderPath(): any;
    /**
     * Sets the shader path used to define the shader code
     * It can be modified to trigger a new compilation
     */
    set shaderPath(shaderPath: any);
    /**
     * Gets the options used to compile the shader.
     * They can be modified to trigger a new compilation
     */
    get options(): IShaderMaterialOptions;
    /**
     * is multiview set to true?
     */
    get isMultiview(): boolean;
    /**
     * Gets the current class name of the material e.g. "ShaderMaterial"
     * Mainly use in serialization.
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Specifies if the material will require alpha blending
     * @returns a boolean specifying if alpha blending is needed
     */
    needAlphaBlending(): boolean;
    /**
     * Specifies if this material should be rendered in alpha test mode
     * @returns a boolean specifying if an alpha test is needed.
     */
    needAlphaTesting(): boolean;
    private _checkUniform;
    /**
     * Set a texture in the shader.
     * @param name Define the name of the uniform samplers as defined in the shader
     * @param texture Define the texture to bind to this sampler
     * @returns the material itself allowing "fluent" like uniform updates
     */
    setTexture(name: string, texture: BaseTexture): ShaderMaterial;
    /**
     * Set a texture array in the shader.
     * @param name Define the name of the uniform sampler array as defined in the shader
     * @param textures Define the list of textures to bind to this sampler
     * @returns the material itself allowing "fluent" like uniform updates
     */
    setTextureArray(name: string, textures: BaseTexture[]): ShaderMaterial;
    /**
     * Set an internal texture in the shader.
     * @param name Define the name of the uniform samplers as defined in the shader
     * @param texture Define the texture to bind to this sampler
     * @returns the material itself allowing "fluent" like uniform updates
     */
    setExternalTexture(name: string, texture: ExternalTexture): ShaderMaterial;
    /**
     * Set a float in the shader.
     * @param name Define the name of the uniform as defined in the shader
     * @param value Define the value to give to the uniform
     * @returns the material itself allowing "fluent" like uniform updates
     */
    setFloat(name: string, value: number): ShaderMaterial;
    /**
     * Set a int in the shader.
     * @param name Define the name of the uniform as defined in the shader
     * @param value Define the value to give to the uniform
     * @returns the material itself allowing "fluent" like uniform updates
     */
    setInt(name: string, value: number): ShaderMaterial;
    /**
     * Set a unsigned int in the shader.
     * @param name Define the name of the uniform as defined in the shader
     * @param value Define the value to give to the uniform
     * @returns the material itself allowing "fluent" like uniform updates
     */
    setUInt(name: string, value: number): ShaderMaterial;
    /**
     * Set an array of floats in the shader.
     * @param name Define the name of the uniform as defined in the shader
     * @param value Define the value to give to the uniform
     * @returns the material itself allowing "fluent" like uniform updates
     */
    setFloats(name: string, value: number[]): ShaderMaterial;
    /**
     * Set a vec3 in the shader from a Color3.
     * @param name Define the name of the uniform as defined in the shader
     * @param value Define the value to give to the uniform
     * @returns the material itself allowing "fluent" like uniform updates
     */
    setColor3(name: string, value: Color3): ShaderMaterial;
    /**
     * Set a vec3 array in the shader from a Color3 array.
     * @param name Define the name of the uniform as defined in the shader
     * @param value Define the value to give to the uniform
     * @returns the material itself allowing "fluent" like uniform updates
     */
    setColor3Array(name: string, value: Color3[]): ShaderMaterial;
    /**
     * Set a vec4 in the shader from a Color4.
     * @param name Define the name of the uniform as defined in the shader
     * @param value Define the value to give to the uniform
     * @returns the material itself allowing "fluent" like uniform updates
     */
    setColor4(name: string, value: Color4): ShaderMaterial;
    /**
     * Set a vec4 array in the shader from a Color4 array.
     * @param name Define the name of the uniform as defined in the shader
     * @param value Define the value to give to the uniform
     * @returns the material itself allowing "fluent" like uniform updates
     */
    setColor4Array(name: string, value: Color4[]): ShaderMaterial;
    /**
     * Set a vec2 in the shader from a Vector2.
     * @param name Define the name of the uniform as defined in the shader
     * @param value Define the value to give to the uniform
     * @returns the material itself allowing "fluent" like uniform updates
     */
    setVector2(name: string, value: Vector2): ShaderMaterial;
    /**
     * Set a vec3 in the shader from a Vector3.
     * @param name Define the name of the uniform as defined in the shader
     * @param value Define the value to give to the uniform
     * @returns the material itself allowing "fluent" like uniform updates
     */
    setVector3(name: string, value: Vector3): ShaderMaterial;
    /**
     * Set a vec4 in the shader from a Vector4.
     * @param name Define the name of the uniform as defined in the shader
     * @param value Define the value to give to the uniform
     * @returns the material itself allowing "fluent" like uniform updates
     */
    setVector4(name: string, value: Vector4): ShaderMaterial;
    /**
     * Set a vec4 in the shader from a Quaternion.
     * @param name Define the name of the uniform as defined in the shader
     * @param value Define the value to give to the uniform
     * @returns the material itself allowing "fluent" like uniform updates
     */
    setQuaternion(name: string, value: Quaternion): ShaderMaterial;
    /**
     * Set a vec4 array in the shader from a Quaternion array.
     * @param name Define the name of the uniform as defined in the shader
     * @param value Define the value to give to the uniform
     * @returns the material itself allowing "fluent" like uniform updates
     */
    setQuaternionArray(name: string, value: Quaternion[]): ShaderMaterial;
    /**
     * Set a mat4 in the shader from a Matrix.
     * @param name Define the name of the uniform as defined in the shader
     * @param value Define the value to give to the uniform
     * @returns the material itself allowing "fluent" like uniform updates
     */
    setMatrix(name: string, value: Matrix): ShaderMaterial;
    /**
     * Set a float32Array in the shader from a matrix array.
     * @param name Define the name of the uniform as defined in the shader
     * @param value Define the value to give to the uniform
     * @returns the material itself allowing "fluent" like uniform updates
     */
    setMatrices(name: string, value: Matrix[]): ShaderMaterial;
    /**
     * Set a mat3 in the shader from a Float32Array.
     * @param name Define the name of the uniform as defined in the shader
     * @param value Define the value to give to the uniform
     * @returns the material itself allowing "fluent" like uniform updates
     */
    setMatrix3x3(name: string, value: Float32Array | Array<number>): ShaderMaterial;
    /**
     * Set a mat2 in the shader from a Float32Array.
     * @param name Define the name of the uniform as defined in the shader
     * @param value Define the value to give to the uniform
     * @returns the material itself allowing "fluent" like uniform updates
     */
    setMatrix2x2(name: string, value: Float32Array | Array<number>): ShaderMaterial;
    /**
     * Set a vec2 array in the shader from a number array.
     * @param name Define the name of the uniform as defined in the shader
     * @param value Define the value to give to the uniform
     * @returns the material itself allowing "fluent" like uniform updates
     */
    setArray2(name: string, value: number[]): ShaderMaterial;
    /**
     * Set a vec3 array in the shader from a number array.
     * @param name Define the name of the uniform as defined in the shader
     * @param value Define the value to give to the uniform
     * @returns the material itself allowing "fluent" like uniform updates
     */
    setArray3(name: string, value: number[]): ShaderMaterial;
    /**
     * Set a vec4 array in the shader from a number array.
     * @param name Define the name of the uniform as defined in the shader
     * @param value Define the value to give to the uniform
     * @returns the material itself allowing "fluent" like uniform updates
     */
    setArray4(name: string, value: number[]): ShaderMaterial;
    /**
     * Set a uniform buffer in the shader
     * @param name Define the name of the uniform as defined in the shader
     * @param buffer Define the value to give to the uniform
     * @returns the material itself allowing "fluent" like uniform updates
     */
    setUniformBuffer(name: string, buffer: UniformBuffer): ShaderMaterial;
    /**
     * Set a texture sampler in the shader
     * @param name Define the name of the uniform as defined in the shader
     * @param sampler Define the value to give to the uniform
     * @returns the material itself allowing "fluent" like uniform updates
     */
    setTextureSampler(name: string, sampler: TextureSampler): ShaderMaterial;
    /**
     * Set a storage buffer in the shader
     * @param name Define the name of the storage buffer as defined in the shader
     * @param buffer Define the value to give to the uniform
     * @returns the material itself allowing "fluent" like uniform updates
     */
    setStorageBuffer(name: string, buffer: StorageBuffer): ShaderMaterial;
    /**
     * Adds, removes, or replaces the specified shader define and value.
     * * setDefine("MY_DEFINE", true); // enables a boolean define
     * * setDefine("MY_DEFINE", "0.5"); // adds "#define MY_DEFINE 0.5" to the shader (or sets and replaces the value of any existing define with that name)
     * * setDefine("MY_DEFINE", false); // disables and removes the define
     * Note if the active defines do change, the shader will be recompiled and this can be expensive.
     * @param define the define name e.g., "OUTPUT_TO_SRGB" or "#define OUTPUT_TO_SRGB". If the define was passed into the constructor already, the version used should match that, and in either case, it should not include any appended value.
     * @param value either the value of the define (e.g. a numerical value) or for booleans, true if the define should be enabled or false if it should be disabled
     * @returns the material itself allowing "fluent" like uniform updates
     */
    setDefine(define: string, value: boolean | string): ShaderMaterial;
    /**
     * Specifies that the submesh is ready to be used
     * @param mesh defines the mesh to check
     * @param subMesh defines which submesh to check
     * @param useInstances specifies that instances should be used
     * @returns a boolean indicating that the submesh is ready or not
     */
    isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;
    /**
     * Checks if the material is ready to render the requested mesh
     * @param mesh Define the mesh to render
     * @param useInstances Define whether or not the material is used with instances
     * @param subMesh defines which submesh to render
     * @returns true if ready, otherwise false
     */
    isReady(mesh?: AbstractMesh, useInstances?: boolean, subMesh?: SubMesh): boolean;
    /**
     * Binds the world matrix to the material
     * @param world defines the world transformation matrix
     * @param effectOverride - If provided, use this effect instead of internal effect
     */
    bindOnlyWorldMatrix(world: Matrix, effectOverride?: Nullable<Effect>): void;
    /**
     * Binds the submesh to this material by preparing the effect and shader to draw
     * @param world defines the world transformation matrix
     * @param mesh defines the mesh containing the submesh
     * @param subMesh defines the submesh to bind the material to
     */
    bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;
    /**
     * Binds the material to the mesh
     * @param world defines the world transformation matrix
     * @param mesh defines the mesh to bind the material to
     * @param effectOverride - If provided, use this effect instead of internal effect
     * @param subMesh defines the submesh to bind the material to
     */
    bind(world: Matrix, mesh?: Mesh, effectOverride?: Nullable<Effect>, subMesh?: SubMesh): void;
    /**
     * Gets the active textures from the material
     * @returns an array of textures
     */
    getActiveTextures(): BaseTexture[];
    /**
     * Specifies if the material uses a texture
     * @param texture defines the texture to check against the material
     * @returns a boolean specifying if the material uses the texture
     */
    hasTexture(texture: BaseTexture): boolean;
    /**
     * Makes a duplicate of the material, and gives it a new name
     * @param name defines the new name for the duplicated material
     * @returns the cloned material
     */
    clone(name: string): ShaderMaterial;
    /**
     * Disposes the material
     * @param forceDisposeEffect specifies if effects should be forcefully disposed
     * @param forceDisposeTextures specifies if textures should be forcefully disposed
     * @param notBoundToMesh specifies if the material that is being disposed is known to be not bound to any mesh
     */
    dispose(forceDisposeEffect?: boolean, forceDisposeTextures?: boolean, notBoundToMesh?: boolean): void;
    /**
     * Serializes this material in a JSON representation
     * @returns the serialized material object
     */
    serialize(): any;
    /**
     * Creates a shader material from parsed shader material data
     * @param source defines the JSON representation of the material
     * @param scene defines the hosting scene
     * @param rootUrl defines the root URL to use to load textures and relative dependencies
     * @returns a new material
     */
    static Parse(source: any, scene: Scene, rootUrl: string): ShaderMaterial;
    /**
     * Creates a new ShaderMaterial from a snippet saved in a remote file
     * @param name defines the name of the ShaderMaterial to create (can be null or empty to use the one from the json data)
     * @param url defines the url to load from
     * @param scene defines the hosting scene
     * @param rootUrl defines the root URL to use to load textures and relative dependencies
     * @returns a promise that will resolve to the new ShaderMaterial
     */
    static ParseFromFileAsync(name: Nullable<string>, url: string, scene: Scene, rootUrl?: string): Promise<ShaderMaterial>;
    /**
     * Creates a ShaderMaterial from a snippet saved by the Inspector
     * @param snippetId defines the snippet to load
     * @param scene defines the hosting scene
     * @param rootUrl defines the root URL to use to load textures and relative dependencies
     * @returns a promise that will resolve to the new ShaderMaterial
     */
    static ParseFromSnippetAsync(snippetId: string, scene: Scene, rootUrl?: string): Promise<ShaderMaterial>;
    /**
     * Creates a ShaderMaterial from a snippet saved by the Inspector
     * @deprecated Please use ParseFromSnippetAsync instead
     * @param snippetId defines the snippet to load
     * @param scene defines the hosting scene
     * @param rootUrl defines the root URL to use to load textures and relative dependencies
     * @returns a promise that will resolve to the new ShaderMaterial
     */
    static CreateFromSnippetAsync: typeof ShaderMaterial.ParseFromSnippetAsync;
}
