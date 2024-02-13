import { ShaderLanguage } from "../../Materials/shaderLanguage.js";
/** @internal */
export class WebGLShaderProcessor {
    constructor() {
        this.shaderLanguage = ShaderLanguage.GLSL;
    }
    postProcessor(code, defines, isFragment, processingContext, engine) {
        // Remove extensions
        if (!engine.getCaps().drawBuffersExtension) {
            // even if enclosed in #if/#endif, IE11 does parse the #extension declaration, so we need to remove it altogether
            const regex = /#extension.+GL_EXT_draw_buffers.+(enable|require)/g;
            code = code.replace(regex, "");
        }
        return code;
    }
}
//# sourceMappingURL=webGLShaderProcessors.js.map