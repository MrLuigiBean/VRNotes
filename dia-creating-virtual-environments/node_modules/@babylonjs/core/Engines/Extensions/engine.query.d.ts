import type { Nullable, int } from "../../types";
import { _TimeToken } from "../../Instrumentation/timeToken";
import { PerfCounter } from "../../Misc/perfCounter";
import type { Observer } from "../../Misc/observable";
/** @internal */
export type OcclusionQuery = WebGLQuery | number;
/** @internal */
export declare class _OcclusionDataStorage {
    /** @internal */
    occlusionInternalRetryCounter: number;
    /** @internal */
    isOcclusionQueryInProgress: boolean;
    /** @internal */
    isOccluded: boolean;
    /** @internal */
    occlusionRetryCount: number;
    /** @internal */
    occlusionType: number;
    /** @internal */
    occlusionQueryAlgorithmType: number;
    /** @internal */
    forceRenderingWhenOccluded: boolean;
}
declare module "../../Engines/engine" {
    interface Engine {
        /**
         * Create a new webGL query (you must be sure that queries are supported by checking getCaps() function)
         * @returns the new query
         */
        createQuery(): OcclusionQuery;
        /**
         * Delete and release a webGL query
         * @param query defines the query to delete
         * @returns the current engine
         */
        deleteQuery(query: OcclusionQuery): Engine;
        /**
         * Check if a given query has resolved and got its value
         * @param query defines the query to check
         * @returns true if the query got its value
         */
        isQueryResultAvailable(query: OcclusionQuery): boolean;
        /**
         * Gets the value of a given query
         * @param query defines the query to check
         * @returns the value of the query
         */
        getQueryResult(query: OcclusionQuery): number;
        /**
         * Initiates an occlusion query
         * @param algorithmType defines the algorithm to use
         * @param query defines the query to use
         * @returns the current engine
         * @see https://doc.babylonjs.com/features/featuresDeepDive/occlusionQueries
         */
        beginOcclusionQuery(algorithmType: number, query: OcclusionQuery): boolean;
        /**
         * Ends an occlusion query
         * @see https://doc.babylonjs.com/features/featuresDeepDive/occlusionQueries
         * @param algorithmType defines the algorithm to use
         * @returns the current engine
         */
        endOcclusionQuery(algorithmType: number): Engine;
        /**
         * Starts a time query (used to measure time spent by the GPU on a specific frame)
         * Please note that only one query can be issued at a time
         * @returns a time token used to track the time span
         */
        startTimeQuery(): Nullable<_TimeToken>;
        /**
         * Ends a time query
         * @param token defines the token used to measure the time span
         * @returns the time spent (in ns)
         */
        endTimeQuery(token: _TimeToken): int;
        /**
         * Get the performance counter associated with the frame time computation
         * @returns the perf counter
         */
        getGPUFrameTimeCounter(): PerfCounter;
        /**
         * Enable or disable the GPU frame time capture
         * @param value True to enable, false to disable
         */
        captureGPUFrameTime(value: boolean): void;
        /** @internal */
        _currentNonTimestampToken: Nullable<_TimeToken>;
        /** @internal */
        _captureGPUFrameTime: boolean;
        /** @internal */
        _gpuFrameTimeToken: Nullable<_TimeToken>;
        /** @internal */
        _gpuFrameTime: PerfCounter;
        /** @internal */
        _onBeginFrameObserver: Nullable<Observer<Engine>>;
        /** @internal */
        _onEndFrameObserver: Nullable<Observer<Engine>>;
        /** @internal */
        _createTimeQuery(): WebGLQuery;
        /** @internal */
        _deleteTimeQuery(query: WebGLQuery): void;
        /** @internal */
        _getGlAlgorithmType(algorithmType: number): number;
        /** @internal */
        _getTimeQueryResult(query: WebGLQuery): any;
        /** @internal */
        _getTimeQueryAvailability(query: WebGLQuery): any;
    }
}
declare module "../../Meshes/abstractMesh" {
    interface AbstractMesh {
        /**
         * Backing filed
         * @internal
         */
        __occlusionDataStorage: _OcclusionDataStorage;
        /**
         * Access property
         * @internal
         */
        _occlusionDataStorage: _OcclusionDataStorage;
        /**
         * This number indicates the number of allowed retries before stop the occlusion query, this is useful if the occlusion query is taking long time before to the query result is retrieved, the query result indicates if the object is visible within the scene or not and based on that Babylon.Js engine decides to show or hide the object.
         * The default value is -1 which means don't break the query and wait till the result
         * @see https://doc.babylonjs.com/features/featuresDeepDive/occlusionQueries
         */
        occlusionRetryCount: number;
        /**
         * This property is responsible for starting the occlusion query within the Mesh or not, this property is also used to determine what should happen when the occlusionRetryCount is reached. It has supports 3 values:
         * * OCCLUSION_TYPE_NONE (Default Value): this option means no occlusion query within the Mesh.
         * * OCCLUSION_TYPE_OPTIMISTIC: this option is means use occlusion query and if occlusionRetryCount is reached and the query is broken show the mesh.
         * * OCCLUSION_TYPE_STRICT: this option is means use occlusion query and if occlusionRetryCount is reached and the query is broken restore the last state of the mesh occlusion if the mesh was visible then show the mesh if was hidden then hide don't show.
         * @see https://doc.babylonjs.com/features/featuresDeepDive/occlusionQueries
         */
        occlusionType: number;
        /**
         * This property determines the type of occlusion query algorithm to run in WebGl, you can use:
         * * AbstractMesh.OCCLUSION_ALGORITHM_TYPE_ACCURATE which is mapped to GL_ANY_SAMPLES_PASSED.
         * * AbstractMesh.OCCLUSION_ALGORITHM_TYPE_CONSERVATIVE (Default Value) which is mapped to GL_ANY_SAMPLES_PASSED_CONSERVATIVE which is a false positive algorithm that is faster than GL_ANY_SAMPLES_PASSED but less accurate.
         * @see https://doc.babylonjs.com/features/featuresDeepDive/occlusionQueries
         */
        occlusionQueryAlgorithmType: number;
        /**
         * Gets or sets whether the mesh is occluded or not, it is used also to set the initial state of the mesh to be occluded or not
         * @see https://doc.babylonjs.com/features/featuresDeepDive/occlusionQueries
         */
        isOccluded: boolean;
        /**
         * Flag to check the progress status of the query
         * @see https://doc.babylonjs.com/features/featuresDeepDive/occlusionQueries
         */
        isOcclusionQueryInProgress: boolean;
        /**
         * Flag to force rendering the mesh even if occluded
         * @see https://doc.babylonjs.com/features/featuresDeepDive/occlusionQueries
         */
        forceRenderingWhenOccluded: boolean;
    }
}
