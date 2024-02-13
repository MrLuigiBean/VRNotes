// Do not edit.
import { ShaderStore } from "../../Engines/shaderStore.js";
const name = "morphTargetsVertexDeclaration";
const shader = `#ifdef MORPHTARGETS
#ifndef MORPHTARGETS_TEXTURE
attribute vec3 position{X};
#ifdef MORPHTARGETS_NORMAL
attribute vec3 normal{X};
#endif
#ifdef MORPHTARGETS_TANGENT
attribute vec3 tangent{X};
#endif
#ifdef MORPHTARGETS_UV
attribute vec2 uv_{X};
#endif
#endif
#endif
`;
// Sideeffect
ShaderStore.IncludesShadersStore[name] = shader;
/** @internal */
export const morphTargetsVertexDeclaration = { name, shader };
//# sourceMappingURL=morphTargetsVertexDeclaration.js.map