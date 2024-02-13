import type { Nullable, FloatArray } from "../types";
import type { IMatrixLike, IVector3Like, IVector4Like, IColor3Like, IColor4Like } from "../Maths/math.like";
import type { Effect } from "./effect";
import type { ThinTexture } from "../Materials/Textures/thinTexture";
import type { DataBuffer } from "../Buffers/dataBuffer";
import type { ThinEngine } from "../Engines/thinEngine";
import type { InternalTexture } from "./Textures/internalTexture";
import "../Engines/Extensions/engine.uniformBuffer";
/**
 * Uniform buffer objects.
 *
 * Handles blocks of uniform on the GPU.
 *
 * If WebGL 2 is not available, this class falls back on traditional setUniformXXX calls.
 *
 * For more information, please refer to :
 * https://www.khronos.org/opengl/wiki/Uniform_Buffer_Object
 */
export declare class UniformBuffer {
    /** @internal */
    static _UpdatedUbosInFrame: {
        [name: string]: number;
    };
    private _engine;
    private _buffer;
    private _buffers;
    private _bufferIndex;
    private _createBufferOnWrite;
    private _data;
    private _bufferData;
    private _dynamic?;
    private _uniformLocations;
    private _uniformSizes;
    private _uniformArraySizes;
    private _uniformLocationPointer;
    private _needSync;
    private _noUBO;
    private _currentEffect;
    private _currentEffectName;
    private _name;
    private _currentFrameId;
    private static _MAX_UNIFORM_SIZE;
    private static _TempBuffer;
    private static _TempBufferInt32View;
    private static _TempBufferUInt32View;
    /**
     * Lambda to Update a 3x3 Matrix in a uniform buffer.
     * This is dynamic to allow compat with webgl 1 and 2.
     * You will need to pass the name of the uniform as well as the value.
     */
    updateMatrix3x3: (name: string, matrix: Float32Array) => void;
    /**
     * Lambda to Update a 2x2 Matrix in a uniform buffer.
     * This is dynamic to allow compat with webgl 1 and 2.
     * You will need to pass the name of the uniform as well as the value.
     */
    updateMatrix2x2: (name: string, matrix: Float32Array) => void;
    /**
     * Lambda to Update a single float in a uniform buffer.
     * This is dynamic to allow compat with webgl 1 and 2.
     * You will need to pass the name of the uniform as well as the value.
     */
    updateFloat: (name: string, x: number) => void;
    /**
     * Lambda to Update a vec2 of float in a uniform buffer.
     * This is dynamic to allow compat with webgl 1 and 2.
     * You will need to pass the name of the uniform as well as the value.
     */
    updateFloat2: (name: string, x: number, y: number, suffix?: string) => void;
    /**
     * Lambda to Update a vec3 of float in a uniform buffer.
     * This is dynamic to allow compat with webgl 1 and 2.
     * You will need to pass the name of the uniform as well as the value.
     */
    updateFloat3: (name: string, x: number, y: number, z: number, suffix?: string) => void;
    /**
     * Lambda to Update a vec4 of float in a uniform buffer.
     * This is dynamic to allow compat with webgl 1 and 2.
     * You will need to pass the name of the uniform as well as the value.
     */
    updateFloat4: (name: string, x: number, y: number, z: number, w: number, suffix?: string) => void;
    /**
     * Lambda to Update an array of float in a uniform buffer.
     * This is dynamic to allow compat with webgl 1 and 2.
     * You will need to pass the name of the uniform as well as the value.
     */
    updateFloatArray: (name: string, array: Float32Array) => void;
    /**
     * Lambda to Update an array of number in a uniform buffer.
     * This is dynamic to allow compat with webgl 1 and 2.
     * You will need to pass the name of the uniform as well as the value.
     */
    updateArray: (name: string, array: number[]) => void;
    /**
     * Lambda to Update an array of number in a uniform buffer.
     * This is dynamic to allow compat with webgl 1 and 2.
     * You will need to pass the name of the uniform as well as the value.
     */
    updateIntArray: (name: string, array: Int32Array) => void;
    /**
     * Lambda to Update an array of number in a uniform buffer.
     * This is dynamic to allow compat with webgl 1 and 2.
     * You will need to pass the name of the uniform as well as the value.
     */
    updateUIntArray: (name: string, array: Uint32Array) => void;
    /**
     * Lambda to Update a 4x4 Matrix in a uniform buffer.
     * This is dynamic to allow compat with webgl 1 and 2.
     * You will need to pass the name of the uniform as well as the value.
     */
    updateMatrix: (name: string, mat: IMatrixLike) => void;
    /**
     * Lambda to Update an array of 4x4 Matrix in a uniform buffer.
     * This is dynamic to allow compat with webgl 1 and 2.
     * You will need to pass the name of the uniform as well as the value.
     */
    updateMatrices: (name: string, mat: Float32Array) => void;
    /**
     * Lambda to Update vec3 of float from a Vector in a uniform buffer.
     * This is dynamic to allow compat with webgl 1 and 2.
     * You will need to pass the name of the uniform as well as the value.
     */
    updateVector3: (name: string, vector: IVector3Like) => void;
    /**
     * Lambda to Update vec4 of float from a Vector in a uniform buffer.
     * This is dynamic to allow compat with webgl 1 and 2.
     * You will need to pass the name of the uniform as well as the value.
     */
    updateVector4: (name: string, vector: IVector4Like) => void;
    /**
     * Lambda to Update vec3 of float from a Color in a uniform buffer.
     * This is dynamic to allow compat with webgl 1 and 2.
     * You will need to pass the name of the uniform as well as the value.
     */
    updateColor3: (name: string, color: IColor3Like, suffix?: string) => void;
    /**
     * Lambda to Update vec4 of float from a Color in a uniform buffer.
     * This is dynamic to allow compat with webgl 1 and 2.
     * You will need to pass the name of the uniform as well as the value.
     */
    updateColor4: (name: string, color: IColor3Like, alpha: number, suffix?: string) => void;
    /**
     * Lambda to Update vec4 of float from a Color in a uniform buffer.
     * This is dynamic to allow compat with webgl 1 and 2.
     * You will need to pass the name of the uniform as well as the value.
     */
    updateDirectColor4: (name: string, color: IColor4Like, suffix?: string) => void;
    /**
     * Lambda to Update a int a uniform buffer.
     * This is dynamic to allow compat with webgl 1 and 2.
     * You will need to pass the name of the uniform as well as the value.
     */
    updateInt: (name: string, x: number, suffix?: string) => void;
    /**
     * Lambda to Update a vec2 of int in a uniform buffer.
     * This is dynamic to allow compat with webgl 1 and 2.
     * You will need to pass the name of the uniform as well as the value.
     */
    updateInt2: (name: string, x: number, y: number, suffix?: string) => void;
    /**
     * Lambda to Update a vec3 of int in a uniform buffer.
     * This is dynamic to allow compat with webgl 1 and 2.
     * You will need to pass the name of the uniform as well as the value.
     */
    updateInt3: (name: string, x: number, y: number, z: number, suffix?: string) => void;
    /**
     * Lambda to Update a vec4 of int in a uniform buffer.
     * This is dynamic to allow compat with webgl 1 and 2.
     * You will need to pass the name of the uniform as well as the value.
     */
    updateInt4: (name: string, x: number, y: number, z: number, w: number, suffix?: string) => void;
    /**
     * Lambda to Update a unsigned int a uniform buffer.
     * This is dynamic to allow compat with webgl 1 and 2.
     * You will need to pass the name of the uniform as well as the value.
     */
    updateUInt: (name: string, x: number, suffix?: string) => void;
    /**
     * Lambda to Update a vec2 of unsigned int in a uniform buffer.
     * This is dynamic to allow compat with webgl 1 and 2.
     * You will need to pass the name of the uniform as well as the value.
     */
    updateUInt2: (name: string, x: number, y: number, suffix?: string) => void;
    /**
     * Lambda to Update a vec3 of unsigned int in a uniform buffer.
     * This is dynamic to allow compat with webgl 1 and 2.
     * You will need to pass the name of the uniform as well as the value.
     */
    updateUInt3: (name: string, x: number, y: number, z: number, suffix?: string) => void;
    /**
     * Lambda to Update a vec4 of unsigned int in a uniform buffer.
     * This is dynamic to allow compat with webgl 1 and 2.
     * You will need to pass the name of the uniform as well as the value.
     */
    updateUInt4: (name: string, x: number, y: number, z: number, w: number, suffix?: string) => void;
    /**
     * Instantiates a new Uniform buffer objects.
     *
     * Handles blocks of uniform on the GPU.
     *
     * If WebGL 2 is not available, this class falls back on traditional setUniformXXX calls.
     *
     * For more information, please refer to :
     * @see https://www.khronos.org/opengl/wiki/Uniform_Buffer_Object
     * @param engine Define the engine the buffer is associated with
     * @param data Define the data contained in the buffer
     * @param dynamic Define if the buffer is updatable
     * @param name to assign to the buffer (debugging purpose)
     * @param forceNoUniformBuffer define that this object must not rely on UBO objects
     */
    constructor(engine: ThinEngine, data?: number[], dynamic?: boolean, name?: string, forceNoUniformBuffer?: boolean);
    /**
     * Indicates if the buffer is using the WebGL2 UBO implementation,
     * or just falling back on setUniformXXX calls.
     */
    get useUbo(): boolean;
    /**
     * Indicates if the WebGL underlying uniform buffer is in sync
     * with the javascript cache data.
     */
    get isSync(): boolean;
    /**
     * Indicates if the WebGL underlying uniform buffer is dynamic.
     * Also, a dynamic UniformBuffer will disable cache verification and always
     * update the underlying WebGL uniform buffer to the GPU.
     * @returns if Dynamic, otherwise false
     */
    isDynamic(): boolean;
    /**
     * The data cache on JS side.
     * @returns the underlying data as a float array
     */
    getData(): Float32Array;
    /**
     * The underlying WebGL Uniform buffer.
     * @returns the webgl buffer
     */
    getBuffer(): Nullable<DataBuffer>;
    /**
     * std140 layout specifies how to align data within an UBO structure.
     * See https://khronos.org/registry/OpenGL/specs/gl/glspec45.core.pdf#page=159
     * for specs.
     * @param size
     */
    private _fillAlignment;
    /**
     * Adds an uniform in the buffer.
     * Warning : the subsequents calls of this function must be in the same order as declared in the shader
     * for the layout to be correct ! The addUniform function only handles types like float, vec2, vec3, vec4, mat4,
     * meaning size=1,2,3,4 or 16. It does not handle struct types.
     * @param name Name of the uniform, as used in the uniform block in the shader.
     * @param size Data size, or data directly.
     * @param arraySize The number of elements in the array, 0 if not an array.
     */
    addUniform(name: string, size: number | number[], arraySize?: number): void;
    /**
     * Adds a Matrix 4x4 to the uniform buffer.
     * @param name Name of the uniform, as used in the uniform block in the shader.
     * @param mat A 4x4 matrix.
     */
    addMatrix(name: string, mat: IMatrixLike): void;
    /**
     * Adds a vec2 to the uniform buffer.
     * @param name Name of the uniform, as used in the uniform block in the shader.
     * @param x Define the x component value of the vec2
     * @param y Define the y component value of the vec2
     */
    addFloat2(name: string, x: number, y: number): void;
    /**
     * Adds a vec3 to the uniform buffer.
     * @param name Name of the uniform, as used in the uniform block in the shader.
     * @param x Define the x component value of the vec3
     * @param y Define the y component value of the vec3
     * @param z Define the z component value of the vec3
     */
    addFloat3(name: string, x: number, y: number, z: number): void;
    /**
     * Adds a vec3 to the uniform buffer.
     * @param name Name of the uniform, as used in the uniform block in the shader.
     * @param color Define the vec3 from a Color
     */
    addColor3(name: string, color: IColor3Like): void;
    /**
     * Adds a vec4 to the uniform buffer.
     * @param name Name of the uniform, as used in the uniform block in the shader.
     * @param color Define the rgb components from a Color
     * @param alpha Define the a component of the vec4
     */
    addColor4(name: string, color: IColor3Like, alpha: number): void;
    /**
     * Adds a vec3 to the uniform buffer.
     * @param name Name of the uniform, as used in the uniform block in the shader.
     * @param vector Define the vec3 components from a Vector
     */
    addVector3(name: string, vector: IVector3Like): void;
    /**
     * Adds a Matrix 3x3 to the uniform buffer.
     * @param name Name of the uniform, as used in the uniform block in the shader.
     */
    addMatrix3x3(name: string): void;
    /**
     * Adds a Matrix 2x2 to the uniform buffer.
     * @param name Name of the uniform, as used in the uniform block in the shader.
     */
    addMatrix2x2(name: string): void;
    /**
     * Effectively creates the WebGL Uniform Buffer, once layout is completed with `addUniform`.
     */
    create(): void;
    private _getNames;
    /** @internal */
    _rebuild(): void;
    /** @internal */
    _rebuildAfterContextLost(): void;
    /** @internal */
    get _numBuffers(): number;
    /** @internal */
    get _indexBuffer(): number;
    /** Gets the name of this buffer */
    get name(): string;
    /** Gets the current effect */
    get currentEffect(): Nullable<Effect>;
    private _buffersEqual;
    private _copyBuffer;
    /**
     * Updates the WebGL Uniform Buffer on the GPU.
     * If the `dynamic` flag is set to true, no cache comparison is done.
     * Otherwise, the buffer will be updated only if the cache differs.
     */
    update(): void;
    private _createNewBuffer;
    private _checkNewFrame;
    /**
     * Updates the value of an uniform. The `update` method must be called afterwards to make it effective in the GPU.
     * @param uniformName Define the name of the uniform, as used in the uniform block in the shader.
     * @param data Define the flattened data
     * @param size Define the size of the data.
     */
    updateUniform(uniformName: string, data: FloatArray, size: number): void;
    /**
     * Updates the value of an uniform. The `update` method must be called afterwards to make it effective in the GPU.
     * @param uniformName Define the name of the uniform, as used in the uniform block in the shader.
     * @param data Define the flattened data
     * @param size Define the size of the data.
     */
    updateUniformArray(uniformName: string, data: FloatArray, size: number): void;
    private _valueCache;
    private _cacheMatrix;
    private _updateMatrix3x3ForUniform;
    private _updateMatrix3x3ForEffect;
    private _updateMatrix2x2ForEffect;
    private _updateMatrix2x2ForUniform;
    private _updateFloatForEffect;
    private _updateFloatForUniform;
    private _updateFloat2ForEffect;
    private _updateFloat2ForUniform;
    private _updateFloat3ForEffect;
    private _updateFloat3ForUniform;
    private _updateFloat4ForEffect;
    private _updateFloat4ForUniform;
    private _updateFloatArrayForEffect;
    private _updateFloatArrayForUniform;
    private _updateArrayForEffect;
    private _updateArrayForUniform;
    private _updateIntArrayForEffect;
    private _updateIntArrayForUniform;
    private _updateUIntArrayForEffect;
    private _updateUIntArrayForUniform;
    private _updateMatrixForEffect;
    private _updateMatrixForUniform;
    private _updateMatricesForEffect;
    private _updateMatricesForUniform;
    private _updateVector3ForEffect;
    private _updateVector3ForUniform;
    private _updateVector4ForEffect;
    private _updateVector4ForUniform;
    private _updateColor3ForEffect;
    private _updateColor3ForUniform;
    private _updateColor4ForEffect;
    private _updateDirectColor4ForEffect;
    private _updateColor4ForUniform;
    private _updateDirectColor4ForUniform;
    private _updateIntForEffect;
    private _updateIntForUniform;
    private _updateInt2ForEffect;
    private _updateInt2ForUniform;
    private _updateInt3ForEffect;
    private _updateInt3ForUniform;
    private _updateInt4ForEffect;
    private _updateInt4ForUniform;
    private _updateUIntForEffect;
    private _updateUIntForUniform;
    private _updateUInt2ForEffect;
    private _updateUInt2ForUniform;
    private _updateUInt3ForEffect;
    private _updateUInt3ForUniform;
    private _updateUInt4ForEffect;
    private _updateUInt4ForUniform;
    /**
     * Sets a sampler uniform on the effect.
     * @param name Define the name of the sampler.
     * @param texture Define the texture to set in the sampler
     */
    setTexture(name: string, texture: Nullable<ThinTexture>): void;
    /**
     * Sets a sampler uniform on the effect.
     * @param name Define the name of the sampler.
     * @param texture Define the (internal) texture to set in the sampler
     */
    bindTexture(name: string, texture: Nullable<InternalTexture>): void;
    /**
     * Directly updates the value of the uniform in the cache AND on the GPU.
     * @param uniformName Define the name of the uniform, as used in the uniform block in the shader.
     * @param data Define the flattened data
     */
    updateUniformDirectly(uniformName: string, data: FloatArray): void;
    /**
     * Associates an effect to this uniform buffer
     * @param effect Define the effect to associate the buffer to
     * @param name Name of the uniform block in the shader.
     */
    bindToEffect(effect: Effect, name: string): void;
    /**
     * Binds the current (GPU) buffer to the effect
     */
    bindUniformBuffer(): void;
    /**
     * Dissociates the current effect from this uniform buffer
     */
    unbindEffect(): void;
    /**
     * Sets the current state of the class (_bufferIndex, _buffer) to point to the data buffer passed in parameter if this buffer is one of the buffers handled by the class (meaning if it can be found in the _buffers array)
     * This method is meant to be able to update a buffer at any time: just call setDataBuffer to set the class in the right state, call some updateXXX methods and then call udpate() => that will update the GPU buffer on the graphic card
     * @param dataBuffer buffer to look for
     * @returns true if the buffer has been found and the class internal state points to it, else false
     */
    setDataBuffer(dataBuffer: DataBuffer): boolean;
    /**
     * Disposes the uniform buffer.
     */
    dispose(): void;
}
