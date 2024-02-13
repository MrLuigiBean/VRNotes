import { Engine } from "../../Engines/engine.js";
import { AbstractMesh } from "../../Meshes/abstractMesh.js";
import { _TimeToken } from "../../Instrumentation/timeToken.js";
import { PerfCounter } from "../../Misc/perfCounter.js";
/** @internal */
// eslint-disable-next-line @typescript-eslint/naming-convention
export class _OcclusionDataStorage {
    constructor() {
        /** @internal */
        this.occlusionInternalRetryCounter = 0;
        /** @internal */
        this.isOcclusionQueryInProgress = false;
        /** @internal */
        this.isOccluded = false;
        /** @internal */
        this.occlusionRetryCount = -1;
        /** @internal */
        this.occlusionType = AbstractMesh.OCCLUSION_TYPE_NONE;
        /** @internal */
        this.occlusionQueryAlgorithmType = AbstractMesh.OCCLUSION_ALGORITHM_TYPE_CONSERVATIVE;
        /** @internal */
        this.forceRenderingWhenOccluded = false;
    }
}
Engine.prototype.createQuery = function () {
    const query = this._gl.createQuery();
    if (!query) {
        throw new Error("Unable to create Occlusion Query");
    }
    return query;
};
Engine.prototype.deleteQuery = function (query) {
    this._gl.deleteQuery(query);
    return this;
};
Engine.prototype.isQueryResultAvailable = function (query) {
    return this._gl.getQueryParameter(query, this._gl.QUERY_RESULT_AVAILABLE);
};
Engine.prototype.getQueryResult = function (query) {
    return this._gl.getQueryParameter(query, this._gl.QUERY_RESULT);
};
Engine.prototype.beginOcclusionQuery = function (algorithmType, query) {
    const glAlgorithm = this._getGlAlgorithmType(algorithmType);
    this._gl.beginQuery(glAlgorithm, query);
    return true;
};
Engine.prototype.endOcclusionQuery = function (algorithmType) {
    const glAlgorithm = this._getGlAlgorithmType(algorithmType);
    this._gl.endQuery(glAlgorithm);
    return this;
};
Engine.prototype._createTimeQuery = function () {
    const timerQuery = this.getCaps().timerQuery;
    if (timerQuery.createQueryEXT) {
        return timerQuery.createQueryEXT();
    }
    return this.createQuery();
};
Engine.prototype._deleteTimeQuery = function (query) {
    const timerQuery = this.getCaps().timerQuery;
    if (timerQuery.deleteQueryEXT) {
        timerQuery.deleteQueryEXT(query);
        return;
    }
    this.deleteQuery(query);
};
Engine.prototype._getTimeQueryResult = function (query) {
    const timerQuery = this.getCaps().timerQuery;
    if (timerQuery.getQueryObjectEXT) {
        return timerQuery.getQueryObjectEXT(query, timerQuery.QUERY_RESULT_EXT);
    }
    return this.getQueryResult(query);
};
Engine.prototype._getTimeQueryAvailability = function (query) {
    const timerQuery = this.getCaps().timerQuery;
    if (timerQuery.getQueryObjectEXT) {
        return timerQuery.getQueryObjectEXT(query, timerQuery.QUERY_RESULT_AVAILABLE_EXT);
    }
    return this.isQueryResultAvailable(query);
};
Engine.prototype.startTimeQuery = function () {
    const caps = this.getCaps();
    const timerQuery = caps.timerQuery;
    if (!timerQuery) {
        return null;
    }
    const token = new _TimeToken();
    this._gl.getParameter(timerQuery.GPU_DISJOINT_EXT);
    if (caps.canUseTimestampForTimerQuery) {
        token._startTimeQuery = this._createTimeQuery();
        timerQuery.queryCounterEXT(token._startTimeQuery, timerQuery.TIMESTAMP_EXT);
    }
    else {
        if (this._currentNonTimestampToken) {
            return this._currentNonTimestampToken;
        }
        token._timeElapsedQuery = this._createTimeQuery();
        if (timerQuery.beginQueryEXT) {
            timerQuery.beginQueryEXT(timerQuery.TIME_ELAPSED_EXT, token._timeElapsedQuery);
        }
        else {
            this._gl.beginQuery(timerQuery.TIME_ELAPSED_EXT, token._timeElapsedQuery);
        }
        this._currentNonTimestampToken = token;
    }
    return token;
};
Engine.prototype.endTimeQuery = function (token) {
    const caps = this.getCaps();
    const timerQuery = caps.timerQuery;
    if (!timerQuery || !token) {
        return -1;
    }
    if (caps.canUseTimestampForTimerQuery) {
        if (!token._startTimeQuery) {
            return -1;
        }
        if (!token._endTimeQuery) {
            token._endTimeQuery = this._createTimeQuery();
            timerQuery.queryCounterEXT(token._endTimeQuery, timerQuery.TIMESTAMP_EXT);
        }
    }
    else if (!token._timeElapsedQueryEnded) {
        if (!token._timeElapsedQuery) {
            return -1;
        }
        if (timerQuery.endQueryEXT) {
            timerQuery.endQueryEXT(timerQuery.TIME_ELAPSED_EXT);
        }
        else {
            this._gl.endQuery(timerQuery.TIME_ELAPSED_EXT);
            this._currentNonTimestampToken = null;
        }
        token._timeElapsedQueryEnded = true;
    }
    const disjoint = this._gl.getParameter(timerQuery.GPU_DISJOINT_EXT);
    let available = false;
    if (token._endTimeQuery) {
        available = this._getTimeQueryAvailability(token._endTimeQuery);
    }
    else if (token._timeElapsedQuery) {
        available = this._getTimeQueryAvailability(token._timeElapsedQuery);
    }
    if (available && !disjoint) {
        let result = 0;
        if (caps.canUseTimestampForTimerQuery) {
            if (!token._startTimeQuery || !token._endTimeQuery) {
                return -1;
            }
            const timeStart = this._getTimeQueryResult(token._startTimeQuery);
            const timeEnd = this._getTimeQueryResult(token._endTimeQuery);
            result = timeEnd - timeStart;
            this._deleteTimeQuery(token._startTimeQuery);
            this._deleteTimeQuery(token._endTimeQuery);
            token._startTimeQuery = null;
            token._endTimeQuery = null;
        }
        else {
            if (!token._timeElapsedQuery) {
                return -1;
            }
            result = this._getTimeQueryResult(token._timeElapsedQuery);
            this._deleteTimeQuery(token._timeElapsedQuery);
            token._timeElapsedQuery = null;
            token._timeElapsedQueryEnded = false;
        }
        return result;
    }
    return -1;
};
Engine.prototype._captureGPUFrameTime = false;
Engine.prototype._gpuFrameTime = new PerfCounter();
Engine.prototype.getGPUFrameTimeCounter = function () {
    return this._gpuFrameTime;
};
Engine.prototype.captureGPUFrameTime = function (value) {
    if (value === this._captureGPUFrameTime) {
        return;
    }
    this._captureGPUFrameTime = value;
    if (value) {
        this._onBeginFrameObserver = this.onBeginFrameObservable.add(() => {
            if (!this._gpuFrameTimeToken) {
                this._gpuFrameTimeToken = this.startTimeQuery();
            }
        });
        this._onEndFrameObserver = this.onEndFrameObservable.add(() => {
            if (!this._gpuFrameTimeToken) {
                return;
            }
            const time = this.endTimeQuery(this._gpuFrameTimeToken);
            if (time > -1) {
                this._gpuFrameTimeToken = null;
                this._gpuFrameTime.fetchNewFrame();
                this._gpuFrameTime.addCount(time, true);
            }
        });
    }
    else {
        this.onBeginFrameObservable.remove(this._onBeginFrameObserver);
        this._onBeginFrameObserver = null;
        this.onEndFrameObservable.remove(this._onEndFrameObserver);
        this._onEndFrameObserver = null;
    }
};
Engine.prototype._getGlAlgorithmType = function (algorithmType) {
    return algorithmType === AbstractMesh.OCCLUSION_ALGORITHM_TYPE_CONSERVATIVE ? this._gl.ANY_SAMPLES_PASSED_CONSERVATIVE : this._gl.ANY_SAMPLES_PASSED;
};
Object.defineProperty(AbstractMesh.prototype, "isOcclusionQueryInProgress", {
    get: function () {
        return this._occlusionDataStorage.isOcclusionQueryInProgress;
    },
    set: function (value) {
        this._occlusionDataStorage.isOcclusionQueryInProgress = value;
    },
    enumerable: false,
    configurable: true,
});
Object.defineProperty(AbstractMesh.prototype, "_occlusionDataStorage", {
    get: function () {
        if (!this.__occlusionDataStorage) {
            this.__occlusionDataStorage = new _OcclusionDataStorage();
        }
        return this.__occlusionDataStorage;
    },
    enumerable: false,
    configurable: true,
});
Object.defineProperty(AbstractMesh.prototype, "isOccluded", {
    get: function () {
        return this._occlusionDataStorage.isOccluded;
    },
    set: function (value) {
        this._occlusionDataStorage.isOccluded = value;
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(AbstractMesh.prototype, "occlusionQueryAlgorithmType", {
    get: function () {
        return this._occlusionDataStorage.occlusionQueryAlgorithmType;
    },
    set: function (value) {
        this._occlusionDataStorage.occlusionQueryAlgorithmType = value;
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(AbstractMesh.prototype, "occlusionType", {
    get: function () {
        return this._occlusionDataStorage.occlusionType;
    },
    set: function (value) {
        this._occlusionDataStorage.occlusionType = value;
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(AbstractMesh.prototype, "occlusionRetryCount", {
    get: function () {
        return this._occlusionDataStorage.occlusionRetryCount;
    },
    set: function (value) {
        this._occlusionDataStorage.occlusionRetryCount = value;
    },
    enumerable: true,
    configurable: true,
});
Object.defineProperty(AbstractMesh.prototype, "forceRenderingWhenOccluded", {
    get: function () {
        return this._occlusionDataStorage.forceRenderingWhenOccluded;
    },
    set: function (value) {
        this._occlusionDataStorage.forceRenderingWhenOccluded = value;
    },
    enumerable: true,
    configurable: true,
});
// We also need to update AbstractMesh as there is a portion of the code there
AbstractMesh.prototype._checkOcclusionQuery = function () {
    const dataStorage = this._occlusionDataStorage;
    if (dataStorage.occlusionType === AbstractMesh.OCCLUSION_TYPE_NONE) {
        dataStorage.isOccluded = false;
        return false;
    }
    const engine = this.getEngine();
    if (!engine.getCaps().supportOcclusionQuery) {
        dataStorage.isOccluded = false;
        return false;
    }
    if (!engine.isQueryResultAvailable) {
        // Occlusion query where not referenced
        dataStorage.isOccluded = false;
        return false;
    }
    if (this.isOcclusionQueryInProgress && this._occlusionQuery !== null && this._occlusionQuery !== undefined) {
        const isOcclusionQueryAvailable = engine.isQueryResultAvailable(this._occlusionQuery);
        if (isOcclusionQueryAvailable) {
            const occlusionQueryResult = engine.getQueryResult(this._occlusionQuery);
            dataStorage.isOcclusionQueryInProgress = false;
            dataStorage.occlusionInternalRetryCounter = 0;
            dataStorage.isOccluded = occlusionQueryResult > 0 ? false : true;
        }
        else {
            dataStorage.occlusionInternalRetryCounter++;
            if (dataStorage.occlusionRetryCount !== -1 && dataStorage.occlusionInternalRetryCounter > dataStorage.occlusionRetryCount) {
                dataStorage.isOcclusionQueryInProgress = false;
                dataStorage.occlusionInternalRetryCounter = 0;
                // if optimistic set isOccluded to false regardless of the status of isOccluded. (Render in the current render loop)
                // if strict continue the last state of the object.
                dataStorage.isOccluded = dataStorage.occlusionType === AbstractMesh.OCCLUSION_TYPE_OPTIMISTIC ? false : dataStorage.isOccluded;
            }
            else {
                return dataStorage.occlusionType === AbstractMesh.OCCLUSION_TYPE_OPTIMISTIC ? false : dataStorage.isOccluded;
            }
        }
    }
    const scene = this.getScene();
    if (scene.getBoundingBoxRenderer) {
        const occlusionBoundingBoxRenderer = scene.getBoundingBoxRenderer();
        if (this._occlusionQuery === null) {
            this._occlusionQuery = engine.createQuery();
        }
        if (engine.beginOcclusionQuery(dataStorage.occlusionQueryAlgorithmType, this._occlusionQuery)) {
            occlusionBoundingBoxRenderer.renderOcclusionBoundingBox(this);
            engine.endOcclusionQuery(dataStorage.occlusionQueryAlgorithmType);
            this._occlusionDataStorage.isOcclusionQueryInProgress = true;
        }
    }
    return dataStorage.isOccluded;
};
//# sourceMappingURL=engine.query.js.map