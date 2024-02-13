// Do not edit.
import { ShaderStore } from "@babylonjs/core/Engines/shaderStore.js";
const name = "handlePixelShader";
const shader = `uniform vec3 color;void main(void) {gl_FragColor=vec4(color,1.0);}`;
// Sideeffect
ShaderStore.ShadersStore[name] = shader;
/** @internal */
export const handlePixelShader = { name, shader };
//# sourceMappingURL=handle.fragment.js.map