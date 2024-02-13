// Do not edit.
import { ShaderStore } from "../../Engines/shaderStore.js";
const name = "morphTargetsVertexGlobal";
const shader = `#ifdef MORPHTARGETS
#ifdef MORPHTARGETS_TEXTURE
var vertexID : f32;
#endif
#endif
`;
// Sideeffect
ShaderStore.IncludesShadersStoreWGSL[name] = shader;
/** @internal */
export const morphTargetsVertexGlobal = { name, shader };
//# sourceMappingURL=morphTargetsVertexGlobal.js.map