// Do not edit.
import { ShaderStore } from "../../Engines/shaderStore.js";
const name = "morphTargetsVertex";
const shader = `#ifdef MORPHTARGETS
#ifdef MORPHTARGETS_TEXTURE 
vertexID=float(gl_VertexID)*morphTargetTextureInfo.x;positionUpdated+=(readVector3FromRawSampler({X},vertexID)-position)*morphTargetInfluences[{X}];vertexID+=1.0;
#ifdef MORPHTARGETS_NORMAL
normalUpdated+=(readVector3FromRawSampler({X},vertexID) -normal)*morphTargetInfluences[{X}];vertexID+=1.0;
#endif
#ifdef MORPHTARGETS_UV
uvUpdated+=(readVector3FromRawSampler({X},vertexID).xy-uv)*morphTargetInfluences[{X}];vertexID+=1.0;
#endif
#ifdef MORPHTARGETS_TANGENT
tangentUpdated.xyz+=(readVector3FromRawSampler({X},vertexID) -tangent.xyz)*morphTargetInfluences[{X}];
#endif
#else
positionUpdated+=(position{X}-position)*morphTargetInfluences[{X}];
#ifdef MORPHTARGETS_NORMAL
normalUpdated+=(normal{X}-normal)*morphTargetInfluences[{X}];
#endif
#ifdef MORPHTARGETS_TANGENT
tangentUpdated.xyz+=(tangent{X}-tangent.xyz)*morphTargetInfluences[{X}];
#endif
#ifdef MORPHTARGETS_UV
uvUpdated+=(uv_{X}-uv)*morphTargetInfluences[{X}];
#endif
#endif
#endif
`;
// Sideeffect
ShaderStore.IncludesShadersStore[name] = shader;
/** @internal */
export const morphTargetsVertex = { name, shader };
//# sourceMappingURL=morphTargetsVertex.js.map