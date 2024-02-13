import type { Nullable, DeepImmutableObject } from "../types";
import { VertexBuffer, Buffer } from "../Buffers/buffer";
import { Matrix } from "../Maths/math.vector";
declare module "./mesh" {
    interface Mesh {
        /**
         * Gets or sets a boolean defining if we want picking to pick thin instances as well
         */
        thinInstanceEnablePicking: boolean;
        /**
         * Creates a new thin instance
         * @param matrix the matrix or array of matrices (position, rotation, scale) of the thin instance(s) to create
         * @param refresh true to refresh the underlying gpu buffer (default: true). If you do multiple calls to this method in a row, set refresh to true only for the last call to save performance
         * @returns the thin instance index number. If you pass an array of matrices, other instance indexes are index+1, index+2, etc
         */
        thinInstanceAdd(matrix: DeepImmutableObject<Matrix> | Array<DeepImmutableObject<Matrix>>, refresh?: boolean): number;
        /**
         * Adds the transformation (matrix) of the current mesh as a thin instance
         * @param refresh true to refresh the underlying gpu buffer (default: true). If you do multiple calls to this method in a row, set refresh to true only for the last call to save performance
         * @returns the thin instance index number
         */
        thinInstanceAddSelf(refresh?: boolean): number;
        /**
         * Registers a custom attribute to be used with thin instances
         * @param kind name of the attribute
         * @param stride size in floats of the attribute
         */
        thinInstanceRegisterAttribute(kind: string, stride: number): void;
        /**
         * Sets the matrix of a thin instance
         * @param index index of the thin instance
         * @param matrix matrix to set
         * @param refresh true to refresh the underlying gpu buffer (default: true). If you do multiple calls to this method in a row, set refresh to true only for the last call to save performance
         */
        thinInstanceSetMatrixAt(index: number, matrix: DeepImmutableObject<Matrix>, refresh?: boolean): void;
        /**
         * Sets the value of a custom attribute for a thin instance
         * @param kind name of the attribute
         * @param index index of the thin instance
         * @param value value to set
         * @param refresh true to refresh the underlying gpu buffer (default: true). If you do multiple calls to this method in a row, set refresh to true only for the last call to save performance
         */
        thinInstanceSetAttributeAt(kind: string, index: number, value: Array<number>, refresh?: boolean): void;
        /**
         * Gets / sets the number of thin instances to display. Note that you can't set a number higher than what the underlying buffer can handle.
         */
        thinInstanceCount: number;
        /**
         * Sets a buffer to be used with thin instances. This method is a faster way to setup multiple instances than calling thinInstanceAdd repeatedly
         * @param kind name of the attribute. Use "matrix" to setup the buffer of matrices
         * @param buffer buffer to set
         * @param stride size in floats of each value of the buffer
         * @param staticBuffer indicates that the buffer is static, so that you won't change it after it is set (better performances - false by default)
         */
        thinInstanceSetBuffer(kind: string, buffer: Nullable<Float32Array>, stride?: number, staticBuffer?: boolean): void;
        /**
         * Gets the list of world matrices
         * @returns an array containing all the world matrices from the thin instances
         */
        thinInstanceGetWorldMatrices(): Matrix[];
        /**
         * Synchronize the gpu buffers with a thin instance buffer. Call this method if you update later on the buffers passed to thinInstanceSetBuffer
         * @param kind name of the attribute to update. Use "matrix" to update the buffer of matrices
         */
        thinInstanceBufferUpdated(kind: string): void;
        /**
         * Applies a partial update to a buffer directly on the GPU
         * Note that the buffer located on the CPU is NOT updated! It's up to you to update it (or not) with the same data you pass to this method
         * @param kind name of the attribute to update. Use "matrix" to update the buffer of matrices
         * @param data the data to set in the GPU buffer
         * @param offset the offset in the GPU buffer where to update the data
         */
        thinInstancePartialBufferUpdate(kind: string, data: Float32Array, offset: number): void;
        /**
         * Refreshes the bounding info, taking into account all the thin instances defined
         * @param forceRefreshParentInfo true to force recomputing the mesh bounding info and use it to compute the aggregated bounding info
         * @param applySkeleton defines whether to apply the skeleton before computing the bounding info
         * @param applyMorph  defines whether to apply the morph target before computing the bounding info
         */
        thinInstanceRefreshBoundingInfo(forceRefreshParentInfo?: boolean, applySkeleton?: boolean, applyMorph?: boolean): void;
        /** @internal */
        _thinInstanceInitializeUserStorage(): void;
        /** @internal */
        _thinInstanceUpdateBufferSize(kind: string, numInstances?: number): void;
        /** @internal */
        _thinInstanceCreateMatrixBuffer(kind: string, buffer: Nullable<Float32Array>, staticBuffer: boolean): Buffer;
        /** @internal */
        _userThinInstanceBuffersStorage: {
            data: {
                [key: string]: Float32Array;
            };
            sizes: {
                [key: string]: number;
            };
            vertexBuffers: {
                [key: string]: Nullable<VertexBuffer>;
            };
            strides: {
                [key: string]: number;
            };
        };
    }
}
