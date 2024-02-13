import type { IColor3Like, IColor4Like, IMatrixLike, IVector3Like, IVector4Like } from "../Maths/math.like";
import type { Effect } from "./effect";
import type { UniformBuffer } from "./uniformBuffer";
/** @internal */
export declare class UniformBufferEffectCommonAccessor {
    setMatrix3x3: (name: string, matrix: Float32Array) => void;
    setMatrix2x2: (name: string, matrix: Float32Array) => void;
    setFloat: (name: string, x: number) => void;
    setFloat2: (name: string, x: number, y: number, suffix?: string) => void;
    setFloat3: (name: string, x: number, y: number, z: number, suffix?: string) => void;
    setFloat4: (name: string, x: number, y: number, z: number, w: number, suffix?: string) => void;
    setFloatArray: (name: string, array: Float32Array) => void;
    setArray: (name: string, array: number[]) => void;
    setIntArray: (name: string, array: Int32Array) => void;
    setMatrix: (name: string, mat: IMatrixLike) => void;
    setMatrices: (name: string, mat: Float32Array) => void;
    setVector3: (name: string, vector: IVector3Like) => void;
    setVector4: (name: string, vector: IVector4Like) => void;
    setColor3: (name: string, color: IColor3Like, suffix?: string) => void;
    setColor4: (name: string, color: IColor3Like, alpha: number, suffix?: string) => void;
    setDirectColor4: (name: string, color: IColor4Like) => void;
    setInt: (name: string, x: number, suffix?: string) => void;
    setInt2: (name: string, x: number, y: number, suffix?: string) => void;
    setInt3: (name: string, x: number, y: number, z: number, suffix?: string) => void;
    setInt4: (name: string, x: number, y: number, z: number, w: number, suffix?: string) => void;
    private _isUbo;
    constructor(uboOrEffect: UniformBuffer | Effect);
}
