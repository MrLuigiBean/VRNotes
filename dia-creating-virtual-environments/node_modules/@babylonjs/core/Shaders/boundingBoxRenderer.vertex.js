// Do not edit.
import { ShaderStore } from "../Engines/shaderStore.js";
import "./ShadersInclude/boundingBoxRendererVertexDeclaration.js";
import "./ShadersInclude/boundingBoxRendererUboDeclaration.js";
const name = "boundingBoxRendererVertexShader";
const shader = `attribute vec3 position;
#include<__decl__boundingBoxRendererVertex>
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
vec4 worldPos=world*vec4(position,1.0);
#ifdef MULTIVIEW
if (gl_ViewID_OVR==0u) {gl_Position=viewProjection*worldPos;} else {gl_Position=viewProjectionR*worldPos;}
#else
gl_Position=viewProjection*worldPos;
#endif
#define CUSTOM_VERTEX_MAIN_END
}
`;
// Sideeffect
ShaderStore.ShadersStore[name] = shader;
/** @internal */
export const boundingBoxRendererVertexShader = { name, shader };
//# sourceMappingURL=boundingBoxRenderer.vertex.js.map