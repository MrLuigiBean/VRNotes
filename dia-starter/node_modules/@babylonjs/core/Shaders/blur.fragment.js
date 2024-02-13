// Do not edit.
import { ShaderStore } from "../Engines/shaderStore.js";
const name = "blurPixelShader";
const shader = `varying vec2 vUV;uniform sampler2D textureSampler;uniform vec2 screenSize;uniform vec2 direction;uniform float blurWidth;
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void)
{float weights[7];weights[0]=0.05;weights[1]=0.1;weights[2]=0.2;weights[3]=0.3;weights[4]=0.2;weights[5]=0.1;weights[6]=0.05;vec2 texelSize=vec2(1.0/screenSize.x,1.0/screenSize.y);vec2 texelStep=texelSize*direction*blurWidth;vec2 start=vUV-3.0*texelStep;vec4 baseColor=vec4(0.,0.,0.,0.);vec2 texelOffset=vec2(0.,0.);for (int i=0; i<7; i++)
{baseColor+=texture2D(textureSampler,start+texelOffset)*weights[i];texelOffset+=texelStep;}
gl_FragColor=baseColor;}`;
// Sideeffect
ShaderStore.ShadersStore[name] = shader;
/** @internal */
export const blurPixelShader = { name, shader };
//# sourceMappingURL=blur.fragment.js.map