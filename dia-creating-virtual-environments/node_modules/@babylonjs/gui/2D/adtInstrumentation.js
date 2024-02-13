import { PerfCounter } from "@babylonjs/core/Misc/perfCounter.js";
/**
 * This class can be used to get instrumentation data from a AdvancedDynamicTexture object
 */
export class AdvancedDynamicTextureInstrumentation {
    // Properties
    /**
     * Gets the perf counter used to capture render time
     */
    get renderTimeCounter() {
        return this._renderTime;
    }
    /**
     * Gets the perf counter used to capture layout time
     */
    get layoutTimeCounter() {
        return this._layoutTime;
    }
    /**
     * Enable or disable the render time capture
     */
    get captureRenderTime() {
        return this._captureRenderTime;
    }
    set captureRenderTime(value) {
        if (value === this._captureRenderTime) {
            return;
        }
        this._captureRenderTime = value;
        if (value) {
            this._onBeginRenderObserver = this.texture.onBeginRenderObservable.add(() => {
                this._renderTime.beginMonitoring();
            });
            this._onEndRenderObserver = this.texture.onEndRenderObservable.add(() => {
                this._renderTime.endMonitoring(true);
            });
        }
        else {
            this.texture.onBeginRenderObservable.remove(this._onBeginRenderObserver);
            this._onBeginRenderObserver = null;
            this.texture.onEndRenderObservable.remove(this._onEndRenderObserver);
            this._onEndRenderObserver = null;
        }
    }
    /**
     * Enable or disable the layout time capture
     */
    get captureLayoutTime() {
        return this._captureLayoutTime;
    }
    set captureLayoutTime(value) {
        if (value === this._captureLayoutTime) {
            return;
        }
        this._captureLayoutTime = value;
        if (value) {
            this._onBeginLayoutObserver = this.texture.onBeginLayoutObservable.add(() => {
                this._layoutTime.beginMonitoring();
            });
            this._onEndLayoutObserver = this.texture.onEndLayoutObservable.add(() => {
                this._layoutTime.endMonitoring(true);
            });
        }
        else {
            this.texture.onBeginLayoutObservable.remove(this._onBeginLayoutObserver);
            this._onBeginLayoutObserver = null;
            this.texture.onEndLayoutObservable.remove(this._onEndLayoutObserver);
            this._onEndLayoutObserver = null;
        }
    }
    /**
     * Instantiates a new advanced dynamic texture instrumentation.
     * This class can be used to get instrumentation data from an AdvancedDynamicTexture object
     * @param texture Defines the AdvancedDynamicTexture to instrument
     */
    constructor(
    /**
     * Define the instrumented AdvancedDynamicTexture.
     */
    texture) {
        this.texture = texture;
        this._captureRenderTime = false;
        this._renderTime = new PerfCounter();
        this._captureLayoutTime = false;
        this._layoutTime = new PerfCounter();
        // Observers
        this._onBeginRenderObserver = null;
        this._onEndRenderObserver = null;
        this._onBeginLayoutObserver = null;
        this._onEndLayoutObserver = null;
    }
    /**
     * Dispose and release associated resources.
     */
    dispose() {
        this.texture.onBeginRenderObservable.remove(this._onBeginRenderObserver);
        this._onBeginRenderObserver = null;
        this.texture.onEndRenderObservable.remove(this._onEndRenderObserver);
        this._onEndRenderObserver = null;
        this.texture.onBeginLayoutObservable.remove(this._onBeginLayoutObserver);
        this._onBeginLayoutObserver = null;
        this.texture.onEndLayoutObservable.remove(this._onEndLayoutObserver);
        this._onEndLayoutObserver = null;
        this.texture = null;
    }
}
//# sourceMappingURL=adtInstrumentation.js.map