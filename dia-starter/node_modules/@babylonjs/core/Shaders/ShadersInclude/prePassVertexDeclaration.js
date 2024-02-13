// Do not edit.
import { ShaderStore } from "../../Engines/shaderStore.js";
const name = "prePassVertexDeclaration";
const shader = `#ifdef PREPASS
#ifdef PREPASS_DEPTH
varying vec3 vViewPos;
#endif
#ifdef PREPASS_VELOCITY
uniform mat4 previousViewProjection;varying vec4 vCurrentPosition;varying vec4 vPreviousPosition;
#endif
#endif
`;
// Sideeffect
ShaderStore.IncludesShadersStore[name] = shader;
/** @internal */
export const prePassVertexDeclaration = { name, shader };
//# sourceMappingURL=prePassVertexDeclaration.js.map