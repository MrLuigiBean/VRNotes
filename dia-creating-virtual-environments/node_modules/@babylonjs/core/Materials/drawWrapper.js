/** @internal */
export class DrawWrapper {
    static IsWrapper(effect) {
        return effect.getPipelineContext === undefined;
    }
    static GetEffect(effect) {
        return effect.getPipelineContext === undefined ? effect.effect : effect;
    }
    constructor(engine, createMaterialContext = true) {
        this.effect = null;
        this.defines = null;
        this.drawContext = engine.createDrawContext();
        if (createMaterialContext) {
            this.materialContext = engine.createMaterialContext();
        }
    }
    setEffect(effect, defines, resetContext = true) {
        var _a;
        this.effect = effect;
        if (defines !== undefined) {
            this.defines = defines;
        }
        if (resetContext) {
            (_a = this.drawContext) === null || _a === void 0 ? void 0 : _a.reset();
        }
    }
    dispose() {
        var _a;
        (_a = this.drawContext) === null || _a === void 0 ? void 0 : _a.dispose();
    }
}
//# sourceMappingURL=drawWrapper.js.map