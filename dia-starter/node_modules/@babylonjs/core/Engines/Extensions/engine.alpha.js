import { ThinEngine } from "../../Engines/thinEngine.js";

ThinEngine.prototype.setAlphaConstants = function (r, g, b, a) {
    this._alphaState.setAlphaBlendConstants(r, g, b, a);
};
ThinEngine.prototype.setAlphaMode = function (mode, noDepthWriteChange = false) {
    if (this._alphaMode === mode) {
        if (!noDepthWriteChange) {
            // Make sure we still have the correct depth mask according to the alpha mode (a transparent material could have forced writting to the depth buffer, for instance)
            const depthMask = mode === 0;
            if (this.depthCullingState.depthMask !== depthMask) {
                this.depthCullingState.depthMask = depthMask;
            }
        }
        return;
    }
    switch (mode) {
        case 0:
            this._alphaState.alphaBlend = false;
            break;
        case 7:
            this._alphaState.setAlphaBlendFunctionParameters(this._gl.ONE, this._gl.ONE_MINUS_SRC_ALPHA, this._gl.ONE, this._gl.ONE);
            this._alphaState.alphaBlend = true;
            break;
        case 8:
            this._alphaState.setAlphaBlendFunctionParameters(this._gl.ONE, this._gl.ONE_MINUS_SRC_ALPHA, this._gl.ONE, this._gl.ONE_MINUS_SRC_ALPHA);
            this._alphaState.alphaBlend = true;
            break;
        case 2:
            this._alphaState.setAlphaBlendFunctionParameters(this._gl.SRC_ALPHA, this._gl.ONE_MINUS_SRC_ALPHA, this._gl.ONE, this._gl.ONE);
            this._alphaState.alphaBlend = true;
            break;
        case 6:
            this._alphaState.setAlphaBlendFunctionParameters(this._gl.ONE, this._gl.ONE, this._gl.ZERO, this._gl.ONE);
            this._alphaState.alphaBlend = true;
            break;
        case 1:
            this._alphaState.setAlphaBlendFunctionParameters(this._gl.SRC_ALPHA, this._gl.ONE, this._gl.ZERO, this._gl.ONE);
            this._alphaState.alphaBlend = true;
            break;
        case 3:
            this._alphaState.setAlphaBlendFunctionParameters(this._gl.ZERO, this._gl.ONE_MINUS_SRC_COLOR, this._gl.ONE, this._gl.ONE);
            this._alphaState.alphaBlend = true;
            break;
        case 4:
            this._alphaState.setAlphaBlendFunctionParameters(this._gl.DST_COLOR, this._gl.ZERO, this._gl.ONE, this._gl.ONE);
            this._alphaState.alphaBlend = true;
            break;
        case 5:
            this._alphaState.setAlphaBlendFunctionParameters(this._gl.SRC_ALPHA, this._gl.ONE_MINUS_SRC_COLOR, this._gl.ONE, this._gl.ONE);
            this._alphaState.alphaBlend = true;
            break;
        case 9:
            this._alphaState.setAlphaBlendFunctionParameters(this._gl.CONSTANT_COLOR, this._gl.ONE_MINUS_CONSTANT_COLOR, this._gl.CONSTANT_ALPHA, this._gl.ONE_MINUS_CONSTANT_ALPHA);
            this._alphaState.alphaBlend = true;
            break;
        case 10:
            this._alphaState.setAlphaBlendFunctionParameters(this._gl.ONE, this._gl.ONE_MINUS_SRC_COLOR, this._gl.ONE, this._gl.ONE_MINUS_SRC_ALPHA);
            this._alphaState.alphaBlend = true;
            break;
        case 11:
            this._alphaState.setAlphaBlendFunctionParameters(this._gl.ONE, this._gl.ONE, this._gl.ONE, this._gl.ONE);
            this._alphaState.alphaBlend = true;
            break;
        case 12:
            this._alphaState.setAlphaBlendFunctionParameters(this._gl.DST_ALPHA, this._gl.ONE, this._gl.ZERO, this._gl.ZERO);
            this._alphaState.alphaBlend = true;
            break;
        case 13:
            this._alphaState.setAlphaBlendFunctionParameters(this._gl.ONE_MINUS_DST_COLOR, this._gl.ONE_MINUS_SRC_COLOR, this._gl.ONE_MINUS_DST_ALPHA, this._gl.ONE_MINUS_SRC_ALPHA);
            this._alphaState.alphaBlend = true;
            break;
        case 14:
            this._alphaState.setAlphaBlendFunctionParameters(this._gl.ONE, this._gl.ONE_MINUS_SRC_ALPHA, this._gl.ONE, this._gl.ONE_MINUS_SRC_ALPHA);
            this._alphaState.alphaBlend = true;
            break;
        case 15:
            this._alphaState.setAlphaBlendFunctionParameters(this._gl.ONE, this._gl.ONE, this._gl.ONE, this._gl.ZERO);
            this._alphaState.alphaBlend = true;
            break;
        case 16:
            this._alphaState.setAlphaBlendFunctionParameters(this._gl.ONE_MINUS_DST_COLOR, this._gl.ONE_MINUS_SRC_COLOR, this._gl.ZERO, this._gl.ONE);
            this._alphaState.alphaBlend = true;
            break;
        case 17:
            // Same as ALPHA_COMBINE but accumulates (1 - alpha) values in the alpha channel for a later readout in order independant transparency
            this._alphaState.setAlphaBlendFunctionParameters(this._gl.SRC_ALPHA, this._gl.ONE_MINUS_SRC_ALPHA, this._gl.ONE, this._gl.ONE_MINUS_SRC_ALPHA);
            this._alphaState.alphaBlend = true;
            break;
    }
    if (!noDepthWriteChange) {
        this.depthCullingState.depthMask = mode === 0;
    }
    this._alphaMode = mode;
};
ThinEngine.prototype.getAlphaMode = function () {
    return this._alphaMode;
};
ThinEngine.prototype.setAlphaEquation = function (equation) {
    if (this._alphaEquation === equation) {
        return;
    }
    switch (equation) {
        case 0:
            this._alphaState.setAlphaEquationParameters(32774, 32774);
            break;
        case 1:
            this._alphaState.setAlphaEquationParameters(32778, 32778);
            break;
        case 2:
            this._alphaState.setAlphaEquationParameters(32779, 32779);
            break;
        case 3:
            this._alphaState.setAlphaEquationParameters(32776, 32776);
            break;
        case 4:
            this._alphaState.setAlphaEquationParameters(32775, 32775);
            break;
        case 5:
            this._alphaState.setAlphaEquationParameters(32775, 32774);
            break;
    }
    this._alphaEquation = equation;
};
ThinEngine.prototype.getAlphaEquation = function () {
    return this._alphaEquation;
};
//# sourceMappingURL=engine.alpha.js.map