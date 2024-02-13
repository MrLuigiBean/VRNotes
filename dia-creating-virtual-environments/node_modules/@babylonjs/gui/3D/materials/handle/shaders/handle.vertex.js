// Do not edit.
import { ShaderStore } from "@babylonjs/core/Engines/shaderStore.js";
const name = "handleVertexShader";
const shader = `precision highp float;attribute vec3 position;uniform vec3 positionOffset;uniform mat4 worldViewProjection;uniform float scale;void main(void) {vec4 vPos=vec4((vec3(position)+positionOffset)*scale,1.0);gl_Position=worldViewProjection*vPos;}`;
// Sideeffect
ShaderStore.ShadersStore[name] = shader;
/** @internal */
export const handleVertexShader = { name, shader };
//# sourceMappingURL=handle.vertex.js.map