// Do not edit.
import { ShaderStore } from "../Engines/shaderStore.js";
const name = "clearQuadPixelShader";
const shader = `uniform vec4 color;void main() {gl_FragColor=color;}
`;
// Sideeffect
ShaderStore.ShadersStore[name] = shader;
/** @internal */
export const clearQuadPixelShader = { name, shader };
//# sourceMappingURL=clearQuad.fragment.js.map