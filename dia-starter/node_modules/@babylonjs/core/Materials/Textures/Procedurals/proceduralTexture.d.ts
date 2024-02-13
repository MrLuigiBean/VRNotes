import { Observable } from "../../../Misc/observable";
import type { Nullable } from "../../../types";
import type { Scene } from "../../../scene";
import type { Matrix, Vector3, Vector2 } from "../../../Maths/math.vector";
import type { Color4, Color3 } from "../../../Maths/math.color";
import type { Effect } from "../../../Materials/effect";
import { Texture } from "../../../Materials/Textures/texture";
import type { RenderTargetTextureOptions } from "../../../Materials/Textures/renderTargetTexture";
import "../../../Engines/Extensions/engine.renderTarget";
import "../../../Engines/Extensions/engine.renderTargetCube";
import "../../../Shaders/procedural.vertex";
import type { NodeMaterial } from "../../Node/nodeMaterial";
import type { TextureSize } from "../../../Materials/Textures/textureCreationOptions";
/**
 * Options to create a procedural texture
 */
export interface IProceduralTextureCreationOptions extends RenderTargetTextureOptions {
    /**
     * Defines a fallback texture in case there were issues to create the custom texture
     */
    fallbackTexture?: Nullable<Texture>;
}
/**
 * Procedural texturing is a way to programmatically create a texture. There are 2 types of procedural textures: code-only, and code that references some classic 2D images, sometimes calmpler' images.
 * This is the base class of any Procedural texture and contains most of the shareable code.
 * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/using/proceduralTextures
 */
