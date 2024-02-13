// Do not edit.
import { ShaderStore } from "../Engines/shaderStore.js";
const name = "spriteMapVertexShader";
const shader = `precision highp float;attribute vec3 position;attribute vec3 normal;attribute vec2 uv;varying vec3 vPosition;varying vec2 vUV;varying vec2 tUV;varying vec2 stageUnits;varying vec2 levelUnits;varying vec2 tileID;uniform float time;uniform mat4 worldViewProjection;uniform vec2 outputSize;uniform vec2 stageSize;uniform vec2 spriteMapSize;uniform float stageScale;void main() {vec4 p=vec4( position,1. );vPosition=p.xyz;vUV=uv;tUV=uv*stageSize; 
gl_Position=worldViewProjection*p;}`;
// Sideeffect
ShaderStore.ShadersStore[name] = shader;
/** @internal */
export const spriteMapVertexShader = { name, shader };
//# sourceMappingURL=spriteMap.vertex.js.map