export declare class ProceduralTexture extends Texture {
    /**
     * Define if the texture is enabled or not (disabled texture will not render)
     */
    isEnabled: boolean;
    /**
     * Define if the texture must be cleared before rendering (default is true)
     */
    autoClear: boolean;
    /**
     * Callback called when the texture is generated
     */
    onGenerated: () => void;
    /**
     * Event raised when the texture is generated
     */
    onGeneratedObservable: Observable<ProceduralTexture>;
    /**
     * Event raised before the texture is generated
     */
    onBeforeGenerationObservable: Observable<ProceduralTexture>;
    /**
     * Gets or sets the node material used to create this texture (null if the texture was manually created)
     */
    nodeMaterialSource: Nullable<NodeMaterial>;
    /** @internal */
    _generateMipMaps: boolean;
    private _drawWrapper;
    /** @internal */
    _textures: {
        [key: string]: Texture;
    };
    /** @internal */
    protected _fallbackTexture: Nullable<Texture>;
    private _size;
    private _textureType;
    private _currentRefreshId;
    private _frameId;
    private _refreshRate;
    private _vertexBuffers;
    private _indexBuffer;
    private _uniforms;
    private _samplers;
    private _fragment;
    private _floats;
    private _ints;
    private _floatsArrays;
    private _colors3;
    private _colors4;
    private _vectors2;
    private _vectors3;
    private _matrices;
    private _fallbackTextureUsed;
    private _fullEngine;
    private _cachedDefines;
    private _contentUpdateId;
    private _contentData;
    private _rtWrapper;
    private _options;
    /**
     * Instantiates a new procedural texture.
     * Procedural texturing is a way to programmatically create a texture. There are 2 types of procedural textures: code-only, and code that references some classic 2D images, sometimes called 'refMaps' or 'sampler' images.
     * This is the base class of any Procedural texture and contains most of the shareable code.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/using/proceduralTextures
     * @param name  Define the name of the texture
     * @param size Define the size of the texture to create
     * @param fragment Define the fragment shader to use to generate the texture or null if it is defined later:
     *  * object: \{ fragmentElement: "fragmentShaderCode" \}, used with shader code in script tags
     *  * object: \{ fragmentSource: "fragment shader code string" \}, the string contains the shader code
     *  * string: the string contains a name "XXX" to lookup in Effect.ShadersStore["XXXFragmentShader"]
     * @param scene Define the scene the texture belongs to
     * @param fallbackTexture Define a fallback texture in case there were issues to create the custom texture
     * @param generateMipMaps Define if the texture should creates mip maps or not
     * @param isCube Define if the texture is a cube texture or not (this will render each faces of the cube)
     * @param textureType The FBO internal texture type
     */
    constructor(name: string, size: TextureSize, fragment: any, scene: Nullable<Scene>, fallbackTexture?: Nullable<Texture> | IProceduralTextureCreationOptions, generateMipMaps?: boolean, isCube?: boolean, textureType?: number);
    private _createRtWrapper;
    /**
     * The effect that is created when initializing the post process.
     * @returns The created effect corresponding the postprocess.
     */
    getEffect(): Effect;
    /**
     * @internal
     */
    _setEffect(effect: Effect): void;
    /**
     * Gets texture content (Use this function wisely as reading from a texture can be slow)
     * @returns an ArrayBufferView promise (Uint8Array or Float32Array)
     */
    getContent(): Nullable<Promise<ArrayBufferView>>;
    private _createIndexBuffer;
    /** @internal */
    _rebuild(): void;
    /**
     * Resets the texture in order to recreate its associated resources.
     * This can be called in case of context loss or if you change the shader code and need to regenerate the texture with the new code
     */
    reset(): void;
    protected _getDefines(): string;
    /**
     * Executes a function when the texture will be ready to be drawn.
     * @param func The callback to be used.
     */
    executeWhenReady(func: (texture: ProceduralTexture) => void): void;
    /**
     * Is the texture ready to be used ? (rendered at least once)
     * @returns true if ready, otherwise, false.
     */
    isReady(): boolean;
    /**
     * Resets the refresh counter of the texture and start bak from scratch.
     * Could be useful to regenerate the texture if it is setup to render only once.
     */
    resetRefreshCounter(): void;
    /**
     * Set the fragment shader to use in order to render the texture.
     * @param fragment This can be set to a path (into the shader store) or to a json object containing a fragmentElement property.
     */
    setFragment(fragment: any): void;
    /**
     * Define the refresh rate of the texture or the rendering frequency.
     * Use 0 to render just once, 1 to render on every frame, 2 to render every two frames and so on...
     */
    get refreshRate(): number;
    set refreshRate(value: number);
    /** @internal */
    _shouldRender(): boolean;
    /**
     * Get the size the texture is rendering at.
     * @returns the size (on cube texture it is always squared)
     */
    getRenderSize(): TextureSize;
    /**
     * Resize the texture to new value.
     * @param size Define the new size the texture should have
     * @param generateMipMaps Define whether the new texture should create mip maps
     */
    resize(size: TextureSize, generateMipMaps: boolean): void;
    private _checkUniform;
    /**
     * Set a texture in the shader program used to render.
     * @param name Define the name of the uniform samplers as defined in the shader
     * @param texture Define the texture to bind to this sampler
     * @returns the texture itself allowing "fluent" like uniform updates
     */
    setTexture(name: string, texture: Texture): ProceduralTexture;
    /**
     * Set a float in the shader.
     * @param name Define the name of the uniform as defined in the shader
     * @param value Define the value to give to the uniform
     * @returns the texture itself allowing "fluent" like uniform updates
     */
    setFloat(name: string, value: number): ProceduralTexture;
    /**
     * Set a int in the shader.
     * @param name Define the name of the uniform as defined in the shader
     * @param value Define the value to give to the uniform
     * @returns the texture itself allowing "fluent" like uniform updates
     */
    setInt(name: string, value: number): ProceduralTexture;
    /**
     * Set an array of floats in the shader.
     * @param name Define the name of the uniform as defined in the shader
     * @param value Define the value to give to the uniform
     * @returns the texture itself allowing "fluent" like uniform updates
     */
    setFloats(name: string, value: number[]): ProceduralTexture;
    /**
     * Set a vec3 in the shader from a Color3.
     * @param name Define the name of the uniform as defined in the shader
     * @param value Define the value to give to the uniform
     * @returns the texture itself allowing "fluent" like uniform updates
     */
    setColor3(name: string, value: Color3): ProceduralTexture;
    /**
     * Set a vec4 in the shader from a Color4.
     * @param name Define the name of the uniform as defined in the shader
     * @param value Define the value to give to the uniform
     * @returns the texture itself allowing "fluent" like uniform updates
     */
    setColor4(name: string, value: Color4): ProceduralTexture;
    /**
     * Set a vec2 in the shader from a Vector2.
     * @param name Define the name of the uniform as defined in the shader
     * @param value Define the value to give to the uniform
     * @returns the texture itself allowing "fluent" like uniform updates
     */
    setVector2(name: string, value: Vector2): ProceduralTexture;
    /**
     * Set a vec3 in the shader from a Vector3.
     * @param name Define the name of the uniform as defined in the shader
     * @param value Define the value to give to the uniform
     * @returns the texture itself allowing "fluent" like uniform updates
     */
    setVector3(name: string, value: Vector3): ProceduralTexture;
    /**
     * Set a mat4 in the shader from a MAtrix.
     * @param name Define the name of the uniform as defined in the shader
     * @param value Define the value to give to the uniform
     * @returns the texture itself allowing "fluent" like uniform updates
     */
    setMatrix(name: string, value: Matrix): ProceduralTexture;
    /**
     * Render the texture to its associated render target.
     * @param useCameraPostProcess Define if camera post process should be applied to the texture
     */
    render(useCameraPostProcess?: boolean): void;
    /**
     * Clone the texture.
     * @returns the cloned texture
     */
    clone(): ProceduralTexture;
    /**
     * Dispose the texture and release its associated resources.
     */
    dispose(): void;
}
